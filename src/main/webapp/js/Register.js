document.addEventListener('DOMContentLoaded', function () {

const formularioRegister  = document.getElementById('formulario-Register');

formularioRegister.addEventListener('submit', function (e) {
  e.preventDefault();
  
  const registrar = "registrar";

  

  const datos = {
    nombre: document.getElementById('nombre-txt').value,
    apellido: document.getElementById('Apellido-txt').value,
    correo: document.getElementById('correo-txt').value,
    contrasena: document.getElementById('contrasena-txt').value,
	accion: registrar,
	  };

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