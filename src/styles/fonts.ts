const avertaRegular = {
  fontFamily: 'averta',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('averta'),
    url('https://s3-us-west-2.amazonaws.com/sapienetwork/public/static/averta/averta-regular.woff2') format('woff2'),
    url('https://s3-us-west-2.amazonaws.com/sapienetwork/public/static/averta/averta-regular.woff') format('woff'),
    url('https://s3-us-west-2.amazonaws.com/sapienetwork/public/static/averta/averta-regular.ttf') format('truetype')
  `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF'
};

const avertaBold = {
  fontFamily: 'averta',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 700,
  src: `
    local('averta'),
    url('https://s3-us-west-2.amazonaws.com/sapienetwork/public/static/averta/averta-bold.woff2') format('woff2'),
    url('https://s3-us-west-2.amazonaws.com/sapienetwork/public/static/averta/averta-bold.woff') format('woff')
  `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF'
};

const avertaItalic = {
  fontFamily: 'averta',
  fontStyle: 'italic',
  fontDisplay: 'swap',
  src: `
    local('averta'),
    url('https://s3-us-west-2.amazonaws.com/sapienetwork/public/static/averta/averta-regular-italic.woff2') format('woff2'),
    url('https://s3-us-west-2.amazonaws.com/sapienetwork/public/static/averta/averta-regular-italic.woff') format('woff')
  `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF'
};

const avertaMedium = {
  fontFamily: 'averta',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 600,
  src: `
    local('averta'),
    url('https://s3-us-west-2.amazonaws.com/sapienetwork/public/static/averta/averta-semibold.woff2') format('woff2'),
    url('https://s3-us-west-2.amazonaws.com/sapienetwork/public/static/averta/averta-semibold.woff') format('woff')
  `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF'
};

export { avertaBold, avertaItalic, avertaMedium, avertaRegular };
