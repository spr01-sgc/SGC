/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.soma.sgc.service.impl;
import com.soma.sgc.dao.EmpleadoDao;
import com.soma.sgc.model.Empleado;
import com.soma.sgc.service.EmpleadoService;
import java.util.List;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.encoding.ShaPasswordEncoder;
import org.springframework.stereotype.Service;

/**
 *
 * @author HASANI
 */
@Service("empleadoService")
@Transactional
public class EmpleadoServiceImpl implements EmpleadoService {
    private boolean estadoMetodo = false;
    @Autowired
    EmpleadoDao empleadoDao;
    
    @Override
    public boolean save(Empleado empleado) {
       empleadoDao.save(empleado);
       return estadoMetodo=true;
    }

    @Override
    public boolean update(Empleado empleado) {
      empleadoDao.update(empleado);
      return estadoMetodo=true;
    }

    @Override
    public boolean delete(int idempleado) {
       empleadoDao.delete(idempleado);
       return estadoMetodo=true;
    }

    @Override
    public List<Empleado> showEmpleado() {
       return empleadoDao.showEmpleado();
    }

    @Override
    public Empleado busquedaId(int idempleado) {
       return empleadoDao.busquedaId(idempleado);
    }
    
}
