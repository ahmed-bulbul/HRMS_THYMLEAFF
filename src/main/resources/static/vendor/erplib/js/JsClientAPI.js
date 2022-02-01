/**
 * *****************
 * Author: Al-Mamun
 * Creation Date: 2017-01-21 --- before
 * Last Modify Date: 2020-10-10
 * *****************
 */

/**
 * Declare jsClient Namespace if not exist
 */
var jsClient = jsClient || {};

$.extend(jsClient, {
  _URL_SERVERAPI: 'api/server_api.php',
  mUrl: '',
  mType: 'get', // default get
  mData: '',
  mAsync: false,
  mReqType: '',
  queryData: '',
  queryParam: '',

  foo: 'here for no reason other than to be the last line, without a comma'
});


jsClient.isJSON = function (str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

jsClient.paramsToQueryString = function(obj){
	 var str = [];
	 for(var p in obj){
	     if (obj.hasOwnProperty(p)) {
	         str.push(p + "=" + obj[p]);
	     }
	 }
	 return str.join("&");
}

jsClient.paramsToQueryStringEncode = function(obj){
	 var str = [];
	 for(var p in obj){
	     if (obj.hasOwnProperty(p)) {
	         str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	     }
	 }
	 return str.join("&");
}


/**
 * Converts a list of arguments from window.location.search into an object
 * @param  {string} url [description]
 * @return {object}     [description]
 */
 // var params = jsClient.paramsToObj(window.location.search);
jsClient.paramsToObj = function( url ) {
  var
    params = url.split('?')[1],
    results = {},
    splitparam = [];

  // Must check before trying to split
  if ( params === undefined ) return {};

  params = decodeURIComponent(params).split('&'); 
  for (var i = params.length - 1; i >= 0; i--) {
    splitparam = params[i].split('=');
    results[splitparam[0]] = splitparam[1];
  };
  return results;
}

jsClient.getURLParameter = function(sParam){
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}


jsClient.validatePositiveIntegerValue = function(evt, thisPtr){

  var theEvent = evt || window.event;
  // Handle paste
  if (theEvent.type === 'paste') {
      key = event.clipboardData.getData('text/plain');
  } else {
  // Handle key press
      var key = theEvent.keyCode || theEvent.which;
      // Allow: backspace, delete, tab, escape, enter, ctrl+A and .
      // 46, 8, 9, 27, 13, 110, 190
      if(key == 48 || key == 8 || key == 9 || key == 27 || key == 13 || key == 110 || key == 19) return; // let it happen, don't do anything
      key = String.fromCharCode(key);
  }

  var regex = /[0-9]|\./;
  if( !regex.test(key) ) {
    theEvent.returnValue = false;
    if(theEvent.preventDefault) theEvent.preventDefault();

  } else if ($(thisPtr).val().indexOf(".") >= -1) {
  	if(key == '.'){
	    theEvent.returnValue = false;
	    if(theEvent.preventDefault) theEvent.preventDefault();
	  	return;
  	} 
  }


}


// SRC:https://stackoverflow.com/questions/469357/html-text-input-allow-only-numeric-input
jsClient.validateNumberValue = function(evt, thisPtr){

  var theEvent = evt || window.event;

  // Handle paste
  if (theEvent.type === 'paste') {
      key = event.clipboardData.getData('text/plain');
  } else {
  // Handle key press
      var key = theEvent.keyCode || theEvent.which;

      // https://stackoverflow.com/questions/995183/how-to-allow-only-numeric-0-9-in-html-inputbox-using-jquery?page=1&tab=votes#tab-top
      // Allow: backspace, delete, tab, escape, enter, ctrl+A and .
      // 46, 8, 9, 27, 13, 110, 190
      if(key == 48 || key == 8 || key == 9 || key == 27 || key == 13 || key == 110 || key == 19) return; // let it happen, don't do anything

      key = String.fromCharCode(key);
  }

  var regex = /[0-9]|\./;
  if( !regex.test(key) ) {
    theEvent.returnValue = false;
    if(theEvent.preventDefault) theEvent.preventDefault();

  } else if ($(thisPtr).val().indexOf(".") >= 0) {

  	if(key == '.'){

	    theEvent.returnValue = false;
	    if(theEvent.preventDefault) theEvent.preventDefault();
	  		return;
  	} 

  }

}

jsClient.validateCellPhoneNumber = function(thisPtr){
	// var mob = /^[1-9]{1}[0-9]{9}$/;
	var mob = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if (mob.test( $(thisPtr).val()) == false) {
    	$(thisPtr).val('');
    	$(thisPtr).attr('placeholder', 'Invalid phone');
        $(thisPtr).focus();
        return false;
    }
    return true;
}


jsClient.showSuccessMeaasge = function(msg, autoclose){
	var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
	var uniqid = randLetter + Date.now();

	var msgDomString = '<div class="successAlert" id="'+uniqid+'">';
	msgDomString += '<i class="fa fa-fw fa-check"></i>';
	msgDomString += '<span id="listSuccessMsg">'+msg+'</span>';
	msgDomString += '<span class="close" onclick="jsClient.closeSuccessMeaasge(this)">';
	msgDomString += '<i class="fas fa-times"></i>';
	msgDomString += '</span>';
	msgDomString += '</div>';
	$('#ZERP_UserAlertCt').append(msgDomString);

	// do not auto close: autoclose = false
	if(autoclose == false){
		// don't close
	} else {
		setTimeout(function() {
			jsClient.autoCloseSuccessMeaasge(uniqid);
		}, 5000);
	}

	// CSS
	$('.successAlert').css({'background':'lightgreen', 'color':'white', 'padding-right': '3px', 'padding-left': '3px'});
	$('.successAlert .material-icons').css({'vertical-align':'middle', 'color':'white'});
}
jsClient.autoCloseSuccessMeaasge = function(uniqid){
	$('#'+uniqid).remove();
}
jsClient.closeSuccessMeaasge = function(thisPtr){
	$(thisPtr).closest('div.successAlert').remove();
}


jsClient.showErrorMeaasge = function(msg, autoclose){
	var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
	var uniqid = randLetter + Date.now();

	var msgDomString = '<div class="successAlert" id="'+uniqid+'">';
	msgDomString += '<i class="fas fa-exclamation-triangle"></i> ';
	msgDomString += '<span id="listSuccessMsg"> '+msg+'</span>';
	msgDomString += '<span class="close" onclick="jsClient.closeErrorMeaasge(this)">';
	msgDomString += '<i class="fas fa-times"></i>';
	msgDomString += '</span>';
	msgDomString += '</div>';
	$('#ZERP_UserAlertCt').append(msgDomString);

	// do not auto close: autoclose = false
	if(autoclose == false){
		// don't close
	} else {
		setTimeout(function() {
			jsClient.autoCloseErrorMeaasge(uniqid);
		}, 5000);
	}

	// CSS
	$('.successAlert').css({'background':'lightpink', 'color':'white', 'padding-right': '3px', 'padding-left': '3px'});
	$('.successAlert .material-icons').css({'vertical-align':'middle', 'color':'white'});
}
jsClient.autoCloseErrorMeaasge = function(uniqid){
	$('#'+uniqid).remove();
}
jsClient.closeErrorMeaasge = function(thisPtr){
	$(thisPtr).closest('div.successAlert').remove();
}



/**
 * @Al-Mamun
 * @2019-11-18
 * this message will show close to user input event 
 */
jsClient.showPointerFancyMeaasge = function(msg, eventPtr){

	var body = document.body,
	    html = document.documentElement;

	var height = Math.max( body.scrollHeight, body.offsetHeight, 
	                       html.clientHeight, html.scrollHeight, html.offsetHeight );

    var xTop = (height/2 - 100);

  if(!!eventPtr){
	  var offset = $(eventPtr).offset();
	  var xLeft = offset.left;
	  xTop = offset.top;
  }

	var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
	var uniqid = randLetter + Date.now();

	var msgDomString = '<div class="warningAlert" id="'+uniqid+'">';
	msgDomString += '<i class="fas fa-exclamation-triangle"></i> ';
	msgDomString += ' <span id="listSuccessMsg">'+msg+'</span>';
	msgDomString += '<span class="close" onclick="jsClient.closePointerFancyMeaasge(this)">';
	msgDomString += '<i class="fas fa-times"></i>';
	msgDomString += '</span>';
	msgDomString += '</div>';
	$('body').append(msgDomString);
	setTimeout(function() {
		// jsClient.autoClosePointerFancyMeaasge(uniqid);
	}, 5000);

	// CSS
	$('.warningAlert').css({'background':'lightgreen', 'color':'white'});
	$('.warningAlert .material-icons').css({'vertical-align':'middle', 'color':'white'});
	$('#'+uniqid).css({
		'position': 'absolute',
		'width': '100%',
		'top': (xTop - 70) + 'px',
		'z-index': '999',
		'padding': '15px',
		'background-color': '#fff3cd',
		'border-color': '#ffeeba',
		'color': '#856404',
		'text-align': 'center',
	});
}
jsClient.autoClosePointerFancyMeaasge = function(uniqid){
	$('#'+uniqid).remove();
}
jsClient.closePointerFancyMeaasge = function(thisPtr){
	$(thisPtr).closest('div.warningAlert').remove();
}



jsClient.renderFormError_Close = function(){
	$('#ZERP_UserAlertCtWarrper').css('display', 'none');
}
/**
 * @al-mamun
 * @2019-11-18
 */
jsClient.renderFormError_MinMax = function(){
	if( $('#ZERP_UserAlertCtWarrper').height() > 100 ){
		$('#ZERP_UserAlertCtWarrper').css({
			'height': '47px',
			'max-height': '47px',
			'overflow': 'hidden',
		});
	} else {
		$('#ZERP_UserAlertCtWarrper').css({
			'height': '',
			'max-height': '',
			'overflow': '',
		});
	}
	// show all error lines
	$('#ZERP_UserAlertCt').find('dl, dt, dd, h1, h2, pre').css('display', 'block');
}

jsClient.renderFormError = function(errorMsg){
	// wrap
	if($('#ZERP_UserAlertCtWarrper').length <= 0){
		$('#ZERP_UserAlertCt').wrapAll('<div id="ZERP_UserAlertCtWarrper" style="border: 3px solid red; border-radius: 3px; position: relative;">');
		$('#ZERP_UserAlertCt').empty().append(errorMsg);
		$('#ZERP_UserAlertCtWarrper').append('<button type="button" class="btn btn-info btn-sm" style="position: absolute; top: 1px; right: 45px;" onclick="jsClient.renderFormError_Close(this);" ><i class="fas fa-times"></i></i></button>');
		$('#ZERP_UserAlertCtWarrper').append('<button type="button" class="btn btn-info btn-sm" style="position: absolute; top: 1px; right: 1px;" onclick="jsClient.renderFormError_MinMax(this);" ><i class="fas fa-minus-square"></i></button>');
	}else{
		$('#ZERP_UserAlertCtWarrper').css('display', 'block');
	}

	// hide un-necessary error lines
	$('#ZERP_UserAlertCt').find('dl, dt, dd, h1, h2, pre').css('display', 'none');
	// show necessary error lines
	$('#ZERP_UserAlertCt').find('dl.error-details').css('display', 'block');
	$('#ZERP_UserAlertCt').find('dl.error-details').find('dt').css('display', 'block');
	$('#ZERP_UserAlertCt').find('dl.error-details').find('dd').css('display', 'block');

	$('#ZERP_UserAlertCt').find('dl.error-details dt:nth-child(1)').css('display', 'none');
	$('#ZERP_UserAlertCt').find('dl.error-details dd:nth-child(1)').css('display', 'none');
	$('#ZERP_UserAlertCt').find('dl.error-details dt:nth-child(2)').css('display', 'none');
	$('#ZERP_UserAlertCt').find('dl.error-details dd:nth-child(2)').css('display', 'none');
	$('#ZERP_UserAlertCt').find('dl.error-details dt:nth-child(3)').css('display', 'none');
	$('#ZERP_UserAlertCt').find('dl.error-details dd:nth-child(3)').css('display', 'none');
	$('#ZERP_UserAlertCt').find('dl.error-details dt:nth-child(4)').css('display', 'none');
	$('#ZERP_UserAlertCt').find('dl.error-details dd:nth-child(4)').css('display', 'none');
	// $('#ZERP_UserAlertCt').find('dl.error-details dt:nth-child(5)').css('display', 'none');
	// $('#ZERP_UserAlertCt').find('dl.error-details dd:nth-child(5)').css('display', 'none');
	// $('#ZERP_UserAlertCt').find('dl.error-details dt:nth-child(6)').css('display', 'none');
	// $('#ZERP_UserAlertCt').find('dl.error-details dd:nth-child(6)').css('display', 'none');	
	$('#ZERP_UserAlertCt').focus();
	ZERP.FrmMgr.genFrm.hightlightErrorField( $('#ZERP_UserAlertCtWarrper') );
}



/**
 * How to use 
 * var thisForm = $('#searchForm');
 * var searchParams = jsClient.formToSerializeObject(thisForm);
 */
jsClient.formToSerializeObject = function(thisForm){

  var arrayData, objectData;
  arrayData = thisForm.serializeArray();
  objectData = {};

  $.each(arrayData, function() {
    var value;

    if (this.value != null) {
      value = this.value;
    } else {
      value = '';
    }

    if (objectData[this.name] != null) {
      if (!objectData[this.name].push) {
        objectData[this.name] = [objectData[this.name]];
      }

      objectData[this.name].push(value);
    } else {
      objectData[this.name] = value;
    }
  });

  return objectData;

}

/**
 * How to use 
 * just call this function
 */
jsClient.initSearchAction = function(){
    $('#searchForm input').keypress(function (event) {
        if (event.which == 13) {
            ERPLIST.getSearchData();        
        }
    });
}

jsClient.allValueSame = function(arrayName){
	for (var i = 0; i < arrayName.length; i++) {
	    if (arrayName[i] !== arrayName[0]) {
	    	 return false;
	    }
	}
	return true;
}

jsClient.initiateDateTimePicker = function(){
	$('.datepicker').datetimepicker({ timepicker:false, format:'Y-m-d'});
	$('.timepicker').datetimepicker({ datepicker:false, format:'H:i'});
	$('.datetimepicker').datetimepicker({format:'Y-m-d H:i:s'});
}
jsClient.initDateTimePicker = function(){
  $('.datepicker').datetimepicker({ timepicker:false, format:'Y-m-d'});
  // $('.timepicker').datetimepicker({ datepicker:false, format:'H:i'});
  // $('.timepicker').datetimepicker({ datepicker:false, formatTime:'g:i A'});
  $('.timepicker').datetimepicker({ datepicker:false, format:'H:i', formatTime:'g:i A'});
  $('.datetimepicker').datetimepicker({format:'Y-m-d H:i:s'});
}

jsClient.dateFormatType1 = function(dateTime){
    dateTime = (dateTime == "0000-00-00 00:00:00") ? "-----" : $.datepicker.formatDate( "d-M-yy",new Date(dateTime));
    return dateTime;
}

jsClient.dateFormatType2 = function(dateTime){
    var datex = (dateTime == "0000-00-00 00:00:00") ? "-----" : $.datepicker.formatDate( "d-M-yy",new Date(dateTime));
	var date = new Date(dateTime);
	if (date.getHours()>=12){
	    var hour = parseInt(date.getHours()) - 12;
	    var amPm = "PM";
	} else {
	    var hour = date.getHours(); 
	    var amPm = "AM";
	}
	var time = hour + ":" + date.getMinutes() + " " + amPm;
    return datex + ' ' + time;
    // return dateTime;
}

jsClient.getFormatedDateString1 = function(myDate){
	var dd = myDate.getDate();
	var mm = myDate.getMonth()+1; //January is 0!
	var yyyy = myDate.getFullYear();
	if(dd<10){ dd='0'+dd}
	if(mm<10){ mm='0'+mm}

	var todayDate = yyyy+'-'+mm+'-'+dd;
	return todayDate;
}


jsClient.getTodayDate = function(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	if(dd<10){ dd='0'+dd} 
	if(mm<10){ mm='0'+mm} 

	var todayDate = yyyy+'-'+mm+'-'+dd;
	return todayDate;
}


jsClient.getTodayDateTime = function(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	if(dd<10){ dd='0'+dd} 
	if(mm<10){ mm='0'+mm} 

    var h = today.getHours() + ":"  
    var m = today.getMinutes() + ":" 
    var s = today.getSeconds();

	var todayDateTime = yyyy+'-'+mm+'-'+dd + " " + h + m + s;
	return todayDateTime;
}


jsClient.getCurrentYear = function(){
	var today = new Date();
	var yyyy = today.getFullYear();
	return yyyy;
}

jsClient.dateEntryHelper = function(thisPtr){
	var userVal = $(thisPtr).val();
	if(userVal != "" && userVal != null){
		var userValParts = userVal.split('/');
		if(userValParts.length == 3){
			var ddPart = userValParts[0];
			var mmPart = userValParts[1];
			var yyPart = userValParts[2];
			if(ddPart.length == 1) ddPart = "0"+ddPart;
			if(mmPart.length == 1) mmPart = "0"+mmPart;
			if(yyPart == ""){
				var yySys = jsClient.getCurrentYear();
				var sysVal = ddPart + "-" + mmPart + "-" + yySys;
				$(thisPtr).val(sysVal);
				//console.log(jsClient.dateFormatTranslateLocalToGlobal(sysVal));
			}

		} else {
			if(userVal.length == 4){
				if(userVal.indexOf('/') == -1){
					var ddPart = userVal.substring(0,2);
					var mmPart = userVal.substring(2,4);
					var yySys = jsClient.getCurrentYear();
					var sysVal = ddPart + "-" + mmPart + "-" + yySys;
					$(thisPtr).val(sysVal);
				}
			}
		}
	}
}

jsClient.dateFormatTranslateLocalToGlobal = function(dateLocal){
	var dateGlobal = dateLocal;
	if(dateLocal != "" && dateLocal != null){
		var dateLocalParts = dateLocal.split('-');
		if(dateLocalParts.length == 3){
			var ddPart = dateLocalParts[0];
			var mmPart = dateLocalParts[1];
			var yyPart = dateLocalParts[2];
			dateGlobal = yyPart + "-" + mmPart + "-" + ddPart;
		}
	}
	return dateGlobal;
}

jsClient.dateFormatTranslateGlobalToLocal = function(dateGlobal){
	var dateLocal = dateGlobal;
	if(dateGlobal != "" && dateGlobal != null){
		var dateGlobalParts = dateGlobal.split('-');
		if(dateGlobalParts.length == 3){
			var yyPart = dateGlobalParts[0];
			var mmPart = dateGlobalParts[1];
			var ddPart = dateGlobalParts[2];
			dateLocal = ddPart + "-" + mmPart + "-" + yyPart;
		}
	}
	return dateLocal;
}


jsClient.toggleDateFieldBindAction = function(thisPtr){
	var forAttribute = $(thisPtr).attr('forAttribute');

	if($('input#'+forAttribute).hasClass('bindedDatePicker')){
		$('input#'+forAttribute).datetimepicker("disable");
		$('input#'+forAttribute).datetimepicker("destroy");
		$('input#'+forAttribute).removeClass('bindedDatePicker');
	} else{
		$('input#'+forAttribute).addClass('bindedDatePicker');
		$('input#'+forAttribute).datetimepicker({ timepicker:false, format:'d-m-Y'});
		$('input#'+forAttribute).datetimepicker("enable");
		$('input#'+forAttribute).focus();
	}
}




jsClient.loadScript = function(scriptLocationAndName) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = scriptLocationAndName;
    head.appendChild(script);
}


