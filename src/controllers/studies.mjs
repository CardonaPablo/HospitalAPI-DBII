import { db, collection, getDocs } from '../db.mjs';

const getAllStudiesByPatient = async (req, res) => {
	const { id: patientId } = req.params;
	const studiesRef = db.collection('pacientes').doc(patientId).collection('estudios');
	const studiesSnapshot = await studiesRef.get();
	const studies = studiesSnapshot.docs.map(doc => doc.data());
	res.send(studies);
}

const getStudyByPatient = async (req, res) => {
	const { id: patientId, studyId } = req.params;
	const studyRef = db.collection('pacientes').doc(patientId).collection('estudios').doc(studyId);
	const studySnapshot = await studyRef.get();
	const study = studySnapshot.data();
	res.send(study);
}

const createStudyByPatient = async (req, res) => {
	const { id: patientId } = req.params;
	const {
		descripcion,
		fecha,
		nombre,
	} = req.body;

	const studyRef = db.collection('pacientes').doc(patientId).collection('estudios');
	const newStudyRef = await studyRef.add({
		descripcion,
		fecha,
		nombre,
	});
	const newStudySnapshot = await newStudyRef.get();
	const newStudy = newStudySnapshot.data();
	res.send(newStudy);
}

const updateStudyByPatient = async (req, res) => {
	const { id: patientId } = req.params;
	const {
		descripcion,
		fecha,
		nombre
	} = req.body;

	const studyRef = db.collection('pacientes').doc(patientId).collection('estudios').doc(studyId);
	await studyRef.update({
		descripcion,
		fecha,
		nombre
	});
	const studySnapshot = await studyRef.get();
	const study = studySnapshot.data();
	res.send(study);
}

const deleteStudyByPatient = async (req, res) => {
	const { id: patientId, studyId } = req.params;
	const studyRef = db.collection('pacientes').doc(patientId).collection('estudios').doc(studyId);
	await studyRef.delete();
	res.send();
}

export default {
	getAllStudiesByPatient,
	getStudyByPatient,
	createStudyByPatient,
	updateStudyByPatient,
	deleteStudyByPatient
}