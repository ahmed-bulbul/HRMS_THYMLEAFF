// Declare NameSpace
var ZERP = ZERP || {};

ZERP.Utils = ZERP.Utils || {};
ZERP.Entity = ZERP.Entity || {};
ZERP.FileMgr = ZERP.FileMgr || {};

ZERP.Entity.Utils = ZERP.Entity.Utils || {};

ZERP.FrmMgr = ZERP.FrmMgr || {};
ZERP.FrmMgr.genFrm = ZERP.FrmMgr.genFrm || {};
ZERP.FrmMgr.plnFrm = ZERP.FrmMgr.plnFrm || {};

var POPLIST = POPLIST || {};


ZERP.Entity.Utils.validateUserValue = function(thisAttrPtr){
  var valAtFocus = ZERP.valAtFocus;
  var valAtBlur = $(thisAttrPtr).val();
  if(valAtFocus == valAtBlur) return;

  var ThisAttributeName = $(thisAttrPtr).attr('name');
  var ThisAttributeValue = $(thisAttrPtr).val();
  if(ThisAttributeValue == '' || ThisAttributeValue == null) return;

  var ValidateFieldName = ThisAttributeName;

  //////////////////////////////////
  var EntityAttributes = ZERP.System.EntityStructureObj['Attributes'];

  var thisAttributeProperties = {};
  var LookupParameters, LinkedAttrs, ReferenceEntityThisFieldName, ReferenceEntityName, ReferenceEntityRunTime;
  if(!!EntityAttributes[ValidateFieldName]){
    thisAttributeProperties = EntityAttributes[ValidateFieldName];
    LookupParameters = thisAttributeProperties['LookupParameters'];
    LinkedAttrs = thisAttributeProperties['LinkedAttrs'];
    ReferenceEntityName = thisAttributeProperties['ReferenceEntityName'];
    ReferenceEntityRunTime = thisAttributeProperties['ReferenceEntityRunTime'];
    ReferenceEntityThisFieldName = thisAttributeProperties['ReferenceEntityThisFieldName'];
  }

  var rActiveLookupFieldValue = valAtBlur;
  if(rActiveLookupFieldValue == '' || rActiveLookupFieldValue == null) return;

  var searchParams = {};
  searchParams.rReqType = 'decodeReferenceCode';
  searchParams.rDecodeAttributeName = ValidateFieldName;
  searchParams.rEntityName = ZERP.System.rEntityName;
  searchParams.rReferenceEntityName = ReferenceEntityName;
  searchParams.rRunTime = ZERP.System.rRunTime;
  searchParams.rEqualSearch = '1';
  searchParams[ReferenceEntityThisFieldName] = rActiveLookupFieldValue;

  // Add loopup parameters
  if(LookupParameters != '' && LookupParameters != null){
    LookupParametersArray = LookupParameters.split('||');
    for (var i = 0; i < LookupParametersArray.length; i++) {
      var thisLookupParameter = LookupParametersArray[i];
      thisLookupParameterArray = thisLookupParameter.split('=>');
      searchParams[thisLookupParameterArray[0]] = thisLookupParameterArray[1];
    }
  }
  // Add Linked Attributes (Generally Parents Fields during lookup)
  if(LookupParameters != '' && LookupParameters != null){
    LinkedAttrsArray = LinkedAttrs.split('||');
    for (var i = 0; i < LinkedAttrsArray.length; i++) {
      var thisLinkedAttrs = LinkedAttrsArray[i];
      if(thisLinkedAttrs == '' || thisLinkedAttrs == null) break;
      var thisLinkedAttrsArray = thisLinkedAttrs.split('=>');
      var thisEntityFieldName = thisLinkedAttrsArray[0];
      var thisReferenceEntityFieldName = thisLinkedAttrsArray[1];
      searchParams[thisReferenceEntityFieldName] = $('.ZERP_EntryCt').find('#'+thisEntityFieldName).val();
    }
  }


  var searchParamsStr = jsClient.paramsToQueryString(searchParams);

  $.ajax({
      url: ZERP.System.rRequestApiUrl + '?' + searchParamsStr,
  }).done(function(response) {
    var decodeData = JSON.parse(response);
     var description = decodeData['description'];
     // Not set just validate
     // $('#ZERP_mainContainer .ZERP_EntryCt .formGroup_'+ValidateFieldName+' .SpanDecode').text(description);
  });





}