//===== For GET Method

// var mType =   "get";
// var mUrl  =   "development_api.php";
// var queryParam   = {reqType: "mReqType", fabricid: fabricid};
// var queryData = jsClient.communicationToServer(mReqType, queryParam, mUrl, mType, false);  

//===== For POST Method 
// var mType = 'post';
// var mUrl =  "development_api.php";
// var mReqType = "mReqType";
// var returnData = jsClient.communicationToServer(mReqType, postData, mUrl, mType, false);
/**
 * Ajax function for communicate to server
 * [jsClientCommunicationToServer description]
 * @param  {[type]} mAsync   [description]
 * @param  {[type]} mType    [description]
 * @param  {[type]} mUrl     [description]
 * @param  {[type]} mReqType [description]
 * @param  {[type]} mData    [description]
 * @return {[type]}          [description]
 */
jsClient.communicationToServer = function(mReqType, mData, mUrl, mType, mAsync){

	if(!!!mUrl){mUrl = jsClient.mUrl;}
	if(!!!mType){mType = jsClient.mType;}
	if(!!!mAsync){mAsync = jsClient.mAsync;}

	var returnData = "";
	mData = (mType == "get") ? mData : {reqType: mReqType, data: mData}; 

	$.ajax({
		async 	: 	mAsync,
		type	: 	mType,
		url 	: 	mUrl,
		data 	: 	mData,
		success	: 	function(data){
			returnData = data;
		},
		error	: 	function(){
			alert("error");
		}
	});
	return returnData;
}



