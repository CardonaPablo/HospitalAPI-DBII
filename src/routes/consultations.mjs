import express from 'express';

const router = express.Router();

import controller from '../controllers/consultations.mjs';

router.get('/', controller.getConsultationsByDoctor)
router.get('/:consultationId', controller.getConsultationByDoctor)
router.post('/', controller.createConsultationByDoctor)
router.put('/', controller.updateConsultationByDoctor)
router.delete('/:consultationId', controller.deleteConsultationByDoctor)

export default router;
