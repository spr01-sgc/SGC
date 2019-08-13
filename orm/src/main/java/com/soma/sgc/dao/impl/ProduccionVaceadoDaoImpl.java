/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.soma.sgc.dao.impl;

import com.soma.sgc.dao.HibernateDao;
import com.soma.sgc.dao.ProduccionVaceadoDao;
import com.soma.sgc.model.ProduccionVaceado;
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
@Repository("produccionDao")
public class ProduccionVaceadoDaoImpl extends HibernateDao<Integer, ProduccionVaceado> implements ProduccionVaceadoDao {

    @Override
    public void save(ProduccionVaceado produccionVaceado) {
        guardar(produccionVaceado);
    }

    @Override
    public void update(ProduccionVaceado produccionVaceado) {
        actualizar(produccionVaceado);
    }

    @Override
    public void delete(int idproduccionv) {
         System.out.println("Entra");
        Criteria crit = creaCriteria();
        crit.add(Restrictions.eq("idproduccionv", idproduccionv));
        ProduccionVaceado vaceado = (ProduccionVaceado) crit.uniqueResult();
        eliminar(vaceado);
        System.out.print(ProduccionVaceadoDaoImpl.class + "Se ha eliminado correctamente el banco" + idproduccionv);
    }

    @Override
    public List<ProduccionVaceado> showVaceado() {
           Criteria criteria = creaCriteria();
        criteria.addOrder(Order.asc("idproduccionv"));
        criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
        List<ProduccionVaceado> lpVaceado = criteria.list();
        return lpVaceado;
    }

    @Override
    public ProduccionVaceado busquedaId(int idproduccionv) {
        ProduccionVaceado vaceado = getPorId(idproduccionv);
        return vaceado;
    }
    
}
