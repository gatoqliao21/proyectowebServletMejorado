<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="models.Usuario" %>

<%
    Usuario usuario = (Usuario) session.getAttribute("usuarioLogeado");

    if (usuario == null) {
        response.sendRedirect("Login.jsp"); 
        return;
    }

    String fechaNacStr = usuario.getFechNac(); 
    int edad = 0;
    if(fechaNacStr != null && !fechaNacStr.isEmpty()) {
        java.time.LocalDate fechaNac = java.time.LocalDate.parse(fechaNacStr);
        java.time.LocalDate hoy = java.time.LocalDate.now();
        edad = java.time.Period.between(fechaNac, hoy).getYears();
    }

    String[] tiposSangre = {"A+", "A-", "O+", "O-", "B+", "B-", "AB+", "AB-"};
    String tipoUsuario = usuario.getTipoDeSangre() != null ? usuario.getTipoDeSangre() : "";
%>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Gestión Pacientes</title>
    <link rel="stylesheet" href="css/estilosGestionPac.css">
    <script src="js/gestionPac.js" type="text/javascript"></script>
</head>
<body>

<div id="Contenedor">



    <div id="contenedorDatos">
        <h1>Bienvenido <%= usuario.getNombre() %> <%= usuario.getApellido() %>!</h1>
    </div>

    <p style="text-align: center">
        Aquí podrás reservar, pagar, reprogramar tus citas presenciales o teleconsultas y acceder a tu información de manera fácil y segura.
    </p>

    <div id="ContenedorDatosUsuario">
        <div id="datos">
            <div id="cabeceraInformativa">
                <div class="perfil_img">
                    <img src=" " alt="perfil">
                </div>  
                <div id="perfil-txt">
                    <span id="sp_perfil">Mi Perfil Clínico</span><br>

				<div id="botones-edicionperfil">
				    <button type="button" id="btn-editar-perfil" class="btn-accion" style="width: 100%;">Editar mi perfil</button>
				
				    <button type="button" id="btn-cerrar-sesion" class="btn-accion" style="width: 100%;">Cerrar sesion</button>
				</div>

                </div>
            </div>

            <div id="datosDinamicos">
                <table id="miTablaDatos">
                    <tbody>
                        <tr><td>Nombre</td><td id="nombreVal"><%= usuario.getNombre() %></td></tr>
                        <tr><td>Apellido</td><td id="apellidoVal"><%= usuario.getApellido() %></td></tr>
                        <tr><td>Correo</td><td id="correoVal"><%= usuario.getCorreo() %></td></tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div id="contenedor_tablas_citas">
            <table id="mi_tabla_citas" style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr style="background-color:#f2f2f2;">
                        <th>Nombre del Paciente</th>
                        <th>Sexo</th>
                        <th>Numero Telefonico</th>                 
                        <th>Motivo De Consulta</th>
                        <th>Mantenimiento</th>
                        
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>

    <button id="miBoton" class="miBoton">Registrar paciente</button>

    <div id="contenedorGeneral">
        <button id="cerrar-formulario" type="button" class="btnCerrar"><span>×</span></button>
        <div id="titulo"><strong>Nuevo Paciente</strong></div>

        <div class="contenedorFormulario">
            <form id="formulario">
                <div class="labelcontainer">
                    <label>Parentesco</label>
                    <select id="cboParentesco" name="parentesco">
                        <option>Padre</option>
                        <option>Madre</option>
                        <option>Conyugue</option>
                        <option>Hermano(a)</option>
                        <option>Hijo</option>  
                        <option>Otro</option>
                    </select>
                </div>

                <div class="labelcontainer">
                    <label>Numero de Documento</label>
                    <input id="txtDni" type="text" name="dni">
                </div>

                <div class="labelcontainer">
                    <label>Género</label>
                    <select id="cboSexo" name="genero">
                        <option>Masculino</option>
                        <option>Femenino</option>
                        <option>Otro</option>
                    </select>
                </div>

                <div class="labelcontainer">
                    <label>Apellido Paterno</label>
                    <input id="txtApellidoPat" type="text" name="apellidoPat">
                </div>
                <div class="labelcontainer">
                    <label>Apellido Materno</label>
                    <input id="txtApellidoMat" type="text" name="apellidoMat">
                </div>

                <div class="labelcontainer">
                    <label>Nombre Completo</label>
                    <input id="txtNombre" type="text" name="nombre">
                </div>

                <div class="labelcontainer">
                    <label>Fecha de Nacimiento</label>
                    <input id="txtfecha" type="date" name="fecha_nacimiento">
                </div>

                <div class="labelcontainer">
                    <label>Correo Electronico</label>
                    <input id="txtCorreo" type="text" name="correo">
                </div>

                <div class="labelcontainer">
                    <label>Teléfono</label>
                    <input id="txtTelefono" type="text" name="telefono">
                </div>

                <div class="labelcontainer">
                    <label>Dirección</label>
                    <input id="txtDireccion" type="text" name="direccion">
                </div>

                <div class="labelcontainer">
                    <label>Motivo Consulta</label>
                    <input id="txtMotivo" type="text" name="consulta">
                </div>

                <div id="contenedor-boton">
                    <button id="btnProcesarGestion" type="submit">Registrar</button>
                </div>
            </form>
        </div>
    </div>

    <div id="contenedorActualizarData">
        <button id="cerrar-formulario" type="button" class="btnCerrar"><span>×</span></button>
        <h1 class="text-left" id="actperfil">Actualiza tu perfil clínico</h1>
	
	
	
	<form id="formActualizarPerfil" method="post">
    <input type="hidden" name="accion" value="actualizarPerfil">

    <div class="labelcontainer">
        <label>Genero</label>
        <input type="text" id="txtSexoActualizar" value="<%= usuario.getSexo() %>" disabled>
    </div>
    <div class="labelcontainer">
        <label>Edad</label>
       <input type="text" id="edad" value=" <%= edad != 0 ? edad : "" %>" disabled>
    </div>
    <div class="labelcontainer">
        <label>Peso</label>
        <input type="text" name="peso" id="peso" value="<%= usuario.getPeso() != null ? usuario.getPeso() : ""  %>">
    </div>
    <div class="labelcontainer">
        <label>Altura</label>
        <input type="text" name="altura" id="altura" value="<%= usuario.getAltura() != null ? usuario.getAltura() : ""   %>">
    </div>
    <div class="labelcontainer">
        <label>Tipo de Sangre</label>
        <select name="tipoSangre" id="sangre-txt">
            <option value="">Seleccione</option>
            <% for (String tipo : tiposSangre) { %>
                <option value="<%= tipo %>" <%= tipo.equals(tipoUsuario) ? "selected" : "" %>><%= tipo %></option>
            <% } %>
        </select>
    </div>

    <button type="submit" class="miBoton">Guardar</button>
</form>

<div id="mensajeExito" style="display:none; color:green; margin-top:10px;">
    Perfil actualizado correctamente.
</div>


    </div>


</body>
</html>