/**
 * this function will be call after key value fillup 
 * and can call ajax request to server to fillup data
 * may be user need to override this function for their 
 * custome purpose
 */
ZERP.Entity.Utils.decodeValue = function(DecodeFieldName){
  
  var rActiveLookupFieldValue = $(ZERP.rActiveLookupPtr).closest('div').find('input[type=text]').val();
  if(rActiveLookupFieldValue == '' || rActiveLookupFieldValue == null) return;

  var entityAttributes = ZERP.System.EntityStructureObj['Attributes'];
  var thisAttributeProperties = entityAttributes[DecodeFieldName];

  var ReferenceEntityName = thisAttributeProperties['ReferenceEntityName'];
  var ReferenceEntityThisFieldName = thisAttributeProperties['ReferenceEntityThisFieldName'];
  var LookupParameters = thisAttributeProperties['LookupParameters'];
  var LinkedAttrs = thisAttributeProperties['LinkedAttrs'];
  var AdditionalPassFieldsToServer = thisAttributeProperties['AdditionalPassFieldsToServer']; // this needed for reference item subcode handling
  var DecodeReferenceCode = thisAttributeProperties['DecodeReferenceCode'];
  if(!DecodeReferenceCode) return;

  var searchParams = {};
  searchParams.rReqType = 'decodeReferenceCode';
  searchParams.rDecodeAttributeName = DecodeFieldName;
  searchParams.rEntityName = ZERP.System.rEntityName;
  searchParams.rReferenceEntityName = ReferenceEntityName;
  searchParams.rRunTime = ZERP.System.rRunTime;
  searchParams.rEqualSearch = '1';
  searchParams[ReferenceEntityThisFieldName] = rActiveLookupFieldValue;

  // Add loopup parameters
  if(LookupParameters != '' && LookupParameters != null){
    LookupParametersArray = LookupParameters.split('||');
    for (var i = 0; i < LookupParametersArray.length; i++) {
      var thisLookupParameter = LookupParametersArray[i];
      thisLookupParameterArray = thisLookupParameter.split('=>');
      searchParams[thisLookupParameterArray[0]] = thisLookupParameterArray[1];
    }
  }
  // Add Linked Attributes (Generally Parents Fields during lookup)
  if(LookupParameters != '' && LookupParameters != null){
    LinkedAttrsArray = LinkedAttrs.split('||');
    for (var i = 0; i < LinkedAttrsArray.length; i++) {
      var thisLinkedAttrs = LinkedAttrsArray[i];
      if(thisLinkedAttrs == '' || thisLinkedAttrs == null) break;
      var thisLinkedAttrsArray = thisLinkedAttrs.split('=>');
      var thisEntityFieldName = thisLinkedAttrsArray[0];
      var thisReferenceEntityFieldName = thisLinkedAttrsArray[1];
      searchParams[thisReferenceEntityFieldName] = $('.ZERP_EntryCt').find('#'+thisEntityFieldName).val();
    }
  }
  var searchParamsStr = jsClient.paramsToQueryString(searchParams);

  $.ajax({
      url: ZERP.System.rRequestApiUrl + '?' + searchParamsStr,
  }).done(function(response) {
    var decodeData = JSON.parse(response);
     var description = decodeData['description'];
     $('#ZERP_mainContainer .ZERP_EntryCt .formGroup_'+DecodeFieldName+' .SpanDecode').text(description);
  });


}


