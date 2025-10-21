package models;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


import configuraciones.SqlServerConexion;

public class PacienteDao {


	 

	 
	 public static List<Map<String, Object>>obtenerTodosLosPacientes(int idUsuario) throws SQLException {
	        
	        List<Map<String, Object>> listaPacientes = new ArrayList<>();

	       
		

	        String sql = "SELECT Nombre, Fecha, Sexo, Telefono, Direccion, Consulta FROM Pacientes WHERE usuario_id = ?";
	            
	        try (
	        		Connection con = SqlServerConexion.conectar();
	        		PreparedStatement pstmt = con.prepareStatement(sql)		){          		
	        	pstmt.setInt(1, idUsuario);
	        	
	            try (ResultSet rs = pstmt.executeQuery()) { 
	        		   while (rs.next()) {
	     	              
	   	            	Map<String, Object> paciente= new HashMap<>();
	   	            	paciente.put("nombre",rs.getString("Nombre"));
	   	            	paciente.put("Fecha",rs.getString("Fecha"));
	   	            	paciente.put("Sexo",rs.getString("Sexo"));
	   	            	paciente.put("Telefono",rs.getString("Telefono"));
	   	            	paciente.put("Direccion",rs.getString("Direccion"));
	   	            	paciente.put("Consulta",rs.getString("Consulta"));

	   	            	
	   	            	
	   	             listaPacientes.add(paciente);

	   	            	
	   	            }
	        		
	        		
				} 
	         
	            
	        }
	            return listaPacientes;
	           
	    }
		
	
}
