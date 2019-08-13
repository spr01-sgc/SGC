/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.soma.sgc.service.impl;
import com.soma.sgc.dao.ProduccionVaceadoDao;
import com.soma.sgc.model.ProduccionVaceado;
import com.soma.sgc.service.ProduccionVaceadoService;
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

@Service("produccionService")
@Transactional
public class ProduccionVaceadoServiceImpl implements ProduccionVaceadoService {
    
      private boolean estadoMetodo = false;
    @Autowired
    ProduccionVaceadoDao produccionDao;

    @Override
    public boolean save(ProduccionVaceado produccionVaceado) {
       produccionDao.save(produccionVaceado);
       return estadoMetodo=true;
    }

    @Override
    public boolean update(ProduccionVaceado produccionVaceado) {
        produccionDao.update(produccionVaceado);
        return estadoMetodo=true;
    }

    @Override
    public boolean delete(int idproduccionv) {
        produccionDao.delete(idproduccionv);
        return estadoMetodo=true;
    }

    @Override
    public List<ProduccionVaceado> showVaceado() {
return produccionDao.showVaceado();
    }

    @Override
    public ProduccionVaceado busquedaId(int idproduccionv) {
       return produccionDao.busquedaId(idproduccionv);
    }

  
    
}
