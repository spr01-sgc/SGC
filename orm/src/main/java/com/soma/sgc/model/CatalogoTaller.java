/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.soma.sgc.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import org.hibernate.validator.constraints.NotEmpty;

/**
 *
 * @author DANIEL LOZA
 */
@Entity
@Table(name = "catalogo_taller")
public class CatalogoTaller implements Serializable{
    
     @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
     @Column(name = "idtaller")
    private Integer idtaller;

    @NotEmpty
    @Column(name = "nombre")
    private String nombre;
    
    @Column(name = "direccion")
    private String direccion;
    
    @Column(name = "numeroEx")
    private String numeroEx;

    public String getNumeroEx() {
        return numeroEx;
    }

    public void setNumeroEx(String numeroEx) {
        this.numeroEx = numeroEx;
    }

    public Integer getIdtaller() {
        return idtaller;
    }

    public void setIdtaller(Integer idtaller) {
        this.idtaller = idtaller;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    @Override
    public String toString() {
        return "CatalogoTaller{" + "idtaller=" + idtaller + ", nombre=" + nombre + ", direccion=" + direccion + '}';
    }
    
}
