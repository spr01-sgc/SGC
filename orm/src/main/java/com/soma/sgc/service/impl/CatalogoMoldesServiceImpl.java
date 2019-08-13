/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.soma.sgc.service.impl;

import com.soma.sgc.dao.CatalogoMoldesDao;
import com.soma.sgc.model.CatalogoMoldes;
import com.soma.sgc.service.CatalogoMoldesService;
import java.util.List;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author DANIEL LOZA
 */
@Service("catalogoMoldesService")
@Transactional
public class CatalogoMoldesServiceImpl implements CatalogoMoldesService{
    
     private boolean estadoMetodo = false;
    @Autowired
    CatalogoMoldesDao moldesDao;

    @Override
    public boolean save(CatalogoMoldes catalogoMoldes) {
        moldesDao.save(catalogoMoldes);
        return estadoMetodo = true;
    }

    @Override
    public boolean update(CatalogoMoldes catalogoMoldes) {
         moldesDao.update(catalogoMoldes);
        return estadoMetodo = true;
    }

    @Override
    public boolean delete(int idMolde) {
         moldesDao.delete(idMolde);
        return estadoMetodo = true;
    }

    @Override
    public List<CatalogoMoldes> showMolde() {
        return moldesDao.showMolde();
    }

    @Override
    public CatalogoMoldes busquedaId(int idMolde) {
        return moldesDao.busquedaId(idMolde);
    }

    @Override
    public CatalogoMoldes mostrarNombre(String modelo) {
         return moldesDao.mostrarNombre(modelo);
    }

 
    
    
}
