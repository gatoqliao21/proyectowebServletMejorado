<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<script src="js/Register.js" type="text/javascript"></script>
<link rel="stylesheet" href="css/Register.css">


<title>Insert title here</title>
</head>
<body>

<form id="formulario-Register"  >
		
		
		<label>DNI:</label>
		<input class="inputs" type="text"  id ="dni-txt"  required >
		<br>
		<label>nombres:</label>
		<input class="inputs" type="text"  id ="nombre-txt" required >
		<br>
		<label>Apellidos:</label>
		<input class="inputs" type="text"  id="Apellido-txt" required>
		<br>
		<div>
		<label  for="sexo">Genero</label>
          <select class="inputs" id="Sexo-txt"  required >
          		<option value="Masculino">Masculino</option>	          
          		<option value="Femenino">Femenino</option>
          </select>
          
          
		</div>
		<br>
    	<div class="labelcontainer">
			<label>Fecha de Nacimiento</label>
			<input  class="inputs"  id="txtfecha" type="date" name="fecha_nacimiento"  required>
       </div>

		<br>
		<label>Correo:</label>
				<input class="inputs" type="email"  id="correo-txt"  required>
				<br>
		
		<label>contrasena:</label>
				<input class="inputs" type="Password"   id="contrasena-txt" required>
		<br>
		<button type="submit" class="buttons" id="btn-submit" >Registrar		</button>

</form>

</body>
</html>