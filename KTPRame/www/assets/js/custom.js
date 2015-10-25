var server = "http://ktprame.azurewebsites.net"; //"http://192.168.1.100:8080/ktprame/WebServer/www";

$(document).ready(function(){
    $("#posterEmail").val($.cookie('email'));
    $("#loading").css({
        height: $(window).height(),
        paddingTop: $(window).height() / 2,
    }).hide();
});

/* START CAMERA */
function showCamera(){
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 10,
        destinationType: Camera.DestinationType.DATA_URL,
        correctOrientation: true
    });
}

function onSuccess(imageData){
    var img = "data:image/jpeg;base64,"+imageData;

    $("#image").attr("src", img);
    $("#image-text").val(imageData);
    $("#upload-btn").removeClass("btn-disabled");
    $("#upload-btn").addClass("btn-info");
}

function onFail(message){
    alert("Failed because: " + message);
    $("#upload-btn").removeClass("btn-info");
    $("#upload-btn").addClass("btn-disabled");
}

function sendPhotoToServer(){
    $("#loading").show();
    var actionURL = server + '/posters';
    $.ajax({
        method: 'POST',
        url: actionURL,
        data: {
            image: $("#image-text").val(),
            posterEmail: $("#posterEmail").val()
        }
    }).success(function(msg){
        var jsonMsg = $.parseJSON(msg);
        $("#loading").hide();
        alert(jsonMsg.message);
        location.reload();
    })
}

/* END CAMERA */

/* START LOGIN */
function login(){
    if($("#inputEmail").val() != "" && $("#inputPassword").val() != ""){
        $.cookie('email', $("#inputEmail").val());
        window.location = "main.html";
    }else{
        alert("Username & password harus diisi!");
    }
}
/* END LOGIN */
