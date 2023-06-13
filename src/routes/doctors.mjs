import express from 'express';
const router = express.Router();

import controller from '../controllers/doctors.mjs';
import consultationRouter from './consultations.mjs';

router.get('/', controller.getDoctors)
router.get('/:id', controller.getOneDoctor)
router.post('/', controller.createDoctor)
router.put('/', controller.updateDoctor)
router.delete('/:id', controller.deleteDoctor)

router.use('/:id/consultations', consultationRouter)

export default router;
