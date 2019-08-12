/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.soma.sgc.dao;

import com.soma.sgc.model.UsuarioEnSesion;
import java.util.List;

/**
 *
 * @author LUIS-SOMA
 */
public interface UsuarioEnSesionDao {
    
    void save(UsuarioEnSesion usuario);
    
    void update(UsuarioEnSesion usuario);
    
    UsuarioEnSesion consultaUsuario(int usuarioId);
    
    List<UsuarioEnSesion> showUsuarioEnSesion();
}
