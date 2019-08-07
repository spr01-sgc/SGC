(function (window, document, JSON){
    'use strict';
    var url = 'ws://'+window.location.host+'/Transmisor/chat',
    ws = new WebSocket(url),
    mensajes = document.getElementById('conversacion'),
    boton = document.getElementById('btnEnviar'),
    nombre = document.getElementById('usuario'),
    mensaje = document.getElementById('mensaje');
    
    
    ws.onopen = onOpen;
    ws.onclose = onClose;
    ws.onmessage = onMessage;
    
    boton.addEventListener('click', enviar);
    
    function onOpen(){
        console.log('Conectado...');
        ok("Conversación iniciada");
        //notificar que hay usuarios conectado
        //$("#autorizaRemesas").attr("title", "Tienes notificaciones");
                   
    }
    
    function onClose(){
        console.log('Desconectado...');
    }
    
    function enviar(){
        var msg ={
            nombre: nombre.value,
            mensaje: mensaje.value
        };
        
        ws.send(JSON.stringify(msg));
       // document.getElementById('mensaje').innerHTML="";
    }
    
    function onMessage(evt){
        var obj = JSON.parse(evt.data),
                msg= 'Usuario: '+obj.nombre+'<br />' +' Mensaje: '+obj.mensaje;
        mensajes.innerHTML += '<br />'+msg;
        
    }
    
})(window, document, JSON);

