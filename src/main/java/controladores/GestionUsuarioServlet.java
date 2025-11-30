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

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

/**
 * Servlet implementation class ActualizarPerfilServlet
 */
@WebServlet("/GestionUsuarioServlet")
public class GestionUsuarioServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GestionUsuarioServlet() {
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
	
		JsonObject JsonObject= null;
		
		try {
			
			
			//lectura del json object enviado por el fetch 
			JsonObject = JsonParser.parseReader(request.getReader()).getAsJsonObject();
			String accion = JsonObject.get("accion").getAsString();
			
			switch(accion) {
			
			case "actualizarPerfil":
        		actualizarDatos(JsonObject,request, response);
        		break;	
				
			}
			
			
			
		}
		catch(Exception e) {
			e.printStackTrace();
			
			
			
		}
		
	
	
	}

	private void actualizarDatos(JsonObject jsonObject, HttpServletRequest request, HttpServletResponse response) throws IOException {
		  
		HttpSession session = request.getSession();
		JsonObject jsonResponse= new JsonObject();

		Usuario usuario = (Usuario) session.getAttribute("usuarioLogeado");

		String altura= null;
		String peso= null;
		String tipoSangre= null;
		
		if(usuario == null) {
			System.out.println("usuario deslogeado, vuelve a iniciar sesion ");
			
			jsonResponse.addProperty("status", false);
			
			jsonResponse.addProperty("mensaje", "usuario expiro vuelve a iniciar sesion");
			
		}
		
		try {
			
			altura =   jsonObject.get("altura").getAsString();
			peso=   jsonObject.get("peso").getAsString();
			tipoSangre=   jsonObject.get("tipoSangre").getAsString();
			boolean datosActualizados = UsuariosDao.actualizarPerfil(usuario.getId(), altura, peso, tipoSangre);
			
			if(datosActualizados) {
				jsonResponse.addProperty("status", true);
				jsonResponse.addProperty("mensaje", "Datos actualizados");
				
				
				
			}else {
				
				jsonResponse.addProperty("status", false);
				jsonResponse.addProperty("mensaje", " no se actualizaron los datos ");
				
				
			}
			
		
		
		}
		
		catch(Exception e) {
			System.out.println("erro al leer el json " + e.getMessage());
			jsonResponse.addProperty("status", false);
			jsonResponse.addProperty("mensaje", "error al procesar los datos enviados al servlet");
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().write(jsonResponse.toString());
			return;
			
		}
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write(jsonResponse.toString());
		
		
		
		
		
	
		
		
		
		
		
	}
		
	}