ZERP.Entity.Utils.decodeValue2 = function(DecodeFieldName, Code){
  var EntityAttributes = ZERP.System.EntityStructureObj['Attributes'];

  var thisAttributeProperties = {};
  var LookupParameters, LinkedAttrs, ReferenceEntityThisFieldName, ReferenceEntityName, ReferenceEntityRunTime, DecodeReferenceCode;
  if(!!EntityAttributes[DecodeFieldName]){
    thisAttributeProperties = EntityAttributes[DecodeFieldName];
    LookupParameters = thisAttributeProperties['LookupParameters'];
    LinkedAttrs = thisAttributeProperties['LinkedAttrs'];
    ReferenceEntityName = thisAttributeProperties['ReferenceEntityName'];
    ReferenceEntityRunTime = thisAttributeProperties['ReferenceEntityRunTime'];
    ReferenceEntityThisFieldName = thisAttributeProperties['ReferenceEntityThisFieldName'];
    DecodeReferenceCode = thisAttributeProperties['DecodeReferenceCode'];
  }

  if(!DecodeReferenceCode) return;

  var rActiveLookupFieldValue = Code;
  if(rActiveLookupFieldValue == '' || rActiveLookupFieldValue == null) return;

  var searchParams = {};
  searchParams.rReqType = 'decodeReferenceCode';
  searchParams.rDecodeAttributeName = DecodeFieldName;
  searchParams.rEntityName = ZERP.System.rEntityName;
  searchParams.rReferenceEntityName = ReferenceEntityName;
  searchParams.rRunTime = ZERP.System.rRunTime;
  searchParams.rEqualSearch = '1';
  searchParams[ReferenceEntityThisFieldName] = rActiveLookupFieldValue;
  searchParams['code'] = rActiveLookupFieldValue;

  // Add loopup parameters
  if(LookupParameters != '' && LookupParameters != null){
    LookupParametersArray = LookupParameters.split('||');
    for (var i = 0; i < LookupParametersArray.length; i++) {
      var thisLookupParameter = LookupParametersArray[i];
      thisLookupParameterArray = thisLookupParameter.split('=>');
      searchParams[thisLookupParameterArray[0]] = thisLookupParameterArray[1];
    }
  }
  // Add Linked Attributes (Generally Parents Fields during lookup)
  if(LinkedAttrs != '' && LinkedAttrs != null){
    LinkedAttrsArray = LinkedAttrs.split('||');
    for (var i = 0; i < LinkedAttrsArray.length; i++) {
      var thisLinkedAttrs = LinkedAttrsArray[i];
      if(thisLinkedAttrs == '' || thisLinkedAttrs == null) break;
      var thisLinkedAttrsArray = thisLinkedAttrs.split('=>');
      var thisEntityFieldName = thisLinkedAttrsArray[0];
      var thisReferenceEntityFieldName = thisLinkedAttrsArray[1];
      searchParams[thisReferenceEntityFieldName] = $('.ZERP_EntryCt').find('#'+thisEntityFieldName).val();
    }
  }

  var searchParamsStr = jsClient.paramsToQueryString(searchParams);

  $.ajax({
      url: ZERP.System.rRequestApiUrl + '?' + searchParamsStr,
  }).done(function(response) {
    var decodeData = JSON.parse(response);
     var description = decodeData['description'];
     $('#ZERP_mainContainer .ZERP_EntryCt .formGroup_'+DecodeFieldName+' .SpanDecode').text(description);
  });

}





