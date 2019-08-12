/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


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


/**Función para excel**/

function reportExcel(idTbl, nomRep) {
    if (idTbl === '#tableUsuario') {
        var link = document.createElement('a');
        document.body.appendChild(link);
        link.download = reporePrueba + ".xls";
        link.href = 'data:application/vnd.ms-excel,' + escape($(tableUsuario).html());
        link.click();
        document.body.removeChild(link);
        $("#tbPre").empty();//limpiar tabla
    }
}

