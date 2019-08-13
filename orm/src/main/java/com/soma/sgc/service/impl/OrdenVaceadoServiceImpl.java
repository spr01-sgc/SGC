/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.soma.sgc.service.impl;
import com.soma.sgc.dao.OrdenVaceadoDao;
import com.soma.sgc.model.OrdenVaceado;
import com.soma.sgc.service.OrdenVaceadoService;
import java.util.List;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.encoding.ShaPasswordEncoder;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
/**
 *
 * @author HASANI
 */

@Service("OrdenService")
@Transactional
public class OrdenVaceadoServiceImpl implements OrdenVaceadoService{
    
    private boolean estadoMetodo = false;
    @Autowired
    OrdenVaceadoDao ordenDao;

 


    @Override
    public List<OrdenVaceado> showVaceado() {
        return ordenDao.showVaceado();
    }

    @Override
    public OrdenVaceado busquedaId(int ordenid) {
       return ordenDao.busquedaId(ordenid);
    }

    @Override
    public boolean save(OrdenVaceado produccionVaceado) {
        ordenDao.save(produccionVaceado);
        return estadoMetodo=true;
    }

    @Override
    public boolean update(OrdenVaceado produccionVaceado) {
      ordenDao.update(produccionVaceado);
      return estadoMetodo=true;
    }

    @Override
    public boolean delete(int ordenid) {
        ordenDao.delete(ordenid);
        return estadoMetodo=true;
    }
    
    
}
