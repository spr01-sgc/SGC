/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.soma.sgc.service.impl;

import com.soma.sgc.dao.UsuarioDao;
import com.soma.sgc.model.Usuario;
import com.soma.sgc.service.UsuarioService;
import java.util.List;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.encoding.ShaPasswordEncoder;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;


@Service("usuarioService")
@Transactional
public class UsuarioServiceImpl implements UsuarioService {

    private boolean estadoMetodo = false;
    @Autowired
    UsuarioDao usuarioDao;
    @Autowired
    private ShaPasswordEncoder passEncoder;

    @Override
    public boolean save(Usuario user) { 
        user.setPass(passEncoder.encodePassword(user.getPass(),user.getNickname()));
        usuarioDao.save(user);
        return estadoMetodo = true;
    }

    @Override
    public boolean update(Usuario user) {
        //usuario.setPass(passEncoder.encodePassword(usuario.getPass(), this));
        usuarioDao.update(user);
        return estadoMetodo = true;
    }

    @Override
    public Usuario busquedaId(Integer usuarioId) {
        return usuarioDao.busquedaId(usuarioId);
    }

    @Override
    public Usuario busquedaNinckname(String nickname) {
        
        return usuarioDao.busquedaNinckname(nickname);
    }

    @Override
    public List<Usuario> showUsuario() {
        return usuarioDao.showUsuario();
    }

    @Override
    public boolean delete(int usuarioid) {
        usuarioDao.delete(usuarioid);
        return estadoMetodo = true;
    }
    @Override
    public Usuario busquedaNombre(String nombre, String apPaterno, String apMaterno) {
    return usuarioDao.busquedaNombre(nombre, apPaterno, apMaterno);
    }

}
