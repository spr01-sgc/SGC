/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.soma.sgc.service;

import com.soma.sgc.model.OrdenVaceado;
import java.util.List;

/**
 *
 * @author HASANI
 */
public interface OrdenVaceadoService {

    boolean save(OrdenVaceado produccionVaceado);

    boolean update(OrdenVaceado produccionVaceado);

    boolean delete(int ordenid);

    List<OrdenVaceado> showVaceado();

    OrdenVaceado busquedaId(int ordenid);

}
