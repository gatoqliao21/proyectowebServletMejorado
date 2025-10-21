document.addEventListener('DOMContentLoaded', function() {

	let formularioLogin = document.getElementById('formulario-Log');
		
	 formularioLogin.addEventListener('submit', function(event) {
	   event.preventDefault();
	   const login = "login";

	   const correoLog= document.getElementById('correo-txt').value;
	   const contrasenaLog= document.getElementById('contrasena-txt').value;
	   
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
	           window.location.href = 'GestionPacientes.jsp';
	       } else {
	           alert("Error en autenticación: " + data.mensaje);
	       }
	   })

	  
	   
	    
	   
	   
	   



})})