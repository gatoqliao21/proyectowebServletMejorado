<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
    
<%
    if (session.getAttribute("usuarioLogeado") == null) {
        response.sendRedirect("Login.jsp"); 
        return;
    }
%>
    
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="css/estilosGestionPac.css">
    <script src="js/gestionPac.js" type="text/javascript"></script>

    <meta charset="UTF-8">
    <title>Insert title here</title>
</head>
<body>

    <div id="Contenedor">

        <div id="contenedorDatos">
			<h1>Bienvenido ${sessionScope.usuarioLogeado.nombre} ${sessionScope.usuarioLogeado.apellido} !</h1>
        </div>

        <br><br><br>

        <p>
            Aquí podrás reservar, pagar, reprogramar tus citas presenciales o teleconsultas y acceder a tu información de manera fácil y segura.
        </p>

        <br>

        <div id="ContenedorDatosUsuario">
            <div id="datos">
                <div id="cabeceraInformativa">
                    <div class="perfil_img">
                        <img src=" " alt="perfil">
                    </div>  
                    <div id="perfil-txt">
                        <span id="sp_perfil">Mi Perfil Clínico</span><br>
                        <button type="button" aria-label="Editar mi perfil clinico" style="width: 100%;">Editar mi perfil</button>
                    </div>
                </div>

                <div id="datosDinamicos">
                    <table id="miTablaDatos">
                        <tbody>
                            <tr>
                                <td>nombre</td>
                                <td id="nombreVal">
                                ${sessionScope.usuarioLogeado.nombre}
                                </td>
                            </tr>
                            <tr>
                                <td>apellido</td>
                                <td id="apellidoVal">
                                ${sessionScope.usuarioLogeado.apellido}
                                </td>
                            </tr>
                            <tr>
                                <td>correo</td>
                                <td id="correoVal">
                                ${sessionScope.usuarioLogeado.correo}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div id="contenedor_tablas_citas">
                <table id="mi_tabla_citas" style="width: 100%; height: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="background-color:#f2f2f2;">
                            <th style="border: 1px solid #ddd; padding: 8px;">Nombre del Paciente</th>
                            <th style="border: 1px solid #ddd; padding: 8px;">Fecha de Cita</th>
                            <th style="border: 1px solid #ddd; padding: 8px;">Sexo</th>
                            <th style="border: 1px solid #ddd; padding: 8px;">Numero Telefonico</th>
                            <th style="border: 1px solid #ddd; padding: 8px;">Direccion</th>    
                            <th style="border: 1px solid #ddd; padding: 8px;">Consulta</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>

        </div>

        <button id="miBoton">Registrar paciente</button>

        <div id="contenedorGeneral">

            <div id="cerrar-formulario"></div>

            <div id="titulo">
                <strong>Nuevo Paciente</strong>
            </div>

            <div class="contenedorFormulario">
                <form>
                    <div class="labelcontainer">
                        <label>Nombre</label>
                        <input id="txtNombre" type="text" name="nombre" >
                    </div>

                    <div class="labelcontainer">
                        <label>Fecha de Nacimiento</label>
                        <input id="txtfecha" type="date" name="fecha_nacimiento" >
                    </div>

                    <div class="labelcontainer">
                        <label>Género</label>
                        <select id="cboSexo" name="genero" >
                            <option>Masculino</option>
                            <option>Femenino</option>
                            <option>Otro</option>
                        </select>
                    </div>

                    <div class="labelcontainer">
                        <label>Teléfono</label>
                        <input id="txtTelefono" type="text" name="telefono" >
                    </div>

                    <div class="labelcontainer">
                        <label>Dirección</label>
                        <input id="txtDireccion" type="text" name="direccion"></input>
                    </div>

                    <div class="labelcontainer">
                        <label>Motivo Consulta</label>
                        <input id="txtMotivo" type="text" name="consulta" >
                    </div>

                    <div id="contenedor-boton">
                        <button id="btnProcesarGestion" type="submit">Registrar</button>
                    </div>
                </form>
            </div>

        </div>

        <div id="etiqueta-respuesta"></div>

    </div>

</body>
</html>