/**
 * It will return json data
 */
jsClient.getDbTableStructure = function(mTableNames, mDbNum){

	mType 	= 	"get";
	mUrl 	= 	jsClient._URL_SERVERAPI;
	var queryParam= {reqType: "getStructure", tablenames:mTableNames, dbnum:mDbNum};
	var structure = jsClient.communicationToServer('', queryParam, mUrl, mType, false);
	return	structure;

}

jsClient.getDbTablesStructure_SQL1 = function(mQueryParam, mApiUrl){

	mUrl = (!!!mApiUrl) ? _URL_SERVERFUNCTIONSAPI : mApiUrl;
	mType 	= 	"get";
	var queryParam= {reqType: "getDbTablesStructure_SQL1", sql: mQueryParam};
	// var structure = jsClientCommunicationToServer(mAsync, mType, mUrl, mReqType, queryParam);
	// var structure = jsClient.communicationToServer('', queryParam, mUrl, mType, false);

	return	structure;

}

jsClient.getDbTablesStructure_SQL2 = function(mQueryParam, mApiUrl){

	mUrl = (!!!mApiUrl) ? jsClient._URL_SERVERAPI : mApiUrl;
	mType 	= 	"get";
	var queryParam= {reqType: "getDbTablesStructure_SQL2", sql: mQueryParam};
	var structure = jsClient.communicationToServer('', queryParam, mUrl, mType, false);
	return	structure;

}

/**
 * It will return json data
 */
jsClient.getFormStructure = function(formType, crudMode, mUrl){
	if(!!!mUrl){mUrl = jsClient._URL_SERVERAPI;}
	var mReqType = "";		
	var queryParam = {reqType: "getFormStructure", formtype: formType, crudmode: crudMode};
	var formStructure = jsClient.communicationToServer(mReqType, queryParam, mUrl);
	return formStructure;
}


jsClient.getAutocompleteResourceData = function(mTablename, qColumnName, qFilterParam , mUrl){
	qFilterParam = JSON.stringify(qFilterParam);
	if(!!!mUrl){mUrl = jsClient._URL_SERVERAPI;}
	var resource = [];
	$.ajax({
	async 	: false,
	url: mUrl,
	data: {reqType:"read", tablename:mTablename, whereparam:qFilterParam},
	success: function( data ) {
		var pData = JSON.parse(data);
		$.each(pData, function(key, value){
			$.each(value, function(k, v){
			  if(k == qColumnName){
			    if(resource.indexOf(v) == -1){
					resource.push(v);
				}
			  }
			});
		});
	},
	error: function(){
	  alert("error occured in autocomplete");
	}
	});
	return resource;
}




jsClient.makeSearchFormWithChangeEvent = function(formStructure, dbTableStructure, formId){

	var inputFields = '<form id="'+ formId +'"><div class="responsiveRow">';
	dbTableStructure     = JSON.parse(dbTableStructure);
	var index = 1;
	$.each(formStructure, function(inedx, fieldname){

		var fieldproperties   = dbTableStructure[fieldname];
		var fielddesc = fieldproperties.fielddesc;
		var input = jsClient.makeHTML_InputField_select2(fieldproperties);
		inputFields +=  '<div class="responsiveElement"><b>' + fielddesc + '</b><br>'+input+'</div>';

	});

	inputFields += '<div class="responsiveElement"><br><input type="button" id="btnSearch" value="Find" onClick="getSearchData(this.form.id)"></div>';
	inputFields += '<div class="responsiveElement"><br><input type="button" id="btnReset" value="Reset" onClick="resetSearchForm(this.form.id)"></div>';
	inputFields += '</div></form>';
	return inputFields;
}

