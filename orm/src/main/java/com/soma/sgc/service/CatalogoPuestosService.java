/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.soma.sgc.service;

import com.soma.sgc.model.CatalogoPuestos;
import java.util.List;

/**
 *
 * @author JASMIN-SOMA
 */
public interface CatalogoPuestosService {
    boolean save(CatalogoPuestos catalogo_puestos);
    boolean update(CatalogoPuestos catalogo_puestos);
    boolean delete(int idPuesto);

    List<CatalogoPuestos> showPuesto();
    CatalogoPuestos busquedaId(int idPuesto);
    CatalogoPuestos mostrarNombre(int idPuesto);
}
