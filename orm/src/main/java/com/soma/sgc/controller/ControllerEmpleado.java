/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.soma.sgc.controller;

import com.soma.sgc.model.CatalogoPuestos;
import com.soma.sgc.model.CatalogoTaller;
import java.net.UnknownHostException;
import com.soma.sgc.model.Empleado;
import com.soma.sgc.service.CatalogoPuestosService;
import com.soma.sgc.service.CatalogoTallerService;
import com.soma.sgc.service.EmpleadoService;
import static java.time.Instant.now;
import java.util.Date;
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
public class ControllerEmpleado {

    @Autowired
    CatalogoTallerService tallerService;
    @Autowired
    EmpleadoService empleadoService;
    @Autowired
    CatalogoPuestosService puestosService;

    @RequestMapping(value = {"/empleado"}, method = RequestMethod.GET)
    public String usuario(ModelMap model) {
        model.addAttribute("user_en_sesion", usuarioEnSesion());
        if (!estaUsuarioAnonimo()) {
            List<Empleado> lEmpleado = empleadoService.showEmpleado();
            List<CatalogoTaller> lTaller = tallerService.showTaller();
            List<CatalogoPuestos> lPuesto = puestosService.showPuesto();

            // enviar los datos JSP
            model.addAttribute("lEmpleado", lEmpleado);
            model.addAttribute("lTaller", lTaller);
            model.addAttribute("lPuesto", lPuesto);

            return "empleado";
        }
        return "login";
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
     * Metodo para agregar Empleados
     *
     * @param datos
     * @return
     */
    @RequestMapping(value = "/empleado/agregarEmpleado", method = RequestMethod.POST)
    public @ResponseBody
    String agregarEmpleado(@RequestParam(value = "datos[]") String datos[]) {
        if (!estaUsuarioAnonimo()) {
            for (String dato : datos) {
                if (dato.equals("")) {
                    // si hay datos vacios
                    return "errorDato";
                }
            }

            Date fecha = new Date();

            CatalogoPuestos lPuesto = puestosService.mostrarNombre(Integer.parseInt(datos[4]));
            CatalogoTaller lTaller = tallerService.mostrarNombre(Integer.parseInt(datos[6]));
            //Creacion del objeto 
            Empleado empleado = new Empleado();
            empleado.setNombre(datos[0]);
            empleado.setApp(datos[1]);
            empleado.setApm(datos[2]);
            empleado.setEstatus(datos[3]);
            empleado.setIdpuesto(lPuesto);
            empleado.setSerie(datos[5]);
            empleado.setIdtaller(lTaller);
            empleado.setDescripcion(datos[7]);
            empleado.setFechaestatus(fecha);

            if (empleadoService.save(empleado)) {
                return "exito";
            } else {
                return "error";
            }
        }
        return "errorAcceso";
    }

    /**
     * Metodo que actualiza un empleado
     *
     * @param datos
     * @return
     */
    @RequestMapping(value = "/empleado/actualizarEmpleado", method = RequestMethod.POST)
    public @ResponseBody
    String actualizarEmpleado(@RequestParam(value = "datos[]") String datos[]) {
        if (!estaUsuarioAnonimo()) {
            for (String dato : datos) {
                if (dato.equals("")) {
                    // si hay datos vacios
                    return "errorDato";
                }
            }

            List<Empleado> lEmpleado = empleadoService.showEmpleado();
            if (!lEmpleado.isEmpty()) {
                for (Empleado empleado : lEmpleado) {
                    if (empleado.getIdempleado() == Integer.parseInt(datos[8])) {

                        Date fecha = new Date();

                        CatalogoPuestos lPuesto = puestosService.mostrarNombre(Integer.parseInt(datos[4]));
                        CatalogoTaller lTaller = tallerService.mostrarNombre(Integer.parseInt(datos[6]));
                        //Se llena el modelo
                        empleado.setNombre(datos[0]);
                        empleado.setApp(datos[1]);
                        empleado.setApm(datos[2]);
                        empleado.setEstatus(datos[3]);
                        empleado.setIdpuesto(lPuesto);
                        empleado.setSerie(datos[5]);
                        empleado.setIdtaller(lTaller);
                        empleado.setDescripcion(datos[7]);
                        empleado.setFechaestatus(fecha);

                        if (empleadoService.save(empleado)) {
                            return "exito";
                        } else {
                            return "error";
                        }
                    }
                }
            }
        }
        return "errorAcceso";
    }

    /**
     * Metodo para eliminar un empleado
     *
     * @param datos
     * @return
     */
    @RequestMapping(value = "/empleado/eliminarEmpleado", method = RequestMethod.POST)
    public @ResponseBody
    String eliminarUsuario(@RequestParam(value = "datos[]") String datos[]) {
        if (!estaUsuarioAnonimo()) {
            for (String dato : datos) {
                if (dato.equals("")) {
                    // si hay datos vacios
                    return "errorDato";
                }
            }//termina de recorrer el arreglo

            List<Empleado> lEmpleado = empleadoService.showEmpleado();

            if (!lEmpleado.isEmpty()) {
                for (Empleado empleado : lEmpleado) {
                    int IdEmpleado = Integer.parseInt(datos[0]);
                    if (empleado.getIdempleado() == IdEmpleado) {
                        if (empleadoService.delete(IdEmpleado)) {
                            return "exito";
                        } else {
                            return "error";
                        }
                    }

                }
            }

        }//el usuario es anonimo

        return "errorAcceso";

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
