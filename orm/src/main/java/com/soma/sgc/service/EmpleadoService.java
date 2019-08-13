/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.soma.sgc.service;

import com.soma.sgc.model.Empleado;
import java.util.List;

/**
 *
 * @author HASANI
 */
public interface EmpleadoService {

    boolean save(Empleado empleado);

    boolean update(Empleado empleado);

    boolean delete(int idempleado);

    List<Empleado> showEmpleado();

    Empleado busquedaId(int idempleado);
    
    Empleado busquedaSerie(String serie);
    
    List<Empleado> busquedaEmpleadoPuesto(int puesto);

}
