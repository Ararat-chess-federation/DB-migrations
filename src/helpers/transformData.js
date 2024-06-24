const axios = require("axios");
const fsp = require("fs").promises;
const fs = require("fs");
const path = require("path");
const FormData = require("form-data");
const convertToMarkdown = require("./convertToMarkdown");

const downloadImage = async (url, filepath) => {
  const response = await axios({
    url,
    responseType: "stream",
  });

  const writer = fs.createWriteStream(filepath);

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
};

const uploadImage = async (imageUrl) => {
  try {
    const imageName = imageUrl.split("/").pop();
    const tempFilePath = path.resolve(__dirname, imageName);

    await downloadImage(imageUrl, tempFilePath);

    const form = new FormData();
    form.append("files", fs.createReadStream(tempFilePath));

    const uploadResponse = await axios.post(
      `${process.env.STRAPI_URL}/upload`,
      form,
      {
        headers: {
          ...form.getHeaders(),
          Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
        },
      }
    );

    await fsp.unlink(tempFilePath);
    return uploadResponse.data[0];
  } catch (e) {
    console.log(`Error with uploading image: ${imageUrl}`);
  }
};

const getTransformedData = async (wpData) => {
  let transformedData = [];
  let attachment_url = "";

  for (const item of wpData) {
    const content = item["content:encoded"][0];
    const { markdown, fbPost } = convertToMarkdown(content);

    if (item["wp:attachment_url"]) {
      attachment_url = item["wp:attachment_url"][0];
      continue;
    }

    const uploadedImage = await uploadImage(attachment_url);

    transformedData.push({
      title: item.title[0],
      articleText: [{ __component: "text.paragraph", paragraph: markdown }],
      publishDate: item["wp:post_date"][0],
      slug: item["wp:post_name"][0],
      fbPost: fbPost,
      url: item["wp:post_name"][0],
      mainImage: uploadedImage.id,
    });
  }

  return transformedData;
};

const transformData = async (inputFile, outputFile) => {
  try {
    const data = await fsp.readFile(inputFile, "utf-8");
    const parsedData = JSON.parse(data);

    const wpContents = parsedData.rss.channel[0].item;
    const reversed = wpContents.reverse();

    const transformedData = await getTransformedData(reversed);
    const dataJSON = JSON.stringify(transformedData, null, 4);
    
    await fsp.writeFile(outputFile, dataJSON);
    await fsp.unlink(inputFile);
  } catch (err) {
    console.error("Error transforming JSON file:", err);
  }
};

module.exports = transformData;
