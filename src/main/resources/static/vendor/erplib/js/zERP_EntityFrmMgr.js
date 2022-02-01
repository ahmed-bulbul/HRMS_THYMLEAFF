/**
 * Check if jQuery is loaded
 */
if (!window.jQuery) {
  var jq = document.createElement('script');
  jq.type = 'text/javascript';
  jq.src = '/js/jquery-2.1.3.min.js';
  document.getElementsByTagName('head')[0].appendChild(jq);
}

/**
 * Declare the namespace ZERP if not existent
 */
var ZERP = ZERP || {};
ZERP.FrmMgr = ZERP.FrmMgr || {};
ZERP.FrmMgr.genFrm = ZERP.FrmMgr.genFrm || {};
ZERP.FrmMgr.plnFrm = ZERP.FrmMgr.plnFrm || {};

$.extend(ZERP.FrmMgr.genFrm, {
  formId: '',
  formMode: '',
  dbAuxData: [], // extra data submitted by the API that are not fields of the DB

  // line gets dirty if user changes any field after the line is added or made editable
  lineIsDirty: false,
  valAtFocus: '',

  populateCache: [],

  _URL_LOGIN: '/user/index',
  _URL_MODULEDIR: '', // will be load

  _FIELDS_CREATEONLY: []
});

//******************************************* FIELD HANDLING


ZERP.FrmMgr.genFrm.initCustomJsFunctionsAfterUserEntryFormDraw = function(){
  return;
}



ZERP.FrmMgr.genFrm.set_getOrgOuControlParams = function(){
  // Org control params
  var organization = $('.ZERP_EntryCt #organization').val();
  var operatingUnit = $('.ZERP_EntryCt #operatingUnit').val();  
  var organization = $('.ZERP_EntryCt #organization_code').val();
  var operatingUnit = $('.ZERP_EntryCt #operatingUnit_code').val();
  ZERP.System.wrkOrganizationId = organization;
  ZERP.System.wrkOperatingUnitId = operatingUnit;
  return {
    organization: organization,
    operatingUnit: operatingUnit
  }
}



/**
 * Bind datepicker with an input field
 * @param selector
 */
ZERP.FrmMgr.genFrm.bindDatepicker = function(selector) {
  $(selector).datepicker({
    dateFormat: 'yy-mm-dd',
    changeMonth: true,
    changeYear: true,
    constrainInput: true,
    onClose: function(dateText, inst) {
      /* Validate date input; erase data if invalid */
      if (isDate(dateText, false) == false) {
        $(this).val('');
      }
    }
  });
}

/**
 * Bind datetimepicker with an input field
 * @param selector
 */
ZERP.FrmMgr.genFrm.bindDatetimepicker = function(selector) {
  $(selector).datetimepicker({
    dateFormat: 'yy-mm-dd',
    changeMonth: true,
    changeYear: true,
    constrainInput: true,
    onClose: function(dateText, inst) {
      /* Validate date input; erase data if invalid */
      if (isDate(dateText, true) == false) {
        $(this).val('');
      }
    }
  });
}

/**
 * Handle docdate field. Current browser date is auto populated.
 */
ZERP.FrmMgr.genFrm.handleEntityDateField = function() {
  /* Show current date in docdate field */
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  /* January is 0! */
  var yyyy = today.getFullYear();

  dd = dd < 10 ? ('0' + dd) : dd;
  mm = mm < 10 ? ('0' + mm) : mm;

  $(ZERP.FrmMgr.genFrm.formId + ' #docdate').val(yyyy + '-' + mm + '-' + dd);

}

/**
 * Validate form fields
 * @param container
 * @returns {boolean}
 */
ZERP.FrmMgr.genFrm.validateFormContainerFields = function(container) {
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
        // open tab if hidden
        ZERP.FrmMgr.genFrm.activeFormTab($(this).closest('div.tabcontent').attr('id'));
        $(this).closest('div.tabcontent').css('display', 'block');
        // $(this).parentsUntil(".tabcontent").css('display', 'block');
      }
    }
  });
  return error;
}

/**
 * Highlight error field for a certain period
 * @param field
 */
ZERP.FrmMgr.genFrm.hightlightErrorField = function(field) {
  field.addClass('error');
  setTimeout(function() {
    field.removeClass('error');
  }, 3000);
}

/**
 * Show form error
 * @param msg
 */
ZERP.FrmMgr.genFrm.showFormError = function(msg) {
  $(ZERP.FrmMgr.genFrm.formId + ' #formError').html(msg).show();
  setTimeout(function() {
    $(ZERP.FrmMgr.genFrm.formId + ' #formError').hide('slow').html('');
  }, 3000);
}




ZERP.FrmMgr.genFrm.fitListToFullWindow = function(){
  $('#ZERP_listGridPanel_scroller').css({
      'height' : '',
      'max-width' : '',
      'width': '',
  });

  $('#ZERP_listGridPanel_header').css({
      'width': '',
      'overflow' : '',
      'left': ''
  });


  $('#ZERP_listFormGridPanel_scroller').css({
      'min-height': '',
  });

}



//******************************************* OTHER
ZERP.FrmMgr.genFrm.wait = function(ms) {
  var deferred = $.Deferred();
  setTimeout(function() {
    deferred.resolve()
  }, ms);
  return deferred.promise();
}




ZERP.FrmMgr.genFrm.adjustListFormInterface = function(){
  if(ZERP.System.rDebugMode) console.log('Calling-ZERP.FrmMgr.genFrm.adjustListFormInterface()');
  
  /**
  * Make ratio later
  */
  var _windowWidth = window.innerWidth
  || document.documentElement.clientWidth
  || document.body.clientWidth;

  var _windowHeight = window.innerHeight
  || document.documentElement.clientHeight
  || document.body.clientHeight;

  var _screenWidth = screen.width;
  var _screenHeight = screen.height 
  // alert('screen width*height = ' + screenWidth + '*' + screenHeight);

  var _scrollPaneWidth = 32; // 45 // old // 2019-09-13

  var _myWindowWidth = _windowWidth
  var _myWindowHeight = _windowHeight


  /////////////////////////////////////
  var element = document.getElementById('ZERP_GridPanelWarrper'); 
  var rect = element.getBoundingClientRect();
  var elementLeft,elementTop; //x and y
  var scrollTop = document.documentElement.scrollTop ? document.documentElement.scrollTop:document.body.scrollTop;
  var scrollLeft = document.documentElement.scrollLeft ? document.documentElement.scrollLeft:document.body.scrollLeft;
  elementTop = rect.top+scrollTop;
  elementLeft = rect.left+scrollLeft;
  console.log('=======================');
  console.log(elementTop);
  console.log(elementLeft);
  console.log(scrollLeft);
  console.log('=======================');

  if(elementLeft > 0){
    _myWindowWidth = _myWindowWidth - elementLeft;
  }
  /////////////////////////////////////
  

  var ERP_listFormGridPanelScrollerWidth_70 = (_myWindowWidth * 70)/100;
  var ERP_listFormGridPanelScrollerWidth_30 = (_myWindowWidth * 30)/100;

  // if list table wrapper is less than given thirty percent width
  // then switch
  var listTable_width = $('#listTable').width();
  var ERP_listFormGridPanelScrollerWidth = $('#ZERP_listFormGridPanel').width();
  var ZERP_SidebarWidth = $('#sidebar').width();
  if(ZERP_SidebarWidth > 0){
    // ZERP_SidebarWidth = ZERP_SidebarWidth - 5;
    ZERP_SidebarWidth = 5 - 5;
  }
  ZERP_SidebarWidth = 0; // for Uttapal vai template


  // reset before take--- otherwise it creates toggle
  $('#ZERP_formGridPanel').css({
    'height': '',
  });
  $('#formWrapper').css({
    'height': '',
  });


  var elmntZERP_listFormGridPanel = document.getElementById("ZERP_listFormGridPanel");
  var ZERP_listFormGridPanel_offsetWidth = elmntZERP_listFormGridPanel.offsetWidth;

  var ZERP_formGridPanel_elmnt = document.getElementById("ZERP_formGridPanel");
  var ZERP_formGridPanel_offsetHeight = ZERP_formGridPanel_elmnt.offsetHeight;
  var ZERP_formGridPanel_Height = $(ZERP_formGridPanel_elmnt).height();

  var ZERP_listGridPanel_headerFullWidthHeight = $('#ZERP_listGridPanel_headerFullWidth').height();
  var ZERP_pgnGridPanelWrapperHeight = $('#ZERP_pgnGridPanelWrapper').height();




  console.log(listTable_width + '---' + ERP_listFormGridPanelScrollerWidth_30 + '---' + ERP_listFormGridPanelScrollerWidth + '---' + ZERP_listFormGridPanel_offsetWidth + '---' 
    + ZERP_formGridPanel_offsetHeight + '----' + ZERP_formGridPanel_Height);

  if(listTable_width < ERP_listFormGridPanelScrollerWidth_30){
    var new_ERP_listFormGridPanelScrollerWidth_70 = _myWindowWidth - listTable_width;

    // Change: 2019-04-08
    ERP_listFormGridPanelScrollerWidth_30 = listTable_width;
    ERP_listFormGridPanelScrollerWidth_70  = new_ERP_listFormGridPanelScrollerWidth_70;
  }


  // set child height & width
  var ERP_listGridPanelScrollerWidth = $('#ZERP_listGridPanel_scrollerFullWidth').width();
  var ERP_listGridPanelScrollerHeight = $('#ZERP_listGridPanel_scrollerFullWidth').height();
  var ERP_listTableHeight = $('#listTable').height();


  $('#ZERP_listGridPanel_scroller').css({
    'width': (ERP_listFormGridPanelScrollerWidth_30 - 2) + 'px',
    'min-width': (ERP_listFormGridPanelScrollerWidth_30 - 2) + 'px',
    'max-width': ERP_listFormGridPanelScrollerWidth_70 + 'px',
    'height': (ERP_listGridPanelScrollerHeight + 17) + 'px', // here 17 for horizontal scroller width
  });


  $('#ZERP_listGridPanel_header').css({
    'width': (ERP_listFormGridPanelScrollerWidth_30-20) + 'px',
    'overflow': 'hidden',
  });  


  $('#ZERP_formGridPanel').css({
    'width': (ERP_listFormGridPanelScrollerWidth_70 - _scrollPaneWidth + 13)+ 'px',
    'max-width': (ERP_listFormGridPanelScrollerWidth_70 - _scrollPaneWidth + 13)+ 'px',
    'margin-top': - ( 0 + 0) + 'px',
    'position': 'absolute', // place within parent div
    'top': '0px',
    'left': (ERP_listFormGridPanelScrollerWidth_30 + ZERP_SidebarWidth + 10 - 10) + 'px',
  });


  // set ZERP_listGridPanel_scroller height
  $('#ZERP_listGridPanel_scroller').css({
    'height': (ZERP_formGridPanel_Height - ZERP_listGridPanel_headerFullWidthHeight - ZERP_pgnGridPanelWrapperHeight) + 'px', // here 17 for horizontal scroller width
  });


  // Handle if its very small height
  // console.log(ZERP_formGridPanel_Height + '--QR--' + ( (_myWindowHeight/3)*2));
  if(ZERP_formGridPanel_Height < ( (_myWindowHeight/3)*2)){ // one-third
    $('#ZERP_listGridPanel_scroller').css({
      'height': (((_myWindowHeight/3)*2)-70) + 'px', // here 17 for horizontal scroller width
    });
    $('#ZERP_formGridPanel').css({
      'height': (((_myWindowHeight/3)*2)-70 + ZERP_listGridPanel_headerFullWidthHeight + ZERP_pgnGridPanelWrapperHeight) + 'px', // here 17 for horizontal scroller width
    });
    $('#formWrapper').css({
      'height': (((_myWindowHeight/3)*2)-70 + ZERP_listGridPanel_headerFullWidthHeight + ZERP_pgnGridPanelWrapperHeight) + 'px', // here 17 for horizontal scroller width
    });
  }


  // make full width window form if has settings(@Al-Mamun: 2019-09-16)
  var _showFullWidthForm = ZERP.System.EntityStructureObj['_showFullWidthForm'];
  if(!!_showFullWidthForm && _showFullWidthForm == 'true'){
    ZERP.FrmMgr.genFrm.setFullWindowForm();
  }


  /////////////// Scroll to Clecked TR ///////////////
  // var yPos = $('#ZERP_listGridPanel_scrollerFullWidth').offset().top + 200;
  // window.scrollTo(0, yPos);
  if( $('#listTable tbody tr.clicked').length > 0 ){
    var listClickedTrOffsetTop = $('#listTable tbody tr.clicked').offset().top;
    var trClickedOffset = $('#listTable tbody tr.clicked').offset().top;
    if(trClickedOffset > _myWindowHeight){
      var overHeight = trClickedOffset - _myWindowHeight;
      var netOverHeight = overHeight + 150; // 100 = tolarence
      $("#ZERP_listGridPanel_scrollerFullWidth").animate({
        scrollTop: netOverHeight
      }, 1000);
    }
  }
  /////////////// Scroll to Clecked TR ///////////////

  // @Al-Mamun @2020-01-14 @ double scroll verticle issue fix
  // if( $('#_windowWrapper').height() < $('#_windowWrapper')[0].scrollHeight ) $('#_windowWrapper').height($('#_windowWrapper')[0].scrollHeight + 1);

}


