import express from 'express';

const router = express.Router();

import controller from '../controllers/studies.mjs';

router.get('/', controller.getAllStudiesByPatient)
router.get('/:studyId', controller.getStudyByPatient)
router.post('/', controller.createStudyByPatient)
router.put('/', controller.updateStudyByPatient)
router.delete('/:studyId', controller.deleteStudyByPatient)

export default router;
