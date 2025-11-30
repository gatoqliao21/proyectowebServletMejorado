document.addEventListener('DOMContentLoaded', function() {

	let formularioLogin = document.getElementById('formulario-Log');
		
	 formularioLogin.addEventListener('submit', function(event) {
	   event.preventDefault();
	   const login = "login";

	   const etiquetaRespuesta=document.getElementById('etiqueta-respuesta');
	   const correoLog= document.getElementById('correo-txt').value;
	   const contrasenaLog= document.getElementById('contrasena-txt').value;
	   const respuesta_registro= document.getElementById('etiqueta-respuesta');

	   if (correoLog.trim()==="" || contrasenaLog.trim()===""){
	   
	alert("completa los campos");
	return;
		
	}
	   
	   const datos ={
			correo: correoLog,
			contrasena: contrasenaLog,
			accion : login, 
		
	   }
	   

	   fetch('./Autentificacion',{
		
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		
		body: JSON.stringify(datos)
			
	   })
	   .then(response => response.json())
	   .then(data => {
	       console.log("Respuesta del servidor", data);
		   
	       if(data.status === "success") {
			
			if (respuesta_registro) {
			            respuesta_registro.style.opacity = '1';
						respuesta_registro.style.fontWeight = 'bold';
						respuesta_registro.style.background='#269726';
						  respuesta_registro.innerHTML = '<p>Bienvenido!</p>';
					
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
		  window.location.href = 'GestionPacientes.jsp';
			}, 1500);
	       } else {
			if (respuesta_registro) {
				
				respuesta_registro.style.background = 'red';

			            respuesta_registro.innerHTML = `<p> ${data.mensaje}</p>`;
		
						respuesta_registro.style.fontWeight = 'bold';
						 respuesta_registro.style.opacity = '1';
						
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

	  
	   
		
	   
	   



})})