/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.soma.sgc.service.impl;

import com.soma.sgc.dao.CatalogoPuestosDao;
import com.soma.sgc.model.CatalogoPuestos;
import com.soma.sgc.service.CatalogoPuestosService;
import java.util.List;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author JASMIN-SOMA
 */
@Service("catalogoPuestosService")
@Transactional
public class CatalogoPuestosServiceImpl implements CatalogoPuestosService {

    private boolean estadoMetodo = false;
    @Autowired
    CatalogoPuestosDao puestosDao;

    @Override
    public boolean save(CatalogoPuestos catalogo_puestos) {
        puestosDao.save(catalogo_puestos);
        return estadoMetodo = true;
    }

    @Override
    public boolean update(CatalogoPuestos catalogo_puestos) {
        puestosDao.update(catalogo_puestos);
        return estadoMetodo = true;
    }

    @Override
    public boolean delete(int idPuesto) {
        puestosDao.delete(idPuesto);
        return estadoMetodo = true;
    }

    @Override
    public List<CatalogoPuestos> showPuesto() {
        return puestosDao.showPuesto();
    }

    @Override
    public CatalogoPuestos busquedaId(int idPuesto) {
        return puestosDao.busquedaId(idPuesto);
    }

    @Override
    public CatalogoPuestos mostrarNombre(int idPuesto) {
        return puestosDao.mostrarNombre(idPuesto);
    }

}
