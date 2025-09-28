const axios = require("axios");
const fs = require("fs");
const convertToMarkdown = require("./src/helpers/convertToMarkdown");
require("dotenv").config();
const wpData = JSON.parse(
    fs.readFileSync("./assets/wordpress_export.json", "utf-8")
);

const STRAPI_URL = `${process.env.STRAPI_URL}/api/humors`;

async function migrateHumors() {
    const items = wpData.rss.channel[0].item;
console.log({STRAPI_URL});

    for (const item of items) {
        const title = item.title[0];
        const humor = convertToMarkdown(item["content:encoded"][0]).markdown; // HTML string

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

function cleanHumor(html) {
    return html
        .replace(/<!--.*?-->/gs, "") // remove WP comments
        .replace(/<\/?p>/g, "") // remove <p> tags
        .replace(/\n\s*\n/g, "\n\n") // normalize spacing
        .trim();
}
