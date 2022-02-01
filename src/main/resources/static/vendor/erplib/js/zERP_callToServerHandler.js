// This Js will handle dynamic Item Type Subcode by calling to server by on change item type


var ZERP = ZERP || {};
ZERP.System = ZERP.System || {};


ZERP.Utils = ZERP.Utils || {};
ZERP.Entity = ZERP.Entity || {};
ZERP.FileMgr = ZERP.FileMgr || {};

ZERP.FrmMgr = ZERP.FrmMgr || {};
ZERP.FrmMgr.genFrm = ZERP.FrmMgr.genFrm || {};


ZERP.FrmMgr.genFrm.addSystemVariable = function(nGenericBean){
  nGenericBean.rEntityName = ZERP.System.rEntityName;
  nGenericBean.rActiveOperation = ZERP.rActiveOperation;
  nGenericBean.rActiveFormTab = ZERP.System.rActiveFormTab;
  nGenericBean.rRunTime = ZERP.System.rRunTime;
  nGenericBean.rCopy = (!!ZERP.FrmMgr.genFrm.isCopy) ? '1' : '0';
  nGenericBean.rReqType = 'getCustomizeEntityStructure';
  nGenericBean.rCallServerMethodName = 'justCallToServer';

  if(!!ZERP.rFireLookupField && ZERP.rFireLookupField === true){
    nGenericBean.rEventFireAttributeName = ZERP.rActiveLookupFieldName;
  }

  return nGenericBean;
}

ZERP.FrmMgr.genFrm.unSetSystemVariablesAfterCallToServer = function(){
  
  if(!!ZERP.rFireLookupField && ZERP.rFireLookupField === true) delete ZERP.rFireLookupField;

}


ZERP.FrmMgr.genFrm.reDrawForm = function(formMode){
  var nGenericBean = ZERP.System.EntityStructureObj['GenericBean'];

  ZERP.FrmMgr.genFrm.newForm();
  ZERP.FrmMgr.genFrm.fillForm(nGenericBean);
  ZERP.FrmMgr.genFrm.initForm(formMode);
  if(!!ZERP.System.rActiveFocusField){
    $(ZERP.FrmMgr.genFrm.formId + ' #' + ZERP.System.rActiveFocusField).focus();
  }

  if(!!ZERP.System.EntityStructureObj['rActiveOperation']){
    ZERP.rActiveOperation = ZERP.System.EntityStructureObj['rActiveOperation'];
  }
  if(!!ZERP.System.EntityStructureObj['rActiveFormTab']){
    ZERP.rActiveFormTab = ZERP.System.EntityStructureObj['rActiveFormTab'];
    ZERP.FrmMgr.genFrm.activeFormTab(ZERP.rActiveFormTab);
  }

}


