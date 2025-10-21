package models;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import configuraciones.SqlServerConexion;

public class UsuariosDao {

	public void registrarUsuario(Usuario usuario) {
	    String sql = "INSERT INTO Usuarios(nombre, apellido, correo, contrasena) VALUES (?, ?, ?, ?)";

	    try (Connection con = SqlServerConexion.conectar();
	         PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

	        ps.setString(1, usuario.getNombre());
	        ps.setString(2, usuario.getApellido());
	        ps.setString(3, usuario.getCorreo());
	        ps.setString(4, usuario.getContrasena());

	        int filasAfectadas = ps.executeUpdate();
	        System.out.println("filas afectadas: " + filasAfectadas);

	        if (filasAfectadas > 0) {
	            ResultSet rs = ps.getGeneratedKeys();
	            if (rs.next()) {
	                int idGenerado = rs.getInt(1);
	                usuario.setId(idGenerado); // ← aquí se guarda en el objeto
	                System.out.println("Usuario registrado con ID: " + idGenerado);
	            }
	        }


	    } catch (Exception e) {
	        e.printStackTrace();
	    }
	}
	public Usuario autenticar(String correo, String contrasena) {
	    String QUERY = "SELECT ID, nombre, apellido, correo FROM Usuarios WHERE correo=? AND contrasena=?";
	    
	    try (Connection con = SqlServerConexion.conectar();
	         PreparedStatement ps = con.prepareStatement(QUERY)) {

	        ps.setString(1, correo);
	        ps.setString(2, contrasena);
	        ResultSet rs = ps.executeQuery();

	        if (rs.next()) {
	            Usuario u = new Usuario();
	            u.setId(rs.getInt("ID"));
	            u.setNombre(rs.getString("nombre"));
	            u.setApellido(rs.getString("apellido"));
	            u.setCorreo(rs.getString("correo"));
	            return u;
	        }

	    } catch (SQLException e) {
	        System.out.println("Error autenticando usuario: " + e.getMessage());
	        // Aquí podrías registrar en logs, o hasta guardar en una tabla de errores si es necesario
	    }

	    return null;
	}
	
	
	}
