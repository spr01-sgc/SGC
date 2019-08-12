/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.soma.sgc.dao.impl;

import com.soma.sgc.dao.CatalogoPuestosDao;
import com.soma.sgc.dao.HibernateDao;
import com.soma.sgc.model.CatalogoPuestos;
import java.util.List;
import org.hibernate.Criteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

/**
 *
 * @author JASMIN-SOMA
 */
@Repository("catalogoPuestosDao")
public class CatalogoPuestosDaoImpl extends HibernateDao<Integer, CatalogoPuestos> implements CatalogoPuestosDao{

    @Override
    public void save(CatalogoPuestos catalogo_puestos) {
         guardar(catalogo_puestos);
    }

    @Override
    public void update(CatalogoPuestos catalogo_puestos) {
        update(catalogo_puestos);
    }

    @Override
    public void delete(int idPuesto) {
        Criteria cri = creaCriteria();
        cri.add(Restrictions.eq("idPuesto", idPuesto));
        CatalogoPuestos puesto = (CatalogoPuestos) cri.uniqueResult();
        eliminar(puesto);
        System.out.println(CatalogoPuestosDaoImpl.class + "se ha eliminado correctamente" + puesto);
    }

    @Override
    public List<CatalogoPuestos> showPuesto() {
         Criteria criteria = creaCriteria();
        criteria.addOrder(Order.desc("idPuesto"));
        criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
        List<CatalogoPuestos> lPuesto = criteria.list();
        return lPuesto;    
    }

    @Override
    public CatalogoPuestos busquedaId(int idPuesto) {
       CatalogoPuestos puesto = getPorId(idPuesto);
       return puesto;
    }

    @Override
    public CatalogoPuestos mostrarNombre(int idPuesto) {
        Criteria criteria = creaCriteria();
        criteria.addOrder(Order.desc("idPuesto"));
        criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
        return (CatalogoPuestos) criteria.uniqueResult();
    }
    
}
