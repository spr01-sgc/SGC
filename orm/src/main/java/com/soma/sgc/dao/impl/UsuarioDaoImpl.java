/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.soma.sgc.dao.impl;

import com.soma.sgc.dao.HibernateDao;
import com.soma.sgc.dao.UsuarioDao;
import com.soma.sgc.model.Usuario;
import java.util.List;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.criterion.CriteriaSpecification;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

/**
 *
 * @author estadias2017-2
 */
@Repository("usuarioDao")
public class UsuarioDaoImpl extends HibernateDao<Integer, Usuario> implements UsuarioDao {

    @Override
    public void save(Usuario usuario) {
        guardar(usuario);
    }

    @Override
    public void update(Usuario usuario) {
        actualizar(usuario);
    }

    @Override
    public Usuario busquedaId(int usuarioId) {
        Usuario usuario = getPorId(usuarioId);
        return usuario;
    }

    @Override
    public Usuario busquedaNinckname(String nickname) {
        Criteria criteria = creaCriteria();

        criteria.add(Restrictions.eq("nickname", nickname));
        System.out.println(UsuarioDaoImpl.class + "\nBuscando Usuario por nickname: " + nickname);

        criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
        return (Usuario) criteria.uniqueResult();
    }

    @Override
    public List<Usuario> showUsuario() {
        Criteria criteria = creaCriteria();
        criteria.addOrder(Order.asc("usuarioid"));
        criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
        List<Usuario> lUsuario = criteria.list();
        return lUsuario;

    }

    @Override//ya no se ocupa
    public Usuario busquedaNombre(String nombre, String apPaterno, String apMaterno) {
        Criteria criteria = getSession().createCriteria(Usuario.class)
                .createCriteria("personaid")
                .add(Restrictions.ilike("nombre", "%" + nombre + "%"))
                .add(Restrictions.ilike("apaterno", "%" + apPaterno + "%"))
                .add(Restrictions.ilike("amaterno", "%" + apMaterno + "%")) //.add(Restrictions.ilike("correo", "%"+nombre+"%"))
                ;
        return (Usuario) criteria.uniqueResult();
    }

    @Override
    public void delete(int usuarioid) {
        System.out.println("Entra");
        Criteria crit = creaCriteria();
        crit.add(Restrictions.eq("usuarioid", usuarioid));
        Usuario usuario = (Usuario) crit.uniqueResult();
        eliminar(usuario);
        System.out.print(UsuarioDaoImpl.class + "Se ha eliminado correctamente el banco" + usuarioid);
    }

}
