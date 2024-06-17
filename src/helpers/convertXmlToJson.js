const fsp = require("fs").promises;
const xml2js = require("xml2js");

const convertXmlToJson = async (xmlFile, jsonFile) => {
  try {
    const parser = new xml2js.Parser();
    const data = await fsp.readFile(xmlFile);

    const result = await parser.parseStringPromise(data);

    await fsp.writeFile(jsonFile, JSON.stringify(result, null, 4));
    await fsp.unlink(xmlFile);

    console.log("Converted XML to JSON successfully");
  } catch (err) {
    console.error("Error converting XML to JSON:", err);
  }
};

module.exports = convertXmlToJson;
