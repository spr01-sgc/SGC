$.noConflict();//trabaja diferentes versiones jquery
$(document).ready(function () {

});//ready

function btnUsuario() {
    //agregar usuario se deshabilita el boton actualizar
    $("#guardarU").css("display", "inline");
    $("#actualizarU").prop("disabled", true);
}
/*Funcion que muestra la informacion de la tabla usuario en el formulario*/
function mostrarUsuario() {
    $("#guardarU").css("display", "none");//oculta el boton guardar
    $("#actualizarU").prop("disabled", false);//habilita el boton actualizar
    //al dar clic lo que tiene en el renglo lo pase a la caja de texto
    $("#tableUsuario tbody").on('click', 'tr', function () {
        //id de usuario a actualizar
        var idusuariT = $('td', this).eq(0).text();
        $("#idusuario").val(idusuariT);
        //informacion del usuario
        var nickuserT = $('td', this).eq(2).text();
        $("#nick").val(nickuserT);
        var passuserT = $('td', this).eq(3).text();
        $("#pass").val(passuserT);
        var emailuserT = $('td', this).eq(4).text();
        $("#email").val(emailuserT);
        var roluserT = $('td', this).eq(5).text();
        $("#roluser").val(roluserT);
        var talleruserT = $('td', this).eq(7).text();
        $("#roltaller").val(talleruserT);
    });
}
/*Funcion que elimina un usuario*/
function eliminarUsuario1() {
    $("#tableUsuario tbody").on('click', 'tr', function () {
        var idusuariT = $('td', this).eq(0).text();
        $("#idusuario").val(idusuariT);
        var id = $("#idusuario").val();
        if (id === '') {
            error("NO se ha seleccionado una opci&oacuten");
            return false;
        }
        var datos = [id];
        $(document).ajaxSend(function (e, xhr, options) {
            var token = $("input[name='_csrf']").val();
            var cabecera = "X-CSRF-TOKEN";
            xhr.setRequestHeader(cabecera, token);
        });

        $.ajax({
            url: "usuario/eliminarUsuario",
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
                        //carga lo que se indica en id DIV
                        ok("Los datos se procesarón CORRECTAMENTE!");
                        setTimeout(function () {
                            location.href = "usuario";
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
//Permite conocer si esta disponible el nickname
function verificarUsuario() {
    var nick = [$("#nick").val().trim()];
    var mensajeModal = "Buscando nickname";
    blockUI(mensajeModal);
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "usuario/verificarUsuario",
        data: {datos: nick},
        dataType: 'html',
        type: 'POST',
        success: function (retorno) {
            if (retorno.length !== 0) {
                $("#nick").focus();
                error("El usuario con nickname " + nick + " ya existe");
                unBlockUI(200);
            } else {
                ok("El nickname " + nick + " esta disponible");
                unBlockUI(200);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Se ha producido un error en el servidor");
        }
    });
}
/*Funcion que permite Agregar un nuevo usuario*/
function agregarUsuario() {
    var nick = $("#nick").val().trim();
    var pass = $("#pass").val().trim();
    var email = $("#email").val().trim();
    var rol = $("#roluser").val();
    var taller = $("#roltaller").val();


    if (nick === '' || pass === '' || email === '' || rol === '' || taller === '') {
        error("Hay campos vacios");
        return false;
    }
    var rolname = $('#roluser').find(":selected").text();
    if (rol === '0' || roltaller === '0') {
        error("No ha seleccionado una opción");
        return false;
    }

    var datos = [nick, pass, email, rol, taller];
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "usuario/agregarUsuario",
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
                    alert("Los datos se procesarón CORRECTAMENTE!");
                    setTimeout(function () {
                        location.href = "usuario";
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
/*Funcion que permite actualizar un usuario*/
function actualizarUsuario() {
    var idusuario = $("#idusuario").val().trim();
    var nick = $("#nick").val().trim();
    var pass = $("#pass").val().trim();
    var email = $("#email").val().trim();
    var rol = $("#roluser").val();
    var roltaller = $("#roltaller").val();

    if (nick === '' || pass === '') {
        error("Hay campos vacios");
        return false;
    }

    var rolname = $('#roluser').find(":selected").text();

    if (rol === '0' || roltaller === '0') {
        error("No ha seleccionado una opción");
        return false;
    }

    var datos = [nick, pass, email, rol, idusuario, roltaller];
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "usuario/actualizarUsuario",
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
                    ok("Los datos se procesarón CORRECTAMENTE!");
                    setTimeout(function () {
                        location.href = "usuario";
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
function eliminarUsuario() {
    $("#tableUsuario tbody").on('click', 'tr', function () {
        var idT = $('td', this).eq(20).text();
        $("#iduser").val(idT);
        var id = $("#iduser").val();
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
            url: "usuario/eliminarUsuario",
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
                        alert("Los datos se procesarón CORRECTAMENTE!");
                        setTimeout(function () {
                            location.href = "usuario";
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

