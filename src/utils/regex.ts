const BOLD_REGEX = /\*\*[A-z0-9_ ]+\*\*/gi;
const ITALIC_REGEX = /_([^_]+)_/gi;
const LINK_REGEX = /(https?:\/\/[^\s]+)/gi;
const UNDERLINE_REGEX = /\[[A-z0-9_ ]+\]/gi;

export { BOLD_REGEX, ITALIC_REGEX, LINK_REGEX, UNDERLINE_REGEX };
