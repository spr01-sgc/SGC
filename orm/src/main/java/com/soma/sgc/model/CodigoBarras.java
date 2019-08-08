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
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import org.hibernate.annotations.ForeignKey;

/**
 *
 * @author DANIEL LOZA
 */
@Entity
@Table(name = "codigoBarras")
public class CodigoBarras implements Serializable{
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idcodigobarras")
    private Integer idcodigobarras;
    
    @Column(name = "codigo")
    private String codigo;

   //Establece relacion con CatalogoMoldes
    @ManyToOne
    @ForeignKey(name = "idmolde_fk")
    private CatalogoMoldes idmolde;

    public Integer getIdcodigobarras() {
        return idcodigobarras;
    }

    public void setIdcodigobarras(Integer idcodigobarras) {
        this.idcodigobarras = idcodigobarras;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public CatalogoMoldes getIdmolde() {
        return idmolde;
    }

    public void setIdmolde(CatalogoMoldes idmolde) {
        this.idmolde = idmolde;
    }
    
    
}
