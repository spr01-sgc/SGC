/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.soma.sgc.model;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import org.hibernate.annotations.ForeignKey;

/**
 *
 * @author DANIEL LOZA
 */
@Entity
@Table(name = "empleado")
public class Empleado implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idempleado")
    private Integer idempleado;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "app")
    private String app;

    @Column(name = "apm")
    private String apm;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "serie")
    private String serie;

    @Column(name = "estatus")
    private String estatus;

    @Column(name = "fechaentrada")
    private Date fechaentrada;
    
    @Column(name = "fechasalida")
    private Date fechasalida;

    //Establece relacion con CatalogoPuestos
    @ManyToOne
    @ForeignKey(name = "idpuesto_fk")
    private CatalogoPuestos idpuesto;
    
    //Establece relacion con CatalogoTaller
    @ManyToOne
    @ForeignKey(name = "idtaller_fk")
    private CatalogoTaller idtaller;

    public CatalogoPuestos getIdpuesto() {
        return idpuesto;
    }

    public void setIdpuesto(CatalogoPuestos idpuesto) {
        this.idpuesto = idpuesto;
    }
  

    public Integer getIdempleado() {
        return idempleado;
    }

    public void setIdempleado(Integer idempleado) {
        this.idempleado = idempleado;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApp() {
        return app;
    }

    public void setApp(String app) {
        this.app = app;
    }

    public String getApm() {
        return apm;
    }

    public void setApm(String apm) {
        this.apm = apm;
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

    public String getEstatus() {
        return estatus;
    }

    public void setEstatus(String estatus) {
        this.estatus = estatus;
    }

    public Date getFechaentrada() {
        return fechaentrada;
    }

    public void setFechaentrada(Date fechaentrada) {
        this.fechaentrada = fechaentrada;
    }
    
     public Date getFechasalida() {
        return fechasalida;
    }

    public void setFechasalida(Date fechasalida) {
        this.fechasalida = fechasalida;
    }

    public CatalogoTaller getIdtaller() {
        return idtaller;
    }

    public void setIdtaller(CatalogoTaller idtaller) {
        this.idtaller = idtaller;
    }

    @Override
    public String toString() {
        return "Empleado{" + "idempleado=" + idempleado + ", nombre=" + nombre + ", app=" + app + ", apm=" + apm + ", descripcion=" + descripcion + ", serie=" + serie + ", estatus=" + estatus + ", fechaentrada=" + fechaentrada + ", idtaller=" + idtaller + '}';
    }




  

}
