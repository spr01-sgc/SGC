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
 * @author JASMIN-SOMA
 */

@Entity
@Table(name = "usuario")
public class Prueba implements Serializable {
    
  @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer rolid;
    @NotEmpty
    @Column(name = "nombre")
    private String nombre;
}
