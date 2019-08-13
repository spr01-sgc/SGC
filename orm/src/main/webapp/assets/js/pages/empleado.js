//$.noConflict();//trabaja diferentes versiones jquery
$(document).ready(function () {

});//ready

function btnEmpleado() {
    //agregar empleado se deshabilita el boton actualizar
    $("#agregarE").css("display", "inline");
    $("#actualizarE").prop("disabled", true);
}
/*Funcion que muestra la informacion de la tabla empleado en el formulario*/
function mostrarEmpleado() {
    $("#guardarE").prop("disabled", true);
    $("#agregarE").css("display", "none");//oculta el boton guardar
    $("#actualizarE").prop("disabled", false);//habilita el boton actualizar
    //al dar clic lo que tiene en el renglo lo pase a la caja de texto
    $("#tableEmpleado tbody").on('click', 'tr', function () {
        //id del empleado a actualizar
        var idEmpleado = $('td', this).eq(0).text();
        $("#idEmpleado").val(idEmpleado);
        var serie = $('td', this).eq(2).text();
        $("#serie").val(serie);
        var nombre = $('td', this).eq(3).text();
        $("#nombre").val(nombre);
        var app = $('td', this).eq(4).text();
        $("#app").val(app);
        var apm = $('td', this).eq(5).text();
        $("#apm").val(apm);
        var puesto = $('td', this).eq(6).text();
        $("#puesto").val(puesto);
        var taller = $('td', this).eq(8).text();
        $("#IDtaller").val(taller);
        var estatus = $('td', this).eq(10).text();
        $("#estatus").val(estatus);
        var fechaEntrada = $('td', this).eq(11).text();
        $("#fechaEstatus").val(fechaEntrada);
        var fechaSalida = $('td', this).eq(12).text();
        $("#fechaEstatus").val(fechaSalida);
        var descripcion = $('td', this).eq(13).text();
        $("#descripcion").val(descripcion);
    });
}
/*Funcion que elimina un empleado*/
function eliminarEmpleado() {
    $("#tableEmpleado tbody").on('click', 'tr', function () {
        var idEmpleado = $('td', this).eq(0).text();
        $("#idEmpleado").val(idEmpleado);
        var id = $("#idEmpleado").val();
        if (id === '') {
            alertify.error("No se ha seleccionado una opci&oacuten");
            return false;
        }
        var datos = [id];
        $(document).ajaxSend(function (e, xhr, options) {
            var token = $("input[name='_csrf']").val();
            var cabecera = "X-CSRF-TOKEN";
            xhr.setRequestHeader(cabecera, token);
        });

        $.ajax({
            url: "empleado/eliminarEmpleado",
            data: {datos: datos},
            dataType: 'html',
            type: 'POST',
            success: function (retorno) {
                //alert(retorno);
                switch (retorno) {
                    case 'errorDato':
                        alertify.error("Los datos no se procesaron correctamente");
                        break;
                    case 'error':
                        alertify.error("Se ha producido un error en el servidor");
                        break;
                    case 'exito':
                        //carga lo que se indica en id DIV
                        alertify.success("Los datos se procesarón CORRECTAMENTE!");
                        setTimeout(function () {
                            location.href = "empleado";
                        }, 1000);
                        break;
                    case 'errorAcceso':
                        alertify.error("No ha iniciado sesion");
                        break;
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alertify.error("Se ha producido un error en el servidor");
            }
        });
    });
}
/*Funcion que permite Agregar un nuevo empleado*/
function agregarEmpleado() {
    var nombre = $("#nombre").val().trim();
    var app = $("#app").val().trim();
    var apm = $("#apm").val().trim();
    var estatus = $("#estatus").val();
    var puesto = $("#puesto").val();
    var serie = $("#serie").val();
    var taller = $("#IDtaller").val();
    var descripcion = $("#descripcion").val();

    if (nombre === '' || app === '' || apm === '' || serie === '' || descripcion === '') {
        alertify.error("Hay campos vacios");
        return false;
    }

    if (estatus === '0' || puesto === '0' || taller === '0') {
        alertify.error("No ha seleccionado una opción");
        return false;
    }

    if (verificarSerie2(serie)) {
        return true;
    } else {
        return false;
    }

    var datos = [nombre, app, apm, estatus, puesto, serie, taller, descripcion];
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "empleado/agregarEmpleado",
        data: {datos: datos},
        dataType: 'html',
        type: 'POST',
        success: function (retorno) {
            //alert(retorno);
            switch (retorno) {
                case 'errorDato':
                    alertify.error("Los datos no se procesaron correctamente");
                    break;
                case 'error':
                    alertify.error("Se ha producido un error en el servidor");
                    break;
                case 'exito':
                    alertify.success("Los datos se procesarón CORRECTAMENTE!");
                    setTimeout(function () {
                        location.href = "empleado";
                    }, 1000);
                    break;
                case 'errorAcceso':
                    alertify.error("No ha iniciado sesion");
                    break;
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alertify.error("Se ha producido un error en el servidor");
        }
    });

}
/*Funcion que permite actualizar un empelado*/
function actualizarEmpleado() {
    var nombre = $("#nombre").val().trim();
    var app = $("#app").val().trim();
    var apm = $("#apm").val().trim();
    var estatus = $("#estatus").val();
    var puesto = $("#puesto").val();
    var serie = $("#serie").val();
    var taller = $("#IDtaller").val();
    var descripcion = $("#descripcion").val();
    var idEmpleado = $("#idEmpleado").val();

    if (nombre === '' || app === '' || apm === '' || serie === '') {
        alertify.error("Hay campos vacios");
        return false;
    }

    if (estatus === '0' || puesto === '0' || taller === '0') {
        alertify.error("No ha seleccionado una opción");
        return false;
    }

    var datos = [nombre, app, apm, estatus, puesto, serie, taller, descripcion, idEmpleado];
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "empleado/actualizarEmpleado",
        data: {datos: datos},
        dataType: 'html',
        type: 'POST',
        async: true,
        success: function (retorno) {
            //alert(retorno);
            switch (retorno) {
                case 'errorDato':
                    alertify.error("Los datos no se procesaron correctamente");
                    break;
                case 'error':
                    alertify.error("Se ha producido un error en el servidor");
                    break;
                case 'exito':
                    alertify.success("Los datos se procesarón CORRECTAMENTE!");
                    setTimeout(function () {
                        location.href = "empleado";
                    }, 1000);
                    break;
                case 'errorAcceso':
                    alertify.error("No ha iniciado sesion");
                    break;
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alertify.error("Se ha producido un error en el servidor");
        }
    });
}
/*Funcion que permite si existe la serie del empleado*/
function verificarSerie() {
    var serie = [$("#serie").val().trim()];

    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "empleado/verificarSerie",
        data: {datos: serie},
        dataType: 'html',
        type: 'POST',
        success: function (retorno) {
            if (retorno.length !== 0) {
                $("#serie").focus();
                alertify.error("La serie " + serie + " ya existe");
                return false;
                //unBlockUI();
                //$.unblockUI();
            } else {
                alertify.success("La serie " + serie + " esta disponible");
                //unBlockUI();
                return true;
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alertify.error("Se ha producido un error en el servidor");
        }
    });
}

function verificarSerie2(serie) {
    var serie = [$("#serie").val().trim()];

    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "empleado/verificarSerie",
        data: {datos: serie},
        dataType: 'html',
        type: 'POST',
        success: function (retorno) {
            if (retorno.length !== 0) {
                $("#serie").focus();
                alertify.error("La serie " + serie + " ya existe");
                return false;
                //unBlockUI();
                //$.unblockUI();
            } else {
                alertify.success("La serie " + serie + " esta disponible");
                //unBlockUI();
                return true;
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alertify.error("Se ha producido un error en el servidor");
        }
    });
}


