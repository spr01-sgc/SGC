package com.soma.sgc.configuration;

import java.util.Properties;
import javax.sql.DataSource;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.hibernate4.HibernateTransactionManager;
import org.springframework.orm.hibernate4.LocalSessionFactoryBean;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 *Establece conexion con la BD
 * @author estadias2017-2
 */
@Configuration
@EnableTransactionManagement
@ComponentScan({"com.soma.sgc.configuration"})
@PropertySource(value = {"classpath:application.properties"})
public class Hibernate {

    /*
    Se conecta a la interface Enviroment para que spring conozca de donde se
    obtendran las cadenas de texto que seran util para la conexion a la base de datos
     */
    @Autowired
    private Environment servicioConexion;

    //Se crean las propiedades de hibernate 
    private Properties hibernatePropiedad() {
        Properties propiedad = new Properties();
        propiedad.put("hibernate.dialect", servicioConexion.getRequiredProperty("hibernate.dialect"));
        propiedad.put("hibernate.show_sql", servicioConexion.getRequiredProperty("hibernate.show_sql"));
        propiedad.put("hibernate.format_sql", servicioConexion.getRequiredProperty("hibernate.format_sql"));
        propiedad.put("hibernate.hbm2ddl.auto", servicioConexion.getRequiredProperty("hibernate.hbm2ddl.auto"));
        return propiedad;
    }
    
    //Se inicializa un bean para indicar cual sera la fuente de datos del sistema
    @Bean
    public DataSource datoRecursos() {
        DriverManagerDataSource daroRecurso = new DriverManagerDataSource();
        daroRecurso.setDriverClassName(servicioConexion.getRequiredProperty("jdbc.driverClassName"));
        daroRecurso.setUrl(servicioConexion.getRequiredProperty("jdbc.url"));
        daroRecurso.setUsername(servicioConexion.getRequiredProperty("jdbc.username"));
        daroRecurso.setPassword(servicioConexion.getRequiredProperty("jdbc.password"));
        return daroRecurso;
    }

    //Se inicializa un bean para que se almacenen todas las sesiones del modelo de datos
    @Bean
    public LocalSessionFactoryBean fabricaSesionHibernate() {
        LocalSessionFactoryBean sesionHibernate = new LocalSessionFactoryBean();
        sesionHibernate.setDataSource(datoRecursos());
        sesionHibernate.setPackagesToScan(new String[]{"com.soma.sgc.model"});
        sesionHibernate.setHibernateProperties(hibernatePropiedad());
        return sesionHibernate;
    }
    

    @Bean
    @Autowired
    public HibernateTransactionManager contralaTransaccion(SessionFactory sesion) {
        HibernateTransactionManager controladorTransaccion = new HibernateTransactionManager();
        controladorTransaccion.setSessionFactory(sesion);
        return controladorTransaccion;
    }

}
