document.addEventListener('DOMContentLoaded', function () {

  const btnFormRegistrar = document.getElementById('miBoton');
  const formularioReg = document.getElementById('contenedorGeneral');
  const btnCerrarFormReg = document.getElementById('cerrar-formulario');
  const tbodyPacientes = document.querySelector('#mi_tabla_citas tbody'); 
  const accion = 'obtenerDatos';

  
  function cargarPacientes() {
     fetch(`./GestionPacientesServlet?accion=${accion}`)
       .then(response => {
         if (!response.ok) throw new Error('Error al obtener pacientes');// excepcion obtenida ante la respuesta null 
         return response.json();
       })
       .then(listaPacientes => {   //manejo de lista devuelta por el servlet 
         tbodyPacientes.innerHTML = ''; 

         if (Array.isArray(listaPacientes) && listaPacientes.length > 0) {
           listaPacientes.forEach(paciente => {
             const fila = document.createElement('tr');
             fila.innerHTML = `
               <td>${paciente.nombre}</td>
               <td>${paciente.Fecha}</td>
               <td>${paciente.Sexo}</td>
               <td>${paciente.Telefono}</td>
               <td>${paciente.Direccion}</td>
               <td>${paciente.Consulta}</td>
             `;
             tbodyPacientes.appendChild(fila);
           });
         } else {  //se llama al else siempre y cuando no tengamos una lista pacinetes ni  una cantidad mayor a 0 
           tbodyPacientes.innerHTML = '<tr><td colspan="6">No hay pacientes registrados.</td></tr>';
         }
       })
       .catch(error => {
         
		   console.error("Error al cargar pacientes:", error);
         tbodyPacientes.innerHTML = '<tr><td colspan="6">Error al cargar los pacientes.</td></tr>';
       });
   }
   cargarPacientes();

  
  
  btnFormRegistrar.addEventListener('click', function () {
    if (window.getComputedStyle(formularioReg).display === 'none') {
      formularioReg.style.display = 'block';
      formularioReg.style.position = 'absolute';
    } else {
      formularioReg.style.display = 'none';
    }
  });

  btnCerrarFormReg.addEventListener('click', function () {
    const btnEstilo = window.getComputedStyle(formularioReg);
    if (btnEstilo.display !== 'none') {
      formularioReg.style.display = 'none';
    }
  });

  formularioReg.addEventListener('submit', function (event) {
    event.preventDefault();

    const nombre = document.getElementById('txtNombre').value.trim();
    const fecha = document.getElementById('txtfecha').value;
    const sexo = document.getElementById('cboSexo').value;
    const telefono = document.getElementById('txtTelefono').value.trim();
    const direccion = document.getElementById('txtDireccion').value.trim();
    const consulta = document.getElementById('txtMotivo').value.trim();

	if (!nombre || !fecha || !sexo || !telefono || !direccion || !consulta) {
	  alert("completa los campos");
	  return;
	}
	
	
	
    const datos = {
      accion: "registrar",
      nombre,
      fecha,
      sexo,
      telefono,
      direccion,
      consulta,
    };

    fetch('./GestionPacientesServlet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
    })
      .then(response => response.json())  // procesa respuesta del servidor convirtiendolo a  json 
      .then(data => {
        console.log("Respuesta del servidor:", data);
		//manejando el cuerpo de la respuesta http 

		  if (data.estado) {
		          alert(data.mensaje); 
		          formularioReg.style.display = 'none';
		          cargarPacientes(); 
		        } else { // si el parametro estado entra es false
		          alert(data.mensaje); }
		      })
		      .catch(error => {
		        console.error("Error en fetch:", error);
		        alert("Ocurrió un error al registrar el paciente: " + error.message);
		      });
		  });
		});
