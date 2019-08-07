jQuery.fn.tableToCSV = function (nombre, file, tipo) {
        var clean_text = function (text) {
            var cadena = text.replace("'", "");
            return '' + cadena + '';
        };
    $(this).each(function () {
        var table = $(this);
        var caption = $(this).find('caption').text();
        var title = [];
        var rows = [];
        $(this).find('tr').each(function () {
            $(this).find('th').each(function () {
                var text = clean_text($(this).text());
                title.push(text);
            });
            var data = [];
            $(this).find('td').each(function () {
                var text = clean_text($(this).text());
                data.push(text);
            });
            
             if (file === 'csv' && tipo === '3') {
                var servicio = $("#idOperacion").val();
                data[7] = servicio;
                var actividad = $("#idActividad").val();
                data[27] = actividad;
                var instrumento = $("#idIntrumento").val();
                data[8] = instrumento;
                var moneda = $("#idMonedaD").val();
                data[11] = moneda;
            }
            data = data.join(";");
            rows.push(data);            
        });
        title = title.join(";");
        rows = rows.join("\r\n");
        var csv = title + rows;
        var uri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
        var download_link = document.createElement('a');
        download_link.href = uri;
        var fecha = new Date().getTime();
        if (nombre === '') {
            download_link.download = fecha + ".csv";
        } else {
            download_link.download = nombre + ".csv";
        }
        document.body.appendChild(download_link);
        download_link.click();
        document.body.removeChild(download_link);
    });

};
