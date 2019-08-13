/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.soma.sgc.dao.impl;

import com.soma.sgc.dao.CatalogoMoldesDao;
import com.soma.sgc.dao.HibernateDao;
import com.soma.sgc.model.CatalogoMoldes;
import java.util.List;
import org.hibernate.Criteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

/**
 *
 * @author DANIEL LOZA
 */
@Repository("catalogoMoldesDao")
public class CatalogoMoldesDaoImpl extends HibernateDao<Integer, CatalogoMoldes> implements CatalogoMoldesDao {

    @Override
    public void save(CatalogoMoldes catalogoMoldes) {
        guardar(catalogoMoldes);
    }

    @Override
    public void update(CatalogoMoldes catalogoMoldes) {
        actualizar(catalogoMoldes);
    }

    @Override
    public void delete(int idmolde) {
        Criteria cri = creaCriteria();
        cri.add(Restrictions.eq("idmolde", idmolde));
        CatalogoMoldes molde = (CatalogoMoldes) cri.uniqueResult();
        eliminar(molde);
        System.out.println(CatalogoPuestosDaoImpl.class + "se ha eliminado correctamente" + molde);
    }

    @Override
    public List<CatalogoMoldes> showMolde() {
        Criteria criteria = creaCriteria();
        criteria.addOrder(Order.desc("idmolde"));
        criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
        List<CatalogoMoldes> lMolde = criteria.list();
        return lMolde;
    }

    @Override
    public CatalogoMoldes busquedaId(int idmolde) {
        CatalogoMoldes molde = getPorId(idmolde);
        return molde;
    }

    @Override
    public CatalogoMoldes mostrarNombre(String modelo) {
        Criteria criteria = creaCriteria();
        criteria.add(Restrictions.eq("modelo", modelo));
        System.out.println(UsuarioDaoImpl.class + "\nBuscando Molde por modelo: " + modelo);
        criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
        return (CatalogoMoldes) criteria.uniqueResult();
    }

}