ZERP.FrmMgr.genFrm.handleSelect2Plugin = function(){
  return;
}
ZERP.FrmMgr.genFrm.handleDateTimePickerPlugin = function(){
  jsClient.initDateTimePicker();
  return;
}

ZERP.FrmMgr.genFrm.initOnDemandDataDropdownHandling = function(){
  return;
}



ZERP.FrmMgr.genFrm.removeReferenceEntityAddonButton = function(thisPtr){
  $('body').find('a.ReferenceEntityAddonActionButton').remove();
}
ZERP.FrmMgr.genFrm.renderReferenceEntityAddonButton = function(thisPtr){
  ZERP.FrmMgr.genFrm.removeReferenceEntityAddonButton();
  var attributeName = $(thisPtr).attr('name');

  var entityAttributes = ZERP.System.EntityStructureObj['Attributes'];
  if(!!entityAttributes[attributeName]){
    var thisAttributeProperties = entityAttributes[attributeName];
    if(!!thisAttributeProperties.ReferenceEntityAddonButton && thisAttributeProperties.ReferenceEntityAddonButton == true){
      var referenceEntityName = thisAttributeProperties.ReferenceEntityName;
      var addonUrlLink = (!!thisAttributeProperties.AddonUrlLink) ? thisAttributeProperties.AddonUrlLink : '';
      var AddonButtonText = (!!thisAttributeProperties.AddonButtonText) ? thisAttributeProperties.AddonButtonText : 'Add new';
      var ActionFuncName = (!!thisAttributeProperties.ActionFuncName) ? thisAttributeProperties.ActionFuncName : '';

      var openUrl = ZERP.System.contextPath + "/systemMain/main?rEntityName=" + referenceEntityName;
      var target = "_blank";
      if(ActionFuncName != ""){
        openUrl = "javascript: void(0)";
        target = "";
      } 
      if(addonUrlLink != "") openUrl = ZERP.System.contextPath + addonUrlLink;
      var htmlStr = '<a href="'+openUrl+'" target="'+target+'" class="btn btn-outline-secondary ReferenceEntityAddonActionButton" onclick="'+ActionFuncName+'" style="position:absolute; height:28px; z-index:9999; font-size: smaller;">\
        '+AddonButtonText+'\
      </a>';
      $(thisPtr).closest('div').append(htmlStr);
    }
  }
}

ZERP.FrmMgr.genFrm.initReferenceEntityAddonButton = function(){
  // Not working for odDropdownRefObj2 ---> cz click off
  var entityAttributes = ZERP.System.EntityStructureObj['Attributes'];
  for (var key in entityAttributes) {
    if (entityAttributes.hasOwnProperty(key)){
      var thisAttributeProperties = entityAttributes[key];
      if(!!thisAttributeProperties.ReferenceEntityAddonButton && thisAttributeProperties.ReferenceEntityAddonButton == true){
        if(!!thisAttributeProperties.HtmlType && thisAttributeProperties.HtmlType == "select"){
          $('.ZERP_EntryCt #' + key).addClass('select_REAddonButton');
        }
      } else {
      }
    }
  }

  $('.ZERP_EntryCt .select_REAddonButton').off('click').on('click', function(event){
    event.preventDefault();
    event.stopPropagation();
    var thisPtr = this;
    ZERP.FrmMgr.genFrm.renderReferenceEntityAddonButton(thisPtr);
  });
  return;
}




ZERP.FrmMgr.genFrm.handleSelect2Plugin = function(){
  ZERP.FrmMgr.genFrm.applySelect2Class();
}

ZERP.FrmMgr.genFrm.removeSelect2Class = function(){
  $(ZERP.FrmMgr.genFrm.formId).find('.select2').removeClass('select2');
}
ZERP.FrmMgr.genFrm.applySelect2Class = function(){
  // $(ZERP.FrmMgr.genFrm.formId).find('select').addClass('select2');
  $(ZERP.FrmMgr.genFrm.formId).find('.select2').select2();
  // $('.select2').select2();
}






ZERP.FrmMgr.genFrm.handleGenericToolbarButtons_formVisibleMode = function(){
  var _baseStructure = ZERP.System.EntityStructureObj;
  var toolbars = _baseStructure['toolbars'];  
  
  if(!!toolbars.std_btnstatus.btnNew){
    if(!!toolbars.std_btnstatus.btnNew.active){
      $('.btnNew').closest('table').addClass('x-item-disabled');
    }
  }  

  $('.btnDelete ').closest('table').removeClass('x-item-disabled');
  $('.btnEnterEditMode').closest('table').removeClass('x-item-disabled');
}

ZERP.FrmMgr.genFrm.handleGenericToolbarButtons_formHiddenMode = function(){
  var _baseStructure = ZERP.System.EntityStructureObj;
  var toolbars = _baseStructure['toolbars'];

  if(!!toolbars.std_btnstatus.btnNew){
    if(!!toolbars.std_btnstatus.btnNew.active){
      $('.btnNew').closest('table').removeClass('x-item-disabled');
    } else{
      $('.btnNew').closest('table').addClass('x-item-disabled');
    }
  } else {
    $('.btnNew').closest('table').addClass('x-item-disabled');
  }

  $('.btnDelete ').closest('table').addClass('x-item-disabled');
  $('.btnEnterEditMode').closest('table').addClass('x-item-disabled');

  $('.btnSaveForm  ').closest('table').addClass('x-item-disabled');
  $('.btnSaveAndNew ').closest('table').addClass('x-item-disabled');
  $('.btnCopyAndNew ').closest('table').addClass('x-item-disabled');
  $('.btnPrint ').closest('table').addClass('x-item-disabled');

  var params = jsClient.paramsToObj(window.location.search);
  if(!!params.rFatherSessionName){
    $('.btnBack').closest('table').removeClass('x-item-disabled');
  }


  // @al-mamun@2019-10-06  
  // check all mode for btnPrint and btnExportToExcel
  if(!!toolbars.std_btnstatus.btnPrint){
    if(!!toolbars.std_btnstatus.btnPrint.active){
      if(toolbars['std_btnstatus']['btnPrint']['btnAllMode']){
        $('.btnPrint ').closest('table').removeClass('x-item-disabled');
      }
    }
  }
    if(!!toolbars.std_btnstatus.btnExportToExcel){
    if(!!toolbars.std_btnstatus.btnExportToExcel.active){
      if(toolbars['std_btnstatus']['btnExportToExcel']['btnAllMode']){
        $('.btnExportToExcel ').closest('table').removeClass('x-item-disabled');
      }
    }
  }

  
}

ZERP.FrmMgr.genFrm.handleGenericToolbarButtons_formEditMode = function(){
  var _baseStructure = ZERP.System.EntityStructureObj;
  var toolbars = _baseStructure['toolbars'];

  if(!!toolbars.std_btnstatus.btnNew){
    if(!!toolbars.std_btnstatus.btnNew.active){
      $('.btnNew').closest('table').addClass('x-item-disabled');
    }
  }

  if(!!toolbars.std_btnstatus.btnSaveForm){
    if(!!toolbars.std_btnstatus.btnSaveForm.active){
      $('.btnSaveForm  ').closest('table').removeClass('x-item-disabled');
    }
  } else {
    $('.btnSaveForm  ').closest('table').removeClass('x-item-disabled');
  }

  if(!!toolbars.std_btnstatus.btnSaveAndNew){
    if(!!toolbars.std_btnstatus.btnSaveAndNew.active){
      $('.btnSaveAndNew  ').closest('table').removeClass('x-item-disabled');
    }
  } else {
    $('.btnSaveAndNew').closest('table').addClass('x-item-disabled');
  }

  if(!!toolbars.std_btnstatus.btnDelete){
    if(!!toolbars.std_btnstatus.btnDelete.active){
      $('.btnDelete').closest('table').addClass('x-item-disabled');
    }
  }
  
  if(!!toolbars.std_btnstatus.btnCopyAndNew){
    if(!!toolbars.std_btnstatus.btnCopyAndNew.active){
      $('.btnCopyAndNew').closest('table').addClass('x-item-disabled');
    }
  }  

  if(!!toolbars.std_btnstatus.btnPrint){
    if(!!toolbars.std_btnstatus.btnPrint.active){
      $('.btnPrint').closest('table').addClass('x-item-disabled');
    }
  }  

  if(toolbars.std_btnstatus.btnEnterEditMode.active){
    $('.btnEnterEditMode ').closest('table').addClass('x-item-disabled');
  }

  $('.frm-btnbar-bottom').css('display', 'block');
  $('.frm-btnbar-bottom').removeClass('d-none');

}


ZERP.FrmMgr.genFrm.handleGenericToolbarButtons_formReadModeExtWrk = function(){
}

ZERP.FrmMgr.genFrm.handleGenericToolbarButtons_formReadMode = function(){
  var _baseStructure = ZERP.System.EntityStructureObj;
  var toolbars = _baseStructure['toolbars'];

  // disable and hide buttons
  if(!!toolbars.std_btnstatus.btnNew){
    if(!!toolbars.std_btnstatus.btnNew.active){
      $('.btnNew  ').closest('table').addClass('x-item-disabled');
      // $('.btnNew  ').closest('table').css('display', 'none');
    }
  } else {
    $('.btnNew  ').closest('table').addClass('x-item-disabled');
    // $('.btnNew  ').closest('table').css('display', 'none');
  }

  if(!!toolbars.std_btnstatus.btnSaveForm){
    if(!!toolbars.std_btnstatus.btnSaveForm.active){
      $('.btnSaveForm  ').closest('table').addClass('x-item-disabled');
      // $('.btnSaveForm  ').closest('table').css('display', 'none');
    }
  } else {
    $('.btnSaveForm  ').closest('table').addClass('x-item-disabled');
    // $('.btnSaveForm  ').closest('table').css('display', 'none');
  }

  if(!!toolbars.std_btnstatus.btnSaveAndNew){
    if(!!toolbars.std_btnstatus.btnSaveAndNew.active){
      $('.btnSaveAndNew  ').closest('table').addClass('x-item-disabled');
      // $('.btnSaveAndNew  ').closest('table').css('display', 'none');
    }
  } else {
    $('.btnSaveAndNew  ').closest('table').addClass('x-item-disabled');
    // $('.btnSaveAndNew  ').closest('table').css('display', 'none');
  }  

  if(!!toolbars.std_btnstatus.btnEnterEditMode){
    if(!!toolbars.std_btnstatus.btnEnterEditMode.active){
      $('.btnEnterEditMode ').closest('table').removeClass('x-item-disabled');
    } else {
      $('.btnEnterEditMode ').closest('table').addClass('x-item-disabled');
    }
  } else {
    $('.btnEnterEditMode ').closest('table').addClass('x-item-disabled');
    // $('.btnEnterEditMode ').closest('table').removeClass('x-item-disabled');
  }


  if(!!toolbars.std_btnstatus.btnDelete){
    if(!!toolbars.std_btnstatus.btnDelete.active){
      $('.btnDelete ').closest('table').removeClass('x-item-disabled');
    }
  } else {
    $('.btnDelete ').closest('table').addClass('x-item-disabled');
  }

  if(!!toolbars.std_btnstatus.btnPrint){
    if(!!toolbars.std_btnstatus.btnPrint.active){
      $('.btnPrint ').closest('table').removeClass('x-item-disabled');
    }
  } else {
    $('.btnPrint ').closest('table').addClass('x-item-disabled');
  }

  if(!!toolbars.std_btnstatus.btnCopyAndNew){
    if(!!toolbars.std_btnstatus.btnCopyAndNew.active){
      $('.btnCopyAndNew ').closest('table').removeClass('x-item-disabled');
    }
  } else {
    $('.btnCopyAndNew ').closest('table').addClass('x-item-disabled');
  }


  if(!!toolbars.std_btnstatus.btnLines){
    if(!!toolbars.std_btnstatus.btnLines.active){
      $('.btnLines ').closest('table').removeClass('x-item-disabled');
    }
  }

  $('.frm-btnbar-bottom').css('display', 'none');
  $('.frm-btnbar-bottom').addClass('d-none');

  ZERP.FrmMgr.genFrm.handleGenericToolbarButtons_formReadModeExtWrk();

}


