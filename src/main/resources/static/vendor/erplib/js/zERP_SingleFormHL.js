// 1. ListTable
// 2. Make tr entry input field with each field
// 3. and add it dom
// 4. for new line keep to chach and save it in variable
// 5. for line fillup from DB during read, first add one tr input entry then fillup this
//    then add second tr entry input and fillup 
//  
//  6. during save take all row and send to server




// All methods at glance@Al-Mamun@2019-11-26
/*
ZERP.SFHL.isMobile = function(){
ZERP.SFHL.focusFirst = function(parent) {
ZERP.SFHL.focusOutFirst = function(parent) {
ZERP.SFHL.exportToCSVandSendToEDI = function(){
ZERP.SFHL.validateFormContainerFields = function(container) {
ZERP.SFHL.validateFormLinesFields = function(lineTableContainerID){
ZERP.SFHL.newDocumentForm = function(){
ZERP.SFHL.backToDocumentList = function(){
ZERP.SFHL.setStatusInEntityCaption = function(){
ZERP.SFHL.initForm = function(formMode){
ZERP.SFHL.createModeDocument = function() {
ZERP.SFHL.readModeDocument = function() {
ZERP.SFHL.editModeDocument = function() {
ZERP.SFHL.handleLineToolbarCustomize = function(){
ZERP.SFHL.handleHeaderToolbarButtons_formReadMode = function(){
ZERP.SFHL.handleHeaderToolbarButtons_formCreateMode = function(){
ZERP.SFHL.handleHeaderToolbarButtons_formEditMode = function(){
ZERP.SFHL.handleThisFieldOnBlurFunction = function(event){
ZERP.SFHL.HandleUILayout = function(){
ZERP.SFHL.HandleUILayout_Post = function(){
ZERP.SFHL.printDocument = function(){
ZERP.SFHL.makeLineFormTHLabel = function(){
ZERP.SFHL.getLastTdAction = function(){
ZERP.SFHL.getFirstOptionTdTdAction = function(){
ZERP.SFHL.makeLineForm = function(){
ZERP.SFHL.initHeader = function(formMode){
ZERP.SFHL.fillHeaderData = function(headerBean){
ZERP.SFHL.populatedLineData = function(lineBean, thisTrPtr){
ZERP.SFHL.populatedLinesData = function(lineBeans){
ZERP.FrmMgr.SFHL.makingTableWidthAndTdWidthSame = function(table1Id, table2Id){
ZERP.FrmMgr.SFHL.applyStaticCSS = function(){
ZERP.FrmMgr.SFHL.applyDynamicCSS = function(){
ZERP.SFHL.getLineBeingEdited = function() {
ZERP.SFHL.getLineBeingReaded = function() {
ZERP.SFHL.collectLineData = function(thisPtr){
ZERP.SFHL.collectLineData2 = function(thisTrPtr){
ZERP.SFHL.collectLinesData = function(){
ZERP.SFHL.setThisLineData = function(returnBean, thisPtr){
ZERP.SFHL.collectHeaderData = function(){
ZERP.SFHL.saveLine = function(e, thisPtr){
ZERP.SFHL.calculateSumValuesForHeaderFields = function(){
ZERP.SFHL.removeLine = function(event, thisPtr, rowDataID){
ZERP.SFHL.createBindFloatingButton = function(){
ZERP.SFHL.removeFloatingButton = function(){
ZERP.FrmMgr.SFHL.setTrEditMode = function(event, thisPtr, which){
ZERP.SFHL.initLine = function(){
ZERP.SFHL.addNewLine = function(){
ZERP.SFHL.addNewLine_duringReadData = function(LineNumber){
ZERP.SFHL.addNewLine_byBottomPlusButtonClick = function(){
ZERP.SFHL.handleURLAutoFillData = function(){
ZERP.SFHL.makeOwnHeaderEntryForm = function(){
ZERP.SFHL.addFooterActionButton = function(){
ZERP.SFHL.readDocument = function(rHeaderID, extParams){
ZERP.SFHL.deleteDocument_backToList = function(){
ZERP.SFHL.deleteDocument = function(){
ZERP.SFHL.saveDocument = function(){
ZERP.SFHL.documentApprovalHandler = function(){
ZERP.SFHL.deleteFullFrom = function(){
ZERP.SFHL.callCustomizeFunctionsAfterDrawForm = function(){}
ZERP.SFHL.makeFullFrom = function(){
ZERP.SFHL.bindLineTableScrollEvent = function(){
ZERP.SFHL.bindHeaderButtonAction = function(){
ZERP.SFHL.processFormExtWrkFunctions = function(){} // for override purpose
ZERP.FrmMgr.SFHL.processForm = function (formId) {
 */



ZERP.FrmMgr = ZERP.FrmMgr || {};
ZERP.SFHL = ZERP.SFHL || {};
ZERP.FrmMgr.SFHL = ZERP.FrmMgr.SFHL || {};

ZERP.SFHL.Pattern = 'SingleFormHL_inLineLineEntry';
ZERP.SFHL.CurrLineNumber = 1;
ZERP.SFHL.NextLineNumber = 1;
ZERP.SFHL.CacheNewLineHTML = '';


ZERP.SFHL.isMobile = function(){

	if( navigator.userAgent.match(/Android/i)
	|| navigator.userAgent.match(/webOS/i)
	|| navigator.userAgent.match(/iPhone/i)
	|| navigator.userAgent.match(/iPad/i)
	|| navigator.userAgent.match(/iPod/i)
	|| navigator.userAgent.match(/BlackBerry/i)
	|| navigator.userAgent.match(/Windows Phone/i)
	){
		return true;
	}
	else {
		return false;
	}

}

ZERP.SFHL.focusFirst = function(parent) {
  $(parent).find('input, textarea, select')
      .not('input[type=hidden],input[type=button],input[type=submit],input[type=reset],input[type=image],button, input[name=lineNumber]')
      .filter(':enabled:visible:first')
      .focus();

  // $('#listTable').find('tr').find("td:first").find('input').focus();
}

ZERP.SFHL.focusOutFirst = function(parent) {
  $(parent).find('input, textarea, select')
      .not('input[type=hidden],input[type=button],input[type=submit],input[type=reset],input[type=image],button')
      .filter(':enabled:visible:first')
      .blur();
}



ZERP.SFHL.exportToCSVandSendToEDI = function(){
	var params = jsClient.paramsToObj(window.location.search);

	var postparams = {};
	postparams.rEntityName = ZERP.System.rEntityName;
	postparams.rReqType = 'exportToCSVandSendToEDI';
	postparams.rHeaderID = params.rHeaderID;
	$.ajax({
	    async: false,
	    type: "GET",
	    url: ZERP.System.rRequestApiUrl,
	    data: postparams,
	    beforeSend: function() {
	    },
	    success: function(data) {
	    	if(data == '') return;
	      returnGenericBean = JSON.parse(data);
	      if(returnGenericBean.result == 'success'){
	        window.location.reload(false);
	      }
	    }
	});
}

/**
 * Validate form fields
 * @param container
 * @returns {boolean}
 */
ZERP.SFHL.validateFormContainerFields = function(container) {
  var error = false;
  $(container).find('input, select, textarea').each(function() {
    var type = $(this).attr('type');
    if(type == 'checkbox') return;
    if (!!$(this).prop('required')) {
      if ($(this).val() == '') {
        error = true;
        console.log($(this).attr('name'));
        ZERP.FrmMgr.genFrm.hightlightErrorField($(this));
        $(this).focus();
      }
    }
  });
  return error;
}


ZERP.SFHL.validateFormLinesFields = function(lineTableContainerID){
  var error = false;

  var objectStructure = ZERP.System.EntityStructureObj['ObjectStructure'];

  $('#listTableWrapper #'+lineTableContainerID+' tbody tr').each(function(indx, thisTr){
      var lineObj = {};

      if( $(thisTr).hasClass('saveLine') || $(thisTr).hasClass('readModeTr') ){

        $(thisTr).find('td').each(function(){
          var fieldname = $(this).attr('fieldname');
          var fieldvalue = $(this).find('input, select, textarea').val();
          if(!!!fieldname || fieldname == '' || fieldname == null) return;

          var thisAttributeProperties = objectStructure[fieldname];
          if(thisAttributeProperties.hasOwnProperty('MandatoryInUI')){
            var MandatoryInUI = (!!thisAttributeProperties['MandatoryInUI']) ? thisAttributeProperties['MandatoryInUI'] : false;
            if( MandatoryInUI === true && (fieldvalue == '' || fieldvalue == null) ){
              var HtmlType = (!!thisAttributeProperties['HtmlType']) ? thisAttributeProperties['HtmlType'] : ''
              error = true;
              // check save tr td
              // $(this).css('border', '1px solid red');
              $(this).find('input[name='+fieldname+']').css('border', '1px solid red');
              if(HtmlType == "select") $(this).find('select[name='+fieldname+']').css('border', '1px solid red');
              return;
            }
          }
        });


      } else {

        $(thisTr).find('td').each(function(){
          var fieldname = $(this).attr('fieldname');
          var fieldvalue = $(this).find('input, select, textarea').val();
          if(!!!fieldname || fieldname == '' || fieldname == null) return;

          var thisAttributeProperties = objectStructure[fieldname];
          if(thisAttributeProperties.hasOwnProperty('MandatoryInUI')){
            var MandatoryInUI = (!!thisAttributeProperties['MandatoryInUI']) ? thisAttributeProperties['MandatoryInUI'] : false;
            if( MandatoryInUI === true && (fieldvalue == '' || fieldvalue == null) ){
              var HtmlType = (!!thisAttributeProperties['HtmlType']) ? thisAttributeProperties['HtmlType'] : ''
              // ZERP.SFHL.validateFormContainerFields(this);
              // $(this).find('input[name='+fieldname+']');
              error = true;
              // input filed hight light
              ZERP.FrmMgr.genFrm.hightlightErrorField( $(this).find('input[name='+fieldname+']') );
              if(HtmlType == "select") ZERP.FrmMgr.genFrm.hightlightErrorField( $(this).find('select[name='+fieldname+']') );
              if(HtmlType == "textarea") ZERP.FrmMgr.genFrm.hightlightErrorField( $(this).find('textarea[name='+fieldname+']') );
              return;
            }
          }
        });


      }


      if(error) return;
  });

  return error;

}


ZERP.SFHL.newDocumentForm = function(){
  // Override in Child
  var _entityName = ZERP.System.EntityStructureObj['_entityName'];
  var next_href = window.location.origin + window.location.pathname + '?rEntityName='+_entityName+'&rHeaderID=__new__';
  window.location.href = next_href;
}


ZERP.SFHL.backToDocumentList = function(){
  // Override in Child
  var _entityName = ZERP.System.EntityStructureObj['_entityName'];
  var next_href = window.location.origin + window.location.pathname + '?rEntityName='+_entityName+'List';
  window.location.href = next_href;
}


ZERP.SFHL.setStatusInEntityCaption = function(){
  var docStatus = $('.ZERP_HeaderEntryCt #docStatus').val();
  if( $('.ZERP_HeaderEntryCt #docStatus').is('select') ) docStatus = $( ".ZERP_HeaderEntryCt #docStatus option:selected" ).text();
  $('#ZERP_EntityCaption .text_right').text(docStatus);
  var code = $('.ZERP_HeaderEntryCt #code').val();
  if(code != "" && code != null){
     $('#ZERP_EntityCaption .text-center').text(code);
    document.title = code + ' ' + ZERP.System.EntityStructureObj['_entityName'];
  }

  if(!!ZERP.System.EntityStructureObj['_docNumberFieldName']){
    var code = $('.ZERP_HeaderEntryCt #' + ZERP.System.EntityStructureObj['_docNumberFieldName']).val();
    $('#ZERP_EntityCaption .text-center').text(code);
    document.title = code + ' ' + ZERP.System.EntityStructureObj['_entityName'];
  }
  return;
}



ZERP.SFHL.setFocusableLineTr = function(thisPtr){
  // remove
  $('#listTable').find('tr').removeClass('focusableLineTr');
  // add
  $(thisPtr).addClass('focusableLineTr');
}


