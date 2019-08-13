/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.soma.sgc.service;

import com.soma.sgc.model.ProduccionVaceado;
import java.util.List;

/**
 *
 * @author HASANI
 */
public interface ProduccionVaceadoService {

    boolean save(ProduccionVaceado produccionVaceado);

    boolean update(ProduccionVaceado produccionVaceado);

    boolean delete(int idproduccionv);

    List<ProduccionVaceado> showVaceado();

    ProduccionVaceado busquedaId(int idproduccionv);

}
