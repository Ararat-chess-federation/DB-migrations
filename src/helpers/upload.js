const axios = require("axios");

const headers = {
    "Content-Type": "application/json",
};

const upload = async (api, data) => {
    try {
        const url = `${process.env.STRAPI_URL}${api}`;
        const res = await axios.post(url, {
            headers,
            data,
        });

        console.log(`✅ Migrated: ${data.title} (ID: ${res.data.data.id})`);
    } catch (err) {
        console.error(
            `❌ Error migrating ${data.title}`,
            err.response?.data || err.message
        );
    }
};

module.exports = upload;
