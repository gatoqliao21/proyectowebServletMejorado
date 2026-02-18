document.addEventListener('DOMContentLoaded', function () {

const formularioRegister  = document.getElementById('formulario-Register');

formularioRegister.addEventListener('submit', function (e) {
  e.preventDefault();
  
  const registrar = "registrar";

  const respuesta_registro= document.getElementById('etiqueta-respuesta');


  const datos = {
	dni: document.getElementById('dni-txt').value,
    nombre: document.getElementById('nombre-txt').value,
    apellido: document.getElementById('Apellido-txt').value,
	genero: document.getElementById('Sexo-txt').value,
	fechaNac: document.getElementById('txtfecha').value,
    correo: document.getElementById('correo-txt').value,
    contrasena: document.getElementById('contrasena-txt').value,
	accion: registrar,
	  };
	  
	  
	  
	  if (!datos.dni || !datos.genero || !datos.apellido|| !datos.nombre || !datos.fechaNac || !datos.correo || !datos.contrasena) {
	      alert("Completa todos los campos antes de continuar.");
	      return;
	    }
	  
	  

  fetch('./Autentificacion', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  })
  .then(response => response.json())
  .then(resultado => {
    if (resultado.estado) {
	  
		console.log(resultado.mensaje)
	  if(respuesta_registro){

		respuesta_registro.style.opacity="1";
			  respuesta_registro.style.fontWeight="bold";
			  respuesta_registro.style.background="#269726";
			  respuesta_registro.innerHTML=`<p>${resultado.mensaje}</p>`
		  
		  
			  }
			  setTimeout(function() {
			  			respuesta_registro.style.opacity = '0';
			  			
			  			setTimeout(function() {
			  				 if (respuesta_registro) {
			  				respuesta_registro.innerHTML = '';
			  				respuesta_registro.style.background = '';}
			  						}, 300);
			  					}, 1200);     
			  						   	
			  					   	
			  						   			
			  			  
			  			setTimeout(function() {
			  	//	  window.location.href = 'Login.jsp';
			  			}, 1500);
			  	       
			  
			  
	  

	  
	 // window.location.href = 'Login.jsp'; 

	  
	     } else {
      console.log("Error: " + resultado.mensaje);
    if(respuesta_registro){
		respuesta_registro.style.background='red';
				respuesta_registro.innerHTML=`<p>${resultado.mensaje}</p>`;
		respuesta_registro.style.opacity = '1';
		respuesta_registro.style.fonweight='bold';
		
		
		

		
		
		
	}
	setTimeout(function() {
			            if (respuesta_registro) {

			                respuesta_registro.style.opacity = '0';
							setTimeout(function() {
							        if (respuesta_registro) {
							            respuesta_registro.innerHTML = '';
							            respuesta_registro.style.background = '';
							        }
							    }, 300); 
						
						        }
			        }, 2000);	
	
	
	  }
  })
  .catch(error => {
    console.error('Error en el registro:', error);
    alert('Error al registrar el usuario.');
  });
});
})