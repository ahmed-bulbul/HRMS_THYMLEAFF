
function saveResDef(){
    alert("saveResDef");
    const requestBody = {
        clientReqUrl : $("#clientReqUrl").val(),
        backendUrl : $("#backendUrl").val(),
    };

    $.ajax({
        type: "POST",
        url: "/hrms/api/acl/systemResDef/save",
        data: JSON.stringify(requestBody),
        contentType: 'application/json',
        dataType : 'json',
        async: false,
        cache: false,
        success: function(response) {
            console.log(response);
            if(response.status === true){
                // go to list page
                window.location.href = "/hrms/systemResDef";

                $("#successAlert").css({"display": "block"});
                $("#successMessage").append(response.message);
                // $("#successAlert").fadeTo(2000, 500).slideUp(500, function(){
                //     $("#successAlert").alert('close');
                // });

                resetForm();
            }else{
                $("#errorAlert").css({"display": "block"});
                $("#errorMessage").append(response.message);
                // $("#errorAlert").fadeTo(2000, 500).slideUp(500, function(){
                //     $("#errorAlert").alert('close');
                // });
                resetForm();
            }

        },
        error: function(response) {
            alert("Error" + response.message);
            console.log(response);
            $("#errorAlert").css({"display": "block"});
            $("#errorMessage").append(response.message);
            // $("#errorAlert").fadeTo(2000, 500).slideUp(500, function(){
            //     $("#errorAlert").alert('close');
            // });
            resetForm();
        }
    });
}

function resetForm(){
     $("#clientReqUrl").val("");
     $("#backendUrl").val("");
}