const axios = require("axios");
const fsp = require("fs").promises;
require("dotenv").config();

const importData = async (jsonFile) => {
  try {
    const data = await fsp.readFile(jsonFile, "utf-8");
    const items = JSON.parse(data);
    const url = `${process.env.STRAPI_URL}/content-manager/collection-types/api::article.article`;

    for (const item of items) {
      try {
        await axios.post(url, item, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
          },
        });

        console.log(`Successfully imported: ${item.title}`);
      } catch (error) {
        console.error(
          `Failed to import: ${item.title}. Error: ${error.message}`
        );
      }
    }
    await fsp.unlink(jsonFile);
  } catch (err) {
    console.error("Error reading JSON file:", err);
  }
};

module.exports = importData;