ZERP.SFHL.initForm = function(formMode){
  var _baseStructure = ZERP.System.EntityStructureObj;

  var mandatoryInUIFields = _baseStructure['mandatoryInUIFields'];  
  if(mandatoryInUIFields.length > 0){
    for (var i = 0; i < mandatoryInUIFields.length; i++) {
      var fieldname = mandatoryInUIFields[i];
      $('.ZERP_HeaderEntryCt' + ' #' + fieldname).attr('required', 'required');
      $('.ZERP_HeaderEntryCt' + ' #' + fieldname).closest('div.formGroup').find('label span.MInUI').remove();
      $('.ZERP_HeaderEntryCt' + ' #' + fieldname).closest('div.formGroup').find('label').not('#'+fieldname).append('<span class="requiredXy MInUI">*</span>');
    }
  }

  var mandatoryInServerFields = _baseStructure['mandatoryInServerFields'];  
  if(mandatoryInServerFields.length > 0){
    for (var i = 0; i < mandatoryInServerFields.length; i++) {
      var fieldname = mandatoryInServerFields[i];
      $('.ZERP_HeaderEntryCt' + ' #' + fieldname).attr('required', 'required');
      $('.ZERP_HeaderEntryCt' + ' #' + fieldname).closest('div.formGroup').find('label').not('#'+fieldname).append('<span class="required MInServer">*</span>');
    }
  }

  // handle alwaysReadOnlyFields
  var alwaysReadOnlyFields = _baseStructure['alwaysReadOnlyFields'];  
  if(alwaysReadOnlyFields.length > 0){
    for (var i = 0; i < alwaysReadOnlyFields.length; i++) {
      var fieldname = alwaysReadOnlyFields[i];
      $('.ZERP_HeaderEntryCt').find('#'+fieldname).attr('disabled', 'disabled');
      $('.ZERP_HeaderEntryCt').find('.'+fieldname).attr('disabled', 'disabled');
      $('.ZERP_HeaderEntryCt').find('div[forattribute='+fieldname+']').css('display', 'none');
      if($('.ZERP_HeaderEntryCt').find('button[forAttribute='+fieldname+']').hasClass('btnDropdownToggle')){
          $('.ZERP_HeaderEntryCt').find('button[forAttribute='+fieldname+']').css('display', 'none');
      }
      // handle dateTime
      $('.ZERP_HeaderEntryCt').find('#'+fieldname).unmousewheel();
    }

  }

  // handle onEditOnlyFields
  var formEditMode = true;
  var fatherQueryKeys = _baseStructure['fatherQueryKeys'];
  for (var i = 0; i < fatherQueryKeys.length; i++) {
    var fahterQueryKey = fatherQueryKeys[i];
    var fahterQueryVal = $('.ZERP_HeaderEntryCt' + ' #'+fahterQueryKey).val();
    if(!!!fahterQueryVal){
      formEditMode = false;
      break;      
    }    
    if( !!fahterQueryVal && (fahterQueryVal == '' || fahterQueryVal == null ) ){
      formEditMode = false;
      break;
    }
  }

  if(formEditMode){
    var onEditOnlyFields = _baseStructure['onEditOnlyFields'];  
    for (var i = 0; i < onEditOnlyFields.length; i++) {
      var fieldname = onEditOnlyFields[i];
      $('.ZERP_HeaderEntryCt').find('#'+fieldname).attr('disabled', 'disabled');
      if($('.ZERP_HeaderEntryCt').find('button[forAttribute='+fieldname+']').hasClass('btnDropdownToggle')){
        $('.ZERP_HeaderEntryCt').find('button[forAttribute='+fieldname+']').css('display', 'none');
      }
    }
  }


  // handle hideOnCreateFields
  if(!!formMode && formMode == 'create'){
    var hideOnCreateFields = _baseStructure['hideOnCreateFields'];  
    for (var i = 0; i < hideOnCreateFields.length; i++) {
      var fieldname = hideOnCreateFields[i];
      $('.ZERP_HeaderEntryCt').find('#'+fieldname).closest('div.formGroup').css('display', 'none');
      // hide group box if have
      $('.ZERP_HeaderEntryCt').find('#fieldset_'+fieldname).css('display', 'none');
    }
  }

  if(!!formMode && formMode == 'read'){
    $('.ZERP_HeaderEntryCt').find('.btnLookup').attr('disabled', 'disabled');
    $('.ZERP_HeaderEntryCt').find('.dropdownlistArrowZERPComboBox').css('pointer-events', 'none');
  }


  // handle hideOnUpdateFields
  if(!!formMode && formMode == 'edit'){
    $('.ZERP_HeaderEntryCt').find('.btnLookup').removeAttr('disabled');
    $('.ZERP_HeaderEntryCt').find('.dropdownlistArrowZERPComboBox').css('pointer-events', '');
    $('.ZERP_HeaderEntryCt').find('.dropdownlistArrowZERPComboBox').css('cursor', 'pointer');
  }
  if(formEditMode){
    var hideOnUpdateFields = _baseStructure['hideOnUpdateFields'];  
    for (var i = 0; i < hideOnUpdateFields.length; i++) {
      var fieldname = hideOnUpdateFields[i];
      $('.ZERP_HeaderEntryCt').find('#'+fieldname).closest('div.formGroup').css('display', 'none');
    }    
  }


  // handle hideOnViewFields
  if(!!formMode && formMode == 'read'){
    var hideOnViewFields = _baseStructure['hideOnViewFields'];  
    for (var i = 0; i < hideOnViewFields.length; i++) {
      var fieldname = hideOnViewFields[i];
      $('.ZERP_HeaderEntryCt').find('#'+fieldname).closest('div.formGroup').css('display', 'none');
      // hide group box if have
      $('.ZERP_HeaderEntryCt').find('#fieldset_'+fieldname).css('display', 'none');
    }
  }



  // Value at Focus Handling
  $('.ZERP_HeaderEntryCt').find('input[type=text]').focus(function(){
    ZERP.valAtFocus = $(this).val();
  });
  // $('.ZERP_HeaderEntryCt').find('input[type=text], select, textarea').click(function(){
  //   ZERP.FrmMgr.genFrm.removeReferenceEntityAddonButton();
  // });      

  ZERP.SFHL.initLines(formEditMode);
  ZERP.FrmMgr.genFrm.handleDateTimePickerPlugin();
  ZERP.FrmMgr.genFrm.initOnDemandDataDropdownHandling();
  ZERP.SFHL.initLineOnDemandDataDropdownHandling();
  ZERP.FrmMgr.genFrm.initReferenceEntityAddonButton();
  
}




ZERP.SFHL.handleLineToolbarCustomize_ExcelLineForm = function(){
  $('#listTable tbody tr td.optionTd div.lineEditIcon').css('display', 'none');
  $('#listTable tbody tr td.optionTd').css({
    'width': '1px',
    'max-width': '1px',

    'display': 'none',
  });
  $('#listTableUILabel tbody tr th.optionTd').css({
    'width': '1px',
    'max-width': '1px',
    'padding': '0px',
    'padding-left': '3px',

    'display': 'none',
  });
}


ZERP.SFHL.handleLineToolbarCustomize = function(){
  /*$('#listTable tbody tr td.optionTd div.lineEditIcon').css('display', 'none');
  $('#listTable tbody tr td.optionTd').css({
    'width': '1px',
    'max-width': '1px',
  });
  $('#listTableUILabel tbody tr th.optionTd').css({
    'width': '1px',
    'max-width': '1px',
  });*/
  if(!!ZERP.System.EntityStructureObj['_renderExcelLikeLineForm']){
    ZERP.SFHL.handleLineToolbarCustomize_ExcelLineForm();
  }
}



ZERP.SFHL.createModeDocument = function() {
  ZERP.SFHL.formMode = 'create';
  $('#fieldset_boxHeaderLogInfoBegin').css('display', 'none');
  // $('.btnReadMode').css('display', 'none');
  $('.btnReadMode').closest('table').addClass('x-item-disabled');
  ZERP.SFHL.initForm('create');
}

ZERP.SFHL.readModeDocument = function() {
  ZERP.SFHL.formMode = 'read';
  $('.btnReadMode').closest('table').removeAttr('x-item-disabled');

  $('.ZERP_HeaderEntryCt').find('input,select,textarea').attr('disabled', 'disabled');
  // $('#listTable').css('pointer-events', 'none');
  // $(ZERP.FrmMgr.genFrm.formId).find(' input[type=button]').removeAttr('disabled');
  $('#bottomAddNewLineDiv').css('display', 'none');

  // line table controlling
  $('#listTable tbody tr td.optionTd').css({
    'display': 'none',
  });
  $('#listTable tbody tr td.optionTdLast').css({
    'display': 'none',
  });

  $('#listTableUILabel tbody tr th.optionTd').css({
    'display': 'none',
  });

  $('.ZERP_EntryCt').find('button.btnDropdownToggle').css('display', 'none');
  $('#listTable').find('button.btnDropdownToggle').css('display', 'none');

  // handle dateTime
  $('.ZERP_HeaderEntryCt').find('input.datepicker').unmousewheel();
  ZERP.SFHL.initForm('read');
}



ZERP.SFHL.editModeDocument_extWrk = function(){
}

ZERP.SFHL.editModeDocument = function() {
  ZERP.SFHL.formMode = 'edit';
  $('.ZERP_HeaderEntryCt').find('input,select,textarea').removeAttr('disabled');
  // $('#listTable').css('pointer-events', 'auto');
  $('#fieldset_boxHeaderLogInfoBegin').css('display', 'none');
  $('#bottomAddNewLineDiv').css('display', 'block');

  // line table controlling
  $('#listTable tbody tr td.optionTd').css({
    'display': 'block',
    'display': 'table-cell',
  });
  $('#listTable tbody tr td.optionTdLast').css({
    'display': 'block',
    'display': 'table-cell',
  });

  $('#listTableUILabel tbody tr th.optionTd').css({
    // 'display': 'block',
    'display': 'table-cell',
  });

  // $('.ZERP_EntryCt').find('button.btnDropdownToggle').css('display', 'inline-block');
  // $('#listTable').find('button.btnDropdownToggle').css('display', 'inline-block');

  ZERP.SFHL.handleLineToolbarCustomize();
  ZERP.SFHL.removeFloatingButton();

  $('.ZERP_EntryCt').find('button.btnDropdownToggle').css('display', 'block');
  // ZERP.FrmMgr.genFrm.initForm('edit');
  ZERP.SFHL.initForm('edit');
  ZERP.SFHL.editModeDocument_extWrk();
}

ZERP.SFHL.getFormMode = function(){
  return ZERP.SFHL.formMode;
}



//************************************************** Handle Header Toolbar Buttons
ZERP.SFHL.handleHeaderToolbarButtons_formReadMode = function(){
  var _baseStructure = ZERP.System.EntityStructureObj;
  var toolbars = _baseStructure['toolbars'];

  //1. disable and hide buttons
  if(!!toolbars.std_btnstatus.btnSaveDocument){
    console.log(toolbars.std_btnstatus.btnSaveDocument);
    if(!!toolbars.std_btnstatus.btnSaveDocument.active){
      $('.btnSaveDocument ').closest('table').addClass('x-item-disabled');
    } else {
      $('.btnSaveDocument ').closest('table').addClass('x-item-disabled');
    }
  } else {
    $('.btnSaveDocument ').closest('table').addClass('x-item-disabled');
  }


  //2. enable and show buttons
  if(!!toolbars.std_btnstatus.btnEditDocument){
    if(!!toolbars.std_btnstatus.btnEditDocument.active){
      $('.btnEditDocument  ').closest('table').removeClass('x-item-disabled');
    } else {
      $('.btnEditDocument  ').closest('table').addClass('x-item-disabled');
    }
  }
  if(!!toolbars.std_btnstatus.btnDeleteDocument){
    if(!!toolbars.std_btnstatus.btnDeleteDocument.active){
      $('.btnDeleteDocument  ').closest('table').removeClass('x-item-disabled');
    }
  }
  if(!!toolbars.std_btnstatus.btnApproveDocument){
    if(!!toolbars.std_btnstatus.btnApproveDocument.active){
      $('.btnApproveDocument  ').closest('table').removeClass('x-item-disabled');
    }
  }

  if(!!toolbars.std_btnstatus.btnPrint){
    if(!!toolbars.std_btnstatus.btnPrint.active){
      $('.btnPrint ').closest('table').removeClass('x-item-disabled');
    }
  }

  if(!!toolbars.std_btnstatus.btnConfirm){
    if(!!toolbars.std_btnstatus.btnConfirm.active){
      $('.btnConfirm ').closest('table').removeClass('x-item-disabled');
    } else {
      $('.btnConfirm ').closest('table').addClass('x-item-disabled');
    }
  } else {
    $('.btnConfirm ').closest('table').addClass('x-item-disabled');
  }


}

ZERP.SFHL.handleHeaderToolbarButtons_formCreateMode = function(){
  var _baseStructure = ZERP.System.EntityStructureObj;
  var toolbars = _baseStructure['toolbars'];

  //1. disable and hide buttons
  if(!!toolbars.std_btnstatus.btnHeaderEdit){
    if(!!toolbars.std_btnstatus.btnHeaderEdit.active){
      $('.btnHeaderEdit  ').closest('table').addClass('x-item-disabled');
    }
  } else {
    $('.btnHeaderEdit  ').closest('table').addClass('x-item-disabled');
  }

  if(!!toolbars.std_btnstatus.btnPrint){
    if(!!toolbars.std_btnstatus.btnPrint.active){
      $('.btnPrint ').closest('table').addClass('x-item-disabled');
    }
  } else {
    $('.btnPrint ').closest('table').addClass('x-item-disabled');
  }
  
  if(!!toolbars.std_btnstatus.btnApproveDocument){
    if(!!toolbars.std_btnstatus.btnApproveDocument.active){
      $('.btnApproveDocument ').closest('table').addClass('x-item-disabled');
    }
  } else {
    $('.btnApproveDocument ').closest('table').addClass('x-item-disabled');
  }


  //2. enable and show buttons
  if(!!toolbars.std_btnstatus.btnHeaderSave){
    if(!!toolbars.std_btnstatus.btnHeaderSave.active){
      $('.btnHeaderSave ').closest('table').removeClass('x-item-disabled');
    }
  } else {
    $('.btnHeaderSave ').closest('table').removeClass('x-item-disabled');
  }

  // if(!!toolbars.std_btnstatus.btnApproveDocument){
  //   if(!!toolbars.std_btnstatus.btnApproveDocument.active){
  //     $('.btnApproveDocument  ').closest('table').removeClass('x-item-disabled');
  //   }
  // }

  if(!!toolbars.std_btnstatus.btnConfirm){
    if(!!toolbars.std_btnstatus.btnConfirm.active){
      $('.btnConfirm ').closest('table').addClass('x-item-disabled');
    }
  } else {
    $('.btnConfirm ').closest('table').addClass('x-item-disabled');
  }

}

ZERP.SFHL.handleHeaderToolbarButtons_formEditMode = function(){
  var _baseStructure = ZERP.System.EntityStructureObj;
  var toolbars = _baseStructure['toolbars'];

  //1. disable and hide buttons
  if(!!toolbars.std_btnstatus.btnEditDocument){
    if(!!toolbars.std_btnstatus.btnEditDocument.active){
      $('.btnEditDocument  ').closest('table').addClass('x-item-disabled');
    }
  }
  
  //2. enable and show buttons
  if(!!toolbars.std_btnstatus.btnSaveDocument){
    if(!!toolbars.std_btnstatus.btnSaveDocument.active){
      $('.btnSaveDocument ').closest('table').removeClass('x-item-disabled');
    }
  }

  if(!!toolbars.std_btnstatus.btnPrint){
    if(!!toolbars.std_btnstatus.btnPrint.active){
      $('.btnPrint ').closest('table').removeClass('x-item-disabled');
    }
  } else {
    $('.btnPrint ').closest('table').removeClass('x-item-disabled');
  }

  if(!!toolbars.std_btnstatus.btnConfirm){
    if(!!toolbars.std_btnstatus.btnConfirm.active){
      $('.btnConfirm ').closest('table').addClass('x-item-disabled');
    }
  } else {
    $('.btnConfirm ').closest('table').addClass('x-item-disabled');
  }


}






ZERP.SFHL.handleThisFieldOnBlurFunction = function(event){
	var target = event;
	var thisPtr = event.target || e.srcElement;

	var val = $(thisPtr).val();
	if(val.indexOf('ACTION-0') >= 0 || val.indexOf('LDC') >=0){
		ZERP.SFHL.HandleOnTheFlyBarcodeScanningAction(val, 'false', thisPtr);
		return;
	}

	ZERP.SFHL.saveLine(event, thisPtr);
}


ZERP.SFHL.HandleUILayout = function(){

	$('#ZERP_GenericToolbar').css('display', 'none');
	$('#ZERP_pgnGridPanelWrapper').css('display', 'none');
	$('#ZERP_listGridPanel_header').css('height', '40px');
	$('#ZERP_clearAbsoluteLTH').remove();

	// ZERP_listFormGridPanel
	$('#ZERP_listFormGridPanel').removeClass('card-shadow-1');
	$('#ZERP_GridPanel').css('background', 'white');
	$('#ZERP_formGridPanel').css('display', 'none');
	$('#ERP_pgnGridPanel').css('display', 'none');
}

ZERP.SFHL.HandleUILayout_Post = function(){

	var listTableUILabel_height = $('#listTableUILabel').height();
	$('#ZERP_listGridPanel_header').css('height', listTableUILabel_height+'px');
	$('#ZERP_listFormGridPanel').css('height', '');
	$('#ZERP_listFormGridPanel').css('min-height', '');

	if(ZERP.SFHL.isMobile()){
		$('#ZERP_EntityCaption .text_left').css('width', '');
	}
	
}


