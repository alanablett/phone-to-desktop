window.onload = function() {
    
    var socket = io.connect('http://localhost:8082');
    var content = document.getElementById("content");
    
    // Let the server know we're connected
    socket.emit('desktop.connect');
    
    // Once connected we listen for the server to call back with our unique string (this'll be used by the mobile)
    socket.on('desktop.callback', function( data ){
        content.innerHTML = data.url;
    });
    
    // When our mobile pushes data up the server it will fire off a desktop move call to the appropriate socket.io client
    // with the relevant data whether we're going up or down, we scroll the window in that direction
    socket.on('desktop.move', function( data ){
        var top = $(window).scrollTop();
        
        if( data.direction == 'up' ){
            $("html, body").animate({ scrollTop: top-200 }, 500);
        }
        if( data.direction == 'down' ){
            $("html, body").animate({ scrollTop: top+200 }, 500);
        }
    });

}