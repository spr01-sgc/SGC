/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//------------------------>MODULO ONTABILIDAD<----------------------------//
function limpiarForm(frm) {
    document.getElementById(frm).reset();
}
function btnCuentas() {
    //agregar usuario se deshabilita el boton actualizar
    $("#guardarCuentas").css("display", "inline");
    $("#actualizarCuentas").prop("disabled", true);

}
function btnCuentaSat() {
    //agregar banco se deshabilita el boton actualizar
    $("#btnactualizarCuentaSat").prop("disabled", true);
    $("#btbguardarCuentaSat").css("display", "inline");

}
function btnBancosSat() {
    //agregar banco se deshabilita el boton actualizar
    $("#btnactualizarBancoSat").prop("disabled", true);
    $("#btbguardarBancoSat").css("display", "inline");

}
function btnBancos() {
    //agregar banco se deshabilita el boton actualizar
    $("#btnactualizarBancos").prop("disabled", true);
    $("#btbguardarBancos").css("display", "inline");
}
function btnMovimientoCaja() {
    //agregar banco se deshabilita el boton actualizar
    $("#btnactualizarMovimientoCaja").prop("disabled", true);
    $("#btbguardarMovimientoCaja").css("display", "inline");
}
function btnMetodosP() {
    //agregar banco se deshabilita el boton actualizar
    $("#btnactualizarMPago").prop("disabled", true);
    $("#btnguardarMPago").css("display", "inline");
}
function btnMoneda() {
    //agregar banco se deshabilita el boton actualizar
    $("#btnactualizarMoneda").prop("disabled", true);
    $("#btnguardarMoneda").css("display", "inline");
}
function btnFondoGeneral() {
    //agregar banco se deshabilita el boton actualizar
    $("#btnactualizarFondoG").prop("disabled", true);
    $("#btnguardarFondoG").css("display", "inline");
}
function btnPeriodo() {
    //agregar banco se deshabilita el boton actualizar
    $("#btnactualizarPeriodo").prop("disabled", true);
    $("#btnguardarPeriodo").css("display", "inline");
}
function btnPrueba() {
    //agregar banco se deshabilita el boton actualizar
    $("#btnactualizarPrueba").prop("disabled", true);
    $("#btnguardarPrueba").css("display", "inline");
}
function btnProveedores() {
    //agregar banco se deshabilita el boton actualizar
    $("#btnactualizarProveedores").prop("disabled", true);
    $("#btbguardarProveedores").css("display", "inline");
}
function btnFondosCaja() {
    //agregar banco se deshabilita el boton actualizar
    $("#btnactualizarFondo").prop("disabled", true);
    $("#btbguardarFondo").css("display", "inline");
}
//----catalogo cuentas contables-----//
function verificarCatalogo() {
    var cuentaid = [$("#cuentaid").val().trim()];
    var mensajeModal = "Buscando id";
    blockUI(mensajeModal);
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "cuentasContables/verificarCatalogo",
        data: {datos: cuentaid},
        dataType: 'html',
        type: 'POST',
        success: function (retorno) {
            if (retorno.length !== 0) {
                $("#cuentaid").focus();
                error("El Id de la cuenta" + cuentaid + " ya existe");
                unBlockUI(200);
            } else {
                ok("El Id de la cuenta " + cuentaid + " esta disponible");
                unBlockUI(200);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Se ha producido un error en el servidor");
        }
    });
}

