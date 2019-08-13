$.noConflict();//trabaja diferentes versiones jquery
$(document).ready(function () {

});//ready





function btnMolde2() {
    //agregar usuario se deshabilita el boton actualizar
    $("#guardarM").css("display", "inline");
    $("#actualizarM").prop("disabled", true);
}



/*Funcion que muestra la informacion de la tabla molde en el formulario*/
function mostrarMolde() {
    $("#guardarM").css("display", "none");//oculta el boton guardar
    $("#actualizarM").prop("disabled", false);//habilita el boton actualizar
    //al dar clic lo que tiene en el renglon lo pase a la caja de texto
    $("#tableMolde tbody").on('click', 'tr', function () {
        //informacion del Molde
        var idMoldeT = $('td', this).eq(1).text();
        $("#idMolde").val(idMoldeT);
        var serieMoldeT = $('td', this).eq(2).text();
        $("#serie").val(serieMoldeT);
        var modelMoldeT = $('td', this).eq(3).text();
        $("#modelo").val(modelMoldeT);
        var existMoldeT = $('td', this).eq(4).text();
        $("#existencia").val(existMoldeT);
        var descripcionMoldeT = $('td', this).eq(5).text();
        $("#descripcion").val(descripcionMoldeT);
    });
}
/*Funcion que elimina un Molde*/
function eliminarMolde() {
    $("#tableMolde tbody").on('click', 'tr', function () {
        var idmoldeT = $('td', this).eq(0).text();
        $("#idMolde").val(idmoldeT);
        var id = $("#idMolde").val();
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
            url: "molde/eliminarMolde",
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
                            location.href = "molde";
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
/*Funcion que permite Agregar un nuevo molde*/
function agregarMolde() {
        var serie = $("#serie").val().trim();
        var modelo = $("#modelo").val().trim();
        var existencia = $("#existencia").val().trim();
        var descripcion = $("#descripcion").val();

        if (serie === '' || modelo === '' || existencia === '' ) {
            alertify.error("Hay campos vacios");
            return false;
        }

        var datos = [serie, modelo, existencia, descripcion];
        $(document).ajaxSend(function (e, xhr, options) {
            var token = $("input[name='_csrf']").val();
            var cabecera = "X-CSRF-TOKEN";
            xhr.setRequestHeader(cabecera, token);
        });
        $.ajax({
            url: "molde/agregarMolde",
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
                            location.href = "molde";
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
/*Funcion que permite actualizar un molde*/
function actualizarMolde() {
        var idMolde = $("#idMolde").val().trim();
        var serie = $("#serie").val().trim();
        var modelo = $("#modelo").val().trim();
        var existencia = $("#existencia").val().trim();
        var descripcion = $("#descripcion").val();

    if (serie === '' || modelo === '' || existencia === '') {
        alertify.error("Hay campos vacios");
        return false;
    }

    var datos = [idMolde, serie, modelo, existencia, descripcion];
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "molde/actualizarMolde",
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
                        location.href = "molde";
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

/**
 * Funcion que permite verificar si existe la serie y 
 * manda llamar agregarMolde() para agregar a un 
 * molde si no existe la serie
 * */
function agregarMolde2() {
    var datos = [$("#serie").val().trim()];
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "molde/verificarSerie",
        data: {datos: datos},
        dataType: 'html',
        type: 'POST',
        success: function (retorno) {
            if (retorno.length !== 0) {
                $("#serie").focus();
                alertify.error("La serie " + datos + " ya existe");
                return false;
                //unBlockUI();
                //$.unblockUI();
            } else {
                alertify.success("La serie " + datos + " esta disponible");
                //unBlockUI();
                agregarMolde();
                return true;
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alertify.error("Se ha producido un error en el servidor");
        }
    });
}




