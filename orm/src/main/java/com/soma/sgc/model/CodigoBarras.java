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
    @ForeignKey(name = "idmoldes_fk")
    private CatalogoMoldes catalogoMoldes;
    
}