ZERP.SFHL.printDocument = function(){
  var _printURLPathString = (!!ZERP.System.EntityStructureObj['_printURLPathString']) ? ZERP.System.EntityStructureObj['_printURLPathString'] : '';
  var printURLPathString = ZERP.System.contextPath + '' + _printURLPathString;
  var printURL = printURLPathString;

  var params = jsClient.paramsToObj(window.location.search);
  var queryString = jsClient.paramsToQueryString(params);
  printURL = printURL + "&" + queryString;
  var myWindow = window.open(printURL, '_blank');
}



ZERP.SFHL.makeLineFormTHLabel = function(){
	var entityStructureObj =  ZERP.System.EntityStructureObj;
	var objectStructure = entityStructureObj['ObjectStructure'];

	var ListTableUILabel = '';
	ListTableUILabel += '<table id="listTableUILabel">';
	ListTableUILabel += '<tr>';
	ListTableUILabel += '<th class="optionTd" style="width:50px;"></th>';

	for (var attributeName in objectStructure) {
		var thisAttributeProperties = objectStructure[attributeName];

    var defaultval = (!!thisAttributeProperties['defaultval']) ? thisAttributeProperties['defaultval'] : '';
    var HtmlType = (!!thisAttributeProperties['HtmlType']) ? thisAttributeProperties['HtmlType'] : '';
    var fielddesc = (!!thisAttributeProperties['fielddesc']) ? thisAttributeProperties['fielddesc'] : '';
    var objLabel = (!!thisAttributeProperties['objLabel']) ? thisAttributeProperties['objLabel'] : fielddesc;
    var objLabelFull = (!!thisAttributeProperties['objLabelFull']) ? thisAttributeProperties['objLabelFull'] : fielddesc;
    var HTMLSize = (!!thisAttributeProperties['HTMLSize']) ? thisAttributeProperties['HTMLSize'] : '100';
    var headerEntry = (!!thisAttributeProperties['headerEntry']) ? thisAttributeProperties['headerEntry'] : false;
    var hideOnView = (!!thisAttributeProperties['hideOnViewField']) ? thisAttributeProperties['hideOnViewField'] : false;
    var hideOnList = (!!thisAttributeProperties['hideOnListField']) ? thisAttributeProperties['hideOnListField'] : false;
    var requiredSpan = '';
    if(!!thisAttributeProperties.MandatoryInUI && thisAttributeProperties.MandatoryInUI == true){
    	requiredSpan = '<span class="required MInUI" style="color:red;"> *</span>';
    }

    if(headerEntry == true){
    	continue;
    }
    var hideOnViewCSS = '';
    var hideOnListCSS = '';
    // if(hideOnView == true){
    // 	hideOnViewCSS = ' display: none; ';
    // }
    if(hideOnList == true){
      hideOnListCSS = ' display: none; ';
    }

    if( thisAttributeProperties.hasOwnProperty('AttributeType') && thisAttributeProperties.AttributeType =='UIStyle' ) continue;

		ListTableUILabel += '<th title="'+objLabelFull+'" style="width:'+HTMLSize+'px; max-width:'+HTMLSize+'px; min-width:'+HTMLSize+'px; overflow:hidden;  '+hideOnListCSS+' ">'+fielddesc + requiredSpan +'</th>';
	}

	ListTableUILabel += '</tr>';
	ListTableUILabel += '</table>';

	return ListTableUILabel;
}



ZERP.SFHL.makeLineTabletFooter = function(){
  var objectStructure = ZERP.System.EntityStructureObj['ObjectStructure'];

  var ListTableUILabel = '';
  ListTableUILabel += '<tr>';
  // ListTableUILabel += '<td class=""></td>'; // optionTd

  for (var attributeName in objectStructure) {
    var thisAttributeProperties = objectStructure[attributeName];
    var headerEntry = (!!thisAttributeProperties['headerEntry']) ? thisAttributeProperties['headerEntry'] : false;
    var hideOnList = (!!thisAttributeProperties['hideOnListField']) ? thisAttributeProperties['hideOnListField'] : false;
    var HtmlType = (!!thisAttributeProperties['HtmlType']) ? thisAttributeProperties['HtmlType'] : false;
    if(headerEntry == true){
      continue;
    }
    var hideOnListCSS = '';
    if(hideOnList == true){
      hideOnListCSS = ' display: none; ';
    }
    if( thisAttributeProperties.hasOwnProperty('AttributeType') && thisAttributeProperties.AttributeType =='UIStyle' ) continue;
    ListTableUILabel += '<td fieldname='+attributeName+' style="'+hideOnListCSS+'" class="'+HtmlType+'" ></td>';
  }

  ListTableUILabel += '</tr>';
  return ListTableUILabel;
}




ZERP.SFHL.getLastTdAction_ExcelLineForm = function(){
  var lastTd = '<td class="optionTdLast inline-action-toolbar" style="white-space:nowrap;">';
  lastTd += '<button type="button" class="btn btn-outline-danger btn-sm" style="width:32px;" title="Click to delete this line" onclick="ZERP.SFHL.removeLine(event, this, \'\');"><i class="fas fa-times"></i></button>';
  lastTd += '</td>';
  return lastTd;
}

ZERP.SFHL.getLastTdAction = function(){
  var lastTd = '<td class="optionTdLast inline-action-toolbar" style="white-space:nowrap;">';
  lastTd += '<button type="button" class="btnMakeEditModeThisLine btn btn-outline-secondary btn-sm" style="width:50px;" title="Click to edit this line" onclick="ZERP.FrmMgr.SFHL.setTrEditMode(event,this, \'2\');"><i class="fas fa-pencil-alt"></i></button>';
  lastTd += '&nbsp&nbsp';
  // <input type="text" name="txt1" onKeyPress="SearchName(event,this,selList)" value="<Type To Search>" onClick="javascript:this.value='';" style="width:200px;">
  lastTd += '<button type="button" class="btn btn-outline-danger btn-sm" style="width:32px;" title="Click to delete this line" onclick="ZERP.SFHL.removeLine(event, this, \'\');"><i class="fas fa-times"></i></button>';
  lastTd += '</td>';

  if(!!ZERP.System.EntityStructureObj['_renderExcelLikeLineForm']){
    return ZERP.SFHL.getLastTdAction_ExcelLineForm();
  }
  return lastTd;
}

ZERP.SFHL.getFirstOptionTdTdAction = function(){
  var lastTd = '<td class="optionTd inline-action-toolbar" style="position:relative; width:55px;">';
  // var lastTd = '<td class="optionTd inline-action-toolbar" style="width:55px;">';
  lastTd += '<div class="lineEditIcon" style="">';
  lastTd += '<button type="button" class="btnMakeEditModeThisLine btn btn-outline-secondary btn-sm" style="width:50px;" title="Click to edit this line" onclick="ZERP.FrmMgr.SFHL.setTrEditMode(event,this, \'1\');"><i class="fas fa-pencil-alt"></i></button>';
  lastTd += '</div>';
  lastTd += '</td>';
  return lastTd;
}


ZERP.SFHL.makeLineForm = function(){
	var entityStructureObj =  ZERP.System.EntityStructureObj;
	var objectStructure = entityStructureObj['ObjectStructure'];

	var LineFormStr = '';
	var LineFormTmp = '';
	LineFormStr += '<table id="listTable">';
  LineFormStr += '<thead class="thead_SingleFormHL"></thead>';
  LineFormStr += '<tbody class="tbody">';
  // <input type="text" name="txt1" onKeyPress="SearchName(event,this,selList)" value="<Type To Search>" onClick="javascript:this.value='';" style="width:200px;">
	// LineFormTmp += '<tr data-id="1" class="editModeTr" onclick="ZERP.FrmMgr.SFHL.setTrEditMode(event,this);">'; // replace date: 2019-09-23 - for no click action in tr for set edit mode
  LineFormTmp += '<tr data-id="1" class="editModeTr dirtyLine" onclick="ZERP.SFHL.setFocusableLineTr(this);">';
	// LineFormTmp += '<td class="optionTd" style="position:relative;"><div class="lineEditIcon" style="position:absolute; left:5px; top:10px; z-index:9999;"><i class="fas fa-pencil-alt"></i></div></td>';
  LineFormTmp += ZERP.SFHL.getFirstOptionTdTdAction();
	for (var attributeName in objectStructure) {
		var thisAttributeProperties = objectStructure[attributeName];

        var defaultval = (!!thisAttributeProperties['defaultval']) ? thisAttributeProperties['defaultval'] : '';
        var HtmlType = (!!thisAttributeProperties['HtmlType']) ? thisAttributeProperties['HtmlType'] : '';
        var fielddesc = (!!thisAttributeProperties['fielddesc']) ? thisAttributeProperties['fielddesc'] : '';
        var HTMLSize = (!!thisAttributeProperties['HTMLSize']) ? thisAttributeProperties['HTMLSize'] : '100';
        var headerEntry = (!!thisAttributeProperties['headerEntry']) ? thisAttributeProperties['headerEntry'] : false;
        // var hideOnView = (!!thisAttributeProperties['hideOnView']) ? thisAttributeProperties['hideOnView'] : false;
        var hideOnView = (!!thisAttributeProperties['hideOnViewField']) ? thisAttributeProperties['hideOnViewField'] : false;
        var hideOnList = (!!thisAttributeProperties['hideOnListField']) ? thisAttributeProperties['hideOnListField'] : false;
        var AppendExtraTextareaBox = (!!thisAttributeProperties['AppendExtraTextareaBox']) ? thisAttributeProperties['AppendExtraTextareaBox'] : false;

        if(headerEntry == true){
        	continue;
        }
        var hideOnListCSS = '';
        if(hideOnList == true){
        	hideOnListCSS = ' display: none; ';
        }

        if( thisAttributeProperties.hasOwnProperty('AttributeType') && thisAttributeProperties.AttributeType =='UIStyle' ) continue;

        var btnDropdownToggle = '';
        if(thisAttributeProperties.hasOwnProperty('RefDropdownOption') && thisAttributeProperties['RefDropdownOption'] == '1'){
            btnDropdownToggle = ZERP.Utils.HTML_button('btnDropdownOption', thisAttributeProperties, attributeName);
        }

        var exrtaTextareaBox = "";
        if(AppendExtraTextareaBox == true){
          exrtaTextareaBox = '<textarea name="'+attributeName+'_extra" class="_extraTextareaBox" style="width:98%; border:none;" ></textarea>';
        }

        var inputTag = ZERP.Utils.genericHtmlInputFieldMaker(attributeName, defaultval, thisAttributeProperties);
        var packInputTag = '<div style="position:relative; display:inline-block;">'+inputTag + btnDropdownToggle +'</div>'; // exrtaTextareaBox ---> can not append here -- make css wired

		// LineFormTmp += '<td fieldname='+attributeName+' style="width:'+HTMLSize+'px; max-width:'+HTMLSize+'px; overflow:hidden; '+hideOnViewCSS+' ">'+inputTag+'</td>';
        LineFormTmp += '<td fieldname='+attributeName+' style="width:'+HTMLSize+'px; max-width:'+HTMLSize+'px; min-width:'+HTMLSize+'px; overflow:hidden; '+hideOnListCSS+' ">'+packInputTag + exrtaTextareaBox +'</td>';

	}

  // console.log(LineFormTmp)

	LineFormTmp += ZERP.SFHL.getLastTdAction();
  LineFormTmp += '</tr>';
	LineFormStr += LineFormTmp;
	LineFormStr += '</tbody>';
  LineFormStr += '<tfoot>';
  LineFormStr += '</tfoot>';
  LineFormStr += '</table>';

	ZERP.SFHL.CacheNewLineHTML = LineFormTmp;
	return LineFormStr;
}


ZERP.SFHL.initHeader = function(formMode){
	// $('.ZERP_HeaderEntryCt #LDCBarcodeSL').change(function(){
	// 	console.log('I am changing');
	// 	// alert('I am changing');
	// });

	// $('.ZERP_HeaderEntryCt #LDCBarcodeSL').blur(function(){
	// 	console.log('I am bluring');
	// });

  var _baseStructure = ZERP.System.EntityStructureObj;

  var mandatoryInUIFields = _baseStructure['mandatoryInUIFields'];  
  if(mandatoryInUIFields.length > 0){
    for (var i = 0; i < mandatoryInUIFields.length; i++) {
      var fieldname = mandatoryInUIFields[i];
      $('.ZERP_HeaderEntryCt' + ' #' + fieldname).attr('required', 'required');
      $('.ZERP_HeaderEntryCt' + ' #' + fieldname).closest('div.formGroup').find('label span.MInUI').remove();
      $('.ZERP_HeaderEntryCt' + ' #' + fieldname).closest('div.formGroup').find('label').not('#'+fieldname).append('<span class="requiredXy MInUI">*</span>');
    }
  }

  var mandatoryInServerFields = _baseStructure['mandatoryInServerFields'];  
  if(mandatoryInServerFields.length > 0){
    for (var i = 0; i < mandatoryInServerFields.length; i++) {
      var fieldname = mandatoryInServerFields[i];
      $('.ZERP_HeaderEntryCt' + ' #' + fieldname).attr('required', 'required');
      $('.ZERP_HeaderEntryCt' + ' #' + fieldname).closest('div.formGroup').find('label').not('#'+fieldname).append('<span class="required MInServer">*</span>');
    }
  }

  // handle alwaysReadOnlyFields
  var alwaysReadOnlyFields = _baseStructure['alwaysReadOnlyFields'];  
  if(alwaysReadOnlyFields.length > 0){
    for (var i = 0; i < alwaysReadOnlyFields.length; i++) {
      var fieldname = alwaysReadOnlyFields[i];
      $('.ZERP_HeaderEntryCt').find('#'+fieldname).attr('disabled', 'disabled');
      $('.ZERP_HeaderEntryCt').find('.'+fieldname).attr('disabled', 'disabled');
      $('.ZERP_HeaderEntryCt').find('div[forattribute='+fieldname+']').css('display', 'none');
      if($('.ZERP_HeaderEntryCt').find('button[forAttribute='+fieldname+']').hasClass('btnDropdownToggle')){
        $('.ZERP_HeaderEntryCt').find('button[forAttribute='+fieldname+']').css('display', 'none');
      }
    }
  }

  // handle onEditOnlyFields
  var formEditMode = true;
  var formCreateMode = false;
  var fatherQueryKeys = _baseStructure['fatherQueryKeys'];
  for (var i = 0; i < fatherQueryKeys.length; i++) {
    var fahterQueryKey = fatherQueryKeys[i];
    var fahterQueryVal = $('.ZERP_HeaderEntryCt' + ' #'+fahterQueryKey).val();
    if(!!!fahterQueryVal){
      formEditMode = false;
      formCreateMode = true;
      break;      
    }
    if( !!fahterQueryVal && (fahterQueryVal == '' || fahterQueryVal == null ) ){
      formEditMode = false;
      formCreateMode = true;
      break;
    }
  }

  if(formEditMode){
    var onEditOnlyFields = _baseStructure['onEditOnlyFields'];  
    for (var i = 0; i < onEditOnlyFields.length; i++) {
      var fieldname = onEditOnlyFields[i];
      $('.ZERP_HeaderEntryCt').find('#'+fieldname).attr('disabled', 'disabled');
    }
  }


  // handle hideOnCreateFields
  // if(!!formMode && formMode == 'create'){
  if(formCreateMode){
    var hideOnCreateFields = _baseStructure['hideOnCreateFields'];  
    for (var i = 0; i < hideOnCreateFields.length; i++) {
      var fieldname = hideOnCreateFields[i];
      $('.ZERP_HeaderEntryCt').find('#'+fieldname).closest('div.formGroup').css('display', 'none');
    }
  }

  if(formEditMode){
    var hideOnUpdateFields = _baseStructure['hideOnUpdateFields'];  
    for (var i = 0; i < hideOnUpdateFields.length; i++) {
      var fieldname = hideOnUpdateFields[i];
      $('.ZERP_HeaderEntryCt').find('#'+fieldname).closest('div.formGroup').css('display', 'none');
    }    
  }


  if(!!formMode && formMode == 'read'){
    $('.ZERP_HeaderEntryCt').find('.btnLookup').attr('disabled', 'disabled');
    $('.ZERP_HeaderEntryCt').find('.dropdownlistArrowZERPComboBox').css('pointer-events', 'none');
  }

  if(!!formMode && formMode == 'edit'){
    $('.ZERP_HeaderEntryCt').find('.btnLookup').removeAttr('disabled');
    $('.ZERP_HeaderEntryCt').find('.dropdownlistArrowZERPComboBox').css('pointer-events', '');
    $('.ZERP_HeaderEntryCt').find('.dropdownlistArrowZERPComboBox').css('cursor', 'pointer');
  }


  // Value at Focus Handling
  $('.ZERP_HeaderEntryCt').find('input[type=text]').focus(function(){
    ZERP.valAtFocus = $(this).val();
  });
  $('.ZERP_HeaderEntryCt').find('input[type=text], select, textarea').click(function(){
    ZERP.FrmMgr.genFrm.removeReferenceEntityAddonButton();
  });

  ZERP.FrmMgr.genFrm.handleDateTimePickerPlugin();
  ZERP.FrmMgr.genFrm.initOnDemandDataDropdownHandling();
  ZERP.FrmMgr.genFrm.initReferenceEntityAddonButton();


}


