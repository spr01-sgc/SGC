/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.soma.sgc.dao.impl;

import com.soma.sgc.dao.HibernateDao;
import com.soma.sgc.dao.EmpleadoDao;
import com.soma.sgc.model.Empleado;
import java.util.List;
import org.hibernate.Criteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

/**
 *
 * @author HASANI
 */
@Repository("empleadoDao")
public class EmpleadoDaoImpl extends HibernateDao<Integer, Empleado> implements EmpleadoDao {

    @Override
    public void save(Empleado empleado) {
        guardar(empleado);
    }

    @Override
    public void update(Empleado empleado) {
        actualizar(empleado);
    }

    @Override
    public void delete(int idempleado) {
        Criteria criteria = creaCriteria();
        criteria.add(Restrictions.eq("idempleado", idempleado));
        Empleado empleado = (Empleado) criteria.uniqueResult();
        eliminar(empleado);
        System.out.println(EmpleadoDaoImpl.class + " se ha eliminado correctamente" + idempleado);
    }

    @Override
    public List<Empleado> showEmpleado() {
        Criteria cri = creaCriteria();
        cri.addOrder(Order.desc("idempleado"));
        cri.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
        List<Empleado> lempleado = cri.list();
        return lempleado;
    }

    @Override
    public Empleado busquedaId(int idempleado) {
        Criteria crite = creaCriteria();
        crite.add(Restrictions.eq("idempleado", idempleado));
        crite.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
        return (Empleado) crite.uniqueResult();

    }

    @Override
    public Empleado busquedaSerie(String serie) {
        Criteria criteria = creaCriteria();
        criteria.add(Restrictions.eq("serie", serie));
        System.out.println(EmpleadoDaoImpl.class + "\nBuscando Serie: " + serie);
        criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
        return (Empleado) criteria.uniqueResult();
    }

    @Override
    public List<Empleado> busquedaEmpleadoPuesto(int puesto) {
        Criteria criteria = getSession().createCriteria(Empleado.class)
                .add(Restrictions.ilike("idpuesto", "%" + puesto + "%"));
        List<Empleado> lempleado = criteria.list();
        return lempleado;
    }

}
