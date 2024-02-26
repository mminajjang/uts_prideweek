var audio = new Audio('change_screen.ogg');
// var session = new QiSession();


$(document).ready( function(){
    $('button').click(function(){
        audio.play();
    });
    $('button').click(function(){
        $("#"+$(this).attr('id')).css('filter', 'invert(100)%');
    });
    
});