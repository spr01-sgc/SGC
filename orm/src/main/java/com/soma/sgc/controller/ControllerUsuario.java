/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.soma.sgc.controller;

import com.soma.sgc.model.CatalogoTaller;
import java.net.UnknownHostException;
import com.soma.sgc.model.UsuarioEnSesion;
import com.soma.sgc.model.RolUsuario;
import com.soma.sgc.model.Usuario;
import com.soma.sgc.service.CatalogoTallerService;
import com.soma.sgc.service.UsuarioEnSesionService;

import com.soma.sgc.service.RolService;
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
 * Administra los accesos a los JSP metodos de operacion con el usuario
 *
 * @author Jasmin Santana
 */
@Controller
@RequestMapping("/")
public class ControllerUsuario {

    //Bitacora bita = new Bitacora();
    @Autowired
    UsuarioService usuarioService;
    @Autowired
    UsuarioEnSesionService usuarioEnSesionService;
    @Autowired
    CatalogoTallerService catalogoTallerService;
    @Autowired
    RolService rolService;

    @RequestMapping(value = {"/", "init"}, method = RequestMethod.GET)
    public String initSistema(ModelMap model, HttpServletRequest request, HttpServletResponse response) throws UnknownHostException {
        if (!estaUsuarioAnonimo()) {
           // bitacoraUsuarioDaoAux.bitacoraUsuario("Login", usuarioEnSesion(), estaUsuarioAnonimo());
            Usuario usuarioEn = usuarioService.busquedaNinckname(usuarioEnSesion());
            model.addAttribute("user_en_sesion", usuarioEnSesion());
            String ipCliente = request.getRemoteAddr();
            UsuarioEnSesion usuarioEnSession = usuarioEnSesionService.consultaUsuario(usuarioEn.getUsuarioid());
            if (usuarioEnSession != null) {
                if (usuarioEnSession.isStatus() && !usuarioEnSession.getIp().equals(ipCliente)) {
                    model.addAttribute("en_sesion", "en_sesion");
                    return "login";
                } else {
                    usuarioEnSession.setIp(ipCliente);
                    usuarioEnSession.setStatus(true);
                    usuarioEnSesionService.update(usuarioEnSession);
                    return "index";//modificado
                }
            } else {
                UsuarioEnSesion usuario = new UsuarioEnSesion();
                usuario.setIp(ipCliente);//address.getHostAddress());
                usuario.setStatus(true);
                usuario.setUsuarioId(usuarioEn);
                usuarioEnSesionService.save(usuario);
                return "index";//modificado
            }
        }
        return login();
    }

    /**
     * Este metodo configura el acceso a la vista principal
     *
     * @return login
     */
    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String login() {
        //es anonimo no entra
        if (estaUsuarioAnonimo()) {
            return "login";
        }

        return "index";
    }
    
     //Metodo buscar el usuario en sesion y muestra en pantalla cuando se hace una denucnia Oper.Preocupante
    @RequestMapping(value = "/usuario/usuarioEnsesion", method = RequestMethod.GET)
    public @ResponseBody
    String[] usuarioEnsesion() {
        Usuario lusuario = usuarioService.busquedaNinckname(usuarioEnSesion());
        String[] usuario = new String[3];
        usuario[0] = lusuario.getNickname();
        usuario[1] = lusuario.getCorreoelectronico();
        String nombre = lusuario.getNickname();
        usuario[2] = nombre;
        return usuario;
    }

    /**
     * Metodo para mostrar vista usuarios
     *
     * @param model
     * @return el acceso a usuarios o bien deniega el acceso y retorna el login
     */
    @RequestMapping(value = {"/usuario"}, method = RequestMethod.GET)
    public String usuario(ModelMap model) {
 
        if (!estaUsuarioAnonimo()) {
            
            List<Usuario> lUsuario = usuarioService.showUsuario();
            List<CatalogoTaller> lTaller = catalogoTallerService.showTaller();
            List<RolUsuario> lRol = rolService.showRol();
            // enviar los datos JSP
            model.addAttribute("lUsuario", lUsuario);
            model.addAttribute("lTaller", lTaller);
            model.addAttribute("lRol", lRol);
             model.addAttribute("user_en_sesion", usuarioEnSesion());
            return "usuario";
        }
        return "login";
    }

    @RequestMapping(value = "/usuario/verificarUsuario", method = RequestMethod.POST)
    public @ResponseBody
    Usuario verificarUsuario(@RequestParam(value = "datos[]") String datos[]) {
        Usuario buscarUusuario = null;
        if (!estaUsuarioAnonimo()) {
            buscarUusuario = usuarioService.busquedaNinckname(datos[0]);
        }
        return buscarUusuario;
    }