ZERP.FrmMgr.genFrm.handleGenericToolbarButtons_formNewEntryMode = function(){
  var _baseStructure = ZERP.System.EntityStructureObj;
  var toolbars = _baseStructure['toolbars'];  
  if(toolbars.std_btnstatus.btnNew.active){
    $('.btnNew').closest('table').addClass('x-item-disabled');
  }
  if(toolbars.std_btnstatus.btnSaveForm.active){
    $('.btnSaveForm  ').closest('table').removeClass('x-item-disabled');
  }
  if(toolbars.std_btnstatus.btnNew.active){
    $('.btnSaveAndNew ').closest('table').removeClass('x-item-disabled');
  }

  if(!!toolbars.std_btnstatus.btnDelete){
    if(!!toolbars.std_btnstatus.btnDelete.active){
      $('.btnDelete').closest('table').addClass('x-item-disabled');
    }
  }
  
  if(!!toolbars.std_btnstatus.btnCopyAndNew){
    if(!!toolbars.std_btnstatus.btnCopyAndNew.active){
      $('.btnCopyAndNew').closest('table').addClass('x-item-disabled');
    }
  }  

  if(!!toolbars.std_btnstatus.btnPrint){
    if(!!toolbars.std_btnstatus.btnPrint.active){
      $('.btnPrint').closest('table').addClass('x-item-disabled');
    }
  }

  if(!!toolbars.std_btnstatus.btnEnterEditMode){
    if(!!toolbars.std_btnstatus.btnEnterEditMode.active){
      $('.btnEnterEditMode ').closest('table').addClass('x-item-disabled');
    }
  }  
  
  $('.frm-btnbar-bottom').css('display', 'block');
  $('.frm-btnbar-bottom').removeClass('d-none');

}



ZERP.FrmMgr.genFrm.showFormInterface = function(){
  $('#ZERP_formGridPanel').css({
    'display':'block',
    'floal': 'left',
  });
  ZERP.FrmMgr.genFrm.adjustListFormInterface();
  // ZERP.FrmMgr.genFrm.listFormResizeGhostBar();
  // ZERP.FrmMgr.genFrm.handleGenericToolbarButtons_formVisibleMode();
}




ZERP.FrmMgr.genFrm.hideFormInterface = function(){
  if($('#ZERP_formGridPanel').length > 0){
    $('#ZERP_formGridPanel').css({
      'display':'none',
    });
    ZERP.FrmMgr.genFrm.listMode();
    ZERP.FrmMgr.genFrm.fitListToFullWindow();
    ZERP.FrmMgr.genFrm.handleGenericToolbarButtons_formHiddenMode();
  }
}


ZERP.FrmMgr.genFrm.setDefaultFieldValue = function(){
  ZERP.FrmMgr.genFrm.handleEntityDateField();

  var params = jsClient.paramsToObj(window.location.search);
  if( !!params.rQueryFromFather && params.rQueryFromFather == '1'){
    var _baseStructure = ZERP.System.EntityStructureObj;
    var fatherQueryKeys = _baseStructure.fatherQueryKeys;
    for (var i = 0; i < fatherQueryKeys.length; i++) {
      var fatherQueryKey = fatherQueryKeys[i];
      $(ZERP.FrmMgr.genFrm.formId + '#'+fatherQueryKey).val(params[fatherQueryKey]);
    }
  }

}


ZERP.FrmMgr.genFrm.closeUserEntryForm = function(){

  ZERP.FrmMgr.genFrm.dirtyDataForm = false;
  if($('#ZERP_formGridPanel').length > 0){
    $('#ZERP_formGridPanel').css({
      'display':'none',
    });
    ZERP.FrmMgr.genFrm.listMode();
    ZERP.FrmMgr.genFrm.fitListToFullWindow();
    ZERP.FrmMgr.genFrm.handleGenericToolbarButtons_formHiddenMode();
    ZERP.Utils.showHideCustomToolbar();
  }

  ZERP.UIMgr.handleUI_FormMgrCloseObject();
  
}



ZERP.FrmMgr.genFrm.getAllGridPanel_HeightWidth = function(){

  var ERP_listGridPanelScrollerWidth = $('#ZERP_listGridPanel_scrollerFullWidth').width();
  var ERP_listGridPanelScrollerHeight = $('#ZERP_listGridPanel_scrollerFullWidth').height();
  var ERP_listTableHeight = $('#listTable').height();

  var ERP_listGridPanelHeaderHeight = $('#ZERP_listGridPanel_headerFullWidth').height();
  var ZERP_GenericToolbarHeight = $('#ZERP_GenericToolbar').height();
  var ERP_pgnGridPanelHeight = $('#ERP_pgnGridPanel').height();

}


ZERP.FrmMgr.genFrm.setFullWindowForm = function(){
  $('#btnSetFullWindowForm').css({
    'display' : 'none',
  });
  $('#btnSetAdjustWindowForm').css({
    'display' : 'inline-block',
  });

  var ZERP_listFormGridPanel_scrollerWidth = $('#ZERP_listFormGridPanel_scroller').width();

  $('#ZERP_formGridPanel').css({
    'left': '0px',
    'width': (ZERP_listFormGridPanel_scrollerWidth + 0) + 'px',
    'max-width': (ZERP_listFormGridPanel_scrollerWidth + 0) + 'px',
  });

  // ZERP.UIMgr.handleUI_FormMgrCloseObject();
  
}

ZERP.FrmMgr.genFrm.setAdjustWindowForm = function(){
  if(ZERP.System.rDebugMode) console.log('Calling-ZERP.FrmMgr.genFrm.setAdjustWindowForm()');

  $('#btnSetFullWindowForm').css({
    'display' : 'inline-block',
  });
  $('#btnSetAdjustWindowForm').css({
    'display' : 'none',
  });
  
  var _windowWidth = window.innerWidth
  || document.documentElement.clientWidth
  || document.body.clientWidth;

  var _windowHeight = window.innerHeight
  || document.documentElement.clientHeight
  || document.body.clientHeight;

  var _screenWidth = screen.width;
  var _screenHeight = screen.height 
  // alert('screen width*height = ' + screenWidth + '*' + screenHeight);

  var _scrollPaneWidth = 32; // 45 // old // 2019-09-13;

  var _myWindowWidth = _windowWidth
  var _myWindowHeight = _windowHeight


  /////////////////////////////////////
  var element = document.getElementById('ZERP_GridPanelWarrper'); 
  var rect = element.getBoundingClientRect();
  var elementLeft,elementTop; //x and y
  var scrollTop = document.documentElement.scrollTop ? document.documentElement.scrollTop:document.body.scrollTop;
  var scrollLeft = document.documentElement.scrollLeft ? document.documentElement.scrollLeft:document.body.scrollLeft;
  elementTop = rect.top+scrollTop;
  elementLeft = rect.left+scrollLeft;
  console.log('=======================');
  console.log(elementTop);
  console.log(elementLeft);
  console.log(scrollLeft);
  console.log('=======================');

  if(elementLeft > 0){
    _myWindowWidth = _myWindowWidth - elementLeft;
  }
  /////////////////////////////////////
  

  var ERP_listFormGridPanelScrollerWidth_70 = (_myWindowWidth * 70)/100;
  var ERP_listFormGridPanelScrollerWidth_30 = (_myWindowWidth * 30)/100;

  // if list table wrapper is less than given thirty percent width
  // then switch
  $('#ZERP_listGridPanel_scroller').css({
    'width': (ERP_listFormGridPanelScrollerWidth_30 - 0) + 'px',
    'min-width': (ERP_listFormGridPanelScrollerWidth_30 - 0) + 'px',
    'max-width': ERP_listFormGridPanelScrollerWidth_70 + 'px',
  });


  $('#ZERP_formGridPanel').css({
    'width': (ERP_listFormGridPanelScrollerWidth_70 - _scrollPaneWidth)+ 'px',
    'max-width': (ERP_listFormGridPanelScrollerWidth_70 - _scrollPaneWidth)+ 'px',
    'margin-top': - ( 0 + 0) + 'px',
    'position': 'absolute', // place within parent div
    // 'left': (ERP_listFormGridPanelScrollerWidth_30 + 23 - 10) + 'px',
    'left': (ERP_listFormGridPanelScrollerWidth_30 + 22 - 10) + 'px',
  });

  // ZERP.UIMgr.handleUI_FormMgrCloseObject();
  
}



ZERP.FrmMgr.genFrm.hideAllTab = function(){
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
}

ZERP.FrmMgr.genFrm.openTab = function(thisElmnt){
  // set initial form height for all tabl
  $('#formWrapper').css('height', $('#ZERP_formGridPanel').height()+'px');


  var tabID = $(thisElmnt).attr('tabID');
  ZERP.System.rActiveFormTab = tabID;

  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.color = "gray";
  }
  document.getElementById(tabID).style.display = "block";
  thisElmnt.style.color = "#007bff";

}

ZERP.FrmMgr.genFrm.activeFormTab = function(activeFormTabID){
  if(!!!activeFormTabID) return;

  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.color = "gray";
  }
  document.getElementById(activeFormTabID).style.display = "block";
  // document.getElementById(activeFormTabID).style.color = "#007bff";
  // $('tabButtons button[tabID='+activeFormTabID+']').css({'color': '#007bff'});
  $(ZERP.FrmMgr.genFrm.formId).find('div.tabButtons').find('[tabID='+activeFormTabID+']').css({'color': '#007bff'});

}


ZERP.FrmMgr.genFrm.formBottomButton = function(){

  var formBottomButton = '\
  <div class="clearfix" style="clear:both;"></div>\
  <div class="frm-btnbar-bottom d-none">\
    <button type="button" class="btn btn-outline-primary btn-sm btnSaveForm btnEditMode" onclick="ZERP.FrmMgr.genFrm.saveForm();"><i class="fa fa-fw fa-check"></i> Save</button>\
    <button type="button" class="btn btn-outline-secondary btn-sm btnSaveForm btnEditMode" onclick="ZERP.FrmMgr.genFrm.saveAndNewForm();">Save & New</button>\
    <button type="button" class="btn btn-outline-warning btn-sm btnEditMode" onclick="ZERP.FrmMgr.genFrm.closeUserEntryForm();"><i class="fas fa-times"></i> Cancel</button>\
  </div>\
  ';

  return formBottomButton;
}


/**
 * [makeUserEntryForm description]
 * @return {[type]} [description]
 */
