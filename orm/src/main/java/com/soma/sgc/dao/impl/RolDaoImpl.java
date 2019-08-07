/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.soma.sgc.dao.impl;

import com.soma.sgc.dao.HibernateDao;
import com.soma.sgc.dao.RolDao;
import com.soma.sgc.model.RolUsuario;
import java.util.List;
import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Jasmin Santana
 */
@Repository("rolDao")
public class RolDaoImpl extends HibernateDao<Integer, RolUsuario> implements RolDao{

    @Override
    public List<RolUsuario> showRol() {
     Criteria criteria = creaCriteria();
        //indicar que no traiga datos repetidos
        criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
        //lista los roles sin repetir algun dato
        List<RolUsuario> lRol = criteria.list();
        return lRol;
    }

    @Override
    public RolUsuario buscarNombre(int rolid) {
     Criteria criteria = creaCriteria();
        
        criteria.add(Restrictions.eq("rolid", rolid));
        
        System.out.println(RolDaoImpl.class + "\nBuscando Usuario por idrol: " + rolid);
        
        criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
        
        return (RolUsuario) criteria.uniqueResult();
    }
    
}
