document.addEventListener('DOMContentLoaded', function () {

const btnFormRegistrar = document.getElementById('miBoton');
const formularioReg = document.getElementById('contenedorGeneral');
const btnCerrarFormReg = document.getElementById('cerrar-formulario');


const accion = 'obtenerDatos';


miBoton.addEventListener('click',function(){
	
	if(window.getComputedStyle(formularioReg).display=== 'none'){
		formularioReg.style.display='block';
		formularioReg.style.position='absolute';
		
		
	}else{
		formularioReg.style.display='none';
	}
	
})
btnCerrarFormReg.addEventListener('click',function(){
	const btnEstilo=window.getComputedStyle(formularioReg);
	if(btnEstilo.display!=='none') {
		
		formularioReg.style.display='none';

	}
	
})

formularioReg.addEventListener('submit', function(event){

	event.preventDefault();
	
	const regPac="registrar"
	let nombre = $('#txtNombre').val();
	let fecha = $('#txtfecha').val();
	let sexo = $('#cboSexo').val();
	let telefono = $('#txtTelefono').val();
	let direccion = $('#txtDireccion').val();
	let consulta= $('#txtMotivo').val();
	
	
	const datos ={
		accion: regPac,
		nombre: nombre,
		fecha:fecha,
		sexo:sexo,
		telefono:telefono,
		direccion:direccion,
		consulta:consulta,
		
	}
	
	fetch('./GestionPacientesServlet',	{
			
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			
			body: JSON.stringify(datos)
				
		   }).then(response => response.json())

		   .then(data => {
		   	       console.log("Respuesta del servidor", data);
		   	      
		   
})
	
	


fetch(`./GestionPacientesServlet?accion=${accion}`, {
        method: 'GET',
    })
	.then(response => {
		if (!response.ok) {
		   throw new Error('Error en la petición: ' + response.statusText); }
	return response.json();
		    })
	.then(data => {

		
		const listaPacientes = data; 
		    const tbodyPacientes = document.querySelector('#mi_tabla_citas tbody');
		console.log(listaPacientes); // Esto es el array de pacientes

		    // 2. Usar la listaPacientes para poblar la tabla
		    if (listaPacientes && Array.isArray(listaPacientes) && listaPacientes.length > 0){
		        
		        tbodyPacientes.innerHTML = ''; // Limpia
		        
		        listaPacientes.forEach(paciente => {
		            const fila = document.createElement('tr');							
		            fila.innerHTML=	`
		                <td>${paciente.nombre}</td>
		                <td>${paciente.Fecha}</td>
		                <td>${paciente.Sexo}</td>
		                <td>${paciente.Telefono}</td>
		                <td>${paciente.Direccion}</td>
		                <td>${paciente.Consulta}</td>
		            `;
		            tbodyPacientes.appendChild(fila)
		        })
		        
		    } else {
		        // Mensaje si el array está vacío o no es un array válido
		        tbodyPacientes.innerHTML = '<tr><td colspan="6">No hay pacientes registrados.</td></tr>';
		    }
	
	})
	.catch(error => {
		   console.error("Hubo un problema con la operación fetch:", error);
		    });
	




})