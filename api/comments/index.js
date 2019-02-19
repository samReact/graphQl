import { Router } from 'express';

import { incrementNumberOfStarsForComment } from '../../dbRequests';

export default Router().patch(
  '/:id',
  async ({ params: { id }, query: { field, operation } }, res) => {
    try {
      if (field === 'numberOfStars' && operation === 'increment') {
        await incrementNumberOfStarsForComment(id);
        res.sendStatus(200);
      } else {
        res.sendStatus(400);
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
);