jsClient.makeSearchFormWithChangeEvent_DataRange = function(formStructure, dbTableStructure, formId){

	var inputFields = '<form id="'+ formId +'"><div class="responsiveRow">';
	dbTableStructure     = JSON.parse(dbTableStructure);
	var index = 1;
	$.each(formStructure, function(inedx, fieldname){

		var fieldproperties   = dbTableStructure[fieldname];
		var fielddesc = fieldproperties.fielddesc;
		var input = jsClient.makeHTML_InputField_select2(fieldproperties);
		inputFields +=  '<div class="responsiveElement"><b>' + fielddesc + '</b><br>'+input+'</div>';

	});
	inputFields +=  '<div class="responsiveElement"><b>Start Date</b><br><input id="start" type="text" class="datepicker" /></div>';
	inputFields +=  '<div class="responsiveElement"><b></b><br>To</div>';
	inputFields +=  '<div class="responsiveElement"><b>End Date</b><br><input id="end" type="text" class="datepicker" /></div>';

	inputFields += '<div class="responsiveElement"><br><input type="button" id="btnSearch" value="Find" onClick="getSearchData(this.form.id)"></div>';
	inputFields += '<div class="responsiveElement"><br><input type="button" id="btnReset" value="Reset" onClick="jsClient.resetSearchForm(this.form.id)"></div>';
	inputFields += '</div></form>';
	return inputFields;
}


jsClient.makeHTML_InputField = function(fieldproperties){

    var fieldname   = fieldproperties.dbfield;
    var fieldtype   = fieldproperties.type;
    var isrequired  = fieldproperties.required;
    var islibrary   = fieldproperties.islibrary;
    var libraryname = fieldproperties.libraryname;
    var fielddesc   = fieldproperties.fielddesc;
    var placeholder = fieldproperties.placeholder;
    var isvisible   = fieldproperties.isvisible;

	if(isrequired){var attr = "required";} else { var attr = ""}	// true false
	if(!isvisible){fieldtype = "hidden";}  // true false

	if(islibrary){ 						// true false
		var options = jsClient.makeDropdownOptions(libraryname, fielddesc);
		return '<select id="' + fieldname +"" + '" class="" '+ attr +'  name="' + fieldname + '" >' +options+ '</select>';
		
	} else if (fieldtype == 'number') {
		return '<input id="' + fieldname + '" type="number" placeholder="'+ placeholder +'" value="" name="' + fieldname + '" ' + attr + ' />';

	} else if (fieldtype == 'date') {
		return '<input id="' + fieldname +"" + '" type="text" placeholder="'+ placeholder +'" value="" class="datepicker" name="' + fieldname + '" ' + attr + ' />';
	
 	} else if (fieldtype == 'datetime') {
		return '<input id="' + fieldname +"" + '" type="text" placeholder="'+ placeholder +'" value="value" class="datetimepicker" name="' + fieldname + '" ' + attr + ' />';
	
	} else if (fieldtype == 'textarea') {
		return '<textarea id="'+fieldname+'" placeholder="'+ placeholder +'" name="' + fieldname + '"  rows="4" cols="25" ></textarea>';
	
	} else {
		return '<input id="' + fieldname + '" type="text"  placeholder="'+ placeholder +'" value="" name="' + fieldname + '"  ' + attr + ' />';
	}

}


jsClient.makeDropdownOptions = function(libraryName, userField){
	// var options = '<option value="">' + "- - - -" + '</option>';
	var options = '<option value="">Select</option>';

	mType 	= 	"get";
	mUrl 	= 	jsClient._URL_SERVERAPI;
	mData 	= "read="+"mrd_library"+"&"+"LibraryName="+libraryName;
	var queryParam     = {reqType: "getLibraryData", libraryname: libraryName};
 	var returnData = jsClient.communicationToServer('', queryParam, mUrl, mType, false);

 	var parseData = JSON.parse(returnData);
 	var deptOption = new Array();
 	$.each(parseData, function(){
 		$.each(this, function(k, v){
 			if(k == "Description"){
 				if(deptOption.indexOf(v) == -1){
 					deptOption.push(v);
 					options += '<option value="' + v + '">' + v + '</option>';
 				}
 			}
 		});
 	});
    return options;
}


	// var formId =  $("#"+formId);
	// jsClient.clearForm(formId);
jsClient.clearForm = function(form) {
  // iterate over all of the inputs for the form
  // element that was passed in
  $(':input', form).each(function() {
    var type = this.type;
    var tag = this.tagName.toLowerCase(); // normalize case
    // it's ok to reset the value attr of text inputs,
    // password inputs, and textareas
    if (type == 'text' || type == 'password' || tag == 'textarea')
      this.value = "";
    // checkboxes and radios need to have their checked state cleared
    // but should *not* have their 'value' changed
    else if (type == 'checkbox' || type == 'radio')
      this.checked = false;
    // select elements need to have their 'selectedIndex' property set to -1
    // (this works for both single and multiple select elements)
    // else if (tag == 'select')
    //   this.selectedIndex = -1;
  });
};
	// var formId =  $("#"+formId);
	// jsClient.resetForm(formId)
jsClient.resetForm = function(thisobj) {
    // thisform = thisobj.closest('form');
    thisform = thisobj;
    selectbox_in_form = thisform.find('select');

    // completely remove selected when it has been assigned.
    selectbox_in_form.find('option:selected').removeAttr('selected');
    selectbox_in_form.val('');
    selectbox_in_form.change();

    delete selectbox_in_form;
    delete thisform;
}// resetForm



jsClient.makeHTMLTable_ManipulatingJsonData = function(jsonData, classOrId, container){
	if(jsonData.length == 0) {return "";}

	var data = JSON.parse(jsonData);
    var table = $("<table/>",{
    	id: classOrId
	}).addClass(classOrId);

    var row = $("<tr/>");
    $.each(data[0], function(k, v) {
        row.append($("<th/>").text(k));
    });
    table.append(row);    

    $.each(data, function(rowIndex, r) {
        var row = $("<tr/>");
        $.each(r, function(colIndex, c) { 
            row.append($("<td/>").text(c));
        });
        table.append(row);
    });

    if(!!!container){
    	return table;
    }
    return container.append(table);

}


jsClient.makeHTMLTable_ManipulatingJsonDataV2 = function(jsonData, tableTittle, keyTranslators, showSL, classOrId, container, hideColumns){
	if(jsonData.length == 0) {return "";}


	var data = JSON.parse(jsonData);
    var table = $("<table/>",{
    	id: classOrId
	}).addClass(classOrId);

    var row = $("<tr/>");
    if(showSL){row.append($("<th/>").text("SL"));}
    $.each(data[0], function(k, v) {
    	if(!!keyTranslators && !!keyTranslators[k]){
    		if (!!hideColumns && hideColumns.indexOf(k) >= 0 ) {
        		row.append($("<th/>").text(keyTranslators[k]).css('display','none'));
    		} else {
    			row.append($("<th/>").text(keyTranslators[k]));
    		}
    	} else {
    		if ( hideColumns.indexOf(k) >= 0 ) {
    			row.append($("<th/>").text(k).css('display','none'));
    		} else {
    			row.append($("<th/>").text(k));
    		}
    	}
    });
    table.append(row);    

    var sl = 1;
    $.each(data, function(rowIndex, r) {
        var row = $("<tr/>");
         if(showSL){row.append($("<td/>").text(sl));}
        $.each(r, function(colIndex, c) { 
        	if (!!hideColumns &&  hideColumns.indexOf(colIndex) >= 0 ) {
        		row.append($("<td/>").text(c).css('display','none'));
    		} else {
            	row.append($("<td/>").text(c));
    		}
        });
        table.append(row);
        sl++;
    });

	var tableWithTittle = $('<div id="container"></div>');
    if(!!tableTittle){
    	var tableTittle = '<span class="headline1">'+ tableTittle +'</span><br/><br/>';
    	tableWithTittle.append(tableTittle);
    	tableWithTittle.append(table);
    	table = tableWithTittle;
    }
    if(!!!container){
    	return table;
    }
    return container.append(table);

}



// if(jsClient.getMsgType(returnData) == "success"){
// }
jsClient.getMsgType = function(mApiMsg){
  var resMsg = mApiMsg.split("::");
  var msgType = resMsg[0];
  return msgType;
}

jsClient.getMsgBody = function(mApiMsg){
  var resMsg = mApiMsg.split("::");
  var msgType = resMsg[1];
  return msgType;
}

