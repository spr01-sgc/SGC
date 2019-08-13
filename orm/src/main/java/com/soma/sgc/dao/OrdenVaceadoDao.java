/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.soma.sgc.dao;

import com.soma.sgc.model.OrdenVaceado;
import java.util.List;

/**
 *
 * @author HASANI
 */
public interface OrdenVaceadoDao {

    void save(OrdenVaceado produccionVaceado);

    void update(OrdenVaceado produccionVaceado);

    void delete(int ordenid);

    List<OrdenVaceado> showVaceado();

    OrdenVaceado busquedaId(int ordenid);

}
