/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.soma.sgc.controller;
import java.net.UnknownHostException;
import com.soma.sgc.model.CatalogoTaller;
import com.soma.sgc.model.RolUsuario;
import com.soma.sgc.model.Usuario;
import com.soma.sgc.service.CatalogoTallerService;
import com.soma.sgc.model.Usuario;
import com.soma.sgc.service.UsuarioService;
import java.net.InetAddress;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationTrustResolver;
import org.springframework.security.authentication.AuthenticationTrustResolverImpl;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author HASANI
 */
@Controller
@RequestMapping("/")
public class ControllerTaller {
    
       @Autowired
    UsuarioService usuarioService;
    
   
    @Autowired
    CatalogoTallerService tallerService;
       /**
     * Metodo para mostrar vista usuarios
     *
     * @param model
     * @return el acceso a usuarios o bien deniega el acceso y retorna el login
     */
    @RequestMapping(value = {"/taller"}, method = RequestMethod.GET)
    public String usuario(ModelMap model) {

        if (!estaUsuarioAnonimo()) { 
              
                  model.addAttribute("user_en_sesion", usuarioEnSesion());
                 List<CatalogoTaller> ltaller = tallerService.showTaller();
            // enviar los datos JSP
            model.addAttribute("ltaller", ltaller);
        return "taller";
        }
        return "login";
    }
    
    /**
     * Metodo para Agregar Usuarios
     *
     * @param datos
     * @return usuario
     */
    @RequestMapping(value = "/taller/agregarTaller", method = RequestMethod.POST)
    public @ResponseBody
    String agregarTaller(@RequestParam(value = "datos[]") String datos[]) {
        if (!estaUsuarioAnonimo()) {
            for (String dato : datos) {
                if (dato.equals("")) {
                    // si hay datos vacios
                    return "errorDato";
                }
            }

         
            // creacion de objeto usuario
           CatalogoTaller taller = new CatalogoTaller();
           taller.setNombre(datos[0]);
           taller.setDireccion(datos[1]);
           taller.setNumeroEx(datos[2]);
          

            if (tallerService.save(taller)) {
                return "exito";
            } else {
                return "error";
            }
        }
        return "errorAcceso";
    }
    
    //Metodo para actualizar Usuario

    @RequestMapping(value = "/taller/actualizarTaller", method = RequestMethod.POST)
    public @ResponseBody
    String actualizarTaller(@RequestParam(value = "datos[]") String datos[]) {
        if (!estaUsuarioAnonimo()) {
            for (String dato : datos) {
                if (dato.equals("")) {
                    // si hay datos vacios
                    return "errorDato";
                }
            }//termina de recorrer el arreglo

            List<CatalogoTaller> ltaller = tallerService.showTaller();
            if (!ltaller.isEmpty()) {
                for (CatalogoTaller taller : ltaller) {
                    if (taller.getIdtaller() == Integer.parseInt(datos[0])) {
                      taller.setNombre(datos[1]);
                      taller.setDireccion(datos[2]);
                      taller.setNumeroEx(datos[3]);
                        
                    
                  
                     
                   
                        
                  
                        if (tallerService.update(taller)) {
                          //bitacoraUsuarioDaoAux.bitacoraUsuario("Modificar Usuario", usuarioEnSesion(), estaUsuarioAnonimo());
                            return "exito";
                        } else {
                            return "error";
                        }
                    }
                }//end for
            }//si no esta vacia la lista 
        }//el usuario es anonimo

        return "errorAcceso";

    }

    //Metodo para eliminar un Usuario no puede ser eliminado por las acciones
    @RequestMapping(value = "/taller/eliminarTaller", method = RequestMethod.POST)
    public @ResponseBody
    String eliminarTaller(@RequestParam(value = "datos[]") String datos[]) {
        if (!estaUsuarioAnonimo()) {
            for (String dato : datos) {
                if (dato.equals("")) {
                    // si hay datos vacios
                    return "errorDato";
                }
            }//termina de recorrer el arreglo

            List<CatalogoTaller> ltaller = tallerService.showTaller();

            if (!ltaller.isEmpty()) {
                for (CatalogoTaller taller : ltaller) {
                    //obtiene el id del delitoa a eliminar
                    int Id = Integer.parseInt(datos[0]);
                    if (taller.getIdtaller() == Integer.parseInt(datos[0])) {
//                    

                        if (tallerService.delete(Id)) {

                            //bitacoraUsuarioDaoAux.bitacoraUsuario("Eliminar ", usuarioEnSesion(), estaUsuarioAnonimo());
                            return "exito";
                        } else {
                            return "error";
                        }
                    }
                }//end for|
            }//si no esta vacia la lista de delitos

        }//el usuario es anonimo

        return "errorAcceso";

    }
        

        public String usuarioEnSesion() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String nicknamePrincipal = null;  String pass = null;

        if (principal instanceof UserDetails) {
            //Es igual al usuario que esta en sesion
            return nicknamePrincipal = ((UserDetails) principal).getUsername();
        } else {
            //Es igual a usuario anonimo
            return nicknamePrincipal = principal.toString();
        }
    }

    /**
     * Este metodo verificara que un usuario este autenticado correctamente
     */
    private boolean estaUsuarioAnonimo() {
        final Authentication autenticacion = SecurityContextHolder.getContext().getAuthentication();
        AuthenticationTrustResolver authenticationTrustResolver = new AuthenticationTrustResolverImpl();
        return authenticationTrustResolver.isAnonymous(autenticacion);
    }
    
}
