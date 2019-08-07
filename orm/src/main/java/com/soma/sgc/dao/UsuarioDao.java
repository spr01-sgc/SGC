/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.soma.sgc.dao;

import com.soma.sgc.model.Usuario;
import java.util.List;

/**
 *
 * @author estadias2017-2
 */
public interface UsuarioDao {

    void save(Usuario usuario);
    void update(Usuario usuario);
    void delete(int usuarioid);

    List<Usuario> showUsuario();
    Usuario busquedaId(int usuarioId);
    Usuario busquedaNinckname(String nickname);
    Usuario busquedaNombre(String nombre,String apPaterno,String apMaterno);

}
