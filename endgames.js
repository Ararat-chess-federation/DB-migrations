const convertXmlToJson = require("./src/helpers/convertXmlToJson");
const transformData = require("./src/helpers/transformData");
const upload = require("./src/helpers/upload");
const { wpJsonPath, wpXmlPath } = require("./src/constants/filePaths");

async function migrateEndgames() {
    await convertXmlToJson(wpXmlPath, wpJsonPath);
    const items = await transformData(wpJsonPath);

    for await (const { title, content } of items) {
        await upload("/api/endgames", { title, content });
    }
}

migrateEndgames();
