package com.soma.sgc.configuration;

import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

/**
 * @author David Salazar Mejia
 * @correo davidsm54@gmail.com
 * @fecha 19/09/2017
 * @hora 01:35:38 PM
 * @encoding UTF-8
 * @empresa SOMA
 * @version 1.0
 */
public class ServletInicializador extends AbstractAnnotationConfigDispatcherServletInitializer {

    @Override
    protected Class<?>[] getRootConfigClasses() {
        return new Class[]{Configuracion.class};
    }

    @Override
    protected Class<?>[] getServletConfigClasses() {
        return null;
    }

    @Override
    protected String[] getServletMappings() {
        return new String[]{"/"};
    }
}