// jsClient.msgDisplayer('success::I love him'); // green
// jsClient.msgDisplayer('error::I love him'); // red
// jsClient.msgDisplayer('warning::I love him'); // yellow
// jsClient.msgDisplayer('info::I love him'); // blue
jsClient.msgDisplayer = function(mApiMsgBody){
  // check external script is loaded
  // var len = $('script[src*="plugin/msgPop.js"]').length; 
  // if (len === 0) {
  //   alert('script not loaded');
  //   jsClient.loadScript('plugin/msgPop.js');
  //   if ($('script[src*="plugin/msgPop.js"]').length === 0) {
  //     alert('still not loaded');
  //   }
  //   else {
  //     alert('loaded now');
  //   }
  // }
  // else {
  //   alert('script loaded');
  // }

  var res  = mApiMsgBody.split("::");
  var type = res[0];
  var body = res[1];

  MsgPop.open({
  Type    : type,
  Content   :   body,
  AutoClose : true});
}







// ****************************************
// jQuery (function ($)
// {   // ready
//     $(window).resize (function (event)
//     {
//         var minwidth = 1200;
//         var minheight = 1024;

//         var bodye = $('body');

//         var bodywidth = bodye.width ();

//         if (bodywidth < minwidth)
//         {   // maintain minimum size
//             bodye
//                 .css ('backgroundSize', minwidth + 'px' + ' ' + minheight + 'px')
//             ;
//         }
//         else
//         {   // expand
//             bodye
//                 .css ('backgroundSize', '100% auto')
//             ;
//         }
//     });
// });






//Ajax Call Request Starndard Format
// Date: 2019-01-01
jsClient.ajaxCallStandardFormat = function(){

  $.ajax({
    method: "POST",
    url: "https://fiddle.jshell.net/favicon.png",
    data: { name: "John", location: "Boston" },
    cache: false,
    beforeSend: function( jqXHR, settings ) {
    }

  }).done(function( response, textStatus, xhr ) {

    if ( console && console.log ) {
      console.log( "Sample of data:", data.slice( 0, 100 ) );
    }

  }).fail(function() {

    alert( "error" );

  });

}





//======================= Ajax Call Request Format ==================================
// formate-1
jsClient.ajaxRF1 = function(){
  $.ajax({
      url: rSessionAPI + '?reqType=getListData',
      cache: false,
  }).done(function(response) {
   
    ERPLIST.displayQueryData(response);
    $.fancybox.update();

    $('#popupListContent #loadingDiv').empty();
  });
}



jsClient.ajaxRF1 = function(){
  $.ajax({
    async: false,
    type: "POST",
    url: ZERP.FrmMgr.genFrm.ENTITY_API_URL,
    data: postGB,
    beforeSend: function() {
    },
    success: function(data) {
      returnGenericBean = JSON.parse(data);
      if(returnGenericBean.result == 'success'){
        ZERP.FrmMgr.genFrm.hideFormInterface();
        LISTDOC.redrawList();
      }
    }
  });
}



jsClient.ajaxRF1 = function(){
  $.ajax({
    type: 'post',
    url: ZERP.FrmMgr.genFrm.ENTITY_API_URL,
    data: postGB,
    success: function(returnGB) {
      console.log(returnGB);
      returnGB = JSON.parse(returnGB);
      if (!!returnGB.errormsgs && returnGB.errormsgs.length > 0) {
        console.log(returnGB.errormsgs.join('\n'));
        alert(returnGB.errormsgs.join('\n'));
      } else {
        ZERP.FrmMgr.genFrm.readMode_header();
        jsClient.showSuccessMeaasge('Successfully save transaction');
      }
    }
  }).fail(function(e) {
    alert('Saving failed, please try again.');
  });
}


jsClient.ajaxRF1 = function(){

  function genericSyncAjaxCall(xurl, xsearchParams, thisfieldname){
    var response = '';
    $.ajax({
      type: "GET",                //GET or POST or PUT or DELETE verb
      url: xurl,                  // Location of the service
      data: xsearchParams,        //Data sent to server
      cache: false,
      // contentType: "",         // content type sent to server
      // dataType: "json",        //Expected data format from server// the type of data we expect back
      // processdata: true,       //True or False
      timeout:3000,               //3 second timeout
      beforeSend: function(jqXHR, settings) {
        console.log('\n\nbeforeSend');
        console.log(arguments);
        console.log('\n\nbeforeSend');
        url = settings.url;
      },
      // code to run if the request succeeds;
      // the response is passed to the function
      success : function(response, textStatus, xhr) {
         // console.log(arguments);
         // console.log(xhr.status);
        var response = JSON.parse(response);
        // LISTDOC.populateLibCache[thisfieldname] = response; // cache lib data
        LISTDOC.populateLibCache[xsearchParams.library] = response; // cache lib data
         return response;
      },
      // code to run if the request fails;
      // the raw request and status codes are
      // passed to the function
      error : function(xhr, status, thrownError) {
        console.log(arguments);
        console.log('Sorry, there was a problem!');
        console.log(thrownError);
      },
      // code to run regardless of success or failure
      complete : function(xhr, textStatus) {
        console.log(xsearchParams);
        console.log('\n\n......... '+ thisfieldname +' --> libraray data loading end of ajax request --> ' + url);
        console.log('The request is complete!');
      }
    });

    return response;

  }

}


jsClient.ajaxRF1 = function(){

$.ajax({
  url: "https://fiddle.jshell.net/favicon.png",
  beforeSend: function( xhr ) {
    xhr.overrideMimeType( "text/plain; charset=x-user-defined" );
  }
})
  .done(function( data ) {
    if ( console && console.log ) {
      console.log( "Sample of data:", data.slice( 0, 100 ) );
    }
  });

}

jsClient.ajaxRF1 = function(){

// Assign handlers immediately after making the request,
// and remember the jqXHR object for this request
var jqxhr = $.ajax( "example.php" )
  .done(function() {
    alert( "success" );
  })
  .fail(function() {
    alert( "error" );
  })
  .always(function() {
    alert( "complete" );
  });
 
// Perform other work here ...
 
// Set another completion function for the request above
jqxhr.always(function() {
  alert( "second complete" );
});



$.ajax({
  method: "POST",
  url: "some.php",
  data: { name: "John", location: "Boston" }
})
  .done(function( msg ) {
    alert( "Data Saved: " + msg );
  });

}


jsClient.ajaxRF1 = function(){

$.post( "ajax/test.html", function( data ) {
  $( ".result" ).html( data );
})

$.post( "test.php", { name: "John", time: "2pm" })
  .done(function( data ) {
    alert( "Data Loaded: " + data );
  });


$.get( "test.cgi", { name: "John", time: "2pm" } )
  .done(function( data ) {
    alert( "Data Loaded: " + data );
  });
}


//Ajax Call Request Starndard Format
jsClient.ajaxCallStandardFormat = function(){

  $.ajax({
    method: "POST",
    url: "https://fiddle.jshell.net/favicon.png",
    data: { name: "John", location: "Boston" },
    cache: false,
    beforeSend: function( jqXHR, settings ) {
    }

  }).done(function( response, textStatus, xhr ) {

    if ( console && console.log ) {
      console.log( "Sample of data:", data.slice( 0, 100 ) );
    }

  }).fail(function() {

    alert( "error" );

  });

}
//======================= Ajax Call Request Format ==================================





// -------------------- Genaral pajination --------------------------------------------------------------------------------------------------------------------------------------
jsClient.makePagination = function(jsonData){

  var data = JSON.parse(jsonData);
  pageNum      = data['pageNum'];
  lastPageNum  = data['lastPageNum'];
  queryRowsNum = data['queryRowsNum'];
  showLimit    = data['showLimit'];

  var rowLimit =  jsClient.makeRowLimit(showLimit);
  var pagTable =  jsClient.getPagination(showLimit, queryRowsNum, pageNum);

  var paginationDiv = '<div style="display:inline-block" id="paginationContainer">';
  paginationDiv += '<div style="float:left;" id="divRowCounter">';
  paginationDiv += '<span>';
  paginationDiv += queryRowsNum;
  paginationDiv += ' records found ';
  paginationDiv += '</span>';
  paginationDiv += '</div>';
  paginationDiv += '<div style="float:left;" id="divPage">';
  paginationDiv += pagTable;
  paginationDiv += '</div>';
  paginationDiv += '<div style="float:left;" id="divRowLimit">';
  paginationDiv += rowLimit;
  paginationDiv += '</div>';
  paginationDiv += '</div>';

  return paginationDiv;
}