ZERP.FrmMgr.genFrm.makeUserEntryForm = function(){
  // this function will make new user entry form
  // or modify or replace exist form
  
  var EntityAttributes = ZERP.System.EntityStructureObj['Attributes'];
  if(!!ZERP.System.EntityStructureObj['ObjectStructure']) EntityAttributes = ZERP.System.EntityStructureObj['ObjectStructure'];

  var HTML_EntryForm = '';

  var ExtraDOMString = '\
  <form action="#" method="post" id="formERP" autocomplete="off">\
  <div id="formCaption" style="display:none;">\
    <div class="w40">Sales Order List</div>\
    <div class="w20 text_center"></div>\
    <div class="w40 text_right"></div>\
    <div class="clearfix"></div>\
  </div>\
  <div id="formUpperButton">\
    <div style="text-align: left; float:left; margin-left: -5px;">\
      <button type="button" id="btnSetFullWindowForm" class=" btnCancelForm" title="Close this form" style="display:inline-block;" onclick="ZERP.FrmMgr.genFrm.setFullWindowForm();"><i class="fa fa-fw fa-backward"></i></button>\
      <button type="button" id="btnSetAdjustWindowForm" class=" btnCancelForm" title="Close this form" style="display:none;" onclick="ZERP.FrmMgr.genFrm.setAdjustWindowForm();"><i class="fa fa-fw fa-forward"></i></button>\
    </div>\
    <div style="text-align: right; margin-right: -5px; margin-top:-5px;">\
      <button type="button" class="btnAllMode btnCancelForm" title="Close this form" style="display:inline-block;" onclick="ZERP.FrmMgr.genFrm.closeUserEntryForm();"><i class="fas fa-times"></i></button>\
    </div>\
  </div>\
  <div id="formError"></div>\
  <div class="clearfix"></div>\
  ';

  HTML_EntryForm += ExtraDOMString;

  var formTabButtons = '';
  var htmlString = '';

  for (var attributeName in EntityAttributes) {

    var thisAttributeProperties = EntityAttributes[attributeName];
    var defaultval = (!!thisAttributeProperties['defaultval']) ? thisAttributeProperties['defaultval'] : '';
    var htmltype = (!!thisAttributeProperties['defaultval']) ? thisAttributeProperties['htmltype'] : '';

    if(thisAttributeProperties.hasOwnProperty('ShowOnLineObject') && thisAttributeProperties.ShowOnLineObject == false ) continue;

    var fielddesc = attributeName;
    fielddesc = (!!thisAttributeProperties.fielddesc) ? thisAttributeProperties.fielddesc : fielddesc;
    ObjLabel = (!!thisAttributeProperties.ObjLabel) ? thisAttributeProperties.ObjLabel : '';
    fielddesc = (ObjLabel != '' && ObjLabel != null) ? ObjLabel : fielddesc;
    var CustomClassName = (!!thisAttributeProperties.CustomClassName) ? thisAttributeProperties.CustomClassName : '';

    if( !!thisAttributeProperties['AttributeType'] && thisAttributeProperties['AttributeType'] == "UIStyle"){

      if( !!thisAttributeProperties['UIStyleType'] && thisAttributeProperties['UIStyleType'] == "Begin Group Box"){
        var containerName = "fieldset_" + attributeName;
        htmlString += '<div class="clearfix"></div>';
        htmlString += '<fieldset id=' + containerName + '>';
        htmlString += '<legend>'+fielddesc+'</legend>';

      } else if( !!thisAttributeProperties['UIStyleType'] && thisAttributeProperties['UIStyleType'] == "End Group Box") {
        htmlString += '</fieldset>';

      } else if( !!thisAttributeProperties['UIStyleType'] && thisAttributeProperties['UIStyleType'] == "Begin Tab") {

        var Active = (!!thisAttributeProperties.Active) ? thisAttributeProperties.Active : false;
        var ActiveClass = '';
        var TabContainerStyle = ' display:none; ';
        if(Active == true){
          ActiveClass = 'active';
          TabContainerStyle = '';
        }

        var tabID = "Tab_" + attributeName;
        htmlString += '<div id=' + tabID + ' class="tabcontent '+CustomClassName+'" style=" '+TabContainerStyle+' " >';

        formTabButtons += '<button type="button" class="tablink '+ActiveClass+'" tabID="'+tabID+'" onclick="ZERP.FrmMgr.genFrm.openTab(this)">'+fielddesc+'</button>';

      } else if( !!thisAttributeProperties['UIStyleType'] && thisAttributeProperties['UIStyleType'] == "End Tab") {
        htmlString += '</div>';

      } else if( !!thisAttributeProperties['UIStyleType'] && thisAttributeProperties['UIStyleType'] == "UILabelPrint") {
          var CustomClassName = thisAttributeProperties['CustomClassName'];
          var ApplyStyle = thisAttributeProperties['ApplyStyle'];
          var messageText = (!!thisAttributeProperties['messageText']) ? thisAttributeProperties['messageText'] : fielddesc;
          var _ApplyStyle = ''
          if(ApplyStyle != ''){
            _ApplyStyle = 'style="'+ApplyStyle+'"';
          }
          if(!!thisAttributeProperties.clearfix && thisAttributeProperties.clearfix === true){
            htmlString += '<div class="clearfix"></div>';
          }
          var vIdName = '';           
          if(!!thisAttributeProperties.IdName){
            vIdName += ' id="'+thisAttributeProperties.IdName+'" ';
          }
          htmlString += '<div class="'+CustomClassName+'" '+vIdName+' '+_ApplyStyle+' >'+messageText+'</div>';

      } else {

        var CustomClassName = thisAttributeProperties['CustomClassName'];
        var CustomGridTag = '</div>';
        if(CustomClassName != '' && CustomClassName != null){
          CustomGridTag = '<div class="'+CustomClassName+'">';
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
        // not adding plus button@Al-Mamun@2019-09-28
        // do implement next: ReferenceAttributeDetails // by plus button
        // do implement next: ReferenceEntityOpen // by plus button
        // btnReference = ZERP.Utils.HTML_button('btnReference', thisAttributeProperties, attributeName);
      }

      var checkboxClass = '';
      if( thisAttributeProperties.hasOwnProperty('htmltype') ){
        if(thisAttributeProperties.HtmlType == 'checkbox'){
          checkboxClass = 'checkboxClass';
        }
      }

      var inputTag = ZERP.Utils.genericHtmlInputFieldMaker(attributeName, defaultval, thisAttributeProperties);
      var packInputTag = '<div>'+inputTag + btnDropdownToggle + btnLookup + btnReference +'</div>';

      var label = '<label for="lbl_'+attributeName+'">'+fielddesc+'</label>';
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
      } else if( thisAttributeProperties.hasOwnProperty('PrintAttribute') &&  thisAttributeProperties.PrintAttribute == '9' ){
          htmlString += '<div class="formGroup formGroup_'+attributeName+ ' ' + checkboxClass + ' rowformat">' + label + packInputTag + '<span class="SpanDecode"></span></div>';
      } else if( thisAttributeProperties.hasOwnProperty('PrintAttribute') &&  thisAttributeProperties.PrintAttribute == '11' ){
        htmlString += '<div class="clearfix" style="clear:both;"></div>';
        htmlString += '<div class="formGroup formGroup_'+attributeName+ ' ' + checkboxClass + ' rowformat">' + label + packInputTag + '<span class="SpanDecode"></span></div>';
      } else {
        htmlString += '<div class="formGroup formGroup_'+attributeName+ ' ' + checkboxClass + ' ">' + label + packInputTag + '<span class="SpanDecode"></span></div>';
      }



      if( thisAttributeProperties.hasOwnProperty('PrintAttribute') ){
        if(thisAttributeProperties.PrintAttribute == '3'){
          htmlString += '<div class="clearfix" style="clear:both;"></div>';
        }
      }

    }


  }

  // console.log(htmlString);
  if(formTabButtons.length > 0){
    formTabButtons = '<div class="tabButtons">' + formTabButtons + '</div>';
  }

  var formBottomButton = ZERP.FrmMgr.genFrm.formBottomButton();
  

  HTML_EntryForm += formTabButtons;
  HTML_EntryForm += htmlString;
  HTML_EntryForm += formBottomButton;
  HTML_EntryForm += '</form>';
  $('#ZERP_mainContainer #formWrapper').empty().append(HTML_EntryForm);

  // Call user customization function/giving facility to customize
  ZERP.FrmMgr.genFrm.initCustomJsFunctionsAfterUserEntryFormDraw();
}



ZERP.FrmMgr.genFrm.newForm = function(){
  if(ZERP.System.rDebugMode) console.log('Calling-ZERP.FrmMgr.genFrm.newForm()');

  var _showEntityForm = (!!ZERP.System.EntityStructureObj['_showEntityForm']) ? ZERP.System.EntityStructureObj['_showEntityForm'] : 'yes'; // default yes
  if(_showEntityForm == 'no') return;

	ZERP.rActiveOperation = 'Create';
	// ZERP.FrmMgr.genFrm.isCopy = false;

  ZERP.FrmMgr.genFrm.showFormInterface();
  ZERP.FrmMgr.genFrm.makeUserEntryForm();
  ZERP.FrmMgr.genFrm.adjustListFormInterface();
  ZERP.FrmMgr.genFrm.editMode();
  ZERP.FrmMgr.genFrm.setDefaultFieldValue();

  ZERP.FrmMgr.genFrm.initForm('create');
  ZERP.FrmMgr.genFrm.handleGenericToolbarButtons_formNewEntryMode();

  // fill default generic bean data after from drow if have @Al-Mamun@2019-11-22
  if( !!ZERP.System.EntityStructureObj['DefaultValuesBean'] ){
    ZERP.FrmMgr.genFrm.fillForm(ZERP.System.EntityStructureObj['DefaultValuesBean']);
  }

  // ZERP.UIMgr.removeZERPmainContainerScrollable();
  // 2019-04-12 Fix adjustment height issue 1 sec later
  setTimeout(function() {
    ZERP.FrmMgr.genFrm.adjustListFormInterface();
  }, 500);

}



ZERP.FrmMgr.genFrm.copyAndNewModeForm = function(){
  ZERP.rActiveOperation = 'Create';
  ZERP.FrmMgr.genFrm.isCopy = true;
  ZERP.FrmMgr.genFrm.callToServer('copy');
  // ZERP.FrmMgr.genFrm.initForm('create', 'copy');
  ZERP.FrmMgr.genFrm.handleGenericToolbarButtons_formNewEntryMode();
}


ZERP.FrmMgr.genFrm.initCustomJsFunctions = function(){
  return;
}


ZERP.FrmMgr.genFrm.handleLookup  = function(thisBtnPtr){
  var lookupSession = $(thisBtnPtr).attr('lookupsession');
  // var rSessionAPI = rSessionName + '_api.php';
  var rSessionAPI = "/" + lookupSession + '_api.php';

  $.ajax({
      url: rSessionAPI + '?rReqType=getEntityStructure',
      cache: false,
  }).done(function(response) {
      ERPLIST._baseStructure = response;
      ERPLIST._URL_API = rSessionAPI;
      ZERP.FrmMgr.genFrm.handlePopupListSession(rSessionAPI);
  });

}





ZERP.FrmMgr.genFrm.makeOwnHeaderEntryForm = function(){}



ZERP.FrmMgr.genFrm.setStatusInEntityCaption = function(){
  return;
}

ZERP.FrmMgr.genFrm.readOwnHeaderEntryData = function(){}

ZERP.FrmMgr.genFrm.callCustomFunctinsAfterFillOwnHeaderData = function(headerEntryData){
 return; 
}

ZERP.FrmMgr.genFrm.initCustomJsFunctionsAfterHeaderEntryFieldsDraw = function(){
 return; 
}


ZERP.FrmMgr.genFrm.exportToExcel = function(){
  var searchParams = {};
  $('table#listTableSearchForm thead tr#searchForm').each(function() {
    $(this).find("td input:text, input:hidden,select").each(function() {
    // $(this).find("td input:text,select").each(function() {
      var textVal   = this.value.trim();
      var inputName = $(this).attr("name");
      var tagName   = $(this).prop("tagName");

      // if inputName is undefined then assume its combobox 
      if(inputName == undefined) return;
      // try to retrive name by closest select tag
      if(!!ListMgr.libraryColumns[inputName]){
          if(textVal == '______'){ // define for empty
            textVal = "";
          }
      }
      if(textVal != ""){
        searchParams[inputName] = textVal;
      }            
    });
  });
// return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
  var qrystr = $.param( searchParams );
  var rEntityName = ZERP.System.EntityStructureObj['_entityName'];
  var expURL = ZERP.FrmMgr.genFrm.ENTITY_API_URL + '?rReqType=exportListData&rRunTime=1&rEntityName=' + rEntityName + '&' + qrystr;
  var params = jsClient.paramsToObj(window.location.search);
  var expURL = ZERP.System.rRequestApiUrl + '?rReqType=exportListData&rEntityName=' + rEntityName + '&' + qrystr;
  if(!!params.rRunTime && params.rRunTime == '1'){
  	expURL = ZERP.System.rRequestApiUrl + '?rReqType=exportListData&rRunTime=1&rEntityName=' + rEntityName + '&' + qrystr;
  }

  var _exportURLPathString = (!!ZERP.System.EntityStructureObj['_exportURLPathString']) ? ZERP.System.EntityStructureObj['_exportURLPathString'] : '';
  var exportURLPathString = ZERP.System.contextPath + '' + _exportURLPathString;
  ZERP.FrmMgr.genFrm.customExportToExcelLink(exportURLPathString);

  window.open(expURL);

}