ZERP.FrmMgr.genFrm.getFormData = function(){

  // 1. validation
  // var error = false;
  var HAS_OWN_HEADERENTTRY_SESSION = ZERP.System.EntityStructureObj['HAS_OWN_HEADERENTTRY_SESSION'];
  // if(!!HAS_OWN_HEADERENTTRY_SESSION && HAS_OWN_HEADERENTTRY_SESSION){
  //   error = error || ZERP.FrmMgr.genFrm.validateFormContainerFields('#ZERP_HeaderEntryCt');
  //   if(error) return;
  // }

  // error = error || ZERP.FrmMgr.genFrm.validateFormContainerFields(ZERP.FrmMgr.genFrm.formId);
  // if(error) return;

  // 2. collect data
  var entityFormObj = {};
  var _baseStructure = ZERP.System.EntityStructureObj;
  ZERP.FrmMgr.genFrm.formAttributes = _baseStructure['Attributes'];   
  $.each(ZERP.FrmMgr.genFrm.formAttributes, function(attributeName, attributeProperties) {
    entityFormObj[attributeName] = $(ZERP.FrmMgr.genFrm.formId + ' #' + attributeName).val();
    //checkbox
    if(!!attributeProperties.HtmlType && attributeProperties.HtmlType == 'checkbox'){
      var isChecked = $(ZERP.FrmMgr.genFrm.formId + ' #' + attributeName).prop('checked');
      entityFormObj[attributeName] = (isChecked === true) ? '1' : '0';
    } else if(!!attributeProperties.HtmlType && attributeProperties.HtmlType == 'odDropdownRefObj'){
      entityFormObj[attributeName] = $(ZERP.FrmMgr.genFrm.formId + ' #' + attributeName+'_code').val();
      entityFormObj[attributeName+'_code'] = $(ZERP.FrmMgr.genFrm.formId + ' #' + attributeName+'_code').val();
      entityFormObj[attributeName+'_desc'] = $(ZERP.FrmMgr.genFrm.formId + ' #' + attributeName).val();
    }


  });

  // check has own header entry 
  // if has collect header data
  if(!!HAS_OWN_HEADERENTTRY_SESSION && HAS_OWN_HEADERENTTRY_SESSION){
    var headerObj = ZERP.FrmMgr.genFrm.collectHeaderData();
    $.each(headerObj, function(key, val){
      entityFormObj[key] = val;
    });
  }

  return entityFormObj;

}


/*
ZERP.FrmMgr.genFrm.collectHeaderDataHL = function(){
  var headerBean = {};
  var entityAttributes = ZERP.System.EntityStructureObj['Attributes'];   

  $('.ZERP_HeaderEntryCt').find('.formGroup input, select, textarea').each(function(index, element){
    var attributeName = $(element).attr('name');
    if(!!!attributeName) return;
    var attributeValue = $(element).val();
    headerBean[attributeName] = attributeValue;
    if(entityAttributes.hasOwnProperty(attributeName)){
      var attributeProperties = entityAttributes[attributeName];
      if(!!!attributeProperties.headerEntry) return;
      if(!!attributeProperties.headerEntry && attributeProperties.headerEntry == false) return;
      if(!!attributeProperties.HtmlType && attributeProperties.HtmlType == 'odDropdownRefObj'){
        headerBean[attributeName] = $('#ZERP_HeaderEntryCt' + ' #' + attributeName+'_code').val();
        headerBean[attributeName+'_code'] = $('#ZERP_HeaderEntryCt' + ' #' + attributeName+'_code').val();
        headerBean[attributeName+'_desc'] = $('#ZERP_HeaderEntryCt' + ' #' + attributeName).val();
      }
    }
  });

  return headerBean;
}
*/



ZERP.FrmMgr.genFrm.callCustomizeObject = function(){
	var _callCustomizeObject = ZERP.System.EntityStructureObj._callCustomizeObject;
	if(_callCustomizeObject == '0') return;

  var getparams = {};
  getparams.rEntityName = ZERP.System.rEntityName;
  getparams.rActiveOperation = ZERP.rActiveOperation;
  getparams.rRunTime = ZERP.System.rRunTime;
  getparams.rReqType = 'getCustomizeEntityStructure';
  getparams.rCallServerMethodName = 'getCustomizeEntityStructure';

  var headerObj = ZERP.FrmMgr.genFrm.collectHeaderData();
  for (var key in headerObj) {
    getparams[key] = headerObj[key];
  }

  var params = jsClient.paramsToObj(window.location.search);
  if(!!params.rQueryFromFather || ZERP.rActiveOperation != "Create"){ // during create not take search data from URL, cz its fillup in form in response
    for (var key in params) {
      getparams[key] = params[key];
    }
  }


	// Need to call customize Object Info
  $.ajax({
    method: "GET",
    url: ZERP.System.rPkgApiUrl,
    data: getparams,
    beforeSend: function( jqXHR, settings ) {
    }

  }).done(function( response, textStatus, xhr ) {

  	var CustomizeEntityStructure = JSON.parse(response);
  	ZERP.System.EntityStructureObj = CustomizeEntityStructure;
    ZERP.FrmMgr.genFrm.reDrawForm('create');

  }).fail(function() {
    alert( "ajax fail" );
  });


}



