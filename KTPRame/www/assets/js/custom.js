var server = "http://ktprame.azurewebsites.net"; //"http://192.168.1.100:8080/ktprame/WebServer/www";

$(document).ready(function(){
    $("#posterEmail").val($.cookie('email'));
});

/* START CAMERA */
function showCamera(){
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL
    });
}

function onSuccess(imageData){
    var img = "data:image/jpeg;base64,"+imageData;

    $("#image").attr("src", img);
    $("#image-text").val(img);
}

function onFail(message){
    alert("Failed because: " + message);
}

function sendPhotoToServer(){
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
        alert(jsonMsg.message);
    })
}

/* END CAMERA */

/* START LOGIN */
function login(){
    $.cookie('email', $("#email").val());
    window.location = "main.html";
}
/* END LOGIN */
