document.addEventListener('DOMContentLoaded', function () {

const formularioRegister  = document.getElementById('formulario-Register');

formularioRegister.addEventListener('submit', function (e) {
  e.preventDefault();
  
  const registrar = "registrar";

  

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
      alert(resultado.mensaje);
	  window.location.href = 'Login.jsp'; 

	  
	     } else {
      alert("Error: " + resultado.mensaje);
    }
  })
  .catch(error => {
    console.error('Error en el registro:', error);
    alert('Error al registrar el usuario.');
  });
});
})