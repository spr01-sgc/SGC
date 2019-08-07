/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.soma.sgc.security;

import com.soma.sgc.model.Usuario;
import com.soma.sgc.service.UsuarioService;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author estadias2017-2
 */
@Service("detalleUsuario")
public class DetalleUsuario implements UserDetailsService {

    @Autowired
    UsuarioService usuarioService;

    @Transactional(readOnly = true)
    @Override
    public UserDetails loadUserByUsername(String nickname) throws UsernameNotFoundException {
        Usuario usuario = usuarioService.busquedaNinckname(nickname);
       
        if (usuario == null || usuario.getRol().getNombre() == null) {
            System.out.println(DetalleUsuario.class + "\nNo Se ha encontrado el usuario o esta inactivo");
            throw new UsernameNotFoundException("El nickname no se encontro");
        }

       
        System.out.println(DetalleUsuario.class + "\nUsuario: " + usuario.toString());
        return new User(usuario.getNickname(), usuario.getPass(),
                true, true, true, true, concedeRol(usuario));
    }
    public DetalleUsuario() {
    }

    private List<GrantedAuthority> concedeRol(Usuario usuario) {
        List<GrantedAuthority> rolUsuario = new ArrayList<>();

        rolUsuario.add(new SimpleGrantedAuthority("ROLE_" + usuario.getRol().getNombre()));

        return rolUsuario;
    }


}