ZERP.SFHL.fillHeaderData = function(headerBean){
	$.each(headerBean, function(fieldname, fieldvalue){
	 $('.ZERP_HeaderEntryCt').find('input[name='+fieldname+'], select[name='+fieldname+'], textarea[name='+fieldname+']').val(fieldvalue);
	});

	var EntityAttributes = ZERP.System.EntityStructureObj['Attributes'];
    $.each(headerBean, function(attributeName, attributeValue){
    	var thisAttributeProperties = (!!EntityAttributes[attributeName]) ? EntityAttributes[attributeName] : {};

	    if(!!thisAttributeProperties.HtmlType && thisAttributeProperties.HtmlType == 'odDropdownRefObj'){
	      $(ZERP.FrmMgr.genFrm.formId + ' #' + attributeName).val(headerBean.CodeAttributeDecoVals[attributeName]);
	      $(ZERP.FrmMgr.genFrm.formId + ' #' + attributeName+'_code').val(attributeValue);

	    } else if(!!thisAttributeProperties.HtmlType && thisAttributeProperties.HtmlType == 'dateMEF7'){

        $(ZERP.FrmMgr.genFrm.formId + ' #' + attributeName).val(jsClient.dateFormatTranslateGlobalToLocal(attributeValue));
       
      } else if(!!thisAttributeProperties.HtmlType && thisAttributeProperties.HtmlType == 'checkbox'){

        if(attributeValue == '1'){
          $(ZERP.FrmMgr.genFrm.formId + ' #' + attributeName).prop('checked', true);
        } else {
          $(ZERP.FrmMgr.genFrm.formId + ' #' + attributeName).prop('checked', false);
        }
       
      }


	});
	 
}




ZERP.SFHL.populatedLineData = function(lineBean, thisTrPtr){

    var $tr = $(thisTrPtr);
    var entityAttributes = ZERP.System.EntityStructureObj['Attributes'];

    for ( var attributeName in entityAttributes ) {

        var attributeProperties = entityAttributes[attributeName];
        var attributeValue = lineBean[attributeName];

        if(!!attributeProperties.AttributeType && attributeProperties.AttributeType == "UIStyle") continue;
        var headerEntry = (!!attributeProperties.headerEntry && attributeProperties.headerEntry == true) ? attributeProperties.headerEntry : false;
        if(headerEntry) continue;

        $tr.find('td[fieldname='+attributeName+']').find('input, select, textarea').val(attributeValue);
        if(!!attributeProperties.HtmlType && attributeProperties.HtmlType == 'odDropdownRefObj'){

            $tr.find('td[fieldname='+attributeName+']').find('input[name='+attributeName+']').val(lineBean.CodeAttributeDecoVals[attributeName]);
            if(!!attributeProperties.ReferenceEntityExtraFieldNames && attributeProperties.ReferenceEntityExtraFieldNames != ''){
                $tr.find('td[fieldname='+attributeName+']').find('textarea[name='+attributeName+'_extra]').val(lineBean.CodeAttributeDecoVals[attributeName+'_extra']);
            }

        }
        
    }
    
}



ZERP.SFHL.populatedLinesData = function(lineBeans){
	var entityAttributes = ZERP.System.EntityStructureObj['Attributes'];

	var lineBeansLength = lineBeans.length;

	for (var i = 0; i < lineBeans.length; i++) {
		var lineBean = lineBeans[i];
		var LineNumber = lineBean['lineNumber'];
		ZERP.SFHL.CurrLineNumber = LineNumber;
		ZERP.SFHL.NextLineNumber = Number(LineNumber) + Number(1);

		// take new tr 
		if(i==0){
			// already has tr
      // just apply css
      ZERP.FrmMgr.SFHL.applyStaticCSS();
      // ZERP.FrmMgr.SFHL.applyDynamicCSS();    
		} else {
			ZERP.SFHL.addNewLine_duringReadData(LineNumber);
		}

		$tr = ZERP.SFHL.getLineBeingEdited();
		// set systemmain attribute
		$tr.attr('data-id', LineNumber);

		for (var key in lineBean) {
			var val = lineBean[key];
			$tr.find('td[fieldname='+key+']').find('input, select, textarea').val(val);

			var attributeName = key;
			var attributeValue = val;
			var thisAttributeProperties = (!!entityAttributes[attributeName]) ? entityAttributes[attributeName] : {};

			if(!!thisAttributeProperties.HtmlType && thisAttributeProperties.HtmlType == 'odDropdownRefObj'){
				$tr.find('td[fieldname='+attributeName+']').find('input[name='+attributeName+']').val(lineBean.CodeAttributeDecoVals[attributeName]);
				$tr.find('td[fieldname='+attributeName+']').find('input[name='+attributeName+'_code]').val(attributeValue);
        if(!!thisAttributeProperties.ReferenceEntityExtraFieldNames && thisAttributeProperties.ReferenceEntityExtraFieldNames != ''){
          $tr.find('td[fieldname='+attributeName+']').find('textarea[name='+attributeName+'_extra]').val(lineBean.CodeAttributeDecoVals[attributeName+'_extra']);
        }

			} else if(!!thisAttributeProperties.HtmlType && thisAttributeProperties.HtmlType == 'checkbox'){
        if(attributeValue == '1'){
          $tr.find('td[fieldname='+attributeName+']').find('input[name='+attributeName+']').prop('checked', true);
        } else {
          $tr.find('td[fieldname='+attributeName+']').find('input[name='+attributeName+']').prop('checked', false);
        }
      }

		}

		if(lineBeansLength == (i+1)){
      $tr.removeClass('editModeTr');
      $tr.removeClass('dirtyLine');
      $tr.addClass('readModeTr');
      $tr.addClass('saveLine');
      // apply css for read mode// specially for only one line
      ZERP.FrmMgr.SFHL.applyDynamicCSS();
			break;
		} 

	}

}







ZERP.FrmMgr.SFHL.makingTableWidthAndTdWidthSame = function(table1Id, table2Id){

}



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////// Excel Style Line Form Start /////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Note: its normally for styling and controling line table TH
ZERP.FrmMgr.SFHL.applyStaticCSS_ExcelLineForm = function(){
  // Apply CSS
  $('#listTable tbody tr.readModeTr').find('input, select, textarea').css({
    'border' : 'none',
  });

  $('#listTable tbody tr.editModeTr').find('input, select, textarea').css({
    'font-family' : 'Arial',
    'font-size' : '13px',
    'border' : '1px solid #7F7F7F',
    'padding' : '2px',
    'padding-left' : '4px',
    'border-radius' : '3px',
  });

  $('#listTable tbody tr.readModeTr').find('input[name=lineNumber]').css({
    'padding-left' : '10px',
  });

  $('#listTable tbody tr.editModeTr').find('input[name=lineNumber]').css({
    'padding-left' : '10px',
  });


  $('#listTable tbody tr td').css({
    'border-top' : '1px solid #dadada',
    'border-bottom' : '1px solid #dadada',
    'height' : '50px',
    'padding' : '8px 2px',
    'padding' : '4px 1px',
  });

  $('#listTable tbody tr:nth-child(odd)').css({
    'background' : 'rgba(0, 0, 0, 0)',
  });

  $('#listTable tbody tr:nth-child(even)').css({
    'background' : 'rgb(249, 249, 249)',
  });

  $('#listTableUILabel tbody tr th').css({
    'font-size' : '13px',
    'font-weight' : '500',
    'padding' : '8px 2px',
    'padding-left' : '7px',
    'border' : '2px',
    'border' : '0px',
    'border-left': '1px solid lightgray',
    'border-right': '1px solid lightgray',
    'font-weight' : 'bold',
  });

  $('#listTable tbody tr td[fieldname=lineNumber] input').css({
    'cursor' : 'pointer',
    'background': 'lightgray'
  });

  // _extraTextareaBox for reference entity extra params
  $('#listTable tbody tr.editModeTr').find(' textarea._extraTextareaBox').css({
    'border' : 'none',
  });

  $('.formGroup').css('float', 'left');


}


/**
 * use below border color
 * for making tr td input tranparent like PrismVat
 * 
 * grainsbro
 * lavender
 * lightgray
 */
// Note: its normally for styling and controling line table TD
ZERP.FrmMgr.SFHL.applyDynamicCSS_ExcelLineForm = function(){

  // Tr Read mode ----------------------------------------------------------------------------------------------------------
  $('#listTable tbody tr.readModeTr').css({
    'height' : '50px',
  });

  $('#listTable tbody tr.readModeTr').find('input, select, textarea').attr('disabled', true);
  $('#listTable tbody tr.readModeTr').find('input, select, textarea').css({
    'border' : 'none',
    'background' : 'transparent',
  });


  // Handle line input tag height // 
  $('#listTable tbody tr.editModeTr, tr.readModeTr').find('input, select').css({
    'font-family' : 'Arial',
    'font-size' : '13px',
    'max-height': '33px',
  });

  // Tr Edit mode -------------------------------------------------------------------------------------------------------------
  $('#listTable tbody tr.editModeTr').find('input, select, textarea').removeAttr('disabled');
  $('#listTable tbody tr.editModeTr').find('input, select, textarea').css({
    'border' : '1px solid lightgray',
    'padding' : '2px',
    'padding-left' : '4px',
    'padding-left' : '0px',
    'padding-right' : '0px',
    'padding-left' : '2px',
    'border-radius' : '3px',
    'background': 'white'
  });
  $('#listTable tbody tr.editModeTr td[fieldname=lineNumber] input').css({
    'background': 'lightgray',
  });

  $('#listTable tbody tr.editModeTr').find('input:not([type="checkbox"]), select').css({
    'height' : '30.8px', // skip textarea height
  });
  $('#listTable tbody tr.editModeTr').find('td.optionTd .btnMakeEditModeThisLine').css('display', 'none');



  $('#listTable tbody tr.readModeTr').find('input[name=lineNumber]').css({
    'padding-left' : '15px',
  });

  $('#listTable tbody tr.readModeTr').find('textarea').css({
    'resize' : 'none',
  });

  $('#listTable tbody tr.editModeTr').find('textarea').css({
    'resize' : 'vertical',
  });

  $('#listTable tbody tr.editModeTr').find('input[name=lineNumber]').css({
    'padding-left' : '15px',
  });


  // Input field width handling //
  var entityStructureObj =  ZERP.System.EntityStructureObj;
  var objectStructure = entityStructureObj['ObjectStructure'];

  for (var attributeName in objectStructure) {
    var thisAttributeProperties = objectStructure[attributeName];
    var HTMLSize = (!!thisAttributeProperties['HTMLSize']) ? thisAttributeProperties['HTMLSize'] : '100';
    var HtmlType = (!!thisAttributeProperties['HtmlType']) ? thisAttributeProperties['HtmlType'] : '';
    var ReadOnly = (!!thisAttributeProperties['ReadOnly']) ? thisAttributeProperties['ReadOnly'] : '';
    if(HtmlType == 'checkbox') continue;

    $('#listTable tbody tr.editModeTr').find('input#'+attributeName+', select#'+attributeName+', textarea#'+attributeName+'').css({
      'width' : (HTMLSize-2)+'px',
    });
    $('#listTable tbody tr.readModeTr').find('input#'+attributeName+', select#'+attributeName+', textarea#'+attributeName+'').css({
      'width' : (HTMLSize-2)+'px',
    });

    if(ReadOnly == "AlwaysReadOnly"){
      $('#listTable tbody tr.editModeTr').find('[name='+attributeName+']').attr('disabled', 'disabled');
      $('#listTable tbody tr.editModeTr').find('[name='+attributeName+']').css('background', '');
    }

  }


  $('#listTable tbody tr.editModeTr').find(' textarea._extraTextareaBox').css({
    'border' : 'none',
  });



  $('#listTable tbody tr.readModeTr').find('button.btnDropdownToggle').css('display', 'none');
  $('#listTable tbody tr.editModeTr').find('button.btnDropdownToggle').css('display', 'inline-block');
  /////////@Al-Mamun-2019-10-04 ////////
  ZERP.SFHL.handleLineToolbarCustomize();

}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////// Excel Style Line Form End //////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Stop using this function
 */