    /**
     * Metodo para Agregar Usuarios
     *
     * @param datos
     * @return usuario
     */
    @RequestMapping(value = "/usuario/agregarUsuario", method = RequestMethod.POST)
    public @ResponseBody
    String agregarUsuario(@RequestParam(value = "datos[]") String datos[]) {
        if (!estaUsuarioAnonimo()) {
            for (String dato : datos) {
                if (dato.equals("")) {
                    // si hay datos vacios
                    return "errorDato";
                }
            }

            RolUsuario lRolUsuario = rolService.buscarNombre(Integer.parseInt(datos[3]));
            CatalogoTaller lTaller = catalogoTallerService.mostrarNombre(Integer.parseInt(datos[4]));
            // creacion de objeto usuario
            Usuario usuario = new Usuario();
            usuario.setNickname(datos[0]);
            usuario.setPass(datos[1]);
            usuario.setCorreoelectronico(datos[2]);
            usuario.setRol(lRolUsuario);
            usuario.setIdtaller(lTaller);

            if (usuarioService.save(usuario)) {
                return "exito";
            } else {
                return "error";
            }
        }
        return "errorAcceso";
    }

    //Metodo para actualizar Usuario
    @RequestMapping(value = "/usuario/actualizarUsuario", method = RequestMethod.POST)
    public @ResponseBody
    String actualizarUsuario(@RequestParam(value = "datos[]") String datos[]) {
        if (!estaUsuarioAnonimo()) {
            for (String dato : datos) {
                if (dato.equals("")) {
                    // si hay datos vacios
                    return "errorDato";
                }
            }//termina de recorrer el arreglo

            List<Usuario> lUsuario = usuarioService.showUsuario();
            if (!lUsuario.isEmpty()) {
                for (Usuario usuario : lUsuario) {
                    if (usuario.getUsuarioid() == Integer.parseInt(datos[4])) {
                        usuario.setNickname(datos[0]);
                        usuario.setPass(datos[1]);
                        usuario.setCorreoelectronico(datos[2]);

                        RolUsuario lRolUsuario = rolService.buscarNombre(Integer.parseInt(datos[3]));
                        CatalogoTaller lTaller = catalogoTallerService.mostrarNombre(Integer.parseInt(datos[4]));

                        usuario.setRol(lRolUsuario);
                        usuario.setIdtaller(lTaller);

                        if (usuarioService.update(usuario)) {
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
    @RequestMapping(value = "/usuario/eliminarUsuario", method = RequestMethod.POST)
    public @ResponseBody
    String eliminarUsuario(@RequestParam(value = "datos[]") String datos[]) {
        if (!estaUsuarioAnonimo()) {
            for (String dato : datos) {
                if (dato.equals("")) {
                    // si hay datos vacios
                    return "errorDato";
                }
            }//termina de recorrer el arreglo

            List<Usuario> lUsuario = usuarioService.showUsuario();

            if (!lUsuario.isEmpty()) {
                for (Usuario usuario : lUsuario) {
                   
                    int Id = Integer.parseInt(datos[0]);

                    if (usuarioService.delete(Id)) {
                        return "exito";
                    } else {
                        return "error";
                    }

                }
            }

        }//el usuario es anonimo

        return "errorAcceso";

    }

    @RequestMapping(value = "/usuario/buscarUsuarioP", method = RequestMethod.POST)
    public @ResponseBody
    String[] buscarUsuarioP(@RequestParam(value = "datos[]") String datos[]) {
        Usuario usuario = null;
        String[] usuarioDatos = new String[3];
        usuario = usuarioService.busquedaId(Integer.parseInt(datos[0]));
        usuarioDatos[0] = usuario.getNickname();
        usuarioDatos[1] = usuario.getCorreoelectronico();

        return usuarioDatos;

    }

    //para redireccionar a bitacora de acciones de usuario y verlas acciones
    @RequestMapping(value = {"/bitacoraUsuario"}, method = RequestMethod.GET)
    public String bitacoraUsuario(ModelMap model) {
        if (!estaUsuarioAnonimo()) {
            //trae los datos de la tabla 
            // List<BitaAccionesUsuario> lBitaAcc = bitaAccionesUsuarioService.showBitacora();
            // enviar los datos JSP
            // model.addAttribute("lBitaAcc", lBitaAcc);

            return "bitacoraUsuario";
        }
        return "login";
    }

    /*@RequestMapping(value = "/operelevante/notOpRel", method = RequestMethod.GET)
    public //@ResponseBody
    List<Pago> verOpeRele(ModelMap model) {
        List<Pago> lOpre = bitacoraUsuarioDaoAux.notificacionRelevante(5000);
        return lOpre;
    }*/
    /**
     * Este metodo traera de la sesion iniciada.
     *
     * @return
     */
    public String usuarioEnSesion() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String nicknamePrincipal = null;
        String pass = null;

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

    /**
     * Permite salir de la session en la que se encuntra iniciado.
     *
     * @param request
     * @param response
     * @return cierra la sesion del usuario
     */
    @RequestMapping(value = "/logout", method = RequestMethod.GET)
    public String logoutPage(HttpServletRequest request, HttpServletResponse response) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null) {
            new SecurityContextLogoutHandler().logout(request, response, auth);
        }
        return "redirect:/login?logout";
    }

    /**
     * Este metodo deniega el acceso al usuario mostrandole un error
     *
     * @return
     */
    @RequestMapping(value = "/error404", method = RequestMethod.GET)
    public String accesoDenegado() {
        return "errorSys";
    }
}