ZERP.Utils.goToChildSession = function(thisPtr){
  var entityAttributes = ZERP.System.EntityStructureObj['Attributes'];

  var NextAPIFile = $(thisPtr).attr('NextAPIFile');
  var ParamKeys = $(thisPtr).attr('ParamKeys');
  var ExtQueryString = $(thisPtr).attr('extquerystring');

  // var rNextEntityName = NextAPIFile.split('/')[3];
  var rNextEntityName = NextAPIFile;

  if(!!!ExtQueryString){
    ExtQueryString = '';
  }
  ParamKeys = ParamKeys.split(',');

  var entityKeyValsObj = {};
  for (var i = 0; i < ParamKeys.length; i++) {
    var ParamKey = ParamKeys[i];
    var ThisKey = ParamKey.split('=')[0];
    var FatherKey = ParamKey.split('=')[1];
    var entityVal = $( ZERP.FrmMgr.genFrm.formId + ' #'+ThisKey).val();
    entityKeyValsObj[FatherKey] = entityVal;

    var attributeName = ThisKey;
    if(!!entityAttributes[attributeName]){
      var attributeProperties = entityAttributes[ThisKey];
      if(!!attributeProperties.HtmlType && attributeProperties.HtmlType == 'odDropdownRefObj'){
        entityKeyValsObj[attributeName] = $(ZERP.FrmMgr.genFrm.formId + ' #' + attributeName+'_code').val();
        entityKeyValsObj[attributeName+'_code'] = $(ZERP.FrmMgr.genFrm.formId + ' #' + attributeName+'_code').val();
        entityKeyValsObj[attributeName+'_desc'] = $(ZERP.FrmMgr.genFrm.formId + ' #' + attributeName).val();
      } 
    }
  }
  var queryString = jsClient.paramsToQueryString(entityKeyValsObj);
  var next_href = window.location.origin + window.location.pathname + '?rEntityName=' + rNextEntityName + '&rQueryFromFather=1&' + queryString + ExtQueryString;
  window.location.href = next_href;
}


ZERP.Utils.showHideCustomToolbar = function(){
  // show
  if( $('#ZERP_formGridPanel:visible').length == 1 ){
    $('#ZERP_CustomToolbar').css('display', 'block');
    $('#ZERP_CustomToolbar .x-btn').css('display', 'block');
    if( $("#ZERP_CustomToolbar .x-btn:visible").length == 0){
      $('#ZERP_CustomToolbar').css('display', 'none');
    }

  } else {
    $('#ZERP_CustomToolbar').css('display', 'none');
  }


}

ZERP.Utils.hideCustomToolbar = function(){
  $('#ZERP_CustomToolbar').css('display', 'none');
}




