/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.soma.sgc.model;

import java.io.Serializable;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import org.hibernate.annotations.ForeignKey;

/**
 *
 * @author Jasmin Santana
 */
@Entity
@Table(name = "usuario")
public class Usuario implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "usuarioid")
    private Integer usuarioid;
    
    @Column(name = "nickname")
    private String nickname;
    
    @Column(name = "pass")
    private String pass;
    
    @Column(name = "correoelectronico")
    private String correoelectronico;
    
    //Establece relacion con RolUsuario
    @ManyToOne
    @ForeignKey(name = "rolid_fk")
    private RolUsuario rol;
       @ManyToOne
    @ForeignKey(name = "idtaller_fk")
    private CatalogoTaller idtaller;

    public Integer getUsuarioid() {
        return usuarioid;
    }

    public void setUsuarioid(Integer usuarioid) {
        this.usuarioid = usuarioid;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getPass() {
        return pass;
    }

    public void setPass(String pass) {
        this.pass = pass;
    }

    public String getCorreoelectronico() {
        return correoelectronico;
    }

    public void setCorreoelectronico(String correoelectronico) {
        this.correoelectronico = correoelectronico;
    }

    public RolUsuario getRol() {
        return rol;
    }

    public void setRol(RolUsuario rol) {
        this.rol = rol;
    }

    public CatalogoTaller getIdtaller() {
        return idtaller;
    }

    public void setIdtaller(CatalogoTaller idtaller) {
        this.idtaller = idtaller;
    }

    @Override
    public String toString() {
        return "Usuario{" + "usuarioid=" + usuarioid + ", nickname=" + nickname + ", pass=" + pass + ", correoelectronico=" + correoelectronico + ", rol=" + rol + ", idtaller=" + idtaller + '}';
    }
    

 
}