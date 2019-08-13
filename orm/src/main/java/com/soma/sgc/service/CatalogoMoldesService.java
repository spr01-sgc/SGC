/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.soma.sgc.service;

import com.soma.sgc.model.CatalogoMoldes;
import java.util.List;
/**
 *
 * @author DANIEL LOZA
 */
public interface CatalogoMoldesService {
    boolean save(CatalogoMoldes catalogoMoldes);
    boolean update(CatalogoMoldes catalogoMoldes);
    boolean delete(int idMolde);

    List<CatalogoMoldes> showMolde();
    CatalogoMoldes busquedaId(int idMolde);
    CatalogoMoldes mostrarNombre(String modelo);
    CatalogoMoldes busquedaSerie(String serie);
}
