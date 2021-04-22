/* istanbul ignore file */

// mocks
import { mockPost } from 'tools/mocks/post';

// types
import type { NextApiRequest, NextApiResponse } from 'next';

const baseCursor = '1qwertyuiop1234567890asdfghjklzxcvbnm';

const generateCursor = (cursor): { cursor: string; count: number } => {
  if (!cursor) return { cursor: baseCursor, count: 1 };

  const prevCount = cursor.replace(/(^\d+)(.+$)/i, '$1');
  const count = Number(prevCount) + 1;
  const newCursor = `${count}${cursor.replace(prevCount, '')}`;
  return { count, cursor: newCursor };
};

const generatePosts = (count: number, currentIndex: number) => {
  const posts = [];
  let current = 0;
  let postIndex = currentIndex;
  const postsToCreate = 40;

  while (current <= postsToCreate) {
    posts.push(
      mockPost({
        id: String(postIndex),
        body: `<div><h1>Rendering Content On Sapien is super fun</h1><span>btw this Post is the Post <strong>#${postIndex}</strong></span></div>`,
      })
    );
    current += 1;
    postIndex += 1;
  }
  return posts;
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req;

  const { cursor, count } = generateCursor(query.cursor);
  return res.status(200).json({
    posts: generatePosts(count, count),
    cursor,
    hasMore: true,
  });
};

export default handler;
