require("dotenv").config();
const axios = require("axios");
const { wpJsonPath, wpXmlPath } = require("./src/constants/filePaths");
const transformData = require("./src/helpers/transformData");

const STRAPI_URL = `${process.env.STRAPI_URL}/api/humors`;

async function migrateHumors() {
    await convertXmlToJson(wpXmlPath, wpJsonPath);
    const items = transformData(wpJsonPath, "interesting");

    for (const { title, humor } of items) {
        try {
            const res = await axios.post(STRAPI_URL, {
                headers: {
                    "Content-Type": "application/json",
                },
                data: {
                    title,
                    humor,
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
