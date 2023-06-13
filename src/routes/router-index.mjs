import express from 'express';

const router = express.Router();
import doctorsRouter from './doctors.mjs';
import patientsRouter from './patients.mjs';

router.use('/doctors', doctorsRouter)
router.use('/patients', patientsRouter)

export default router;