ZERP.FrmMgr.SFHL.applyStaticCSS = function(){
	// Apply CSS
  $( '#listTable tbody tr:last-child' ).css('height', '90px');

	$('#listTable tbody tr.readModeTr').find('input, select, textarea').css({
		'border' : 'none',
	});

	$('#listTable tbody tr.editModeTr').find('input, select, textarea').css({
		'font-family' : 'Arial',
		'font-size' : '13px',
		'border' : '1px solid #7F7F7F',
		'padding' : '2px',
    'padding-left' : '4px',
		'border-radius' : '3px',
	});

	$('#listTable tbody tr.readModeTr').find('input[name=lineNumber]').css({
		'padding-left' : '10px',
	});

	$('#listTable tbody tr.editModeTr').find('input[name=lineNumber]').css({
		'padding-left' : '10px',
	});


	$('#listTable tbody tr td').css({
		// 'border' : '2px solid ghostwhite',
		// 'border' : '1px solid #dadada',
		'border-top' : '1px solid #dadada',
		'border-bottom' : '1px solid #dadada',
		'height' : '50px',
		'padding' : '8px 2px',
	});

	$('#listTable tbody tr:nth-child(odd)').css({
		'background' : 'rgba(0, 0, 0, 0)',
	});

	$('#listTable tbody tr:nth-child(even)').css({
		'background' : 'rgb(249, 249, 249)',
	});

	$('#listTableUILabel tbody tr th').css({
		'font-size' : '13px',
		'font-weight' : '500',
		'padding' : '8px 2px',
    'padding-left' : '7px',
		'border' : '2px',
		'font-weight' : 'bold',
	});

	// First option TD
	$('#listTable tbody tr td.optionTd').css({
		// 'width' : '35px',
		// 'max-width' : '35px',
		// 'padding' : '0px',
		// 'border' : 'none',
		// 'cursor' : 'pointer',
	});
	$('#listTableUILabel tbody tr th.optionTd').css({
		// 'width' : '35px',
		// 'max-width' : '35px',
		// 'padding' : '0px',
		// 'border' : 'none',		
	});
	$('#listTable tbody tr td[fieldname=lineNumber] input').css({
		'cursor' : 'pointer',
    'background': 'lightgray'
	});


  // _extraTextareaBox for reference entity extra params
  $('#listTable tbody tr.editModeTr').find(' textarea._extraTextareaBox').css({
    'border' : 'none',
  });

	$('.formGroup').css('float', 'left');


}


ZERP.FrmMgr.SFHL.applyDynamicCSS = function(){
	// Apply CSS
  
  // Handle line tr height // 
  // $('#listTable tbody tr td').css({
  //   'height' : '50px',
  // });  

  // Tr Read mode ----------------------------------------------------------------------------------------------------------
	$('#listTable tbody tr.readModeTr').css({
		'height' : '50px',
	});

  $('#listTable tbody tr.readModeTr').find('input, select, textarea').attr('disabled', true);
	$('#listTable tbody tr.readModeTr').find('input, select, textarea').css({
		'border' : 'none',
    'background' : 'transparent',
	});

  $('#listTable tbody tr.readModeTr').find('td.optionTd .btnMakeEditModeThisLine').css('display', 'inline-block');


  // Handle line input tag height // 
  $('#listTable tbody tr.editModeTr, tr.readModeTr').find('input, select, textarea').css({
    'font-family' : 'Arial',
    'font-size' : '13px',
  });

  // Tr Edit mode -------------------------------------------------------------------------------------------------------------
  $('#listTable tbody tr.editModeTr').find('input, select, textarea').removeAttr('disabled');
	$('#listTable tbody tr.editModeTr').find('input, select, textarea').css({
		'border' : '1px solid #7F7F7F',
		'padding' : '2px',
    'padding-left' : '4px',
		'border-radius' : '3px',
    'background': 'white'
	});
  $('#listTable tbody tr.editModeTr td[fieldname=lineNumber] input').css({
    'background': 'lightgray',
  });

  $('#listTable tbody tr.editModeTr').find('input:not([type="checkbox"]), select').css({
    'height' : '30.8px', // skip textarea height
  });
  $('#listTable tbody tr.editModeTr').find('td.optionTd .btnMakeEditModeThisLine').css('display', 'none');



	$('#listTable tbody tr.readModeTr').find('input[name=lineNumber]').css({
		'padding-left' : '15px',
	});

	$('#listTable tbody tr.readModeTr').find('textarea').css({
		'resize' : 'none',
	});

	$('#listTable tbody tr.editModeTr').find('textarea').css({
		'resize' : 'vertical',
	});

	$('#listTable tbody tr.editModeTr').find('input[name=lineNumber]').css({
		'padding-left' : '15px',
	});

	$('#listTable tbody tr.editModeTr').find('input').css({
		// 'margin-bottom' : '20px',
	});

	// Input field width handling //
	var entityStructureObj =  ZERP.System.EntityStructureObj;
	var objectStructure = entityStructureObj['ObjectStructure'];

	for (var attributeName in objectStructure) {
		var thisAttributeProperties = objectStructure[attributeName];
		var HTMLSize = (!!thisAttributeProperties['HTMLSize']) ? thisAttributeProperties['HTMLSize'] : '100';
    var HtmlType = (!!thisAttributeProperties['HtmlType']) ? thisAttributeProperties['HtmlType'] : '';
    var ReadOnly = (!!thisAttributeProperties['ReadOnly']) ? thisAttributeProperties['ReadOnly'] : '';
    if(HtmlType == 'checkbox') continue;

		$('#listTable tbody tr.editModeTr').find('input#'+attributeName+', select#'+attributeName+', textarea#'+attributeName+'').css({
			'width' : (HTMLSize-10)+'px',
		});
    $('#listTable tbody tr.readModeTr').find('input#'+attributeName+', select#'+attributeName+', textarea#'+attributeName+'').css({
      'width' : (HTMLSize-10)+'px',
    });

    if(ReadOnly == "AlwaysReadOnly"){
      $('#listTable tbody tr.editModeTr').find('[name='+attributeName+']').attr('disabled', 'disabled');
      $('#listTable tbody tr.editModeTr').find('[name='+attributeName+']').css('background', '');
    }

	}


  $('#listTable tbody tr.editModeTr').find(' textarea._extraTextareaBox').css({
    'border' : 'none',
  });



  $('#listTable tbody tr.readModeTr').find('button.btnDropdownToggle').css('display', 'none');
  $('#listTable tbody tr.editModeTr').find('button.btnDropdownToggle').css('display', 'inline-block');
  /////////@Al-Mamun-2019-10-04 ////////
  ZERP.SFHL.handleLineToolbarCustomize();

}



ZERP.SFHL.getLineBeingEdited = function() {
  // return $('#formLines input[type=text]:visible').first().closest('tr');
  // return $('#listTable').find('tr.editModeTr');
  return $('#listTable').find('tr.dirtyLine');
}

ZERP.SFHL.getLineBeingReaded = function() {
  return $('#listTable').find('tr.saveLine');
}



ZERP.SFHL.collectLineData = function(thisPtr){
	// var $tr = $(thisPtr).closest('tr');
	var lineObj = {};
	$(thisPtr).closest('tr').find('td').find('input[type=text], input[type=number], input[type=hidden], select, textarea').each (function() {
	  // do your cool stuff
	  var key = $(this).attr('name');
	  var val = $(this).val();
	  lineObj[key] = val;
	});  

	return lineObj;
}


ZERP.SFHL.collectLineData2 = function(thisTrPtr){

  var lineObj = {};
  $(thisTrPtr).find('td').find('input[type=text], input[type=number], input[type=hidden], select, textarea').each (function() {
    var key = $(this).attr('name');
    var val = $(this).val();
    lineObj[key] = val;
  });


  var entityAttributes = ZERP.System.EntityStructureObj['Attributes'];
  for (var attributeName in entityAttributes) {
      var thisAttributeProperties = entityAttributes[attributeName];

      if(!!thisAttributeProperties.AttributeType && thisAttributeProperties.AttributeType == "UIStyle") continue;
      var headerEntry = (!!thisAttributeProperties.headerEntry && thisAttributeProperties.headerEntry == true) ? thisAttributeProperties.headerEntry : false;

      if(headerEntry){
          if(!!thisAttributeProperties.HtmlType && thisAttributeProperties.HtmlType == 'odDropdownRefObj'){
              lineObj[attributeName] = $('.ZERP_HeaderEntryCt').find('input[name='+ attributeName +'_code]').val();
              lineObj[attributeName+'_code'] = $('.ZERP_HeaderEntryCt').find('input[name='+ attributeName +'_code]').val();
              lineObj[attributeName+'_desc'] = $('.ZERP_HeaderEntryCt').find('input[name='+ attributeName +']').val();

          } else if(!!thisAttributeProperties.HtmlType && thisAttributeProperties.HtmlType == 'select'){
              lineObj[attributeName] = $('.ZERP_HeaderEntryCt').find('select[name='+ attributeName +']').val();
          } else {
              lineObj[attributeName] = $('.ZERP_HeaderEntryCt').find('input[name='+ attributeName +']').val();
          }

      } else {
          if(!!thisAttributeProperties.HtmlType && thisAttributeProperties.HtmlType == 'odDropdownRefObj'){
              var desc = lineObj[attributeName];
              var code = lineObj[attributeName+'_code'];
              lineObj[attributeName+'_desc'] = desc;
              lineObj[attributeName+'_code'] = code;
              lineObj[attributeName] = code;
          } else {
              //
          }
      }

  }

  return lineObj;

}

ZERP.SFHL.collectLinesData = function(){
    var EntityAttributes = ZERP.System.EntityStructureObj['Attributes'];
   
    var linesObj = [];
    $('#listTableWrapper #listTable tbody tr').each(function(indx, thisTr){
      	var lineObj = {};
        $(thisTr).find('td').each(function(){
          var fieldname = $(this).attr('fieldname');
          var fieldvalue = $(this).find('input, select, textarea').val();
          // console.log('fieldname: ' + fieldname + '   ---> fieldvalue :' + fieldvalue);
          lineObj[fieldname] = fieldvalue;

          var attributeName = fieldname;
          var attributeValue = fieldvalue;
          var thisAttributeProperties = (!!EntityAttributes[attributeName]) ? EntityAttributes[attributeName] : {};
    		  if(!!thisAttributeProperties.HtmlType && thisAttributeProperties.HtmlType == 'odDropdownRefObj'){
    		  	var attributeValue = $(this).find('input[name='+ attributeName +'_code]').val();
            var attributeValueCode = $(this).find('input[name='+ attributeName +'_code]').val();
            var attributeValueDesc = $(this).find('input[name='+ attributeName +']').val();
    		  	console.log('@attributeValue');
    		  	console.log(attributeValue);
    		  	lineObj[attributeName] = attributeValue;
            lineObj[attributeName+'_code'] = attributeValueCode;
            lineObj[attributeName+'_desc'] = attributeValueDesc;

    		  } else if(!!thisAttributeProperties.HtmlType && thisAttributeProperties.HtmlType == 'checkbox'){
            var attributeValue = $(this).find('input[name='+ attributeName +']').prop('checked');
            lineObj[attributeName] = attributeValue;
          }

        });
        linesObj.push(lineObj);
    });
	return linesObj;
}


ZERP.SFHL.setThisLineData = function(returnBean, thisPtr){
	for (var key in returnBean) {
		var val = returnBean[key];
		$(thisPtr).closest('tr').find('td[fieldname='+key+']').find('input[type=text], input[type=number], select, textarea').val(val);
	}
}


ZERP.SFHL.collectHeaderData = function(){
  var headerObj = {};
  $('.ZERP_HeaderEntryCt').find('.formGroup input, select, textarea').each(function(index, element){
    // element == this
    var fieldname = $(element).attr('name');
    var fieldvalue = $(element).val();
    // if(!!!fieldname) return;
    // headerObj[fieldname] = fieldvalue;
  });


  // @2019-10-12
  var entityAttributes = ZERP.System.EntityStructureObj['Attributes'];
  $.each(ZERP.System.EntityStructureObj['headerEntryFields'], function(index, attributeName) {
  	var attributeProperties = (!!entityAttributes.hasOwnProperty(attributeName)) ? entityAttributes[attributeName] : {};
    // checkbox
    if(!!attributeProperties.HtmlType && attributeProperties.HtmlType == 'checkbox'){
      var isChecked = $('.ZERP_HeaderEntryCt #' + attributeName).prop('checked');
      headerObj[attributeName] = (isChecked === true) ? '1' : '0';
    }
    // Special date format
    else if(!!attributeProperties.HtmlType && attributeProperties.HtmlType == 'dateMEF7'){
      headerObj[attributeName] = jsClient.dateFormatTranslateLocalToGlobal( $('.ZERP_HeaderEntryCt #' + attributeName).val() );
    }
    // odDropdownRefObj
    else if(!!attributeProperties.HtmlType && attributeProperties.HtmlType == 'odDropdownRefObj'){
      headerObj[attributeName] = $('.ZERP_HeaderEntryCt #' + attributeName+'_code').val();
      headerObj[attributeName+'_code'] = $('.ZERP_HeaderEntryCt #' + attributeName+'_code').val();
      headerObj[attributeName+'_desc'] = $('.ZERP_HeaderEntryCt #' + attributeName).val();

    } else {
      headerObj[attributeName] = $('.ZERP_HeaderEntryCt #' + attributeName).val();
    }


  });


  return headerObj;
}



ZERP.SFHL.saveLine = function(e, thisPtr){
	// ZERP.Utils.showProcessinOverlay();
	// ZERP.Utils.removeProcessingOverlay();

	$(thisPtr).closest('tr').removeClass('editModeTr');
	$(thisPtr).closest('tr').removeClass('dirtyLine');
	$(thisPtr).closest('tr').addClass('readModeTr');
	$(thisPtr).closest('tr').addClass('saveLine');
	ZERP.SFHL.addNewLine();
	return;

}

ZERP.SFHL.calculateSumValuesForHeaderFields = function(){
}
ZERP.SFHL.removeLineExtWrk = function(){
}
ZERP.SFHL.removeLine = function(event, thisPtr, rowDataID){
	// This will be hit directly to database
	// Decision is changed
	// ZERP.Utils.showProcessinOverlay();
	$(thisPtr).closest('tr').remove();
	// $(LIZERP.formId + ' #formLines tr[data-id="' + line + '"]').remove();
  ZERP.SFHL.removeLineExtWrk();
  ZERP.SFHL.calculateSumValuesForHeaderFields()
}

ZERP.SFHL.removeAllLines = function(){
  $('#listTable tbody').empty();
}


