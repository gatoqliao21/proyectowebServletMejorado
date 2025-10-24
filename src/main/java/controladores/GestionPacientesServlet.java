package controladores;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import models.Paciente;
import models.PacienteDao;
import models.Usuario;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

/**
 * Servlet implementation class GestionPacientesServlet
 */
@WebServlet("/GestionPacientesServlet")
public class GestionPacientesServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GestionPacientesServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
    
    
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

	//parametro accion doget obtiene los datos de la BD   registrados de la tabla pacientes 
	String accion = request.getParameter("accion");
	
	response.setContentType("application/json");
	response.setCharacterEncoding("UTF-8");
	HttpSession session = request.getSession(false); // obtiene la sesion actual , si no existe   devuele null
    PrintWriter out = response.getWriter();// objeto de tipo printwriter  que permite enviar respuesta al cliente 
    Gson gson = new Gson();

		//manejando estado de la sesion
    Usuario sesionUsuario = (Usuario) session.getAttribute("usuarioLogeado");// OBTIENES  UN ATRIBUTO DE LA SESION INICIADA 

    if (sesionUsuario == null) {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // Código 401  al logear usuario  mandando un error de autentificacion 
        out.print(gson.toJson(Collections.singletonMap("error", "Usuario no autenticado.")));   
        return; 
    }

		
		int idUsuario=  sesionUsuario.getId();


		// aca vamos a obtener la lista de pacientes de PACDAO 
		List<Map<String,Object>>listaPacientes;
		
		try {
			
			listaPacientes= PacienteDao.obtenerTodosLosPacientes(idUsuario);
			
            out.print(gson.toJson(listaPacientes));

            System.out.println(listaPacientes);
			
	}
	catch(Exception e) {
		
		 response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR); // 500
         out.print(gson.toJson(Collections.singletonMap("error", "Error interno al obtener pacientes: " + e.getMessage())));
         e.printStackTrace();
		
	}
	
	
	
	
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	
JsonObject jsonObject = null;

        
        try {
        	  jsonObject = JsonParser.parseReader(request.getReader()).getAsJsonObject();
              String accion = jsonObject.get("accion").getAsString();
        	switch(accion) {
        	case "registrar":
                regPaciente(jsonObject,request, response);
                	break ;
                	
        	case "eliminar":
                
                break;
        	
        	}
        	
        	
        }catch(Exception e) {
        	
            e.printStackTrace();

        }
		
		
		
		
		
	}

	private void regPaciente(JsonObject datosJson, HttpServletRequest request, HttpServletResponse response) throws IOException {

		
		PacienteDao pacienteReg = new PacienteDao();
				JsonObject jsonResponse= new JsonObject();
				HttpSession session = request.getSession(false);

			    Usuario sesionUsuario = (Usuario) session.getAttribute("usuarioLogeado");
				int idUsuario=  sesionUsuario.getId();

			    
			    
			String 	nombre=null;
			String fecha=null;
			String	sexo=null;
			String telefono=null;
			String 	direccion= null;
			String 	consulta= null;

				    try {
				        // Usar datosJson directamente
				    	nombre = datosJson.get("nombre").getAsString();
				    	fecha = datosJson.get("fecha").getAsString();
				    	sexo = datosJson.get("sexo").getAsString(); 
				    	telefono = datosJson.get("telefono").getAsString();	
				    	direccion = datosJson.get("direccion").getAsString();	
				    	consulta = datosJson.get("consulta").getAsString();	
				        boolean existe = pacienteReg.existePaciente(nombre, fecha, telefono, idUsuario);
				        if (existe) {
				            jsonResponse.addProperty("estado", false);
				            jsonResponse.addProperty("mensaje", "Ya existe un paciente con esos datos.");
				        } else {
				            Paciente paciente = new Paciente(nombre, fecha, sexo, telefono, direccion, consulta, idUsuario);
				            pacienteReg.agregarPaciente(paciente);
				            jsonResponse.addProperty("estado", true);
				            jsonResponse.addProperty("mensaje", "Paciente registrado con éxito.");
				        }

				
				    	
				    }catch(Exception e) {
				    	
				        System.out.println("Error al leer el JSON: " + e.getMessage());
				        jsonResponse.addProperty("estado", false);
				        jsonResponse.addProperty("mensaje", "Error al procesar los datos json");
				    	response.setContentType("application/json");
				    	response.setCharacterEncoding("UTF-8");
				        response.getWriter().write(jsonResponse.toString());
				    	return;
				    }
				        
				    	Paciente Paciente = new Paciente(nombre, fecha, sexo, telefono, direccion, consulta, idUsuario);
				    
				  try {
					  
				pacienteReg.agregarPaciente(Paciente);
				jsonResponse.addProperty("estado",true);
				jsonResponse.addProperty("mensaje","cita concertada");
					  
				  		
				} catch (Exception e) {
					e.printStackTrace();
					jsonResponse.addProperty("estado", false);
			        jsonResponse.addProperty("mensaje", "Error al registrar paciente: " + e.getMessage());
					
				
				}
				    	
				    response.setContentType("application/json");
				    response.setCharacterEncoding("UTF-8");
				    response.getWriter().write(jsonResponse.toString());
    	
				    	
				    
		
		
		
	}

}
