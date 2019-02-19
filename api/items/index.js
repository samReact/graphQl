import { Router } from 'express';

import {
  getAllItemsWithTopComment,
  getItemDetailsWithTopThreeComments,
} from '../../dbRequests';

export default Router()
  .get('/', async (_req, res) => {
    const items = await getAllItemsWithTopComment();
    res.send(
      items.map(item => {
        const {
          id,
          name,
          commentId,
          commentContent,
          commentNumberOfStars,
        } = item;
        return {
          id,
          name,
          comments: [
            {
              id: commentId,
              content: commentContent,
              numberOfStars: commentNumberOfStars,
            },
          ],
        };
      })
    );
  })
  .get('/:id', async ({ params: { id: itemId } }, res) => {
    const rows = await getItemDetailsWithTopThreeComments(itemId);
    if (!rows.length) {
      res.sendStatus(404);
    }
    const { id, name, description } = rows[0];
    res.send({
      id,
      name,
      description,
      comments: rows.map(row => ({
        id: row.commentId,
        content: row.commentContent,
        numberOfStars: row.commentNumberOfStars,
      })),
    });
  });