ZERP.FrmMgr.genFrm.customExportToExcelLink = function(printURL) {
  // var myWindow = window.open(printURL, "", "width=250, height=250");  myWindow.resizeTo(800, 600);

  var params = jsClient.paramsToObj(window.location.search);
  var queryString = jsClient.paramsToQueryString(params);
  // printURL = printURL + "&" + queryString;
  printURL = printURL + "?" + queryString;
  console.log(printURL);
  var myWindow = window.open(printURL, '_blank');
  // myWindow.resizeTo(800, 600);
  // myWindow.focus();
}

ZERP.FrmMgr.genFrm.customPrintOutLink = function(printURL) {
  // var myWindow = window.open(printURL, "", "width=250, height=250");  myWindow.resizeTo(800, 600);

  var params = jsClient.paramsToObj(window.location.search);
  var queryString = jsClient.paramsToQueryString(params);
  printURL = printURL + "&" + queryString;
  console.log(printURL);
  var myWindow = window.open(printURL, '_blank');
  // myWindow.resizeTo(800, 600);
  // myWindow.focus();
}


//************************************************** Handle Generic Toolbar Buttons
ZERP.FrmMgr.genFrm.handleHeaderToolbarButtons_formReadMode = function(){
  var _baseStructure = ZERP.System.EntityStructureObj;
  var toolbars = _baseStructure['toolbars'];


  //1. disable and hide buttons
  if(!!toolbars.std_btnstatus.btnHeaderSave){
    if(!!toolbars.std_btnstatus.btnHeaderSave.active){
      $('.btnHeaderSave ').closest('table').addClass('x-item-disabled');
    }
  } else {
    $('.btnHeaderSave ').closest('table').addClass('x-item-disabled');
  }


  //2. enable and show buttons
  if(!!toolbars.std_btnstatus.btnHeaderEdit){
    if(!!toolbars.std_btnstatus.btnHeaderEdit.active){
      $('.btnHeaderEdit  ').closest('table').removeClass('x-item-disabled');
    }
  } else {
    $('.btnHeaderEdit  ').closest('table').removeClass('x-item-disabled');
  }

  if(!!toolbars.std_btnstatus.btnHeaderPrint){
    if(!!toolbars.std_btnstatus.btnHeaderPrint.active){
      $('.btnHeaderPrint ').closest('table').removeClass('x-item-disabled');
    }
  } else {
    $('.btnHeaderPrint ').closest('table').removeClass('x-item-disabled');
  }


}

ZERP.FrmMgr.genFrm.handleHeaderToolbarButtons_formCreateMode = function(){
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

  if(!!toolbars.std_btnstatus.btnHeaderPrint){
    if(!!toolbars.std_btnstatus.btnHeaderPrint.active){
      $('.btnHeaderPrint ').closest('table').addClass('x-item-disabled');
    }
  } else {
    $('.btnHeaderPrint ').closest('table').addClass('x-item-disabled');
  }
  
  //2. enable and show buttons
  if(!!toolbars.std_btnstatus.btnHeaderSave){
    if(!!toolbars.std_btnstatus.btnHeaderSave.active){
      $('.btnHeaderSave ').closest('table').removeClass('x-item-disabled');
    }
  } else {
    $('.btnHeaderSave ').closest('table').removeClass('x-item-disabled');
  }


}

ZERP.FrmMgr.genFrm.handleHeaderToolbarButtons_formEditMode = function(){
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
  
  //2. enable and show buttons
  if(!!toolbars.std_btnstatus.btnHeaderSave){
    if(!!toolbars.std_btnstatus.btnHeaderSave.active){
      $('.btnHeaderSave ').closest('table').removeClass('x-item-disabled');
    }
  } else {
    $('.btnHeaderSave ').closest('table').removeClass('x-item-disabled');
  }

  if(!!toolbars.std_btnstatus.btnHeaderPrint){
    if(!!toolbars.std_btnstatus.btnHeaderPrint.active){
      $('.btnHeaderPrint ').closest('table').removeClass('x-item-disabled');
    }
  } else {
    $('.btnHeaderPrint ').closest('table').removeClass('x-item-disabled');
  }


}


//******************************************* MODE HANDLING
ZERP.FrmMgr.genFrm.listMode = function(){
  // all buttons need to show
  $('.btnNew').css('display', 'inline-block');
  $('.btnlistMode').css('display', 'inline-block');
}

ZERP.FrmMgr.genFrm.readMode = function() {
  $('.btnReadMode ').css('display', 'inline-block');
  $('.btnAllMode ').css('display', 'inline-block');
  $('.btnBootStrap').css('display', 'inline-flex');
  $('.datepicker').unmousewheel();

  $('#ZERP_GenericToolbar .btnEditMode').attr('disabled', true);
  
  $(ZERP.FrmMgr.genFrm.formId).find(' #formLines tr').unbind('mouseenter mouseleave');
  $(ZERP.FrmMgr.genFrm.formId).find('input,select,textarea').attr('disabled', 'disabled');
  $(ZERP.FrmMgr.genFrm.formId).find(' input[type=button]').removeAttr('disabled');

  if( $('#formWrapper').is(":visible") ){
    $('#formExpnCloseTbar .btnCancelForm').css('display', 'inline-block');
  }

  $('.ZERP_EntryCt .btnDropdownToggle').css('display', 'none');

  ZERP.FrmMgr.genFrm.formMode = 'read';
}


ZERP.FrmMgr.genFrm.editMode = function() {
  $(ZERP.FrmMgr.genFrm.formId).find('input,select,textarea').removeAttr('disabled');
  // $('#fieldset_systeminformation').css('display', 'none');
  ZERP.FrmMgr.genFrm.formMode = 'edit';
  $('#ZERP_GenericToolbar .btnEditMode').removeAttr('disabled');

  $('.ZERP_EntryCt .btnDropdownToggle').css('display', 'inline-block');
}






//******************************************* INIT FORM HANDLING (After calling form mode) START ******************************
ZERP.FrmMgr.genFrm.initForm = function(formMode, extra){
  if(ZERP.System.rDebugMode) console.log('Calling-ZERP.FrmMgr.genFrm.initForm-Params: formMode-' + formMode);

  var _baseStructure = ZERP.System.EntityStructureObj;
  var params = jsClient.paramsToObj(window.location.search);

  var fatherQueryKeys = _baseStructure['fatherQueryKeys'];  
  if(fatherQueryKeys.length > 0){
    for (var i = 0; i < fatherQueryKeys.length; i++) {
      var fieldname = fatherQueryKeys[i];
      // Note: if it's comming through parent Entity, otherwise user will select parent as wish
      if(!!params.rQueryFromFather && params.rQueryFromFather == '1'){
        $(ZERP.FrmMgr.genFrm.formId).find('#'+fieldname).attr('disabled', 'disabled');
        if($('.ZERP_EntryCt').find('button[forAttribute='+fieldname+']').hasClass('btnDropdownToggle')){
          $('.ZERP_EntryCt').find('button[forAttribute='+fieldname+']').css('display', 'none');
        }
      }
    }
  }

  if(!!ZERP.rActiveOperation && ZERP.rActiveOperation == 'Update'){
    var entityKeys = _baseStructure['entityKeys'];  
    if(entityKeys.length > 0){
      for (var i = 0; i < entityKeys.length; i++) {
        var fieldname = entityKeys[i];
        $(ZERP.FrmMgr.genFrm.formId).find('#'+fieldname).attr('disabled', 'disabled');
      }
    }
  }


  var mandatoryFields = _baseStructure['mandatoryInUIFields'];  
  if(mandatoryFields.length > 0){
    for (var i = 0; i < mandatoryFields.length; i++) {
      var fieldname = mandatoryFields[i];
      $(ZERP.FrmMgr.genFrm.formId + ' #' + fieldname).attr('required', 'required');
      $(ZERP.FrmMgr.genFrm.formId + ' #' + fieldname).closest('div.formGroup').find('label').find('span.required').remove();
      $(ZERP.FrmMgr.genFrm.formId + ' #' + fieldname).closest('div.formGroup').find('label').not('#'+fieldname).append('<span class="required">*</span>');
    }
  }

  var alwaysReadOnlyFields = _baseStructure['alwaysReadOnlyFields'];  
  if(alwaysReadOnlyFields.length > 0){
    for (var i = 0; i < alwaysReadOnlyFields.length; i++) {
      var fieldname = alwaysReadOnlyFields[i];
      $(ZERP.FrmMgr.genFrm.formId).find('#'+fieldname).attr('disabled', 'disabled');
    }
  }

  
  if(!!formMode && formMode == 'edit'){
    // ZERP.FrmMgr.genFrm.handleFluidFields_formEditMode();
    $(ZERP.FrmMgr.genFrm.formId).find('.btnLookup').removeAttr('disabled');
    $(ZERP.FrmMgr.genFrm.formId).find('.dropdownlistArrowZERPComboBox').css('pointer-events', '');
    $(ZERP.FrmMgr.genFrm.formId).find('.dropdownlistArrowZERPComboBox').css('cursor', 'pointer');
  }

  if(!!formMode && formMode == 'edit'){
    var onEditOnlyFields = _baseStructure['onEditOnlyFields'];  
    for (var i = 0; i < onEditOnlyFields.length; i++) {
      var fieldname = onEditOnlyFields[i];
      $(ZERP.FrmMgr.genFrm.formId).find('#'+fieldname).attr('disabled', 'disabled');
      $(ZERP.FrmMgr.genFrm.formId).find('#'+fieldname).siblings('.btnLookup').attr('disabled', 'disabled');
      if($('.ZERP_EntryCt').find('button[forAttribute='+fieldname+']').hasClass('btnDropdownToggle')){
        $('.ZERP_EntryCt').find('button[forAttribute='+fieldname+']').css('display', 'none');
      }
    }
  }

  // Create
  if(!!formMode && formMode == 'create'){
    if(!!extra && extra == 'copy'){
      $(ZERP.FrmMgr.genFrm.formId).find('.btnLookup').removeAttr('disabled');
      $(ZERP.FrmMgr.genFrm.formId).find('.dropdownlistArrowZERPComboBox').css('pointer-events', '');
      $(ZERP.FrmMgr.genFrm.formId).find('.dropdownlistArrowZERPComboBox').css('cursor', 'pointer');
    }
  }

  if(!!formMode && formMode == 'create'){
    var hideOnCreateFields = _baseStructure['hideOnCreateFields'];  
    for (var i = 0; i < hideOnCreateFields.length; i++) {
      var fieldname = hideOnCreateFields[i];
      $(ZERP.FrmMgr.genFrm.formId).find('#'+fieldname).closest('div.formGroup').css('display', 'none');

      // hide tab button
      var tabButtonTabID = 'Tab_'+fieldname;
      $(ZERP.FrmMgr.genFrm.formId).find('div.tabButtons').find('[tabID='+tabButtonTabID+']').css('display', 'none');
    }
  }


  if(!!formMode && formMode == 'edit'){
    var hideOnUpdateFields = _baseStructure['hideOnUpdateFields'];  
    for (var i = 0; i < hideOnUpdateFields.length; i++) {
      var fieldname = hideOnUpdateFields[i];
      $(ZERP.FrmMgr.genFrm.formId).find('#'+fieldname).closest('div.formGroup').css('display', 'none');
    }
  }

  if(!!formMode && formMode == 'read'){
    var hideOnUpdateFields = _baseStructure['hideOnUpdateFields'];  
    for (var i = 0; i < hideOnUpdateFields.length; i++) {
      var fieldname = hideOnUpdateFields[i];
      $(ZERP.FrmMgr.genFrm.formId).find('#'+fieldname).closest('div.formGroup').css('display', 'none');
      // hide fieldset box
      $(ZERP.FrmMgr.genFrm.formId).find('#fieldset_'+fieldname).css('display', 'none');
      // hide tab
      $(ZERP.FrmMgr.genFrm.formId).find('button[tabID=Tab_'+fieldname+']').css('display', 'none');
    }
  }


  // if form mode is read or edit then call onchange function 
  // for show fluids fields 



  if(!!formMode && formMode == 'read'){
    $(ZERP.FrmMgr.genFrm.formId).find('.btnLookup').attr('disabled', 'disabled');
    $(ZERP.FrmMgr.genFrm.formId).find('.dropdownlistArrowZERPComboBox').css('pointer-events', 'none');    
  }

  // Populate default value [Adding Date:2018-12-04] ---------------------------------------------------
  // alert(formMode);
  if(!!formMode && formMode == 'create'){
  	if(!!extra && extra == 'copy') return;

    var EntityAttributes = ZERP.System.EntityStructureObj['Attributes'];
    for (var attributeName in EntityAttributes) {
      var thisAttributeProperties = EntityAttributes[attributeName];
      var HtmlType = (!!thisAttributeProperties['HtmlType']) ? thisAttributeProperties['HtmlType'] : '';
      if(HtmlType == 'odDropdownRefObj') continue;

      if( thisAttributeProperties.hasOwnProperty('defaultval') ){
        var defaultval = thisAttributeProperties['defaultval'];
        
        if(HtmlType == 'checkbox'){
          if(defaultval == "1" || defaultval == 1 || defaultval == true || defaultval == "true"){
            $(ZERP.FrmMgr.genFrm.formId).find('#'+attributeName).prop("checked", true);
          }
          
        } else {
      
          $(ZERP.FrmMgr.genFrm.formId).find('#'+attributeName).val(defaultval);
        }

      } else {
        if(defaultval= '' || defaultval == null) continue;
      }
    }

  }

  if(!!formMode && formMode == 'create'){
    $(ZERP.FrmMgr.genFrm.formId).find('#UniqueID').val('');
  }

  // Value at Focus Handling
  $(ZERP.FrmMgr.genFrm.formId).find('input[type=text]').focus(function(){
    ZERP.valAtFocus = $(this).val();
  });
  $(ZERP.FrmMgr.genFrm.formId).find('input[type=text], select, textarea').click(function(){
    ZERP.FrmMgr.genFrm.removeReferenceEntityAddonButton();
  });  
  


  // *** Handling Extension Plugin develop by Me or third Party
  // ZERP.FrmMgr.genFrm.handleSelect2Plugin();
  ZERP.FrmMgr.genFrm.handleDateTimePickerPlugin();
  ZERP.FrmMgr.genFrm.initOnDemandDataDropdownHandling();
  ZERP.FrmMgr.genFrm.initReferenceEntityAddonButton();

}
//******************************************* INIT FORM HANDLING (After calling form mode) END ********************************







