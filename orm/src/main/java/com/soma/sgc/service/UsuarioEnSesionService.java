/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.soma.sgc.service;


import com.soma.sgc.model.UsuarioEnSesion;
import java.util.List;


public interface UsuarioEnSesionService {
    
    boolean save(UsuarioEnSesion usuario);
    
    boolean update(UsuarioEnSesion usuario);
    
    UsuarioEnSesion consultaUsuario(int usuarioId);
    
    List<UsuarioEnSesion> lUsuarioEnSesion();
}
