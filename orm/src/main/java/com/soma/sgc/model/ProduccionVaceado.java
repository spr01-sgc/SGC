/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.soma.sgc.model;

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
}
