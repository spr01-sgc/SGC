/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.soma.sgc.model;

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
 * @author DANIEL LOZA
 */
@Entity
@Table(name = "produccionVaceado")
public class ProduccionVaceado {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idproduccionv")
    private Integer idproduccionv;
    
    //Establece relacion con Empleado
    @ManyToOne
    @ForeignKey(name = "idempleado_fk")
    private Empleado empleado;
    
    //Establece relacion con CodigoBarras
    @ManyToOne
    @ForeignKey(name = "idcodigobarras_fk")
    private CodigoBarras codigoBarras;
    
     @ManyToOne
    @ForeignKey(name = "idmolde_fk")
    private CatalogoMoldes idmolde;
     
       @OneToMany(cascade = CascadeType.ALL)
    @LazyCollection(LazyCollectionOption.FALSE)
    private List<OrdenVaceado> ordenid;

    public Integer getIdproduccionv() {
        return idproduccionv;
    }

    public void setIdproduccionv(Integer idproduccionv) {
        this.idproduccionv = idproduccionv;
    }

    public Empleado getEmpleado() {
        return empleado;
    }

    public void setEmpleado(Empleado empleado) {
        this.empleado = empleado;
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

    public List<OrdenVaceado> getOrdenid() {
        return ordenid;
    }

    public void setOrdenid(List<OrdenVaceado> ordenid) {
        this.ordenid = ordenid;
    }
}
