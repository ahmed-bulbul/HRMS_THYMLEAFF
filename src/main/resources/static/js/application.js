







function setSearchFilterFormData() {
    // validation
    if( ($('#genSearchForm').length) < 0 ) return;

    // set
    var params = jsClient.paramsToObj(window.location.search);
    for (var attributeName in params){
        if( $('#genSearchForm #' + attributeName).length ){
            var attributeValue = params[attributeName];
            if(attributeValue != null && attributeValue != ""){
                $('#genSearchForm #' + attributeName).val(attributeValue);
                $('#genSearchForm #' + attributeName).focus();
            }
        }
    }
}





// Main
$(document).ready(function(){


  // Call function from here
    setSearchFilterFormData();



});