ZERP.FrmMgr.genFrm.callToServerByAttributeEvent = function(thisPtr) {

  var entityAttributes = ZERP.System.EntityStructureObj['Attributes'];

  // Purpose to handle suggesion on onchange fileds
  setTimeout(function(){
    var nGenericBean = ZERP.FrmMgr.genFrm.getFormData();
    if(!!!nGenericBean) return false;
    nGenericBean = ZERP.FrmMgr.genFrm.addSystemVariable(nGenericBean);
    var eventFireAttributeName = '';
    if(!!thisPtr && thisPtr == 'fromlookup'){
      eventFireAttributeName = $(ZERP.rActiveLookupPtr).closest('div').find('input').attr('name');
    } else {
      eventFireAttributeName = $(thisPtr).attr('name');

      var forAttribute = $(thisPtr).attr('forAttribute');
      if(!!forAttribute && forAttribute != null && forAttribute != ""){
        eventFireAttributeName = forAttribute;
      }

    }



    nGenericBean.rEventFireAttributeName = eventFireAttributeName;

    var headerObj = ZERP.FrmMgr.genFrm.collectHeaderData();
    for (var key in headerObj) {
      nGenericBean[key] = headerObj[key];
    }
    var params = jsClient.paramsToObj(window.location.search);
    for (var key in params) {
      if(!!nGenericBean[key]) continue;
      nGenericBean[key] = params[key];
    }
    
    $.ajax({
      method: "GET",
      url: ZERP.System.rPkgApiUrl,
      data: nGenericBean,
      beforeSend: function( jqXHR, settings ) {
      }

    }).done(function( response, textStatus, xhr ) {

      var CustomizeEntityStructure = JSON.parse(response);
      ZERP.System.EntityStructureObj = CustomizeEntityStructure;
      ZERP.FrmMgr.genFrm.reDrawForm();

    }).fail(function() {
      alert( "ajax fail" );
    });

  }, 200);


}



ZERP.FrmMgr.genFrm.callToServer = function(formMode) {
  var nGenericBean = ZERP.FrmMgr.genFrm.getFormData();
  if(!!!nGenericBean) return false;
  nGenericBean = ZERP.FrmMgr.genFrm.addSystemVariable(nGenericBean);

  var headerObj = ZERP.FrmMgr.genFrm.collectHeaderData();
  for (var key in headerObj) {
    nGenericBean[key] = headerObj[key];
  }
  var params = jsClient.paramsToObj(window.location.search);
  for (var key in params) {
    if(!!nGenericBean[key]) continue;
    nGenericBean[key] = params[key];
  }


  $.ajax({
    method: "GET",
    url: ZERP.System.rPkgApiUrl,
    data: nGenericBean,
    beforeSend: function( jqXHR, settings ) {
    }

  }).done(function( response, textStatus, xhr ) {

    var CustomizeEntityStructure = JSON.parse(response);
    ZERP.System.EntityStructureObj = CustomizeEntityStructure;
    ZERP.FrmMgr.genFrm.reDrawForm(formMode);
    ZERP.FrmMgr.genFrm.unSetSystemVariablesAfterCallToServer();

  }).fail(function() {
    alert( "ajax fail" );
  });

}





/**
 * --------------------------------------------------------------------------------------------------------------------------------------------------
 * --------------------------------------------------------------------------------------------------------------------------------------------------
 * @Al-Mamun
 * @2019-11-17
 * Handle SingleFormHL---Header Line Customize Onbjet
 */