ZERP.SFHL.createBindFloatingButton = function(){
	// Remove floating buttons
	$('#listTable tbody').find('.div_floatingButton').remove();
	// Create and bind line floating buttons
	$tr = ZERP.SFHL.getLineBeingEdited();

	// var div_floatingButton0 = $('<div id="div_floatingButton" class="div_floatingButton" style="float:left;position:absolute;">');
  var div_floatingButton0 = $('<div id="div_floatingButton" class="div_floatingButton" style="">');
	var div_floatingButton1 = $('<div id="div_floatingButton1" style="float:left;position:absolute;top:39px;width:200px;">');
	div_floatingButton1.append('<button type="button" class="saveLine btn btn-primary" __setLine__="true" style="width:100px; height:35px;"><i class="fa fa-fw fa-check" __setLine__="true" style="font-size:x-large;"></i></button>');
	div_floatingButton1.append('&nbsp;&nbsp;');
	div_floatingButton1.append('<button type="button" class="removeLine btn btn-secondary" style="height:35px;"><i class="far fa-trash-alt" style="font-size:x-large;"></i></button>');
	div_floatingButton1.appendTo(div_floatingButton0);
	$tr.find('#div_floatingButton').remove();
	$tr.find('td:first-child').append(div_floatingButton0);

  	$tr.find('.saveLine')
    	.on('click', function(e) {
      		ZERP.SFHL.saveLine(e, this);
    	});
  	$tr.find('.removeLine')
    	.on('click', function(e) {
      		// ZERP.SFHL.removeLine($(this).closest('tr').attr('data-id'));
      		var rowDataID = $(this).closest('tr').attr('data-id');
      		ZERP.SFHL.removeLine(e, this, rowDataID);
    	});
}

ZERP.SFHL.removeFloatingButton = function(){
	// Remove floating buttons
	$('#listTable tbody').find('.div_floatingButton').remove();
}

ZERP.FrmMgr.SFHL.setTrEditMode = function(event, thisPtr, which){
	// console.log('setTrEditMode---');
	// console.log(thisPtr);
	// console.log('setTrEditMode---');

  // console.log('window.event---');
  // console.log(window.event.target);
  // console.log('window.event---');


	// if (window.event.target.hasAttribute('__setLine__')) return;
  var event = window.event || event;
  // var targ = e.target || e.srcElement;
  if(window.event){
    if (window.event.target.hasAttribute('__setLine__')) return;
  } else {
    var targ = event.target || event.srcElement;
    if (targ.hasAttribute('__setLine__')) return;
  }


	// all handling
	$('#listTable tbody').find('tr').addClass('readModeTr');
	$('#listTable tbody').find('tr').removeClass('editModeTr');
  $('#listTable tbody').find('tr').removeClass('dirtyLine');
  $('#listTable tbody').find('tr').find('td.optionTd .btnMakeEditModeThisLine').css('display', 'inline-block');

	// this handling
	$(thisPtr).closest('tr').removeClass('readModeTr');
	$(thisPtr).closest('tr').addClass('editModeTr');
  $(thisPtr).closest('tr').addClass('dirtyLine');
  ZERP.FrmMgr.SFHL.applyDynamicCSS();
  $(thisPtr).closest('tr').css('height', '95px');

  $(thisPtr).closest('tr').find('button.btnDropdownToggle').css('display', 'inline-block');

  if(which == '1'){
	 $(thisPtr).css('display', 'none');
  }
  if(which == '2'){
   $(thisPtr).closest('tr').find('td.optionTd .btnMakeEditModeThisLine').css('display', 'none');
  }

	ZERP.SFHL.removeFloatingButton();
	ZERP.SFHL.createBindFloatingButton();
  ZERP.SFHL.initLineOnDemandDataDropdownHandling();

}



// Need to work on it @al-mamun@2019-10-12
ZERP.SFHL.initLine = function(){
  $tr = ZERP.SFHL.getLineBeingEdited();
  $tr.find('input, select, textarea').attr('autocomplete', 'off');
  ZERP.initPopupLookup_lines();
}



ZERP.SFHL.getFormEditMode = function(){

  var _baseStructure = ZERP.System.EntityStructureObj;
  var formEditMode = true;
  var fatherQueryKeys = _baseStructure['fatherQueryKeys'];
  for (var i = 0; i < fatherQueryKeys.length; i++) {
    var fahterQueryKey = fatherQueryKeys[i];
    var fahterQueryVal = $('.ZERP_HeaderEntryCt' + ' #'+fahterQueryKey).val();
    if(!!!fahterQueryVal){
      formEditMode = false;
      break;
    }    
    if( !!fahterQueryVal && (fahterQueryVal == '' || fahterQueryVal == null ) ){
      formEditMode = false;
      break;
    }
  }

  return formEditMode;

}



// Need to work on it @al-mamun@2020-01-18
ZERP.SFHL.initLines = function(formEditMode = false){
  ZERP.initPopupLookup_lines();
  
  // handle onEditOnlyFields
  var formEditMode = ZERP.SFHL.getFormEditMode();
  if(formEditMode){
    var onEditOnlyFields = ZERP.System.EntityStructureObj['onEditOnlyFields'];
    for (var i = 0; i < onEditOnlyFields.length; i++) {
      var fieldname = onEditOnlyFields[i];
      $('#listTable').find('tr').find('td[fieldname='+fieldname+'] input').css('background-color','#F8F8F8');
      $('#listTable').find('tr').find('td[fieldname='+fieldname+'] input').attr('disabled', 'disabled');
      $('#listTable').find('tr').find('td[fieldname='+fieldname+'] input').attr('readonly', 'readonly');
      if($('#listTable').find('button[forAttribute='+fieldname+']').hasClass('btnDropdownToggle')){
        $('#listTable').find('button[forAttribute='+fieldname+']').css('display', 'none');
      }
    }
  }

}


ZERP.SFHL.addNewLine = function(){
	// if($('#listTable tbody tr.dirtyLine').length > 0) return;

	$('#listTable tbody').find('tr').removeClass('editModeTr');
	$('#listTable tbody').find('tr').addClass('readModeTr');

	if($('#listTable tbody tr.dirtyLine').length > 0){
		// already has new blank line for entry
	} else {	
	  var lineHTML = ZERP.SFHL.CacheNewLineHTML
	    .replace('class="editModeTr"', 'class="editModeTr dirtyLine"')
	    .replace('data-id="1"', 'data-id="' + ZERP.SFHL.NextLineNumber + '"');
		$('#listTable tbody').append(lineHTML);
		$('#listTable tbody tr.editModeTr').find('td[fieldname=lineNumber] input').val(ZERP.SFHL.NextLineNumber);
		ZERP.SFHL.NextLineNumber++;
	} 

	ZERP.SFHL.focusFirst( '#listTable tbody tr:last-child' );

	ZERP.FrmMgr.SFHL.applyStaticCSS();
	ZERP.FrmMgr.SFHL.applyDynamicCSS();
	ZERP.SFHL.removeFloatingButton();
  ZERP.SFHL.createBindFloatingButton();
  $( '#listTable tbody tr:last-child' ).css('height', '90px');
  ZERP.SFHL.initLineOnDemandDataDropdownHandling();
  ZERP.SFHL.initLine();
}


ZERP.SFHL.addNewLine_duringReadData = function(LineNumber){
	// $('#listTable tbody').find('tr').removeClass('editModeTr');
	// $('#listTable tbody').find('tr').addClass('readModeTr');

  // save dirtyLine first, then take another new line
  $tr = ZERP.SFHL.getLineBeingEdited();
  $tr.removeClass('editModeTr');
  $tr.removeClass('dirtyLine');
  $tr.addClass('readModeTr');
  $tr.addClass('saveLine');

  var lineHTML = ZERP.SFHL.CacheNewLineHTML
    .replace('class="editModeTr"', 'class="editModeTr"')
    .replace('data-id="1"', 'data-id="' + LineNumber + '"');
	$('#listTable tbody').append(lineHTML);
	$('#listTable tbody tr.editModeTr').find('td[fieldname=lineNumber] input').val(LineNumber);

	ZERP.FrmMgr.SFHL.applyStaticCSS();
	ZERP.FrmMgr.SFHL.applyDynamicCSS();
	ZERP.SFHL.removeFloatingButton();
}


ZERP.SFHL.addNewLine_byBottomPlusButtonClick = function(){
	$('#listTable tbody').find('tr').removeClass('editModeTr');
  $('#listTable tbody').find('tr').removeClass('dirtyLine');
	$('#listTable tbody').find('tr').addClass('readModeTr');

  var lineHTML = ZERP.SFHL.CacheNewLineHTML
    .replace('class="editModeTr"', 'class="editModeTr dirtyLine"')
    .replace('data-id="1"', 'data-id="' + ZERP.SFHL.NextLineNumber + '"');
	$('#listTable tbody').append(lineHTML);
	$('#listTable tbody tr.editModeTr').find('td[fieldname=lineNumber] input').val(ZERP.SFHL.NextLineNumber);
	ZERP.SFHL.NextLineNumber++;

	ZERP.SFHL.focusFirst( '#listTable tbody tr:last-child' );

	ZERP.FrmMgr.SFHL.applyStaticCSS();
	ZERP.FrmMgr.SFHL.applyDynamicCSS();
	ZERP.SFHL.removeFloatingButton();

  ZERP.SFHL.createBindFloatingButton();
  $( '#listTable tbody tr:last-child' ).css('height', '90px');
  $( '#listTable tbody tr:last-child' ).find('td.optionTd .btnMakeEditModeThisLine').css('display', 'none');
  // ZERP.FrmMgr.SFHL.applyDynamicCSS();
  ZERP.initLine();
  ZERP.initLines();
  ZERP.SFHL.initLineOnDemandDataDropdownHandling();
}



ZERP.SFHL.handleURLAutoFillData = function(){
	var params = jsClient.paramsToObj(window.location.search);
	var LDCBarcodeSL = params.LDCBarcodeSL;
	var rHeaderID = params.rHeaderID;
	if(!!LDCBarcodeSL && LDCBarcodeSL.length > 0 && rHeaderID == '__new__'){
		$('#ZERP_HeaderEntryCt #LDCBarcodeSL').val(LDCBarcodeSL);
		$('#ZERP_HeaderEntryCt #LDCBarcodeSL').blur();
	}
}