//******************************************* FORM CRUD FUNCTIONS HANDLING START **********************************************

ZERP.FrmMgr.genFrm.fillForm_extWrk = function(formDataObj){};

/**
 * Receives data from the API and populates the respective fields of the form
 * @param  {docobj} headerObj is the docobj from the API, minus the lines element
 * @param  {docboj.lines} linesObj is the lines element of docobj
 * @return {boolean}           true for success, false for failure
 */
ZERP.FrmMgr.genFrm.fillForm = function(formDataObj) {

  // Complete the header fields
  for (var key in formDataObj) {
    if (key.substr(0, 1) == "_") {
      ZERP.FrmMgr.genFrm.dbAuxData[key.substr(1)] = formDataObj[key];
      continue;
    }
    var fieldvalue = formDataObj[key];

    var attributeName = key;
    var attributeValue = fieldvalue;

    $(ZERP.FrmMgr.genFrm.formId + '#' + key).filter('input,select,textarea').val(formDataObj[key]);
    // $(ZERP.FrmMgr.genFrm.formId + '#' + key).filter('input[type=number]').attr('value', formDataObj[key]);
    // $('#link').attr('value', 'new value');

    var EntityAttributes = ZERP.System.EntityStructureObj['Attributes'];
    var thisAttributeProperties = (!!EntityAttributes[key]) ? EntityAttributes[key] : {};

    // Checkbox Handling
    if(!!thisAttributeProperties.HtmlType && thisAttributeProperties.HtmlType == 'checkbox'){
      if(fieldvalue == '1'){
        $(ZERP.FrmMgr.genFrm.formId + '#' + key).filter('input[type=checkbox]').prop("checked", true);
      } else {
        $(ZERP.FrmMgr.genFrm.formId + '#' + key).filter('input[type=checkbox]').prop("checked", false);
      }
    }


    // Combobox Handling
    if(!!thisAttributeProperties.HtmlType && thisAttributeProperties.HtmlType == 'combobox'){
      if(!!thisAttributeProperties.data){
        var userFieldValue = thisAttributeProperties.data[formDataObj[key]];
        $(ZERP.FrmMgr.genFrm.formId + '#' + key).filter('input[type=text]').val(userFieldValue);
      }
    } else if(!!thisAttributeProperties.HtmlType && thisAttributeProperties.HtmlType == 'odDropdownRefObj'){

      // 1 way - attach in generic bean
      if(!!formDataObj.CodeAttributeDecoVals){
        if(!!formDataObj.CodeAttributeDecoVals[key]){
          $(ZERP.FrmMgr.genFrm.formId + ' #' + attributeName).val(formDataObj.CodeAttributeDecoVals[key]);
        }
      }

      // 2 way - attach in Entity Structure
      if(!!ZERP.System.EntityStructureObj.CodeAttributeDecoVals){
        if(!!ZERP.System.EntityStructureObj.CodeAttributeDecoVals[key]){
          $(ZERP.FrmMgr.genFrm.formId + ' #' + attributeName).val(ZERP.System.EntityStructureObj.CodeAttributeDecoVals[key]);
        }
      }

      $(ZERP.FrmMgr.genFrm.formId + ' #' + attributeName+'_code').val(attributeValue);
    }

    // CodeAttributeDecoVals Handling
    // var CodeAttributeDecoVals = (!!ZERP.System.EntityStructureObj['CodeAttributeDecoVals']) ? ZERP.System.EntityStructureObj['CodeAttributeDecoVals'] : {};
    // for (var key in CodeAttributeDecoVals) {
    //   var val = CodeAttributeDecoVals[key];
    //   $(ZERP.FrmMgr.genFrm.formId).find('div.formGroup_'+key).find('span.SpanDecode').text(val);
    // }

  }

  ZERP.FrmMgr.genFrm.fillForm_extWrk(formDataObj); // @Al-Mamun@2019-12-02
  return true;
}







ZERP.FrmMgr.genFrm.createEntity_callBackFunction_extWrk = function(returnGB){}

ZERP.FrmMgr.genFrm.createEntity_callBackFunction = function(extraParams, returnGB){
  ZERP.FrmMgr.genFrm.createEntity_callBackFunction_extWrk(returnGB);
  if(!!!extraParams) return;
  if(!!extraParams.saveAndNewForm && extraParams.saveAndNewForm == true){
    ZERP.FrmMgr.genFrm.newForm();
  }
}

ZERP.FrmMgr.genFrm.createEntity = function(entityObj, extraParams){

  var rEntityName = ZERP.System.EntityStructureObj['_entityName'];
  var rRunTime = ZERP.System.EntityStructureObj['rRunTime'];
  var rCopy = (!!ZERP.FrmMgr.genFrm.isCopy) ? '1' : '0';

  var postGB = {
    rEntityName: rEntityName,
    rRunTime: rRunTime,
    rCopy: rCopy,
    rReqType: 'createEntity',
    entityObj: JSON.stringify(entityObj)
  };

  ZERP.Utils.showProcessinOverlay();

  $.ajax({
    type: 'post',
    url: ZERP.System.rRequestApiUrl,
    data: postGB,
    success: function(response) {
      ZERP.Utils.removeProcessingOverlay();

      var returnGB;
      try {
        returnGB = JSON.parse(response);
      } catch(err) {
        $('#ZERP_UserAlertCt').empty().append(response);
      }

      if(!!returnGB.SessionExpired){
        alert('Your session has expired. \nClick OK to login again');
        window.location.href = "${request.contextPath}/login/auth";
        return;
      } else if(!!returnGB.errormsgs && returnGB.errormsgs.length > 0) {
        console.log(returnGB.errormsgs.join('\n'));
        // alert(returnGB.errormsgs.join('\n'));
        ZERP.FrmMgr.genFrm.editMode();
        ZERP.FrmMgr.genFrm.initForm();
        if(returnGB._TransactionStatus == 'fail'){
          jsClient.showErrorMeaasge('Fail to save transaction');
        }
        if(!!returnGB.UserErrorMsgs){
          jsClient.showErrorMeaasge(returnGB.UserErrorMsgs, false);
        } else {
          // $('#ZERP_UserAlertCt').empty().append(returnGB.errormsgs.join('\n'));
          jsClient.renderFormError(returnGB.errormsgs.join('\n'));
        }
          
      } else if(!!returnGB.userErrorMsg){
        jsClient.showErrorMeaasge(returnGB.userErrorMsg, false);
        
      } else {

        ListMgr.redrawList();
        ZERP.FrmMgr.genFrm.hideFormInterface();
        ZERP.FrmMgr.genFrm.createEntity_callBackFunction(extraParams, returnGB);
        if(returnGB._TransactionStatus == 'success')
          jsClient.showSuccessMeaasge('Successfully save transaction');

      }
    }
  }).fail(function(e) {
    ZERP.Utils.removeProcessingOverlay();
    // alert('Saving failed, please try again.');
    ZERP.FrmMgr.genFrm.editMode();
    console.log(e);
    console.log(e.responseText);
    jsClient.renderFormError(e.responseText);
  });

  return;

}


/**
 * [readEntity description]
 * @param  {[type]} entityKeys       [description]
 * @param  {[type]} entityKeyVals    [description]
 * @param  {[type]} entityKeyValsObj [description]
 * @return {[type]}                  [description]
 */
ZERP.FrmMgr.genFrm.readEntity = function(entityKeys, entityKeyVals, entityKeyValsObj){
  ZERP.rActiveOperation = 'Read';
  
  var _baseStructure = ZERP.System.EntityStructureObj;
  var _SHOWENTITYFORM = (!!_baseStructure['_SHOWENTITYFORM']) ? _baseStructure['_SHOWENTITYFORM'] : 'yes'; // default yes
  if(_SHOWENTITYFORM == 'no') return;

  // if(!!ListMgr.listGridPanelScrolled && ListMgr.listGridPanelScrolled == true){
  //   delete ListMgr.listGridPanelScrolled;
  // }
  
  ZERP.FrmMgr.genFrm.isCopy = false;
  ZERP.Utils.showProcessinOverlay();


 // from header form
  for (var i = 0; i < entityKeys.length; i++) {
    var entityKey = entityKeys[i];
    var entityVal = $( '.ZERP_HeaderEntryCt' + ' #'+entityKey).val();
    if(entityVal == '' || entityVal == null) continue;
    entityKeyVals.push(entityVal);
    entityKeyValsObj[entityKey] = entityVal;
  }


  ZERP.FrmMgr.genFrm.showFormInterface();
  ZERP.FrmMgr.genFrm.makeUserEntryForm();
  ZERP.FrmMgr.genFrm.adjustListFormInterface();
  // setTimeout(function() {
  //   ZERP.FrmMgr.genFrm.adjustListFormInterface();
  // }, 500);

  ZERP.FrmMgr.genFrm.handleGenericToolbarButtons_formReadMode();
  
  var rEntityName = ZERP.System.EntityStructureObj['_entityName'];
  var rRunTime = ZERP.System.EntityStructureObj['rRunTime'];

  var searchParams = {
    rEntityName: rEntityName,
    rRunTime: rRunTime,
    'rReqType': 'readEntity',
    entityKeys  : JSON.stringify( entityKeys ),
    entityKeyVals  : JSON.stringify( entityKeyVals ),
    entityKeyValsObj  : JSON.stringify( entityKeyValsObj ),
  };


  $.get(ZERP.System.rRequestApiUrl, searchParams, populateFromDb).fail(function(e) {
    ZERP.Utils.removeProcessingOverlay();
    console.log(e.responseText);
    // $('#ZERP_UserAlertCt').empty().append(e.responseText);
    jsClient.renderFormError(e.responseText);
  });

  function populateFromDb(data, textStatus, jqXHR) {
    data = JSON.parse(data);
    if(!!data.SessionExpired){
        alert('Your session has expired. \nClick OK to login again');
        window.location.href = "${request.contextPath}/authentication/login";
        // window.open('/user/index.php');
        return;
    } else if(Object.keys(data).length > 0) {

        ZERP.System.EntityStructureObj = data;        

        // ZERP.FrmMgr.genFrm.newForm('read');
        var ReadBean = data.ReadBean;
        ZERP.FrmMgr.genFrm.makeUserEntryForm();
        ZERP.FrmMgr.genFrm.initForm('read');
        ZERP.FrmMgr.genFrm.fillForm(ReadBean);
        ZERP.FrmMgr.genFrm.initForm('read');
        ZERP.FrmMgr.genFrm.readMode();
        ZERP.FrmMgr.genFrm.handleGenericToolbarButtons_formReadMode();
        
        // ZERP.UIMgr.removeZERPmainContainerScrollable();
        ZERP.FrmMgr.genFrm.adjustListFormInterface();
        ZERP.Utils.removeProcessingOverlay();
        // window.scrollTo(0, 0);
    } else {
      ZERP.FrmMgr.genFrm.editMode();
      alert('Document not found.');
    }
  }

}



