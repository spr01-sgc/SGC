<%-- 
    Document   : taller
    Created on : 8/08/2019, 12:21:41 PM
    Author     : HASANIghghgh
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
            <div class="panel-heading">Listado de Empleados</div>
            <div id="contenidoPantalla" class="panel-body">        
                <div class="row">
                    <div class="form-group">
                        <div class="btn btn-group">
                            <button id="agregarE" class="btn btn-info" onclick="btnEmpleado();" data-toggle="modal" data-target="#myModal"> 
                                <span class="glyphicon glyphicon-plus"></span>Agregar Empleado</button>
                        </div>
                        <input type="hidden" name="${_csrf.parameterName}"
                               value="${_csrf.token}" />
                        <input type="text" class="form-control pull-right" style="width:20%" 
                               id="search" onkeyup="busquedaTbl('tableEmpleado');" placeholder="Busqueda">
                    </div>
                    <!-- Listado de empleados -->
                    <div  class="col-md-12">
                        <div class="table-responsive">
                            <table id="tableEmpleado" class="table table-striped">
                                <thead>
                                    <tr>                            
                                        <th>No</th>
                                        <th>Serie</th>
                                        <th>Nombre</th>
                                        <th>Apellido Paterno</th>
                                        <th>Apellido Materno</th>
                                        <th style="display:none">IDPuesto</th>
                                        <th>Puesto</th>
                                        <th style="display:none">IDTaller</th>
                                        <th>Taller</th>
                                        <th>Estatus</th>
                                        <th>Fecha Entrada</th>
                                        <th>Fecha Salida</th>
                                        <th>Descripción</th>
                                        <th>Actualizar</th>
                                        <th>Eliminar</th>
                                    </tr>
                                </thead>
                                <tbody id="bodytabla">
                                    <c:forEach items="${lEmpleado}" var="empleado" varStatus="count"> 
                     
                                        <tr> 
                                            <td id="idempleado" style="display:none">${empleado.idempleado}</td>
                                            <td id="noempleado">${count.count}</td>
                                            <td>${empleado.serie}</td>
                                            <td>${empleado.nombre}</td>
                                            <td>${empleado.app}</td>
                                            <td>${empleado.apm}</td>
                                            <td style="display:none">${empleado.idpuesto.idpuesto}</td>
                                            <td>${empleado.idpuesto.puesto}</td>
                                            <td style="display:none">${empleado.idtaller.idtaller}</td>
                                            <td>${empleado.idtaller.nombre}</td>
                                            <td>${empleado.estatus}</td>
                                            <td>${empleado.fechaentrada}</td>
                                            <td>${empleado.fechasalida}</td>
                                            <td>${empleado.descripcion}</td>
                                            <td><button id="mostrarE" onclick="mostrarEmpleado();" data-toggle="modal" data-target="#myModal" class="btn btn-warning">
                                                    <span class="glyphicon glyphicon-pencil"></span> </button></td>
                                            <!-- Eliminar -->
                                            <td><button id="eliminarE" onclick="eliminarEmpleado();"  class="btn btn-danger">
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
                    <h3>Fomulario Para Administrar Empleados Del Sistema</h3>
                </div>
                <div class="modal-body">
                    <!--Formilario para agregar empleados -->
                    <form class="form-horizontal"  modelAttribute="empleado" id="frmEmpleado">
                        <div class="form-group">
                            <label class="control-label col-sm-2" for="nombre">Nombre:<b style="color: red" title="Campo Requerido">*</b></label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="nombre" placeholder="Ingrese alias" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-sm-2" for="app">Apellido Paterno:<b style="color: red" title="Campo Requerido">*</b></label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="app" placeholder="Ingrese Apellido" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-sm-2" for="apm">Apellido Materno:<b style="color: red" title="Campo Requerido">*</b></label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="apm" placeholder="Ingrese Apellido" >
                            </div>
                        </div>
                        <div class="form-group">
                            <label  class="control-label col-sm-2">Estatus:<b style="color: red" title="Campo Requerido">*</b></label>
                            <div class="col-sm-4">
                                <select id="estatus" class="form-control">
                                    <option value="0">Seleccione...</option>
                                    <option value="Alta">Alta</option>
                                    <option value="Baja">Baja</option>
                                </select>                                            
                            </div>  
                            <label class="control-label col-sm-2" for="puesto">Puesto:<b style="color: red" title="Campo Requerido">*</b></label>
                            <div class="col-sm-4">
                                <select id="puesto" class="form-control">
                                    <option value="0">Seleccione...</option>
                                    <c:forEach items="${lPuesto}" var="puesto">
                                        <option value="${puesto.idpuesto}">${puesto.puesto}</option>
                                    </c:forEach>
                                </select>                                            
                            </div>  
                            <div class="col-sm-10">
                                <input type="text"  style="display:none" class="form-control" id="idEmpleado" >
                            </div>
                            <div class="col-sm-10">
                                <input type="text"  style="display:none" class="form-control" id="fechaEstatus" >
                            </div>
                             <div class="col-sm-10">
                                <input type="text"  style="display:none" class="form-control" id="fechasalida" >
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-sm-2" for="serie">Serie:<b style="color: red" title="Campo Requerido">*</b></label>
                            <div class="col-sm-4">
                                <input type="text" class="form-control" id="serie" onchange="verificarSerie();" placeholder="Ingrese Serie" >
                            </div>
                            <label  class="control-label col-sm-2">Taller:<b style="color: red" title="Campo Requerido">*</b></label>
                            <div class="col-sm-4">
                                <select id="IDtaller" class="form-control">
                                    <option value="0">Seleccione...</option>
                                    <c:forEach items="${lTaller}" var="taller">
                                        <option value="${taller.idtaller}">${taller.nombre}</option>
                                    </c:forEach>
                                </select>                                            
                            </div> 
                        </div>
                        <div class="form-group">
                            <label  class="control-label col-sm-2">Descripción:<b style="color: red" title="Campo Requerido">*</b></label>
                            <textarea rows="4" cols="101" id="descripcion" style="resize: none;"></textarea> 
                        </div>
                    </form> 
                </div><!--modal body-->
                <div class="modal-footer">
                    <div class="form-group">
                        <button id="guardarE" type="button" class="btn btn-success" onclick="agregarEmpleado();">Guardar</button>
                        <button id="actualizarE" onclick="actualizarEmpleado();" class="btn btn-primary" >Actualizar</button>
                        <a id="empleado" href="<c:url value='/empleado'/>"><button type="button" class="btn btn-default" onclick="limpiarForm('frmEmpleado');">Cerrar</button></a>

                    </div>
                </div><!--modal footer-->
            </div><!--modal6-container-->
        </div><!--modal dialog-->
    </div><!--modalfade-->
</div><!--container-->
</body>
</html>
