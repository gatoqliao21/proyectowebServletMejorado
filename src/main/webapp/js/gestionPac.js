document.addEventListener('DOMContentLoaded', function () {

	
	
	const contenedorActualizarData = document.getElementById('contenedorActualizarData');
	const btnEditarPerfil = document.getElementById('btn-editar-perfil');

	const formActualizarDataUsuario = document.getElementById("formActualizarPerfil");
  const btnFormRegistrar = document.getElementById('miBoton');
  const ContenedorformularioReg = document.getElementById('contenedorGeneral');
  const btnProcesarRegistro=  document.getElementById('btnProcesarGestion');

  const btnCerrarFormReg = document.getElementById('cerrar-formulario');
<<<<<<< HEAD
  const tbodyPacientes = document.querySelector('#mi_tabla_citas tbody'); 
=======
  const tbodyPacientes = document.querySelector('#mi_tabla_citas tbody');
  const formularioReg = document.getElementById('formulario');
>>>>>>> 73e5594 (implementamos mejoras en tanto en la autentificacion , como en el manejo)
  const accion = 'obtenerDatos';
  
  const mensajeExito =  document.getElementById('mensajeExito');

  

   // se decklara un arreglo de ambito superior para modificar los pacientes
  
  	let listaPacientesData= []
  
  function cargarPacientes() {
<<<<<<< HEAD
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
=======
    fetch(`./GestionPacientesServlet?accion=${accion}`)
      .then(response => response.json())
      .then(listaPacientes => {
		listaPacientesData = listaPacientes;
		
        tbodyPacientes.innerHTML = '';
        if (Array.isArray(listaPacientesData) && listaPacientesData.length > 0) {
      
			
		 listaPacientesData.forEach(paciente => {
            const fila = document.createElement('tr');
			const pacienteID= paciente.id;	
			console.log(pacienteID)
			
            fila.innerHTML = `
              <td>${paciente.nombre}</td>
              <td>${paciente.Sexo}</td>
              <td>${paciente.Telefono}</td>
              <td>${paciente.Consulta}</td>
			  <td>
			    <button id="btn_editar_${pacienteID}" type="button">Editar</button>
				<button id="btn_eliminar_${pacienteID}" type="button">Eliminar</button>
			</td>
			  
			              `;
            tbodyPacientes.appendChild(fila);
// se  crea boton seleccionable despues de crear la fila 
			const btn_eliminar = document.getElementById(`btn_eliminar_${pacienteID}`); 

			
				// ya existe en el dom por ello es  accesible 
			btn_eliminar.addEventListener('click', () => {
					 		console.log(`eliminado paciente con ID:${pacienteID}`);
				parametros={
					accion:"eliminar",
					id: paciente.DNI
					
					
				};
				
				fetch('./GestionPacientesServlet', {
				    method: 'POST',
				    headers: { 'Content-Type': 'application/json' },
				    body: JSON.stringify(parametros)
				  })
				    .then(response => response.json())
				    .then(data => {
				      if (data.estado) {
				        alert(data.mensaje);
				        cargarPacientes();
				      } else {
				        alert("Error: " + data.mensaje);
				      }
				    })
				    .catch(error => {
				      console.error("Error en fetch:", error);
				      alert("Ocurrió un error al registrar el paciente.");
				    });
				
				

							
												})
				
			
			
			
			
			
          });
        } else {
			tbodyPacientes.innerHTML = '<tr><td colspan="5">No hay pacientes registrados.</td></tr>';        }
      })
      .catch(error => {
		console.error("Error al cargar pacientes:", error);
		        tbodyPacientes.innerHTML = '<tr><td colspan="5">Error al cargar los pacientes.</td></tr>';
		      });
  }
  cargarPacientes();
>>>>>>> 73e5594 (implementamos mejoras en tanto en la autentificacion , como en el manejo)

  
  // SE CREA VALRIABLE PARA SELECCIONAR 

  
  btnFormRegistrar.addEventListener('click', function () {
    if (window.getComputedStyle(ContenedorformularioReg).display === 'none') {

	  
	  ContenedorformularioReg.style.display = 'block';
	     ContenedorformularioReg.style.position = 'fixed';
	     ContenedorformularioReg.style.top = '50%';
	     ContenedorformularioReg.style.left = '50%';
	     ContenedorformularioReg.style.transform = 'translate(-50%, -50%)';
	     ContenedorformularioReg.style.opacity = '0';

      setTimeout(() => {
        ContenedorformularioReg.style.opacity = 1;
      }, 10);

    } else {
      ContenedorformularioReg.style.transition = 'opacity 0.4s ease';
      ContenedorformularioReg.style.opacity = 0;

      setTimeout(() => {
        ContenedorformularioReg.style.display = 'none';
      }, 400);
    }
  });

  btnCerrarFormReg.addEventListener('click', function () {
    ContenedorformularioReg.style.transition = 'opacity 0.4s ease';
    ContenedorformularioReg.style.opacity = 0;
    setTimeout(() => {
      ContenedorformularioReg.style.display = 'none';
    }, 400);
  });

  btnEditarPerfil.addEventListener('click', function () {
    if (window.getComputedStyle(contenedorActualizarData).display === 'none') {
      contenedorActualizarData.style.display = 'block';
      contenedorActualizarData.style.position = 'fixed';
      contenedorActualizarData.style.top = '50%';
      contenedorActualizarData.style.left = '50%';
      contenedorActualizarData.style.transform = 'translate(-50%, -50%)';
      contenedorActualizarData.style.opacity = '0';

      setTimeout(() => {
        contenedorActualizarData.style.transition = 'opacity 0.4s ease';
        contenedorActualizarData.style.opacity = '1';
      }, 10);

    } else {
      contenedorActualizarData.style.transition = 'opacity 0.4s ease';
      contenedorActualizarData.style.opacity = '0';
      setTimeout(() => {
        contenedorActualizarData.style.display = 'none';
      }, 400);
    }
  });

  const btnCerrarActualizar = contenedorActualizarData.querySelector('#cerrar-formulario');

  btnCerrarActualizar.addEventListener('click', function () {
    contenedorActualizarData.style.transition = 'opacity 0.4s ease';
    contenedorActualizarData.style.opacity = 0;
    setTimeout(() => {
      contenedorActualizarData.style.display = 'none';
    }, 400);
  });
  
  

  // REGISTRAR PACIENTE 
  btnProcesarRegistro.addEventListener('click', function (event) {
    event.preventDefault();

    const parentesco = document.getElementById('cboParentesco').value.trim();
    const dni = document.getElementById('txtDni').value.trim();
    const sexo = document.getElementById('cboSexo').value;
    const apellidoPat = document.getElementById('txtApellidoPat').value.trim();
    const apellidoMat = document.getElementById('txtApellidoMat').value.trim();
    const nombre = document.getElementById('txtNombre').value.trim();
    const fecha = document.getElementById('txtfecha').value;
    const correo = document.getElementById('txtCorreo').value;
    const telefono = document.getElementById('txtTelefono').value.trim();
    const direccion = document.getElementById('txtDireccion').value.trim();
    const consulta = document.getElementById('txtMotivo').value.trim();

    if (!parentesco || !dni || !sexo || !apellidoPat || !apellidoMat || !nombre || !fecha || !correo || !telefono || !direccion || !consulta) {
      alert("Completa todos los campos antes de continuar.");
      return;
    }

    if (!/^\d{8}$/.test(dni)) {
      alert("El DNI debe tener 8 dígitos.");
      return;
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(correo)) {
      alert("El correo electrónico no es válido.");
      return;
    }

    const datos = {
      accion: "registrar",
      parentesco,
      dni,
      sexo,
      apellidoPat,
      apellidoMat,
      nombre,
      fecha,
      correo,
      telefono,
      direccion,
      consulta,
    };

    fetch('./GestionPacientesServlet', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    })
      .then(response => response.json())  // procesa respuesta del servidor convirtiendolo a  json 
      .then(data => {
<<<<<<< HEAD
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
=======
        if (data.estado) {
          alert(data.mensaje);
          ContenedorformularioReg.style.display = 'none';
          cargarPacientes();
        } else {
          alert("Error: " + data.mensaje);
        }
      })
      .catch(error => {
        console.error("Error en fetch:", error);
        alert("Ocurrió un error al registrar el paciente.");
      });
  });

  
  formActualizarDataUsuario.addEventListener("submit", function (event) {
      event.preventDefault();

      const peso = document.getElementById('peso').value;
      const altura = document.getElementById('altura').value;
      const tipoSangre = document.getElementById('sangre-txt').value;
      
      if (!peso || !altura) {
          alert("Por favor complete peso y altura");
          return;
      }

   
	  
	  
	  

	  const params ={
	  accion:"actualizarPerfil",
	  peso,
	  altura,
	  tipoSangre

	  }
	  
	  
	  
    
      const submitBtn = formActualizarDataUsuario.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
	  
	  submitBtn.textContent = "Guardando...";
	  	
	  			submitBtn.disabled = true;  

		

      
	  
      fetch("./GestionUsuarioServlet", {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(params)
      })
      .then(response => response.json()
		
		
	  )
      .then(data => {
          console.log("Datos de respuesta:", data);
          
          if (data.status) {
              console.log("Perfil actualizado exitosamente");
             
			  
			          setTimeout(() => {
			              mensajeExito.style.display = 'block'; 
			              
			              setTimeout(() => {
			                   mensajeExito.style.display = 'none';
			              }, 3000); 
			              
			          }, 1000);
			  
			  
			  
          } else {
              throw new Error("Respuesta inesperada: " + data);
          }
      })
      .catch(error => {
          console.error("Error completo:", error);
          alert("Error al actualizar perfil: " + error.message);
      })
      .finally(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
      });
  });
  
  
  
/**
 *  btn_eliminar.addEventListener("DOMContentLoaded", function (event) {
 	event.preventDefault();
 	
 	lista
 	
 	fetch("./GestionPacientesServlet", {
 		method: 'POST',
 		headers: { 'Content-Type': 'application/json' },
 	      
 		
 		  body: JSON.stringify(params)
 	    })
 	    .then(response => response.json()
 		
 		
 	  )
 	
 	
 	
   })
 * 
 *  */  
  
  
});
>>>>>>> 73e5594 (implementamos mejoras en tanto en la autentificacion , como en el manejo)
