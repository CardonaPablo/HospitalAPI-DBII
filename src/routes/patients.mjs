import express from 'express';

const router = express.Router();

import controller from '../controllers/patients.mjs';

router.get('/', controller.getPatients)
router.get('/:id', controller.getOnePatient)
router.post('/', controller.createPatient)
router.put('/', controller.updatePatient)
router.delete('/:id', controller.deletePatient)

import studyRouter from './studies.mjs';
router.use('/:id/studies', studyRouter)

export default router;
