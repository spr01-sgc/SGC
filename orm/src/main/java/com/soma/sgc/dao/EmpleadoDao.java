/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.soma.sgc.dao;

import com.soma.sgc.model.Empleado;
import java.util.List;

/**
 *
 * @author HASANI
 */
public interface EmpleadoDao {

    void save(Empleado empleado);

    void update(Empleado empleado);

    void delete(int idempleado);

    List<Empleado> showEmpleado();

    Empleado busquedaId(int idempleado);

    Empleado busquedaSerie(String serie);

}
