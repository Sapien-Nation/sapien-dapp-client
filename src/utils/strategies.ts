import { BOLD_REGEX, ITALIC_REGEX, UNDERLINE_REGEX } from './regex';

const findWithRegex = (regex: any, contentBlock: any, callback: any) => {
  const text = contentBlock.getText();
  let matchArr: any;

  while ((matchArr = regex.exec(text)) !== null) {
    const start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
};

const boldStrategy = (contentBlock: any, callback: any) => {
  findWithRegex(BOLD_REGEX, contentBlock, callback);
};

const italicStrategy = (contentBlock: any, callback: any) => {
  findWithRegex(ITALIC_REGEX, contentBlock, callback);
};

const underlineStrategy = (contentBlock: any, callback: any) => {
  findWithRegex(UNDERLINE_REGEX, contentBlock, callback);
};

export { boldStrategy, italicStrategy, underlineStrategy };
