import metaFetcher from 'meta-fetcher';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { url } = req.query;

    if (url) {
      const { metadata } = await metaFetcher(url);
      res.status(200).json(metadata);
    } else {
      res.status(400).json({ message: 'Missing URL' });
    }
  } else {
    res.status(500).json({ message: 'Invalid HTTP verb' });
  }
}