jsClient.makeRowLimit = function(show){

    var rowLimit = "";
    rowLimit += '<label> <span id="spanRowLimit">Rows Limit:</span>' 
    rowLimit += '<select name="show" onChange="jsClient.changeDisplayRowCount(this.value);">';
    rowLimit += (show == 5) ? '<option value="5" selected="selected" >5</option>' : '<option value="5">5</option>';
    rowLimit += (show == 10) ? '<option value="10" selected="selected" >10</option>' : '<option value="10">10</option>';
    rowLimit += (show == 20) ? '<option value="20" selected="selected" >20</option>' : '<option value="20">20</option>';
    rowLimit += (show == 30) ? '<option value="30" selected="selected" >30</option>' : '<option value="30">30</option>';
    rowLimit += (show == 40) ? '<option value="40" selected="selected" >40</option>' : '<option value="40">40</option>';
    rowLimit += (show == 50) ? '<option value="50" selected="selected" >50</option>' : '<option value="50">50</option>';
    rowLimit += '</select>';
    rowLimit += '</label>';

    return rowLimit;

}

jsClient.changeDisplayRowCount = function(numRecords) {
  var params = jsClient.paramsToObj(window.location.search);
  var URL_searchParams = "";
  if(Object.keys(params).length > 0){
    URL_searchParams = $.param(params); 
  }
  ERPLIST.getListData(numRecords, 1, URL_searchParams);
}

jsClient.getPagination = function(showLimit, rows, page){ 
    var limit = showLimit;
    var adjacents = 3;
    show = showLimit;

    pagination='';
    if (page == 0) page = 1;                    //if no page var is given, default to 1.
    prev = page - 1;                            //previous page is page - 1
    next = page + 1;                            //next page is page + 1
    prev_='';
    first='';
    lastpage = Math.ceil(rows/limit);  
    // lastpage = Math.round(rows/limit);  
    next_='';
    last='';

    if(lastpage > 1)
    {   
        
        //previous button
        if (page > 1) 
            // prev_+= "<a class='page-numbers' href=\"?page=prev\">previous</a>";
            prev_  += '<a href="javascript:void(0);" class="page-numbers page-'+ prev +'"  onclick="ERPLIST.getListData(  \''+ show +'\'      ' +","+ '    \'' + prev+ '\');" > previous </a>';

        else {
            //pagination.= "<span class=\"disabled\">previous</span>";  
            }
        


        //pages 
        if (lastpage < 5 + (adjacents * 2)) //not enough pages to bother breaking it up
        {   
        first='';
            for (counter = 1; counter <= lastpage; counter++)
            {
                if (counter == page)
                    pagination+= "<span class='current'>" + counter + "</span>";
                else
                    // pagination+= "<a class='page-numbers' href='?page=" +counter+ "' " + "> " + counter + "</a>"; 
                    pagination  += '<a href="javascript:void(0);" class="page-numbers page-'+ counter +'"  onclick="ERPLIST.getListData(  \''+ show +'\'      ' +","+ '    \'' + counter+ '\');" > ' + counter + ' </a>';
            }
            last='';
        }
        else if(lastpage > 3 + (adjacents * 2))  //enough pages to hide some
        {
            //close to beginning; only hide later pages
            first='';
            if(page < 1 + (adjacents * 2))      
            {
                for (counter = 1; counter < 4 + (adjacents * 2); counter++)
                {
                    if (counter == page)
                        pagination+= "<span class='current'>" + counter + "</span>";
                    else
                        // pagination+= "<a class='page-numbers' href='?page="+counter + "' "+ "> " +counter+ "</a>"; 
                    pagination  += '<a href="javascript:void(0);" class="page-numbers page-'+ counter +'"  onclick="ERPLIST.getListData(  \''+ show +'\'      ' +","+ '    \'' + counter+ '\');" > ' + counter + ' </a>';

                }
            last+= "<a class='page-numbers' href='?page="+lastpage + "' " + ">Last</a>";          
            }
            
            //in middle; hide some front and some back
            else if(lastpage - (adjacents * 2) > page && page > (adjacents * 2))
            {
               first+= "<a class='page-numbers' href='?page=1'>First</a>";    
            for (counter = page - adjacents; counter <= page + adjacents; counter++)
                {
                    if (counter == page)
                        pagination+= "<span class=current>" + counter + "</span>";
                    else
                        // pagination+= "<a class='page-numbers' href='?page=" + counter + "' " + ">counter</a>"; 
                    pagination  += '<a href="javascript:void(0);" class="page-numbers page-'+ counter +'"  onclick="ERPLIST.getListData(  \''+ show +'\'      ' +","+ '    \'' + counter+ '\');" > ' + counter + ' </a>';

                }
                last+= "<a class='page-numbers' href='?page='"+lastpage +"' " + ">Last</a>";          
            }
            //close to end; only hide early pages
            else
            {
                first+= "<a class='page-numbers' href='?page=1'>First</a>";   
                for (counter = lastpage - (2 + (adjacents * 2)); counter <= lastpage; counter++)
                {
                    if (counter == page)
                        pagination+= "<span class='current'>"+counter+"</span>";
                    else
                        // pagination+= "<a class='page-numbers' href='?page="+counter+"' " + ">counter</a>";   
                    pagination  += '<a href="javascript:void(0);" class="page-numbers page-'+ counter +'"  onclick="ERPLIST.getListData(  \''+ show +'\'      ' +","+ '    \'' + counter+ '\');" > ' + counter + ' </a>';

                }
                last='';
            }
            
            }





        if (page < counter - 1) 
            // next_+= "<a class='page-numbers' href='?page='"+next+">next</a>";
            next_  += '<a href="javascript:void(0);" class="page-numbers page-'+ next +'"  onclick="ERPLIST.getListData(  \''+ show +'\'      ' +","+ '    \'' + next+ '\');" > next </a>';


        else{
            //pagination.= "<span class=\"disabled\">next</span>";
            }
        pagination = "<div id='pagination' class='pagination'>" + first + prev_ + pagination + next_ + last;
        //next button
        
        pagination += "</div>\n";        



    }

    // pagination = "<div class='pagination'>" + first + prev_ + pagination + next_ + last;
    
    return pagination;  
}


jsClient.paginationCSS = function(){

  $('#paginationContainer #divRowCounter').css({
    'padding':'4px 10px',
    'color':'black',
    'font-weight':'bold',
    // 'border': '2px solid blue',
    // 'vertical-align': 'text-bottom',
    'margin-top': '3pt',
    'height': '20pt'
  });

  $('#paginationContainer #divPage').css({
    'padding':'4px 10px',
  });

  $('#paginationContainer #divRowLimit').css({
    'padding':'4px 10px',
    'color':'black',
    'font-weight':'bold',
    // 'border': '2px solid blue',
    // 'vertical-align': 'text-bottom',
    'height': '20pt'
  });

  $('#paginationContainer #divRowLimit #spanRowLimit').css({
    'padding-right':'4pt'
  });

  //------------------------
  $('.pagination').css({
    // 'width':'600px',
    'margin':'0px auto'
  });
  $('.pagination .current').css({
    'padding':'4px 10px',
    'color':'black',
    'margin':'1px 0px 9px 6px',
    'display':'block',
    'text-decoration':'none',
    'float':'left',
    'text-transform':'capitalize',
    'background':'whitesmoke'
  });
  $('.pagination .page-numbers').css({
    'padding':'4px 10px',
    'color':'white !important',
    'margin':'1px 0px 9px 6px',
    'display':'block',
    'text-decoration':'none',
    'float':'left',
    'text-transform':'capitalize',
    'background':'#00b4cc'
  });

}






