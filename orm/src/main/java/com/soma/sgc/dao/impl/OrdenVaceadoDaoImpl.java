/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.soma.sgc.dao.impl;

import com.soma.sgc.dao.HibernateDao;
import com.soma.sgc.dao.OrdenVaceadoDao;
import com.soma.sgc.model.OrdenVaceado;
import java.util.List;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.criterion.CriteriaSpecification;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

/**
 *
 * @author HASANI
 */
@Repository("ordenDao")
public class OrdenVaceadoDaoImpl extends HibernateDao<Integer,OrdenVaceado> implements OrdenVaceadoDao{

    @Override
    public void save(OrdenVaceado produccionVaceado) {
        guardar(produccionVaceado);
    }

    @Override
    public void update(OrdenVaceado produccionVaceado) {
        actualizar(produccionVaceado);
    }

    @Override
    public void delete(int ordenid) {
        System.out.println("Entra");
        Criteria crit = creaCriteria();
        crit.add(Restrictions.eq("ordenid", ordenid));
        OrdenVaceado vaceado = (OrdenVaceado) crit.uniqueResult();
        eliminar(vaceado);
        System.out.print(ProduccionVaceadoDaoImpl.class + "Se ha eliminado correctamente el banco" + ordenid);
    }

    @Override
    public List<OrdenVaceado> showVaceado() {
             Criteria criteria = creaCriteria();
        criteria.addOrder(Order.asc("ordenid"));
        criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
        List<OrdenVaceado> lpVaceado = criteria.list();
        return lpVaceado;
    }

    @Override
    public OrdenVaceado busquedaId(int ordenid) {
          OrdenVaceado vaceado = getPorId(ordenid);
        return vaceado;
    }
    
}