ZERP.FrmMgr.genFrm.handlePopupListSession = function(rActiveLookupFieldName){

  var entityAttributes = ZERP.System.EntityStructureObj['Attributes'];
  var thisAttributeProperties = entityAttributes[rActiveLookupFieldName];

  var ReferenceEntityName = thisAttributeProperties['ReferenceEntityName'];
  var ReferenceEntityThisFieldName = thisAttributeProperties['ReferenceEntityThisFieldName'];
  var ReferenceEntityRunTime = thisAttributeProperties['ReferenceEntityRunTime'];
  var LookupParameters = thisAttributeProperties['LookupParameters'];
  var LinkedAttrs = thisAttributeProperties['LinkedAttrs'];


  ////////////////////////////////////////////////////////////
  POPLIST.rEntityName = ReferenceEntityName;
  // POPLIST.rFullEntityPath;
  POPLIST.rRunTime = ReferenceEntityRunTime;  

  ZERP.rActiveLookupFieldNamePopList = ReferenceEntityThisFieldName;

  var OnChangeAction = $(ZERP.rActiveLookupPtr).closest('div').find('input').attr('onchange');

  var lookupFieldName = $(ZERP.rActiveLookupPtr).closest('div').find('input[type=text]').attr('name');
  var lookupFieldValue = $(ZERP.rActiveLookupPtr).closest('div').find('input[type=text]').val();
  var filterParams = {};
  if(!!lookupFieldValue && lookupFieldValue != ''){    
    // Not added this field // User want to choose another one // so clear this field
    // filterParams[ZERP.rActiveLookupFieldNamePopList] = lookupFieldValue;
  }

  // Add loopup parameters
  if(!!LookupParameters && LookupParameters.length > 0){
    LookupParametersArray = LookupParameters.split('||');
    for (var i = 0; i < LookupParametersArray.length; i++) {
    	var thisLookupParameter = LookupParametersArray[i];
      if(thisLookupParameter == '' || thisLookupParameter == null) break;
    	thisLookupParameterArray = thisLookupParameter.split('=>');
    	filterParams[thisLookupParameterArray[0]] = thisLookupParameterArray[1];
    }
  }

  // Add Linked Attributes (Generally Parents Fields during lookup)
  if(!!LinkedAttrs && LinkedAttrs.length > 0){
    LinkedAttrsArray = LinkedAttrs.split('||');
    for (var i = 0; i < LinkedAttrsArray.length; i++) {
      var thisLinkedAttrs = LinkedAttrsArray[i];
      if(thisLinkedAttrs == '' || thisLinkedAttrs == null) break;
      var thisLinkedAttrsArray = thisLinkedAttrs.split('=>');
      var thisEntityFieldName = thisLinkedAttrsArray[0];
      var thisReferenceEntityFieldName = thisLinkedAttrsArray[1];

      filterParams[thisReferenceEntityFieldName] = $('.ZERP_EntryCt').find('#'+thisEntityFieldName).val();
      console.log(ZERP.FrmMgr.genFrm.formId + '----' + thisEntityFieldName + '-----' + $('.ZERP_EntryCt').find('#'+thisEntityFieldName).val() );
    }
  }




  // show filter param in popup list
  if(!!!POPLIST._searchParams){
    // POPLIST._searchParams = JSON.stringify({});
    POPLIST._searchParams = JSON.stringify(filterParams);
  }
   POPLIST._searchParams = JSON.stringify(filterParams);

  // console.log(ZERP.rActiveLookupPtr);
  // console.log(ZERP.rActiveLookupPtr.getAttribute('referenceentitythisfieldname'));

  var temp = JSON.parse(POPLIST._searchParams);
  // temp[ $(ZERP.rActiveLookupPtr).attr('referenceentitythisfieldname') ] = lookupFieldValue;
  POPLIST._searchParams = JSON.stringify(temp);
  
  var filterParamsStr = jsClient.paramsToQueryString(filterParams);

  var prepopulate = {};
  var prepopJS = (Object.keys(prepopulate).length > 0) ? 'var prepopulate = ' + JSON.stringify(prepopulate) + ';' : '';
  prepopJS = prepopJS + "var POPLIST = POPLIST || {};";
  prepopJS = prepopJS + "POPLIST.sendBackSearchChoice = function( thisRow ) {";
  prepopJS = prepopJS + "  var fieldvalue = $(thisRow).find('td[fieldname='+ ZERP.rActiveLookupFieldNamePopList +']').text();";
  prepopJS = prepopJS + "  $(ZERP.rActiveLookupPtr).closest('div').find('input[type=text]').val(fieldvalue);";
  prepopJS = prepopJS + "  $(ZERP.rActiveLookupPtr).closest('div').find('input[type=text]').focus();";
  if(OnChangeAction == 'ZERP.FrmMgr.genFrm.callToServerByAttributeEvent(this);'){
    prepopJS = prepopJS + "  ZERP.FrmMgr.genFrm.callToServer('fromlookup');";
  }
  if(ReferenceEntityName != '' && ReferenceEntityName != null){
     prepopJS = prepopJS + "  ZERP.Entity.Utils.decodeValue('"+lookupFieldName+"');";
  }
  // prepopJS = prepopJS + "  $(ZERP.FrmMgr.genFrm.formId + '#designid').val(designid);";
  // prepopJS = prepopJS + "  $(ZERP.FrmMgr.genFrm.formId + '#designid').focus();";
  prepopJS = prepopJS + "  $('body').find('#myModalFirst').remove();";
  prepopJS = prepopJS + "};";
  var contentPrepopJS = '<script> ' + prepopJS + '</script>';

  var modalInt = new wModal.ZERPWindowModalClass();
  modalInt.createNewModal();
  modalInt.setWidth('900');
  modalInt.setHieght('560');
  modalInt.setTittle('Popup List');
  modalInt.setPosition('', '50');
  modalInt.setModalToCenter();


  $.ajax({
      url: ZERP.System.rRequestApiUrl + '?rReqType=getEntityStructure&rEntityName='+ReferenceEntityName+'&rRunTime=1',
      cache: false,
  }).done(function(response) {
    var _baseStructure = response;

    POPLIST._URL_API = ZERP.System.rRequestApiUrl;
    POPLIST._baseStructure = _baseStructure;
    POPLIST._baseStructureObj = JSON.parse(POPLIST._baseStructure);
    POPLIST.EntityAttributes = POPLIST._baseStructureObj['Attributes'];

    $.ajax({
        url: ZERP.System.rRequestApiUrl + '?rReqType=getListData&' + filterParamsStr + '&rEntityName='+ReferenceEntityName+'&rRunTime=1',
        cache: false,
    }).done(function(response) {
     
      POPLIST.displayQueryData(response);
      $('#myModalFirst #modal-jsCodeContainer').append(contentPrepopJS);

      var entityTittle = (!!POPLIST._baseStructureObj['ENTITY_TITTLE']) ? POPLIST._baseStructureObj['ENTITY_TITTLE'] : 'Popup List';
      modalInt.setTittle(entityTittle);
      modalInt.removeSpinner();
      modalInt.updateModalBox();

      $('#ZERP_listGridPanel_scroller_PopList').css({
        'min-height': '300px',
        'max-height': '350px',
        'width': '850px',
        'overflow': 'scroll',
      });  

      $('#ZERP_listGridPanel_headerOffsetWrapper_PopList').css({
        'overflow':'hidden'
      });
      $('#ZERP_listGridPanel_headerOffset_PopList').css({
        'width': '850px',
        'overflow': 'hidden',
      });

      $('#modal-listContainer').css({
        'overflow': 'hidden',
      });

      $('#ZERP_listGridPanel_scroller_PopList').scroll(function(){
        var left = $(this).scrollLeft();
        console.log(left);
        $('#ZERP_listGridPanel_headerOffset_PopList').css('left', -left);
        $('#ZERP_listGridPanel_headerOffset_PopList').css('position', 'relative');

        var ERP_listGridPanelScroller = $('#ZERP_listGridPanel_scroller_PopList').width();
        var aww = ERP_listGridPanelScroller + left;
        $('#ZERP_listGridPanel_headerOffset_PopList').css({
          'width': aww + 'px'
        });

      });


    });


  });

}


