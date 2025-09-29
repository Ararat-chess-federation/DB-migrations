const fsp = require("fs/promises");
const convertToMarkdown = require("./convertToMarkdown");

const transformData = async (inputFile) => {
    try {
        const data = await fsp.readFile(inputFile, "utf-8");
        const parsedData = JSON.parse(data);

        const items = parsedData.rss.channel[0].item;

        const res = [];
        for (const item of items) {
            const title = item.title[0];
            const content = convertToMarkdown(
                item["content:encoded"][0]
            ).markdown;

            res.push({
                title,
                content,
            });
        }

        await fsp.unlink(inputFile);

        return res;
    } catch (err) {
        console.error("Error transforming JSON file:", err);
    }
};

module.exports = transformData;
