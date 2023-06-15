import db from '../db.mjs';

const getPatients = async (req, res) => {
	const patientsCol = db.collection('pacientes');
	const patientsSnapshot = await patientsCol.get();
	const patients = patientsSnapshot.docs.map(doc => doc.data());
	res.status(200).json(patients);
}

const getOnePatient = async (req, res) => {
	const { id } = req.params;
	const patient = await db.collection('pacientes').doc(id).get();
	res.status(200).json(patient.data());
}

const createPatient = async (req, res) => {
	const {
		nombre,
		edad,
		peso, 
		altura,
		sexo,
	} = req.body

	try {
		const newPatient = db.collection('pacientes').doc();
		newPatient.set({
			nombre,
			edad,
			peso, 
			altura,
			sexo,
		});
		await newPatient.save();

		res.status(201).json(newPatient.data());
	} catch (error) {
		return res.status(500).json(`Error: ${error}`);	
	}
}

const updatePatient = async (req, res) => {
	const {
		id,
		nombre,
		edad,
		peso, 
		altura,
		sexo,
	} = req.body

	try {
		const patient = db.collection('pacientes').doc(id);
		patient.set({
			nombre,
			edad,
			peso, 
			altura,
			sexo,
		});
		await patient.save();
		res.status(200).json(patient.data());
	} catch (error) {
		return res.status(500).json(`Error: ${error}`);	
	}
}

const deletePatient = async (req, res) => {
	const { id } = req.params;
	try {
		const patient = db.collection('pacientes').doc(id);
		await patient.delete();
		res.status(200).json(patient.data());
	} catch (error) {
		return res.status(500).json(`Error: ${error}`);	
	}
}

export default {
	getPatients,
	getOnePatient,
	createPatient,
	updatePatient,
	deletePatient,
}