// user may need to custmize this function
POPLIST.handleLookup = function(thisPtr){
  if(!!ZERP.rActiveLookupPtr) delete ZERP.rActiveLookupPtr;
  if(!!ZERP.rFireLookupField) delete ZERP.rFireLookupField;
  if(!!ZERP.rActiveLookupFieldName) delete ZERP.rActiveLookupFieldName;
  ZERP.rFireLookupField = true;
  ZERP.rActiveLookupPtr = thisPtr;
  ZERP.rActiveLookupFieldName = $(thisPtr).attr('forAttribute');
  ZERP.System.rActiveFocusField = ZERP.rActiveLookupFieldName;

  ZERP.FrmMgr.genFrm.handlePopupListSession(ZERP.rActiveLookupFieldName);
}



ZERP.FrmMgr.genFrm.callPopupListMaker = function(rSessionAPI){
  $.ajax({
      url: rSessionAPI + '?rReqType=getListData',
      cache: false,
  }).done(function(response) {
   
    ERPLIST.displayQueryData(response);
    $.fancybox.update();

    $('#popupListContent #loadingDiv').empty();
  });
}



ZERP.FrmMgr.genFrm.handleReferenceEntity = function(thisPtr){
  var host = window.location.origin;
  var xpath = window.location.pathname;
  var mainPagePath = window.location.pathname;

  var thisEntityKeyName = $(thisPtr).closest('div.formGroup').find('input.ReferenceAttribute').attr('name');
  var thisEntityKeyValue = $(thisPtr).closest('div.formGroup').find('input.ReferenceAttribute').val();
  ZERP.FrmMgr.genFrm.formAttributes = ZERP.System.EntityStructureObj['Attributes'];
  var thisAttributeProperties = ZERP.FrmMgr.genFrm.formAttributes[thisEntityKeyName];
  var ReferenceEntityName = thisAttributeProperties.ReferenceEntityName;
  var ReferenceEntityFullPath = thisAttributeProperties.ReferenceEntityFullPath;
  var LookupParameters = thisAttributeProperties.LookupParameters;
  var LinkedAttrs = thisAttributeProperties.LinkedAttrs;

  var ReferenceEntityThisFieldName = thisAttributeProperties.ReferenceEntityThisFieldName;
  var DirectREPath = thisAttributeProperties.DirectREPath;
  var ReferenceEntityPkgPath = '';


  var filterByEntityKey = '';
  if(thisEntityKeyValue == '' || thisEntityKeyValue == null){
  } else {
    filterByEntityKey = '&'+ReferenceEntityThisFieldName + '=' + thisEntityKeyValue;
  }

  // Add loopup parameters
  if(LookupParameters != '' && LookupParameters != null){
    LookupParametersArray = LookupParameters.split('||');
    for (var i = 0; i < LookupParametersArray.length; i++) {
      var thisLookupParameter = LookupParametersArray[i];
      thisLookupParameterArray = thisLookupParameter.split('=>');
      filterByEntityKey += '&'+thisLookupParameterArray[0] + '=' + thisLookupParameterArray[1];
    }
  }

  // ReferenceEntity = ReferenceEntity.substr(1);
  if(!!ReferenceEntityPkgPath && ReferenceEntityPkgPath != ''){ // may be this Entity will be run in package main.php 
  }
  var ReferenceEntityPath = host + mainPagePath + '?rEntityName=' + ReferenceEntityName + '&'+filterByEntityKey+'&rRunTime=1';


  if(DirectREPath != '' && DirectREPath != null){
    var ReferenceEntityPath = host + DirectREPath + '?'+filterByEntityKey;
    window.open(ReferenceEntityPath);
  } else {
    window.open(ReferenceEntityPath);
  }

}




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// Init Lookup Handler Start ///////////////////////////////////////////////////////////////
function checkIframeLoaded() {
    // Get a handle to the iframe element
    var iframe = document.getElementById('MainPopupIframe');
    var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

    // Check if loading is complete
    if (  iframeDoc.readyState  == 'complete' ) {
        //iframe.contentWindow.alert("Hello");
        iframe.contentWindow.onload = function(){
            $("iframe#MainPopupIframe").contents().find("#main").css('margin-left', '0px');
            $("iframe#MainPopupIframe").contents().find("#ZERP_GenericToolbar").css('display', 'none');
        };
        // The loading is complete, call the function we want executed once the iframe is loaded
        afterIframeLoading();
        return;
    } 

    // If we are here, it is not loaded. Set things up so we check   the status again in 100 milliseconds
    window.setTimeout(checkIframeLoaded, 100);
}

