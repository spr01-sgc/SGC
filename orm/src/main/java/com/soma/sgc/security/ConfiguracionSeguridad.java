/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.soma.sgc.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationTrustResolver;
import org.springframework.security.authentication.AuthenticationTrustResolverImpl;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.authentication.encoding.ShaPasswordEncoder;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;


/**
 *
 * @author estadias2017-2
 */
@Configuration
@EnableWebSecurity
public class ConfiguracionSeguridad extends WebSecurityConfigurerAdapter {

    @Autowired
    @Qualifier("detalleUsuario")
    UserDetailsService detalleUsuario;
   

    /**
     * Este metodo ajusta la configuracion de usuario para agregar el usuario de
     * BD a la sesion de spring
     *
     * @param autenticacion
     * @throws Exception
     */
    @Autowired
    public void configuracionGeneral(AuthenticationManagerBuilder autenticacion) throws Exception {
        /*autenticacion.inMemoryAuthentication().withUser("user").password("123").roles("USER");
        autenticacion.inMemoryAuthentication().withUser("admin").password("123").roles("ADMIN");
        autenticacion.inMemoryAuthentication().withUser("oficial").password("123").roles("ADMIN","OFICIAL");*/
        autenticacion.userDetailsService(detalleUsuario);
        autenticacion.authenticationProvider(proveedorAutenticacion());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests().antMatchers("/", "/init").access("hasRole('ADMIN') or hasRole('USER') or hasRole('OFICIAL')")
	  	.and()
                .formLogin().loginPage("/login").loginProcessingUrl("/login")
                .usernameParameter("nickname").passwordParameter("contrasena")
                .and().csrf().and().exceptionHandling().accessDeniedPage("/error404");
        
    }

    /**
     * Este metodo provee de encriptacion de caracteres con sha 512
     *
     * @return
     */
    @Bean
    public ShaPasswordEncoder encriptacion() {
        ShaPasswordEncoder encoder = new ShaPasswordEncoder(512);
        return encoder;
    }

    /**
     * Este metodo provee de informacion de los usuarios que existen en base de
     * datos
     *
     * @return
     */
    @Bean
    public DaoAuthenticationProvider proveedorAutenticacion() {
        DaoAuthenticationProvider proveedorAutenticacion = new DaoAuthenticationProvider();
        proveedorAutenticacion.setUserDetailsService(detalleUsuario);
        proveedorAutenticacion.setPasswordEncoder(encriptacion());
        return proveedorAutenticacion;
    }
    /**
     * Este metodo regresara la autenticacion de sesion de usuario al
     * controlador
     *
     * @return
     */
    @Bean
    public AuthenticationTrustResolver getAuthenticationTrustResolver() {
        return new AuthenticationTrustResolverImpl();
    }

}
