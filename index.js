const convertXmlToJson = require("./src/helpers/convertXmlToJson");
const transformData = require("./src/helpers/transformData");
const importData = require("./src/helpers/importData");
const {
  strapiJsonPath,
  wpJsonPath,
  wpXmlPath,
} = require("./src/constants/filePaths");

async function migrateData() {
  try {
    await convertXmlToJson(wpXmlPath, wpJsonPath);
    await transformData(wpJsonPath, strapiJsonPath);
    await importData(strapiJsonPath);
  } catch (e) {
    console.log(e);
  }
}

migrateData();