function afterIframeLoading(){
    // alert("I am here");
}





ZERP.handleSearchLoupeClick = function(fieldname){
  // alert(fieldname);

  var lpkRefEntityName = "";
  if(!!ZERP.activeLpkPtr){
    var attributeName = $(ZERP.activeLpkPtr).attr('name');
    var objectStructure = ZERP.System.EntityStructureObj['ObjectStructure']
    var thisAttributeProperties = objectStructure[attributeName];
    lpkRefEntityName = thisAttributeProperties['lpkRefEntityName'];
  }


  modalInts = new wModal.WindowModalBSV1Class();
  var modalContainer = modalInts.createNewModal();
  var modal = $(modalContainer);
  modal.find('.modal-title').text('');
  

  var srcUrl = ZERP.System.contextPath +"/systemMain/mainPopupHelper?rEntityName="+lpkRefEntityName;
  var ifr=$('<iframe/>', {
      id:'MainPopupIframe',
      src:srcUrl,
      // style:'display:none;border: none;width:920px;height:400px',
      // style:'display:none',
      onload: function () {
        $(this).show();
        console.log('iframe loaded !!');
        $(this).css('border', 'none');
        $(this).css('width', '100%');
        $(this).css('height', '100%');
        setTimeout(function() {
          // $("iframe#MainPopupIframe").contents().find("#main").css('margin-left', '0px');
            $("iframe#MainPopupIframe").contents().find("#ZERP_GenericToolbar").css('display', 'none');
        }, 1000);
      }
  });
  // $('body').append(ifr);   
  modalInts.setBodyHTML(ifr);
  checkIframeLoaded();

  modalInts.setWidth('900');
  modalInts.setHieght('500');  
  modalInts.setFitPosition(0, 0);
  modal.find('.modal-footer').css('display', 'none');


  $('.modal-dialog').draggable({
    // axis: "y"
  });
  $('.modal-dialog').css('cursor', 'pointer');

}



