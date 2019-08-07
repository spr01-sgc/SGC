package com.soma.sgc.configuration;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewResolverRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.springframework.web.servlet.view.JstlView;

/**
 *
 * @author estadias2017-2
 */
@Configuration
@EnableWebMvc
@ComponentScan(basePackages = "com.soma.sgc")
public class Configuracion extends WebMvcConfigurerAdapter {

    @Override
    public void configureViewResolvers(ViewResolverRegistry registry) {
        InternalResourceViewResolver vistaAceptada = new InternalResourceViewResolver();
        
        vistaAceptada.setViewClass(JstlView.class);
       
        vistaAceptada.setPrefix("/WEB-INF/views/");
        
        vistaAceptada.setSuffix(".jsp");
        
        registry.viewResolver(vistaAceptada);
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registro) {
        registro.addResourceHandler("/assets/**").addResourceLocations("/assets/");
    }
    
    @Override
    public void configurePathMatch(PathMatchConfigurer matcher) {
        matcher.setUseRegisteredSuffixPatternMatch(true);
    }
}
