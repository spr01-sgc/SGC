<%-- 
    Document   : molde
    Created on : 12/08/2019, 10:09:53 AM
    Author     : DANIEL LOZA
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
            <div class="panel-heading">Listado de Moldes</div>
            <div id="contenidoPantalla" class="panel-body">        
                <div class="row">
                    <div class="form-group">
                        <div class="btn btn-group">
                            <button id="agregarM" class="btn btn-info" onclick="btnMolde2();" data-toggle="modal" data-target="#myModal"> 
                                <span class="glyphicon glyphicon-plus"></span>Agregar Molde</button>
                        </div>
                        <input type="hidden" name="${_csrf.parameterName}"
                               value="${_csrf.token}" />
                        <input type="text" class="form-control pull-right" style="width:20%" 
                               id="search" onkeyup="busquedaTbl('tableMolde');" placeholder="Busqueda">
                    </div>
                    <!-- Listado de moldes -->
                    <div  class="col-md-12">
                        <div class="table-responsive">
                            <table id="tableMolde" class="table table-striped">
                                <thead>
                                    <tr>                            
                                        <th>No</th>
                                        <th>Serie</th>
                                        <th>Modelo</th>
                                        <th>En Existencia</th>
                                        <th>Descripcion</th>
                                        <th>Actualizar</th>
                                        <th>Eliminar</th>
                                    </tr>
                                </thead>
                                <tbody id="bodytabla">
                                    <c:forEach items="${lmolde}" var="molde" varStatus="count"> 
                                        <tr>                               
                                            <td id="nomolde">${count.count}</td>
                                            <td id="idmolde" style="display: none">${molde.idmolde}</td>
                                            <td >${molde.serie}</td>
                                            <td >${molde.modelo}</td>
                                            <td >${molde.enexistencia}</td>
                                            <td >${molde.descripcion}</td>
                                            <td><button id="mostrarM" onclick="mostrarMolde();" data-toggle="modal" data-target="#myModal" class="btn btn-warning">
                                                    <span class="glyphicon glyphicon-pencil"></span> </button></td>
                                            <!-- Eliminar -->
                                            <td><button id="mostrarM" onclick="eliminarMolde();"  class="btn btn-danger">
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
                    <h3>Fomulario para administrar Moldes</h3>
                </div>
                <div class="modal-body">
                    <!--Formilario para agregar Molde -->
                    <form class="form-horizontal"  modelAttribute="molde" id="frmMolde">
                        <div class="form-group">
                            <label class="control-label col-sm-2" for="serie">Serie<b style="color: red" title="Campo Requerido">*</b></label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="serie" placeholder="Ingrese la Serie" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-sm-2" for="modelo">Modelo<b style="color: red" title="Campo Requerido">*</b></label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="modelo" placeholder="Ingrese el modelo" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-sm-2" for="existencia">Existencia<b style="color: red" title="Campo Requerido">*</b></label>
                            <div class="col-sm-10">
                                <input type="number" class="form-control" id="existencia" placeholder="10" >
                            </div>
                        </div>
                        <div class="form-group">
                            <label  class="control-label col-sm-2">Descripción:</label>
                            <textarea rows="4" cols="101" id="descripcion" style="resize: none;"></textarea> 
                        </div>
                        <div class="col-sm-10">
                            <input type="text"  style="display:none" class="form-control" id="idMolde" >
                        </div>
                    </form> 
                </div><!--modal body-->
                <div class="modal-footer">
                    <div class="form-group">
                        <button id="guardarM" type="button" class="btn btn-success" onclick="agregarMolde();">Guardar</button>
                        <button id="actualizarM" onclick="actualizarMolde();" class="btn btn-primary" >Actualizar</button>
                        <a id="molde" href="<c:url value='/molde'/>"><button type="button" class="btn btn-default" onclick="limpiarForm('frmMolde');">Cerrar</button></a>
                    </div>
                </div><!--modal footer-->
            </div><!--modal6-container-->
        </div><!--modal dialog-->
    </div><!--modalfade-->
</div><!--container-->
</body>
</html>

