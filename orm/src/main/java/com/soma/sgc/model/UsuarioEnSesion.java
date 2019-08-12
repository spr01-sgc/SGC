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
import javax.persistence.OneToOne;
import javax.persistence.Table;

/**
 *
 * @author HASANI
 */
@Entity
@Table(name = "usuario_en_sesion")
public class UsuarioEnSesion implements Serializable{
    
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "usuarioSesionId")
    private Integer usuarioSesionId;
    
    @Column(name = "status")
    private boolean status;
    
    @Column(name = "ip")
    private String ip;
    
    @OneToOne(cascade = CascadeType.ALL)
    private Usuario usuarioId;

    public Integer getUsuarioSesionId() {
        return usuarioSesionId;
    }

    public void setUsuarioSesionId(Integer usuarioSesionId) {
        this.usuarioSesionId = usuarioSesionId;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public Usuario getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Usuario usuarioId) {
        this.usuarioId = usuarioId;
    }
}
