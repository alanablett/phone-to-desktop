window.onload = function() {
    
    var socket = io.connect('http://localhost:8082');
    
    //Let the server know we're connected
    socket.emit('mobile.connect');
    
    // Bind our clicks
    $('#up').on('click', function(e){
        e.preventDefault();
        loc = window.location.href;
        url = loc.substr(loc.lastIndexOf('/') + 1);
        // Tell the server we want to move up, pass the url too so we can link it to a desktop
        socket.emit('mobile.control', { direction : 'up', url : url } );
    });
    $('#down').on('click', function(e){
        e.preventDefault();
        loc = window.location.href;
        url = loc.substr(loc.lastIndexOf('/') + 1);
        // Tell the server we want to move down, pass the url too so we can link it to a desktop
        socket.emit('mobile.control', { direction : 'down', url : url } );
    });
    
}