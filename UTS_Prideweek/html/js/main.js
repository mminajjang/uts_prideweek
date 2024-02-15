var session = new QiSession();


$(document).ready( function(){

    $("#button1").click( function(){
        $("#button1").hide();
        $("#button2").show();
        // $('body').css("background-image","url(images/uts-pride-logo.png)");
    });
    $("#button2").click( function(){
        $("#button1").show();
        $("#button2").hide();
        // $('body').css("background-image","url(images/uts-pride-logo.png)");
    });
});