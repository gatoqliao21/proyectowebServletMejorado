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


	 
	
public void agregarPaciente(Paciente paciente) {
		

	    	
	    
	    PreparedStatement ps;
	    
	    try(Connection con = SqlServerConexion.conectar()) {
	    	
		    String query = "INSERT INTO Pacientes(Nombre, Fecha, Sexo, Telefono, Direccion, Consulta, usuario_id) VALUES (?, ?, ?, ?, ?, ?, ?)";

			ps = con.prepareStatement(query);
			
		    
		    ps.setString(1, paciente.getNombre());    
		    ps.setString(2, paciente.getFecha());    
		    ps.setString(3, paciente.getSexo());     
		    ps.setString(4, paciente.getTelefono()); 
		    ps.setString(5, paciente.getDireccion());
		    ps.setString(6, paciente.getConsulta()); 
		    ps.setInt(7, paciente.getusuarioId()); 


		    // Ejecución de la consulta SQL
		 int filasAfectadas=    ps.executeUpdate();
			
		 System.out.println("Filas insertadas: " + filasAfectadas);			
		 
		 
		 
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();

		}
}
	 
	

	 
	 public static List<Map<String, Object>>obtenerTodosLosPacientes(int idUsuario) throws SQLException {


		 //declaramos una lista en este ambito de funcion 
	        List<Map<String, Object>> listaPacientes = new ArrayList<>();

	       
		

	        String sql = "SELECT Nombre, Fecha, Sexo, Telefono, Direccion, Consulta FROM Pacientes WHERE usuario_id = ?";
	            
	        try (
	        		Connection con = SqlServerConexion.conectar();
	        		PreparedStatement pstmt = con.prepareStatement(sql)		){          		
	        	pstmt.setInt(1, idUsuario);
	        	//retorna un resultset en formato de tabla con el executequery 
	            try (ResultSet rs = pstmt.executeQuery()) { 
	        		   while (rs.next()) {
	     	              
	   	            	Map<String, Object> paciente= new HashMap<>();
	   	            	paciente.put("nombre",rs.getString("Nombre"));
	   	            	paciente.put("Fecha",rs.getString("Fecha"));
	   	            	paciente.put("Sexo",rs.getString("Sexo"));
	   	            	paciente.put("Telefono",rs.getString("Telefono"));
	   	            	paciente.put("Direccion",rs.getString("Direccion"));
	   	            	paciente.put("Consulta",rs.getString("Consulta"));

	   	            	
	   	            	//por cada iteracion del bucle se agrega un paciente a la lista 
						
	   	             listaPacientes.add(paciente);

	   	            	
	   	            }
	        		
	        		
				} 
	         
	            
	        }
		 // retorna la lista completa  de pacientes registrados 
	            return listaPacientes;
	           
	    }
	 
	 public boolean existePaciente(String nombre, String fecha, String telefono, int usuarioId) {
		    String sql = "SELECT COUNT(*) FROM Pacientes WHERE Nombre = ? AND Fecha = ? AND Telefono = ? AND usuario_id = ?";
		    
		    try (Connection con = SqlServerConexion.conectar();
		         PreparedStatement ps = con.prepareStatement(sql)) {
		        
		        ps.setString(1, nombre);
		        ps.setString(2, fecha);
		        ps.setString(3, telefono);
		        ps.setInt(4, usuarioId);

		        ResultSet rs = ps.executeQuery();
		        if (rs.next()) {
		            return rs.getInt(1) > 0; // true si ya existe
		        }
		    } catch (SQLException e) {
		        e.printStackTrace();
		    }
		    return false;
		}

		
	
}
