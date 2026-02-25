document.addEventListener('DOMContentLoaded', function () {

	
	
	const contenedorActualizarData = document.getElementById('contenedorActualizarData');
	const btnEditarPerfil = document.getElementById('btn_editar_usuario');
//variables para el usuario 
const actualizarDatosUsuario =  document.getElementById("actualizarDatosUsuario");
	const formActualizarDataUsuario = document.getElementById("formActualizarPerfil");
  const btnFormRegistrar = document.getElementById('miBoton');
 
  // VARIABLES FORMULARIO DE REGISTRO  DE PACIENTES 
   const ContenedorformularioReg = document.getElementById('contenedorGeneral');
  const btnProcesarRegistro=  document.getElementById('btnProcesarGestion');
  const btnCerrarFormReg = document.getElementById('cerrar-formulario');
  const tbodyPacientes = document.querySelector('#mi_tabla_citas tbody'); 
//  const tbodyPacientes = document.querySelector('#mi_tabla_citas tbody');
  const formularioReg = document.getElementById('contenedorGeneral');
  
  const mensajeExito =  document.getElementById('mensajeExito');
//variable para cerrar sesion 

  
  const btnCerrarSession = document.getElementById('btn-cerrar-sesion');  
  


   // se decklara un arreglo de ambito superior para modificar los pacientes
   //const accion = 'obtenerDatos';
  
  	let listaPacientesData= []
	
	const accion='obtenerDatos'
  
  function cargarPacientes() {

     fetch(`./GestionPacientesServlet?accion=${accion}`)
       .then(response => {
         if (!response.ok) throw new Error('Error al obtener pacientes');// excepcion obtenida ante la respuesta null 
         return response.json();
       })
       .then(listaPacientesData => {   //manejo de lista devuelta por el servlet 
         tbodyPacientes.innerHTML = ''; 

         if (Array.isArray(listaPacientesData) && listaPacientesData.length > 0) {
           listaPacientesData.forEach(paciente => {
             const fila = document.createElement('tr');
             fila.innerHTML = `
               <td>${paciente.nombre}</td>
               <td>${paciente.Sexo}</td>
               <td>${paciente.Telefono}</td>
             <td>${paciente.Consulta}</td>
			 <td>${
				`
				<button class="btn-accion-pacienes btn-editar" data-dni="${paciente.DNI}" >editar</button>
				<button class="btn-accion-pacienes btn-eliminar" data-dni="${paciente.DNI}">eliminar</button>
				`			 }</td>

			 
			              `;
             
			 tbodyPacientes.appendChild(fila);
			 
			 })
		 }
		 
		 


		 		 	
	 })
 }
			 ;
			 		
			 // ===================================
			 // REFERENCIA BOTÓN GUARDAR
			 // ===================================
			 const botonEditarPac = document.getElementById("actualizarDatosUsuario");

			 cargarPacientes();

			 // ===================================
			 // EVENTO GLOBAL (EDITAR / ELIMINAR)
			 // ===================================
			 document.addEventListener("click", function (event) {

			     const btn = event.target;

			     if (!btn.classList.contains("btn-accion-pacienes")) return;

			     const DNIPaciente = btn.dataset.dni;
			     const esEliminar = btn.classList.contains("btn-eliminar");

			     // ===============================
			     // 🔴 ELIMINAR
			     // ===============================
			     if (esEliminar) {

			         const parametros = {
			             DNI: DNIPaciente,
			             accion: "eliminar"
			         };

			         enviarAlServlet(parametros);
			         return;
			     }

			     // ===============================
			     // 🟢 EDITAR (abrir modal)
			     // ===============================
			     const formularioEditarPac = document.getElementById('contenedor-formulario-edit-Pac');
			     formularioEditarPac.style.display = "block";
			     formularioEditarPac.style.opacity = "1";

			     // Guardamos el DNI en el botón guardar
			     botonEditarPac.dataset.dni = DNIPaciente;
			 });


			 // ===================================
			 // BOTÓN GUARDAR (EDITAR)
			 // ===================================
			 botonEditarPac.addEventListener('click', function () {

			     const parametros = {
			         DNI: botonEditarPac.dataset.dni,
			         parentesco: document.getElementById('cboParentesco').value.trim(),
			         correo: document.getElementById('txtCorreo').value.trim(),
			         fechaNac: document.getElementById('txtfecha').value,
			         telefono: document.getElementById('txtTelefono').value.trim(),
			         direccion: document.getElementById('txtDireccion').value.trim(),
			         accion: "editar"
			     };

			     console.log(parametros);

			     enviarAlServlet(parametros);
			 });
			  
		function enviarAlServlet(parametros){
			
			
			

					fetch('./GestionPacientesServlet',{
						method:'POST',
						headers:
							{'Content-Type':'application/json'},
							body:JSON.stringify(parametros)
						
						
					})
					.then(response=> response.json())
					.then(data=>{
						if(data.estado){
							alert(data.mensaje);
							cargarPacientes();
						}else{
							alert("Error : " + data.mensaje)
						}

					})
					.catch(error => {
						console.error("Error en fetch:", error);
						alert("Ocurrió un error AL REALIZAR OPERACION.");

						})

			
		}	  
			  
			  
			  
  
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
     
		
		
		formActualizarDataUsuario.addEventListener("submit", function (event) {
		    event.preventDefault();

			const correo = document.getElementById('txtActualizarCorreo').value.trim(); 

		    const peso = document.getElementById('peso-txt').value.trim(); 
		    const altura = document.getElementById('altura-txt').value.trim(); 
			const tipoSangre = document.getElementById('sangre-txt').value.trim();
		    if (!peso || !altura || !tipoSangre || !correo ) {
		        alert("Completa todos los campos antes de continuar.");
		        return;
		    }

		    const parametros = {
		        accion: "actualizarDatos", 
				correo: correo,
		        peso: peso,
		        altura: altura,
		        tipoSangre: tipoSangre
		    };

		    const submitBtn = formActualizarDataUsuario.querySelector('button[type="submit"]');
		    const originalText = submitBtn.textContent;
		    submitBtn.textContent = "Guardando...";
		    submitBtn.disabled = true;  

		    fetch("./GestionUsuarioServlet", {
		        method: 'POST',
		        headers: { 'Content-Type': 'application/json' },
		        body: JSON.stringify(parametros)
		    })
		    .then(response => {
		        if (!response.ok) throw new Error("Error en el servidor");
		        return response.json();
		    })
		    .then(data => {
		        if (data.status) {
		            // Mostrar mensaje de éxito (tu lógica de setTimeout)
		            mensajeExito.style.display = 'block';
		            setTimeout(() => { mensajeExito.style.display = 'none'; }, 3000);
		        } else {
		            alert("Error: " + data.mensaje);
		        }
		    })
		    .catch(error => {
		        console.error("Error:", error);
		        alert("Error al actualizar: " + error.message);
		    })
		    .finally(() => {
		        submitBtn.textContent = originalText;
		        submitBtn.disabled = false;
		    });
		});
		   

		 
		 
		 
		 
		btnCerrarSession.addEventListener('click',function(){
			if(confirm("¿estas seguro de cerrar sesion?")){
				
			const parametros= {accion : "cerrarSesion"};
				
				fetch("./GestionUsuarioServlet", {
						        method: 'POST',
						        headers: { 'Content-Type': 'application/json' },
						        body: JSON.stringify(parametros )
						    })
				.then(() => {
					window.location.href = 'Login.jsp';
					});
			}
			
		})
	
		
		
  
  });