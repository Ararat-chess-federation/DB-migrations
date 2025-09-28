const axios = require("axios");
const convertXmlToJson = require("./src/helpers/convertXmlToJson");
require("dotenv").config();
const { wpJsonPath, wpXmlPath } = require("./src/constants/filePaths");

const STRAPI_URL = `${process.env.STRAPI_URL}/api/interestings`;

async function migrateHumors() {
    await convertXmlToJson(wpXmlPath, wpJsonPath);
    const items = transformData(wpJsonPath, "interesting");

    for (const { title, interesting } of items) {
        try {
            const res = await axios.post(STRAPI_URL, {
                headers: {
                    "Content-Type": "application/json",
                },
                data: {
                    title,
                    interesting,
                },
            });

            console.log(`✅ Migrated: ${title} (ID: ${res.data.data.id})`);
        } catch (err) {
            console.error(
                `❌ Error migrating ${title}`,
                err.response?.data || err.message
            );
        }
    }
}

migrateHumors();
