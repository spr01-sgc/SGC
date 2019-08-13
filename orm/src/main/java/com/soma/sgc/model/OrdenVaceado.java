/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.soma.sgc.model;

import java.io.Serializable;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import org.hibernate.annotations.ForeignKey;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

/**
 *
 * @author HASANI
 */
@Entity
@Table(name = "ordenVaceado")
public class OrdenVaceado implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ordenid")
    private Integer ordenid;
    //Establece relacion con CodigoBarras
    @ManyToOne
    @ForeignKey(name = "idcodigobarras_fk")
    private CodigoBarras codigoBarras;

    @ManyToOne
    @ForeignKey(name = "idmolde_fk")
    private CatalogoMoldes idmolde;
    @Column(name = "cantidad")
    private Integer cantidad;
    @Column(name = "descripcion")
    private Integer descripcion;

    public Integer getOrdenid() {
        return ordenid;
    }

    public void setOrdenid(Integer ordenid) {
        this.ordenid = ordenid;
    }

    public CodigoBarras getCodigoBarras() {
        return codigoBarras;
    }

    public void setCodigoBarras(CodigoBarras codigoBarras) {
        this.codigoBarras = codigoBarras;
    }

    public CatalogoMoldes getIdmolde() {
        return idmolde;
    }

    public void setIdmolde(CatalogoMoldes idmolde) {
        this.idmolde = idmolde;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public Integer getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(Integer descripcion) {
        this.descripcion = descripcion;
    }

}
