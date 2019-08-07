/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.soma.sgc.dao;

import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Clase generica que contiene los metodos para un CRUD
 *
 * @author estadias2017-2
 * @param <PK>
 * @param <Tabla>//falta poner abstrac
 */
public  class HibernateDao<PK extends Serializable, Tabla> {

    private final Class<Tabla> persistentClass;

    public HibernateDao() {
        this.persistentClass = (Class<Tabla>) ((ParameterizedType) this.getClass().getGenericSuperclass()).getActualTypeArguments()[1];
    }
        @Autowired
        private SessionFactory fabricaSesion;

    public SessionFactory getFabricaSesion() {
        setFabricaSesion();
        return fabricaSesion;
    }

    public void setFabricaSesion() {
        this.fabricaSesion = new Configuration().configure().buildSessionFactory();
    }

    

    protected Session getSession() {
        return fabricaSesion.getCurrentSession();
    }   

    public Tabla getPorId(PK key) {
        return (Tabla) getSession().get(persistentClass, key);
    }

    public void guardar(Tabla entidad) {
        getSession().saveOrUpdate(entidad);
    }

    public void actualizar(Tabla entidad) {
        getSession().update(entidad);
    }

    public void eliminar(Tabla entidad) {
        getSession().delete(entidad);
    }

    protected Criteria creaCriteria() {
        return getSession().createCriteria(persistentClass);
    }
}
