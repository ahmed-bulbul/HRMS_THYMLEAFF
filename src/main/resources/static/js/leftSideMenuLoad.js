
$(function () {

    // $.ajax({
    //     url: '/hrms/menu/loadMenu',
    //     type: 'GET',
    //     dataType: 'json',
    //     success: function (data) {
    //         //$('#mainSidebar').html("hello");
    //         console.log(data);
    //         $("#loadMenuDivXyz").append(data);
    //         $('body').append(data);
    //     },
    //     error: function (data) {
    //         console.log(data);
    //     }
    // });
});



function appendLeftSideMenuXxxx() {

    $.ajax({
        url: '/hrms/menu/loadMenu',
        type: 'GET',
        success: function (data) {
            //$('#mainSidebar').html("hello");
            console.log(data);
            $("#loadMenuDivXyz").append(data);
        },
        error: function (data) {
            console.log(data);
            // $("#loadMenuDivXyz").append(data);
            // $('body').append(data);
        }
    });

}


$(document).ready(function () {
    console.log(" I am here.....");
    //appendLeftSideMenuXxxx();
});
