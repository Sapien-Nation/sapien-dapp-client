import fs from 'fs';

const filename = 'public/static/serviceworker/redirect.html';

const serviceWorker = async (_, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.write(fs.readFileSync(filename, 'utf-8'));
  res.end();
};

export default serviceWorker;
