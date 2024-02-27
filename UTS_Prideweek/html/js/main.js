var audio = new Audio('change_screen.ogg');
var session = new QiSession(function(session){
    console.log("connected !" );
}, function(){
    console.log("disconnected");
});


// *** SUBSCRIBE EVENT *** //
var makesound = false;
function eventDonecallback_human_tracked(state){
    if(state ==-1){
        makesound = false;
    }
    else{
        makesound = true;
    }
}
session.service("ALMemory").then(function(memory){
    memory.subscriber("ALBasicAwareness/HumanTracked").then(function(subscriber){
        subscriber.signal.connect(eventDonecallback_human_tracked);
    });
});

// *** INITIALIZATION *** // 
var once = true;
$(document).ready( function(){
    if(once){
        session.service("ALTextToSpeech").then(function(tts){
            tts.setParameter("speed", 80);
            tts.setParameter("pitchShift", 1.18);
        });

        session.service("ALBasicAwareness").then(function(basic){
            basic.setTrackingMode("Head");
        });
        once = false;
    }
});

// *** PAGE CONFIGUARION *** //
var current_page_number = 1;
var min_page_num = 1;
var max_page_num = 3;
var texts = ['Love Is Love! Everyone is invited! Check out Whats on! ', 'Join our Communities!', 'Check out What Events are happening!'];
function convertPage(dir){
    clearTimeout(timer);
    $("#page").empty();
    current_page_number += dir;
    if(current_page_number > max_page_num){
        current_page_number = min_page_num;
    }
    else if(current_page_number < min_page_num){
        current_page_number = max_page_num;
    }
    if (current_page_number == 1){
        $("#page").append(
            '<div class="header_div"  style="height: 500px;">'+
                '<h1 class="headline_2" style="margin: 0;"> LOVE</h1>'+
                '<h1 class="headline_2" style="margin-top: 150px;"> IS</h1>'+
                '<h1 class="headline_2" style="margin-top: 300px;"> LOVE</h1>'+
            '</div>'+
            '<div class="content_div" style="height:240px;">'+
                '<p class="subheader" style="padding-top: 20px;">FACULTY OF ENGINEERING &#9825 IT</p>'+
                '<p class="subheader" style="padding-top: 0;">UTS PRIDE WEEK 2024</p>'+
            '</div>'
            );
    }
    else if(current_page_number == 2){
        $("#page").append(
            '<div class="header_div" style="height: 180px;">' + 
                '<h1 class="headline"> Join Our Communities !</h1>'+
            '</div>'+
            '<div class="content_div" style="height:560px;">'+
            '<div class="container">'+
               ' <div class="item_container" style="margin-right:80px;">'+
                   '<div class="item_img" type="img" style="background-image: url(images/activeuts_trans.png);"></div>'+
                    '<div class="item_title"><p>ActivateUTS</p></div>'+
                '</div>'+
                '<div class="item_container" style="margin-left:80px;">'+
                   '<div class="item_img" type="img" style="background-image: url(images/utslgbt_trans.png);"></div>'+
                   '<div class="item_title"><p>UTS LGBTIQA+ Community</p></div>'+
                '</div>'+
            '</div>'+
        '</div>'
        );
    }
    else if (current_page_number == 3){
        $("#page").append(
           ' <div class="header_div" style="height: 180px;" >'+
            ' <h1 class="headline" style="font-size: 58px; white-space: nowrap;"> Check out What Events are happening!</h1>'+
            '</div>'+
            '<div class="content_div" style="height:560px;">'+
                '<div class="container">'+
                    '<div class="item_container" style="margin-top:0px; margin-right:30px; height: 570px;">'+
                        '<div class="events" type="img" style="background-image: url(images/ally.jpg);"></div>'+
                        '<div class="item_title" style="padding-top: 20px; font-size: 70px; color: orange;"><p>ALLY Network</p></div>'+
                            '<div class="events_description">'+
                                '<div>Wednesday 28 Feb, 1-2 pm </div>'+
                                '<p>Drop by and learn about UTS ALLY Network and how you can become an ALLY to support the LGBTQIA+ community at UTS </p>'+
                            '</div>'+
                    '</div>'+
                    '<div class="item_container" style="margin-top:0px; margin-right:30px; margin-left: 30px; height: 570px;">'+
                        '<div class="events" type="img" style="background-image: url(images/dragbingo.png);"></div>'+
                        '<div class="item_title" style="padding-top: 20px; font-size: 70px; color: red;"><p>Drag Bingo</p></div>'+
                        '<div class="events_description">'+
                            '<div>Thursday 29 Feb, 12-1 pm</div>'+
                            '<p>Drag Bingo will be hosted by the fabulous Ms Prada Clutch with prizes to be won. <br> Register now! Limite one per person. </p>'+
                        '</div>'+
                    '</div>'+
                    '<div class="item_container" style="margin-top:0px; margin-left:30px; height: 570px;">'+
                        '<div class="events" type="img" style="background-image: url(images/studentgroup.png);"></div>'+
                        '<div class="item_title" style="color: green;"><p>LGBTQIA+ UTS Student Groups</p></div>'+
                        '<div class="events_description">'+
                            '<div>Friday 1 Mar, 1-2 pm</div>'+
                            '<p>Come along and meet the UTS Darlings. Drop by and find out about these student groups and how they supprot LGBTQIA+ students on campus.</p>'+
                        '</div>'+
                    '</div>'+
                '</div>'  +      
            '</div>'
        );
    }
    speak(texts[current_page_number-1]);
    timeoutloop();
}
var timer;
function timeoutloop(){
    timer = setTimeout( function(){
    convertPage(1);
    }, 10000);
}

function speak(text){
    if (makesound == true){
        session.service("ALTextToSpeech").then(function(tts){
            tts.say(text);
        });
    }
}

function exit(){
    session.service("ALBehaviorManager").then(function(behaviour){
        behaviour.stopAllBehaviors();
    });
}

$(document).ready( function(){
    $(".button_home").click( function(){
        audio.play();
        exit();
    });
    
    $('.arrow').click(function(){
        audio.play();
        if ($(this).attr("id") == "arrow_right"){
            convertPage(1);
        }
        else{
            convertPage(-1);
        }
    });
    
});