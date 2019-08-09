/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.soma.sgc.service;

import com.soma.sgc.model.CatalogoTaller;
import java.util.List;

/**
 *
 * @author HASANI
 */
public interface CatalogoTallerService {

    boolean save(CatalogoTaller catalogo_taller);

    boolean update(CatalogoTaller catalogo_taller);

    boolean delete(int idtaller);

    List<CatalogoTaller> showTaller();

    CatalogoTaller busquedaId(int idtaller);
    
    CatalogoTaller mostrarNombre(int idtaller);

}