/**
 * [createEntity_callBackFunction description]
 * @param  {[type]} extraParams [description]
 * @return {[type]}             [description]
 */
ZERP.FrmMgr.genFrm.updateEntity_callBackFunction = function(extraParams){
  if(!!!extraParams) return;
  if(!!extraParams.saveAndNewForm && extraParams.saveAndNewForm == true){
    ZERP.FrmMgr.genFrm.newForm();
  }
}

ZERP.FrmMgr.genFrm.updateEntity = function(entityObj, extraParams){
  ZERP.Utils.showProcessinOverlay();

  var baseStructure = ZERP.System.EntityStructureObj;
  var entityKeys = ZERP.System.EntityStructureObj['entityKeys'];
  var entityKeyVals = [];
  var entityKeyValsObj = {};

  // from main from
  for (var i = 0; i < entityKeys.length; i++) {
    var entityKey = entityKeys[i];
    var entityVal = $( ZERP.FrmMgr.genFrm.formId + ' #'+entityKey).val();
    if(entityVal == '' || entityVal == null) continue;
    entityKeyVals.push(entityVal);
    entityKeyValsObj[entityKey] = entityVal;
  }
  // from header form
  for (var i = 0; i < entityKeys.length; i++) {
    var entityKey = entityKeys[i];
    var entityVal = $( '.ZERP_HeaderEntryCt' + ' #'+entityKey).val();
    if(entityVal == '' || entityVal == null) continue;
    entityKeyVals.push(entityVal);
    entityKeyValsObj[entityKey] = entityVal;
  }

  var rEntityName = ZERP.System.EntityStructureObj['_entityName'];
  var rRunTime = ZERP.System.EntityStructureObj['rRunTime'];

  /* Submit via ajax */
  var postGB = {
    rEntityName: rEntityName,
    rEntityName: rEntityName,
    rRunTime: rRunTime,
    rReqType: 'updateEntity',
    entityObj: JSON.stringify(entityObj),
    entityKeys  : JSON.stringify( entityKeys ),
    entityKeyVals  : JSON.stringify( entityKeyVals ),
    entityKeyValsObj  : JSON.stringify( entityKeyValsObj )
  };


  $.ajax({
    type: 'post',
    url: ZERP.System.rRequestApiUrl,
    data: postGB,
    success: function(response) {
      ZERP.Utils.removeProcessingOverlay();

      var returnGB;
      try {
        returnGB = JSON.parse(response);
      } catch(err) {
        $('#ZERP_UserAlertCt').empty().append(response);
      }

      if(!!returnGB.SessionExpired){
        alert('Your session has expired. \nClick OK to login again');
        // window.location.href = '/user/index.php';
        window.location.href = "${request.contextPath}/authentication/login";
        // window.open('/user/index.php');
        return;
      } else if(!!returnGB.errormsgs && returnGB.errormsgs.length > 0) {
        console.log(returnGB.errormsgs.join('\n'));
        // alert(returnGB.errormsgs.join('\n'));
        ZERP.FrmMgr.genFrm.editMode();
        ZERP.FrmMgr.genFrm.initForm();
        if(returnGB._TransactionStatus == 'fail'){
          jsClient.showErrorMeaasge('Fail to save transaction');
        }
        if(!!returnGB.UserErrorMsgs){
          jsClient.showErrorMeaasge(returnGB.UserErrorMsgs, false);
        } else {
          jsClient.renderFormError(returnGB.errormsgs.join('\n'));
        }
 
      } else if(!!returnGB.userErrorMsg){
        jsClient.showErrorMeaasge(returnGB.userErrorMsg, false);

      } else {
        // ZERP.FrmMgr.genFrm.updateEntity_handleOwnHeader(returnGB);
        ListMgr.redrawList();
        ZERP.FrmMgr.genFrm.hideFormInterface();
        ZERP.FrmMgr.genFrm.updateEntity_callBackFunction(extraParams);
        if(returnGB._TransactionStatus == 'success')
          jsClient.showSuccessMeaasge('Successfully save transaction');
      }

    }
  }).fail(function(e) {
    ZERP.Utils.removeProcessingOverlay();
    // alert('Saving failed, please try again.');
    ZERP.FrmMgr.genFrm.editMode();

    console.log(e.responseText);
    // $('#ZERP_UserAlertCt').empty().append(e);
    // $('#ZERP_UserAlertCt').empty().append(e.responseText);
    jsClient.renderFormError(e.responseText);
  });

  return;  

}



/**
 * [deleteEntity description]
 * @return {[type]} [description]
 */
ZERP.FrmMgr.genFrm.deleteEntity = function(){
  var r = confirm('Are you sure want to delete this item?');
  if(!r) return;
  
  if( $('#ZERP_formGridPanel').css('display') == 'none'){
    return;
  }

  ZERP.Utils.showProcessinOverlay();

  var baseStructure = ZERP.System.EntityStructureObj;
  var entityKeys = ZERP.System.EntityStructureObj['entityKeys'];
  var entityKeyVals = [];
  var entityKeyValsObj = {};

  // from main from
  for (var i = 0; i < entityKeys.length; i++) {
    var entityKey = entityKeys[i];
    var entityVal = $( ZERP.FrmMgr.genFrm.formId + ' #'+entityKey).val();
    if(entityVal == '' || entityVal == null) continue;
    entityKeyVals.push(entityVal);
    entityKeyValsObj[entityKey] = entityVal;
  }


  // 2. collect data
  var entityObj = {};
  var _baseStructure = ZERP.System.EntityStructureObj;
  ZERP.FrmMgr.genFrm.formAttributes = _baseStructure['Attributes'];   
  $.each(ZERP.FrmMgr.genFrm.formAttributes, function(attributeName, attributeProperties) {
    entityObj[attributeName] = $(ZERP.FrmMgr.genFrm.formId + ' #' + attributeName).val();
  });
  

  var rEntityName = ZERP.System.EntityStructureObj['_entityName'];
  var rRunTime = ZERP.System.EntityStructureObj['rRunTime'];

  // 3. post data
  /* Submit via ajax */
  var postGB = {
    rEntityName: rEntityName,
    rRunTime: rRunTime,
    'rReqType': 'deleteEntity',
    entityObj: JSON.stringify(entityObj),
    entityKeys  : JSON.stringify( entityKeys ),
    entityKeyVals  : JSON.stringify( entityKeyVals ),
    entityKeyValsObj  : JSON.stringify( entityKeyValsObj ),
  };


  // ajax request
  var rGenericBean = {};
  $.ajax({
    async: true,
    type: "POST",
    url: ZERP.System.rRequestApiUrl,
    data: postGB,
    beforeSend: function() {
    },
    success: function(data) {
      rGenericBean = JSON.parse(data);
      ZERP.Utils.removeProcessingOverlay();

      if(!!rGenericBean.errormsgs && rGenericBean.errormsgs.length > 0) {
        console.log(rGenericBean.errormsgs.join('\n'));
        ZERP.FrmMgr.genFrm.editMode();
        ZERP.FrmMgr.genFrm.initForm();
        if(rGenericBean._TransactionStatus == 'fail'){
          jsClient.showErrorMeaasge('Fail to save transaction');
        }
        if(!!rGenericBean.UserErrorMsgs){
          jsClient.showErrorMeaasge(rGenericBean.UserErrorMsgs, false);
        }

      } else if(!!rGenericBean.userErrorMsg){
        jsClient.showErrorMeaasge(rGenericBean.userErrorMsg, false);
      }


      if(rGenericBean._TransactionStatus == 'success'){
        jsClient.showSuccessMeaasge('Successfully delete data');
        ZERP.FrmMgr.genFrm.hideFormInterface();
        ListMgr.redrawList();
      }

    }
  }).fail(function(e) {
    ZERP.Utils.removeProcessingOverlay();
    alert('Saving failed, please try again.');
    ZERP.FrmMgr.genFrm.editMode();

    console.log(e.responseText);
    // $('#ZERP_UserAlertCt').empty().append(e);
    // $('#ZERP_UserAlertCt').empty().append(e.responseText);
    jsClient.renderFormError(e.responseText);
  });

}


ZERP.FrmMgr.genFrm.collectHeaderData = function(){
  var headerObj = {};
  $('.ZERP_HeaderEntryCt').find('.formGroup input, select, textarea').each(function(index, element){
    // element == this
    var fieldname = $(element).attr('name');
    if(!!!fieldname) return;
    var fieldvalue = $(element).val();
    headerObj[fieldname] = fieldvalue;
  });
  return headerObj;
}

/**
 * [saveForm description]
 * @return {[type]} [description]
 */
ZERP.FrmMgr.genFrm.saveForm = function(){
  // 1. validation
  // 2. collect data
  // 3. post data
  //    --- create
  //    --- update
  //    --- delete

  // 1. validation
  var error = false;
  error = error || ZERP.FrmMgr.genFrm.validateFormContainerFields(ZERP.FrmMgr.genFrm.formId);
  if(error) return;


  // just to avoid re-entry, the server should also check for double submission
  ZERP.FrmMgr.genFrm.readMode();
  ZERP.Utils.hideCustomToolbar();
  // before reading any values, make the values of the inputs actually uppercase and not only CSS transformed
  // $(ZERP.FrmMgr.genFrm.formId).find('input,textarea').each(function(i) {
  //   // if ($(this).css('text-transform') == 'uppercase') $(this).val($(this).val().toUpperCase());
  //   if ($(this).hasClass('ReferenceAttribute')) $(this).val($(this).val().toUpperCase());
  // });

  $(ZERP.FrmMgr.genFrm.formId).find('input,textarea').each(function(i) {
    if ($(this).hasClass('CapitalCodeAttribute')) $(this).val($(this).val().toUpperCase());
  });


  // 2. collect data
  var entityObj = {};
  var _baseStructure = ZERP.System.EntityStructureObj;
  ZERP.FrmMgr.genFrm.formAttributes = _baseStructure['Attributes'];   
  $.each(ZERP.FrmMgr.genFrm.formAttributes, function(attributeName, attributeProperties) {
    entityObj[attributeName] = $(ZERP.FrmMgr.genFrm.formId + ' #' + attributeName).val();

    //checkbox
    if(!!attributeProperties.HtmlType && attributeProperties.HtmlType == 'checkbox'){
      var isChecked = $(ZERP.FrmMgr.genFrm.formId + ' #' + attributeName).prop('checked');
      entityObj[attributeName] = (isChecked === true) ? '1' : '0';
    }

    if(!!attributeProperties.HtmlType && attributeProperties.HtmlType == 'odDropdownRefObj'){
      entityObj[attributeName] = $(ZERP.FrmMgr.genFrm.formId + ' #' + attributeName+'_code').val();
      entityObj[attributeName+'_code'] = $(ZERP.FrmMgr.genFrm.formId + ' #' + attributeName+'_code').val();
      entityObj[attributeName+'_desc'] = $(ZERP.FrmMgr.genFrm.formId + ' #' + attributeName).val();
    }
    
  });


  // 3. post data
  if(ZERP.rActiveOperation == 'Update'){
    ZERP.FrmMgr.genFrm.updateEntity(entityObj);
  } else if(ZERP.rActiveOperation == 'Create') {
    ZERP.FrmMgr.genFrm.createEntity(entityObj);
  }
  ZERP.FrmMgr.genFrm.dirtyDataForm = false;

}


ZERP.FrmMgr.FeedbackResponseFromList = function(){
	if(!!ZERP.FrmMgr.ListFeedback) delete ZERP.FrmMgr.ListFeedback;
  ZERP.FrmMgr.genFrm.newForm();
}

