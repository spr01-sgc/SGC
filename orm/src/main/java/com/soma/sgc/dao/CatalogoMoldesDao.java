/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.soma.sgc.dao;
import com.soma.sgc.model.CatalogoMoldes;
import java.util.List;

/**
 *
 * @author DANIEL LOZA
 */
public interface CatalogoMoldesDao {
    void save(CatalogoMoldes catalogoMoldes);
    void update(CatalogoMoldes catalogoMoldes);
    void delete(int idmolde);

    List<CatalogoMoldes> showMolde();
    CatalogoMoldes busquedaId(int idmolde);
    CatalogoMoldes mostrarNombre(String modelo);
    CatalogoMoldes busquedaSerie(String serie);

   
}
