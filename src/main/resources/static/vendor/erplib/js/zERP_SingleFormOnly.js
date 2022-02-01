// its like parameter request form
// File creation date: @Al-Mamun@2019-09-23

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
ZERP.SFO = ZERP.SFO || {};

$.extend(ZERP.SFO, {
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


ZERP.SFO.initCustomJsFunctionsAfterUserEntryFormDraw = function(){
  return;
}






/**
 * Bind datepicker with an input field
 * @param selector
 */
ZERP.SFO.bindDatepicker = function(selector) {
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
ZERP.SFO.bindDatetimepicker = function(selector) {
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
ZERP.SFO.handleEntityDateField = function() {
  /* Show current date in docdate field */
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  /* January is 0! */
  var yyyy = today.getFullYear();

  dd = dd < 10 ? ('0' + dd) : dd;
  mm = mm < 10 ? ('0' + mm) : mm;

  $(ZERP.SFO.formId + ' #docdate').val(yyyy + '-' + mm + '-' + dd);

}

/**
 * Validate form fields
 * @param container
 * @returns {boolean}
 */
ZERP.SFO.validateFormContainerFields = function(container) {
  var error = false;
  $(container).find('input, select, textarea').each(function() {
    var type = $(this).attr('type');
    if(type == 'checkbox') return;
    if (!!$(this).prop('required')) {
      if ($(this).val() == '') {
        error = true;
        console.log($(this).attr('name'));
        ZERP.SFO.hightlightErrorField($(this));
        $(this).focus();
      }
    }
  });
  return error;
}

/**
 * Highlight error field for a certain period
 * @param field
 */
ZERP.SFO.hightlightErrorField = function(field) {
  field.addClass('error');
  setTimeout(function() {
    field.removeClass('error');
  }, 3000);
}

/**
 * Show form error
 * @param msg
 */
ZERP.SFO.showFormError = function(msg) {
  $(ZERP.SFO.formId + ' #formError').html(msg).show();
  setTimeout(function() {
    $(ZERP.SFO.formId + ' #formError').hide('slow').html('');
  }, 3000);
}



//******************************************* OTHER
ZERP.SFO.wait = function(ms) {
  var deferred = $.Deferred();
  setTimeout(function() {
    deferred.resolve()
  }, ms);
  return deferred.promise();
}




ZERP.SFO.adjustFormInterface = function(){

  if(ZERP.System.rDebugMode) console.log('Calling-ZERP.SFO.adjustFormInterface()');
  
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
    // 'width': (ERP_listFormGridPanelScrollerWidth_70 - _scrollPaneWidth + 13)+ 'px',
    // 'max-width': (ERP_listFormGridPanelScrollerWidth_70 - _scrollPaneWidth + 13)+ 'px',
    'margin-top': - ( 0 + 0) + 'px',
    'position': 'absolute', // place within parent div
    'top': '0px',
    'left': (0 + ZERP_SidebarWidth + 10 - 10) + 'px',
  });


  // set ZERP_listGridPanel_scroller height
  $('#ZERP_listGridPanel_scroller').css({
    // 'height': (ZERP_formGridPanel_Height - ZERP_listGridPanel_headerFullWidthHeight - ZERP_pgnGridPanelWrapperHeight) + 'px', // here 17 for horizontal scroller width
  });


  // Handle if its very small height
  // console.log(ZERP_formGridPanel_Height + '--QR--' + ( (_myWindowHeight/3)*2));
  if(ZERP_formGridPanel_Height < ( (_myWindowHeight/3)*2)){ // one-third
    $('#ZERP_listGridPanel_scroller').css({
      'height': (((_myWindowHeight/3)*2)-70) + 'px', // here 17 for horizontal scroller width
    });
    $('#ZERP_formGridPanel').css({
      'height': (((_myWindowHeight/3)*2)-170 + 0 + 0) + 'px', // here 17 for horizontal scroller width
      'width': '100%',
    });
    $('#formWrapper').css({
      'height': (((_myWindowHeight/3)*3)-170 + 0 + 0) + 'px', // here 17 for horizontal scroller width
    });
  }


}


ZERP.SFO.handleSelect2Plugin = function(){
  return;
}
ZERP.SFO.handleDateTimePickerPlugin = function(){
  jsClient.initDateTimePicker();
  return;
}

ZERP.SFO.initOnDemandDataDropdownHandling = function(){
  ZERP.FrmMgr.genFrm.initOnDemandDataDropdownHandling();
  return;
}



ZERP.SFO.handleSelect2Plugin = function(){
  ZERP.SFO.applySelect2Class();
}

ZERP.SFO.removeSelect2Class = function(){
  $(ZERP.SFO.formId).find('.select2').removeClass('select2');
}
ZERP.SFO.applySelect2Class = function(){
  // $(ZERP.SFO.formId).find('select').addClass('select2');
  $(ZERP.SFO.formId).find('.select2').select2();
  // $('.select2').select2();
}






ZERP.SFO.handleGenericToolbarButtons_formVisibleMode = function(){
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

ZERP.SFO.handleGenericToolbarButtons_formHiddenMode = function(){
  var _baseStructure = ZERP.System.EntityStructureObj;
  var toolbars = _baseStructure['toolbars'];

  if(!!toolbars.std_btnstatus.btnNew){
    if(!!toolbars.std_btnstatus.btnNew.active){
      $('.btnNew').closest('table').removeClass('x-item-disabled');
    }
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

ZERP.SFO.handleGenericToolbarButtons_formEditMode = function(){
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


ZERP.SFO.handleGenericToolbarButtons_formReadMode = function(){
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
    }
  } else {
    $('.btnEnterEditMode ').closest('table').removeClass('x-item-disabled');
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

}


ZERP.SFO.handleGenericToolbarButtons_formNewEntryMode = function(){
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




ZERP.SFO.setDefaultFieldValue = function(){
  ZERP.SFO.handleEntityDateField();

  var params = jsClient.paramsToObj(window.location.search);
  if( !!params.rQueryFromFather && params.rQueryFromFather == '1'){
    var _baseStructure = ZERP.System.EntityStructureObj;
    var fatherQueryKeys = _baseStructure.fatherQueryKeys;
    for (var i = 0; i < fatherQueryKeys.length; i++) {
      var fatherQueryKey = fatherQueryKeys[i];
      $(ZERP.SFO.formId + '#'+fatherQueryKey).val(params[fatherQueryKey]);
    }
  }

}


ZERP.SFO.closeUserEntryForm = function(){
  
  if($('#ZERP_formGridPanel').length > 0){
    $('#ZERP_formGridPanel').css({
      'display':'none',
    });
    ZERP.SFO.listMode();
    ZERP.SFO.fitListToFullWindow();
    ZERP.SFO.handleGenericToolbarButtons_formHiddenMode();
    ZERP.Utils.showHideCustomToolbar();
  }

  ZERP.UIMgr.handleUI_FormMgrCloseObject();
  
}



ZERP.SFO.getAllGridPanel_HeightWidth = function(){

  var ERP_listGridPanelScrollerWidth = $('#ZERP_listGridPanel_scrollerFullWidth').width();
  var ERP_listGridPanelScrollerHeight = $('#ZERP_listGridPanel_scrollerFullWidth').height();
  var ERP_listTableHeight = $('#listTable').height();

  var ERP_listGridPanelHeaderHeight = $('#ZERP_listGridPanel_headerFullWidth').height();
  var ZERP_GenericToolbarHeight = $('#ZERP_GenericToolbar').height();
  var ERP_pgnGridPanelHeight = $('#ERP_pgnGridPanel').height();

}


ZERP.SFO.setFullWindowForm = function(){
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

ZERP.SFO.setAdjustWindowForm = function(){
  if(ZERP.System.rDebugMode) console.log('Calling-ZERP.SFO.setAdjustWindowForm()');

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


ZERP.SFO.openTab = function(thisElmnt){
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

ZERP.SFO.activeFormTab = function(activeFormTabID){

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
  $(ZERP.SFO.formId).find('div.tabButtons').find('[tabID='+activeFormTabID+']').css({'color': '#007bff'});

}



ZERP.SFO.formBottomButton = function(){

  var formBottomButton = '\
  <div class="clearfix" style="clear:both;"></div>\
  <div class="frm-btnbar-bottom d-none">\
    <button type="button" class="btn btn-outline-primary btn-sm btnSaveForm btnEditMode" onclick="ZERP.SFO.saveForm();"><i class="fa fa-fw fa-check"></i> Save</button>\
    <button type="button" class="btn btn-outline-warning btn-sm btnEditMode" onclick="ZERP.SFO.closeUserEntryForm();"><i class="fas fa-times"></i> Cancel</button>\
  </div>\
  ';

  return formBottomButton;
}

/**
 * [makeUserEntryForm description]
 * @return {[type]} [description]
 */
ZERP.SFO.makeUserEntryForm = function(){
  // this function will make new user entry form
  // or modify or replace exist form
  
  var EntityAttributes = ZERP.System.EntityStructureObj['Attributes'];

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
      <button type="button" id="btnSetFullWindowForm" class=" btnCancelForm" title="Close this form" style="display:none;" onclick="ZERP.SFO.setFullWindowForm();"><i class="fa fa-fw fa-backward"></i></button>\
    </div>\
    <div style="text-align: right; margin-right: -5px; margin-top:-5px;">\
      <button type="button" class="btnAllMode btnCancelForm" title="Close this form" style="display:inline-block;" onclick="ZERP.SFO.closeUserEntryForm();"><i class="fas fa-times"></i></button>\
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

        formTabButtons += '<button type="button" class="tablink '+ActiveClass+'" tabID="'+tabID+'" onclick="ZERP.SFO.openTab(this)">'+fielddesc+'</button>';

      } else if( !!thisAttributeProperties['UIStyleType'] && thisAttributeProperties['UIStyleType'] == "End Tab") {
        htmlString += '</div>';

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
      } else if( thisAttributeProperties.hasOwnProperty('PrintAttribute') &&  thisAttributeProperties.PrintAttribute == '9' ){
          htmlString += '<div class="formGroup formGroup_'+attributeName+ ' ' + checkboxClass + ' rowformat">' + label + packInputTag + '<span class="SpanDecode"></span></div>';
      } else if( thisAttributeProperties.hasOwnProperty('PrintAttribute') &&  thisAttributeProperties.PrintAttribute == '7' ){
          htmlString += '<div class="formGroup formGroup_'+attributeName+ ' ' + checkboxClass + ' rowformat7">' + label + packInputTag + '<span class="SpanDecode"></span></div>';
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

  var formBottomButton = ZERP.SFO.formBottomButton();

  HTML_EntryForm += formTabButtons;
  HTML_EntryForm += htmlString;
  HTML_EntryForm += formBottomButton;
  HTML_EntryForm += '</form>';
  $('#ZERP_mainContainer #formWrapper').empty().append(HTML_EntryForm);

  // Call user customization function/giving facility to customize
  ZERP.SFO.initCustomJsFunctionsAfterUserEntryFormDraw();
}



ZERP.SFO.newForm = function(){
  if(ZERP.System.rDebugMode) console.log('Calling-ZERP.SFO.newForm()');

  var _showEntityForm = (!!ZERP.System.EntityStructureObj['_showEntityForm']) ? ZERP.System.EntityStructureObj['_showEntityForm'] : 'yes'; // default yes
  if(_showEntityForm == 'no') return;

  ZERP.rActiveOperation = 'Create';

  ZERP.SFO.makeUserEntryForm();
  ZERP.SFO.adjustFormInterface();
  ZERP.SFO.editMode();
  ZERP.SFO.setDefaultFieldValue();

  ZERP.SFO.initForm('create');
  ZERP.SFO.handleGenericToolbarButtons_formNewEntryMode();

  // fill default generic bean data after from drow if have @Al-Mamun@2019-11-22
  if( !!ZERP.System.EntityStructureObj['DefaultValuesBean'] ){
    ZERP.FrmMgr.genFrm.fillForm(ZERP.System.EntityStructureObj['DefaultValuesBean']);
  }


}



ZERP.SFO.copyAndNewModeForm = function(){
  ZERP.rActiveOperation = 'Create';
  ZERP.SFO.isCopy = true;
  ZERP.SFO.callToServer('copy');
  // ZERP.SFO.setDefaultFieldValue();
  // ZERP.SFO.editMode();
  // ZERP.SFO.initForm('create', 'copy');
  ZERP.SFO.handleGenericToolbarButtons_formNewEntryMode();

}


ZERP.SFO.initCustomJsFunctions = function(){
  return;
}



ZERP.SFO.makeOwnHeaderEntryForm = function(){}



ZERP.SFO.setStatusInEntityCaption = function(){
  return;
}


ZERP.SFO.callCustomFunctinsAfterFillOwnHeaderData = function(headerEntryData){
 return; 
}

ZERP.SFO.initCustomJsFunctionsAfterHeaderEntryFieldsDraw = function(){
 return; 
}


ZERP.SFO.exportToExcel = function(){
}


ZERP.SFO.customPrintOutLink = function(printURL) {
}


//************************************************** Handle Generic Toolbar Buttons
ZERP.SFO.handleHeaderToolbarButtons_formReadMode = function(){
}

ZERP.SFO.handleHeaderToolbarButtons_formCreateMode = function(){
}

ZERP.SFO.handleHeaderToolbarButtons_formEditMode = function(){
}


//******************************************* MODE HANDLING
ZERP.SFO.readMode = function() {
  $('.btnReadMode ').css('display', 'inline-block');
  $('.btnAllMode ').css('display', 'inline-block');
  $('.btnBootStrap').css('display', 'inline-flex');
  $('.datepicker').unmousewheel();

  $('#ZERP_GenericToolbar .btnEditMode').attr('disabled', true);
  
  $(ZERP.SFO.formId).find(' #formLines tr').unbind('mouseenter mouseleave');
  $(ZERP.SFO.formId).find('input,select,textarea').attr('disabled', 'disabled');
  $(ZERP.SFO.formId).find(' input[type=button]').removeAttr('disabled');

  if( $('#formWrapper').is(":visible") ){
    $('#formExpnCloseTbar .btnCancelForm').css('display', 'inline-block');
  }

  ZERP.SFO.formMode = 'read';
}


ZERP.SFO.editMode = function() {
  $(ZERP.SFO.formId).find('input,select,textarea').removeAttr('disabled');
  // $('#fieldset_systeminformation').css('display', 'none');
  ZERP.SFO.formMode = 'edit';
  $('#ZERP_GenericToolbar .btnEditMode').removeAttr('disabled');
}






//******************************************* INIT FORM HANDLING (After calling form mode) START ******************************
ZERP.SFO.initForm = function(formMode, extra){
  if(ZERP.System.rDebugMode) console.log('Calling-ZERP.SFO.initForm-Params: formMode-' + formMode);

  var _baseStructure = ZERP.System.EntityStructureObj;
  var params = jsClient.paramsToObj(window.location.search);

  var fatherQueryKeys = _baseStructure['fatherQueryKeys'];  
  if(fatherQueryKeys.length > 0){
    for (var i = 0; i < fatherQueryKeys.length; i++) {
      var fieldname = fatherQueryKeys[i];
      // Note: if it's comming through parent Entity, otherwise user will select parent as wish
      if(!!params.rQueryFromFather && params.rQueryFromFather == '1'){
        $(ZERP.SFO.formId).find('#'+fieldname).attr('disabled', 'disabled');
      }
    }
  }

  if(!!ZERP.rActiveOperation && ZERP.rActiveOperation == 'Update'){
    var entityKeys = _baseStructure['entityKeys'];  
    if(entityKeys.length > 0){
      for (var i = 0; i < entityKeys.length; i++) {
        var fieldname = entityKeys[i];
        $(ZERP.SFO.formId).find('#'+fieldname).attr('disabled', 'disabled');
      }
    }
  }


  var mandatoryFields = _baseStructure['mandatoryInUIFields'];  
  if(mandatoryFields.length > 0){
    for (var i = 0; i < mandatoryFields.length; i++) {
      var fieldname = mandatoryFields[i];
      $(ZERP.SFO.formId + ' #' + fieldname).attr('required', 'required');
      $(ZERP.SFO.formId + ' #' + fieldname).closest('div.formGroup').find('label').find('span.required').remove();
      $(ZERP.SFO.formId + ' #' + fieldname).closest('div.formGroup').find('label').not('#'+fieldname).append('<span class="required">*</span>');
    }
  }

  var alwaysReadOnlyFields = _baseStructure['alwaysReadOnlyFields'];  
  if(alwaysReadOnlyFields.length > 0){
    for (var i = 0; i < alwaysReadOnlyFields.length; i++) {
      var fieldname = alwaysReadOnlyFields[i];
      $(ZERP.SFO.formId).find('#'+fieldname).attr('disabled', 'disabled');
    }
  }

  
  if(!!formMode && formMode == 'edit'){
    // ZERP.SFO.handleFluidFields_formEditMode();
    $(ZERP.SFO.formId).find('.btnLookup').removeAttr('disabled');
    $(ZERP.SFO.formId).find('.dropdownlistArrowZERPComboBox').css('pointer-events', '');
    $(ZERP.SFO.formId).find('.dropdownlistArrowZERPComboBox').css('cursor', 'pointer');
  }

  if(!!formMode && formMode == 'edit'){
    var onEditOnlyFields = _baseStructure['onEditOnlyFields'];  
    for (var i = 0; i < onEditOnlyFields.length; i++) {
      var fieldname = onEditOnlyFields[i];
      $(ZERP.SFO.formId).find('#'+fieldname).attr('disabled', 'disabled');
      $(ZERP.SFO.formId).find('#'+fieldname).siblings('.btnLookup').attr('disabled', 'disabled');
    }
  }

  // Create
  if(!!formMode && formMode == 'create'){
    if(!!extra && extra == 'copy'){
      $(ZERP.SFO.formId).find('.btnLookup').removeAttr('disabled');
      $(ZERP.SFO.formId).find('.dropdownlistArrowZERPComboBox').css('pointer-events', '');
      $(ZERP.SFO.formId).find('.dropdownlistArrowZERPComboBox').css('cursor', 'pointer');
    }
  }

  if(!!formMode && formMode == 'create'){
    var hideOnCreateFields = _baseStructure['hideOnCreateFields'];  
    for (var i = 0; i < hideOnCreateFields.length; i++) {
      var fieldname = hideOnCreateFields[i];
      $(ZERP.SFO.formId).find('#'+fieldname).closest('div.formGroup').css('display', 'none');

      // hide tab button
      var tabButtonTabID = 'Tab_'+fieldname;
      $(ZERP.SFO.formId).find('div.tabButtons').find('[tabID='+tabButtonTabID+']').css('display', 'none');
    }
  }


  if(!!formMode && formMode == 'edit'){
    var hideOnUpdateFields = _baseStructure['hideOnUpdateFields'];  
    for (var i = 0; i < hideOnUpdateFields.length; i++) {
      var fieldname = hideOnUpdateFields[i];
      $(ZERP.SFO.formId).find('#'+fieldname).closest('div.formGroup').css('display', 'none');
    }
  }

  if(!!formMode && formMode == 'read'){
    var hideOnUpdateFields = _baseStructure['hideOnUpdateFields'];  
    for (var i = 0; i < hideOnUpdateFields.length; i++) {
      var fieldname = hideOnUpdateFields[i];
      $(ZERP.SFO.formId).find('#'+fieldname).closest('div.formGroup').css('display', 'none');
    }
  }


  // if form mode is read or edit then call onchange function 
  // for show fluids fields 



  if(!!formMode && formMode == 'read'){
    $(ZERP.SFO.formId).find('.btnLookup').attr('disabled', 'disabled');
    $(ZERP.SFO.formId).find('.dropdownlistArrowZERPComboBox').css('pointer-events', 'none');    
  }

  // Populate default value [Adding Date:2018-12-04] ---------------------------------------------------
  // alert(formMode);
  if(!!formMode && formMode == 'create'){
  	if(!!extra && extra == 'copy') return;
    var EntityAttributes = ZERP.System.EntityStructureObj['Attributes'];
    for (var attributeName in EntityAttributes) {
      var thisAttributeProperties = EntityAttributes[attributeName];
      var HtmlType = (!!thisAttributeProperties['HtmlType']) ? thisAttributeProperties['HtmlType'] : '';
      if( thisAttributeProperties.hasOwnProperty('defaultval') ){
        var defaultval = thisAttributeProperties['defaultval'];
        
        if(HtmlType == 'checkbox'){
          if(defaultval == "1" || defaultval == 1 || defaultval == true || defaultval == "true"){
            $(ZERP.SFO.formId).find('#'+attributeName).prop("checked", true);
          }
          
        } else {
      
          $(ZERP.SFO.formId).find('#'+attributeName).val(defaultval);
        }

      } else {
        if(defaultval= '' || defaultval == null) continue;
      }
    }
  }

  if(!!formMode && formMode == 'create'){
    $(ZERP.SFO.formId).find('#UniqueID').val('');
  }

  // Value at Focus Handling
  $(ZERP.SFO.formId).find('input[type=text]').focus(function(){
    ZERP.valAtFocus = $(this).val();
  });
  

  // *** Handling Extension Plugin develop by Me or third Party
  // ZERP.SFO.handleSelect2Plugin();
  ZERP.SFO.handleDateTimePickerPlugin();
  ZERP.SFO.initOnDemandDataDropdownHandling();

}
//******************************************* INIT FORM HANDLING (After calling form mode) END ********************************







//******************************************* FORM CRUD FUNCTIONS HANDLING START **********************************************


/**
 * Receives data from the API and populates the respective fields of the form
 * @param  {docobj} headerObj is the docobj from the API, minus the lines element
 * @param  {docboj.lines} linesObj is the lines element of docobj
 * @return {boolean}           true for success, false for failure
 */
ZERP.SFO.fillForm = function(formDataObj) {

  // Complete the header fields
  for (var key in formDataObj) {
    if (key.substr(0, 1) == "_") {
      ZERP.SFO.dbAuxData[key.substr(1)] = formDataObj[key];
      continue;
    }
    var fieldvalue = formDataObj[key];

    var attributeName = key;
    var attributeValue = fieldvalue;

    $(ZERP.SFO.formId + '#' + key).filter('input,select,textarea').val(formDataObj[key]);
    // $(ZERP.SFO.formId + '#' + key).filter('input[type=number]').attr('value', formDataObj[key]);
    // $('#link').attr('value', 'new value');

    var EntityAttributes = ZERP.System.EntityStructureObj['Attributes'];
    var thisAttributeProperties = (!!EntityAttributes[key]) ? EntityAttributes[key] : {};

    // Checkbox Handling
    if(!!thisAttributeProperties.HtmlType && thisAttributeProperties.HtmlType == 'checkbox'){
      if(fieldvalue == '1'){
        $(ZERP.SFO.formId + '#' + key).filter('input[type=checkbox]').prop("checked", true);
      } else {
        $(ZERP.SFO.formId + '#' + key).filter('input[type=checkbox]').prop("checked", false);
      }
    }

    // Combobox Handling
    if(!!thisAttributeProperties.HtmlType && thisAttributeProperties.HtmlType == 'combobox'){
      if(!!thisAttributeProperties.data){
        var userFieldValue = thisAttributeProperties.data[formDataObj[key]];
        $(ZERP.SFO.formId + '#' + key).filter('input[type=text]').val(userFieldValue);
      }
    } else if(!!thisAttributeProperties.HtmlType && thisAttributeProperties.HtmlType == 'odDropdownRefObj'){
      if(!!ZERP.System.EntityStructureObj.CodeAttributeDecoVals){
        if(!!ZERP.System.EntityStructureObj.CodeAttributeDecoVals[key]){
          $(ZERP.SFO.formId + ' #' + attributeName).val(ZERP.System.EntityStructureObj.CodeAttributeDecoVals[key]);
        }
      }
      $(ZERP.SFO.formId + ' #' + attributeName+'_code').val(attributeValue);
    }

    // CodeAttributeDecoVals Handling
    // var CodeAttributeDecoVals = (!!ZERP.System.EntityStructureObj['CodeAttributeDecoVals']) ? ZERP.System.EntityStructureObj['CodeAttributeDecoVals'] : {};
    // for (var key in CodeAttributeDecoVals) {
    //   var val = CodeAttributeDecoVals[key];
    //   $(ZERP.SFO.formId).find('div.formGroup_'+key).find('span.SpanDecode').text(val);
    // }

  }

  return true;
}








ZERP.SFO.createEntity_callBackFunction = function(extraParams){
  if(!!!extraParams) return;
  if(!!extraParams.saveAndNewForm && extraParams.saveAndNewForm == true){
    ZERP.SFO.newForm();
  }
}

ZERP.SFO.createEntity = function(entityObj, extraParams){

  var rEntityName = ZERP.System.EntityStructureObj['_entityName'];
  var rRunTime = ZERP.System.EntityStructureObj['rRunTime'];
  var rCopy = (!!ZERP.SFO.isCopy) ? '1' : '0';

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
        alert(returnGB.errormsgs.join('\n'));
        ZERP.SFO.editMode();
        ZERP.SFO.initForm();
        if(returnGB._TransactionStatus == 'fail'){
          jsClient.showErrorMeaasge('Fail to save transaction');
        }
        if(!!returnGB.UserErrorMsgs){
          jsClient.showErrorMeaasge(returnGB.UserErrorMsgs, false);
        } else {
          $('#ZERP_UserAlertCt').empty().append(returnGB.errormsgs.join('\n'));
        }
          
      } else {


        // ZERP.SFO.hideFormInterface();
        ZERP.SFO.createEntity_callBackFunction(extraParams);
        if(returnGB._TransactionStatus == 'success')
          jsClient.showSuccessMeaasge('Successfully save transaction');

      }
    }
  }).fail(function(e) {
    ZERP.Utils.removeProcessingOverlay();
    alert('Saving failed, please try again.');
    ZERP.SFO.editMode();
    console.log(e);
    console.log(e.responseText);
    // $('#ZERP_UserAlertCt').empty().append(e);
    $('#ZERP_UserAlertCt').empty().append(e.responseText);
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
ZERP.SFO.readEntity = function(entityKeys, entityKeyVals, entityKeyValsObj){
  ZERP.rActiveOperation = 'Read';
  
  var _baseStructure = ZERP.System.EntityStructureObj;
  var _SHOWENTITYFORM = (!!_baseStructure['_SHOWENTITYFORM']) ? _baseStructure['_SHOWENTITYFORM'] : 'yes'; // default yes
  if(_SHOWENTITYFORM == 'no') return;

  // if(!!ListMgr.listGridPanelScrolled && ListMgr.listGridPanelScrolled == true){
  //   delete ListMgr.listGridPanelScrolled;
  // }
  
  ZERP.SFO.isCopy = false;
  ZERP.Utils.showProcessinOverlay();


 // from header form
  for (var i = 0; i < entityKeys.length; i++) {
    var entityKey = entityKeys[i];
    var entityVal = $( '.ZERP_HeaderEntryCt' + ' #'+entityKey).val();
    if(entityVal == '' || entityVal == null) continue;
    entityKeyVals.push(entityVal);
    entityKeyValsObj[entityKey] = entityVal;
  }


  ZERP.SFO.showFormInterface();
  ZERP.SFO.makeUserEntryForm();
  ZERP.SFO.adjustFormInterface();
  setTimeout(function() {
    ZERP.SFO.adjustFormInterface();
  }, 500);

  ZERP.SFO.handleGenericToolbarButtons_formReadMode();
  
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
    $('#ZERP_UserAlertCt').empty().append(e.responseText);
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
        // ZERP.SFO.newForm('read');
        var ReadBean = data.ReadBean;
        ZERP.SFO.makeUserEntryForm();
        ZERP.SFO.initForm('read');
        ZERP.SFO.fillForm(ReadBean);
        ZERP.SFO.initForm('read');
        ZERP.SFO.readMode();
        
        // ZERP.UIMgr.removeZERPmainContainerScrollable();
        ZERP.Utils.removeProcessingOverlay();
        // window.scrollTo(0, 0);
    } else {
      ZERP.SFO.editMode();
      alert('Document not found.');
    }
  }

}



/**
 * [createEntity_callBackFunction description]
 * @param  {[type]} extraParams [description]
 * @return {[type]}             [description]
 */
ZERP.SFO.updateEntity_callBackFunction = function(extraParams){
  if(!!!extraParams) return;
  if(!!extraParams.saveAndNewForm && extraParams.saveAndNewForm == true){
    ZERP.SFO.newForm();
  }
}

ZERP.SFO.updateEntity = function(entityObj, extraParams){
  ZERP.Utils.showProcessinOverlay();

  var baseStructure = ZERP.System.EntityStructureObj;
  var entityKeys = ZERP.System.EntityStructureObj['entityKeys'];
  var entityKeyVals = [];
  var entityKeyValsObj = {};

  // from main from
  for (var i = 0; i < entityKeys.length; i++) {
    var entityKey = entityKeys[i];
    var entityVal = $( ZERP.SFO.formId + ' #'+entityKey).val();
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
    success: function(returnGB) {
      ZERP.Utils.removeProcessingOverlay();

      returnGB = JSON.parse(returnGB);

      if(!!returnGB.SessionExpired){
        alert('Your session has expired. \nClick OK to login again');
        // window.location.href = '/user/index.php';
        window.location.href = "${request.contextPath}/authentication/login";
        // window.open('/user/index.php');
        return;
      } else if(!!returnGB.errormsgs && returnGB.errormsgs.length > 0) {
        console.log(returnGB.errormsgs.join('\n'));
        alert(returnGB.errormsgs.join('\n'));
        ZERP.SFO.editMode();
        ZERP.SFO.initForm();
        if(returnGB._TransactionStatus == 'fail'){
          jsClient.showErrorMeaasge('Fail to save transaction');
        }
        if(!!returnGB.UserErrorMsgs){
          jsClient.showErrorMeaasge(returnGB.UserErrorMsgs, false);
        }

      } else {
        // ZERP.SFO.updateEntity_handleOwnHeader(returnGB);
        ZERP.SFO.hideFormInterface();
        ZERP.SFO.updateEntity_callBackFunction(extraParams);
        if(returnGB._TransactionStatus == 'success')
          jsClient.showSuccessMeaasge('Successfully save transaction');
      }

    }
  }).fail(function(e) {
    ZERP.Utils.removeProcessingOverlay();
    alert('Saving failed, please try again.');
    ZERP.SFO.editMode();

    console.log(e.responseText);
    // $('#ZERP_UserAlertCt').empty().append(e);
    $('#ZERP_UserAlertCt').empty().append(e.responseText);
  });

  return;  

}



/**
 * [deleteEntity description]
 * @return {[type]} [description]
 */
ZERP.SFO.deleteEntity = function(){
  var r = confirm('Are you sure want to delete this item?');
  if(!r) return;
  
  if( $('#ZERP_formGridPanel').css('display') == 'none'){
    return;
  }

  var baseStructure = ZERP.System.EntityStructureObj;
  var entityKeys = ZERP.System.EntityStructureObj['entityKeys'];
  var entityKeyVals = [];
  var entityKeyValsObj = {};

  // from main from
  for (var i = 0; i < entityKeys.length; i++) {
    var entityKey = entityKeys[i];
    var entityVal = $( ZERP.SFO.formId + ' #'+entityKey).val();
    if(entityVal == '' || entityVal == null) continue;
    entityKeyVals.push(entityVal);
    entityKeyValsObj[entityKey] = entityVal;
  }


  // 2. collect data
  var entityObj = {};
  var _baseStructure = ZERP.System.EntityStructureObj;
  ZERP.SFO.formAttributes = _baseStructure['Attributes'];   
  $.each(ZERP.SFO.formAttributes, function(attributeName, attributeProperties) {
    entityObj[attributeName] = $(ZERP.SFO.formId + ' #' + attributeName).val();
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

      if(!!rGenericBean.errormsgs && rGenericBean.errormsgs.length > 0) {
        console.log(rGenericBean.errormsgs.join('\n'));
        ZERP.SFO.editMode();
        ZERP.SFO.initForm();
        if(rGenericBean._TransactionStatus == 'fail'){
          jsClient.showErrorMeaasge('Fail to save transaction');
        }
        if(!!rGenericBean.UserErrorMsgs){
          jsClient.showErrorMeaasge(rGenericBean.UserErrorMsgs, false);
        }
      }


      if(rGenericBean._TransactionStatus == 'success'){
        jsClient.showSuccessMeaasge('Successfully delete data');
        ZERP.SFO.hideFormInterface();
        ListMgr.redrawList();
      }

    }
  }).fail(function(e) {
    ZERP.Utils.removeProcessingOverlay();
    alert('Saving failed, please try again.');
    ZERP.SFO.editMode();

    console.log(e.responseText);
    // $('#ZERP_UserAlertCt').empty().append(e);
    $('#ZERP_UserAlertCt').empty().append(e.responseText);
  });

}


/**
 * @Al-Mamun
 * @Date: 2019-12-06
 */
ZERP.SFO.collectFormData = function(){

  var formDataObj = {};
  
  var entityAttributes = ZERP.System.EntityStructureObj['Attributes'];

  $.each( entityAttributes, function(attributeName, attributeProperties ) {

    if(!!attributeProperties.AttributeType && attributeProperties.AttributeType == 'UIStyle') return;
    formDataObj[attributeName] = $(ZERP.FrmMgr.genFrm.formId + ' #' + attributeName).val();

    //checkbox
    if(!!attributeProperties.HtmlType && attributeProperties.HtmlType == 'checkbox'){
      var isChecked = $(ZERP.FrmMgr.genFrm.formId + ' #' + attributeName).prop('checked');
      formDataObj[attributeName] = (isChecked === true) ? '1' : '0';
    }

    if(!!attributeProperties.HtmlType && attributeProperties.HtmlType == 'odDropdownRefObj'){
      formDataObj[attributeName] = $(ZERP.FrmMgr.genFrm.formId + ' #' + attributeName+'_code').val();
      formDataObj[attributeName+'_code'] = $(ZERP.FrmMgr.genFrm.formId + ' #' + attributeName+'_code').val();
      formDataObj[attributeName+'_desc'] = $(ZERP.FrmMgr.genFrm.formId + ' #' + attributeName).val();
    }
    
  });

  return formDataObj;

}


/**
 * [saveForm description]
 * @return {[type]} [description]
 */
ZERP.SFO.saveForm = function(){

  alert('Hi i am here....!');

  // 1. validation
  // 2. collect data
  // 3. post data
  //    --- create
  //    --- update
  //    --- delete

  // 1. validation
  var error = false;
  error = error || ZERP.SFO.validateFormContainerFields(ZERP.SFO.formId);
  if(error) return;


  // just to avoid re-entry, the server should also check for double submission
  ZERP.SFO.readMode();

  // before reading any values, make the values of the inputs actually uppercase and not only CSS transformed
  // $(ZERP.SFO.formId).find('input,textarea').each(function(i) {
  //   // if ($(this).css('text-transform') == 'uppercase') $(this).val($(this).val().toUpperCase());
  //   if ($(this).hasClass('ReferenceAttribute')) $(this).val($(this).val().toUpperCase());
  // });

  $(ZERP.SFO.formId).find('input,textarea').each(function(i) {
    if ($(this).hasClass('CapitalCodeAttribute')) $(this).val($(this).val().toUpperCase());
  });


  // 2. collect data
  var entityObj = {};
  var _baseStructure = ZERP.System.EntityStructureObj;
  ZERP.SFO.formAttributes = _baseStructure['Attributes'];   
  $.each(ZERP.SFO.formAttributes, function(attributeName, attributeProperties) {
    entityObj[attributeName] = $(ZERP.SFO.formId + ' #' + attributeName).val();

    //checkbox
    if(!!attributeProperties.HtmlType && attributeProperties.HtmlType == 'checkbox'){
      var isChecked = $(ZERP.SFO.formId + ' #' + attributeName).prop('checked');
      entityObj[attributeName] = (isChecked === true) ? '1' : '0';
    }

    if(!!attributeProperties.HtmlType && attributeProperties.HtmlType == 'odDropdownRefObj'){
      entityObj[attributeName] = $(ZERP.SFO.formId + ' #' + attributeName+'_code').val();
      entityObj[attributeName+'_code'] = $(ZERP.SFO.formId + ' #' + attributeName+'_code').val();
      entityObj[attributeName+'_desc'] = $(ZERP.SFO.formId + ' #' + attributeName).val();
    }
    
  });


  // 3. post data
  if(ZERP.rActiveOperation == 'Update'){
    ZERP.SFO.updateEntity(entityObj);
  } else if(ZERP.rActiveOperation == 'Create') {
    ZERP.SFO.createEntity(entityObj);
  }


}


/**
 * [saveAndNewForm description]
 * @return {[type]} [description]
 * Save form via ajax after validation
 */
ZERP.SFO.saveAndNewForm = function() {
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

  var HAS_OWN_HEADERENTTRY_SESSION = ZERP.System.EntityStructureObj['HAS_OWN_HEADERENTTRY_SESSION'];
  if(!!HAS_OWN_HEADERENTTRY_SESSION && HAS_OWN_HEADERENTTRY_SESSION){
  error = error || ZERP.SFO.validateFormContainerFields('#ZERP_HeaderEntryCt');
    if(error) return;
  }

  error = error || ZERP.SFO.validateFormContainerFields(ZERP.SFO.formId);
  if(error) return;


  // just to avoid re-entry, the server should also check for double submission
  ZERP.SFO.readMode();

  // 2. collect data
  var entityObj = {};
  var _baseStructure = ZERP.System.EntityStructureObj;
  ZERP.SFO.formAttributes = _baseStructure['Attributes'];   
  $.each(ZERP.SFO.formAttributes, function(attributeName, attributeProperties) {

    entityObj[attributeName] = $(ZERP.SFO.formId + ' #' + attributeName).val();

    //checkbox
    if(!!attributeProperties.HtmlType && attributeProperties.HtmlType == 'checkbox'){
      var isChecked = $(ZERP.SFO.formId + ' #' + attributeName).prop('checked');
      entityObj[attributeName] = (isChecked === true) ? '1' : '0';
    }

    if(!!attributeProperties.HtmlType && attributeProperties.HtmlType == 'odDropdownRefObj'){
      entityObj[attributeName] = $(ZERP.SFO.formId + ' #' + attributeName+'_code').val();
      entityObj[attributeName+'_code'] = $(ZERP.SFO.formId + ' #' + attributeName+'_code').val();
      entityObj[attributeName+'_desc'] = $(ZERP.SFO.formId + ' #' + attributeName).val();
    }

  });

  // check has own header entry 
  // if has collect header data
  if(!!HAS_OWN_HEADERENTTRY_SESSION && HAS_OWN_HEADERENTTRY_SESSION){
    var headerObj = ZERP.SFO.collectHeaderData();
    $.each(headerObj, function(key, val){
      entityObj[key] = val;
    });
  }

  // 3. post data
  if(ZERP.rActiveOperation == 'Update'){
    ZERP.SFO.updateEntity(entityObj, extraParams);
  } else if(ZERP.rActiveOperation == 'Create') {
    ZERP.SFO.createEntity(entityObj, extraParams);
  }




}
//******************************************* FORM CRUD FUNCTIONS HANDLING END **********************************************



ZERP.SFO.printFullDocument = function(){
}





$.extend(ZERP.SFO, {
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
    ZERP.SFO.readMode();
    return;
  },
  enableEdit: function() {
    ZERP.SFO.editMode();
    return;
  },
  enableReceive: function() {
    ZERP.SFO.receiveMode();
    return;
  },

  /**
   * Process Purchase Request Form
   * @param selector formId
   * @returns {undefined}
   */
  processForm: function(formId, params) {

    ZERP.SFO.formId = formId + ' ';
    ZERP.SFO.formMode = 'edit';
    ZERP.FrmMgr.genFrm.formId = ZERP.SFO.formId; // lot of methods use from this namespace

    var _baseStructure = ZERP.System.EntityStructureObj;

    // make form and append
  	ZERP.rActiveOperation = 'Create';
  	ZERP.SFO.newForm();
  	$('#ZERP_formGridPanel').css('display', 'block');
  	$('#ZERP_formGridPanel').css('margin-top', '3px');
  	$('#ZERP_listGridPanelFull_scrollerWrapper').empty();
  	$('#ZERP_pgnGridPanelWrapper').empty();
  	$('#ZERP_pgnGridPanelWrapper').css('display', 'none');

    
    // ZERP.SFO.handleGenericToolbarButtons_formHiddenMode(); // default 
    ZERP.SFO.handleGenericToolbarButtons_formNewEntryMode(); // default 

    ZERP.SFO.initCustomJsFunctions();



    /**
     * Generic toolbar buttons action bind
     */
    $(window).keydown(function(e) {
      if (e.ctrlKey || e.metaKey) {
        switch (String.fromCharCode(e.which).toLowerCase()) {
          case 's':
            e.preventDefault();
            $('#upperButtonBar .btnSaveForm').click();
            break;
        }
      }
    });

    $('.btnNew').on('click', function(e) {
      e.preventDefault();
      if( $(this).closest('table').hasClass('x-item-disabled') ) return;
      if(!!ZERP.rActiveOperation) delete ZERP.rActiveOperation;
      ZERP.SFO.newForm();
      // Handle Customize Object If Has?
      ZERP.SFO.callCustomizeObject();
    });    

    $('.btnSaveForm').on('click', function(e) {
      e.preventDefault();
      if( $(this).closest('table').hasClass('x-item-disabled') ) return;
      ZERP.SFO.saveForm();
    });   
    $('.btnSaveAndNew').on('click', function(e) {
      e.preventDefault();
      if( $(this).closest('table').hasClass('x-item-disabled') ) return;
      ZERP.SFO.saveAndNewForm();
    });   

    $(' .btnEnterEditMode').on('click', function(e) {
      e.preventDefault();
      if( $(this).closest('table').hasClass('x-item-disabled') ) return;
      if(!!ZERP.rActiveOperation) delete ZERP.rActiveOperation;
      ZERP.rActiveOperation = 'Update';
      ZERP.SFO.editMode();
      ZERP.SFO.handleGenericToolbarButtons_formEditMode();
      ZERP.SFO.initForm('edit');
    });

    $('.btnCopyAndNew').on('click', function(e) {
      e.preventDefault();
      if( $(this).closest('table').hasClass('x-item-disabled') ) return;
      ZERP.SFO.copyAndNewModeForm();
    });   



    $('.btnDelete').on('click', function(e) {
      e.preventDefault();
      if( $(this).closest('table').hasClass('x-item-disabled') ) return;
      ZERP.SFO.deleteEntity();
    });   

    $('.btnExportToExcel').on('click', function(e) {
      e.preventDefault();
      if( $(this).closest('table').hasClass('x-item-disabled') ) return;
      ZERP.SFO.exportToExcel();
    });    

    $('.btnBack').on('click', function(e) {
      e.preventDefault();
      if( $(this).closest('table').hasClass('x-item-disabled') ) return;
      ZERP.SFO.goBackToParentSession();
    });    

    $(' .btnPrint').on('click', function(e) {
      e.preventDefault();
      var params = jsClient.paramsToObj(window.location.search);
    });



    $(ZERP.SFO.formId + ' .btnNext').on('click', function(e) {
      e.preventDefault();
      var docnumber = $(ZERP.SFO.formId + ' #docnumber').val();
      var next_href = window.location.origin + window.location.pathname + '?doctype=FL&formtype=default&dprnumber=' + docnumber + '&tabcontent=1';
      window.location.href = next_href;
      // ZERP.SFO.newForm();
    });     


    $('.btnCancelForm').on('click', function(e) {
      e.preventDefault();
      ZERP.SFO.hideFormInterface();
    });



    return;
  }
});
