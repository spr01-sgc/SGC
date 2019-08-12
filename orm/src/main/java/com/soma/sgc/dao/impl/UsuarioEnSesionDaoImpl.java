/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.soma.sgc.dao.impl;

import com.soma.sgc.dao.HibernateDao;
import com.soma.sgc.dao.UsuarioEnSesionDao;
import com.soma.sgc.model.UsuarioEnSesion;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.hibernate.Query;
import org.springframework.stereotype.Repository;

/**
 *
 * @author HASANI
 */
@Repository("usuarioEnSesionDao")
public class UsuarioEnSesionDaoImpl extends HibernateDao<Integer, UsuarioEnSesion> implements UsuarioEnSesionDao {

    private final static Logger LOGGER = Logger.getLogger(UsuarioEnSesionDaoImpl.class.getName());

    @Override
    public void save(UsuarioEnSesion usuario) {
        try {
            guardar(usuario);
            System.out.println(UsuarioEnSesionDaoImpl.class + " Se ha guardado correctamente la sesion del usuario");
        } catch (Exception e) {
            LOGGER.log(Level.WARNING, "Falló al hacer un rollback al guardar la sesion del usuario", e);
            throw e;
        }
    }

    @Override
    public void update(UsuarioEnSesion usuario) {
        try {
            actualizar(usuario);
            System.out.println(UsuarioEnSesionDaoImpl.class + " Se ha actualizado correctamente la sesion del usuario");
        } catch (Exception e) {
            LOGGER.log(Level.WARNING, "Falló al hacer un rollback al actualizar la sesion del usuario", e);
            throw e;
        }
    }

    @Override
    public UsuarioEnSesion consultaUsuario(int usuarioId) {
        try {
            Query query = getSession().createQuery("FROM UsuarioEnSesion \n"
                    + "WHERE usuarioId = " + usuarioId);
            UsuarioEnSesion usuario = (UsuarioEnSesion) query.uniqueResult();
            return usuario;
        } catch (Exception e) {
            LOGGER.log(Level.WARNING, "Falló al hacer un rollback al buscar la sesion del usuario", e);
            throw e;
        }
    }

    @Override
    public List<UsuarioEnSesion> showUsuarioEnSesion() {
        try {
            Query query = getSession().createQuery("FROM UsuarioEnSesion u \n"
                    + " LEFT JOIN FETCH u.usuarioId as usu\n"
                    + " LEFT JOIN FETCH usu.rol as r "
                    + " WHERE status = true AND  r.nombre = 'OFICIAL'");
            List<UsuarioEnSesion> lUsuario = query.list();
            return lUsuario;
        } catch (Exception e) {
            LOGGER.log(Level.WARNING, "Falló al hacer un rollback al hacer un lista de los usuarios en sesión", e);
            throw e;
        }
    }

}
