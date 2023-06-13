import { db, collection, getDocs } from '../db.mjs';

const getDoctors = async (req, res) => {
	const doctorsCol = collection(db, 'doctores');
	const doctorsSnapshot = await getDocs(doctorsCol);
	const doctors = doctorsSnapshot.docs.map(doc => doc.data());
	res.status(200).json(doctors);
}

const getOneDoctor = async (req, res) => {
	const { id } = req.params;
	const doctor = await db.collection('doctores').doc(id).get();
	res.status(200).json(doctor.data());
}

const createDoctor = async (req, res) => {

	const {
		nombre, 
		cedula,
		especialidad,
	} = req.body

	try {
		const newDoctor = db.collection('doctores').doc();
		newDoctor.set({
			nombre,
			cedula,
			especialidad,
		});
		await newDoctor.save();

		res.status(201).json(newDoctor.data());
	} catch (error) {
		return res.status(500).json(`Error: ${error}`);	
	}

}

const updateDoctor = async (req, res) => {

	const {
		id,
		nombre, 
		cedula,
		especialidad,
	} = req.body

	try {
		const doctor = db.collection('doctores').doc(id);
		doctor.set({
			nombre,
			cedula,
			especialidad,
		});
		await doctor.save();
		res.status(200).json(doctor.data());
	} catch (error) {
		return res.status(500).json(`Error: ${error}`);	
	}
}

const deleteDoctor = async (req, res) => {
	const { id } = req.params;
	try {
		const doctor = db.collection('doctores').doc(id);
		await doctor.delete();
		res.status(200).json(doctor.data());
	} catch (error) {
		return res.status(500).json(`Error: ${error}`);	
	}
}

export default {
	getDoctors,
	getOneDoctor,
	createDoctor,
	updateDoctor,
	deleteDoctor,
}