ZERP.FrmMgr.genFrm.addSystemVariable_SFHL = function(nGenericBean, flagHL){
  nGenericBean.rEntityName = ZERP.System.rEntityName;
  nGenericBean.rActiveOperation = ZERP.rActiveOperation;
  nGenericBean.rActiveFormTab = ZERP.System.rActiveFormTab;
  nGenericBean.rRunTime = ZERP.System.rRunTime;
  nGenericBean.rCopy = (!!ZERP.FrmMgr.genFrm.isCopy) ? '1' : '0';
  nGenericBean.rReqType = 'getCustomizeHeaderData';
  if(flagHL == 2) nGenericBean.rReqType = 'getCustomizeLineData';
  nGenericBean.rCallServerMethodName = 'justCallToServer';
  return nGenericBean;
}


/**
 * @Al-Mamun
 * @2019-11-17
 * Handle SingleFormHL---Header Line Customize Onbjet
 */
ZERP.FrmMgr.genFrm.callToServer_header_callFeedbackFunctions = function(){}

ZERP.FrmMgr.genFrm.callToServer_header = function(thisPtr) {

  var headerBean = {};
  headerBean = ZERP.FrmMgr.genFrm.addSystemVariable_SFHL(headerBean, 1);

  var headerObj = ZERP.SFHL.collectHeaderData();
  headerBean.rEventFireAttributeName = $(thisPtr).attr('name');
  // check forattribute for reference Entity
  var forAttribute = $(thisPtr).attr('forAttribute');
  if(!!forAttribute && forAttribute != null && forAttribute != ""){
    headerBean.rEventFireAttributeName = forAttribute;
  }


  for (var key in headerObj) {
    headerBean[key] = headerObj[key];
  }
  var params = jsClient.paramsToObj(window.location.search);
  for (var key in params) {
    headerBean[key] = params[key];
  }


  $.ajax({
    method: "GET",
    url: ZERP.System.rPkgApiUrl,
    data: headerBean,
    beforeSend: function( jqXHR, settings ) {
    }

  }).done(function( response, textStatus, xhr ) {

    var customizeHeaderData = JSON.parse(response);
    ZERP.SFHL.fillHeaderData(customizeHeaderData);
    ZERP.FrmMgr.genFrm.callToServer_header_callFeedbackFunctions();

  }).fail(function() {
    alert( "ajax fail" );
  });

}


/**
 * @Al-Mamun
 * @2019-11-17
 * Handle SingleFormHL---Header Line Customize Onbjet
 */
ZERP.FrmMgr.genFrm.callToServer_line_callFeedbackFunctions = function(){}

ZERP.FrmMgr.genFrm.callToServer_line = function(thisPtr) {

  var lineBean = {};
  lineBean = ZERP.FrmMgr.genFrm.addSystemVariable_SFHL(lineBean, 2);
  var lineObj = ZERP.SFHL.collectLineData2($(thisPtr).closest('tr'));

  lineBean.rEventFireAttributeName = $(thisPtr).attr('name');
  // check forattribute for reference Entity
  var forAttribute = $(thisPtr).attr('forAttribute');
  if(!!forAttribute && forAttribute != null && forAttribute != ""){
    lineBean.rEventFireAttributeName = forAttribute;
  }


  for (var key in lineObj) {
    lineBean[key] = lineObj[key];
  }
  var params = jsClient.paramsToObj(window.location.search);
  for (var key in params) {
    lineBean[key] = params[key];
  }


  $.ajax({
    method: "GET",
    url: ZERP.System.rPkgApiUrl,
    data: lineBean,
    beforeSend: function( jqXHR, settings ) {
    }

  }).done(function( response, textStatus, xhr ) {

    ZERP.FrmMgr.genFrm.callToServer_line_callFeedbackFunctions(response, thisPtr);

  }).fail(function() {
    alert( "ajax fail" );
  });


}



ZERP.FrmMgr.genFrm.callToServer_line_callFeedbackFunctions = function(response, thisPtr){
    var customizeLineData = JSON.parse(response);
    if(!!customizeLineData._Error){
        jsClient.showPointerFancyMeaasge(customizeLineData._ErrorMessage);
        return;
    }
    ZERP.SFHL.populatedLineData(customizeLineData, $(thisPtr).closest('tr'));
}