// ---- loupeList Pagination ------------------------------------------------------------------------------------------------------------------------------------------
jsClient.loupeList_makePagination = function(jsonData){

  var data = JSON.parse(jsonData);
  pageNum      = data['pageNum'];
  lastPageNum  = data['lastPageNum'];
  queryRowsNum = data['queryRowsNum'];
  showLimit    = data['showLimit'];

  var rowLimit =  jsClient.loupeList_makeRowLimit(showLimit);
  var pagTable =  jsClient.loupeList_getPagination(showLimit, queryRowsNum, pageNum);

  var paginationDiv = '<div style="display:inline-block" id="loupeList_paginationContainer">';
  paginationDiv += '<div style="float:left;" id="divRowCounter">';
  paginationDiv += '<span>';
  paginationDiv += queryRowsNum;
  paginationDiv += ' records found ';
  paginationDiv += '</span>';
  paginationDiv += '</div>';
  paginationDiv += '<div style="float:left;" id="divPage">';
  paginationDiv += pagTable;
  paginationDiv += '</div>';
  paginationDiv += '<div style="float:left;" id="divRowLimit">';
  paginationDiv += rowLimit;
  paginationDiv += '</div>';
  paginationDiv += '</div>';

  return paginationDiv;
}


jsClient.loupeList_makeRowLimit = function(show){

    var rowLimit = "";
    rowLimit += '<label> <span id="spanRowLimit">Rows Limit:</span>' 
    rowLimit += '<select name="show" onChange="jsClient.loupeList_changeDisplayRowCount(this.value);">';
    rowLimit += (show == 5) ? '<option value="5" selected="selected" >5</option>' : '<option value="5">5</option>';
    rowLimit += (show == 10) ? '<option value="10" selected="selected" >10</option>' : '<option value="10">10</option>';
    rowLimit += (show == 20) ? '<option value="20" selected="selected" >20</option>' : '<option value="20">20</option>';
    rowLimit += (show == 30) ? '<option value="30" selected="selected" >30</option>' : '<option value="30">30</option>';
    rowLimit += (show == 40) ? '<option value="40" selected="selected" >40</option>' : '<option value="40">40</option>';
    rowLimit += (show == 50) ? '<option value="50" selected="selected" >50</option>' : '<option value="50">50</option>';
    rowLimit += '</select>';
    rowLimit += '</label>';

    return rowLimit;

}

jsClient.loupeList_changeDisplayRowCount = function(numRecords) {
    LIZERP.loupeList_getSearchData(numRecords, 1);
}

jsClient.loupeList_getPagination = function(showLimit, rows, page){ 
    var limit = showLimit;
    var adjacents = 3;
    show = showLimit;

    pagination='';
    if (page == 0) page = 1;                    //if no page var is given, default to 1.
    prev = page - 1;                            //previous page is page - 1
    next = page + 1;                            //next page is page + 1
    prev_='';
    first='';
    lastpage = Math.ceil(rows/limit);  
    // lastpage = Math.round(rows/limit);  
    next_='';
    last='';

    if(lastpage > 1)
    {   
        
        //previous button
        if (page > 1) 
            // prev_+= "<a class='page-numbers' href=\"?page=prev\">previous</a>";
            prev_  += '<a href="javascript:void(0);" class="page-numbers page-'+ prev +'"  onclick="LIZERP.loupeList_getSearchData(  \''+ show +'\'      ' +","+ '    \'' + prev+ '\');" > previous </a>';

        else {
            //pagination.= "<span class=\"disabled\">previous</span>";  
            }
        


        //pages 
        if (lastpage < 5 + (adjacents * 2)) //not enough pages to bother breaking it up
        {   
        first='';
            for (counter = 1; counter <= lastpage; counter++)
            {
                if (counter == page)
                    pagination+= "<span class='current'>" + counter + "</span>";
                else
                    // pagination+= "<a class='page-numbers' href='?page=" +counter+ "' " + "> " + counter + "</a>"; 
                    pagination  += '<a href="javascript:void(0);" class="page-numbers page-'+ counter +'"  onclick="LIZERP.loupeList_getSearchData(  \''+ show +'\'      ' +","+ '    \'' + counter+ '\');" > ' + counter + ' </a>';
            }
            last='';
        }
        else if(lastpage > 3 + (adjacents * 2))  //enough pages to hide some
        {
            //close to beginning; only hide later pages
            first='';
            if(page < 1 + (adjacents * 2))      
            {
                for (counter = 1; counter < 4 + (adjacents * 2); counter++)
                {
                    if (counter == page)
                        pagination+= "<span class='current'>" + counter + "</span>";
                    else
                        // pagination+= "<a class='page-numbers' href='?page="+counter + "' "+ "> " +counter+ "</a>"; 
                    pagination  += '<a href="javascript:void(0);" class="page-numbers page-'+ counter +'"  onclick="LIZERP.loupeList_getSearchData(  \''+ show +'\'      ' +","+ '    \'' + counter+ '\');" > ' + counter + ' </a>';

                }
            // last+= "<a class='page-numbers' href='?page="+lastpage + "' " + ">Last</a>"; 
            last+= '<a href="javascript:void(0);" class="page-numbers page-'+ counter +'"  onclick="LIZERP.loupeList_getSearchData(  \''+ show +'\'      ' +","+ '    \'' + lastpage+ '\');" > ' + 'Last' + ' </a>';          
         
            }
            
            //in middle; hide some front and some back
            else if(lastpage - (adjacents * 2) > page && page > (adjacents * 2))
            {
               // first+= "<a class='page-numbers' href='?page=1'>First</a>";    
               first+='<a href="javascript:void(0);" class="page-numbers page-'+ counter +'"  onclick="LIZERP.loupeList_getSearchData(  \''+ show +'\'      ' +","+ '    \'' + '1'+ '\');" > ' + 'First' + ' </a>';          
            for (counter = page - adjacents; counter <= page + adjacents; counter++)
                {
                    if (counter == page)
                        pagination+= "<span class=current>" + counter + "</span>";
                    else
                        // pagination+= "<a class='page-numbers' href='?page=" + counter + "' " + ">counter</a>"; 
                    pagination  += '<a href="javascript:void(0);" class="page-numbers page-'+ counter +'"  onclick="LIZERP.loupeList_getSearchData(  \''+ show +'\'      ' +","+ '    \'' + counter+ '\');" > ' + counter + ' </a>';

                }
                // last+= "<a class='page-numbers' href='?page='"+lastpage +"' " + ">Last</a>";    
                last+= '<a href="javascript:void(0);" class="page-numbers page-'+ counter +'"  onclick="LIZERP.loupeList_getSearchData(  \''+ show +'\'      ' +","+ '    \'' + lastpage+ '\');" > ' + 'Last' + ' </a>';                        
            }
            //close to end; only hide early pages
            else
            {
                // first+= "<a class='page-numbers' href='?page=1'>First</a>";  
                first+='<a href="javascript:void(0);" class="page-numbers page-'+ counter +'"  onclick="LIZERP.loupeList_getSearchData(  \''+ show +'\'      ' +","+ '    \'' + '1'+ '\');" > ' + 'First' + ' </a>';                  
                for (counter = lastpage - (2 + (adjacents * 2)); counter <= lastpage; counter++)
                {
                    if (counter == page)
                        pagination+= "<span class='current'>"+counter+"</span>";
                    else
                        // pagination+= "<a class='page-numbers' href='?page="+counter+"' " + ">counter</a>";   
                    pagination  += '<a href="javascript:void(0);" class="page-numbers page-'+ counter +'"  onclick="LIZERP.loupeList_getSearchData(  \''+ show +'\'      ' +","+ '    \'' + counter+ '\');" > ' + counter + ' </a>';

                }
                last='';
            }
            
        }





        if (page < counter - 1) 
            // next_+= "<a class='page-numbers' href='?page='"+next+">next</a>";
            next_  += '<a href="javascript:void(0);" class="page-numbers page-'+ next +'"  onclick="LIZERP.loupeList_getSearchData(  \''+ show +'\'      ' +","+ '    \'' + next+ '\');" > next </a>';


        else{
            //pagination.= "<span class=\"disabled\">next</span>";
            }
        pagination = "<div id='pagination' class='pagination'>" + first + prev_ + pagination + next_ + last;
        //next button
        
        pagination += "</div>\n";        



    }

    // pagination = "<div class='pagination'>" + first + prev_ + pagination + next_ + last;
    
    return pagination;  
}


