/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.soma.sgc.service.impl;

import com.soma.sgc.dao.RolDao;
import com.soma.sgc.model.RolUsuario;
import com.soma.sgc.service.RolService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Jasmin Santana
 */
@Service("rolService")
@Transactional
public class RolServiceImpl implements RolService {

    @Autowired
    RolDao rolDao;

    @Override
    public List<RolUsuario> showRol() {
        return rolDao.showRol();
    }

    @Override
    public RolUsuario buscarNombre(int rolid) {
        return rolDao.buscarNombre(rolid);
    }

}
