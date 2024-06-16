const { fbPostReg, commentReg, htmlTagReg } = require("../constants/regex");

function convertToMarkdown(input) {
  const textWithoutComment = cleanComments(input);
  const { textWithoutFbPost, fbPost } = getFbLink(textWithoutComment);

  const markdown = replaceHtmlToMarkdown(textWithoutFbPost);

  return { markdown, fbPost };
}

function cleanComments(input) {
  return input.replace(commentReg, "");
}

function getFbLink(text) {
  const fbPostMatch = fbPostReg.exec(text);

  let fbPost = "";
  let textWithoutFbPost = text;

  if (fbPostMatch) {
    fbPost = fbPostMatch[1];
    textWithoutFbPost = text.replace(fbPostMatch[0], "");
  }

  return { textWithoutFbPost, fbPost };
}

function replaceHtmlToMarkdown(html) {
  return html
    .replace(/<p>/g, "\n")
    .replace(/<\/p>/g, "")
    .replace(/<strong>(.*?)<\/strong>/g, "**$1**")
    .replace(/<b>(.*?)<\/b>/g, "**$1**")
    .replace(/<h2.*?>(.*?)<\/h2>/g, "## $1")
    .replace(/<h3.*?>(.*?)<\/h3>/g, "### $1")
    .replace(/<h4.*?>(.*?)<\/h4>/g, "#### $1")
    .replace(/<h5.*?>(.*?)<\/h5>/g, "##### $1")
    .replace(/<li>(.*?)<\/li>/g, "- $1")
    .replace(/<a.*?href="(.*?)".*?>(.*?)<\/a>/g, "[$2]($1)")
    .replace(/<img.*?src="(.*?)".*?>/g, "![]($1)")
    .replace(/<ul>/g, "\n")
    .replace(/<\/ul>/g, "\n")
    .replace(/<figure.*?>/g, "")
    .replace(/<\/figure>/g, "")
    .replace(/<div.*?>/g, "")
    .replace(/<\/div>/g, "")
    .replace(/<br\s*\/?>/g, "  \n")
    .replace(/<p class=".*?">(.*?)<\/p>/g, "\n$1")
    .replace(htmlTagReg, "")
    .trim();
}

module.exports = convertToMarkdown;
