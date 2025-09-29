const convertXmlToJson = require("./src/helpers/convertXmlToJson");
const transformData = require("./src/helpers/transformData");
const upload = require("./src/helpers/upload");
const { wpJsonPath, wpXmlPath } = require("./src/constants/filePaths");

async function migrateHumors() {
    await convertXmlToJson(wpXmlPath, wpJsonPath);
    const items = await transformData(wpJsonPath, "interesting");

    for await (const { title, humor } of items) {
        await upload("/api/humors", { title, humor });
    }
}

migrateHumors();
