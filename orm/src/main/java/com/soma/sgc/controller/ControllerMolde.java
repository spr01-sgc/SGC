/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.soma.sgc.controller;

import com.soma.sgc.model.CatalogoMoldes;
import java.net.UnknownHostException;

import com.soma.sgc.model.Usuario;
import com.soma.sgc.service.CatalogoMoldesService;

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
 * Administra los accesos a los JSP metodos de operacion con el molde
 *
 * @author Daniel Loza
 */
@Controller
@RequestMapping("/")
public class ControllerMolde {

    @Autowired
    UsuarioService usuarioService;

    @Autowired
    CatalogoMoldesService moldeService;

    /**
     * Metodo para mostrar vista moldes
     *
     * @param model
     * @return el acceso a moldes o bien deniega el acceso y retorna el login
     */
    @RequestMapping(value = {"/molde"}, method = RequestMethod.GET)
    public String usuario(ModelMap model) {

        if (!estaUsuarioAnonimo()) {

            model.addAttribute("user_en_sesion", usuarioEnSesion());
            List<CatalogoMoldes> lmolde = moldeService.showMolde();
            // enviar los datos JSP
            model.addAttribute("lmolde", lmolde);
            return "molde";
        }
        return "login";
    }

    /**
     * Metodo para Agregar Moldes
     *
     * @param datos
     * @return usuario
     */
    @RequestMapping(value = "/molde/agregarMolde", method = RequestMethod.POST)
    public @ResponseBody
    String agregarMolde(@RequestParam(value = "datos[]") String datos[]) {
        if (!estaUsuarioAnonimo()) {
            for (String dato : datos) {
                if (dato.equals("")) {
                    // si hay datos vacios
                    return "errorDato";
                }
            }

            // creacion de objeto Molde
            CatalogoMoldes molde = new CatalogoMoldes();
            molde.setSerie(datos[0]);
            molde.setModelo(datos[1]);
            molde.setEnexistencia(Integer.parseInt(datos[2]));
            molde.setDescripcion(datos[3]);

            if (moldeService.save(molde)) {
                return "exito";
            } else {
                return "error";
            }
        }
        return "errorAcceso";
    }

    //Metodo para actualizar Moldes
    @RequestMapping(value = "/molde/actualizarMolde", method = RequestMethod.POST)
    public @ResponseBody
    String actualizarMolde(@RequestParam(value = "datos[]") String datos[]) {
        if (!estaUsuarioAnonimo()) {
            for (String dato : datos) {
                if (dato.equals("")) {
                    // si hay datos vacios
                    return "errorDato";
                }
            }//termina de recorrer el arreglo

            List<CatalogoMoldes> lmolde = moldeService.showMolde();
            if (!lmolde.isEmpty()) {
                for (CatalogoMoldes molde : lmolde) {
                    if (molde.getIdmolde() == Integer.parseInt(datos[0])) {
                        molde.setSerie(datos[1]);
                        molde.setModelo(datos[2]);
                        molde.setEnexistencia(Integer.parseInt(datos[3]));
                        molde.setDescripcion(datos[4]);

                        if (moldeService.update(molde)) {
                            //bitacoraMoldeDaoAux.bitacoraUsuario("Modificar Usuario", usuarioEnSesion(), estaUsuarioAnonimo());
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

    //Metodo para eliminar un Molde no puede ser eliminado por las acciones
    @RequestMapping(value = "/molde/eliminarMolde", method = RequestMethod.POST)
    public @ResponseBody
    String eliminarMolde(@RequestParam(value = "datos[]") String datos[]) {
        if (!estaUsuarioAnonimo()) {
            for (String dato : datos) {
                if (dato.equals("")) {
                    // si hay datos vacios
                    return "errorDato";
                }
            }//termina de recorrer el arreglo

            List<CatalogoMoldes> lmolde = moldeService.showMolde();

            if (!lmolde.isEmpty()) {
                for (CatalogoMoldes molde : lmolde) {
                    //obtiene el id del molde a eliminar
                    int Id = Integer.parseInt(datos[0]);
                    if (molde.getIdmolde()== Integer.parseInt(datos[0])) {

                        if (moldeService.delete(Id)) {
                            return "exito";
                        } else {
                            return "error";
                        }
                    }
                }//end for|
            }//si no esta vacia la lista de molde

        }//el usuario es anonimo

        return "errorAcceso";

    }
    
     @RequestMapping(value = "/molde/verificarSerie", method = RequestMethod.POST)
    public @ResponseBody CatalogoMoldes verificarSerie(@RequestParam(value = "datos[]") String datos[]) {
        CatalogoMoldes buscarSerie = null;
        if (!estaUsuarioAnonimo()) {
            buscarSerie = moldeService.busquedaSerie(datos[0]);
            
        }
        return buscarSerie;
    }

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
}
