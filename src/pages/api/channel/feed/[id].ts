/* istanbul ignore file */

// mocks
import { mockPost } from 'tools/mocks/post';

// types
import type { NextApiRequest, NextApiResponse } from 'next';

const baseCursor = '1qwertyuiop1234567890asdfghjklzxcvbnm';

const generateCursor = (cursor): { cursor: string } => {
  if (!cursor) return { cursor: baseCursor };

  const prevCount = cursor.replace(/(^\d+)(.+$)/i, '$1');
  const count = Number(prevCount) + 1;
  const newCursor = `${count}${cursor.replace(prevCount, '')}`;
  return { cursor: newCursor };
};

const generateId = () => String(Math.random().toString(36).substr(2, 9));
const generatePosts = () => {
  const posts = [];
  let current = 0;
  const postsToCreate = 40;
  while (current <= postsToCreate) {
    const id = String(generateId());
    posts.push(
      mockPost({
        id,
        body: `<div><h1>Is Crypto the next big thing?</h1><span>Check out my post, the id is: <strong>#${id}</strong></span></div>`,
      })
    );
    current += 1;
  }
  return posts;
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req;
  const { cursor } = generateCursor(query.cursor);
  return res.status(200).json({
    posts: generatePosts(),
    cursor,
    hasMore: true,
  });
};

export default handler;