jsClient.loupeList_paginationCSS = function(){

  $('#loupeList_paginationContainer #divRowCounter').css({
    'padding':'4px 10px',
    'color':'black',
    'font-weight':'bold',
    // 'border': '2px solid blue',
    // 'vertical-align': 'text-bottom',
    'margin-top': '3pt',
    'height': '20pt'
  });

  $('#loupeList_paginationContainer #divPage').css({
    'padding':'4px 10px',
  });

  $('#loupeList_paginationContainer #divRowLimit').css({
    'padding':'4px 10px',
    'color':'black',
    'font-weight':'bold',
    // 'border': '2px solid blue',
    // 'vertical-align': 'text-bottom',
    'height': '20pt'
  });

  $('#loupeList_paginationContainer #divRowLimit #spanRowLimit').css({
    'padding-right':'4pt'
  });

  //------------------------
  $('#loupeList_paginationContainer .pagination').css({
    // 'width':'600px',
    'margin':'0px auto'
  });
  $('#loupeList_paginationContainer .pagination .current').css({
    'padding':'4px 10px',
    'color':'black',
    'margin':'1px 0px 9px 6px',
    'display':'block',
    'text-decoration':'none',
    'float':'left',
    'text-transform':'capitalize',
    'background':'whitesmoke'
  });
  $('#loupeList_paginationContainer .pagination .page-numbers').css({
    'padding':'4px 10px',
    'color':'white !important',
    'margin':'1px 0px 9px 6px',
    'display':'block',
    'text-decoration':'none',
    'float':'left',
    'text-transform':'capitalize',
    'background':'#00b4cc'
  });

}



// ---------- Modal pagination -------------------------------------------------------------------------------------------------------------------------------------------------
jsClient.makePagination_Modal = function(jsonData){

  var data = JSON.parse(jsonData);
  pageNum      = data['pageNum'];
  lastPageNum  = data['lastPageNum'];
  queryRowsNum = data['queryRowsNum'];
  showLimit    = data['showLimit'];

  var rowLimit =  jsClient.makeRowLimit_Modal(showLimit);
  var pagTable =  jsClient.getPagination_Modal(showLimit, queryRowsNum, pageNum);

  var paginationDiv = '<div style="display:inline-block" id="paginationContainer">';
  paginationDiv += '<div style="float:left;" id="divRowCounter">';
  paginationDiv += '<span>';
  paginationDiv += queryRowsNum;
  paginationDiv += ' records found ';
  paginationDiv += '</span>';
  paginationDiv += '</div>';
  paginationDiv += '<div style="float:left;" id="divPage">';
  paginationDiv += pagTable;
  paginationDiv += '</div>';
  paginationDiv += '<div style="float:left;" id="divRowLimit">';
  paginationDiv += rowLimit;
  paginationDiv += '</div>';
  paginationDiv += '</div>';

  return paginationDiv;
}


jsClient.makeRowLimit_Modal = function(show){

    var rowLimit = "";
    rowLimit += '<label> <span id="spanRowLimit">Rows Limit:</span>' 
    rowLimit += '<select name="show" onChange="jsClient.changeDisplayRowCount_Modal(this.value);">';
    rowLimit += (show == 5) ? '<option value="5" selected="selected" >5</option>' : '<option value="5">5</option>';
    rowLimit += (show == 10) ? '<option value="10" selected="selected" >10</option>' : '<option value="10">10</option>';
    rowLimit += (show == 20) ? '<option value="20" selected="selected" >20</option>' : '<option value="20">20</option>';
    rowLimit += (show == 30) ? '<option value="30" selected="selected" >30</option>' : '<option value="30">30</option>';
    rowLimit += (show == 40) ? '<option value="40" selected="selected" >40</option>' : '<option value="40">40</option>';
    rowLimit += (show == 50) ? '<option value="50" selected="selected" >50</option>' : '<option value="50">50</option>';
    rowLimit += '</select>';
    rowLimit += '</label>';

    return rowLimit;

}

jsClient.changeDisplayRowCount_Modal = function(numRecords) {
    LIZERP.getSearchData_Modal(numRecords, 1);
}

jsClient.getPagination_Modal = function(showLimit, rows, page){ 
    var limit = showLimit;
    var adjacents = 3;
    show = showLimit;

    pagination='';
    if (page == 0) page = 1;                    //if no page var is given, default to 1.
    prev = page - 1;                            //previous page is page - 1
    next = page + 1;                            //next page is page + 1
    prev_='';
    first='';
    lastpage = Math.ceil(rows/limit);  
    // lastpage = Math.round(rows/limit);  
    next_='';
    last='';

    if(lastpage > 1)
    {   
        
        //previous button
        if (page > 1) 
            // prev_+= "<a class='page-numbers' href=\"?page=prev\">previous</a>";
            prev_  += '<a href="javascript:void(0);" class="page-numbers page-'+ prev +'"  onclick="LIZERP.getSearchData_Modal(  \''+ show +'\'      ' +","+ '    \'' + prev+ '\');" > previous </a>';

        else {
            //pagination.= "<span class=\"disabled\">previous</span>";  
            }
        


        //pages 
        if (lastpage < 5 + (adjacents * 2)) //not enough pages to bother breaking it up
        {   
        first='';
            for (counter = 1; counter <= lastpage; counter++)
            {
                if (counter == page)
                    pagination+= "<span class='current'>" + counter + "</span>";
                else
                    // pagination+= "<a class='page-numbers' href='?page=" +counter+ "' " + "> " + counter + "</a>"; 
                    pagination  += '<a href="javascript:void(0);" class="page-numbers page-'+ counter +'"  onclick="LIZERP.getSearchData_Modal(  \''+ show +'\'      ' +","+ '    \'' + counter+ '\');" > ' + counter + ' </a>';
            }
            last='';
        }
        else if(lastpage > 3 + (adjacents * 2))  //enough pages to hide some
        {
            //close to beginning; only hide later pages
            first='';
            if(page < 1 + (adjacents * 2))      
            {
                for (counter = 1; counter < 4 + (adjacents * 2); counter++)
                {
                    if (counter == page)
                        pagination+= "<span class='current'>" + counter + "</span>";
                    else
                        // pagination+= "<a class='page-numbers' href='?page="+counter + "' "+ "> " +counter+ "</a>"; 
                    pagination  += '<a href="javascript:void(0);" class="page-numbers page-'+ counter +'"  onclick="LIZERP.getSearchData_Modal(  \''+ show +'\'      ' +","+ '    \'' + counter+ '\');" > ' + counter + ' </a>';

                }
            last+= "<a class='page-numbers' href='?page="+lastpage + "' " + ">Last</a>";          
            }
            
            //in middle; hide some front and some back
            else if(lastpage - (adjacents * 2) > page && page > (adjacents * 2))
            {
               first+= "<a class='page-numbers' href='?page=1'>First</a>";    
            for (counter = page - adjacents; counter <= page + adjacents; counter++)
                {
                    if (counter == page)
                        pagination+= "<span class=current>" + counter + "</span>";
                    else
                        // pagination+= "<a class='page-numbers' href='?page=" + counter + "' " + ">counter</a>"; 
                    pagination  += '<a href="javascript:void(0);" class="page-numbers page-'+ counter +'"  onclick="LIZERP.getSearchData_Modal(  \''+ show +'\'      ' +","+ '    \'' + counter+ '\');" > ' + counter + ' </a>';

                }
                last+= "<a class='page-numbers' href='?page='"+lastpage +"' " + ">Last</a>";          
            }
            //close to end; only hide early pages
            else
            {
                first+= "<a class='page-numbers' href='?page=1'>First</a>";   
                for (counter = lastpage - (2 + (adjacents * 2)); counter <= lastpage; counter++)
                {
                    if (counter == page)
                        pagination+= "<span class='current'>"+counter+"</span>";
                    else
                        // pagination+= "<a class='page-numbers' href='?page="+counter+"' " + ">counter</a>";   
                    pagination  += '<a href="javascript:void(0);" class="page-numbers page-'+ counter +'"  onclick="LIZERP.getSearchData_Modal(  \''+ show +'\'      ' +","+ '    \'' + counter+ '\');" > ' + counter + ' </a>';

                }
                last='';
            }
            
            }





        if (page < counter - 1) 
            // next_+= "<a class='page-numbers' href='?page='"+next+">next</a>";
            next_  += '<a href="javascript:void(0);" class="page-numbers page-'+ next +'"  onclick="LIZERP.getSearchData_Modal(  \''+ show +'\'      ' +","+ '    \'' + next+ '\');" > next </a>';


        else{
            //pagination.= "<span class=\"disabled\">next</span>";
            }
        pagination = "<div id='pagination' class='pagination'>" + first + prev_ + pagination + next_ + last;
        //next button
        
        pagination += "</div>\n";        



    }

    // pagination = "<div class='pagination'>" + first + prev_ + pagination + next_ + last;
    
    return pagination;  
}
