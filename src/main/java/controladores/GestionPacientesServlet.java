package controladores;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import models.PacienteDao;
import models.Usuario;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import com.google.gson.Gson;

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

	
	String accion = request.getParameter("accion");
	
	response.setContentType("application/json");
	response.setCharacterEncoding("UTF-8");
	HttpSession session = request.getSession(false);
    PrintWriter out = response.getWriter();
    Gson gson = new Gson();
    Usuario sesionUsuario = (Usuario) session.getAttribute("usuarioLogeado");

    if (sesionUsuario == null) {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // Código 401
        out.print(gson.toJson(Collections.singletonMap("error", "Usuario no autenticado.")));
        return; 
    }

		
		int idUsuario=  sesionUsuario.getId();
		
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
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
