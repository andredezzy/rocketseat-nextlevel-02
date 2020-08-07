import  { Router } from 'express';

import ClassesController from '../controllers/ClassesController';

const classesRouter = Router();
const classesController = new ClassesController();

classesRouter.get('/', classesController.index);
classesRouter.post('/', classesController.create);

export default classesRouter;