/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.soma.sgc.dao;

import com.soma.sgc.model.ProduccionVaceado;
import java.util.List;

/**
 *
 * @author HASANI
 */
public interface ProduccionVaceadoDao {

    void save(ProduccionVaceado produccionVaceado);

    void update(ProduccionVaceado produccionVaceado);

    void delete(int idproduccionv);

    List<ProduccionVaceado> showVaceado();

    ProduccionVaceado busquedaId(int idproduccionv);

}
