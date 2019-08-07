
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Inicio de Sesión</title>
        <!-- Bootstrap CSS-->
        <link href="<c:url value='/assets/css/bootstrap.css' />" rel="stylesheet" />
        <!--  Fonts and icons-->
        <link href="http://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" rel="stylesheet">
    </head>

    <body style="text-align: center;background: rgba(179,220,237,1);">
        <div class="container" style="width: 700px; text-align: left;background: rgba(113,206,239,1);padding-top: 50px">
            <h3 style="text-align: center">Iniciar Sesión</h3>
            <div class="panel-body">                                      
                    <c:url var="urlLogin" value="/login"/>
                    <form action="${urlLogin}" method="POST">
                        <c:if test="${param.error != null}">
                            <div class="alert alert-danger alert-dismissable" style="text-align: center;">
                                <strong> ¡Nickname o Contraseña Incorrectos!</strong>
                            </div>
                        </c:if>
                        <div class="col-lg-12">
                          <!--  <div class="col-lg-6"> <img src="/assets/img/soma.jpeg" class="img-responsive" alt="Responsive image"> </div>-->
                            <div class="col-lg-6">
                                <div class="input-group input-sm">
                                    <input type="text" class="form-control" id="nick" name="nickname" placeholder="NickName" required>
                                    <label class="input-group-addon" for="nick"><i class="fa fa-user border-input"></i></label>   
                                </div>
                                <div class="input-group input-sm">
                                    <input type="password" class="form-control" id="contrasena" name="contrasena" placeholder="Contraseña">
                                    <label class="input-group-addon border-input" for="contrasena"><i class="fa fa-lock"></i></label> 
                                </div>
                            </div>
                            <input type="hidden" name="${_csrf.parameterName}"  value="${_csrf.token}" />
                            <br/>
                        </div>
                        <div class="col-lg-12">
                            <div class="col-lg-6">
                                <div class="form-actions" align="center">
                                    <input id="login" type="submit" 
                                           class="btn btn-block btn-info active" value="Continuar">

                                </div>
                            </div>
                        </div>
                    </form>
                </div><!--panelbody-->           
        </div><!--container-->
    </body>
</html>