/**
 * [saveAndNewForm description]
 * @return {[type]} [description]
 * Save form via ajax after validation
 */
ZERP.FrmMgr.genFrm.saveAndNewForm = function() {
  var extraParams = {'saveAndNewForm': true};
  ZERP.FrmMgr.ListFeedback = true;


  // 1. validation
  // 2. collect data
  // 3. post data
  //    --- create
  //    --- update
  //    --- delete

  // 1. validation
  var error = false;

  error = error || ZERP.FrmMgr.genFrm.validateFormContainerFields(ZERP.FrmMgr.genFrm.formId);
  if(error) return;


  $(ZERP.FrmMgr.genFrm.formId).find('input,textarea').each(function(i) {
    if ($(this).hasClass('CapitalCodeAttribute')) $(this).val($(this).val().toUpperCase());
  });


  // just to avoid re-entry, the server should also check for double submission
  ZERP.FrmMgr.genFrm.readMode();

  // 2. collect data
  var entityObj = {};
  var _baseStructure = ZERP.System.EntityStructureObj;
  ZERP.FrmMgr.genFrm.formAttributes = _baseStructure['Attributes'];   
  $.each(ZERP.FrmMgr.genFrm.formAttributes, function(attributeName, attributeProperties) {

    entityObj[attributeName] = $(ZERP.FrmMgr.genFrm.formId + ' #' + attributeName).val();

    //checkbox
    if(!!attributeProperties.HtmlType && attributeProperties.HtmlType == 'checkbox'){
      var isChecked = $(ZERP.FrmMgr.genFrm.formId + ' #' + attributeName).prop('checked');
      entityObj[attributeName] = (isChecked === true) ? '1' : '0';
    }

    if(!!attributeProperties.HtmlType && attributeProperties.HtmlType == 'odDropdownRefObj'){
      entityObj[attributeName] = $(ZERP.FrmMgr.genFrm.formId + ' #' + attributeName+'_code').val();
      entityObj[attributeName+'_code'] = $(ZERP.FrmMgr.genFrm.formId + ' #' + attributeName+'_code').val();
      entityObj[attributeName+'_desc'] = $(ZERP.FrmMgr.genFrm.formId + ' #' + attributeName).val();
    }

  });


  // 3. post data
  if(ZERP.rActiveOperation == 'Update'){
    ZERP.FrmMgr.genFrm.updateEntity(entityObj, extraParams);
  } else if(ZERP.rActiveOperation == 'Create') {
    ZERP.FrmMgr.genFrm.createEntity(entityObj, extraParams);
  }




}
//******************************************* FORM CRUD FUNCTIONS HANDLING END **********************************************



ZERP.FrmMgr.genFrm.printFullDocument = function(){
  var params = jsClient.paramsToObj(window.location.search);

  var host = window.location.origin;
  var _URL_APPFLUIDDIR = ZERP.System.EntityStructureObj['_URL_APPFLUIDDIR'];
  var _URL_MODULEDIR = ZERP.System.EntityStructureObj['_URL_MODULEDIR'];
  var ENTITY_PRINT_RPTS = ZERP.System.EntityStructureObj['ENTITY_PRINT_RPTS'];
  var ENTITY_PRINT_RPT = ENTITY_PRINT_RPTS[0];
  var ENTITY_NAME = ZERP.System.EntityStructureObj['_entityName'];

  var HAS_OWN_HEADERENTTRY_SESSION = ZERP.System.EntityStructureObj['HAS_OWN_HEADERENTTRY_SESSION'];

  var entityKeyValsObj = {};
  var rKey = 'rKey';

  var fatherQueryKeys = ZERP.System.EntityStructureObj['fatherQueryKeys'];
  if(fatherQueryKeys.length > 0){
    for (var i = 0; i < fatherQueryKeys.length; i++) {
      var fahterQueryKey = fatherQueryKeys[i];
      var fahterQueryVal = $('.ZERP_HeaderEntryCt' + ' #'+fahterQueryKey).val();
      entityKeyValsObj[fahterQueryKey] = fahterQueryVal;
    }
  }



  var queryString = jsClient.paramsToQueryString(entityKeyValsObj);

  var printURL = host + _URL_APPFLUIDDIR + '/'+ _URL_MODULEDIR +'/report/'+ ENTITY_PRINT_RPT +'?'+queryString + '&rEntityName=' + ENTITY_NAME;
  var myWindow = window.open(printURL);
  // var myWindow = window.open(printURL, "", "width=250, height=250");
  // ZERP.FrmMgr.genFrm.customPrintOutLink(printURL);
  // var myWindow = window.open('http://localhost/documents/printdoc.php?doctype=MR&iddocument=29', "", "width=250, height=250");
  // myWindow.resizeTo(800, 600);
  // myWindow.focus();

}





$.extend(ZERP.FrmMgr.genFrm, {
  /**
   * Start up function
   * @description Any JS code to be run on start up
   * @returns {undefined}
   */
  init: function() {
    /* executable JS */
    return;
  },
  enableRead: function() {
    ZERP.FrmMgr.genFrm.readMode();
    return;
  },
  enableEdit: function() {
    ZERP.FrmMgr.genFrm.editMode();
    return;
  },
  enableReceive: function() {
    ZERP.FrmMgr.genFrm.receiveMode();
    return;
  },

  /**
   * Process Purchase Request Form
   * @param selector formId
   * @returns {undefined}
   */
  processForm: function(formId, params) {

    ZERP.FrmMgr.genFrm.formId = formId + ' ';
    ZERP.FrmMgr.genFrm.formMode = 'edit';
    ZERP.FrmMgr.genFrm.dirtyDataForm = false;

    var _baseStructure = ZERP.System.EntityStructureObj;
    var toolbars = ZERP.System.EntityStructureObj['toolbars'];

    
    ZERP.FrmMgr.genFrm.handleGenericToolbarButtons_formHiddenMode(); // default 
    ZERP.FrmMgr.genFrm.initCustomJsFunctions();
    ZERP.FrmMgr.genFrm.listMode();


    /**
     * Generic toolbar buttons action bind
     */
    $(window).keydown(function(e) {
      if (e.ctrlKey || e.metaKey) {
        switch (String.fromCharCode(e.which).toLowerCase()) {
          case 's':
            e.preventDefault();
            // $('#upperButtonBar .btnSaveForm').click();
            ZERP.FrmMgr.genFrm.saveForm();
            break;
        }
      }
    });

    $('.btnNew').on('click', function(e) {
      e.preventDefault();
      if( $(this).closest('table').hasClass('x-item-disabled') ) return;
      if( toolbars.std_btnstatus.btnNew.active === false) return;
      if(!!ZERP.rActiveOperation) delete ZERP.rActiveOperation;
      ZERP.FrmMgr.genFrm.newForm();
      // Handle Customize Object If Has?
      ZERP.FrmMgr.genFrm.callCustomizeObject();
      ZERP.FrmMgr.genFrm.dirtyDataForm = true;
      delete ZERP.System.rActiveFormTab;
    });

    $('.btnSaveForm').on('click', function(e) {
      e.preventDefault();
      if( $(this).closest('table').hasClass('x-item-disabled') ) return;
      ZERP.FrmMgr.genFrm.saveForm();
    });   
    $('.btnSaveAndNew').on('click', function(e) {
      e.preventDefault();
      if( $(this).closest('table').hasClass('x-item-disabled') ) return;
      ZERP.FrmMgr.genFrm.saveAndNewForm();
    });   

    $(' .btnEnterEditMode').on('click', function(e) {
      e.preventDefault();
      if( $(this).closest('table').hasClass('x-item-disabled') ) return;
      if(!!ZERP.rActiveOperation) delete ZERP.rActiveOperation;
      ZERP.rActiveOperation = 'Update';
      ZERP.FrmMgr.genFrm.editMode();
      ZERP.FrmMgr.genFrm.handleGenericToolbarButtons_formEditMode();
      ZERP.FrmMgr.genFrm.initForm('edit');
      ZERP.FrmMgr.genFrm.dirtyDataForm = true;
    });

    $('.btnCopyAndNew').on('click', function(e) {
      e.preventDefault();
      if( $(this).closest('table').hasClass('x-item-disabled') ) return;
      ZERP.FrmMgr.genFrm.copyAndNewModeForm();
    });   



    $('.btnDelete').on('click', function(e) {
      e.preventDefault();
      if( $(this).closest('table').hasClass('x-item-disabled') ) return;
      ZERP.FrmMgr.genFrm.deleteEntity();
    });   

    $('.btnExportToExcel').on('click', function(e) {
      e.preventDefault();
      if( $(this).closest('table').hasClass('x-item-disabled') ) return;
      ZERP.FrmMgr.genFrm.exportToExcel();
    });    

    $('.btnBack').on('click', function(e) {
      e.preventDefault();
      if( $(this).closest('table').hasClass('x-item-disabled') ) return;
      ZERP.FrmMgr.genFrm.goBackToParentSession();
    });    

    $(' .btnPrint').on('click', function(e) {
      e.preventDefault();
      var params = jsClient.paramsToObj(window.location.search);

      var host = window.location.origin;
      var HAS_OWN_HEADERENTTRY_SESSION = ZERP.System.EntityStructureObj['HAS_OWN_HEADERENTTRY_SESSION'];
      var _printURLPathString = (!!ZERP.System.EntityStructureObj['_printURLPathString']) ? ZERP.System.EntityStructureObj['_printURLPathString'] : '';

      var entityKeyValsObj = {};
      var rKey = 'rKey';
      if(HAS_OWN_HEADERENTTRY_SESSION){
        var fatherQueryKeys = ZERP.System.EntityStructureObj['fatherQueryKeys'];
        if(fatherQueryKeys.length > 0){
          for (var i = 0; i < fatherQueryKeys.length; i++) {
            var fahterQueryKey = fatherQueryKeys[i];
            var fahterQueryVal = $('.ZERP_HeaderEntryCt' + ' #'+fahterQueryKey).val();
            entityKeyValsObj[fahterQueryKey] = fahterQueryVal;
          }
        }

      } else {
        var entityKeys = ZERP.System.EntityStructureObj['entityKeys'];
        if(entityKeys.length > 0){
          for (var i = 0; i < entityKeys.length; i++) {
            var entityKey = entityKeys[i];
            var entityVal = $(ZERP.FrmMgr.genFrm.formId).find('#'+entityKey).val();
            entityKeyValsObj[entityKey] = entityVal;
          }
        }

      }

      var queryString = jsClient.paramsToQueryString(entityKeyValsObj);

      // var printURL = host + pkgpath +'/report/'+ ENTITY_PRINT_RPT +'?'+queryString + '&rEntityName=' + ENTITY_API_URL;
      var printURL = ''
      // var myWindow = window.open(printURL, "", "width=250, height=250");
      // ZERP.FrmMgr.genFrm.customPrintOutLink(printURL);

      var printURLPathString = ZERP.System.contextPath + '' + _printURLPathString;
      ZERP.FrmMgr.genFrm.customPrintOutLink(printURLPathString);
      // var myWindow = window.open('http://localhost/documents/printdoc.php?doctype=MR&iddocument=29', "", "width=250, height=250");
      // myWindow.resizeTo(800, 600);
      // myWindow.focus();

    });

    $('.btnLines').on('click', function(e) {
      e.preventDefault();
      if( $(this).closest('table').hasClass('x-item-disabled') ) return;
      ZERP.FrmMgr.genFrm.goToChildSession();
    });    


    $(ZERP.FrmMgr.genFrm.formId + ' .btnNext').on('click', function(e) {
      e.preventDefault();
      var docnumber = $(ZERP.FrmMgr.genFrm.formId + ' #docnumber').val();
      var next_href = window.location.origin + window.location.pathname + '?doctype=FL&formtype=default&dprnumber=' + docnumber + '&tabcontent=1';
      window.location.href = next_href;
      // ZERP.FrmMgr.genFrm.newForm();
    });     


    $('.btnCancelForm').on('click', function(e) {
      e.preventDefault();
      ZERP.FrmMgr.genFrm.hideFormInterface();
    });

    $(ZERP.FrmMgr.genFrm.formId + ' .btnChangeDocStatus').on('click', function(e) {
      e.preventDefault();
      if (confirm('Click OK to send to WMS')) ZERP.FrmMgr.genFrm.changeDocStatus();
    });

    /**
     *  Custom toolbar buttons action bind
     */
    


    return;
  }
});
