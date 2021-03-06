export const mockFile = (
  blob = ['hello'],
  name = 'test.png',
  type = 'image/png'
) => new File(blob, name, { type });
