import { db, collection, getDocs } from '../db.mjs';

const getConsultationsByDoctor = async (req, res) => {
	const { id: doctorId } = req.params;
	const consultationsRef = db.collection('doctores').doc(doctorId).collection('consultas');
	const consultationsSnapshot = await consultationsRef.get();
	const consultations = consultationsSnapshot.docs.map(doc => doc.data());
	res.send(consultations);
}

const getConsultationByDoctor = async (req, res) => {
	const { id: doctorId, consultationId } = req.params;
	const consultationRef = db.collection('doctores').doc(doctorId).collection('consultas').doc(consultationId);
	const consultationSnapshot = await consultationRef.get();
	const consultation = consultationSnapshot.data();
	res.send(consultation);
}

const createConsultationByDoctor = async (req, res) => {
	const { id: doctorId } = req.params;
	const {
		pacienteId,
		fecha,
		diagnostico,
		tratamiento
	} = req.body;

	const consultationRef = db.collection('doctores').doc(doctorId).collection('consultas');
	const newConsultationRef = await consultationRef.add({
		pacienteId: `/pacientes/${pacienteId}`,
		fecha,
		diagnostico,
		tratamiento
	});
	const newConsultationSnapshot = await newConsultationRef.get();
	const newConsultation = newConsultationSnapshot.data();
	res.send(newConsultation);
}

const updateConsultationByDoctor = async (req, res) => {
	const { id: doctorId } = req.params;
	const {
		consultationId,
		pacienteId,
		fecha,
		diagnostico,
		tratamiento
	} = req.body;

	const consultationRef = db.collection('doctores').doc(doctorId).collection('consultas').doc(consultationId);
	await consultationRef.update({
		pacienteId: `/pacientes/${pacienteId}`,
		fecha,
		diagnostico,
		tratamiento
	});
	const consultationSnapshot = await consultationRef.get();
	const consultation = consultationSnapshot.data();
	res.send(consultation);
}

const deleteConsultationByDoctor = async (req, res) => {
	const { id: doctorId, consultationId } = req.params;
	const consultationRef = db.collection('doctores').doc(doctorId).collection('consultas').doc(consultationId);
	await consultationRef.delete();
	res.send("Consultation deleted");
}

export default {
	createConsultationByDoctor,
	deleteConsultationByDoctor,
	getConsultationByDoctor,
	getConsultationsByDoctor,
	updateConsultationByDoctor
}