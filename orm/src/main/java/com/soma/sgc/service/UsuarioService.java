/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.soma.sgc.service;

import com.soma.sgc.model.Usuario;
import java.util.List;

/**
 *
 * @author estadias2017-2
 */
public interface UsuarioService {

    boolean save(Usuario usuario);

    boolean update(Usuario usuario);
    boolean delete(int usuarioid);


    Usuario busquedaId(Integer usuarioId);

    Usuario busquedaNinckname(String nickname);

    List<Usuario> showUsuario();
    Usuario busquedaNombre(String nombre,String apPaterno,String apMaterno);


}
