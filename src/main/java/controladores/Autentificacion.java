package controladores;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import models.Usuario;
import models.UsuariosDao;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;


import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import configuraciones.SqlServerConexion;

/**
 * Servlet implementation class Autentificacion
 */
@WebServlet("/Autentificacion")
public class Autentificacion extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Autentificacion() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	   
		//objeto de tipo jsonObject
		JsonObject datosJsonRecuperados = null;

        
        try {

			//parseo del json obtenido con la lectura si en el cuerpo de la solicitud http no es json lanza una excepcion 
			// getAsJsonObject() => excepcion is null
        	  datosJsonRecuperados = JsonParser.parseReader(request.getReader()).getAsJsonObject();
              String accion = datosJsonRecuperados.get("accion").getAsString();
        	switch(accion) {
        	case "login":
                autentificacionLog(datosJsonRecuperados,request, response);
                	break ;
                	
        	case "registrar":
                registrarCliente(datosJsonRecuperados, request, response);    
                break;
        	
        	}
        	
        	
        }catch(Exception e) {
        	
            e.printStackTrace();

        }
        
			
	
		
	}

	private void registrarCliente(JsonObject datosJson, HttpServletRequest request, HttpServletResponse response) throws IOException {
	   
		  UsuariosDao usersDao = new UsuariosDao();
		    JsonObject jsonResponse = new JsonObject();

		    String correo = null;
		    String nombres = null;
		    String apellidos = null;
		    String contrasena = null;

		    try {
		        correo = datosJson.get("correo").getAsString();
		        nombres = datosJson.get("nombre").getAsString();
		        apellidos = datosJson.get("apellido").getAsString(); 
		        contrasena = datosJson.get("contrasena").getAsString();
		      

		    } catch (Exception e) {
		        System.out.println("Error al leer el JSON: " + e.getMessage());

		        jsonResponse.addProperty("estado", false);
		        jsonResponse.addProperty("mensaje", "Error al procesar los datos JSON.");
		        response.setContentType("application/json");
		        response.setCharacterEncoding("UTF-8");
		        response.getWriter().write(jsonResponse.toString());
		        return;
		    }

		    Usuario usuarioReg = new Usuario(nombres, apellidos, correo, contrasena);

		    try {
		        usersDao.registrarUsuario(usuarioReg);

		        jsonResponse.addProperty("estado", true);
		        jsonResponse.addProperty("mensaje", "Usuario registrado correctamente.");

		    } catch (Exception e) {
		        e.printStackTrace();
		        jsonResponse.addProperty("estado", false);
		        jsonResponse.addProperty("mensaje", "Error al registrar usuario: " + e.getMessage());
		    }

		    response.setContentType("application/json");
		    response.setCharacterEncoding("UTF-8");
		    response.getWriter().write(jsonResponse.toString());

		
		
		
		
	}

	private void autentificacionLog(JsonObject jsonObject, HttpServletRequest request, HttpServletResponse response) throws IOException {
	    Gson gson = new Gson();//VARIABLE PARA MANEJO DE METODOS DE LA LIBRERIA 
	    JsonObject datos = new JsonObject();//VARIABLE PARA MANEJO DE METODOS DE LA 

	    try {
	        String correo = jsonObject.get("correo").getAsString();
	        String contrasena = jsonObject.get("contrasena").getAsString();

	        
	        
	        Usuario usuario = new UsuariosDao().autenticar(correo, contrasena);

	        if (usuario != null) {
	        	 HttpSession session = request.getSession();// obtienes la sesion 
	        	    session.setAttribute("usuarioLogeado", usuario);  // objeto de tipo http se asigna al usuario autentificado 
	        	    System.out.println("Usuario guardado en sesión: " + usuario.getCorreo());   

	        	
	        	datos.addProperty("status", "success"); // estado exitoso  al estado de validacion 
	           datos.addProperty("mensaje", "validacion Correcta");
	        } else {
	            datos.addProperty("status", "errorVALIDACION");
	            datos.addProperty("mensaje", "CREDENCIALES INCORRECTAS INCORRECTA");
	        }

	    } catch (Exception e) {
	        datos.addProperty("status", "error");
	        datos.addProperty("mensaje", "Error procesando la solicitud: " + e.getMessage());
	        response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
	    }

	    response.setContentType("application/json");
	    response.setCharacterEncoding("UTF-8");
	    response.getWriter().write(gson.toJson(datos));
	}

}
