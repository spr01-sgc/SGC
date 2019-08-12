/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.soma.sgc.dao;

import com.soma.sgc.model.CatalogoPuestos;
import java.util.List;

/**
 *
 * @author JASMIN-SOMA
 */
public interface CatalogoPuestosDao {
    void save(CatalogoPuestos catalogo_puestos);
    void update(CatalogoPuestos catalogo_puestos);
    void delete(int idPuesto);

    List<CatalogoPuestos> showPuesto();
    CatalogoPuestos busquedaId(int idPuesto);
    CatalogoPuestos mostrarNombre(int idPuesto);
}
