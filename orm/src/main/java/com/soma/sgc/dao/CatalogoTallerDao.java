/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.soma.sgc.dao;

import com.soma.sgc.model.CatalogoTaller;
import java.util.List;

/**
 *
 * @author HASANI
 */
public interface CatalogoTallerDao {
    
    void save(CatalogoTaller catalogo_taller);
    void update(CatalogoTaller catalogo_taller);
    void delete(int idtaller);

    List<CatalogoTaller> showTaller();
    CatalogoTaller busquedaId(int idtaller);
    CatalogoTaller mostrarNombre(int idtaller);

    
}