function agregarCuentas() {
    var cuentaid = $("#cuentaid").val().trim();

    var acumula = $("#acumula").val().trim();
    var nombre = $("#nombre").val().trim();
    var tipo = $("#cvetipo").val();
    var naturaleza = $("#naturalezaid").val().trim();
    var rubro = $("#rubroid").val().trim();
    var cod_agrupador = $("#ctacontid").val().trim();

    if (cuentaid === '' || acumula === '' || nombre === '' ||
            tipo === '' || naturaleza === '' || rubro === '' || cod_agrupador === '') {
        error("Hay campos vacios");
        return false;
    }
    if (tipo === '0') {
        error("No ha seleccionado una opción en el campo Tipo");
        return false;

    }
    if (naturaleza === '0') {
        error("No ha seleccionado una opción en el campo Naturaleza");
        return false;
    }
    if (rubro === '0') {
        error("No ha seleccionado una opción en el campo Rubro");
        return false;
    }

//    
//    if (validarAcumula(acumula) === false) {
//        return false;
//    }

//    if (validarNombre(nombre) === false) {
//      return false;
//    }
//    if (validarTipo(tipo) === false) {
//        return false;
//    }
//    if (validarNaturaleza(naturaleza) === false) {
//        return  false;
//    }
//    if (validarRubro(rubro) === false) {
//        return false;
//    }
//    if (validarCod_agrupador(cod_agrupador) === false) {
//        return false;
//    }

    var datos = [cuentaid, acumula, nombre, tipo, naturaleza, rubro, cod_agrupador];
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "cuentasContables/agregarCuentas",
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
                        location.href = "cuentasContables";
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


function actualizarCuentasC() {
    var catalogo_Id = $("#catalogo_Id").val();
    var cuentaid = $("#cuentaid").val();
    var acumula = $("#acumula").val();
    var nombre = $("#nombre").val();

    var tipo = $("#cvetipo").val();
    var naturaleza = $("#naturalezaid").val();
    var rubro = $("#rubroid").val();
    var codagrupador = $("#ctacontid").val();
    if (cuentaid === '' || acumula === '' || nombre === '' ||
            tipo === '' || naturaleza === '' || rubro === '' || codagrupador === '') {
        error("Hay campos vacios");
        return false;
    }
    if (tipo === '0') {
        error("No ha seleccionado una opción en el campo Tipo");
        return false;

    }
    if (naturaleza === '0') {
        error("No ha seleccionado una opción en el campo Naturaleza");
        return false;
    }
    if (rubro === '0') {
        error("No ha seleccionado una opción en el campo Rubro");
        return false;
    }

//    }
//     if (validarCod_agrupador(cod_agrupador) === false) {
//        return false;
//    }
    var datos = [catalogo_Id, cuentaid, nombre, acumula, tipo, naturaleza, rubro, codagrupador];
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "cuentasContables/actualizarCuentas",
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
                    alert("Se utilizan los datos en otra tabla");
                    break;
                case 'exito':
                    ok("Los datos se procesarón CORRECTAMENTE!");
                    setTimeout(function () {
                        location.href = "cuentasContables";
                    }, 1000);
                    break;
                case 'errorAcceso':
                    alert("No ha iniciado sesion");
                    break;
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Se ha producido un error en el servidor" + jqXHR + textStatus + errorThrown);
        }
    });

}
function mostrarCuentas() {
    $("#guardarCuentas").css("display", "none");//oculta el boton guardar
    $("#actualizarCuentas").prop("disabled", false);//habilita el boton actualizar
    //al dar clic lo que tiene en el renglo lo pase a la caja de texto
    $("#tblCatalogoCC tbody").on('click', 'tr', function () {
//id de usuario a actualizar
        var idT = $('td', this).eq(0).text();
        $("#catalogo_Id").val(idT);
//informacion del usuario
        var cuentaidT = $('td', this).eq(2).text();
        $("#cuentaid").val(cuentaidT);
        var acumulaT = $('td', this).eq(3).text();
        if (acumulaT === "") {
            acumulaT = 0;
        }
        $("#acumula").val(acumulaT);
        var nombreT = $('td', this).eq(5).text();
        $("#nombre").val(nombreT);
        var tipoT = $('td', this).eq(6).text();
        $("#cvetipo").val(tipoT);
        var naturalezaT = $('td', this).eq(8).text();
        $("#naturalezaid").val(naturalezaT);
        var rubroT = $('td', this).eq(10).text();
        $("#rubroid").val(rubroT);
        var codagrupadorT = $('td', this).eq(12).text();

        if (codagrupadorT === "") {
            codagrupadorT = 0;
        }
        $("#ctacontid").val(codagrupadorT);
    });
}
function eliminarCuentasC(idacumula) {
//    $("#tblCatalogoCC tbody").on('click', 'tr', function () {
//        var idT = $('td', this).eq(0).text();
//        $("#catalogo_Id").val(idT);
//        var id = $("#catalogo_Id").val();
//        if (id === '') {
//            error("NO se ha seleccioando la cuenta");
//            return false;
//        }
    var datos = [idacumula];
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "cuentasContables/eliminarCuentas",
        data: {datos: datos},
        dataType: 'html',
        type: 'POST',
        success: function (retorno) {
            //alert(retorno);
            switch (retorno) {
                case 'errorDato':
                    alert("Los datos no se procesaron correctamente");
                    break;
                case 'tiene acumualdos':
                    error("Tiene acumulados");
                    break;

                case 'error':
                    error("no puedes eliminar este dato");
                    break;
                case 'exito':
                    ok("Los datos se procesarón CORRECTAMENTE!");
                    setTimeout(function () {
                        location.href = "cuentasContables";
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
    //});
}

//----- funciones catalogo  Anexo 24 sat ----//

function agregarCuentaSat() {
    // var idbancosat = $("#idBancoSat").val().trim();
    var codagrupador = $("#codAgrupador").val().trim();
    var nombrecuentasat = $("#nombreCtaCA").val().trim();


    if (codagrupador === '' || nombrecuentasat === '') {
        error("Hay campos vacios");
        return false;
    }
//    if (cuentaid === '0' ) {
//        error("No ha seleccionado una opción");
//        return false;
//    }

//    if (validarCuentaid(cuentaid) === false) {
//        return false;
//    }
//    if (validarNombreBanco(nombrebanco) === false) {
//        return false;
//    }
//    if (validarCheque(cheque) === false) {
//        return false;
//    }
//    if (validarSaldo(saldo) === false) {
//        return  false;
//    }


    var datos = [codagrupador, nombrecuentasat];
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "catalogoCtaAnexo24/agregarCuentaSat",
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
                        location.href = "catalogoCtaAnexo24";
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
function mostrarCuentaSat() {
    $("#btbguardarCuentaSat").prop("disabled", true);//oculta el boton guardar
    $("#btnactualizarCuentaSat").prop("disabled", false);//habilita el boton actualizar
    //al dar clic lo que tiene en el renglo lo pase a la caja de texto
    $("#tableCuentaSat tbody").on('click', 'tr', function () {
//id de banco a actualizar
        var IdT = $('td', this).eq(0).text();
        $("#ctaCuentaAId").val(IdT);
//informacion del banco
        var claveT = $('td', this).eq(1).text();
        $("#codAgrupador").val(claveT);
        var conceptoT = $('td', this).eq(2).text();
        $("#nombreCtaCA").val(conceptoT);


    });
}
function actualizarCuentaSat() {
    var ctacuentaid = $("#ctaCuentaAId").val().trim();
    var codagrupadora = $("#codAgrupador").val().trim();
    var nombrecuentasat = $("#nombreCtaCA").val().trim();
    if (ctacuentaid === '' || codagrupadora === '' || nombrecuentasat === '') {
        error("Hay campos vacios");
        return false;
    }
//
//    if (validarCuentaid(cuentaid) === false) {
//        return false;
//    }
//    if (validarAcumula(acumula) === false) {
//        return false;
//    }
//    if (validarNombre(nombre) === false) {
//        return false;
//    }
//    if (validarTipo(tipo) === false) {
//        return  false;
//    }
//    if (validarNaturaleza(naturaleza) === false) {
//        return false;
//    }
//    if (validarRubro(rubro) === false) {
//        return false;
//    }
//     if (validarCod_agrupador(cod_agrupador) === false) {
//        return false;
//    }
    var datos = [ctacuentaid, codagrupadora, nombrecuentasat];
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "catalogoCtaAnexo24/actualizarCuentaSat",
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
                        location.href = "catalogoCtaAnexo24";
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
//---------->Catalogo de Bancos SAT <-----------------//
function agregarBancoSat() {
    // var idbancosat = $("#idBancoSat").val().trim();
    var clavebancosat = $("#claveBancoS").val().trim();
    var nombrebancosat = $("#nombreBancoS").val().trim();


    if (clavebancosat === '' || nombrebancosat === '') {
        error("Hay campos vacios");
        return false;
    }
//    if (cuentaid === '0' ) {
//        error("No ha seleccionado una opción");
//        return false;
//    }

//    if (validarCuentaid(cuentaid) === false) {
//        return false;
//    }
//    if (validarNombreBanco(nombrebanco) === false) {
//        return false;
//    }
//    if (validarCheque(cheque) === false) {
//        return false;
//    }
//    if (validarSaldo(saldo) === false) {
//        return  false;
//    }


    var datos = [clavebancosat, nombrebancosat];
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "catalogoBancoSat/agregarBancoSat",
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
                        location.href = "catalogoBancoSat";
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

function mostrarBancoSat() {
    $("#btbguardarBancoSat").prop("disabled", true);//oculta el boton guardar
    $("#btnactualizarBancoSat").prop("disabled", false);//habilita el boton actualizar
    //al dar clic lo que tiene en el renglo lo pase a la caja de texto
    $("#tableBancosSat tbody").on('click', 'tr', function () {
//id de banco a actualizar
        var idBancoSatT = $('td', this).eq(0).text();
        $("#idBancoSat").val(idBancoSatT);
//informacion del banco
        var claveBancoST = $('td', this).eq(1).text();
        $("#claveBancoS").val(claveBancoST);
        var nombreBancoST = $('td', this).eq(2).text();
        $("#nombreBancoS").val(nombreBancoST);


    });
}
function actualizarBancoSat() {
    var idbancosat = $("#idBancoSat").val().trim();
    var clavebancosat = $("#claveBancoS").val().trim();
    var nombrebancosat = $("#nombreBancoS").val().trim();
    if (idbancosat === '' || clavebancosat === '' || nombrebancosat === '') {
        error("Hay campos vacios");
        return false;
    }
//
//    if (validarCuentaid(cuentaid) === false) {
//        return false;
//    }
//    if (validarAcumula(acumula) === false) {
//        return false;
//    }
//    if (validarNombre(nombre) === false) {
//        return false;
//    }
//    if (validarTipo(tipo) === false) {
//        return  false;
//    }
//    if (validarNaturaleza(naturaleza) === false) {
//        return false;
//    }
//    if (validarRubro(rubro) === false) {
//        return false;
//    }
//     if (validarCod_agrupador(cod_agrupador) === false) {
//        return false;
//    }
    var datos = [idbancosat, clavebancosat, nombrebancosat];
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "catalogoBancoSat/actualizarBancoSat",
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
                        location.href = "catalogoBancoSat";
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
//-------->Catalogo Bancos<-------//
function agregarBancos() {
    var numerocuenta = $("#numcuenta").val().trim();
    var cheque = $("#cheque").val();
    var saldo = $("#saldo").val().trim();
    var cuentaid = $("#idcuenta").val().trim();
    var banco = $("#idbanco").val().trim();
    var serie = $("#serie").val();



//    if (cuentaid === '0' ) {
//        error("No ha seleccionado una opción");
//        return false;
//    }

//    if (validarCuentaid(cuentaid) === false) {
//        return false;
//    }
//    if (validarNombreBanco(nombrebanco) === false) {
//        return false;
//    }
//    if (validarCheque(cheque) === false) {
//        return false;
//    }
//    if (validarSaldo(saldo) === false) {
//        return  false;
//    }


    var datos = [numerocuenta, cheque, saldo, cuentaid, banco, serie];
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "catalogoBancos/agregarBancos",
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
                        location.href = "catalogoBancos";
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

function actualizarBancos() {
    var bancoId = $("#bancoId").val().trim();
    var numerocuenta = $("#numcuenta").val().trim();
    //  var idcuentac = $("#id").val().trim();
    var cheque = $("#cheque").val();
    var saldo = $("#saldo").val().trim();
    var cuentaid = $("#idcuenta").val().trim();
    var nombrebanco = $("#idbanco").val().trim();

    if (bancoId === '' || numerocuenta === '' || cheque === '' || saldo === '' || cuentaid === '' || nombrebanco === '') {
        error("Hay campos vacios");
        return false;
    }

    if (cuentaid === '0') {
        error("No ha seleccionado una opción en el campo Cuenta");
        return false;
    }
    if (nombrebanco === '0') {
        error("No ha seleccionado una opción en el campo Banco");
        return false;
    }
//    if (validarCuentaid(cuentaid) === false) {
//        return false;
//    }
//    if (validarAcumula(acumula) === false) {
//        return false;
//    }
//    if (validarNombre(nombre) === false) {
//        return false;
//    }
//    if (validarTipo(tipo) === false) {
//        return  false;
//    }
//    if (validarNaturaleza(naturaleza) === false) {
//        return false;
//    }
//    if (validarRubro(rubro) === false) {
//        return false;
//    }
//     if (validarCod_agrupador(cod_agrupador) === false) {
//        return false;
//    }
    var datos = [bancoId, numerocuenta, cheque, saldo, cuentaid, nombrebanco, ];
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "catalogoBancos/actualizarBancos",
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
                        location.href = "catalogoBancos";
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
function eliminarBancos(id) {
//    $("#tableBancos tbody").on('click', 'tr', function () {
//        var bancoIdT = $('td', this).eq(6).text();
//        $("#bancoId").val(bancoIdT);
//        var id = $("#bancoId").val();
//        if (id === '') {
//            error("No se ha seleccioando el banco");
//            return false;
//        }
    var datos = [id];
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "catalogoBancos/eliminarBancos",
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
                        location.href = "catalogoBancos";
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
//    });
}
function mostrarBancos() {
    $("#btbguardarBancos").prop("disabled", true);//oculta el boton guardar
    $("#btnactualizarBancos").prop("disabled", false);//habilita el boton actualizar
    //al dar clic lo que tiene en el renglo lo pase a la caja de texto
    $("#tableBancos tbody").on('click', 'tr', function () {
//id de banco a actualizar
        var bancoIdT = $('td', this).eq(0).text();
        $("#bancoId").val(bancoIdT);
//informacion del banco

        var numerocuentaT = $('td', this).eq(1).text();
        $("#numcuenta").val(numerocuentaT);
        var chequeT = $('td', this).eq(2).text();
        $("#cheque").val(chequeT);
        var saldoT = $('td', this).eq(5).text();
        $("#saldo").val(saldoT);


        var cuentaidT = $('td', this).eq(6).text();
        if (cuentaidT === "") {
            cuentaidT = 0;
        }
        $("#idcuenta").val(cuentaidT);
        var nombrebancoT = $('td', this).eq(8).text();
        $("#idbanco").val(nombrebancoT);

    });
}
////-------------->MOVIMIENTOS CAJA<---------//
function agregarMovimiento() {
    var tipomovimiento = $("#tipoServicio").val().trim();
    var nombre = $("#descripMov").val().trim();
    var aceptadepositos = $("#aceptaDepositoM").val().trim();
    var ctadepositos = $("#ctaDeposito").val();
    var aceptaretiros = $("#aceptaRetiroM").val().trim();
    var ctaretiros = $("#ctaRetiros").val().trim();
    var aplicaiva = $("#aplicaIvaM").val().trim();

    var cuentaiva = $("#ctaIva").val().trim();
    var clave = $("#MovimientoClave").val().trim();

    if (tipomovimiento === '' || nombre === '' || aceptadepositos === '' ||
            ctadepositos === '' || aceptaretiros === '' || ctaretiros === '' || aplicaiva === '' || cuentaiva === '') {
        error("Hay campos vacios");
        return false;
    }
    if (aceptadepositos === '0') {
        error("No ha seleccionado una opción");
        return false;
    }
    if (ctadepositos === '0') {
        error("No ha seleccionado una Cuenta Depositos");
        return false;
    }
    if (aceptaretiros === '0') {
        error("No ha seleccionado una opción");
        return false;
    }
    if (ctaretiros === '0') {
        error("No ha seleccionado una Cuenta Retiros");
        return false;
    }
    if (aplicaiva === '0') {
        error("No ha seleccionado una opción");
        return false;
    }
    if (cuentaiva === '0') {
        error("No ha seleccionado una Cuenta Iva");
        return false;
    }


    var datos = [tipomovimiento, nombre, aceptadepositos, ctadepositos, aceptaretiros, ctaretiros, aplicaiva, cuentaiva, clave];
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "catalogoMovimientoCaja/agregarMovimiento",
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
                        location.href = "catalogoMovimientoCaja";
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

function actualizarMovimiento() {
    var id = $("#movCajaId").val();
    var tipomovimiento = $("#tipoServicio").val();
    var nombre = $("#descripMov").val();
    var aceptadepositos = $("#aceptaDepositoM").val();
    var ctadepositos = $("#ctaDeposito").val();
    var aceptaretiros = $("#aceptaRetiroM").val();
    var ctaretiros = $("#ctaRetiros").val();
    var aplicaiva = $("#aplicaIvaM").val();
    var cuentaiva = $("#ctaIva").val();
    var clave = $("#MovimientoClave").val();
    if (tipomovimiento === '' || nombre === '' || aceptadepositos === '' || ctadepositos === '' ||
            aceptaretiros === '' || ctaretiros === '' || aplicaiva === '' || cuentaiva === '') {
        error("Hay campos vacios");
        return false;
    }

//    if (validarCuentaid(cuentaid) === false) {
//        return false;
// }
//    if (validarAcumula(acumula) === false) {
//        return false;
//    }
//    if (validarNombre(nombre) === false) {
//        return false;
//    }
//    if (validarTipo(tipo) === false) {
//        return  false;
//    }
//    if (validarNaturaleza(naturaleza) === false) {
//        return false;
//    }
//    if (validarRubro(rubro) === false) {
//        return false;
//    }
//     if (validarCod_agrupador(cod_agrupador) === false) {
//        return false;
//    }
    var datos = [id, tipomovimiento, nombre, aceptadepositos, ctadepositos, aceptaretiros, ctaretiros, aplicaiva, cuentaiva, clave];
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "catalogoMovimientoCaja/actualizarMovimiento",
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
                        location.href = "catalogoMovimientoCaja";
                    }, 1000);
                    break;
                case 'errorAcceso':
                    alert("No ha iniciado sesion");
                    break;
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Se ha producido un error en el servidor" + jqXHR + textStatus + errorThrown);
        }
    });

}
function mostrarMovimeintoCaja() {
    $("#btbguardarMovimientoCaja").prop("disabled", true);//oculta el boton guardar
    $("#btnactualizarMovimientoCaja").prop("disabled", false);//habilita el boton actualizar
    //al dar clic lo que tiene en el renglo lo pase a la caja de texto
    $("#tableMovimiento tbody").on('click', 'tr', function () {
//id de banco a actualizar
        var idT = $('td', this).eq(0).text();
        $("#movCajaId").val(idT);
//informacion del banco
        var tipomovimientoT = $('td', this).eq(1).text();
        $("#tipoServicio").val(tipomovimientoT);
        var nombreT = $('td', this).eq(3).text();
        $("#descripMov").val(nombreT);
        var claveT = $('td', this).eq(16).text();
        $("#MovimientoClave").val(claveT);

        var aceptadepositosT = $('td', this).eq(4).text();
        if (aceptadepositosT === "") {
            aceptadepositosT = 0;
        }
        $("#aceptaDepositoM").val(aceptadepositosT);
        var ctadepositosT = $('td', this).eq(6).text();
        if (ctadepositosT === "") {
            ctadepositosT = 0;
        }
        $("#ctaDeposito").val(ctadepositosT);

        var aceptarT = $('td', this).eq(8).text();
        if (aceptarT === "") {
            aceptarT = 0;
        }
        $("#aceptaRetiroM").val(aceptarT);
        var ctaretirosT = $('td', this).eq(10).text();
        if (ctaretirosT === "") {
            ctaretirosT = 0;
        }
        $("#ctaRetiros").val(ctaretirosT);
        var aceptaIT = $('td', this).eq(12).text();
        if (aceptaIT === "") {
            aceptaIT = 0;
        }
        $("#aplicaIvaM").val(aceptaIT);
        var ctaIvaT = $('td', this).eq(14).text();
        if (ctaIvaT === "") {
            ctaIvaT = 0;
        }
        $("#ctaIva").val(ctaIvaT);



    });
}

function eliminarMovimiento(id) {
//    $("#tableBancos tbody").on('click', 'tr', function () {
//        var bancoIdT = $('td', this).eq(6).text();
//        $("#bancoId").val(bancoIdT);
//        var id = $("#bancoId").val();
//        if (id === '') {
//            error("No se ha seleccioando el banco");
//            return false;
//        }
    var datos = [id];
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "catalogoMovimientoCaja/eliminarMovimiento",
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
                        location.href = "catalogoMovimientoCaja";
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
//------>metodos pago<---------7//
function agregarMPago() {
    // var idbancosat = $("#idBancoSat").val().trim();
    var clave = $("#claveMetodos").val().trim();
    var concepto = $("#conceptoMetodos").val().trim();


    if (clave === '' || concepto === '') {
        error("Hay campos vacios");
        return false;
    }
//    if (cuentaid === '0' ) {
//        error("No ha seleccionado una opción");
//        return false;
//    }

//    if (validarCuentaid(cuentaid) === false) {
//        return false;
//    }
//    if (validarNombreBanco(nombrebanco) === false) {
//        return false;
//    }
//    if (validarCheque(cheque) === false) {
//        return false;
//    }
//    if (validarSaldo(saldo) === false) {
//        return  false;
//    }


    var datos = [clave, concepto];
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "metodosPago/agregarMPago",
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
                        location.href = "metodosPago";
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

function actualizarMPago() {
    var metodoId = $("#metodoId").val().trim();
    var clave = $("#claveMetodos").val().trim();
    var concepto = $("#conceptoMetodos").val().trim();
    if (clave === '' || concepto === '') {
        error("Hay campos vacios");
        return false;
    }
//
//    if (validarCuentaid(cuentaid) === false) {
//        return false;
//    }
//    if (validarAcumula(acumula) === false) {
//        return false;
//    }
//    if (validarNombre(nombre) === false) {
//        return false;
//    }
//    if (validarTipo(tipo) === false) {
//        return  false;
//    }
//    if (validarNaturaleza(naturaleza) === false) {
//        return false;
//    }
//    if (validarRubro(rubro) === false) {
//        return false;
//    }
//     if (validarCod_agrupador(cod_agrupador) === false) {
//        return false;
//    }
    var datos = [metodoId, clave, concepto];
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "metodosPago/actualizarMPago",
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
                        location.href = "metodosPago";
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
function mostrarMetodosPago() {
    $("#btnguardarMPago").prop("disabled", true);//oculta el boton guardar
    $("#btnactualizarMPago").prop("disabled", false);//habilita el boton actualizar
    //al dar clic lo que tiene en el renglo lo pase a la caja de texto
    $("#tableMpago tbody").on('click', 'tr', function () {
//id de banco a actualizar
        var IdT = $('td', this).eq(0).text();
        $("#metodoId").val(IdT);
//informacion del banco
        var claveT = $('td', this).eq(1).text();
        $("#claveMetodos").val(claveT);
        var conceptoT = $('td', this).eq(2).text();
        $("#conceptoMetodos").val(conceptoT);


    });
}
//---------prueba---------//

function agregarPrueba() {
    // var idbancosat = $("#idBancoSat").val().trim();
    var columna1 = $("#prueba").val().trim();



    var datos = [columna1];
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "Prueba/agregarPrueba",
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
                        location.href = "Prueba";
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
function mostrarPrueba() {
    $("#btnguardarPrueba").prop("disabled", true);//oculta el boton guardar
    $("#btnactualizarPrueba").prop("disabled", false);//habilita el boton actualizar
    //al dar clic lo que tiene en el renglo lo pase a la caja de texto
    $("#tablePrueba tbody").on('click', 'tr', function () {
//id de banco a actualizar
        var IdT = $('td', this).eq(0).text();
        $("#pruebaid").val(IdT);
//informacion del banco
        var pruebaT = $('td', this).eq(1).text();
        $("#prueba").val(pruebaT);




    });
}

function actualizarPrueba() {
    var pruebaId = $("#pruebaid").val().trim();
    var columna1 = $("#prueba").val().trim();




    var datos = [pruebaId, columna1];
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "Prueba/actualizarPrueba",
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
                        location.href = "Prueba";
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
function eliminarPrueba(id) {
    var datos = [id];
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "Prueba/eliminarPrueba",
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
                        location.href = "Prueba";
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
//    });
}

//--------------Periodo------------//

function agregarPeriodo() {
    // var idbancosat = $("#idBancoSat").val().trim();
    var ejercicio = $("#ejercicioPeriodo").val().trim();
    var periodo = $("#periodoP").val().trim();
    var estatus = $("#estatus").val().trim();






    var datos = [ejercicio, periodo, estatus];
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "periodo/agregarPeriodo",
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
                        location.href = "periodo";
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
function mostrarPeriodo() {
    $("#btnguardarPeriodo").prop("disabled", true);//oculta el boton guardar
    $("#btnactualizarPeriodo").prop("disabled", false);//habilita el boton actualizar
    //al dar clic lo que tiene en el renglo lo pase a la caja de texto
    $("#tablePeriodo tbody").on('click', 'tr', function () {
//id de banco a actualizar
        var IdT = $('td', this).eq(0).text();
        $("#periodoId").val(IdT);
//informacion del banco
        var codigoT = $('td', this).eq(1).text();
        $("#ejercicioPeriodo").val(codigoT);
        var monedaT = $('td', this).eq(2).text();
        $("#periodoP").val(monedaT);
        var cambioT = $('td', this).eq(3).text();
        $("#estatus").val(cambioT);



    });
}
function actualizarPeriodo() {
    var monedaId = $("#periodoId").val().trim();
    var codigo = $("#ejercicioPeriodo").val().trim();
    var moneda = $("#periodoP").val().trim();
    var cambio = $("#estatus").val().trim();

    if (codigo === '' || moneda === '' || cambio === '') {
        error("Hay campos vacios");
        return false;
    }

    var datos = [monedaId, codigo, moneda, cambio];
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "periodo/actualizarPeriodo",
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
                        location.href = "periodo";
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

//-------->CATALOGO MONEDAS<-------//
function agregarMoneda() {
    // var idbancosat = $("#idBancoSat").val().trim();
    var codigo = $("#codigoMoneda").val().trim();
    var moneda = $("#nombreMoneda").val().trim();
    var cambio = $("#cambio").val().trim();
    var fecha = $("#fecha").val().trim();


    if (codigo === '' || moneda === '' || cambio === '' || fecha === '') {
        error("Hay campos vacios");
        return false;
    }
//    if (cuentaid === '0' ) {
//        error("No ha seleccionado una opción");
//        return false;
//    }

//    if (validarCuentaid(cuentaid) === false) {
//        return false;
//    }
//    if (validarNombreBanco(nombrebanco) === false) {
//        return false;
//    }
//    if (validarCheque(cheque) === false) {
//        return false;
//    }
//    if (validarSaldo(saldo) === false) {
//        return  false;
//    }


    var datos = [codigo, moneda, cambio, fecha];
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "catalogoMoneda/agregarMoneda",
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
                        location.href = "catalogoMoneda";
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

function actualizarMoneda() {
    var monedaId = $("#monedaId").val().trim();
    var codigo = $("#codigoMoneda").val().trim();
    var moneda = $("#nombreMoneda").val().trim();
    var cambio = $("#cambio").val().trim();
    var fecha = $("#fecha").val().trim();
    if (codigo === '' || moneda === '' || cambio === '' || fecha === '') {
        error("Hay campos vacios");
        return false;
    }

    var datos = [monedaId, codigo, moneda, cambio, fecha];
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "catalogoMoneda/actualizarMoneda",
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
                        location.href = "catalogoMoneda";
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
function mostrarMoneda() {
    $("#btnguardarMoneda").prop("disabled", true);//oculta el boton guardar
    $("#btnactualizarMoneda").prop("disabled", false);//habilita el boton actualizar
    //al dar clic lo que tiene en el renglo lo pase a la caja de texto
    $("#tableMoneda tbody").on('click', 'tr', function () {
//id de banco a actualizar
        var IdT = $('td', this).eq(0).text();
        $("#monedaId").val(IdT);
//informacion del banco
        var codigoT = $('td', this).eq(1).text();
        $("#codigoMoneda").val(codigoT);
        var monedaT = $('td', this).eq(2).text();
        $("#nombreMoneda").val(monedaT);
        var cambioT = $('td', this).eq(3).text();
        $("#cambio").val(cambioT);
        var fechaT = $('td', this).eq(4).text();
        $("#fecha").val(fechaT);


    });
}

//-------->CATALOGO PROVEEDORES<--------//
function agregarProveedor() {
    var rfc = $("#RFC").val().trim();
    var nombre = $("#nombreProveedor").val().trim();
    var pais = $("#paisid").val().trim();
    var tipoT = $("#tipotId").val();
    var tipoO = $("#tipopeId").val().trim();
    var banco = $("#bancoD").val();
    var cuenta = $("#cuentaB").val().trim();

    if (rfc === '' || nombre === '' || pais === '' ||
            tipoT === '' || tipoO === '' || banco === '' || cuenta === '') {
        error("Hay campos vacios");
        return false;
    }

    if (banco === '0') {
        error("No ha seleccionado una opción en el campo Banco");
        return false;
    }
    if (cuenta === '0') {
        error("No ha seleccionado una opción en el campo Cuenta");
        return false;
    }
    if (pais === '0') {
        error("No ha seleccionado una opción en el campo Pais");
        return false;
    }
    if (tipoT === '0') {
        error("No ha seleccionado una opción en el campo Tipo Tercero");
        return false;
    }
    if (tipoO === '0') {
        error("No ha seleccionado una opción en el campo Tipo Operacion");
        return false;
    }




//    if (validarCuentaid(cuentaid) === false) {
//        return false;
//    }
//    if (validarNombreBanco(nombrebanco) === false) {
//        return false;
//    }
//    if (validarCheque(cheque) === false) {
//        return false;
//    }
//    if (validarSaldo(saldo) === false) {
//        return  false;
//    }


    var datos = [rfc, nombre, pais, tipoT, tipoO, banco, cuenta];
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "Provedor/agregarProveedor",
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
                        location.href = "Proveedor";
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
function actualizarProveedores() {
    var proveedorId = $("#proveedorId").val().trim();
    var rfc = $("#RFC").val().trim();
    var nombre = $("#nombreProveedor").val().trim();
    var pais = $("#paisid").val().trim();
    var tipo = $("#tipotId").val().trim();
    var tipoO = $("#tipopeId").val().trim();
    var banco = $("#bancoD").val().trim();
    var cuenta = $("#cuentaB").val().trim();

    if (rfc === '' || nombre === '' || pais === '' ||
            tipo === '' || tipoO === '' || banco === '' || cuenta === '') {
        error("Hay campos vacios");
        return false;
    }

    if (banco === '0') {
        error("No ha seleccionado una opción en el campo Banco");
        return false;
    }
    if (cuenta === '0') {
        error("No ha seleccionado una opción en el campo Cuenta");
        return false;
    }
    if (pais === '0') {
        error("No ha seleccionado una opción en el campo Pais");
        return false;
    }
    if (tipo === '0') {
        error("No ha seleccionado una opción en el campo Tipo Tercero");
        return false;
    }
    if (tipoO === '0') {
        error("No ha seleccionado una opción en el campo Tipo Operacion");
        return false;
    }

//
//    if (validarCuentaid(cuentaid) === false) {
//        return false;
//    }
//    if (validarAcumula(acumula) === false) {
//        return false;
//    }
//    if (validarNombre(nombre) === false) {
//        return false;
//    }
//    if (validarTipo(tipo) === false) {
//        return  false;
//    }
//    if (validarNaturaleza(naturaleza) === false) {
//        return false;
//    }
//    if (validarRubro(rubro) === false) {
//        return false;
//    }
//     if (validarCod_agrupador(cod_agrupador) === false) {
//        return false;
//    }
    var datos = [proveedorId, rfc, nombre, pais, tipo, tipoO, banco, cuenta];
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "Proveedor/actualizarProveedor",
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
                        location.href = "Proveedor";
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
function eliminarProveedores(id) {
//    $("#tableBancos tbody").on('click', 'tr', function () {
//        var bancoIdT = $('td', this).eq(6).text();
//        $("#bancoId").val(bancoIdT);
//        var id = $("#bancoId").val();
//        if (id === '') {
//            error("No se ha seleccioando el banco");
//            return false;
//        }
    var datos = [id];
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "Proveedor/eliminarProveedor",
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
                        location.href = "Proveedor";
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
//    });
}

function mostrarProveedores() {
    $("#btbguardarProveedores").prop("disabled", true);//oculta el boton guardar
    $("#btnactualizarProveedores").prop("disabled", false);//habilita el boton actualizar
    //al dar clic lo que tiene en el renglo lo pase a la caja de texto
    $("#tableProveedor tbody").on('click', 'tr', function () {
//id de banco a actualizar
        var proveedorIdT = $('td', this).eq(0).text();
        $("#proveedorId").val(proveedorIdT);
//informacion del banco
        var rfcT = $('td', this).eq(1).text();
        $("#RFC").val(rfcT);
        var nombreT = $('td', this).eq(2).text();
        $("#nombreProveedor").val(nombreT);
        var paisT = $('td', this).eq(3).text();
        $("#paisid").val(paisT);

        var tipoT = $('td', this).eq(5).text();
        $("#tipotId").val(tipoT);
        var tipoOT = $('td', this).eq(7).text();
        $("#tipopeId").val(tipoOT);
        var bancoT = $('td', this).eq(11).text().trim();
        $("#bancoD").val(bancoT);
        var cuentaT = $('td', this).eq(11).text().trim();
        $("#cuentaB").val(cuentaT);

    });
}
//----->polizas/Informacion Adicional<----

function buscarProveedor(RfcT) {
    var clave = '';
    if (RfcT === undefined) {
        clave = $("#rfcProve").val();
    } else {
        clave = RfcT;
    }
    var datos = [clave];
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "poliza/consultarProveedor",
        data: {datos: datos},
        dataType: 'html',
        type: 'POST',
        success: function (retorno) {
            //alert(retorno);
            var datosProv = JSON.parse(retorno);
            $("#proveedor").val(datosProv[0]);
            $("#nombreProveedor").val(datosProv[0]);
            $("#paisProv").val(datosProv[1]);
            $("#tipoTercero").val(datosProv[2]);
            $("#tipOperacion").val(datosProv[3]);
            $("#bancoDestino").val(datosProv[4]);
            $("#cuentaDestino").val(datosProv[5]);


        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Se ha producido un error en el servidor");
        }
    });//ajax
}
function agregarInfo() {
    var rfc = $("#rfcProve").val();
    var pago = $("#mPago").val();
    var banco = $("#bancoOrigen").val();
    var cuenta = $("#cuentaOrigen").val();
    //var moneda = $("#monedaPolizas").val();
    var cambio = $("#cambioMoneda").val();
    var poliza = $("#polizaid").val();



    var datos = [rfc, pago, banco, cuenta, cambio, poliza];
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "poliza/agregarInformacion",
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
                        location.href = "poliza";
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
function mostratInfo() {

    $("#GuardarIA").css("display", "none");
    $("#ActualizarIA").prop("disabled", false);
    $("#tableInfoAdicional tbody").on('click', 'tr', function () {
        var IdInfoT = $('td', this).eq(0).text().trim();
        $("#info_AId").val(IdInfoT);
        var RfcT = $('td', this).eq(2).text().trim();
        $("#rfcProve").val(RfcT);
        buscarProveedor(RfcT);

        var metodoPagoT = $('td', this).eq(4).text().trim();
        $("#mPago").val(metodoPagoT);


        var bancoOrigenT = $('td', this).eq(6).text().trim();
        $("#bancoOrigen").val(bancoOrigenT);

        var cuentaOrigenT = $('td', this).eq(8).text().trim();
        $("#cuentaOrigen").val(cuentaOrigenT);

        var monedaPoliT = $('td', this).eq(10).text().trim();
        $("#monedaPolizas").val(monedaPoliT);
        var cambioMT = $('td', this).eq(12).text().trim();
        $("#cambioMoneda").val(cambioMT);
    });
}
function mostratInfo1() {

    $("#GuardarIA").prop("disabled", false);
    $("#ActualizarIA").css("display", "none");
    $("#tablePoliza tbody").on('click', 'tr', function () {

        var polizaT = $('td', this).eq(0).text().trim();
        $("#polizaid").val(polizaT);
        var datos = [polizaT];
        $(document).ajaxSend(function (e, xhr, options) {
            var token = $("input[name='_csrf']").val();
            var cabecera = "X-CSRF-TOKEN";
            xhr.setRequestHeader(cabecera, token);
        });
        $.ajax({
            url: "poliza/verificarInformacion",
            data: {datos: datos},
            dataType: 'html',
            type: 'POST',
            success: function (retorno) {
                var data = JSON.parse(retorno);
                for (var valor of data) {
                    if (valor !== null) {
                        $("#rfcProve").val(valor[4]);
                        buscarProveedor(valor[4]);
                        $("#bancoOrigen").val(valor[1]);
                        $("#mPago").val(valor[2]);
                        $("#cambioMoneda").val(valor[3]);
                        $("#cuentaOrigen").val(valor[1]);
                    }

                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Se ha producido un error en el servidor");
            }
        });
    });

}

function actualizarInformacion() {
    var IdInfo = $("#info_AId").val();
    var Rfc = $("#rfcProve").val();
    var MetodoPago = $("#mPago").val();
    var bancOrigen = $("#bancoOrigen").val();
    var cuentaOrigen = $("#cuentaOrigen").val();
    var cambioPoli = $("#cambioMoneda").val();

    var datos = [IdInfo, Rfc, MetodoPago, bancOrigen, cuentaOrigen, cambioPoli];
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "informacionAdicional/actualizarInformacion",
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
                        location.href = "poliza";
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
function eliminarInfo() {
    $("#tableInfoAdicional tbody").on('click', 'tr', function () {
        var idT = $('td', this).eq(0).text();
        $("#info_AId").val(idT);
        var id = $("#info_AId").val();
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
            url: "informacionAdicional/eliminarInformacion",
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
                            location.href = "poliza";
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
//---------->Administracion de Polizas<------------//
function btnMovimientoPoliza() {
    //agregar banco se deshabilita el boton actualizar
    $("#btnactualizarMovPoliza").prop("disabled", true);
    $("#btbguardarMovPoliza").css("display", "inline");
    $('#idcuenta option').remove();//li,mpiar combo
    verificarCuentaContable();

}
function btnPoliza() {
    //agregar banco se deshabilita el boton actualizar
    $("#btnactualizarPoliza").prop("disabled", true);
    $("#btbguardarPoliza").css("display", "inline");
}
function verTablaPolizas() {
    $('#pl').modal();
}
function btnPoliza() {
    //agregar banco se deshabilita el boton actualizar
    $("#btnactualizarPoliza").prop("disabled", true);
    $("#btbguardarPoliza").css("display", "inline");
}
function btnCbancarios() {
    //agregar banco se deshabilita el boton actualizar
    $("#btnactualizarPoliza").prop("disabled", true);
    $("#btbguardarCuentasB").css("display", "inline");
}
function verTablaPolizas() {
    $('#pl').css("display", "inline");
    $("#encabezadopoliza").css("display", "none");

}
function verTablaFondoG() {
    $('#FG').css("display", "inline");
    $("#encabezadopoliza").css("display", "none");

}
function verTablaInformacion() {
    $('#inf').css("display", "inline");
    $("#encabezadopoliza").css("display", "none");
}

function verificarNumero() {
    var tipoPoliza = $("#tipoPolizaa").val();
    var arreglo = [tipoPoliza];
    var mensajeModal = "Buscando numero";
    blockUI(mensajeModal);
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "poliza/verificarNumero",
        data: {datos: arreglo},
        dataType: 'html',
        type: 'POST',
        success: function (retorno) {
            var polizas = JSON.parse(retorno);
            // document.getElementById("#numeroContador").innerHTML=retorno.length;
            unBlockUI();
            console.log(polizas.length);
            var cant = 0;
            if (polizas.length == 0) {
                cant = 1;
            } else {
                cant = 1 + polizas.length;
            }
            $("#numeroContador").val(cant);

        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Se ha producido un error en el servidor");
        }
    });
}
function verificarCuentaContable() {
    var select = $('#idcuenta');

    var datos = [1];
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "poliza/verificarCuentaContable",
        data: {datos: datos},
        dataType: 'html',
        type: 'POST',
        success: function (retorno) {
            //alert(retorno);
            // SELECT = document.createElement("SELECT");
            //   SELECT.setAttribute("id", "idcuenta");


            var operacionS = JSON.parse(retorno);
            var s = document.getElementById('idcuenta');
            for (var l in operacionS) {
                var option = document.createElement("option");
                option.value = operacionS[l][0];
                option.text = operacionS[l][1] + operacionS[l][2];
                s.appendChild(option);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Se ha producido un error en el servidor");
        }
    });
}


function mostrarPoliza() {
    $("#btbguardarPoliza").prop("disabled", true);//oculta el boton guardar
    $("#btnactualizarPoliza").prop("disabled", false);//habilita el boton actualizar
    //al dar clic lo que tiene en el renglo lo pase a la caja de texto
    $("#tablePoliza tbody").on('click', 'tr', function () {
//id de banco a actualizar

//informacion del banco
        var tipoidT = $('td', this).eq(3).text();
        $("#tipoid").val(tipoidT);
        var fecha2T = $('td', this).eq(4).text();
        $("#fechaDetalle").val(fecha2T);

        var numero2T = $('td', this).eq(5).text();
        $("#SeriePoli").val(numero2T);
        var concepto2T = $('td', this).eq(8).text();
        $("#conceptoDetalle").val(concepto2T);


        var polizaT = $('td', this).eq(0).text().trim();
        $("#polizaid").val(polizaT);
        var datos = [polizaT];
        var cont = 1;

        var suma = 0;
        var sumaH = 0;
        $(document).ajaxSend(function (e, xhr, options) {
            var token = $("input[name='_csrf']").val();
            var cabecera = "X-CSRF-TOKEN";
            xhr.setRequestHeader(cabecera, token);
        });
        $.ajax({
            url: "poliza/verificarMovimiento",
            data: {datos: datos},
            dataType: 'html',
            type: 'POST',
            success: function (retorno) {
                var data = JSON.parse(retorno);
                console.log(data);
                for (var i in data) {
                    for (var e in data[i].movipolizaid) {
                        suma = suma + parseFloat(data[i].movipolizaid[e].debe);
                        sumaH = sumaH + parseFloat(data[i].movipolizaid[e].haber);


                        $('#tableDetalle tbody').append('<tr></tr>');
                        var row = $('#tableDetalle tbody tr').last();

                        row.append('<td>' + data[i].movipolizaid[e].catalogo_Id.cuentaid + '</td>');
                        row.append('<td>' + data[i].movipolizaid[e].referencia + '</td>');
                        row.append('<td>' + data[i].movipolizaid[e].debe + '</td>');
                        row.append('<td>' + data[i].movipolizaid[e].haber + '</td>');
                        row.append('<td>' + data[i].movipolizaid[e].descripcion + '</td>');
                        row.append(' <td>' + '<input type="button" value="Actualizar" id="mostrarMovimientosPoliza2" onclick="mostrarMovimientosPoliza();"  data-toggle="modal" data-target="#myModal10"></button>' + '</td>');



                        cont++;
                        $("#total_2").val(suma);
                        $("#tota_l").val(sumaH);

                    }//for
                    if (sumaH === suma) {

                        ok("Datos correctos");
                    } else {
                        $("#polizaDetalle").empty();
                        $("#total_2").val(0);
                        $("#tota_l").val(0);

                        error("la cantidad ingresada no es valida");
                        break;
                    }
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Se ha producido un error en el servidor");
            }
        });
    });








}
function mostrarMovimientosPoliza() {
    $("#btbguardarPoliza").prop("disabled", true);//oculta el boton guardar
    $("#btnactualizarPoliza").prop("disabled", false);//habilita el boton actualizar
    //al dar clic lo que tiene en el renglo lo pase a la caja de texto
    $("#tableDetalle").on('click', 'tr', function () {
//id de banco a actualizar

//informacion del banco
        var movidT = $('td', this).eq(0).text();
        $("#idMovPoliza").val(movidT);


        var refeT = $('td', this).eq(1).text();
        $("#referencia").val(refeT);
        var debeT = $('td', this).eq(2).text();
        $("#debe").val(debeT);
        var haberT = $('td', this).eq(3).text();
        $("#haber").val(haberT);
        var concepto2T = $('td', this).eq(4).text();
        $("#descripcionM").val(concepto2T);




        $(document).ajaxSend(function (e, xhr, options) {
            var token = $("input[name='_csrf']").val();
            var cabecera = "X-CSRF-TOKEN";
            xhr.setRequestHeader(cabecera, token);
        });

    });








}
function actualizarMovimientoPoliza() {
    var idMpoliza = $("#idMovPoliza").val().trim();
    var refe = $("#referencia").val().trim();
    //  var idcuentac = $("#id").val().trim();
    var debe = $("#debe").val();
    var haber = $("#haber").val();


    var descripcion = $("#descripcionM").val().trim();

    var datos = [idMpoliza, refe, debe, haber, descripcion];
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "poliza/actualizarMovimientosPolizas",
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
                    //ok("Los datos se procesarón CORRECTAMENTE!");
                    setTimeout(function () {
                        location.href = "poliza";
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

function actualizarPoliza() {
    var idpoliza = $("#idPoliza").val().trim();
    var tipoid = $("#tipoid").val().trim();
    //  var idcuentac = $("#id").val().trim();
    var fecha = $("#fechaDetalle").val();

    var concepto = $("#conceptoDetalle").val().trim();
    var idmovimi = $("#idMovPoliza").val().trim();
    var cuentaId = $("#cuentaDetalle").val().trim();
    var serie = $("#refDetalle").val().trim();
    var debe = $("#debDetalle").val().trim();
    var haber = $("#habDetalle").val().trim();
    var descripcion = $("#descripDetalle").val().trim();

    var datos = [idpoliza, tipoid, fecha, concepto, idmovimi, cuentaId, serie, debe, haber, descripcion];
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "poliza/actualizarPoliza",
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
                    //ok("Los datos se procesarón CORRECTAMENTE!");
                    setTimeout(function () {
                        location.href = "poliza";
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
function fechaPeriodo() {


    var fechPoli = $("#fechPoli").val();
    var fecha = Date.parse(fechPoli);
    fechat = new Date(fecha);
    var periodo = $(fechat.getMonth() + 1);
    var periodoNum = $('#period').find(":selected").text();

    if (periodoNum !== periodo) {
        ok('periodo es igual a  ' + periodoNum + 'verifique periodo');


    }

}


function agregarPoliza() {
    var tipo = $("#tipoPolizaa").val().trim();
    var fecha = $("#fechPoli").val();
    var serie = $("#serie").val().trim();
    var numero = $("#numeroContador").val();
    var concepto = $("#concept").val().trim();
    var periodo = $("#period").val().trim();
    var datos = [tipo, fecha, serie, numero, concepto, periodo];

    for (var i in lista) {
        for (var j in lista[i]) {
            datos.push(lista[i][j]);
        }
    }//for
    //GUARDAR
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "poliza/agregarPoliza",
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
                    ok("los movimientos polizan  no cuadran");
                    break;
                case 'error':
                    ok("Periodo esta cerrado");
                    break;
                case 'exito':
                    //  ok("Los datos se procesarón CORRECTAMENTE!");
                    setTimeout(function () {
                        location.href = "poliza";
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
    /*    for(var i=0;i<5;i++){
     datos.pop();
     }*/

    //FOR }


}
var lista = new Array();
function  mostrarDetalleTBL() {
    var cuenta = $('#idcuenta').find(":selected").text();
    $('#polizaDetalle1').empty();
    var idcuenta = $("#idcuenta").val().trim();

    var referencia = $("#ref").val().trim();
    var debe = $("#deb").val().trim();
    var haber = $("#hab").val().trim();
    var descripcion = $("#descrip").val().trim();
    var cont = 1;
    var datos = [idcuenta, referencia, debe, haber, descripcion, cuenta];
    lista.push(datos);
    var suma = 0;
    var sumaH = 0;
    var totalS1 = 0;

    for (var i in lista) {
        suma = suma + parseFloat(lista[i][2]);
        sumaH = sumaH + parseFloat(lista[i][3]);
        totalS1 = sumaH + suma;



        $('#tableDetalle1 tbody').append('<tr></tr>');
        var row = $('#tableDetalle1 tbody tr').last();
        row.append('<td style="display:none">' + lista[i][0] + '</td>');
        row.append('<td>' + lista[i][5] + '</td>');

        row.append('<td>' + lista[i][1] + '</td>');
        row.append('<td>' + lista[i][2] + '</td>');//debe
        row.append('<td>' + lista[i][3] + '</td>');//haber
        row.append('<td>' + lista[i][4] + '</td>');


        cont++;

        $("#todo").val(totalS1);

        $("#total2").val(suma);
        $("#total").val(sumaH);








    }//for



    // $(".modal").hide();

    limpiarForm('frmMoviPoliza');
    cerrarModal();




}
function eliminarPoliza(id, movipolizaid, info_AId) {
//    $("#tableBancos tbody").on('click', 'tr', function () {
//        var bancoIdT = $('td', this).eq(6).text();
//        $("#bancoId").val(bancoIdT);
//        var id = $("#bancoId").val();
//        if (id === '') {
//            error("No se ha seleccioando el banco");
//            return false;
//        }
    var datos = [id, movipolizaid, info_AId];
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "poliza/eliminarPoliza",
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
                        location.href = "poliza";
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
//----------->ADMINISTRACION DE CUENTAS BANCARIAS<-----------------------------//
function buscarNumeroCuenta() {
    var clave = '';
    clave = $("#bancosCuentas").val();

    var cuenta = $('#bancosCuentas').find(":selected").text();
    var datos = [clave, cuenta];
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "cuentasBancarias/consultarNumeroCuenta",
        data: {datos: datos},
        dataType: 'html',
        type: 'POST',
        success: function (retorno) {
            //alert(retorno);
            var datosCB = JSON.parse(retorno);
            $("#bancoId").val(datosCB[0]);
            $("#saldo").val(datosCB[1]);
            $("#bancoCuenta").val(datosCB[2]);
            $("#chequeB").val(datosCB[3]);
            $("#nombreCuenta").val(datosCB[4]);




        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Se ha producido un error en el servidor");
        }
    });//ajax
}
function agregarCuentasBancarias() {
    var Banco = $("#bancosCuentas").val().trim();
    var Persona = $("#Emisora").val().trim();
    var Movimiento = $("#bancarioId").val().trim();
    var Cantidad = $("#cantidad").val().trim();
    var concepto = $("#concepto").val().trim();


    var fecha = $("#fech").val();
    var serie = $("#serieB").val().trim();
    var numero = $("#numeroContador").val();
    var descripcion = $("#concepto").val();
    if (Banco === '' || Persona === '' || Movimiento === '' ||
            Cantidad === '' || concepto === '') {
        error("Hay campos vacios");
        return false;
    }

    if (Banco === '0') {
        error("No ha seleccionado una opción en el campo Banco");
        return false;
    }
    if (Movimiento === '0') {
        error("No ha seleccionado una opción en el campo Cuenta");
        return false;
    }


    var datos = [Banco, Persona, Movimiento, Cantidad, concepto, fecha, serie, numero, descripcion];


    for (var i in lista) {
        for (var j in lista[i]) {
            datos.push(lista[i][j]);
        }
    }//for
    //
    //GUARDAR
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "cuentasBancarias/agregarPoliza",
        data: {datos: datos},
        dataType: 'html',
        type: 'POST',
        success: function (retorno) {
            //alert(retorno);
            switch (retorno) {
                case 'errorFecha':
                    alert("Las fechas no son correctas");
                    break;
                case 'error':
                    alert("Se ha producido un error en el servidor");
                    break;
                case 'exito':
                    //  ok("Los datos se procesarón CORRECTAMENTE!");
                    setTimeout(function () {
                        location.href = "cuentasBancarias";
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
    /*    for(var i=0;i<5;i++){
     datos.pop();
     }*/

    //FOR }


}
var lista = new Array();
function  mostrarDetalleTBLPB() {
    $('#polizaAdmin').empty();
    var cuenta = $('#idcuenta').find(":selected").text();
    var idcuenta = $("#idcuenta").val().trim();
    var referencia = $("#ref").val().trim();
    var debe = $("#deb").val().trim();
    var haber = $("#hab").val().trim();
    var descripcion = $("#descrip").val().trim();
    var cont = 1;
    var datos = [idcuenta, referencia, debe, haber, descripcion, cuenta];
    lista.push(datos);
    var suma = 0;
    var sumaH = 0;
    var totalS1 = 0;
    for (var i in lista) {
        suma = suma + parseFloat(lista[i][2]);
        sumaH = sumaH + parseFloat(lista[i][3]);
        totalS1 = sumaH + suma;



        $('#tableAdmin tbody').append('<tr></tr>');
        var row = $('#tableAdmin tbody tr').last();
        row.append('<td style="display:none">' + lista[i][0] + '</td>');
        row.append('<td>' + lista[i][5] + '</td>');

        row.append('<td>' + lista[i][1] + '</td>');
        row.append('<td>' + lista[i][2] + '</td>');//debe
        row.append('<td>' + lista[i][3] + '</td>');//haber
        row.append('<td>' + lista[i][4] + '</td>');


        cont++;

        $("#todo1").val(totalS1);

        $("#total2").val(suma);
        $("#total").val(sumaH);








    }//for
    // $(".modal").hide();
    limpiarForm('frmMoviPoliza');
    cerrarModal();

    /* $(document).ajaxSend(function (e, xhr, options) {
     var token = $("input[name='_csrf']").val();
     var cabecera = "X-CSRF-TOKEN";
     xhr.setRequestHeader(cabecera, token);
     });
     $.ajax({
     url: "poliza/detalles",
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
     $('#btnAgregarMobPoliza').modal('hide');
     setTimeout(function () {
     location.href = "poliza";
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
     */


}
var lista = new Array();
function  mostrarDetalleTBLPB1() {
    $('#polizaAdmin').empty();

    var idcuenta = $("#bancoCuenta").val().trim();
    var ncuenta = $("#nombreCuenta").val().trim();
    var referencia = $("#concepto").val().trim();
    var debe = $("#cantidad").val().trim();
    var haber = $("#hab").val().trim();
    var descripcion = $("#descrip").val().trim();
    var cont = 1;
    var datos = [idcuenta, referencia, debe, haber, descripcion, ncuenta];
    lista.push(datos);
    var suma = 0;
    var sumaH = 0;

    for (var i in lista) {
        suma = suma + parseFloat(lista[i][2]);
        sumaH = sumaH + parseFloat(lista[i][3]);





        $('#tableAdmin tbody').append('<tr></tr>');
        var row = $('#tableAdmin tbody tr').last();
        row.append('<td style="display:none">' + lista[i][0] + '</td>');
        row.append('<td>' + lista[i][5] + '</td>');
        row.append('<td>' + lista[i][1] + '</td>');
        row.append('<td>' + lista[i][2] + '</td>');//debe
        row.append('<td>' + lista[i][3] + '</td>');//haber
        row.append('<td>' + lista[i][4] + '</td>');


        cont++;
        $("#total2").val(suma);
        $("#total").val(sumaH);







    }//for
    // $(".modal").hide();
    limpiarForm('frmMoviPoliza');
    cerrarModal();



}

function verificarNumeroB() {
    var tipoPolizaa = $("#bancarioId").val().trim();
    var arreglo = [tipoPolizaa];
    var mensajeModal = "Buscando numero";
    blockUI(mensajeModal);
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "cuentasBancarias/verificarNumero",
        data: {datos: arreglo},
        dataType: 'html',
        type: 'POST',
        success: function (retorno) {
            var polizas = JSON.parse(retorno);
            // document.getElementById("#numeroContador").innerHTML=retorno.length;
            unBlockUI();
            console.log(polizas.length);
            var cant = 0;
            if (polizas.length === 0) {
                cant = 1;
            } else {
                cant = 1 + polizas.length;
            }
            $("#numeroContador").val(cant);

        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Se ha producido un error en el servidor");
        }
    });
}

function eliminarCuentasB(id) {
//    $("#tableBancos tbody").on('click', 'tr', function () {
//        var bancoIdT = $('td', this).eq(6).text();
//        $("#bancoId").val(bancoIdT);
//        var id = $("#bancoId").val();
//        if (id === '') {
//            error("No se ha seleccioando el banco");
//            return false;
//        }
    var datos = [id];
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "cuentasBancarias/eliminaCuentaB",
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
                        location.href = "cuentasBancarias";
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
///-------->fondo caja<------------//

//-------->fondo caja<------------//

function agregarFondoCaja() {
    var movimiento = $("#tipoM").val().trim();
    var cantidadB = $("#cantidadBillete").val().trim();

    var CantidadM = $("#cantidadMoneda").val().trim();

    var fecha = $("#fechaF1").val();


    var remesa = $("#rMid").val();

    var cajeros = $("#cajeros").val().trim();
    var cajeros1 = $("#Saldocajeros").val().trim();
    var serie = $("#serieB").val().trim();
    var cajerosfondo = $("#CajeroFondo").val().trim();

    if (movimiento === '' || cantidadB === '' || CantidadM === '' ||
            CantidadM === '' || fecha === '' || cajeros === '') {
        error("Hay campos vacios");
        return false;
    }



    var datos = [movimiento, cantidadB, CantidadM, fecha, remesa, cajeros, serie, cajerosfondo, cajeros1];


    for (var i in lista) {
        for (var j in lista[i]) {
            datos.push(lista[i][j]);
        }
    }//for
    //
    //GUARDAR
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "fondoCaja/asignarSaldo",
        data: {datos: datos},
        dataType: 'html',
        type: 'POST',
        success: function (retorno) {
            //alert(retorno);
            switch (retorno) {
                case 'errorFecha':
                    alert("Las fechas no son correctas");
                    break;
                case 'error':
                    alert("Se ha producido un error en el servidor");
                    break;
                case 'exito':
                    //  ok("Los datos se procesarón CORRECTAMENTE!");
                    setTimeout(function () {
                        location.href = "fondoGeneral";
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
    /*    for(var i=0;i<5;i++){
     datos.pop();
     }*/

    //FOR }


}
function agregarFondoCaja1() {

    if (validaPersonaFisica()) {

        var caja = $("#cajeroE").val().trim();
        var Billete = $("#BilleteI").val().trim();

        var CantidadM = $("#MonedaI").val().trim();

        var fecha = $("#fechaF").val();
        var serie = $("#serie").val().trim();
        var ivaPago = $("#ivaPago").val().trim();
        var remesaE = $("#pagoRemesa").val();
        var tipoMoneda = $("#tipomoneda").val();
        var remesa = $("#tipoRemesa").val();
        var instrumentoMonetario = $("#instrumentoMonetario").val();
        var numero = $("#numeroContador").val().trim();
        var cajeros = $("#cajeros1").val().trim();
        var concepto = $("#concepto").val().trim();
        var saldoMoneda = $("#saldoMoneda").val();
        var saldoBillete = $("#saldoBillete").val();
        var cuenta1 = $("#cuentaAcumula").val().trim();
        var cuenta2 = $("#cuentaCajero").val().trim();
        
        var clavePersonaFisica = $("#clavePersonaFisica").val();
        var identificacionPersonaFisica = $("#tipoBuscaPersona").val();
        
        var nombrepersonafisica = $("#nombrepersonafisica").val();
        var apaternofisica = $("#apaternofisica").val();
        var amaternofisica = $("#amaternofisica").val();
        var curpfisica = $("#curpfisica").val();
        var sexofisica = $("#sexofisica").val();
        var fechanacimiento = $("#fechanacimiento").val();
        var noidentificacion = $("#noidentificacion").val();
        var tipoIdentificacion = $("#tipoIdentificacion").val();
        var identificacionSt = $("#statusIdentificacion").val();
        var actividad = $("#actividad").val();
        var emailfisica = $("#emailfisica").val();
        var rfcfisica = $("#rfcfisica").val();
        var callefisica = $("#callefisica").val();
        var coloniafisica = $("#coloniafisica").val();
        var codigopostal = $("#codigopostalfisica").val();
        var telefonofisica = $("#telefonofisica").val();
        var tipoTelefonofisica = $("#tipoTelefonofisica").val();
        var movimiento = $("#cajaid").val();
        var comisionCobrada = $("#ComisionCobrada").val();
        var ivaCobrado = $("#IvaCobrado").val();
        var cajaId = $("#cajaid").val().trim();
        var gradoRiesgo = $("#id_grado_riesgo").val().trim();
        var idRemesa = $("#idRemesa").val().trim();
       
        if (caja === '' || Billete === '' || CantidadM === '' ||
                fecha === '' || remesa === '' || cajeros === '') {
            error("Hay campos vacios");
            return false;
        }


        if (cajeros === '0') {
            error("No ha seleccionado una opción en el campo Cuenta");
            return false;
        }

        var datos = [caja, Billete, CantidadM, //2
            fecha, serie, remesa, //5
            numero, cajeros, concepto, 
            cuenta1, cuenta2, clavePersonaFisica,  //11
            nombrepersonafisica, apaternofisica, amaternofisica,
            curpfisica, sexofisica, fechanacimiento,//17
            noidentificacion, tipoIdentificacion, identificacionSt, //20
            actividad, emailfisica, rfcfisica,
            callefisica, coloniafisica, codigopostal, //26
            telefonofisica, tipoTelefonofisica, saldoMoneda, 
            identificacionPersonaFisica, saldoBillete, instrumentoMonetario, //32
            ivaPago, remesaE, tipoMoneda, movimiento, //36
            comisionCobrada, ivaCobrado, cajaId, gradoRiesgo, idRemesa]; 

        
        //
        //GUARDAR
        $(document).ajaxSend(function (e, xhr, options) {
            var token = $("input[name='_csrf']").val();
            var cabecera = "X-CSRF-TOKEN";
            xhr.setRequestHeader(cabecera, token);
        });
        $.ajax({
            url: "fondoCaja/agregaMovimiento",
            data: {datos: datos},
            dataType: 'html',
            type: 'POST',

            success: function (retorno) {
                //alert(retorno);
                switch (retorno) {
                    case 'errorFecha':
                        alert("Las fechas no son correctas");
                        break;
                    case 'error':
                        alert("Se ha producido un error en el servidor");
                        break;
                    case 'exito':
                        //  ok("Los datos se procesarón CORRECTAMENTE!");
                        setTimeout(function () {
                            $("#divImprimirTicket1").css("display", "block");
                            $("#imprimeEnvio").css("display", "none");
                            $("#imprimeCancelacion").css("display", "none");
                            //location.href = "fondoCaja";
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
        /*    for(var i=0;i<5;i++){
         datos.pop();
         }*/

        //FOR }

    }
}
function verificarNumeroF() {
    var tipoPolizaa = $("#pagoRemesa").val().trim();
    var arreglo = [tipoPolizaa];
    var mensajeModal = "Buscando numero";
    blockUI(mensajeModal);
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "fondoCaja/verificarNumero",
        data: {datos: arreglo},
        dataType: 'html',
        type: 'POST',
        success: function (retorno) {
            var polizas = JSON.parse(retorno);
            // document.getElementById("#numeroContador").innerHTML=retorno.length;
            unBlockUI();
            console.log(polizas.length);
            var cant = 0;
            if (polizas.length === 0) {
                cant = 1;
            } else {
                cant = 1 + polizas.length;
            }
            $("#numeroContador").val(cant);

        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Se ha producido un error en el servidor");
        }
    });
}
function buscarSaldoF() {
    var clave = '';
    clave = $("#cajeros").val();

    var datos = [clave];
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "fondoCaja/consultarNumeroCuenta",
        data: {datos: datos},
        dataType: 'html',
        type: 'POST',
        success: function (retorno) {
            //alert(retorno);
            var datosCB = JSON.parse(retorno);
            $("#saldoBillete").val(datosCB[0]);
            $("#saldoMoneda").val(datosCB[1]);
            $("#cuentaCajero").val(datosCB[2]);
            $("#cuentaAcumula").val(datosCB[3]);
            $("#cajeros1").val(datosCB[4]);






        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Se ha producido un error en el servidor");
        }
    });//ajax
}
function buscarSaldoM() {
    var clave = '';
    clave = $("#Saldocajeros").val();

    var datos = [clave];
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "fondoGeneral/Movimientos",
        data: {datos: datos},
        dataType: 'html',
        type: 'POST',
        success: function (retorno) {
            //alert(retorno);
            var datosCC = JSON.parse(retorno);
            $("#saldoBilleteM").val(datosCC[0]);
            $("#saldoMonedaM").val(datosCC[1]);
            $("#cuentaContable").val(datosCC[2]);







        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Se ha producido un error en el servidor");
        }
    });//ajax
}

function Ocultar() {



    var valorCambiado = $('#tipoM').find(":selected").text();

    if ((valorCambiado == 'deposito a fondo general') || (valorCambiado == 'retiro fondo general')) {
        $('#CajeroFondo').css('display', 'none');
        $('#cajeros').css('display', 'block');
    } else if ((valorCambiado == 'dotacion de efectivo a cajas'))
    {
        $('#Saldocajeros').css('display', 'none');
        $('#CajeroFondo').css('display', 'block');
    } else if ((valorCambiado == 'deposito a cajas'))
    {
        $('#CajeroFondo').css('display', 'none');
        $('#Saldocajeros').css('display', 'block');
    } else if ((valorCambiado == 'dotacion de efectivo a fondo'))
    {
        $('#CajeroFondo').css('display', 'none');
        $('#Saldocajeros').css('display', 'none');
    }
}
;

function buscarSaldoG() {
    var clave = '';
    clave = $("#cajeros").val();

    var datos = [clave];
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "fondoCaja/consultarSaldo",
        data: {datos: datos},
        dataType: 'html',
        type: 'POST',
        success: function (retorno) {
            //alert(retorno);
            var datosCB = JSON.parse(retorno);
            $("#saldoBillete").val(datosCB[0]);
            $("#saldoMoneda").val(datosCB[1]);





        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Se ha producido un error en el servidor");
        }
    });//ajax
}
//---fondoGeneral
function agregarFondoGeneral() {
    // var idbancosat = $("#idBancoSat").val().trim();
    var codigo = $("#tipo").val().trim();
    var moneda = $("#BilleteS").val().trim();
    var cambio = $("#MonedaS").val().trim();
    var fecha = $("#fecha").val().trim();
    var serie = $("#serieB").val().trim();


    if (codigo === '' || moneda === '' || cambio === '' || fecha === '') {
        error("Hay campos vacios");
        return false;
    }
//    if (cuentaid === '0' ) {
//        error("No ha seleccionado una opción");
//        return false;
//    }

//    if (validarCuentaid(cuentaid) === false) {
//        return false;
//    }
//    if (validarNombreBanco(nombrebanco) === false) {
//        return false;
//    }
//    if (validarCheque(cheque) === false) {
//        return false;
//    }
//    if (validarSaldo(saldo) === false) {
//        return  false;
//    }


    var datos = [codigo, moneda, cambio, fecha, serie];
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "fondoGeneral/agregarFondo",
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
                        location.href = "catalogoMoneda";
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
function datosPersonaCajas() {
    if ($("#comision").val() !== "" && $("#cantidadenviada").val() !== ""
            && $("#tipomoneda").val() !== "0") {
        $("#datosenvio").css("display", "none");
        $("#verificaPersona").css("display", "block");
        $("personafisica").prop("disabled", true);
        color_div_paso_2();
        if ($('#personafisica').prop('checked')) {
            $("#divpersonafisica").css("display", "block");
            $("#verificaPersona").css("display", "none");
        }

    } else {
        error("Debes llenar los campos requeridos.");
    }
}

function datosBeneficiarioCajero() {
    if (validaPersonaFisica() !== false) {
        $("#divpersonafisica").css("display", "none");
        $("#datosFinalesEnvio").css("display", "block");

    }
//    var codigopostal = $("#codigopostalfisica").val();
//    var nombrePersonaFisica = $("#nombrepersonafisica").val();
//    var aPaternoFisica = $("#apaternofisica").val();
//    var aMaternoFisica = $("#amaternofisica").val();


    //  var monto = $("#cantidadenviada").val();
    // var instrumentoMonetario = $("#instrumentoMonetario").val();
    var nombrePersonaFisica = $("#nombrepersonafisica").val();
    var apaternoFisica = $("#apaternofisica").val();
    var amaternoFisica = $("#amaternofisica").val();
    var codigoPostal = $("#codigopostalfisica").val();
    var actividad = $("#actividad").val();
    var clavePersonaFisica = $("#clavePersonaFisica").val();

    var datos = [nombrePersonaFisica,
        apaternoFisica, amaternoFisica, codigoPostal,
        actividad, clavePersonaFisica];
    $.ajax({
        url: "fondoCaja/riesgoPersona",
        data: {datos: datos},
        dataType: 'html',
        type: 'POST',
        success: function (retorno) {
            //alert(retorno);
            switch (retorno) {
                case '2':
                    error("Es una persona de alto riesgo");
                    $("#id_grado_riesgo").val(parseInt("2"));
                    document.getElementById('grado_riesgo').innerHTML = "Alto riesgo";
                    unBlockUI(100);
                    break;
                case '1':
                    ok("Es una persona de bajo riesgo");
                    $("#id_grado_riesgo").val(parseInt("1"));
                    document.getElementById('grado_riesgo').innerHTML = "Bajo riesgo";
                    unBlockUI(100);
                    break;
            }
        }
    });

}
//FUNCION QUE VALIDA QUE LAS CAJAS DE TEXTO DE UNA PERSONA FISICA NO ESTEN VACIAS
function validaPersonaFisica() {
    if ($("#nombrepersonafisica").val() !== "" && $("#apaternofisica").val() !== ""
            && $("#amaternofisica").val() !== "" && $("#curpfisica").val() !== ""
            && $("#sexofisica").val() !== "0" && $("#fechanacimiento").val() !== ""
            && $("#noidentificacion").val() !== "" && $("#tipoIdentificacion").val() !== "0"
            && $("#statusIdentificacion").val() !== "0" && $("#actividad").val() !== "0"
            && $("#callefisica").val() !== "" && $("#coloniafisica").val() !== ""
            && $("#codigopostalfisica").val() !== "0" && $("#ciudad").val() !== "0"
            && $("#estado").val() !== "0" && $("#telefonofisica").val() !== ""
            && $("#tipoTelefonofisica").val() !== "0") {
        if ($("#nombrepersonafisica").val().length <= 50) {
            if ($("#apaternofisica").val().length <= 50) {
                if ($("#amaternofisica").val().length <= 50) {
                    if (validarCURP($("#curpfisica").val()) !== false) {
                        //if (validaRFCFisica($("#rfcfisica").val()) !== false) {
                            if ($("#noidentificacion").val().length <= 50) {
                                if ($("#callefisica").val().length <= 50) {
                                    if ($("#coloniafisica").val().length <= 50) {
                                        if (validarTelefono("#telefonofisica", $("#telefonofisica").val()) !== false) {
                                            if ($("#emailfisica").val() === "") {
                                                return true;
                                            } else {
                                                if (validarEmail($("#emailfisica").val()) !== false) {
                                                    return true;
                                                } else {
                                                    return false;
                                                }
                                            }
                                        } else {
                                            return false;
                                        }
                                    } else {
                                        error("La colonia excede los 50 caracteres");
                                        return false;
                                    }
                                } else {
                                    error("La direcci&oacute;n excede los 50 caracteres");
                                    return false;
                                }
                            } else {
                                error("El n&uacute;mero de identificaci&oacute;n excede los 50 digitos");
                                return false;
                            }
                        //} else {
                          //  return false;
                        //}
                    } else {
                        return false;
                    }
                } else {
                    error("El tama&ntilde;o m&aacute;ximo del apellido materno es de 50 caracteres");
                    return false;
                }
            } else {
                error("El tama&ntilde;o m&aacute;ximo del apellido paterno es de 50 caracteres");
                return false;
            }
        } else {
            error("El tama&ntilde;o m&aacute;ximo del nombre es de 50 caracteres");
            return false;
        }
    } else {
        error("Debes llenar los campos requeridos.");
        return false;
    }
}

//FUNCION QUE HABILITA EL BOTON DE PAGO CUANDO SE HA CONFIRMADO O VALIDADO LA 
//INFORMACION DE UN CLIENTE
function habilitaBtnPago() {
    var pathname = window.location.pathname;
    if (pathname === "/Transmisor/pago") {
        if ($("#validacion").is(':checked')) {
            $('#btnPagarRemesa').attr("disabled", false);
        } else {
            $('#btnPagarRemesa').attr("disabled", true);
        }
    } else {
        if ($("#validacion").is(':checked')) {
            $('#btnRegistraEnvio').attr("disabled", false);
        } else {
            $('#btnRegistraEnvio').attr("disabled", true);
        }
    }
    //pagos internacionales
    if ($("#validacion").is(':checked')) {//chkValidacion
        $('#btnPagarRemesaIn').attr("disabled", false);
        $('#btnNoPagarRemesaInt').prop("disable", false);
    } else {
        $('#btnPagarRemesaIn').attr("disabled", true);
        $('#btnNoPagarRemesaInt').prop("disable", true);
    }
}
function datosEnvio() {
    $("#verificaPersona").css("display", "none");
    $("#divpersonafisica").css("display", "none");
    color_div_paso_2_anterior();

}
function color_div_paso_1() {
    $("#paso1").css("background-color", "#4CB630");
    $("#paso1").css("color", "#ffffff");
    $("#paso1").css("box-shadow", "6px 6px 6px gray");
}

function color_div_paso_2() {
    $("#paso2").css("background-color", "#4CB630");
    $("#paso2").css("color", "#ffffff");
    $("#paso2").css("box-shadow", "6px 6px 6px gray");
}

//FUNCION DE VALIDACION DE UN DIV, INVOCADA EN EL FORMULARIO FRMBENEFICIARIOCLIENTE
function atrasPagar() {
    $('#infoValidar').css("display", "none");
    $('#infoEstaticaRemitente').css("display", "none");
    $('#btnAtrasPagar').css("display", "none");
    $('#datosBeneRemitente').css("display", "block");
    color_div_paso_2();
    $('#btnPagarRemesa').attr("disabled", true);
    buscarOtroCliente();
}
//FUNCION DE VALIDACION DE DIV EN EL JSP ENVIOS, CALCULA EL TOTAL DEL ENVÍO
function calculaCargosCajas() {
    if ($("#comision").val() !== "" && $("#cantidadenviada").val() !== "" &&
            $("#tipomoneda").val() !== "0" && $("#instrumentoMonetario").val() !== "0") {
        if ($("#cantidadenviada").val().length <= 10) {
            if ($("#comision").val().length <= 10) {
                sumaSaldos1();
                var monto = $("#cantidadenviada").val();
                var comision = $("#comision").val();
                var tipoMoneda = $("#tipomoneda").val();
                var iva = $("#ivaPago").val();

                var total;
                $(document).ajaxSend(function (e, xhr, options) {
                    var token = $("input[name='_csrf']").val();
                    var cabecera = "X-CSRF-TOKEN";
                    xhr.setRequestHeader(cabecera, token);
                });
                var datos = [tipoMoneda, monto, comision, iva];
                var mensajeModal = "Calculando cargos...";
                blockUI(mensajeModal);
                $.ajax({
                    url: "fondoCaja/calculaCargos",
                    data: {datos: datos},
                    dataType: 'html',
                    type: 'POST',
                    success: function (data) {
                        var datoss = JSON.parse(data);

                        $("#datosCobroDiv").css("display", "block");
                        var impuestoComision = parseFloat(monto) * (parseFloat(comision) / 100);
                        var impuestoIva = (impuestoComision) * (parseFloat(iva) / 100);
                        total = parseFloat(monto) + impuestoComision + impuestoIva;
                        document.getElementById('idMonto2').innerHTML = monto;
                        document.getElementById('idComision2').innerHTML = impuestoComision.toFixed(2);
                        ;
                        document.getElementById('idIva2').innerHTML = impuestoIva.toFixed(2);
                        ;
                        document.getElementById('idTotal2').innerHTML = total;
                        document.getElementById('idTipoMoneda2').innerHTML = datoss[0];
                        $('#btnDatosRemesa').attr("disabled", false);

                        $("#Moneda").val(impuestoComision + impuestoIva);
                        $("#Billete").val(monto);
                        $("#IvaCobrado").val(impuestoIva);
                        $("#ComisionCobrada").val(impuestoComision);

                        unBlockUI(300);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        alert("Se ha producido un error en el servidor");
                    }
                });
            } else {
                error("La longitud del campo de la comisi&oacute;n debe ser menor o igual a 10 digitos");
            }
        } else {
            error("La cantidad m&aacute;xima a enviar debe ser menor o igual a 10 digitos");
        }
    } else {
        error("Debes llenar los campos requeridos.");
    }
}
function buscaClienteCajas() {
    if ($("#buscaPersona").val() !== "" && $("#tipoBuscaPersona").val() !== "0") {
        var valor = $("#tipoBuscaPersona").val();
        var filtro;
        $('#buscaPersona').prop('disabled', true);
        $('#tipoBuscaPersona').prop('disabled', true);
        $('#buscaOtroClienteF').css("display", "block");

        var mensaje = "Debe de insertar el n&uacute;mero de identificaci&oacute;n!!";
        if ($('#buscaPersona').val() !== "") {
            if (valor === "1") {
                filtro = "clavePersonaFisica";
                detectaCambio(filtro);
            } else if (valor === "2") {
                filtro = "noidentificacion";
                detectaCambio(filtro);
            } else if (valor === "3") {
                filtro = "curpfisica";
                detectaCambio(filtro);
            } else if (valor === "4") {
                filtro = "rfcfisica";
                detectaCambio(filtro);
            }
        } else {
            $('#editInfo').css("display", "none");
            document.getElementById('mensajeBusquedaInfo').innerHTML = mensaje;
            $('#mensajeBusqueda').css("display", "block");

        }
    } else {
        error("Debes llenar los campos requeridos.");
    }
}
function seleccionaBeneficiarioCajas(idBeneficiario) {
    var datos;
    var idBene;
    idBene = $("#" + idBeneficiario + "").parents("tr").find("td").eq(0).text();
    datos = [idBene];
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "envios/seleccionaBeneficiario",
        data: {datos: datos},
        dataType: 'html',
        type: 'POST',
        success: function (data) {
            var datosBeneficiario = JSON.parse(data);
            $("#nombrebene").val(datosBeneficiario[0]);
            $("#apaternobene").val(datosBeneficiario[1]);
            $("#amaternobene").val(datosBeneficiario[2]);
            $("#sexobene").val(datosBeneficiario[3]);
            $('#telBeneficiario').val(datosBeneficiario[4]);
            $('#tipoTelBeneficiario').val(datosBeneficiario[5]);
            $('#idBeneficiario').val(datosBeneficiario[6]);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Se ha producido un error en el servidor");
        }
    });
}
function listaBeneficiarios(idCliente) {
    var datos;
    datos = idCliente;
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "envios/listaBeneficiarios",
        data: {datos: datos},
        dataType: 'html',
        type: 'POST',
        success: function (data) {
            var datosPersona = JSON.parse(data);
            for (var i in datosPersona) {
                $('#tablaBeneficiarios tbody').append('<tr></tr>');
                var row = $('#tablaBeneficiarios tbody tr').last();
                var NA = "N/A";
                for (var j in datosPersona[i]) {
                    var objeto = datosPersona[i][j];
                    if (j === "0" && objeto !== null) {
                        row.append('<td id = "idIdenBene' + i + '">' + objeto + '</td>');
                    } else if (j === "4" && objeto === null) {
                        row.append('<td>' + NA + '</td>');
                    } else if (j !== "0") {
                        row.append('<td>' + objeto + '</td>');
                    }
                    if (j === "4") {
                        row.append('<td><input type="button" value="Seleccionar" class="estilobtn gris" onclick="seleccionaBeneficiario(' + "'idIdenBene" + i + "'" + ');"></td>');
                    }
                }//forinterno
            }

        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Se ha producido un error en el servidor");
        }
    });
}
function datosEnvio() {
    $("#verificaPersona").css("display", "none");
    $("#divpersonafisica").css("display", "none");
    $("#divpersonamoral").css("display", "none");
    $("#datosenvio").css("display", "block");
    color_div_paso_2_anterior();

}
function sumaSaldos1() {
    var total = 0;
    var moneda = $("#MonedaI").val();
    var billete = $("#BilleteI").val();

    total = parseFloat(total);

    total = $("#cantidadenviada").innerHTML;
    total = (parseFloat(billete) + parseFloat(moneda));
    $("#cantidadenviada").val(total);
}
function seleccionaBeneficiarioCajas(idBeneficiario) {
    var datos;
    var idBene;
    idBene = $("#" + idBeneficiario + "").parents("tr").find("td").eq(0).text();
    datos = [idBene];
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "envios/seleccionaBeneficiario",
        data: {datos: datos},
        dataType: 'html',
        type: 'POST',
        success: function (data) {
            var datosBeneficiario = JSON.parse(data);
            $("#nombrebene").val(datosBeneficiario[0]);
            $("#apaternobene").val(datosBeneficiario[1]);
            $("#amaternobene").val(datosBeneficiario[2]);
            $("#sexobene").val(datosBeneficiario[3]);
            $('#telBeneficiario').val(datosBeneficiario[4]);
            $('#tipoTelBeneficiario').val(datosBeneficiario[5]);
            $('#idBeneficiario').val(datosBeneficiario[6]);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Se ha producido un error en el servidor");
        }
    });
}

function muestraIvaComisio(){
    var cveRemesa = $("#cveRemesa").val();
    var datos;
    
    datos = cveRemesa;
    $(document).ajaxSend(function (e, xhr, options) {
        var token = $("input[name='_csrf']").val();
        var cabecera = "X-CSRF-TOKEN";
        xhr.setRequestHeader(cabecera, token);
    });
    $.ajax({
        url: "fondoCaja/muestraIvaComision",
        data: {datos: datos},
        dataType: 'html',
        type: 'POST',
        success: function (data) {
            var datosComisionPorcentaje = JSON.parse(data);
            $("#ivaPago").val(datosComisionPorcentaje[1]);
            $("#comision").val(datosComisionPorcentaje[0]);
            $("#idRemesa").val(parseInt(datosComisionPorcentaje[2]));
            
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Se ha producido un error en el servidor");
        }
    })
}