ZERP.SFHL.makeOwnHeaderEntryForm = function(){
  var urlparams = jsClient.paramsToObj(window.location.search);
  if(!!!urlparams.rHeaderID) return;
  // father ID is mandatory for create own header entry session
  // for new document it will be: rFatherID = __new__


  var _baseStructure = ZERP.System.EntityStructureObj;


    var HTML_HeaderEntrySession = '';
    var HTML_FooterEntrySession = '';

    var entityAttributes = _baseStructure['Attributes'];
    for (var attributeName in entityAttributes) {

      var thisAttributeProperties = entityAttributes[attributeName];
      if(thisAttributeProperties.hasOwnProperty('headerEntry')){

        var fielddesc = attributeName;
        fielddesc = (!!thisAttributeProperties.fielddesc) ? thisAttributeProperties.fielddesc : fielddesc;
        var defaultval = (!!thisAttributeProperties.defaultval) ? thisAttributeProperties.defaultval : '';
        var requiredSpan = '';
        if(!!thisAttributeProperties.MandatoryInUI && thisAttributeProperties.MandatoryInUI == true){
          requiredSpan = '<span class="required MInUI" style="">*</span>';
        }


        var htmlString = '';
        var UIPlacementBox1 = '', UIPlacementBox2 = '', UIPlacementBox3 = '';
        var HasBox1Item = true, HasBox2Item = false, HasBox3Item = false;

        if( !!thisAttributeProperties['AttributeType'] && thisAttributeProperties['AttributeType'] == "UIStyle"){

          if( !!thisAttributeProperties['UIStyleType'] && thisAttributeProperties['UIStyleType'] == "Begin Group Box"){
            var containerName = "fieldset_" + attributeName;
            htmlString = '<div class="clearfix"></div>';

            var GroupBox_BorderClass = (!!thisAttributeProperties.GroupBox_BorderClass) ? thisAttributeProperties.GroupBox_BorderClass : '';
            var GroupBox_BorderClassStyle = 'style="border:1px solid #dee2e6;"';
            if(GroupBox_BorderClass != "" && GroupBox_BorderClass != null){
              GroupBox_BorderClassStyle = 'class="'+GroupBox_BorderClass+'"';
            }

            htmlString += '<fieldset id="' + containerName + '" '+GroupBox_BorderClassStyle+' >'; // @2019-10-28@Mamun

            htmlString += '<legend>'+fielddesc+'</legend>';
          } else if( !!thisAttributeProperties['UIStyleType'] && thisAttributeProperties['UIStyleType'] == "End Group Box") {
            htmlString += '</fieldset>';

          } else if( !!thisAttributeProperties['UIStyleType'] && thisAttributeProperties['UIStyleType'] == "UILabelPrint") {
            var CustomClassName = thisAttributeProperties['CustomClassName'];
            if(!!thisAttributeProperties.clearfix && thisAttributeProperties.clearfix === true){
              htmlString += '<div class="clearfix"></div>';
            }
            var vIdName = '';           
            if(!!thisAttributeProperties.IdName){
              vIdName += ' id="'+thisAttributeProperties.IdName+'" ';
            }
            htmlString += '<div class="'+CustomClassName+'" '+vIdName+' >'+fielddesc+'</div>';

          } else {

            // htmlString += '<div class="row">'; // Grid systemmain added: 2019-05-06
            // htmlString += '<div class="col">'; // Grid systemmain added: 2019-05-06
            var CustomClassName = thisAttributeProperties['CustomClassName'];
            var ApplyStyle = thisAttributeProperties['ApplyStyle'];
            var CustomGridTag = '</div>';
            if(CustomClassName != '' && CustomClassName != null){
              var _ApplyStyle = ''
              if(ApplyStyle != ''){
                _ApplyStyle = 'style="'+ApplyStyle+'"';
              }
              CustomGridTag = '<div class="'+CustomClassName+'" '+_ApplyStyle+' >';
            }
            htmlString += CustomGridTag;

          }


        } else {

          var btnDropdownToggle = '';
          if(thisAttributeProperties.hasOwnProperty('RefDropdownOption') && thisAttributeProperties['RefDropdownOption'] == '1'){
            btnDropdownToggle = ZERP.Utils.HTML_button('btnDropdownOption', thisAttributeProperties, attributeName);
          }

          var btnLookup = '';
          if(thisAttributeProperties.hasOwnProperty('lookup')){
            btnLookup = ZERP.Utils.HTML_button('btnLookup', thisAttributeProperties, attributeName);
          }

          var btnReference = '';
          if(thisAttributeProperties.hasOwnProperty('Reference')){
            // btnReference = ZERP.Utils.HTML_button('btnReference', thisAttributeProperties, attributeName);
          }

          var checkboxClass = '';
          if( thisAttributeProperties.hasOwnProperty('HtmlType') ){
            if(thisAttributeProperties.HtmlType == 'checkbox'){
              checkboxClass = 'checkboxClass';
            }
          }
          

          // var inputTag = '';
          var inputTag = ZERP.Utils.genericHtmlInputFieldMaker(attributeName, defaultval, thisAttributeProperties);
          var packInputTag = '<div>'+inputTag + btnDropdownToggle + btnLookup + btnReference +'</div>';
          var label = '<label for="lbl_'+attributeName+'">'+fielddesc + requiredSpan +'</label>';

          // clear fix for new line
          if( thisAttributeProperties.hasOwnProperty('newline') ){
            htmlString += '<div class="clearfix" style="clear:both;"></div>';
          }
		      // clear fix for new line
		      if( thisAttributeProperties.hasOwnProperty('PrintAttribute') ){
		        if(thisAttributeProperties.PrintAttribute == '2'){
		          htmlString += '<div class="clearfix" style="clear:both;"></div>';
		        }
		      }


          // Row wise display attribute with decode span
          if( thisAttributeProperties.hasOwnProperty('PrintAttribute') &&  thisAttributeProperties.PrintAttribute == '5' ){
            htmlString += '<div class="clearfix" style="clear:both;"></div>';
            htmlString += '<div class="formGroup formGroup_'+attributeName+ ' ' + checkboxClass + ' rowformat">' + label + packInputTag + '<span class="SpanDecode"></span></div>';
            htmlString += '<div class="clearfix" style="clear:both;"></div>';
          } else if( thisAttributeProperties.hasOwnProperty('PrintAttribute') &&  thisAttributeProperties.PrintAttribute == '7' ){
            htmlString += '<div class="formGroup formGroup_'+attributeName+ ' ' + checkboxClass + ' rowformat7">' + label + packInputTag + '<span class="SpanDecode"></span></div>';
          } else if( thisAttributeProperties.hasOwnProperty('PrintAttribute') &&  thisAttributeProperties.PrintAttribute == '8' ){
            htmlString += '<div class="clearfix" style="clear:both;"></div>';
            htmlString += '<div class="formGroup formGroup_'+attributeName+ ' ' + checkboxClass + ' rowformat8">' + label + packInputTag + '<span class="SpanDecode"></span></div>';
            htmlString += '<div class="clearfix" style="clear:both;"></div>';
          } else if( thisAttributeProperties.hasOwnProperty('PrintAttribute') &&  thisAttributeProperties.PrintAttribute == '13' ){ // specially for checkbox
            htmlString += '<div class="clearfix" style="clear:both;"></div>';
            htmlString += '<div class="formGroup formGroup_'+attributeName+ ' ' + checkboxClass + ' rowformat8">' + packInputTag + "&nbsp;&nbsp" + label + '<span class="SpanDecode"></span></div>';
            htmlString += '<div class="clearfix" style="clear:both;"></div>';
          } else if( thisAttributeProperties.hasOwnProperty('PrintAttribute') &&  thisAttributeProperties.PrintAttribute == '25btn' ){
            htmlString += '<div class="formGroup formGroup_'+attributeName+ ' ' + checkboxClass + ' ">' + label + packInputTag + '<span class="SpanDecode"></span></div>';
          } else {
            htmlString += '<div class="formGroup formGroup_'+attributeName+ ' ' + checkboxClass + ' ">' + label + packInputTag + '<span class="SpanDecode"></span></div>';
          }



          if( thisAttributeProperties.hasOwnProperty('PrintAttribute') ){
            if(thisAttributeProperties.PrintAttribute == '3'){
              htmlString += '<div class="clearfix" style="clear:both;"></div>';
            }
          }


          // htmlString += '<div class="formGroup formGroup_'+attributeName+'">' + label + inputTag + btnLookup + btnReference + '<span class="SpanDecode"></span></div>';
          // htmlString += '<div class="formGroup formGroup_'+attributeName+'">' + label + packInputTag + '<span class="SpanDecode"></span></div>';

        }

        // add in header or footer placement
        if(thisAttributeProperties.hasOwnProperty('footer')){
          HTML_FooterEntrySession += htmlString;
        } else {
          HTML_HeaderEntrySession += htmlString;
        }


      }


    }


    $('#ZERP_HeaderEntryCt').css({
      'display': 'block',
    });
    $('#ZERP_FooterEntryCt').css({
      'display': 'block',
    });
    $('#ZERP_pgnGridPanelWrapper').css({
      'display': 'none',
    });


    $('#ZERP_HeaderEntryCt').empty().append(HTML_HeaderEntrySession);
    $('#ZERP_FooterEntryCt').empty().append(HTML_FooterEntrySession);

    $('.ZERP_HeaderEntryCt .formGroup').css({
      // 'float': 'left',
      'display': 'inline-block',
      'padding': '0 0 10px 0',
      'margin-right': '10px',
    });
    $('.ZERP_HeaderEntryCt .formGroup label').css({
      'color': '#555555',
      'font-size': '12px',
      'display': 'block',
    });
    $('.ZERP_HeaderEntryCt .formGroup').find('input[type=text],select, textarea').css({
      'font-family': 'Arial',
      'font-size': '13px',
      'padding': '2px',
      'padding-left': '3px',
      'border': '1px solid #7F7F7F',
      'border': '1px solid #E0E0E0',
      'border': '1px solid #D8D8D8',
      'border': '1px solid #D3D3D3',
      'border-radius': '3px',
    });
    $('.ZERP_HeaderEntryCt fieldset').css({
      // 'border': '1px solid #BFBFBF',
      // 'border': '1px solid #dee2e6', // @2019-10-28@Mamun // for handling border dynamically
      'padding': '10px',
      'margin': '3px 0',
      'border-radius': '5px',
    });

    // alert( $('#listTableWrapper').height() );

    var listTableWrapperHeight = $('#listTableWrapper').height();

    $('#ZERP_TbarListFromWrapper').css({
      // 'border': '1px solid #BFBFBF',
      'border': '1px solid #dee2e6',
      'min-height': (listTableWrapperHeight + 100) + 'px', 
      'margin-top': '25px',
      'margin-left': '5px',
      'margin-right': '5px',
      'border-right': 'none',
      'border-bottom': 'none',
      'position': 'relative',
      'padding-top': '10px',
      'padding-left': '5px',
      'padding-right': '5px',
      'border-radius': '3px',
    });



    ///////////////////////////////////////////////////
    var theParent = document.getElementById("ZERP_TbarListFromWrapper");

    var theKid = document.createElement("div");
    theKid.setAttribute("id", "btn_id");
    theKid.setAttribute("class", "btn_class divLineInformation");
    theKid.setAttribute("width", "250px");
    theKid.setAttribute("data-comma-delimited-array", "one,two,three,four");
    theKid.setAttribute("anything-random", document.getElementsByTagName("img").length);
    var OWN_LINE_LEGEND_TITTLE = (!!_baseStructure.OWN_LINE_LEGEND_TITTLE) ? _baseStructure.OWN_LINE_LEGEND_TITTLE : 'Lines';
    theKid.innerHTML = OWN_LINE_LEGEND_TITTLE;
    // var text = document.createTextNode("LineXX");       // Create a text node
    // theKid.appendChild(text);
    theParent.insertBefore(theKid, theParent.firstChild);

    // theKid.style.width = "50px";
    // theKid.style.height = "20px";
    // theKid.style.border = "1px solid #BFBFBF";
    theKid.style.position = "absolute";
    theKid.style.top = "-10px";
    theKid.style.left = "10px";
    theKid.style.borderRadius = "3px";
    theKid.style.background = "#FFFFFF";


  //--------------------------- Entity Caption ---------------------------------
  var element = document.getElementById('ZERP_HeaderToolbar');
  var newEelement = document.createElement('div');
  newEelement.id = 'ZERP_EntityCaption';
  newEelement.className = 'border-bottom';
  var elementParent = element.parentNode;
  elementParent.insertBefore(newEelement, element.nextSibling);

  newEelement.style.fontSize = "24px";
  // newEelement.style.borderBottom = "1px solid #000000";
  // newEelement.style.paddingBottom = "20px";
  newEelement.style.marginBottom = "10px";
  newEelement.style.fontWeight = "bold";


  var element = document.getElementById('ZERP_EntityCaption');
  var newEelement1 = document.createElement('div');
  // var EntityTittle = _baseStructure['ENTITY_TITTLE'];
  var _entityTitle = _baseStructure['_entityTitle'];
  newEelement1.innerHTML = _entityTitle;
  newEelement1.setAttribute("class", "text_left");
  newEelement1.style.float = "left";
  newEelement1.style.width = "40%";
  newEelement1.style.color = "#000000";
  newEelement1.style.fontSize = "20px";

  var newEelement2 = document.createElement('div');
  newEelement2.innerHTML = 'xxx';
  newEelement2.className   = "text-center";
  newEelement2.style.float = "left";
  newEelement2.style.width = "20%";
  newEelement2.style.color = "#000000";
  newEelement2.style.fontSize = "20px";



  var newEelement3 = document.createElement('div');
  newEelement3.className = 'text_right';
  newEelement3.style.float = "left";
  newEelement3.style.width = "40%";
  newEelement3.style.color = "#000000";
  newEelement3.style.fontSize = "20px";

  var newEelement4 = document.createElement('div');
  newEelement4.setAttribute("class", "clearfix");

  element.appendChild(newEelement1);
  element.appendChild(newEelement2);
  element.appendChild(newEelement3);
  element.appendChild(newEelement4);

  var params = jsClient.paramsToObj(window.location.search);
  var crHeaderID = params.rHeaderID;
  if(params.rHeaderID == '__new__') crHeaderID = '';
  document.getElementById('ZERP_EntityCaption').getElementsByClassName("text-center")[0].innerHTML = crHeaderID;

  var xENTITY_TITTLE = _baseStructure['_entityTitle'];
  document.getElementById('ZERP_EntityCaption').getElementsByClassName("text_left")[0].innerHTML = xENTITY_TITTLE;


  document.getElementById('ZERP_EntityTittle').style.display = 'none';
  //--------------------------------------------------------------------------
  ///////////////////////////////////////////////////


  // Initiate Scrollbar again after draw header Object
  delete ZERP.UIMgr.InitialGenericToolbarTop;
  // ZERP.UIMgr.handleGenericToolbarScroll();


}


ZERP.SFHL.addFooterActionButton = function(){
	var DOMString = '<div class="footerButtonBar d-flex">';
	DOMString += '<div style="margin-left: auto;">';
	DOMString += '<button type="button" class="btn btn-outline-primary" style="width:100px; display: inline-block; margin-right:20px;" onclick="ZERP.SFHL.saveDocument();"><i class="fa fa-fw fa-save"></i> Save</button>';
	// DOMString += '<button type="button" class="btn btn-outline-warning" style="width:100px; display:inline-block" onclick="window.location=\'main.php?rEntityName=RequisitionDocumentLst\';"><i class="fas fa-times"></i> Close</button>';
  DOMString += '<button type="button" class="btn btn-outline-warning" style="width:100px; display:inline-block" onclick="ZERP.SFHL.backToDocumentList(this);"><i class="fas fa-times"></i> Close</button>';
	DOMString += '</div>';
	DOMString += '</div>';

	$('#ZERP_FooterEntryCt').append(DOMString);
}



ZERP.SFHL.readDocument_extWrkPre = function(){
}
ZERP.SFHL.readDocument_extWrkPost = function(headerBean, extParams){
}

ZERP.SFHL.readDocument = function(rHeaderID, extParams){
  document.title = rHeaderID + ' ' + ZERP.System.EntityStructureObj['_entityName'];

	ZERP.Utils.showProcessinOverlay();
  var _baseStructure = ZERP.System.EntityStructureObj;

  var params = jsClient.paramsToObj(window.location.search);
  if(!!!params.rHeaderID) return;
  var rHeaderID = params.rHeaderID;
  if(rHeaderID.indexOf('__new__') >= 0) return;

  var rEntityName = ZERP.System.EntityStructureObj['_entityName'];

  var rHeaderID2qStr = (!!params.rHeaderID2) ? "&rHeaderID2="+params.rHeaderID2 : "";

  $.ajax({
      url: ZERP.System.rRequestApiUrl + '?rReqType=readDocument&rHeaderID='+params.rHeaderID+'&rEntityName='+rEntityName+'&rRunTime=0'+rHeaderID2qStr,
      cache: false,
  }).done(function(response) {
    var returnObj = JSON.parse(response);
    ZERP.System.EntityStructureObj = returnObj;

    var docObj = returnObj['docObj'];
    var lineBeans = docObj['lines'];
    delete docObj.lines;
    var headerBean = docObj;

    // delete form
    ZERP.SFHL.deleteFullFrom();
    // redraw form
    ZERP.SFHL.makeFullFrom();

    ZERP.SFHL.fillHeaderData(headerBean);
    ZERP.SFHL.populatedLinesData(lineBeans);
    ZERP.Utils.removeProcessingOverlay();
    ZERP.SFHL.handleHeaderToolbarButtons_formReadMode();
    ZERP.SFHL.readModeDocument();
    ZERP.SFHL.setStatusInEntityCaption();
    ZERP.SFHL.bindLineTableScrollEvent();
    ZERP.SFHL.readDocument_extWrkPost(headerBean, extParams);

    // show message: successfuly save document
    if(!!extParams && extParams == 'saveDocument'){
      jsClient.showSuccessMeaasge('Successfully save transaction');
    }
    
  }).fail(function(e) {
    ZERP.Utils.removeProcessingOverlay();
    ZERP.FrmMgr.genFrm.editMode();
    console.log(e);
    // $('#ZERP_UserAlertCt').empty().append(e.responseText);
    jsClient.renderFormError(e.responseText);
  });


}


ZERP.SFHL.deleteDocument_backToList = function(){
  var next_href = window.location.origin + window.location.pathname + '?rEntityName=RequisitionDocumentLst&FormType=req_purchase';
  window.location.href = next_href;
}

ZERP.SFHL.deleteDocument = function(){
  var r = confirm("Are you sure want to delete this document?");
  if(!r) return;

  var params = jsClient.paramsToObj(window.location.search);

  // prepare post data
  var docObj = {}
  var headerObj = ZERP.SFHL.collectHeaderData();
  for (var key in headerObj) {
    docObj[key] = headerObj[key];
  }
  var rEntityName = ZERP.System.EntityStructureObj['_entityName'];

  var postData = {
    rReqType: 'deleteDocument',
    rEntityName: rEntityName,
    rRunTime: '0',
    docObj: JSON.stringify(docObj),
  };

  
  ZERP.Utils.showProcessinOverlay();

  $.ajax({
    type: 'post',
    url: ZERP.System.rRequestApiUrl,
    data: postData,
    success: function(returnGB) {
      // ZERP.Utils.removeProcessingOverlay();
      console.log(returnGB);
      returnGB = JSON.parse(returnGB);

      if(!!returnGB.SessionExpired){
        alert('Your session has expired. \nClick OK to login again');
        window.location.href = '/user/index.php';
        // window.open('/user/index.php');
        return;
      } else if(returnGB._TransactionStatus == 'success'){

        var rHeaderID = returnGB.rHeaderID;
        // $('#myProcessinOverlay-message center').empty().append('Successfully delete document');
        $('#myProcessinOverlay-message center').empty().text('Successfully delete document');
        $('#myProcessinOverlay-message').css({
          'color':'green',
          'font-size': '25px',
          'background': 'navajowhite',
        });
        setTimeout(function() {
          // var next_href = window.location.origin + window.location.pathname + '?rEntityName=' + rEntityName + '&rHeaderID='+rHeaderID;
          // window.location.href = next_href;
          ZERP.SFHL.deleteDocument_backToList();
          ZERP.Utils.removeProcessingOverlay();
        }, 2000);




      } else {
        if (!!returnGB.errormsgs && returnGB.errormsgs.length > 0) {
          console.log(returnGB.errormsgs.join('\n'));
          alert(returnGB.errormsgs.join('\n'));
        }
      }
    }
  }).fail(function(e) {
    ZERP.Utils.removeProcessingOverlay();
    alert('Saving failed, please try again.');
  });

  return;
}



