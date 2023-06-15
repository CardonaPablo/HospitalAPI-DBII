import fs from 'fs';
import path from 'path';
// import { db, collection, getDocs, addDoc } from '../db.mjs';

export default function bulkInsert(req, res) {
	// Función para cargar los datos del archivo JSON a la colección de Firestore
	
	// Variables de entrada: nombre de la colección y nombre del archivo JSON
	const coleccion = "consultas" 
	const archivo = path.join(process.cwd() + "/src/data/consultas.json") 
	
	// Validar que se proporcionen los argumentos requeridos
	if (!coleccion || !archivo) {
		console.error('Se requieren el nombre de la colección y el nombre del archivo JSON.');
		console.log('Ejemplo de uso: node cargar_datos.js coleccion archivo.json');
	} else {
		// Cargar los datos del archivo JSON a la colección
		console.log('Cargando datos a la colección...');
		cargarDatosASubColeccion("doctores", "consultas",  archivo);
	}
	res.json('Datos cargados exitosamente.');
}

async function cargarDatosASubColeccion(coleccion, subcoleccion, archivo) {
	try {
	const data = fs.readFileSync(archivo, 'utf8');
	const registros = JSON.parse(data);

	const pacientColRef = collection(db, coleccion);
	const bufferPacientes = await getDocs(pacientColRef);
	let pacientes = []
	bufferPacientes.forEach(doc => pacientes.push(doc));

	console.log('Registros a cargar:', registros.length);
	const colRef = collection(db, coleccion);
	const buffer = await getDocs(colRef);
	let docs = []
	buffer.forEach(doc => docs.push(doc));
	console.log('Documentos en la colección:', docs);
	for(let i = 0; i < docs.length; i++) {
		const doc = docs[i];
		const subColRef = collection(colRef, doc.id, subcoleccion);
		let registro = registros[i];
		registro["pacienteId"] = `/pacientes/${pacientes[i].id}`;

		console.log(`Cargando registro ${i + 1} de ${registros.length}`);
		await addDoc(subColRef, registro);
	}

	console.log('Datos cargados exitosamente.');

	} catch (error) {
	console.error('Error al cargar los datos:', error);
	}
}