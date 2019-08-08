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
@Table(name = "catalogoMoldes")
public class CatalogoMoldes implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idmolde")
    private Integer idmolde;

    @NotEmpty
    @Column(name = "modelo")
    private String modelo;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "serie")
    private String serie;

    @Column(name = "enexistencia")
    private String enexistencia;

    public Integer getIdmolde() {
        return idmolde;
    }

    public void setIdmolde(Integer idmolde) {
        this.idmolde = idmolde;
    }

    public String getModelo() {
        return modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getSerie() {
        return serie;
    }

    public void setSerie(String serie) {
        this.serie = serie;
    }

    public String getEnexistencia() {
        return enexistencia;
    }

    public void setEnexistencia(String enexistencia) {
        this.enexistencia = enexistencia;
    }

    @Override
    public String toString() {
        return "CatalogoMoldes{" + "idmolde=" + idmolde + ", modelo=" + modelo + ", descripcion=" + descripcion + ", serie=" + serie + ", enexistencia=" + enexistencia + '}';
    }



}
