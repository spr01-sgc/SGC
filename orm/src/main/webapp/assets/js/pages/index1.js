$.noConflict();//trabaja diferentes versiones jquery
$(document).ready(function () {

});//ready

function eliminarMateria() {
    $("#tableMateria tbody").on('click', 'tr', function () {
        var idMateria = $('td', this).eq(0).text();

        if (idMateria === '') {
            error("NO se ha seleccionado una opci&oacuten");
            return false;
        }
        var datos = [idMateria];
        $(document).ajaxSend(function (e, xhr, options) {
            var token = $("input[name='_csrf']").val();
            var cabecera = "X-CSRF-TOKEN";
            xhr.setRequestHeader(cabecera, token);
        });

        $.ajax({
            url: "materia/eliminarMateria",
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


/*Funcion que permite Agregar un nuevo usuario*/
function agregarMateria() {
    var materia = $("#mate").val();
    var cuatrimestre = $("#cuatrimestre").val().trim();
    var carrera = $("#carrera").val().trim();

    if (carrera === '0') {
        error("No ha seleccionado una opción");
        return false;
    }
    
    var datos = [materia, cuatrimestre, carrera];
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "materia/agregarMateria",
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

function btnUsuario() {
    //agregar usuario se deshabilita el boton actualizar
    $("#guardarU").css("display", "inline");
    $("#actualizarU").prop("disabled", true);
}

function btnMateria() {
    //agregar usuario se deshabilita el boton actualizar
    $("#guardarM").css("display", "inline");
    $("#actualizarM").prop("disabled", true);
}

function btnCarrera() {
    //agregar usuario se deshabilita el boton actualizar
    $("#guardarC").css("display", "inline");
    $("#actualizarC").prop("disabled", true);
}

function verTablaF() {
    //ocultar o mostrar pantalla familiar
    $("#familiar").css("display", "block");
    $("#mostrarFamiliar").css("display", "none");
    $("#pep1").css("display", "none");
}
function verTablaP() {
    //ver PEP   
    $("#pep1").css("display", "inline");
    $("#familiar").css("display", "none");
    $("#mostrarFamiliar").css("display", "block");
}
function limpiarCajas() {
    $("#nombreD").val("");
    $("#nombreG").val("");
    $("#claveD").val("");
    $("#claveG").val("");
}
function busquedaTbl(tabla) {
    var tableReg = document.getElementById(tabla);
    var searchText = document.getElementById('search').value.toLowerCase();
    console.log(searchText);
    for (var i = 1; i < tableReg.rows.length; i++) {
        var cellsOfRow = tableReg.rows[i].getElementsByTagName('td');
        var found = false;
        for (var j = 0; j < cellsOfRow.length && !found; j++) {
            var compareWith = cellsOfRow[j].innerHTML.toLowerCase();
            if (searchText.length === 0 || (compareWith.indexOf(searchText) > -1)) {
                found = true;
            }
        }
        if (found) {
            tableReg.rows[i].style.display = '';
        } else {
            tableReg.rows[i].style.display = 'none';
        }
    }
}
function busquedaTblF(tabla, id) {
    var tableReg = document.getElementById(tabla);
    var searchText = document.getElementById(id).value.toLowerCase();
    for (var i = 1; i < tableReg.rows.length; i++) {
        var cellsOfRow = tableReg.rows[i].getElementsByTagName('td');
        var found = false;
        for (var j = 0; j < cellsOfRow.length && !found; j++) {
            var compareWith = cellsOfRow[j].innerHTML.toLowerCase();
            if (searchText.length === 0 || (compareWith.indexOf(searchText) > -1)) {
                found = true;
            }
        }
        if (found) {
            tableReg.rows[i].style.display = '';
        } else {
            tableReg.rows[i].style.display = 'none';
        }
    }
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
    });
}


/*Funcion que muestra la informacion de la tabla usuario en el formulario*/
function mostrarMateria1() {
    $("#guardarM").css("display", "none");//oculta el boton guardar
    $("#actualizarM").prop("disabled", false);//habilita el boton actualizar
    //al dar clic lo que tiene en el renglo lo pase a la caja de texto
    $("#tableMateria tbody").on('click', 'tr', function () {
        //id de usuario a actualizar
        var idmateriaT = $('td', this).eq(0).text();
        $("#idMateria").val(idmateriaT);
//informacion del usuario
        var mate = $('td', this).eq(2).text();
        $("#mate").val(mate);
        var cuatrimestre = $('td', this).eq(3).text();
        $("#cuatrimestre").val(cuatrimestre);
        var carrera = $('td', this).eq(4).text();
        $("#carrera").val(carrera);
        //var carrera2 = 1;
        //$("#carrera option[value=" + carrera2 + "]").attr("selected", true);
        //$("#carrera").val(carrera);
        console.log(carrera);
    });
}

/*Funcion que muestra la informacion de la tabla usuario en el formulario*/
function mostrarCarrera() {
    $("#guardarC").css("display", "none");//oculta el boton guardar
    $("#actualizarC").prop("disabled", false);//habilita el boton actualizar
    //al dar clic lo que tiene en el renglo lo pase a la caja de texto
    $("#tableCarrera tbody").on('click', 'tr', function () {
        //id de usuario a actualizar
        var idcarreraT = $('td', this).eq(0).text();
        $("#idCarrera").val(idCarreraT);
//informacion del usuario
        var carrera = $('td', this).eq(1).text();
        $("#carrera").val(carrera);
    });
}

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

//Limpia las cajas de texto del formulario
function limpiarForm(frm) {
    document.getElementById(frm).reset();
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
function agregarCarrera1() {
    var carrera = $("#carrera").val().trim();
  
    var datos = [carrera];
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "carrera/agregarCarrera",
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



/*Funcion que permite Agregar un nuevo usuario*/
function agregarUsuario() {
    var nick = $("#nick").val().trim();
    var pass = $("#pass").val().trim();
    var email = $("#email").val().trim();
    var rol = $("#roluser").val();


    if (nick === '' || pass === '') {
        error("Hay campos vacios");
        return false;
    }
    var rolname = $('#roluser').find(":selected").text();
    if (rolname === "ADMIN") {
        if (rol === '0') {
            error("No ha seleccionado una opción");
            return false;
        }
    } else {
        if (rol === '0') {
            error("No ha seleccionado una opción");
            return false;
        }
    }

    var datos = [nick, pass, email, rol];
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

function actualizarUsuario() {
    var idusuario = $("#idusuario").val().trim();
    var nick = $("#nick").val().trim();
    var pass = $("#pass").val().trim();
    var email = $("#email").val().trim();
    var rol = $("#roluser").val();


    if (nick === '' || pass === '') {
        error("Hay campos vacios");
        return false;
    }
    var rolname = $('#roluser').find(":selected").text();
    if (rolname === "ADMIN") {
        if (rol === '0') {
            error("No ha seleccionado una opción");
            return false;
        }
    } else {
        if (rol === '0') {
            error("No ha seleccionado una opción");
            return false;
        }
    }

    var datos = [nick, pass, email, rol, idusuario];
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


function actualizarMateria() {
    console.log(idMateria);
    var idMateria = $("#idMateria").val().trim();
    var materia = $("#mate").val();
    var cuatrimestre = $("#cuatrimestre").val().trim();
    var carrera = $("#carrera").val().trim();

    var datos = [materia, cuatrimestre, carrera, idMateria];
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "materia/actualizarMateria",
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


function isAdmin() {
    var rol = $('#roluser').find(":selected").text();
    if (rol === "ADMIN") {
        $("#sucursalUs").css("display", "none");
    } else {
        $("#sucursalUs").css("display", "block");
    }
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


function datoAtras() {
    i = i - 1;
    console.log(arreglo);
    if (i === 0) {
        ok("Ya no hay m&aacute;s datos para recorrer.");
    } else {
        for (var e in arreglo) {
            var ee = parseInt(e);
            if (i - 1 === (ee)) {
                $("#apPat").val(arreglo[e].Paterno);
                $("#apMat").val(arreglo[e].Materno);
                $("#nomPba").val(arreglo[e].Nombre);
                $("#tituloPba").val("DOMICILIO");
                $("#descripPba").val(arreglo[e].Domicilio);
                break;
            }
        }
        document.getElementById('inicioArreglo').innerHTML = i;
        document.getElementById('finArreglo').innerHTML = arreglo.length;
    }
}

function agregarPep() {
    var fechaVigenteT = $("#fechPep").val();
    var cargoT = $("#cargoPep").val();
    var ciudadT = $("#ciudadPep").val();
    var nomT = $("#nomPep").val();
    var apPepT = $("#apPatPep").val();
    var amPepT = $("#apMatPep").val();
    var curpPepT = $("#curpPep").val();
    var sexPepT = $("#sexoPep").val();
    var estatPepT = $("#estatusPep").val();
    var d = new Date().toJSON();
    var hoy = d.substring(0, 10);
    if (hoy === fechaVigenteT) {
        error("La fecha debe ser 1 año mayor a la fecha de cargo");
        $("#fechPep").css('color', '#f00');
        return false;
    }
    if (fechaVigenteT === '') {
        error("No se ha seleccionada la fecha");
        return false;
    }
    if (cargoT === '0') {
        error("No se ha seleccionado el cargo");
        return false;
    }
    if (ciudadT === '0') {
        error("No se ha seleccionado la ciudad");
        return false;
    }
    if (sexPepT === '0') {
        error("No se ha seleccionado el sexo");
        return false;
    }
    if (estatPepT === '0') {
        error("No se ha seleccionado el estatus");
        return false;
    }
    if (nomT === '') {
        error("El nombre esta vac&iacuteo");
        return false;
    }
    if (apPepT === '' || amPepT === '') {
        error("El apellido esta vac&iacuteo");
        return false;
    }
    if (validarNombre(nomT) === false) {
        $("#nomPep").focus();
        return false;
    }
    if (validarNombre(apPepT) === false) {
        $("#apPatPep").focus();
        return false;
    }
    if (validarNombre(amPepT) === false) {
        $("#apMatPep").focus();
        return false;
    }
    if (curpPepT !== "") {
        if (validarCURP(curpPepT) === false) {
            $("#curpPep").focus();
            return false;
        }
    }
    var datos = [fechaVigenteT, cargoT, ciudadT, nomT, apPepT, amPepT, curpPepT, sexPepT, estatPepT];
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "pep/agregarPep",
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
                    //carga lo que se indica en id DIV$("#pantalla").load("pep");
                    ok("Los datos se procesarón CORRECTAMENTE!");
                    setTimeout(function () {
                        location.href = "pep";
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
function actualizarPep() {
    var IDpep = $("#idpep").val();
    var fechaVigenteT = $("#fechPep").val();
    var cargoT = $("#cargoPep").val();
    var ciudadT = $("#ciudadPep").val();
    var nomT = $("#nomPep").val();
    var apPepT = $("#apPatPep").val();
    var amPepT = $("#apMatPep").val();
    var curpPepT = $("#curpPep").val();
    var sexPepT = $("#sexoPep").val();
    var estatPepT = $("#estatusPep").val();
    var d = new Date().toJSON();
    var hoy = d.substring(0, 10);
    if (hoy === fechaVigenteT) {
        error("La fecha debe ser 1 año mayor a la fecha de cargo");
        $("#fechPep").css('color', '#f00');
        return false;
    }
    if (fechaVigenteT === '') {
        error("No se ha seleccionada la fecha");
        return false;
    }
    if (cargoT === '0') {
        error("No se ha seleccionado el cargo");
        return false;
    }
    if (ciudadT === '0') {
        error("No se ha seleccionado la ciudad");
        return false;
    }
    if (sexPepT === '0') {
        error("No se ha seleccionado el sexo");
        return false;
    }
    if (estatPepT === '0') {
        error("No se ha seleccionado el estatus");
        return false;
    }
    if (nomT === '') {
        error("El nombre esta vac&iacuteo");
        return false;
    }
    if (apPepT === '' || amPepT === '') {
        error("El apellido esta vac&iacuteo");
        return false;
    }
    if (validarNombre(nomT) === false) {
        $("#nomPep").focus();
        return false;
    }
    if (validarNombre(apPepT) === false) {
        $("#apPatPep").focus();
        return false;
    }
    if (validarNombre(amPepT) === false) {
        $("#apMatPep").focus();
        return false;
    }
    if (curpPepT !== "") {
        if (validarCURP(curpPepT) === false) {
            $("#curpPep").focus();
            return false;
        }
    }
    var datos = [fechaVigenteT, cargoT, ciudadT, nomT, apPepT, amPepT, curpPepT, sexPepT, estatPepT, IDpep];
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "pep/actualizarPep",
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
                    //carga lo que se indica en id DIV $("#pantalla").load("pep");
                    ok("Los datos se procesarón CORRECTAMENTE!");
                    setTimeout(function () {
                        location.href = "pep";
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
function agregarFamiliar() {
    var IdPep = $("#idPep").val();
    var nomFam = $("#nomFam").val();
    var apPatFam = $("#apPatFam").val();
    var apMatFam = $("#apMatFam").val();
    var curpFam = $("#curpFam").val();
    var sexoFam = $("#sexoFam").val();
    var parentFam = $("#parentescoFam").val();
    if (IdPep === '0') {
        error("No se ha seleccionado la Persona Politicamente Expuesta");
        return false;
    }
    if (nomFam === '') {
        error("El nombre esta vac&iacute;o");
        return false;
    }
    if (apPatFam === '' || apMatFam === '') {
        error("El apellido esta vac&iacute;o");
        return false;
    }
    if (validarNombre(nomFam) === false) {
        return false;
    }
    if (validarNombre(apPatFam) === false) {
        return false;
    }
    if (validarNombre(apMatFam) === false) {
        return false;
    }
    if (curpFam !== "") {
        if (validarCURP(curpFam) === false) {
            $("#curpFam").focus();
            return false;
        }
    }
    if (sexoFam === '0') {
        error("No se ha seleccionado el sexo");
        return false;
    }
    if (parentFam === '0') {
        error("No se ha seleccionado el parentesco");
        return false;
    }
    var datos = [IdPep, nomFam, apPatFam, apMatFam, curpFam, sexoFam, parentFam];
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "pep/agregarFamiliar",
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
                        location.href = "pep";
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
function actualizarFamiliar() {
    var IdFamiliar = $("#idfam").val();
    var IdPep = $("#idPep").val();
    var nomFam = $("#nomFam").val();
    var apPatFam = $("#apPatFam").val();
    var apMatFam = $("#apMatFam").val();
    var curpFam = $("#curpFam").val();
    var sexoFam = $("#sexoFam").val();
    var parentFam = $("#parentescoFam").val();
    if (IdPep === '0') {
        error("No se ha seleccionado la Persona Politicamente Expuesta");
        return false;
    }
    if (nomFam === '') {
        error("El nombre esta vacío");
        return false;
    }
    if (apPatFam === '' || apMatFam === '') {
        error("El apellido esta vacío");
        return false;
    }
    if (validarNombre(nomFam) === false) {
        return false;
    }
    if (validarNombre(apPatFam) === false) {
        return false;
    }
    if (validarNombre(apMatFam) === false) {
        return false;
    }
    if (curpFam !== "") {
        if (validarCURP(curpFam) === false) {
            $("#curpFam").focus();
            return false;
        }
    }
    if (sexoFam === '0') {
        error("No se ha seleccionado el sexo");
        return false;
    }
    if (parentFam === '0') {
        error("No se ha seleccionado el parentesco");
        return false;
    }
    var datos = [IdPep, nomFam, apPatFam, apMatFam, curpFam, sexoFam, parentFam, IdFamiliar];
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "pep/actualizarFamiliar",
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
                        location.href = "pep";
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
function eliminarFamiliar() {
    $("#tableFamilia tbody").on('click', 'tr', function () {
        var idT = $('td', this).eq(0).text();
        $("#idfam").val(idT);
        var id = $("#idfam").val();
        if (id === '') {
            error("El user no puede ir vació");
            return;
        }
        var datos = [id];
        $(document).ajaxSend(function (e, xhr, options) {
            var token = $("input[name='_csrf']").val();
            var cabecera = "X-CSRF-TOKEN";
            xhr.setRequestHeader(cabecera, token);
        });
        $.ajax({
            url: "pep/eliminarFamiliar",
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
                            location.href = "pep";
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
function generarReportePLD() {
    $("#tramiteClientesSeleccionados option").each(function () {
        var datos = [];
        datos[$(this).attr('value')] = $(this).text();
        document.getElementById('nombrePLD').innerHTML = datos;
        alert('opcion: ' + datos);
    });
}
/**
 * Operaciones relevantes
 * @returns {cantidad de operaciones relevantes}
 * las notificaciones se haran cada vez q haya un pago
 * se manda llamar la funcion
 */
//var intevalo = setInterval('notificacionRelevant()', 40000);
function notificacionRelevant(url) {
    var ur;
    if (url === "Transmisor/") {
        ur = url + "operelevante/notOpRel";
    } else {
        ur = "operelevante/notOpRel";
    }
    $.ajax({
        url: ur,
        data: {},
        dataType: 'html',
        type: 'GET',
        success: function (retorno) {
            if (retorno !== "[]") {
                var c = 0;
                var clientes = JSON.parse(retorno);
                var total = document.getElementById("report").innerHTML;
                var num = parseInt(total);
                for (var i in clientes) {
                    if ($("#relevante")[0]) {
                        document.getElementById('relevante').innerHTML = parseInt(clientes.length);
                    }
                    $("#report").attr("title", "Tienes notificaciones");
                    c++;
                }//for
                document.getElementById('report').innerHTML = num + parseInt(clientes.length);
            }//final --if
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Se ha producido un error en el servidor");
        }
    });
}
//Notifica la  cantidad de operaciones insuales
function notificacionInusual(url) {
    var ur;
    if (url === "Transmisor/") {
        ur = url + "opeinusual/notInusual";
    } else {
        ur = "opeinusual/notInusual";
    }
    $.ajax({
        url: ur, //"opeinusual/notInusual",
        data: {},
        dataType: 'html',
        type: 'GET',
        success: function (retorno) {
            //console.log(retorno);
            if (retorno !== "[]") {
                var c = 0;
                var inusual = JSON.parse(retorno);
                var total = document.getElementById("report").innerHTML;
                var num = parseInt(total);
                for (var i in inusual) {
                    if ($("#inusual")[0]) {
                        document.getElementById('inusual').innerHTML = i.length + 1;
                    }
                    $("#report").attr("title", "Tienes notificaciones");
                    c++;
                }//for

                document.getElementById('report').innerHTML = num + c;
            }//final --if
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Se ha producido un error en el servidor");
        }
    });
}
//Notificaciones preocupantes
function notificacionPreocupante(url) {
    var ur;
    if (url === "Transmisor/") {
        ur = url + "opepreocupante/notPreocupante";
    } else {
        ur = "opepreocupante/notPreocupante";
    }
    $.ajax({
        url: ur,
        data: {},
        dataType: 'html',
        type: 'GET',
        success: function (retorno) {
            if (retorno !== "[]") {
                var c = 0;
                var preocupante = JSON.parse(retorno);
                var total = document.getElementById("report").innerHTML;
                var num = parseInt(total);
                for (var i in preocupante) {
                    if ($("#preocupante")[0]) {
                        document.getElementById('preocupante').innerHTML = parseInt(preocupante.length);
                    }
                    $("#report").attr("title", "Tienes notificaciones");
                    c++;
                }//for

                document.getElementById('report').innerHTML = num + parseInt(preocupante.length);
            }//final --if
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Se ha producido un error en el servidor");
        }
    });
}
//Operaciones preocupante por sucursal
function operacionPreocupante() {
    $("#tbOper").empty();
    var datos = [$("#sucursalId").val()];
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "opepreocupante/operacionSucursal",
        data: {datos: datos},
        dataType: 'html',
        type: 'POST',
        success: function (retorno) {
            var preocupante = JSON.parse(retorno);
            // console.log(preocupante);
            var cont = 1;
            for (var i in preocupante) {
                $('#tablePreocupantes tbody').append('<tr></tr>');
                var row = $('#tablePreocupantes tbody tr').last();
                row.append('<td style="display:none">' + preocupante[i].oppreocupanteid + '</td>');//claveOPeracion
                row.append('<td>' + cont + '</td>');//no.
                row.append('<td style="display:none">' + preocupante[i].usuarioidinfractor.usuarioid + '</td>');//claveClien             
                row.append('<td onclick="buscarUsuarioPre();" title="Mostrar más información" \n\
style="cursor: pointer" data-toggle="modal" data-target="#myModalP">'
                        + preocupante[i].usuarioidinfractor.personaid.nombre + '</td>');//noombre
                row.append('<td>' + preocupante[i].fecha + '</td>');//fecha
                row.append('<td>' + preocupante[i].descripcion + '</td>');//descripcion
                var denunciante = preocupante[i].usuarioiddenunciante;
                if (denunciante === null) {
                    denunciante = "Anónimo";
                    row.append('<td>' + denunciante + '</td>');//usuaroDenucniante
                } else {
                    row.append('<td>' + denunciante.personaid.nombre + '</td>');//usuaroDenucniante 
                }
                row.append('<td>' + preocupante[i].usuarioidinfractor.sucursalid.nombresucursal + '</td>');//sucursal
                row.append('<td>' + '<input type="checkbox" id="denuncia"/>' + '</td>');
                cont++;
            }//for
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Se ha producido un error en el servidor");
        }
    });
}
//muestra los clientes que cuentan con operaciones relevanes
function movimientosRelevantes() {
    document.getElementById('tbRele').innerHTML = '';
    var dolares = document.getElementById("dolaresPld").value;
    var sucursal = document.getElementById("sucursalId").value;
    var fechIn = document.getElementById("fechIni").value;
    var fechTe = document.getElementById("fechTer").value;
    var valDolar = document.getElementById("valorDolarPld").value;
    if (sucursal === "0") {
        error("NO se ha selecciondo la sucursal");
        return false;
    }
    if (fechIn === "" || fechTe === "") {
        error("NO se ha establecido un rango de fechas");
        return false;
    }
    var datos = [fechIn, fechTe, dolares, valDolar, sucursal];
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "operelevante/tblRelevant",
        data: {datos: datos},
        dataType: 'html',
        type: 'POST',
        success: function (retorno) {
            // alert(retorno);  
            if (retorno === "[]") {
                error("No hay operaciones en esta sucursal");
                //return false;
            } else {
                $('#tblNotifR').css("display", "none");
                var pagoSQL = JSON.parse(retorno);
                ok("Los datos se procesarón correctamente");
                var cont = 1;
                for (var i in pagoSQL) {
                    $('#tblConRel tbody').append('<tr></tr>');
                    var row = $('#tblConRel tbody tr').last();
                    row.append('<td>' + cont + '</td>');//no.
                    row.append('<td>' + pagoSQL[i][0] + '</td>');//claveClien
                    row.append('<td>' + pagoSQL[i][3] + '</td>');//noombre
                    row.append('<td>' + "$" + pagoSQL[i][1] + '</td>');//deposito
                    row.append('<td>' + "$" + pagoSQL[i][2] + '</td>');//retiro
                    row.append('<td>' + pagoSQL[i][5] + '</td>');//moneda
                    row.append('<td>' + pagoSQL[i][4] + '</td>');//tipo de operacion                
                    cont++;
                }//for

                $("#tblRelevantes").css("display", "block");
                conversion();
            }//else
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Se ha producido un error en el servidor");
        }
    });
}
/**
 * Funcion que permite generar un reporte tipo Operaciones Relevantes
 * @param {type} 
 * @returns {Boolean} archivo excel o bien csv
 */
function reporteRelevantes(boton) {
    var fechIn = document.getElementById("fechIni").value;
    var fechTe = document.getElementById("fechTer").value;
    var dolares = document.getElementById("dolaresPld").value;
    var valDolar = document.getElementById("valorDolarPld").value;
    var sucursalID = document.getElementById("sucursalId").value;
    if (sucursalID === "0") {
        error("NO se ha seleccionado una sucursal");
        return false;
    }
    if (fechIn === "" && fechTe === "") {
        error("NO se ha establecido un rango de fechas");
        return false;
    }
    var datos = [fechIn, fechTe, dolares, valDolar, sucursalID];
    blockUI("Cargando datos");
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "operelevante/reporteRelevantes",
        data: {datos: datos},
        dataType: 'html',
        type: 'POST',
        success: function (retorno) {
            ok("Los datos se procesaron <b>correctamente</b>");
            unBlockUI(500);
            // alert(retorno);      
            var pagoSQL = JSON.parse(retorno);
            var fecha = new Date();
            var mes = (fecha.getMonth()) + 1;
            var aniomes;

            if (mes < 10) {
                aniomes = fecha.getFullYear() + "0" + (fecha.getMonth()) + 1;
            } else {
                aniomes = fecha.getFullYear() + (fecha.getMonth()) + 1;
            }
            var cont = 1;
            for (var i in pagoSQL) {
                var folio = 0;
                if (cont < 10) {
                    folio = "00000" + cont;
                }
                if (cont > 10 && cont < 100) {
                    folio = "0000" + cont;
                }
                if (cont > 100 & cont < 1000) {
                    folio = "000" + cont;
                }
                var comilla = "";
                if (boton === 'excel') {
                    comilla = "'";
                }
                var tr = document.createElement("tr");
                var td = document.createElement("td");
                var txt = document.createTextNode(1);//tipo de reporte
                var td1 = document.createElement("td");
                var txt1 = document.createTextNode(aniomes);//periodoREporte
                var td2 = document.createElement("td");
                var txt2 = document.createTextNode(comilla + folio);//folio
                var td3 = document.createElement("td");
                var clOrg = pagoSQL[i][0].replace(/-/g, "");
                var txt3 = document.createTextNode(comilla + "00" + clOrg);//OrganosSuperentidadfinanciera 001002
                var td4 = document.createElement("td");
                var clEnt = pagoSQL[i][1].replace(/-/g, "");
                var txt4 = document.createTextNode(comilla + "088" + clEnt);//clave entidad 08821945
                var td5 = document.createElement("td");
                var txt5 = document.createTextNode(comilla + pagoSQL[i][2]);//localidad ciudad
                var td6 = document.createElement("td");
                var txt6 = document.createTextNode(comilla + pagoSQL[i][3]);//Sucursal CP
                var td7 = document.createElement("td");
                var txt7 = document.createTextNode(comilla + pagoSQL[i][4]);//ct_tipOperacion
                var td8 = document.createElement("td");
                var txt8 = document.createTextNode(comilla + pagoSQL[i][23]);//instMon 
                var td9 = document.createElement("td");
                var txt9 = document.createTextNode(pagoSQL[i][5]);//CLAVE Remesa Oficalcumplimineto
                var td10 = document.createElement("td");
                var txt10 = document.createTextNode(pagoSQL[i][6]);//monto envio
                var td11 = document.createElement("td");
                var txt11 = document.createTextNode(pagoSQL[i][8]);//moneda
                var td12 = document.createElement("td");
                var fechaR = pagoSQL[i][9].replace(/-/g, "");
                var txt12 = document.createTextNode(fechaR);//fecha operacion
                var td13 = document.createElement("td");
                var txt13 = document.createTextNode("");//FECHA DE DETECCIÓN DE LAOPERACIÓN*
                var td14 = document.createElement("td");
                var txt14 = document.createTextNode(1);//Nacionalidad 
                var td15 = document.createElement("td");
                var txt15 = document.createTextNode(1);//Las claves son: 1 = Persona Física, 2 = Persona Mora
                var td16 = document.createElement("td");
                var txt16 = document.createTextNode("");//RAZÓN SOCIAL P.Moral
                var td17 = document.createElement("td");
                var txt17 = document.createTextNode(pagoSQL[i][15]);//NOMBRE: del cuentahabiente
                var td18 = document.createElement("td");
                var txt18 = document.createTextNode(pagoSQL[i][16]);//APELLIDO PATERNO
                var td19 = document.createElement("td");
                var txt19 = document.createTextNode(pagoSQL[i][17]);//APELLIDO MATERNO
                var td20 = document.createElement("td");
                var txt20 = document.createTextNode("");//RFC no va en relevantes
                var td21 = document.createElement("td");
                var txt21 = document.createTextNode(pagoSQL[i][18]);//CURP
                var td22 = document.createElement("td");
                var fechaNac = pagoSQL[i][22].replace(/-/g, "");
                var txt22 = document.createTextNode(fechaNac);//FECHA NAC O CONSTITU
                var td23 = document.createElement("td");
                var txt23 = document.createTextNode(pagoSQL[i][10] + " " + pagoSQL[i][12]);//DOMICILIO Especificar el domicilio de la persona 
                //que se reporta de la siguiente manera: indicar la calle, número exterior e interior (si aplica), y código postal.
                var td24 = document.createElement("td");
                var txt24 = document.createTextNode(comilla + pagoSQL[i][11]);//COLONIA 
                var td25 = document.createElement("td");
                var txt25 = document.createTextNode(comilla + pagoSQL[i][13]);// CIUDAD
                var td26 = document.createElement("td");
                var txt26 = document.createTextNode(pagoSQL[i][21]);//TELEFONO
                var td27 = document.createElement("td");
                var txt27 = document.createTextNode(comilla + pagoSQL[i][14]);//ACTIVIDAD ECONOMICA
                var td28 = document.createElement("td");
                var txt28 = document.createTextNode(pagoSQL[i][19]);//Agente o Apoderado
                var td29 = document.createElement("td");
                var txt29 = document.createTextNode("");//ApePaterno
                var td30 = document.createElement("td");
                var txt30 = document.createTextNode("");//ApMatern
                var td31 = document.createElement("td");
                var txt31 = document.createTextNode(pagoSQL[i][20]);//RFC
                var td32 = document.createElement("td");
                var txt32 = document.createTextNode("");//curp
                var td33 = document.createElement("td");
                var txt33 = document.createTextNode("");//ConsecutivoCuentas
                var td34 = document.createElement("td");
                var txt34 = document.createTextNode("");//NumeroCunetaNSS
                var td35 = document.createElement("td");
                var txt35 = document.createTextNode("");//claveSujetoObliga
                var td36 = document.createElement("td");
                var txt36 = document.createTextNode("");//TitularCuenta
                var td37 = document.createElement("td");
                var txt37 = document.createTextNode("");//ApParteno
                var td38 = document.createElement("td");
                var txt38 = document.createTextNode("");//ApMaterno
                var td39 = document.createElement("td");
                var txt39 = document.createTextNode("");//Descripcion Operacion
                var td40 = document.createElement("td");
                var txt40 = document.createTextNode("");//Razones Insual Preocupante
                /* var tdBoton = document.createElement("td");
                 var x = document.createElement("INPUT");
                 x.setAttribute("type", "button");
                 x.setAttribute("value", "Eliminar");*/

                td.appendChild(txt);
                tr.appendChild(td);
                td1.appendChild(txt1);
                tr.appendChild(td1);
                td2.appendChild(txt2);
                tr.appendChild(td2);
                td3.appendChild(txt3);
                tr.appendChild(td3);
                td4.appendChild(txt4);
                tr.appendChild(td4);
                td5.appendChild(txt5);
                tr.appendChild(td5);
                td6.appendChild(txt6);
                tr.appendChild(td6);
                td7.appendChild(txt7);
                tr.appendChild(td7);
                td8.appendChild(txt8);
                tr.appendChild(td8);
                td9.appendChild(txt9);
                tr.appendChild(td9);
                td10.appendChild(txt10);
                tr.appendChild(td10);
                td11.appendChild(txt11);
                tr.appendChild(td11);
                td12.appendChild(txt12);
                tr.appendChild(td12);
                td13.appendChild(txt13);
                tr.appendChild(td13);
                td14.appendChild(txt14);
                tr.appendChild(td14);
                td15.appendChild(txt15);
                tr.appendChild(td15);
                td16.appendChild(txt16);
                tr.appendChild(td16);
                td17.appendChild(txt17);
                tr.appendChild(td17);
                td18.appendChild(txt18);
                tr.appendChild(td18);
                td19.appendChild(txt19);
                tr.appendChild(td19);
                td20.appendChild(txt20);
                tr.appendChild(td20);
                td21.appendChild(txt21);
                tr.appendChild(td21);
                td22.appendChild(txt22);
                tr.appendChild(td22);
                td23.appendChild(txt23);
                tr.appendChild(td23);
                td24.appendChild(txt24);
                tr.appendChild(td24);
                td25.appendChild(txt25);
                tr.appendChild(td25);
                td26.appendChild(txt26);
                tr.appendChild(td26);
                td27.appendChild(txt27);
                tr.appendChild(td27);
                td28.appendChild(txt28);
                tr.appendChild(td28);
                td29.appendChild(txt29);
                tr.appendChild(td29);
                td30.appendChild(txt30);
                tr.appendChild(td30);
                td31.appendChild(txt31);
                tr.appendChild(td31);
                td32.appendChild(txt32);
                tr.appendChild(td32);
                td33.appendChild(txt33);
                tr.appendChild(td33);
                td34.appendChild(txt34);
                tr.appendChild(td34);
                td35.appendChild(txt35);
                tr.appendChild(td35);
                td36.appendChild(txt36);
                tr.appendChild(td36);
                td37.appendChild(txt37);
                tr.appendChild(td37);
                td38.appendChild(txt38);
                tr.appendChild(td38);
                td39.appendChild(txt39);
                tr.appendChild(td39);
                td40.appendChild(txt40);
                tr.appendChild(td40);
                /* tdBoton.appendChild(x);
                 tr.appendChild(tdBoton)*/
                $("#tblOpRel tbody").append(tr);
                cont = parseInt(cont) + 1;//genera num de filas

            }//ffor
            // $("#tblORelevantes").css("display", "block");
            var nombre = 1 + clEnt + aniomes + "." + clOrg;
            if (boton === 'csv') {
                csv('#tbRel', nombre);
            } else {
                reportExcel('#divTblR', nombre);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Se ha producido un error en el servidor");
        }
    });
}
/**
 * Funcion csv y Excel generar los reportes de operaciones 
 * preocupantes, insuale,relevantes
 * @param {type} tabla id de la tabla a leer
 * @param {type} nombre del archivo que se genera
 * @returns {file} archivo extencion csv separdo por comas
 */
var reporteOpPreocupante;
function csv(tabla, nombre) {
    if (tabla === "#tbEdPre") {
        $("#tblOPreocupante").css("display", "block");
        $(tabla).tableToCSV(reporteOpPreocupante, "csv", "3");
    }
    if (tabla === "#tbRel") {
        $(tabla).tableToCSV(nombre, "csv", "1");
        $(tabla).empty();
    }
    if (tabla === "#tbEdInu") {
        $(tabla).tableToCSV(nombreInusual, "csv", "2");
    }
}
function reportExcel(idTbl, nomRep) {
    if (idTbl === '#divTblInP') {
        //$(idTbl).tableToCSV(reporteOpPreocupante, "excel", "3");
        var link = document.createElement('a');
        document.body.appendChild(link);
        link.download = reporteOpPreocupante + ".xls";
        link.href = 'data:application/vnd.ms-excel,' + escape($(idTbl).html());
        link.click();
        document.body.removeChild(link);
        $("#tbPre").empty();//limpiar tabla
    } else if (idTbl === '#divTblR') {
        var link = document.createElement('a');
        document.body.appendChild(link);
        link.download = nomRep + ".xls";
        link.href = 'data:application/vnd.ms-excel,' + escape($(idTbl).html());
        link.click();
        document.body.removeChild(link);
        $("#tbRel").empty();//limpiar tabla
    }
    if (idTbl === "#divTblInu") {
        var link = document.createElement('a');
        document.body.appendChild(link);
        link.download = nombreInusual + ".xls";
        link.href = 'data:application/vnd.ms-excel,' + escape($(idTbl).html());
        link.click();
        document.body.removeChild(link);
        $("#tbReIn").empty();//limpiar tabla
    }
    if (idTbl === "#divBitacora") {
        var link = document.createElement('a');
        document.body.appendChild(link);
        link.download = "Reporte" + ".xls";
        link.href = 'data:application/vnd.ms-excel,' + escape($(idTbl).html());
        link.click();
        document.body.removeChild(link);
    }
    if (idTbl === "#tblRemesaEnvio") {
        var link = document.createElement('a');
        document.body.appendChild(link);
        link.download = nomRep + ".xls";
        link.href = 'data:application/vnd.ms-excel,' + escape($(idTbl).html());
        link.click();
        document.body.removeChild(link);
    }
}
/***
 * Funcion para Realizar una opracion Interna Preocupante
 * @param {int} valor 1= si, 2=no 
 * @returns {el usuario que hace la denuncia o bien solo se reciben los datos 
 * de la persona aquien se denuncia}
 */
function selectDenunciaAnonima(valor) {
    if (valor === 1) {
        $("#chNo").prop('checked', false);
        $("#divdenunciante").css("display", "none");
    }
    if (valor === 2) {
        $("#chSi").prop('checked', false);
        //buscar el usuario en sesion
        $(document).ajaxSend(function (e, xhr, options) {
            var token = $("input[name='_csrf']").val();
            var cabecera = "X-CSRF-TOKEN";
            xhr.setRequestHeader(cabecera, token);
        });
        $.ajax({
            url: "usuario/usuarioEnsesion",
            data: {datos: ''},
            dataType: 'html',
            type: 'GET',
            success: function (retorno) {
                var usuario = JSON.parse(retorno);
                $("#nickuser").val(usuario[0]);
                $("#emailUser").val(usuario[1]);
                $("#nombreUser").val(usuario[2]);
                $("#divdenunciante").css("display", "block");
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Se ha producido un error en el servidor");
            }
        });
    }//if
}
/**
 * Guarda una adenuncia Preocupante
 * @returns {Boolean}
 */
function denunciaPreocupante() {
    var idusuario;
    $("input[type=radio]:checked").each(function () {
        var cont = 0;
        $(this).closest('td').siblings().each(function () {
            // obtenemos el texto del td pocion 0
            if (cont === 0) {
                idusuario = $(this).text();
            }
            cont++;
        });
    });//ya no hay selecion de mas
    var descripcion = $("#descripcionOp").val();
    var fecha = $("#fechSuceso").val();
    var usuarionick = $("#nickuser").val();
    if (typeof (idusuario) === "undefined") {
        error("No se ha seleccionado el usuario");
        return false;
    }
    if (descripcion === '') {
        error("Es requerida una descripci&oacte;n del hecho.");
        return false;
    }
    if (fecha === '') {
        error("No se ha seleccionado la fecha");
        return false;
    }
    var datos = [idusuario, descripcion,
        fecha, usuarionick];
    blockUI("Procesando los datos");
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "opepreocupante/guardarOperacionP",
        data: {datos: datos},
        dataType: 'html',
        type: 'POST',
        success: function (retorno) {
            var operacionesP = JSON.parse(retorno);
            if (operacionesP !== null) {
                ok("Los datos se procesar&oacute;n correctamente");
                unBlockUI(400);
                //setTimeout(function () {location.href = "denunopepreocupante";}, 1000);
                var cant = 1;
                for (var i in operacionesP) {
                    document.getElementById('report').innerHTML = cant;
                    document.getElementById('preocupante').innerHTML = cant;
                    $("#report").attr("title", "Tienes notificaciones");
                    cant++;
                }
                limpiarForm('frmPreocupantes');
                $("#divdenunciante").css("display", "none");
            } else {
                ok("Los datos se procesar&oacute;n correctamente");
                unBlockUI(400);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Se ha producido un error en el servidor red");
        }
    });//ajax
}
/**
 * Fincion para buscar infomacion adicional de la persona acusada
 * @returns {undefined}
 */
function buscarUsuarioPre() {
    $("#tablePreocupantes tbody").on('click', 'tr', function () {
        var idInfracUsuario = $('td', this).eq(2).text();
        $("#usuarioidInf").val(idInfracUsuario);
        var datos = [idInfracUsuario];
        $(document).ajaxSend(function (e, xhr, options) {
            var token = $("input[name='_csrf']").val();
            var cabecera = "X-CSRF-TOKEN";
            xhr.setRequestHeader(cabecera, token);
        });
        $.ajax({
            url: "usuario/buscarUsuarioP",
            data: {datos: datos},
            dataType: 'html',
            type: 'POST',
            success: function (retorno) {
                //alert(retorno);
                var datosUsuario = JSON.parse(retorno);
                console.log(datosUsuario);
                $("#nick").val(datosUsuario[0]);
                $("#email").val(datosUsuario[1]);
                $("#nameC").val(datosUsuario[2]);
                $("#sucursalS").val(datosUsuario[3]);
                $("#telefonoS").val(datosUsuario[4]);
                $("#idusuario").val(datosUsuario[5]);
                $("#curp").val(datosUsuario[6]);
                $("#sexo").val(datosUsuario[7]);

            }
        });//ajax
    });//tabla
}
function notificacion() {//POR SI SE USA
    alertify.log("Esto es una notificaci&oacuten cualquiera.");
    return false;
}
//ALERTAS EN  VERDE Y ROJO SEGUN SE DE LA RESPUESTA DEL PROCESO
function ok(message) {
    alertify.success(message);
    return false;
}
function error(message) {
    alertify.error(message);
    return false;
}
/**
 * Funcion que permite generar el reporte de operaciones 
 * Internas Preocupantes
 * @param {type} boton = tipo de archivo a generar
 * @returns {Boolean}
 */
function reportPreocupante(boton) {
    $("#tbEdPre").empty();//limpiar la tabla
    $("#divTbDenuncias").css("display", "none");
    var arreglo = [];
    var dato;
    $("input[type=checkbox]:checked").each(function () {
        var cont = 1;
        $(this).closest('td').siblings().each(function () {
            // obtenemos el texto del td 
            if (cont === 3) {
                dato = $(this).text();
                arreglo.push(dato);   //idusuario
            }
            if (cont === 6) {
                dato = $(this).text();
                console.log(dato);
                arreglo.push(dato);
            }//descripcion
            cont++;
        });
        // console.log('Contenido ' + arreglo);
    });//ya no hay selecion de mas 
    if (arreglo.length === 0) {
        $("#divTbDenuncias").css("display", "block");
        error("NO se ha seleccionado algun cliente.");
        return false;
    }
    blockUI("Procesando los datos");
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "opepreocupante/reportePreocupante",
        data: {datos: arreglo},
        dataType: 'html',
        type: 'POST',
        success: function (retorno) {
            ok("Se han procesados los datos correctamente");
            var operacionP = JSON.parse(retorno);
            var fecha = new Date();
            var mes = (fecha.getMonth()) + 1;
            var periodo;
            if (mes < 10) {
                periodo = fecha.getFullYear() + "0" + (fecha.getMonth() + 1) + fecha.getDate();
            } else {
                periodo = fecha.getFullYear() + (fecha.getMonth() + 1) + fecha.getDate();
            }
            var cont = 1;
            for (var i in operacionP) {
                var folio = 0;
                if (cont < 10) {
                    folio = "00000" + cont;
                }
                if (cont > 10 && cont < 100) {
                    folio = "0000" + cont;
                }
                if (cont > 100 & cont < 1000) {
                    folio = "000" + cont;
                }
                var tr = document.createElement("tr");
                var td = document.createElement("td");
                var txt = document.createTextNode(3);//tipo de reporte
                var td1 = document.createElement("td");
                var txt1 = document.createTextNode(periodo);//periodoREporte
                var td2 = document.createElement("td");
                var txt2 = document.createTextNode(folio);//folio
                var td3 = document.createElement("td");
                var clOS = operacionP[i][0].replace(/-/g, "");
                var txt3 = document.createTextNode("00" + clOS);//OrganosSuperentidadfinanciera 001002
                var td4 = document.createElement("td");
                var clEn = operacionP[i][1].replace(/-/g, "");
                var txt4 = document.createTextNode("088" + clEn);//clave entidad 08821945
                var td5 = document.createElement("td");
                var txt5 = document.createTextNode(operacionP[i][2]);//localidad ciudad
                var td6 = document.createElement("td");
                var txt6 = document.createTextNode(operacionP[i][3]);//Sucursal
                var td7 = document.createElement("td");
                //console.log(servicio);
                var SELECT;
                var x;
                var contador = 1;
                SELECT = document.createElement("SELECT");
                SELECT.setAttribute("id", "idOperacion");
                var operacionS = JSON.parse(servicio);
                for (var l in operacionS) {
                    x = document.createElement("option");
                    x.setAttribute("value", operacionS[l].clave);
                    x.setAttribute("title", operacionS[l].descripcion);
                    x.innerHTML = operacionS[l].clave;
                    SELECT.appendChild(x);
                    contador++;
                }//for
                td7.appendChild(SELECT);
                //  console.log(instrumentoM);
                var td8 = document.createElement("td");//instMon
                var SELECT;
                var x;
                SELECT = document.createElement("SELECT");
                SELECT.setAttribute("id", "idIntrumento");
                var instrumento = JSON.parse(instrumentoM);
                for (var j in instrumento) {
                    x = document.createElement("option");
                    x.setAttribute("value", instrumento[j].clave);
                    x.setAttribute("title", instrumento[j].nombre);
                    x.innerHTML = instrumento[j].clave;
                    SELECT.appendChild(x);
                }//for
                td8.appendChild(SELECT);
                var td9 = document.createElement("td");//NÚMERO DE CUENTA, CONTRATO, OPERACIÓN, PÓLIZA O NÚMERO DE SEGURIDAD SOCIAL Oficalcumplimineto
                td9.setAttribute("contenteditable", "true");
                var td10 = document.createElement("td");
                td10.setAttribute("contenteditable", "true");//monto
                var td11 = document.createElement("td");//moneda
                var SELECT;
                var x;
                SELECT = document.createElement("SELECT");
                SELECT.setAttribute("id", "idMonedaD");
                console.log(divisa);
                var moneda = JSON.parse(divisa);
                for (var l in moneda) {
                    x = document.createElement("option");
                    x.setAttribute("value", moneda[l].clave);
                    x.setAttribute("title", moneda[l].nombremoneda);
                    x.innerHTML = moneda[l].clave;
                    SELECT.appendChild(x);
                }//for
                td11.appendChild(SELECT);
                var td12 = document.createElement("td");
                var fechaO = operacionP[i][4].replace(/-/g, "");
                var txt12 = document.createTextNode(fechaO);//fecha operacion
                var td13 = document.createElement("td");
                var fechaD = operacionP[i][4].replace(/-/g, "");
                var txt13 = document.createTextNode(fechaD);//FECHA DE DETECCIÓN DE LAOPERACIÓN*
                var td14 = document.createElement("td");
                var txt14 = document.createTextNode(1);//Nacionalidad 
                var td15 = document.createElement("td");
                var txt15 = document.createTextNode("1");//Las claves son: 1 = Persona Física, 2 = Persona Mora
                var td16 = document.createElement("td");
                td16.setAttribute("contenteditable", "true");//RAZÓN SOCIAL P.Moral
                var td17 = document.createElement("td");
                var txt17 = document.createTextNode(operacionP[i][5]);//NOMBRE: del cuentahabiente
                var td18 = document.createElement("td");
                var txt18 = document.createTextNode(operacionP[i][6]);//APELLIDO PATERNO
                var td19 = document.createElement("td");
                var txt19 = document.createTextNode(operacionP[i][7]);//APELLIDO MATERNO
                var td20 = document.createElement("td");//RFC no va en relevantes
                td20.setAttribute("contenteditable", "true");
                var td21 = document.createElement("td");
                var txt21 = document.createTextNode(operacionP[i][8]);//CURP
                var td22 = document.createElement("td");
                var txt22 = document.createTextNode("");//FECHA NAC O CONSTITU
                td22.setAttribute("contenteditable", "true");
                var td23 = document.createElement("td");//DOMICILIO Especificar el domicilio de la persona
                td23.setAttribute("contenteditable", "true");
                td23.setAttribute("placeholder", "calle,numero");
                //que se reporta de la siguiente manera: indicar la calle, número exterior e interior (si aplica), y código postal.
                var td24 = document.createElement("td");
                td24.setAttribute("contenteditable", "true");//COLONIA 
                var td25 = document.createElement("td");
                var txt25 = document.createTextNode("");// CIUDAD catalogo
                var td26 = document.createElement("td");
                var txt26 = document.createTextNode(operacionP[i][9]);//TELEFONO
                var td27 = document.createElement("td");//ACTIVIDAD ECONOMICA
                console.log(catalogo);
                var SELECT;
                var x;
                var contador = 1;
                SELECT = document.createElement("SELECT");
                SELECT.setAttribute("id", "idActividad");
                var actividad = JSON.parse(catalogo);
                for (var l in actividad) {
                    x = document.createElement("option");
                    x.setAttribute("value", actividad[l].claveae);
                    x.setAttribute("title", actividad[l].nombre);
                    x.innerHTML = actividad[l].claveae;
                    SELECT.appendChild(x);
                    contador++;
                }//for
                td27.appendChild(SELECT);
                console.log(instrumentoM);
                var td28 = document.createElement("td");
                var txt28 = document.createTextNode(operacionP[i][10]);//Agente o Apoderado
                var td29 = document.createElement("td");
                var txt29 = document.createTextNode("");//ApePaterno
                var td30 = document.createElement("td");
                var txt30 = document.createTextNode("");//ApMatern
                var td31 = document.createElement("td");
                var txt31 = document.createTextNode(operacionP[i][11]);//RFC
                var td32 = document.createElement("td");//curp
                td32.setAttribute("contenteditable", "true");
                var td33 = document.createElement("td");//ConsecutivoCuentas
                td33.setAttribute("contenteditable", "true");
                var td34 = document.createElement("td");//NumeroCunetaNSS
                td34.setAttribute("contenteditable", "true");
                var td35 = document.createElement("td");//claveSujetoObliga
                td35.setAttribute("contenteditable", "true");
                var txt35 = document.createTextNode("0" + clEn);
                var td36 = document.createElement("td");//TitularCuenta
                td36.setAttribute("contenteditable", "true");
                var td37 = document.createElement("td");//ApParteno
                td37.setAttribute("contenteditable", "true");
                var td38 = document.createElement("td");//ApMaterno
                td38.setAttribute("contenteditable", "true");
                var td39 = document.createElement("td");
                td39.setAttribute("contenteditable", "true");//Descripcion Operacion
                var td40 = document.createElement("td");
                var txt40 = document.createTextNode(operacionP[i][12]);//Razones Insual Preocupante
                td.appendChild(txt);
                tr.appendChild(td);
                td1.appendChild(txt1);
                tr.appendChild(td1);
                td2.appendChild(txt2);
                tr.appendChild(td2);
                td3.appendChild(txt3);
                tr.appendChild(td3);
                td4.appendChild(txt4);
                tr.appendChild(td4);
                td5.appendChild(txt5);
                tr.appendChild(td5);
                td6.appendChild(txt6);
                tr.appendChild(td6);
                tr.appendChild(td7);
                tr.appendChild(td8);
                tr.appendChild(td9);
                tr.appendChild(td10);
                tr.appendChild(td11);
                td12.appendChild(txt12);
                tr.appendChild(td12);
                td13.appendChild(txt13);
                tr.appendChild(td13);
                td14.appendChild(txt14);
                tr.appendChild(td14);
                td15.appendChild(txt15);
                tr.appendChild(td15);
                //td16.appendChild(txt16);
                tr.appendChild(td16);
                td17.appendChild(txt17);
                tr.appendChild(td17);
                td18.appendChild(txt18);
                tr.appendChild(td18);
                td19.appendChild(txt19);
                tr.appendChild(td19);
                tr.appendChild(td20);
                td21.appendChild(txt21);
                tr.appendChild(td21);
                td22.appendChild(txt22);
                tr.appendChild(td22);
                tr.appendChild(td23);
                tr.appendChild(td24);
                td25.appendChild(txt25);
                tr.appendChild(td25);
                td26.appendChild(txt26);
                tr.appendChild(td26);
                tr.appendChild(td27);
                td28.appendChild(txt28);
                tr.appendChild(td28);
                td29.appendChild(txt29);
                tr.appendChild(td29);
                td30.appendChild(txt30);
                tr.appendChild(td30);
                td31.appendChild(txt31);
                tr.appendChild(td31);
                tr.appendChild(td32);
                tr.appendChild(td33);
                tr.appendChild(td34);
                td35.appendChild(txt35);
                tr.appendChild(td35);
                tr.appendChild(td36);
                tr.appendChild(td37);
                tr.appendChild(td38);
                tr.appendChild(td39);
                td40.appendChild(txt40);
                tr.appendChild(td40);
                //var label=document.createElement("label"); label.htmlFor = "text" + operacionP[i]; label.innerHTML=operacionP;$("#h2").append(label);
                $("#tblOpPre tbody").append(tr);//tblOpPre
                cont = parseInt(cont) + 1;//genera num de filas
            }//ffor
            unBlockUI(400);
            $("#tblOPreocupante").css("display", "block");
            // TIPO DE REPORTE CLAVE DE  ENTIDAD FINANCIERA PERIODO PUNTO ÓRGANO SUPERVISOR
            reporteOpPreocupante = 3 + clEn + periodo + "." + clOS;//nombre del archivo
        }
    });//ajax
}
/*CATALOGOS*/
var catalogo;
function actividadEconommica() {
    $.ajax({
        url: "opepreocupante/catalogoActividad",
        data: {},
        dataType: 'html',
        type: 'GET',
        success: function (datos) {
            catalogo = datos;
            return catalogo;
        }
    });//ajax
}
var instrumentoM;
function instrumentoMonetario() {
    $.ajax({
        url: "opepreocupante/catalogoInstrumentoMonetario",
        data: {},
        dataType: 'html',
        type: 'GET',
        success: function (datos) {
            instrumentoM = datos;
            return instrumentoM;
        }
    });//ajax
}
var divisa;
function monedaDivisa() {
    $.ajax({
        url: "opepreocupante/catalogoMonedaDivisa",
        data: {},
        dataType: 'html',
        type: 'GET',
        success: function (datos) {
            divisa = datos;
            return divisa;
        }
    });//ajax
}
var servicio;
function tipoServicio() {
    $.ajax({
        url: "opepreocupante/catalogoTipoServicio",
        data: {},
        dataType: 'html',
        type: 'GET',
        success: function (datos) {
            servicio = datos;
            return servicio;
        }
    });//ajax
}
/**
 * OPERACIONES INUSUALES
 * consultar operaciones
 error("NO se ha selecci
 */
var nombreInusual;
function reportInusual() {
    var sucursal = $("#sucursalId").val();
    if (sucursal === '0') {
        error("NO se ha seleccionado la sucursal.");
        return false;
    }
    var arreglo = [];
    var dato;
    $("input[type=checkbox]:checked").each(function () {
        var cont = 1;
        $(this).closest('td').siblings().each(function () {
            // obtenemos el texto del td opeinusual/movimientos
            if (cont === 2 || cont === 8) {
                dato = $(this).text();
                arreglo.push(dato);   //idcliiente//idTipSer
            }
            cont++;
        });
        //console.log('Soy arreglo ' + arreglo);
    });
    arreglo.push(sucursal);
    if (arreglo.length === 0) {
        error("NO se ha seleccionado algún cliente");
        return false;
    }
    $("#tbEdInu").empty();//limpiar tabla
    blockUI("Procesando los datos");
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "opeinusual/reporte",
        data: {datos: arreglo},
        dataType: 'html',
        type: 'POST',
        success: function (retorno) {
            var inusual = JSON.parse(retorno);
            if (inusual.length === 0) {
                ok("NO hay datos en esta sucursal");
                unBlockUI(400);
                return false;
            } else {
                ok("Se han procesados los datos de manera correcta");
                //console.log(inusual);
                $("#tblOInusual").css("display", "block");
                var fecha = new Date();
                var mes = (fecha.getMonth()) + 1;
                var aniomesdia;
                if (mes < 10) {
                    aniomesdia = fecha.getFullYear() + "0" + (fecha.getMonth() + 1) + '' + fecha.getDate();
                } else {
                    aniomesdia = fecha.getFullYear() + '' + (fecha.getMonth() + 1) + '' + fecha.getDate();
                }
                var cont = 1;
                for (var i in inusual) {
                    var folio = 0;
                    if (cont < 10) {
                        folio = "00000" + cont;
                    }
                    if (cont > 10 && cont < 100) {
                        folio = "0000" + cont;
                    }
                    if (cont > 100 & cont < 1000) {
                        folio = "000" + cont;
                    }
                    var tr = document.createElement("tr");
                    var td = document.createElement("td");
                    var txt = document.createTextNode(2);//tipo de reporte
                    var td1 = document.createElement("td");
                    var txt1 = document.createTextNode(aniomesdia);//periodoREporte
                    var td2 = document.createElement("td");
                    var txt2 = document.createTextNode(folio);//folio
                    var td3 = document.createElement("td");
                    var clOrg = inusual[i][0].replace(/-/g, "");
                    var txt3 = document.createTextNode("00" + clOrg);//OrganosSuperentidadfinanciera 001002
                    var td4 = document.createElement("td");
                    var clEnt = inusual[i][1].replace(/-/g, "");
                    var txt4 = document.createTextNode("088" + clEnt);//clave entidad 08821945
                    var td5 = document.createElement("td");
                    var txt5 = document.createTextNode(inusual[i][2]);//localidad ciudad
                    var td6 = document.createElement("td");
                    var txt6 = document.createTextNode("0" + inusual[i][3]);//Sucursal CP
                    var td7 = document.createElement("td");
                    var txt7 = document.createTextNode(inusual[i][4]);//ct_tipOperacion
                    var td8 = document.createElement("td");
                    var txt8 = document.createTextNode(inusual[i][26]);//instMon pendiente
                    var td9 = document.createElement("td");
                    var txt9 = document.createTextNode(inusual[i][5]);//CLAVE Remesa Oficalcumplimineto
                    var td10 = document.createElement("td");
                    var txt10 = document.createTextNode(inusual[i][6]);//monto
                    var td11 = document.createElement("td");
                    var txt11 = document.createTextNode(inusual[i][8]);//moneda
                    var td12 = document.createElement("td");
                    var fechaO = inusual[i][9].replace(/-/g, "");
                    var txt12 = document.createTextNode(fechaO);//fecha operacion
                    var td13 = document.createElement("td");
                    var txt13 = document.createTextNode("");//FECHA DE DETECCIÓN DE LAOPERACIÓN*
                    var td14 = document.createElement("td");
                    var txt14 = document.createTextNode(1);//Nacionalidad 
                    var td15 = document.createElement("td");
                    var txt15 = document.createTextNode(1);//Las claves son: 1 = Persona Física, 2 = Persona Mora
                    var td16 = document.createElement("td");
                    var txt16 = document.createTextNode("");//RAZÓN SOCIAL P.Moral
                    var td17 = document.createElement("td");
                    var txt17 = document.createTextNode(inusual[i][15]);//NOMBRE: del cuentahabiente
                    var td18 = document.createElement("td");
                    var txt18 = document.createTextNode(inusual[i][16]);//APELLIDO PATERNO
                    var td19 = document.createElement("td");
                    var txt19 = document.createTextNode(inusual[i][17]);//APELLIDO MATERNO
                    var td20 = document.createElement("td");
                    var txt20 = document.createTextNode("");//RFC no va en relevantes
                    var td21 = document.createElement("td");
                    var txt21 = document.createTextNode(inusual[i][18]);//CURP
                    var td22 = document.createElement("td");
                    var fechaNac = inusual[i][22].replace(/-/g, "");
                    var txt22 = document.createTextNode(fechaNac);//FECHA NAC O CONSTITU
                    var td23 = document.createElement("td");
                    var txt23 = document.createTextNode(inusual[i][10] + ',' + inusual[i][12]);//DOMICILIO Especificar el domicilio de la persona 
                    //que se reporta de la siguiente manera: indicar la calle, número exterior e interior (si aplica), y código postal.
                    var td24 = document.createElement("td");
                    var txt24 = document.createTextNode(inusual[i][11]);//COLONIA 
                    var td25 = document.createElement("td");
                    var txt25 = document.createTextNode(inusual[i][13]);// CIUDAD
                    var td26 = document.createElement("td");
                    var txt26 = document.createTextNode(inusual[i][21]);//TELEFONO
                    var td27 = document.createElement("td");
                    var txt27 = document.createTextNode(inusual[i][14]);//ACTIVIDAD ECONOMICA
                    var td28 = document.createElement("td");
                    var txt28 = document.createTextNode(inusual[i][19]);//Agente o Apoderado
                    var td29 = document.createElement("td");
                    var txt29 = document.createTextNode("");//ApePaterno
                    var td30 = document.createElement("td");
                    var txt30 = document.createTextNode("");//ApMatern
                    var td31 = document.createElement("td");
                    var txt31 = document.createTextNode(inusual[i][20]);//RFC
                    var td32 = document.createElement("td");
                    var txt32 = document.createTextNode("");//curp
                    var td33 = document.createElement("td");
                    var txt33 = document.createTextNode("");//ConsecutivoCuentas
                    var td34 = document.createElement("td");
                    var txt34 = document.createTextNode("");//NumeroCunetaNSS
                    var td35 = document.createElement("td");
                    var txt35 = document.createTextNode("0" + clEnt);//claveSujetoObliga
                    var td36 = document.createElement("td");
                    var txt36 = document.createTextNode("");//TitularCuenta
                    var td37 = document.createElement("td");
                    var txt37 = document.createTextNode("");//ApParteno
                    var td38 = document.createElement("td");
                    var txt38 = document.createTextNode("");//ApMaterno
                    var td39 = document.createElement("td");
                    td39.setAttribute("contenteditable", "true");//Descripcion Operacion
                    var td40 = document.createElement("td");
                    td40.setAttribute("contenteditable", "true");//Razones Insual Preocupante
                    td.appendChild(txt);
                    tr.appendChild(td);
                    td1.appendChild(txt1);
                    tr.appendChild(td1);
                    td2.appendChild(txt2);
                    tr.appendChild(td2);
                    td3.appendChild(txt3);
                    tr.appendChild(td3);
                    td4.appendChild(txt4);
                    tr.appendChild(td4);
                    td5.setAttribute("title", inusual[i][23]);//cdSuc
                    td5.appendChild(txt5);
                    tr.appendChild(td5);
                    td6.appendChild(txt6);
                    tr.appendChild(td6);
                    td7.setAttribute("title", inusual[i][24]);//tipoOp
                    td7.appendChild(txt7);
                    tr.appendChild(td7);
                    console.log(inusual[i]);
                    td8.setAttribute("title", inusual[i][27]);//instrumento monetario
                    td8.appendChild(txt8);
                    tr.appendChild(td8);
                    td9.appendChild(txt9);
                    tr.appendChild(td9);
                    td10.appendChild(txt10);
                    tr.appendChild(td10);
                    td11.appendChild(txt11);
                    tr.appendChild(td11);
                    td12.appendChild(txt12);
                    tr.appendChild(td12);
                    td13.appendChild(txt13);
                    tr.appendChild(td13);
                    td14.appendChild(txt14);
                    tr.appendChild(td14);
                    td15.appendChild(txt15);
                    tr.appendChild(td15);
                    td16.appendChild(txt16);
                    tr.appendChild(td16);
                    td17.appendChild(txt17);
                    tr.appendChild(td17);
                    td18.appendChild(txt18);
                    tr.appendChild(td18);
                    td19.appendChild(txt19);
                    tr.appendChild(td19);
                    td20.appendChild(txt20);
                    tr.appendChild(td20);
                    td21.appendChild(txt21);
                    tr.appendChild(td21);
                    td22.appendChild(txt22);
                    tr.appendChild(td22);
                    td23.appendChild(txt23);
                    tr.appendChild(td23);
                    td24.appendChild(txt24);
                    tr.appendChild(td24);
                    td25.appendChild(txt25);
                    tr.appendChild(td25);
                    td26.appendChild(txt26);
                    tr.appendChild(td26);
                    td27.setAttribute("title", inusual[i][25]);//actividad
                    td27.appendChild(txt27);
                    tr.appendChild(td27);
                    td28.appendChild(txt28);
                    tr.appendChild(td28);
                    td29.appendChild(txt29);
                    tr.appendChild(td29);
                    td30.appendChild(txt30);
                    tr.appendChild(td30);
                    td31.appendChild(txt31);
                    tr.appendChild(td31);
                    td32.appendChild(txt32);
                    tr.appendChild(td32);
                    td33.appendChild(txt33);
                    tr.appendChild(td33);
                    td34.appendChild(txt34);
                    tr.appendChild(td34);
                    td35.appendChild(txt35);
                    tr.appendChild(td35);
                    td36.appendChild(txt36);
                    tr.appendChild(td36);
                    td37.appendChild(txt37);
                    tr.appendChild(td37);
                    td38.appendChild(txt38);
                    tr.appendChild(td38);
                    tr.appendChild(td39);
                    tr.appendChild(td40);
                    $("#tblOpInu tbody").append(tr);
                    cont = parseInt(cont) + 1;//genera num de filas
                }//ffor
                unBlockUI(400);
                nombreInusual = 1 + clEnt + aniomesdia + "." + +clOrg;
            }//else 
        }
    });//ajax
}
/**
 * Metodo de busqueda operaciones inusuales por periodo
 * @returns {undefined}
 */
function inusualPorPeriodo() {
    var fechIn = document.getElementById("fechaIni").value;
    var fechTe = document.getElementById("fechaTer").value;
    var sucursal = document.getElementById("sucursalId").value;
    if (sucursal === "0") {
        error("NO se ha seleccionado una sucursal");
        return false;
    }
    if (fechIn === "" || fechTe === "") {
        error("NO se ha establecido un rango de fechas");
        return false;
    }
    var datos = [fechIn, fechTe, sucursal];
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "opeinusual/operacionInsualPeriodo",
        data: {datos: datos},
        dataType: 'html',
        type: 'POST',
        success: function (retorno) {
            //alert(retorno);
            var inusualPeriodo = JSON.parse(retorno);
            if (inusualPeriodo === null) {
                ok("No hay clientes dentro de este periodo");
            } else {
                $('#tbInusualC').empty();
                var cont = 1;
                for (var i in inusualPeriodo) {
                    $('#tblOpInusu tbody').append('<tr></tr>');
                    var row = $('#tblOpInusu tbody tr').last();
                    row.append('<td>' + cont + '</td>');//no.
                    row.append('<td style="display: none">' + inusualPeriodo[i][0] + '</td>');//id
                    row.append('<td>' + inusualPeriodo[i][1] + '</td>');//clave
                    row.append('<td>' + inusualPeriodo[i][4] + '</td>');//cliente
                    row.append('<td>' + inusualPeriodo[i][2] + '</td>');//dep
                    row.append('<td>' + inusualPeriodo[i][3] + '</td>');//re
                    row.append('<td>' + inusualPeriodo[i][6] + '</td>');//  mo 
                    row.append('<td style="display: none">' + inusualPeriodo[i][7] + '</td>');// idtps 
                    row.append('<td>' + inusualPeriodo[i][5] + '</td>');//tpO
                    row.append(' <td>' + '<input type="checkbox" id="inusualId"/>' + '</td>');
                    cont++;
                }//for
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Se ha producido un error en el servidor");
        }
    });
}


//----------------------------------------------------------------------------

function limpiarDatosRemesas() {
    $("#fechaIni").val("");
    $("#fechaTer").val("");
    document.getElementById('tblSucursalC').innerHTML = '';
    document.ready = document.getElementById("tipoMovimiento").value = '0';
}
//-------------------------------------------------------------------------
function generarReporte() {
    if (validarCampos()) {
        var fechaIni = $("#fechaIni").val();
        var fechaTer = $("#fechaTer").val();
        var tipoMovimiento = $("#tipoMovimiento").val();

        var datos = [tipoMovimiento, fechaIni, fechaTer];
        $(document).ajaxSend(function (e, xhr, options) {
            var token = $("input[name='_csrf']").val();
            var cabecera = "X-CSRF-TOKEN";
            xhr.setRequestHeader(cabecera, token);
        });
        $.ajax({
            url: "reporteRemesas/generar",
            data: {datos: datos},
            dataType: 'html',
            type: 'POST',
            success: function (retorno) {
                if (retorno === '[]') {
                    $('#tblSucursalC').empty();
                    error("No se puede generar el reporte dentro de este periodo");
                    unBlockUI(200);
                } else {
                    $('#tblSucursalC').empty();
                    var reporteRemesas = JSON.parse(retorno);
                    unBlockUI(200);
                    console.log(reporteRemesas[0]);
                    //var cont = 1;
                    for (var i in reporteRemesas) {
                        $('#tblSucursal').find('tbody').append('<tr></tr>').
//                    var row = $('#tblSucursal tbody tr').last();
                                append('<td style="text-align: center">' + fechaTer + '</td>').//fecha
                                append('<td style="text-align: center">' + reporteRemesas[i][0] + '</td>').//sucursal
                                append('<td style="text-align: center">' + reporteRemesas[i][1] + '</td>').//intermex
                                append('<td style="text-align: center">' + reporteRemesas[i][2] + '</td>').//sigue
                                append('<td style="text-align: center">' + reporteRemesas[i][3] + '</td>').//western union
                                append('<td style="text-align: center">' + reporteRemesas[i][4] + '</td>').//prospera
                                append('<td style="text-align: center">' + reporteRemesas[i][5] + '</td>').//bansefi 
                                append('<td style="text-align: center">' + reporteRemesas[i][6] + '</td>').// envicon 
                                append('<td style="text-align: center">' + reporteRemesas[i][7] + '</td>');//total
                    }//for
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Se ha producido un error en el servidor");
            }
        });
    }
}
//-------------------------------------------------------------------------
function reporteRemesaExcel(idTbl) {
    if (validarCampos()) {
        var fechaIni = $("#fechaIni").val();
        var fechaTer = $("#fechaTer").val();
        var tipoMovimiento = $("#tipoMovimiento").val();


        if (idTbl === "#divTable") {

            var link = document.createElement('a');

            document.body.appendChild(link);
            link.download = "ReporteRemesas " + fechaTer + ".xls";
            link.href = 'data:application/vnd.ms-excel,' + escape($(idTbl).html());
            link.click();
            document.body.removeChild(link);
        }
    }
}
//-----------------------------------------------------------------------------
function generarReportePDF() {
    var fechaIni = $("#fechaIni").val();
    var fechaTer = $("#fechaTer").val();
    var tipoMovimiento = $("#tipoMovimiento").val();
    var datos = [fechaIni, fechaTer, tipoMovimiento];

    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });

    $.ajax({
        url: "ServletReporteRemesas",
        data: {fechaIni: fechaIni, fechaTer: fechaTer, tipoMovimiento: tipoMovimiento},
        dataType: 'html',
        type: 'POST',
        success: function (retorno) {
            alert("retorno");

        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Se ha producido un error en el servidor red");
        }
    });//AJAX
}
//-------------------------------------------------------------------------



//Lista de REMITENTES POR SUCURSAL
function clienteSucursal() {
    var datos = [$("#sucursalId").val()];
    blockUI("Procesadon datos");
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "cliente/sucursal",
        data: {datos},
        dataType: 'html',
        type: 'POST',
        success: function (retorno) {
            if (retorno === "") {
                $('#bodytblCR').empty();//LIMPIAR CUERPO DE LA TABLA
                error("No hay clientes en esta sucursal");
                unBlockUI(200);
            } else {
                $('#bodytblCR').empty();//LIMPIAR CUERPO DE LA TABLA
                var datos = JSON.parse(retorno);
                unBlockUI(200);
                console.log(datos[0]);
                var num = 1;
                for (var i in datos) {
                    $('#tableRemitente tbody').append('<tr title="Selecciona el Cliente" onclick="remitente();"  style="cursor: pointer"></tr>');
                    var row = $('#tableRemitente tbody tr').last();
                    row.append('<td>' + num + '</td>');
                    row.append('<td id="idclRe" style="display: none">' + datos[i][0] + '</td>');
                    row.append('<td>' + datos[i][1] + '</td>');
                    row.append('<td>' + datos[i][2] + '</td>');
                    row.append('<td>' + datos[i][3] + '</td>');
                    row.append('<td>' + datos[i][4] + '</td>');
                    row.append('<td>' + datos[i][5] + '</td>');
                    row.append('<td style="display: none" id="estatusId">' + datos[i][6] + '</td>');
                    row.append('<td>' + datos[i][7] + '</td>');
                    num++;
                }//for
            }
        }
    });//ajax
}
/*Si cambia el porcentaje*/
function cambioPorcentaje() {
    //document.getElementById('tbMov2').innerHTML = '';
    var id = document.getElementById('remitenteId').innerHTML;
    var porcentaje = $("#porcentaje").val();
    var datos = [id, porcentaje];
    blockUI("Procesadon datos");
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "cliente/limite",
        data: {datos: datos},
        dataType: 'html',
        type: 'POST',
        success: function (retorno) {
            if (retorno === "") {
                $("#perfilCal").val("0.00");
                unBlockUI(200);
            } else {
                var datos = JSON.parse(retorno);
                unBlockUI(200);
                console.log(datos[0][0]);
                $("#perfilCal").val(datos[0][0]);
            }
        }
    });//ajax
}
function verPerfil() {
    $("#divPerfil").css("display", "none");
    $("#divContCli").css("display", "block");
    document.getElementById('tbMov2').innerHTML = '';
    //$("#pantalla").load("cliente");
}
/**
 * Información cliente remitente
 * @returns {undefined}
 */
function remitente() {
    var sucursal = $("#sucursalId").val();
    if (sucursal === "0") {
        error("No se ha seleccionado una sucursal.");
        return false;
    }
    var porcentaje = $("#porcentaje").val();
    var mes = $("#mes").val();
    $("#tableRemitente tbody").on('click', 'tr', function () {
        var idT = $('td', this).eq(1).text();
        document.getElementById('remitenteId').innerHTML = idT;
        var estatuspago = $('td', this).eq(7).text();
        var datos = [idT, porcentaje, estatuspago, sucursal, mes];
        var mensajeModal = "Cargando datos";
        blockUI(mensajeModal);
        $(document).ajaxSend(function (e, xhr, options) {
            var token = $("input[name='_csrf']").val();
            var cabecera = "X-CSRF-TOKEN";
            xhr.setRequestHeader(cabecera, token);
        });
        $.ajax({
            url: "cliente/remitente",
            data: {datos: datos},
            dataType: 'html',
            type: 'POST',
            success: function (cliente) {
                document.getElementById('tbMov2').innerHTML = '';
                document.getElementById('total').innerHTML = '';
                var datos = JSON.parse(cliente);
                $("#divContCli").css("display", "none");
                $('#tbMov2').empty();//se limpia el cuerpo de la tabla
                $("#tblBeneficiario").css("display", "block");
                $("#tblRemitente").css("display", "none");
                var num = 1;
                var total = 0;
                for (var i in datos) {
                    document.getElementById("nameCom").innerHTML = datos[i][1];
                    document.getElementById("sexoC").innerHTML = datos[i][6];
                    document.getElementById("curp").innerHTML = datos[i][2];
                    document.getElementById("rcf").innerHTML = datos[i][3];
                    document.getElementById("tipIden").innerHTML = datos[i][4];
                    document.getElementById("actEco").innerHTML = datos[i][10];
                    document.getElementById("fechNac").innerHTML = datos[i][5];
                    document.getElementById("griegoC").innerHTML = datos[i][20];
                    document.getElementById("calle").innerHTML = datos[i][13];
                    document.getElementById("colonia").innerHTML = datos[i][14];
                    document.getElementById("codigopostal").innerHTML = datos[i][15];
                    document.getElementById("ciudad").innerHTML = datos[i][16];
                    document.getElementById("estado").innerHTML = datos[i][17];
                    document.getElementById("pais").innerHTML = datos[i][18];

                    $('#tableMovimientos2 tbody').append('<tr></tr>');
                    var row = $('#tableMovimientos2 tbody tr').last();

                    row.append('<td>' + num + '</td>');
                    row.append('<td>' + datos[i][7] + '</td>');//clave pago
                    row.append('<td>' + datos[i][19] + '</td>');//beneficiario
                    row.append('<td>' + "$" + datos[i][8] + '</td>');//monto
                    row.append('<td>' + datos[i][9] + '</td>');//cantidad envios
                    row.append('<td>' + datos[i][11] + '</td>');//fehca envio
                    row.append('<td>' + datos[i][12] + '</td>');//sucursal
                    total = total + datos[i][8];
                    //console.log(total);
                    num++;
                }//for
                unBlockUI(800);
                //**********Cpnsulta si ya cuenta con un perfil***************
                var porcentaje = $("#porcentaje").val();
                var datos = [idT, porcentaje, estatuspago];
                $.ajax({
                    url: "cliente/limite",
                    data: {datos: datos},
                    dataType: 'html',
                    type: 'POST',
                    success: function (retorno) {
                        if (retorno.length !== 0) {
                            var datos = JSON.parse(retorno);
                            $("#perfilCal").val(datos[0], [0]);
                            $("#total").val(total);
                            $("#divPerfil").css("display", "block");
                        } else {
                            $("#perfilCal").val("0.00");
                            $("#divPerfil").css("display", "block");
                            $("#total").val(total);
                        }//else
                    }
                });//ajaxsegundapeticion
            }, //retorno
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Se ha producido un error en el servidor");
            }
        });//ajax
    });//tabla
}
/**
 * Funcion para ver Remesas en general
 * por sucursal, periodo y estatus 
 * @returns {undefined}
 */
function verRemesas() {
    var sucursal = $("#sucursalId").val();
    var periodo = $("#periodoId").val();
    var estatus = $("#estatusId").val();
    var datos = [sucursal, periodo, estatus];
    if (sucursal === '0' || periodo === '0' || estatus === '0') {
        error("Falta seleccionar datos");
        return false;
    }
    $("#tbInfo").empty();//LIMIAR EL CUERPO DE LA TABLA
    var mensajeModal = "Cargando datos";
    blockUI(mensajeModal);
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "remesa/datos",
        data: {datos: datos},
        dataType: 'html',
        type: 'POST',
        success: function (cliente) {
            var datos = JSON.parse(cliente);
            if (datos.length === 0) {
                ok("No hay datos para mostrar");
                unBlockUI(800);
            } else {
                var num = 1;
                for (var i in datos) {
                    $('#tblEnvio tbody').append('<tr></tr>');
                    var row = $('#tblEnvio tbody tr').last();

                    row.append('<td>' + num + '</td>');
                    row.append('<td>' + datos[i][0] + '</td>');//claveRemesa
                    row.append('<td>' + datos[i][1] + '</td>');//remitente
                    row.append('<td>' + datos[i][2] + '</td>');//beneficiario
                    if (estatus === '1') {
                        row.append('<td>' + datos[i][8] + '</td>');//8 pago Folio
                    } else {
                        row.append('<td>' + datos[i][7] + '</td>');// envio Folio
                    }
                    row.append('<td>' + datos[i][4] + '</td>');//monto
                    row.append('<td>' + datos[i][3] + '</td>');//fecha
                    row.append('<td>' + datos[i][5] + '</td>');//moneda
                    row.append('<td>' + datos[i][6] + '</td>');//moviCaja
                    if (datos[i].length === 10) {
                        row.append('<td>' + datos[i][9] + '</td>');//descripcion
                    } else {
                        row.append('<td>' + '' + '</td>');
                    }

                    num++;
                }
                unBlockUI(800);
            }//else de datos
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Se ha producido un error en el servidor");
        }
    });

}
/***
 * Busqueda de la remesa internacional
 * @returns {undefined}
 */
function conexionWebService() {
    if ($('#cveRemesaI').val().length !== 0) {
        $('#westerunion').css("background-color", "#4CB630");
        ok("Se encontro el envi&oacute");
        setTimeout(function () {
            color_div_paso_1();//se colorea el paso1
            $('#frmModalIn').css("display", "none");//oculta clave  remesa
            $('#frmModalIn').modal('hide');//cierra ventana modal
            $('#pasosIn').css("display", "block");//pasos
            $("#divdatosBeneRemitenteIn").css("display", "block");//despliega formulario
        }, 500);
    }
}
function vistaBuscarCliente() {
    $("#divdatosBeneRemitenteIn").css("display", "none");//no despliega formulario
    $("#agenteOrigen").css("display", "none");//info agente oculto
    color_div_paso_2();//se colorea el paso2 
    $('#divpersonafisica').css("display", "block");
    $('#divBuscaPersonaIdentificacion').css("display", "block");
    $('#infoValidar').css("display", "block");
    $('#btnReInter').css("display", "block");

}
function regresarPaso1() {
    $("#divdatosBeneRemitenteIn").css("display", "block");//despliega formulario
    color_div_paso_2_anterior();//despinta paso 2
    $('#divpersonafisica').css("display", "none");
    $('#divBuscaPersonaIdentificacion').css("display", "none");
    $('#btnReInter').css("display", "none");
    $('#agenteOrigen').css("display", "none");
}
function pagarRemesaInt() {
    if (validaPersonaFisica() !== false) {
        if ($("#instrumentoMonetario").val() !== "0") {
            if ($("#tipoServicio").val() !== "0") {
                if ($("#usoDinero").val() !== "0") {
                    if ($("#parentesco").val() !== "0") {
                        //Datos del beneficiario cliente
                        var clavePersonaFisica = $("#clavePersonaFisica").val();
                        var nombrepersonafisica = $("#nombrepersonafisica").val().trim();
                        var apaternofisica = $("#apaternofisica").val().trim();
                        var amaternofisica = $("#amaternofisica").val().trim();
                        var curpfisica = $("#curpfisica").val().trim();
                        var sexofisica = $("#sexofisica").val().trim();
                        var fechanacimiento = $("#fechanacimiento").val();
                        var noidentificacion = $("#noidentificacion").val().trim();
                        var tipoIdentificacion = $("#tipoIdentificacion").val().trim();
                        var identificacionSt = $("#statusIdentificacion").val().trim();
                        var actividad = $("#actividad").val().trim();
                        var emailfisica = $("#emailfisica").val().trim();
                        var rfcfisica = $("#rfcfisica").val().trim();
                        var callefisica = $("#callefisica").val().trim();
                        var coloniafisica = $("#coloniafisica").val().trim();
                        var codigopostal = $("#codigopostalfisica").val().trim();
                        var telefonofisica = $("#telefonofisica").val().trim();
                        var tipoTelefonofisica = $("#tipoTelefonofisica").val().trim();
                        var instrumentoMonetario = $("#instrumentoMonetario").val().trim();
                        var tipoServicio = $("#tipoServicio").val().trim();
                        var cveRemesa = $('#cveRemesaI').val().trim();
                        var causaRechazoId = $("#causaRechazoId").val().trim();
                        var usoDinero = $("#usoDinero").val().trim();
                        var parentesco = $("#parentesco").val().trim();
                        //remitente
                        var nomRemitente = document.getElementById('nombresRe').innerHTML;
                        var apellidosRemitente = document.getElementById('apellidosRe').innerHTML;

//extrae datos de las etiquetas para ser usadas
                        var cantEnviada = document.getElementById('cantEnvIn').innerHTML;
                        var cantPagada = document.getElementById('cantPagIn').innerHTML;
                        var montoEnviado = cantEnviada.split(" ");//se corta la cadena
                        var montoEnv = montoEnviado[0].split('$');//para solo dejas el valor numerico
                        var montoPago = cantPagada.split(" ");
                        var montoPagado = montoPago[0].split('$');
                        var monedaDivisa = 1;//1:moneda MEXICANA document.getElementById('monedaPago').innerHTML;
                        //datos de la emisora que envía
                        var cdEmisora = document.getElementById('cdAgente').innerHTML;
                        var paisEmisora = document.getElementById('paisAgente').innerHTML;
                        var calleEmisora = document.getElementById('calleEmisora').innerHTML;
                        var correoEmisora = document.getElementById('correoEmisora').innerHTML;
                        var nombreEmisora = document.getElementById('nombreEmisora').innerHTML;
                        var noEmisora = document.getElementById('noEmisora').innerHTML;
                        var colEmisora = document.getElementById('colEmisora').innerHTML;
                        var cpEmisora = document.getElementById('cpEmisora').innerHTML;
                        var estadoEmisora = document.getElementById('EstadoAgente').innerHTML;
                        //datos encargado emisora
                        var nombreEncargado = document.getElementById('encargadoNombre').innerHTML;
                        var apellidosEncargado = document.getElementById('encargadoApellidos').innerHTML;
                        var arreglo = apellidosEncargado.split(" ");//se separan los apellidos
                        var apellidoPat = arreglo[0];
                        var apellidoMat = arreglo[1];
                        var curpEncargado = document.getElementById('curpEncargado').innerHTML;
                        var sexoEncargado = document.getElementById('sexoEncargado').innerHTML.toUpperCase();//pasa texto
                        var idsexo;
                        if (sexoEncargado === 'MUJER') {
                            idsexo = 2;
                        } else {
                            idsexo = 3;//hombre
                        }
                        /**
                         * Si se cancela
                         * @type Array
                         */
                        if (causaRechazoId !== '0') {
                            alert("Remesa cancelada");
                            //enviar motivo a la Remesadora
                            //conexion WEBservice                            
                        } else {
                            var datos = [clavePersonaFisica, nombrepersonafisica, amaternofisica,
                                apaternofisica, curpfisica, sexofisica,
                                fechanacimiento, noidentificacion, tipoIdentificacion,
                                identificacionSt, actividad, emailfisica,
                                rfcfisica, callefisica, coloniafisica,
                                codigopostal, telefonofisica, tipoTelefonofisica, //18generacliente
                                instrumentoMonetario, tipoServicio, cveRemesa, //21
                                causaRechazoId, usoDinero, parentesco, //24
                                montoEnv[1].trim(), montoPagado[1].trim(), monedaDivisa, //27
                                cdEmisora.trim(), paisEmisora.trim(), calleEmisora.trim(), //30
                                correoEmisora.trim(), nombreEmisora.trim(), noEmisora.trim(), //33
                                nombreEncargado.trim(), apellidoPat.trim(), apellidoMat.trim(),
                                curpEncargado.trim(), idsexo, colEmisora.trim(),
                                cpEmisora.trim(), estadoEmisora.trim(), nomRemitente.trim(),
                                apellidosRemitente.trim()];//41
                            //console.log(datos);
                            $(document).ajaxSend(function (e, xhr, options) {
                                var token = $("input[name='_csrf']").val();
                                var cabecera = "X-CSRF-TOKEN";
                                xhr.setRequestHeader(cabecera, token);
                            });
                            $.ajax({
                                url: "pagoInternacional/registrarPago",
                                data: {datos: datos},
                                dataType: 'html',
                                type: 'POST',
                                success: function (datoPago) {
                                    notificacionRelevant();//verifica si es operacion relevante
                                    $("#divpersonafisica").css("display", "none");
                                    $('#btnReInter').css("display", "none");
                                    $("#divImprimirTicket").css("display", "block");
                                    color_div_paso_3();
                                    var datosPagoIn = JSON.parse(datoPago);
                                    console.log(datosPagoIn);
                                    if (datosPagoIn[0] === 'error') {
                                        error("Se ha registrado la remesa");
                                    }
                                    //REMITENTE pantalla
                                    var nomRemitente = document.getElementById('nombresRe').innerHTML;
                                    document.getElementById('nomRemitente').innerHTML = nomRemitente;
                                    var apellidosRemitente = document.getElementById('apellidosRe').innerHTML;
                                    document.getElementById('apellidosRemitente').innerHTML = apellidosRemitente;
                                    var ciudadEnvio = document.getElementById('cdEnvio').innerHTML;
                                    document.getElementById('ciudadEnvi').innerHTML = ciudadEnvio;
                                    //BENEFICIARIO pantalla
                                    document.getElementById('claveRecibo').innerHTML = datosPagoIn[0];
                                    document.getElementById('monto').innerHTML = datosPagoIn[5];
                                    document.getElementById('nomBeneficario').innerHTML = datosPagoIn[1];
                                    document.getElementById('apellidosBeneficario').innerHTML = datosPagoIn[2] + " " + datosPagoIn[3];
                                    document.getElementById('telBeneficario').innerHTML = datosPagoIn[4];

                                },
                                error: function (jqXHR, textStatus, errorThrown) {
                                    alert("Se ha producido un error en el servidor");
                                }
                            });
                        }//si no se cancela
                    } else {
                        error("Selecciona el parentesco");
                    }
                } else {
                    error("Selecciona el Uso del Dinero");
                }
            } else {
                error("Selecciona el tipo de servicio");
            }
        } else {
            error("Selecciona el instrumento monetario");
        }
    }
}
/***
 * Funcion imprimir PDF
 * @returns {undefined}
 */
function generarT(url) {
    //window.opener(url, "ComprobantePago", "directories=no, location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no, width=800, height=500");
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: url,
        dataType: 'html',
        type: 'GET',

    });//ajax
}

/*VALIDACIONES*/
function validarEmail(valorEmail) {
    var valEmail = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!valEmail.test(valorEmail)) {
        error("El correo no es valido");
        return false;
    }
}
function  validarCURP(valorCurp) {
    var valCurp = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/,
            formato = valorCurp.match(valCurp);
    if (!formato) { //sino coincide
        error("El formato de la CURP no coincide");
        return false;
    }
}
function  validarTelefono(id, valorTel) {
    var valTel = /^([0-9]+)$/;
    var length = $(id).val().length;
    $("#mensajeT").remove();
    if (!valTel.test(valorTel) || length > 12 || length < 7) {
        $(id).after("<p style='color:red' id='mensajeT'>La longitud maxima  " + 12 + "caracteres longitud m&iacutenima 7,usted escribio " + length + " caracteres</p>");
        error("El n&uacutemero no es valido");
        return false;
    }
}
function validarNombre(valorNombre) {
    var valNom = /^(([A-Za-zñÑáéíóúÁÉÍÓÚ\s]+){3,50})$/;
    if (!valNom.test(valorNombre)) {
        error("El nombre o apellido no es valido");
        //error("La longitud m&aacutexima es de 50 caracteres");
        return false;
    }
}
function validarNickname(valorNickname) {
    var valNick = /^([A-Za-z]{6,})$/;
    if (!valNick.test(valorNickname)) {
        error("El ninckname debe contener m&iacutenimo 6 caracteres, no se admiten carcteres especiales");
        return false;
    }
}
function validarPassword(valorPassword) {
    var valPass = /^(([a-zA-Z0-9!#@$%&'*+\/=?^_-]){6,})$/;
    if (!valPass.test(valorPassword)) {
        error("El password debe contener m&iacutenimo 6 caracteres");
        return false;
    }
}
function validarCalle(valorCalle) {
    var valCalle = /^([A-Za-z0-9#.\s]{5,50})$/;
    if (!valCalle.test(valorCalle)) {
        error("La direcci&oacuten no es valida,\n\
 longitud m&iacutenima de 5 caracteres.");
        return false;
    }
}
function validarColonia(valorColonia) {//VALIDAR Q SI LLVE ACENTOS
    var valColonia = /^([A-Za-z0-9#.\s]{4,50})$/;
    if (!valColonia.test(valorColonia)) {
        error("La colonia no es valida,\n\
 longitud m&iacutenima de 4 caracteres.");
        return false;
    }
}
function generaReporteExcel(accion) {
    var valores = [];
    if (accion === 'preocupante') {
        $("#tbEdPre td").each(function () {
            var listado = $(this).text();
            valores.push(listado);
        });
        var servicio = $("#idOperacion").val();
        valores[7] = "'" + servicio;
        var actividad = $("#idActividad").val();
        valores[27] = "'" + actividad;
        var instrumento = $("#idIntrumento").val();
        valores[8] = "'" + instrumento;
        var moneda = $("#idMonedaD").val();
        valores[11] = moneda;
        $('#tblOpPreR tbody').append('<tr></tr>');
        var cont = 41;//para crear un nuevo renglon
        for (var i in valores) {
            var part = valores[i].substring(0, 1);
            var dato;
            if (part === '0') {
                dato = "'" + valores[i];
            } else {
                dato = '' + valores[i] + '';
            }
            if (parseInt(i) === cont) {
                $('#tblOpPreR tbody').append('<tr></tr>');
                cont = cont + 41;
            }
            var row = $('#tblOpPreR tbody tr').last();
            row.append('<td>' + dato + '</td>');
        }
        reportExcel('#divTblInP');
    }
    if (accion === 'inusual') {
        $("#tbEdInu td").each(function () {
            var listado = $(this).text();
            valores.push(listado);
        });
        $('#tblOpInuR tbody').append('<tr></tr>');
        var cont = 41;//para crear un nuevo renglon
        for (var i in valores) {
            var part = valores[i].substring(0, 1);
            var dato;
            if (part === '0') {
                dato = "'" + valores[i];
            } else {
                dato = '' + valores[i] + '';
            }
            if (parseInt(i) === cont) {
                $('#tblOpInuR tbody').append('<tr></tr>');
                cont = cont + 41;
            }
            var row = $('#tblOpInuR tbody tr').last();
            row.append('<td>' + dato + '</td>');
        }
        reportExcel('#divTblInu');
    }
}
/**************IMPORTAR DATOS excel a Base*******************************/
var oFileIn;
//Código JQuery
if (window.location.pathname === "/Transmisor/giro") {
    $(function () {
        oFileIn = document.getElementById('my_file_input');
        if (oFileIn.addEventListener) {
            oFileIn.addEventListener('change', filePicked, false);
        }
    });
}
//Método que hace el proceso de importar excel a base
function filePicked(oEvent) {
// Obteniendo el archivo
    var oFile = oEvent.target.files[0];
    var sFilename = oFile.name;
// Create A File Reader HTML5
    var reader = new FileReader();
// Leyendo los eventos cuando el archivo ha sido seleccionado
    reader.onload = function (e) {
        var data = e.target.result;
        var cfb = XLSX.read(data, {type: 'binary'});
        //console.log(cfb);
        cfb.SheetNames.forEach(function (sheetName) {
            // Obtener la fila actual como CSV
            var sCSV = XLSX.utils.make_csv(cfb.Sheets[sheetName]);
            var data = XLSX.utils.sheet_to_json(cfb.Sheets[sheetName], {
                header: 1
            });
            var arreglo = [];
            $.each(data, function (indexR, valueR) {
                $.each(data[indexR], function (indexC, valueC) {
                    arreglo.push(valueC);
                });
                console.log(arreglo);
            });
            var mensajeModal = "Procesando informaci&oacute;n";
            blockUI(mensajeModal);
            agregarGiroExcel(arreglo);
        });
    };
// Llamar al JS Para empezar a leer el archivo .. Se podría retrasar esto si se desea
    reader.readAsBinaryString(oFile);
}

function agregarGiroExcel(arreglo) {
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });

    $.ajax({
        url: "giro/agregarGiro",
        data: {datos: arreglo},
        dataType: 'html',
        type: 'POST',
        success: function (retorno) {
            //alert(retorno);
            switch (retorno) {
                case 'errorDato':
                    alert("Los datos no se procesaron correctamente");
                    unBlockUI(700);
                    break;
                case 'error':
                    alert("Se ha producido un error en el servidor");
                    unBlockUI(700);
                    break;
                case 'exito':
                    //carga lo que se indica en id DIV cambiar
                    ok("Los datos se procesarón CORRECTAMENTE!");
                    setTimeout(function () {
                        location.href = "giro";
                    }, 1000);
                    unBlockUI(900);
                    break;
                case 'errorAcceso':
                    alert("No ha iniciado sesion \n Carga masiva de datos");
                    setTimeout(function () {
                        location.href = "giro";
                    }, 1000);
                    unBlockUI(800);
                    break;
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.status === 0) {
                alert('Not connect: Verify Network.');
            } else if (jqXHR.status === 404) {
                alert('Requested page not found [404]');
            } else if (jqXHR.status === 500) {
                alert('Internal Server Error [500].\n El intento de conexión falló.');
            } else if (textStatus === 'parsererror') {
                alert('Requested JSON parse failed.');
            } else if (textStatus === 'timeout') {
                alert('Time out error.');
            } else if (textStatus === 'abort') {
                alert('Ajax request aborted.');
            } else {
                alert('Uncaught Error: ' + jqXHR.responseText);
            }
            //alert("Se ha producido un error en el servidor red");
        }
    });//AJAX
}
/**
 * Funcion para autorizar remesa PEP/PBA, verifica en base si se autorizo
 */
function verificarClaveAutorizacion() {
    var datos = [$("#claveAutorizacion").val()];

//se inserta en basee el codigo, con el pago
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });

    $.ajax({
        url: "verificarAutorizacion",
        data: {datos: datos},
        dataType: 'html',
        type: 'POST',
        success: function (retorno) {
            //alert(retorno);
            switch (retorno) {
                case 'erroRemesa':
                    error("No existe la remesa");
                    break;
                case 'error':
                    error("La clave no es correcta");
                    break;
                case 'exito':
                    //oculta la entana modal y muestra el cliente
                    $("#LogIn").modal('hide');
                    $("#datosBeneRemitente").css("display", "none");
                    $("#infoEstaticaRemitente").css("display", "block");
                    $("#infoValidar").css("display", "block");
                    //carga lo que se indica en id DIV cambiar
                    ok("Los datos se procesarón CORRECTAMENTE!");
                    break;
                case 'errorAcceso':
                    alert("No ha iniciado sesion \n Carga masiva de datos");
                    break;
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Se ha producido un error en el servidor red");
        }
    });//AJAX


}
/**
 * Genrea el codigo de autorizacon de remesa PEP/PBA
 * @returns CODIGO
 */
function generarCodigoAutorizacion() {

    var clavRemesa = $("#claveAutorizar").val();
    var letras = new Array('C', 'X', 'Y', 'T', 'D', 'H');
    var codigo = (Math.floor(Math.random() * 50000)) + letras[Math.floor(Math.random() * letras.length)];

    var datos = [codigo, clavRemesa];

//se inserta en basee el codigo, con el pago
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });

    $.ajax({
        url: "codigoAutorizacion",
        data: {datos: datos},
        dataType: 'html',
        type: 'POST',
        success: function (retorno) {
            //alert(retorno);
            switch (retorno) {
                case 'erroRemesa':
                    error("La clave de la remesa no existe");
                    break;
                case 'error':
                    alert("Se ha producido un error en el servidor datos no guardados");
                    break;
                case 'exito':
                    $("#codigoGenerado").val(codigo);
                    //carga lo que se indica en id DIV cambiar
                    ok("Los datos se procesarón CORRECTAMENTE!");
                    break;
                case 'errorAcceso':
                    alert("No ha iniciado sesion \n Carga masiva de datos");
                    break;
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Se ha producido un error en el servidor red");
        }
    });//AJAX

}


function validarCampos() {
    var tipoMovimiento = document.getElementById("tipoMovimiento").value;
    var fechaIni = document.getElementById("fechaIni").value;
    var fechaTer = document.getElementById("fechaTer").value;


    if (tipoMovimiento === "0") {
        error("No se ha seleccionado Movimiento");
        return false;
    }
    if (fechaIni === "" || fechaTer === "") {
        error("No se ha establecido un rango de fechas");
        return false;
    }
    return true;


}
