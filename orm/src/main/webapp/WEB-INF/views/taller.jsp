<%-- 
    Document   : taller
    Created on : 8/08/2019, 12:21:41 PM
    Author     : HASANI
--%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>


<%@include file="index.jsp" %>
<br />
<br />
<br />
<div class="container">   
    <div class="panel-group">
        <div class="panel panel-primary">
            <div class="panel-heading">Listado de Usuarios</div>
            <div id="contenidoPantalla" class="panel-body">        
                <div class="row">
                    <div class="form-group">
                        <div class="btn btn-group">
                            <button id="agregarU" class="btn btn-info" onclick="btnUsuario();" data-toggle="modal" data-target="#myModal"> 
                                <span class="glyphicon glyphicon-plus"></span>Agregar Usuario</button>
                        </div>
                        <input type="hidden" name="${_csrf.parameterName}"
                               value="${_csrf.token}" />
                        <input type="text" class="form-control pull-right" style="width:20%" 
                               id="search" onkeyup="busquedaTbl('tableUsuario');" placeholder="Busqueda">
                    </div>
                    <!-- Listado de usuarios -->
                    <div  class="col-md-12">
                        <div class="table-responsive">
                            <table id="tableUsuario" class="table table-striped">
                                <thead>
                                    <tr>                            
                                        <th>No</th>
                                        <th>Nickname</th>
                                        <th style="display:none">Password</th>
                                        <th>Correo Electronico</th>
                                        <th style="display:none">IDrol</th>
                                        <th>Rol</th>
                                        <th style="display:none">IDEstatus</th>
                                        <th>Actualizar</th>
                                        <th>Eliminar</th>
                                    </tr>
                                </thead>
                                <tbody id="bodytabla">
                                    <c:forEach items="${ltaller}" var="usuario" varStatus="count"> 
                                        <tr>                               
                                         
                                            <td id="nouser">${count.count}</td>
                                        
                                            <td><button id="mostrarU" onclick="mostrarUsuario();" data-toggle="modal" data-target="#myModal" class="btn btn-warning">
                                                    <span class="glyphicon glyphicon-pencil"></span> </button></td>
                                            <!-- Eliminar -->
                                            <td><button id="mostrarU" onclick="eliminarUsuario1();"  class="btn btn-danger">
                                                    <span class="glyphicon glyphicon-remove"></span> </button></td>
                                        </tr>
                                    </c:forEach>
                                </tbody>
                            </table>
                        </div>           
                    </div>
                </div><!-- row-->
            </div><!--class body -->
        </div><!-- panel-primary-->
    </div>  <!-- panel-group-->  
</div><!--class container -->


<div class="container">
    <!-- Modal -->
    <div class="modal fade" id="myModal" role="dialog" data-backdrop="static" 
         data-keyboard="false">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Fomulario para administrar usuarios del sistema</h3>
                </div>
                <div class="modal-body">
                    <!--Formilario para agregar usuario -->
                    <form class="form-horizontal"  modelAttribute="user" id="frmUsuario">
                        <div class="form-group">
                            <label class="control-label col-sm-2" for="nickname">Nickname:<b style="color: red" title="Campo Requerido">*</b></label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="nick" placeholder="Ingrese alias" onchange="verificarUsuario();"required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-sm-2" for="pwd">Password:<b style="color: red" title="Campo Requerido">*</b></label>
                            <div class="col-sm-10">
                                <input type="password" class="form-control" id="pass" placeholder="Ingrese password" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-sm-2" for="email">Correo:<b style="color: red" title="Campo Requerido">*</b></label>
                            <div class="col-sm-10">
                                <input type="email" class="form-control" id="email" placeholder="nombredeusuario@nombrededominio.extensión" >
                            </div>
                        </div>
                        <div class="form-group">
                            <label  class="control-label col-sm-2">Roles<b style="color: red" title="Campo Requerido">*</b></label>
                            <div class="col-sm-4">
                                <!-- consulta catalogo -->
                                <select id="roluser" class="form-control">
                                    <option value="0">Seleccione rol de usuario</option>
                                    <c:forEach items="${lRol}" var="rol">
                                        <option value="${rol.rolid}">${rol.nombre} </option>
                                    </c:forEach>
                                </select>                                            
                            </div>                                       
                            <div class="col-sm-10">
                                <input type="text"  style="display:none" class="form-control" id="idusuario" >
                            </div>
                        </div>
                    </form> 
                </div><!--modal body-->
                <div class="modal-footer">
                    <div class="form-group">
                        <button id="guardarU" type="button" class="btn btn-success" onclick="agregarUsuario();">Guardar</button>
                        <button id="actualizarU" onclick="actualizarUsuario();" class="btn btn-primary" >Actualizar</button>
                        <a id="user" href="<c:url value='/usuario'/>"><button type="button" class="btn btn-default" onclick="limpiarForm('frmUsuario');">Cerrar</button></a>

                    </div>
                </div><!--modal footer-->
            </div><!--modal6-container-->
        </div><!--modal dialog-->
    </div><!--modalfade-->
</div><!--container-->
</body>
</html>
