/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.soma.sgc.service.impl;

import com.soma.sgc.dao.UsuarioEnSesionDao;
import com.soma.sgc.model.UsuarioEnSesion;
import com.soma.sgc.service.UsuarioEnSesionService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author HASAN
 * 
 */
@Repository("usuarioEnSessionService")
@Transactional
public class UsuarioEnSesionServiceImpl implements UsuarioEnSesionService{
    
    @Autowired
    UsuarioEnSesionDao usuarioEnSesionDao;
    
    private boolean estadoMetodo = false;

    @Override
    public boolean save(UsuarioEnSesion usuario) {
        usuarioEnSesionDao.save(usuario);
        return estadoMetodo = true;
    }

    @Override
    public boolean update(UsuarioEnSesion usuario) {
        usuarioEnSesionDao.update(usuario);
        return estadoMetodo = true;
    }

    @Override
    public UsuarioEnSesion consultaUsuario(int usuarioId) {
        return usuarioEnSesionDao.consultaUsuario(usuarioId);
    }

    @Override
    public List<UsuarioEnSesion> lUsuarioEnSesion() {
        return usuarioEnSesionDao.showUsuarioEnSesion();
    }
    
}
