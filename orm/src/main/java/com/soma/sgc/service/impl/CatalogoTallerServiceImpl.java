/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.soma.sgc.service.impl;
import com.soma.sgc.dao.CatalogoTallerDao;
import com.soma.sgc.model.CatalogoTaller;
import com.soma.sgc.service.CatalogoTallerService;
import java.util.List;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.encoding.ShaPasswordEncoder;
import org.springframework.stereotype.Service;

/**
 *
 * @author HASANI
 */
@Service("catalogoTallerService")
@Transactional

public class CatalogoTallerServiceImpl implements CatalogoTallerService {
 private boolean estadoMetodo = false;
    @Autowired
    CatalogoTallerDao tallerDao;
    @Override
    public boolean save(CatalogoTaller catalogo_taller) {
        tallerDao.save(catalogo_taller);
        return estadoMetodo=true;
    }

    @Override
    public boolean update(CatalogoTaller catalogo_taller) {
       tallerDao.update(catalogo_taller);
       return estadoMetodo=true;
    }

    @Override
    public boolean delete(int idtaller) {
      tallerDao.delete(idtaller);
      return estadoMetodo=true;
    }

    @Override
    public List<CatalogoTaller> showTaller() {
       return tallerDao.showTaller();
    }

    @Override
    public CatalogoTaller busquedaId(int idtaller) {
        return tallerDao.busquedaId(idtaller);
    }

    @Override
    public CatalogoTaller mostrarNombre(int idtaller) {
        return tallerDao.mostrarNombre(idtaller);
    }
    
}