ZERP.searchLoupe_show = function(inputfield){
   $('.itemsearchLoupe').remove();

  var imgheight = 16;
  var imgwidth = 16;
  var fieldName = $(inputfield).closest('td').attr('class');
  aleft = $(inputfield).offset().left + $(inputfield).width() - imgwidth + 2 - 5;
  atop = $(inputfield).offset().top + 8;
  $('<div/>')
    .offset({
      top: atop,
      left: aleft
    })
    .css('display', 'block')
    .css('position', 'absolute')
    .css('background-repeat', 'no-repeat')
    .css('background-image', 'url('+ZERP.System.contextPath+'/img/search.png)')
    .attr('fieldname', fieldName)
    .addClass('itemsearchLoupe')
    .height($(inputfield).outerHeight() - 2)
    .width($(inputfield).outerHeight() - 14)
    .appendTo($('body'))
    .hover(function(e) {}, function(e) {
      $('.itemsearchLoupe').remove();
    })
    .on('click', function() {
      ZERP.handleSearchLoupeClick($(this).attr('fieldname'));
    });

}
ZERP.searchLoupe_hide = function(thisPtr){
  // $('.itemsearchLoupe').remove();
}

ZERP.initPopupLookup = function(){

}



ZERP.activeLpkPtr = null;

ZERP.initPopupLookup_lines = function(){

  var entityAttributes = ZERP.System.EntityStructureObj['Attributes'];
    $.each(entityAttributes, function(attributeName, attributeProperties){

      if( !!attributeProperties.popupLookup && attributeProperties.popupLookup === true ){
        $( 'table#listTable tbody tr').find('input[name='+attributeName+']').hover(function(e) {
            ZERP.activeLpkPtr = this;
            ZERP.searchLoupe_show(this);
          }, function(e) {
            atop = $(this).offset().top;
            aleft = $(this).offset().left;
            abottom = atop + parseFloat($(this).css('height').replace('px', ''));
            aright = aleft + parseFloat($(this).css('width').replace('px', ''));
            // if mouse left the input box
            if (atop > e.pageY || abottom < e.pageY || aleft > e.pageX || aright < e.pageX) ZERP.searchLoupe_hide();
        });
      }
  });

}
////////////////////////////////// Init Lookup Handler End ///////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
