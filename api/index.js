import { Router } from 'express';

import comments from './comments';
import items from './items';

export default Router()
  .use('/items', items)
  .use('/comments', comments);