ZERP.SFHL.saveDocument_extDataProcess = function(docObj){
  return docObj;
}

ZERP.SFHL.saveDocument = function(){
	var params = jsClient.paramsToObj(window.location.search);

	// validate header
	var error = false;
	error = error || ZERP.SFHL.validateFormContainerFields('#ZERP_HeaderEntryCt');
	if(error) return;

	// validate lines
  var lineError = false
  lineError = lineError || ZERP.SFHL.validateFormLinesFields('listTable');
  if(lineError) return;

  if($('#listTable tbody tr').length == 0){
    alert("Please enter at least one line");
    jsClient.showErrorMeaasge("Please enter at least one line");
    return;
  }
 

 	// prepare post data
	var docObj = {
		'lines': [],
	}

	var headerObj = ZERP.SFHL.collectHeaderData();
	var linesObj = ZERP.SFHL.collectLinesData();

	for (var key in headerObj) {
		docObj[key] = headerObj[key];
	}
	docObj['lines'] = linesObj;
  docObj = ZERP.SFHL.saveDocument_extDataProcess(docObj);
	var rEntityName = ZERP.System.EntityStructureObj['_entityName'];

	var postData = {
		rReqType: 'saveDocument',
		rEntityName: rEntityName,
		rRunTime: '0',
		docObj: JSON.stringify(docObj),
	};

	
	ZERP.Utils.showProcessinOverlay();

	$.ajax({
		type: 'post',
		url: ZERP.System.rRequestApiUrl,
		data: postData,
		success: function(returnGB) {
			ZERP.Utils.removeProcessingOverlay();
			console.log(returnGB);
			returnGB = JSON.parse(returnGB);

			if(!!returnGB.SessionExpired){
				alert('Your session has expired. \nClick OK to login again');
				window.location.href = '/login/auth';
				return;
			} else if(returnGB._TransactionStatus == 'success'){
				var rHeaderID = returnGB.rHeaderID;
				// var next_href = window.location.origin + window.location.pathname + '?rEntityName=' + rEntityName + '&rHeaderID='+rHeaderID;
				// window.location.href = next_href;

				var params = jsClient.paramsToObj(window.location.search);
				var prvHeaderID = params.rHeaderID;
				if(prvHeaderID == '__new__'){
					params['rHeaderID'] = rHeaderID;
					var queryString = jsClient.paramsToQueryString(params);
					var currURL = window.location.pathname + '?' + queryString;
					window.history.pushState('', 'Title', currURL); 
				}
				// double entry/save validation
				if( (rHeaderID == "" || rHeaderID == null) || !returnGB.rHeaderID ){
					alert('Something is wrong, may be network slowness issue, please check list for document already created or not.');
					return;
				}


				ZERP.SFHL.readDocument(rHeaderID, 'saveDocument');

			} else if(returnGB._TransactionStatus == 'fail'){
        if(!!returnGB.errormsgs){
          if(!!returnGB.errormsgs.userErrorMsg){
            jsClient.showErrorMeaasge(returnGB.errormsgs.userErrorMsg);
          }
        }
      } else {
				if (!!returnGB.errormsgs && returnGB.errormsgs.length > 0) {
					console.log(returnGB.errormsgs.join('\n'));
					alert(returnGB.errormsgs.join('\n'));
				}
			}
		}
	}).fail(function(e) {
		ZERP.Utils.removeProcessingOverlay();
    console.log(e.responseText);
    jsClient.renderFormError(e.responseText);
    // alert('Something is wrong, may be network slowness issue, please see document list for document already created or not.');
    // alert('Saving failed, please see error message.');
    // $('#ZERP_UserAlertCt').empty().append(e.responseText);
	});

	return;
}



ZERP.SFHL.documentApprovalHandler = function(){
  var params = jsClient.paramsToObj(window.location.search);
  var rEntityName = params.rEntityName;
  var rHeaderID = params.rHeaderID;
  var FormType = $('.ZERP_HeaderEntryCt #FormType').val();
  var headerId = $('.ZERP_HeaderEntryCt #headerId').val();
  var next_href = window.location.origin + ZERP.System.contextPath + '/RequisitionApproval.php' + '?rEntityName='+rEntityName+'&FormType='+FormType+'&RequisitionNumber=' + rHeaderID+ '&id='+headerId;
  window.location.href = next_href;
}



ZERP.SFHL.makeWindowScrollableAcrToLT = function(thisPtr){
  if(typeof ZERP.SFHL.toggleWSAB === 'undefined'){
    ZERP.SFHL.toggleWSAB = true;
  }

  var _windowWidth = window.innerWidth
  || document.documentElement.clientWidth
  || document.body.clientWidth;

  if(ZERP.SFHL.toggleWSAB){
    var ltw = $('#listTable').width();
    $('body').width(ltw + 200);
    ZERP.SFHL.toggleWSAB = false;
  } else{
    $('body').width(_windowWidth);
    ZERP.SFHL.toggleWSAB = true;
  }
}

ZERP.SFHL.initWindowScrollableActionButton = function(){
  // remove
  $('body').find('#btnWSAB').remove();
  // add
  var wsab = '<button type="button" class="btn btn-outline-secondary btn-sm" id="btnWSAB" onclick="ZERP.SFHL.makeWindowScrollableAcrToLT(this);"><i class="fas fa-expand-arrows-alt"></i></button>';
  $('body').append(wsab);

  // apply css
  var _windowWidth = window.innerWidth
  || document.documentElement.clientWidth
  || document.body.clientWidth;

  var offset = $('#ZERP_TbarListFromWrapper').offset();
  var xLeft = offset.left;
  var xTop = offset.top;

  $('#btnWSAB').css({
    'position': 'absolute',
    // 'top': (xTop-128) + 'px',
    'top': (xTop-32) + 'px',
    'left': (_windowWidth-67) + 'px',
  });
}



ZERP.SFHL.deleteFullFrom = function(){
	$('#ZERPContainerID').empty();
}


ZERP.SFHL.callCustomizeFunctionsAfterDrawForm = function(){}

ZERP.SFHL.makeFullFrom = function(){
	ZERP.SFHL.deleteFullFrom(); // delete exist form first

	ZERP.buildZERPTemplate(true);
	ZERP.BaseToolbar.buildHeaderToolbar(ZERP.System.EntityStructureObj);


  var params = jsClient.paramsToObj(window.location.search);
  var rHeaderID = (!!params.rHeaderID) ? params.rHeaderID : '';


	// 0. Handle UI Layout
	ZERP.SFHL.HandleUILayout();

	// 1. Make in Line form and append : Add first line for user entry
	var LineFormStr = ZERP.SFHL.makeLineForm();
	$('#listTableWrapper').empty().append(LineFormStr);
  ZERP.SFHL.initLine();
  ZERP.SFHL.createBindFloatingButton();
  ZERP.SFHL.initLineOnDemandDataDropdownHandling();
	ZERP.SFHL.NextLineNumber++;

  // 2. Make footer summation attributes
  var footerTr = ZERP.SFHL.makeLineTabletFooter();
  $('#listTableWrapper #listTable tfoot').append(footerTr);


  var ListTableUILabel = ZERP.SFHL.makeLineFormTHLabel();
	$('#ZERP_listGridPanel_headerOffset').empty().append(ListTableUILabel);


	// Make function for making two table td width same
	ZERP.FrmMgr.SFHL.makingTableWidthAndTdWidthSame('listTable', 'listTableUILabel');
	// ZERP.SFHL.focusFirst( '#listTable tbody tr' );

	// Add new line button
	var newLineButtonStr = '<div id="bottomAddNewLineDiv" class="ml-2 mt-5" style="margin-top: 10px; margin-left:10px;"><button type="button" class="btn btn-info btn-sm" onclick="ZERP.SFHL.addNewLine_byBottomPlusButtonClick();"><i class="fa fa-fw fa-plus"></i> Add new line</button></div>';
	$('#ZERP_listGridPanel').append(newLineButtonStr);

	// 3. Make header entry data
	ZERP.SFHL.makeOwnHeaderEntryForm();
	ZERP.SFHL.fillHeaderData(ZERP.System.EntityStructureObj['HeaderBean']);
	ZERP.SFHL.initHeader(); // bind action event

  ZERP.FrmMgr.SFHL.applyStaticCSS(); // Stop using this function
  ZERP.FrmMgr.SFHL.applyDynamicCSS();
	ZERP.SFHL.bindHeaderButtonAction();
  ZERP.SFHL.callCustomizeFunctionsAfterDrawForm();
  ZERP.SFHL.initWindowScrollableActionButton();

}


ZERP.SFHL.bindLineTableScrollEvent = function(){
     // Bind line table scroll event
  $('#ZERP_listGridPanel_scroller').scroll(function(){
    var left = $(this).scrollLeft();
    $('#ZERP_listGridPanel_headerFullWidth').css('left', -left);

    // var ERP_listGridPanelScroller = $('#ZERP_listGridPanel_scroller').width();
    // var aww = ERP_listGridPanelScroller + left;
    // $('#ZERP_listGridPanel_headerFullWidth').css({
    //   // 'width': aww + 'px'
    // });
  });  
}

ZERP.SFHL.bindHeaderButtonAction = function(){

  var toolbars = ZERP.System.EntityStructureObj['toolbars'];
  

	$('#ZERP_HeaderToolbar .btnSaveDocument').off('click').on('click', function(e){
		e.preventDefault();
		if( $(this).closest('table').hasClass('x-item-disabled') ) return;
    if( toolbars.std_btnstatus.btnSaveDocument.active === false) return;
		ZERP.SFHL.saveDocument();
	});
	// $('#ZERP_FooterEntryCt .footerButtonBar .btnSaveDocument').on('click', function(e){
	// 	e.preventDefault();
	// 	ZERP.SFHL.saveDocument();
	// });
	$('#ZERP_HeaderToolbar .btnEditDocument').off('click').on('click', function(e){
		e.preventDefault();
		if( $(this).closest('table').hasClass('x-item-disabled') ) return;
    if( toolbars.std_btnstatus.btnEditDocument.active === false) return;
    if(!!ZERP.rActiveOperation) delete ZERP.rActiveOperation;
    ZERP.rActiveOperation = 'Update';
		ZERP.SFHL.handleHeaderToolbarButtons_formEditMode();
    ZERP.SFHL.editModeDocument();
	});

  $('#ZERP_HeaderToolbar .btnDeleteDocument').off('click').on('click', function(e){
    e.preventDefault();
    if( $(this).closest('table').hasClass('x-item-disabled') ) return;
    if(!!ZERP.rActiveOperation) delete ZERP.rActiveOperation;
    ZERP.rActiveOperation = 'Delete';
    ZERP.SFHL.deleteDocument();
  });

  $('#ZERP_HeaderToolbar .btnApproveDocument').off('click').on('click', function(e){
    e.preventDefault();
    if( $(this).closest('table').hasClass('x-item-disabled') ) return;
    ZERP.SFHL.documentApprovalHandler();
  });

	$('#ZERP_HeaderToolbar .btnPrint').off('click').on('click', function(e){
		e.preventDefault();
		if( $(this).closest('table').hasClass('x-item-disabled') ) return;
		// alert('Print header');
    ZERP.SFHL.printDocument();

	});
}



ZERP.SFHL.processFormExtWrkFunctions = function(){} // for override purpose

ZERP.FrmMgr.SFHL.processForm = function (formId) {
	// 0. Handle UI Layout
	// 1. Make Line row form
	// 2. In line input or textarea field will not have border
	// 3. Make header Form [ if header exist ]

	// 4. Save form
	// 5. Read form

	ZERP.SFHL.makeFullFrom();
  ZERP.SFHL.createModeDocument();
  // Fill default header data
  var GenericBean = (!!ZERP.System.EntityStructureObj['GenericBean']) ? ZERP.System.EntityStructureObj['GenericBean'] : {}
  ZERP.SFHL.fillHeaderData(GenericBean);
  // Fill default line data


	// read doucment header & Lines [note: header can be missing]
	var params = jsClient.paramsToObj(window.location.search);
	if(!!params.rHeaderID && params.rHeaderID != '__new__'){
		ZERP.SFHL.readDocument(params.rHeaderID);
	}
  if(!!params.rHeaderID && params.rHeaderID == '__new__'){
    ZERP.SFHL.handleHeaderToolbarButtons_formCreateMode();
  }


	ZERP.FrmMgr.SFHL.applyDynamicCSS();

	// 999: handle UI layout post
	ZERP.SFHL.HandleUILayout_Post();
	ZERP.SFHL.addFooterActionButton();

  // set form bottom button margin right
  var listTableWidth = $('#listTable').width();
  var ZERP_TbarListFromWrapperWidth = $('#ZERP_TbarListFromWrapper').width();
  var applyWidth = listTableWidth;
  if(listTableWidth > ZERP_TbarListFromWrapperWidth) {
    applyWidth = ZERP_TbarListFromWrapperWidth;
  }
  $('#ZERP_FooterEntryCt .footerButtonBar').css('width', (applyWidth+0) + 'px');


	// init plugins
	jsClient.initiateDateTimePicker();
	jsClient.initDateTimePicker();


	/**
	 * Bind button action ----------------------------------------------------
	 */
  $(window).keydown(function(e) {
    if (e.ctrlKey || e.metaKey) {
      switch (String.fromCharCode(e.which).toLowerCase()) {
        case 's':
          e.preventDefault();
          // $('#upperButtonBar .btnSaveForm').click();
          $('#ZERP_HeaderToolbar .btnSaveDocument').click();
          // ZERP.SFHL.saveDocument();
          break;
        case 'd':
          e.preventDefault();
          ZERP.SFHL.addNewLine_byBottomPlusButtonClick();
          break;
        case 'b':
          e.preventDefault();
          ZERP.SFHL.addNewLine_byBottomPlusButtonClick();
          break;
      }
    }
  });
	ZERP.SFHL.bindHeaderButtonAction();

  /**
   * View mode handling ----------------------------------------------------
   */
  if(!!params.viewMode && params.viewMode == '1'){
    ZERP.SFHL.readModeDocument();
  }


  // Bind line table scroll event
  ZERP.SFHL.bindLineTableScrollEvent();


  /**
   * Last method: Process Form Extended Work Functions --------------------
   */
  ZERP.SFHL.processFormExtWrkFunctions();

}
