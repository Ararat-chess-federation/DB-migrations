module.exports = {
  commentReg: /<!--[\s\S]*?-->/g,
  htmlTagReg: /<\/?[^>]+(>|$)/g,
  fbPostReg: /<a.*?href="(https:\/\/www\.facebook\.com\/[^\"]+)".*?>.*?<\/a>/g,
};
