/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.soma.sgc.dao.impl;

import com.soma.sgc.dao.HibernateDao;
import com.soma.sgc.dao.CatalogoTallerDao;
import com.soma.sgc.model.CatalogoTaller;
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
@Repository("tallerDao")
public class CatalogoTallerDaoImpl extends HibernateDao<Integer, CatalogoTaller> implements CatalogoTallerDao {

    @Override
    public void save(CatalogoTaller catalogo_taller) {
        guardar(catalogo_taller);
    }

    @Override
    public void update(CatalogoTaller catalogo_taller) {
        actualizar(catalogo_taller);
    }

    @Override
    public void delete(int idtaller) {
        Criteria cri = creaCriteria();
        cri.add(Restrictions.eq("idtaller", idtaller));
        CatalogoTaller taller = (CatalogoTaller) cri.uniqueResult();
        eliminar(taller);
        System.out.println(CatalogoTallerDaoImpl.class + "se ha eliminado correctamente" + idtaller);

    }

    @Override
    public List<CatalogoTaller> showTaller() {
        Criteria criteria = creaCriteria();
        criteria.addOrder(Order.desc("idtaller"));
        criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
        List<CatalogoTaller> ltaller = criteria.list();
        return ltaller;
    }

    @Override
    public CatalogoTaller busquedaId(int idtaller) {
        CatalogoTaller taller = getPorId(idtaller);
        return taller;
    }

}
