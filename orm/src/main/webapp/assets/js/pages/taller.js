$.noConflict();//trabaja diferentes versiones jquery
$(document).ready(function () {

});//ready

function btnTaller() {
    //agregar usuario se deshabilita el boton actualizar
    $("#guardarT").css("display", "inline");
    $("#actualizarT").prop("disabled", true);
}
/*Funcion que muestra la informacion de la tabla usuario en el formulario*/
function mostrarTaller() {
    $("#guardarT").css("display", "none");//oculta el boton guardar
    $("#actualizarT").prop("disabled", false);//habilita el boton actualizar
    //al dar clic lo que tiene en el renglo lo pase a la caja de texto
    $("#tableTaller tbody").on('click', 'tr', function () {
        //id de usuario a actualizar
        var idTallerT = $('td', this).eq(1).text();
        $("#idtaller").val(idTallerT);
//informacion del usuario
        var nombreT = $('td', this).eq(2).text();
        $("#nombreT").val(nombreT);
        var direccionnT = $('td', this).eq(3).text();
        $("#direccionT").val(direccionnT);
        var numeroT = $('td', this).eq(4).text();
        $("#numeroEx").val(numeroT);
       
    });
}


/*Funcion que permite Agregar un nuevo usuario*/
function agregarTaller() {
    var nombreT = $("#nombreT").val().trim();
    var direccion = $("#direccionT").val().trim();
    var exterior = $("#numeroEx").val().trim();
 


    if (nombreT === '' || direccion === ''|| exterior === '') {
        error("Hay campos vacios");
        return false;
    }
    var datos = [nombreT, direccion, exterior];
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "taller/agregarTaller",
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
                        location.href = "taller";
                    }, 1000);
                    break;
                case 'errorAcceso':
                     alertify.error("No ha iniciado sesion");
                    break;
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Se ha producido un error en el servidor");
        }

    });
}
/*Funcion que permite actualizar un usuario*/
function actualizarTaller() {
    var idTaller = $("#idtaller").val().trim();
    var nombre = $("#nombreT").val().trim();
    var direccion = $("#direccionT").val().trim();
    var numero = $("#numeroEx").val().trim();
    

    if (nombre === '' || direccion === '' || numero === '') {
        error("Hay campos vacios");
        return false;
    }
    


    var datos = [idTaller, nombre, direccion, numero];
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "taller/actualizarTaller",
        data: {datos: datos},
        dataType: 'html',
        type: 'POST',
        async: true,
        success: function (retorno) {
            //alert(retorno);
            switch (retorno) {
                case 'errorDato':
                    alert("Los datos no se procesaron correctamente");
                    break;
                case 'error':
                    alert("Se ha producido un error en el servidor");
                    break;
                case 'exito':
                    alertify.success("Los datos se procesarón CORRECTAMENTE!");
                    setTimeout(function () {
                        location.href = "taller";
                    }, 1000);
                    break;
                case 'errorAcceso':
                    alert("No ha iniciado sesion");
                    break;
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Se ha producido un error en el servidor");
        }
    });
}
//Esta funcion no se ocupa solo se actualizan los usuarios
function eliminarTaller() {
    $("#tableTaller tbody").on('click', 'tr', function () {
        var idT = $('td', this).eq(1).text();
        $("#idtaller").val(idT);
        var id = $("#idtaller").val();
        if (id === '') {
            error("NO se ha seleccioando el usuario");
            return false;
        }
        var datos = [id];
        $(document).ajaxSend(function (e, xhr, options) {
            var token = $("input[name='_csrf']").val();
            var cabecera = "X-CSRF-TOKEN";
            xhr.setRequestHeader(cabecera, token);
        });
        $.ajax({
            url: "taller/eliminarTaller",
            data: {datos: datos},
            dataType: 'html',
            type: 'POST',
            success: function (retorno) {
                //alert(retorno);
                switch (retorno) {
                    case 'errorDato':
                        alert("Los datos no se procesaron correctamente");
                        break;
                    case 'error':
                        alert("Se ha producido un error en el servidor");
                        break;
                    case 'exito':
                        alertify.success("Los datos se procesarón CORRECTAMENTE!");
                        setTimeout(function () {
                            location.href = "taller";
                        }, 1000);
                        break;
                    case 'errorAcceso':
                        alert("No ha iniciado sesion");
                        break;
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Se ha producido un error en el servidor");
            }
        });
    });
}

