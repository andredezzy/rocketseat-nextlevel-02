import { Router } from 'express';

import classesRouter from './classes.routes';
import connectionsRouter from './connections.routes';

const router = Router();

router.use('/classes', classesRouter);
router.use('/connections', connectionsRouter);

export default router;