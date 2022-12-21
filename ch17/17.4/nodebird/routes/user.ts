import express from 'express';

import { isLoggedIn } from '../middlewares';
import { follow } from '../controllers/user';

const router = express.Router();

// POST /user/:id/follow
router.post('/:id/follow', isLoggedIn, follow);

export default router;
