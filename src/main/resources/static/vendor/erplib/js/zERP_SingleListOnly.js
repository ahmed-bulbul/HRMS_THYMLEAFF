// Require
// 1. ZERPTemplateMgr.js
// 2. jsCllient.js

/*
  ======== All Functions at a Glance ========
ZERP.SLO.initList = function()
ZERP.SLO.redrawList = function()
ZERP.SLO.getListData = function(numRecords, pageNum, apiURL, searchParams)
ZERP.SLO.sendBackSearchChoice = function(thisRow)
ZERP.SLO.exportToExecl = function()
ZERP.SLO.enableExcelMode = function()
ZERP.SLO.applyCustomListCSS = function()
ZERP.SLO.displayQueryData = function(jsonData)
ZERP.SLO.makeTable = function(jsonData,hasData) {
ZERP.SLO.getSearchData = function()
ZERP.SLO.initSearchAction = function()
ZERP.SLO.changeTempleteCSS = function()
ZERP.SLO.checkAndRetriveSearchData = function()
ZERP.SLO.generateFirstHeaderTr = function()
ZERP.SLO.setPriviousSearchParams = function(searchParams)
ZERP.SLO.handleThisSearchInputFieldClick = function(thisf)
ZERP.SLO.resetDateSearchField = function(thisf)
ZERP.SLO.handleCustomSearch = function(thisf)
ZERP.SLO.closeExpandDiv = function(thisf)
ZERP.SLO.initDisApprear = function()
ZERP.SLO.resetCustomSearchField = function(thisf)
ZERP.SLO.submitCustomSearchField = function(thisf,compositeFieldName)
ZERP.SLO.makeHTML_InputField = function(fieldname,fieldprop,fieldvalue,count)
ZERP.SLO.makeDropdownOptions = function(field, defaultval, fieldprop) {
ZERP.SLO.clearSearchData = function()
ZERP.SLO.handleLineChooserCheckboxClick = function(thisf)
ZERP.SLO.actionButton = function()
ZERP.SLO.closeISWEMsg = function(thisf)
ZERP.SLO.makePagination = function(jsonData)
ZERP.SLO.makeRowLimit = function(show)
ZERP.SLO.changeDisplayRowCount = function(numRecords) {
ZERP.SLO.getPagination = function(showLimit, rows, page) 
ZERP.SLO.paginationCSS = function()
*/



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
 * Declare ZERP Namespace if not exist
 */
// Declare NameSpace
var ZERP = ZERP || {};
ZERP.SLO = ZERP.SLO || {};

$.extend(ZERP.SLO, {
  rEntityName: '',
  mUrl: 'api/server_api',
  mType: 'get',
  mData: '',
  mAsync: false,
  mReqType: '',
  queryData: '',
  queryParam: '',
  _searchParams: '',
  _sessionCall: false,  
  _URL_API: 'list_docname_api',
  isEnableExcelMode: false,
  populateLibCache: [],
  libraryColumns: {},

  foo: 'here for no reason other than to be the last line, without a comma'
});



ZERP.SLO.processList = function(listparams){
  var listApiURL = listparams['listApiURL'];
  var rEntityName = listparams['rEntityName'];
  ZERP.SLO.rEntityName = rEntityName;
  ZERP.SLO._URL_API = listApiURL;


  // ZERP.SLO._baseStructure = listparams['_baseStructure'];
  ZERP.SLO._baseStructure = JSON.stringify(ZERP.System.EntityStructureObj);

  // ZERP.System.EntityStructureObj = JSON.parse(ZERP.SLO._baseStructure);
  ZERP.SLO.EntityAttributes = ZERP.System.EntityStructureObj['Attributes'];

  var searchParams = {rEntityName: ZERP.System.rEntityName};
  //                  show,   page,   api_url
  ZERP.SLO.getListData(20,     1,      ZERP.System.rRequestApiUrl, searchParams);

  ZERP.SLO.initButtonAction();


  // _drawFixedRightSideForm if have for handling some [user entry] header data
  if(!!ZERP.System.EntityStructureObj['_drawFixedRightSideForm'] && ZERP.System.EntityStructureObj['_drawFixedRightSideForm'] == 1){
    // alert(ZERP.System.EntityStructureObj['_drawFixedRightSideForm'])
    ZERP.SLO.drawFixedRightSideUserEntryForm();
  }

}


ZERP.SLO.preListDocSettings = function(){
  // Enable Line entry form
  // define

  // ZERP.SLO.enableListLineEditForm = false;
  // ZERP.SLO.enableListLineEditForm = true;
  // ZERP.SLO.enableNewListLineEntryForm = true;


  // ZERP.SLO.showFirstOptionTd = true;
  // ZERP.SLO.showLineChooserBtn = true;

  // ZERP.SLO.lineEditEntryMode = false;


  ZERP.SLO.enableListLineEditForm = false;
  ZERP.SLO.enableNewListLineEntryForm = false;


  ZERP.SLO.showFirstOptionTd = false;
  ZERP.SLO.showLineChooserBtn = false;

  ZERP.SLO.lineEditEntryMode = false;


  var _pattern = ZERP.System.EntityStructureObj['_pattern'];
  if(_pattern == "ChooserSession"){
  	ZERP.SLO.showLineChooserBtn = true;
  }

  
}

ZERP.SLO.callCustomizeFunctionBeforeTableResize = function(){}
ZERP.SLO.callCustomizeFunctionAfterRenderList = function(){}

ZERP.SLO.postListDocSettings = function(){
  // execute

  // $("#listTable tr").find("th:first").css('display', 'none');
  // $("#listTable tr").find("td:first").css('display', 'none');
  if(!ZERP.SLO.enableListLineEditForm){
    $("#listTable tr").find("th:nth-child(2)").css('display', 'none');
    $("#listTable tr").find("td:nth-child(2)").css('display', 'none');
  }
  if(!ZERP.SLO.enableListLineEditForm){
    $("#listTableSearchForm tr").find("td:nth-child(2)").css('display', 'none');
  }
  if(!ZERP.SLO.showFirstOptionTd){
    $("#listTableSearchForm tr").find("th:nth-child(2)").css('display', 'none');
    $("#listTableSearchForm tr").find("td:nth-child(2)").css('display', 'none');
  }
  if(!ZERP.SLO.showLineChooserBtn){
    $("#listTableSearchForm tr").find("th:nth-child(1)").css('display', 'none');
    $("#listTableSearchForm tr").find("td:nth-child(1)").css('display', 'none');
    $("#listTable tr").find("td:nth-child(1)").css('display', 'none');
    $("#listTable tr").find("th:nth-child(1)").css('display', 'none');
  }

  if(ZERP.SLO.enableNewListLineEntryForm){
     ZERP.SLO.makeLineEntryForm();
  }


  // syncronus method, after table draw----------------------------
  ZERP.SLO.callCustomizeFunctionBeforeTableResize();
  ZERP.SLO.searchHeaderTableResizeMaker();
  ZERP.SLO.changeThirdPartyTempleteCSS();
  ZERP.SLO.initTableTdResizeAction();

  // 2019-02-21
  ZERP.UIMgr.setZERPmainContainerHeight();
  ZERP.SLO.callCustomizeFunctionAfterRenderList();

}



ZERP.SLO.drawFixedRightSideUserEntryForm = function(){
  return // just proto // override in child if needed
}


ZERP.SLO.exportToExcel = function(){
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
      if(!!ZERP.SLO.libraryColumns[inputName]){
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
  var rEntityName = ZERP.System.EntityStructureObj['ENTITY_NAME'];
  var expURL = ZERP.System.rRequestApiUrl + '?rReqType=exportListData&rRunTime=0&rEntityName=' + rEntityName + '&' + qrystr;
  window.open(expURL);
}



ZERP.SLO.initButtonAction = function(){
  
  // $('.btnNew').on('click', function(e) {
  //   e.preventDefault();
  //   if( $(this).closest('table').hasClass('x-item-disabled') ) return;

  //   var next_href = '/dev/39772/reqdoc/main.php?rEntityName=RequisitionDocumentObj&rHeaderID=__new__';
  //   // window.open(next_href);
  //   window.location.href = next_href;

  // });    


  // $('.btnExportToExcel').on('click', function(e) {
  //   e.preventDefault();
  //   if( $(this).closest('table').hasClass('x-item-disabled') ) return;
  //   ZERP.SLO.exportToExcel();
  // });    

}

ZERP.SLO.changeThirdPartyTempleteCSS = function(){

  // below code is default
  // ////////////////////////////////////////////
  var windowWidth = window.innerWidth
  || document.documentElement.clientWidth
  || document.body.clientWidth;

  var windowHeight = window.innerHeight
  || document.documentElement.clientHeight
  || document.body.clientHeight;

  var screenWidth = screen.width;
  var screenHeight = screen.height 

  var www = $('#listTable').width(); // which element is max width
  var minwidth = www;
  www = www + 50;

  var bodye = $('body');
  var bodywidth = bodye.width ();
  if (bodywidth < minwidth){   
    // bodye.css({'background-size': www+'px 100%'});
    // $('body').css({'min-width':www+'px'});
    // $('.container').css({
    //   'margin-left': '20pt',
    // });
  }
  //////////////////////////////////////////////

  return;
}


ZERP.SLO.redrawList = function(){
  // if(!!something) delete something;
  // ZERP.SLO.getListData('50', '1');
  var pagenum = $('#pagination').find('span.current').text();
  var lineperpage = $('#divRowLimit').find('select[name=show]').val();
  if(!!!pagenum) pagenum=1;
  if(!!!lineperpage) lineperpage=10;

  var searchParams = ZERP.SLO.checkAndRetriveSearchData();
  searchParams.rEntityName = ZERP.SLO.rEntityName;

  ZERP.SLO.getListData( lineperpage, pagenum, ZERP.SLO._URL_API, searchParams);

  delete ZERP.SLO.selectedLineInfo;
}

ZERP.SLO.initList = function(){
  if(!!ZERP.SLO._searchParams){
    ZERP.SLO.setPriviousSearchParams(ZERP.SLO._searchParams);
  }
    ZERP.SLO.ajaxRequestMonitorThread();
  ZERP.SLO.getHeaderData();
}




ZERP.SLO.ajaxRequestMonitorThread = function(){

  // Ajax monitoring-------------------------------------------------------------
  // $(document).ajaxSuccess(function() {
  //   alert("An individual AJAX call has completed successfully");
  // });

  $( document ).ajaxComplete(function( event, xhr, settings ) {
    // if ( settings.url === "ajax/test.html" ) {
      //console.log("Triggered ajaxComplete handler. The result is " + xhr.responseText);
    // }
    $(this).unbind("ajaxComplete");
  });

  $( document ).ajaxStart(function() {
    console.log('Triggered ajaxStart handler.');
    $(this).unbind("ajaxStart");
  });

  $(document).ajaxStop(function () {
    // 0 === $.active
    console.log('all ajax are stopped');


    // if(ZERP.SLO.enableNewListLineEntryForm){
    //   ZERP.SLO.makeLineEntryForm();
    // }

    //*** VIP
    $(this).unbind("ajaxStop");
    //Some code
  });


}





ZERP.SLO.sendBackSearchChoice = function(thisRow){
  var docnumber = $(thisRow).find('td[fieldname=docnumber]').text();
  // alert(docnumber);
  // $("#item",window.parent.document).val(docnumber); 
  window.parent.sendBackSearchChoiceToForm(docnumber);
}


/**
 * How to use 
 * just call this function
 */
ZERP.SLO.initSearchAction = function(){
    // $('#searchForm input').keypress(function (event) {
    //     if (event.which == 13) {
    //         ZERP.SLO.getSearchData();        
    //     }
    // });
    // if($('#listTableSearchForm').length > 0) return;
    // $('#searchForm input').keyup(function (event) {
    $('#searchForm input').off('keyup').on('keyup',function(event){
        if (event.which == 13) {
            ZERP.SLO.getSearchData();        
        }
    });
}

ZERP.SLO.checkAndRetriveSearchData = function(){
    var searchParams = {};
    $('table#listTableSearchForm thead tr').each(function() {
        $(this).find("td input:text, input:hidden,select").each(function() {
            textVal = this.value;
            inputName = $(this).attr("name");
            if(!!inputName && textVal != ""){
              searchParams[inputName] = textVal;
            }
        });
    });
    return searchParams;
}


/**
 * [getListData description]
 * @param  {[type]} numRecords   [description]
 * @param  {[type]} pageNum      [description]
 * @param  {[type]} apiURL       [description]
 * @param  {[type]} searchParams [description]
 * @return {[type]}              [description]
 *
 * fetching records =========================================================================================================
 */
ZERP.SLO.getListData = function(numRecords, pageNum, apiURL, searchParams) {

  var numRecords = (!!numRecords && numRecords != '') ? numRecords : '10';
  var pageNum    = (!!pageNum && pageNum != '') ? pageNum : '10';
  var apiURL     = (!!apiURL && apiURL != '') ? apiURL : ZERP.SLO._URL_API;

  if(!!ZERP.SLO.rActiveEqb){
    searchParams.rActiveEqb = ZERP.SLO.rActiveEqb;
  }


  if(!!!searchParams){
    // check search field value is exist 
    // user may click in pagination page after search
    searchParams = ZERP.SLO.checkAndRetriveSearchData();
  }
  var searchParams = (!!searchParams && Object.keys(searchParams).length > 0)? searchParams : {};

  var inputPlusUrlSearchParams = {};
  $.each(searchParams, function(key, val){
    inputPlusUrlSearchParams[key] = val; // push input search param
  });

  searchParams['showLimit'] = numRecords;
  searchParams['pageNum'] = pageNum;
  searchParams['rReqType'] = 'getListData';

  var urlSearchParams = (!ZERP.SLO._sessionCall) ? jsClient.paramsToObj(window.location.search) : {}
  if( Object.keys(urlSearchParams).length > 0 ){
      // var inputSearchParams = (!!ZERP.SLO._searchParams && ZERP.SLO._searchParams.length > 0) ? JSON.parse(ZERP.SLO._searchParams) : {};
    // var inputPlusUrlSearchParams = (Object.keys(inputSearchParams).length > 0) ? inputSearchParams : {};
    $.each(urlSearchParams, function(key, val){
      searchParams[key] = val; // push url search data in search param object
      inputPlusUrlSearchParams[key] = val; // push url search data in search param object
    });
  }
  if( Object.keys(inputPlusUrlSearchParams).length > 0 ){
    ZERP.SLO._searchParams = JSON.stringify(inputPlusUrlSearchParams);
  }

    $.ajax({
      type: "GET",
      url: apiURL,
      data: searchParams,
      cache: false,
      beforeSend: function() {
          // $('#ZERPDataLoadingPanel').html('<center><img src="lib/assets/img/loading_spinner.gif"></center>');
          ZERP.Utils.showProcessinOverlay();
      },
      success: function(jsonData) {
        // $('#ZERPDataLoadingPanel').html('');
        ZERP.Utils.removeProcessingOverlay();

        var data = JSON.parse(jsonData);
        if(!!data.SessionExpired){
          alert('Your session has expired. \nClick OK to login again');
          window.location.href = '/user/index.php';
          return;
        } 

          var parseData = JSON.parse(jsonData);
          ZERP.SLO.displayQueryData(jsonData);
          if(!!ZERP.FrmMgr.ListFeedback){ZERP.FrmMgr.FeedbackResponseFromList();};
      }
    }).fail(function(e) {
      ZERP.Utils.removeProcessingOverlay();
      console.log(e);
      console.log(e.responseText);
      // $('#ZERP_UserAlertCt').empty().append(e.responseText);
      jsClient.renderFormError(e.responseText);
    });

}


ZERP.SLO.displayQueryData = function(jsonData){

  ZERP.SLO.preListDocSettings();

  var pagination = ZERP.SLO.makePagination(jsonData)

  var data = JSON.parse(jsonData);
  ListMgr.ListJsonObjData = data; // use it

  var hasData = (data.noResult) ? 'no' : 'yes';
  var listTable = ZERP.SLO.makeTable(jsonData, hasData);

  // $("#listCntrDiv").append(listTable);
  $("#ERP_pgnGridPanel").html(pagination);
  $("#listCntrDiv #listTableWrapper").html(listTable);
  ZERP.SLO.initSearchAction();

  ZERP.SLO.paginationCSS();
  ZERP.SLO.applyCustomListCSS();
  // ZERP.SLO.changeTempleteCSS();
  ZERP.SLO.initList();

  ZERP.SLO.postListDocSettings();

  ZERP.ListMgr.GenList.setListHeightWidth();


}



ZERP.SLO.generateFirstHeaderTr = function(){
  return $tr;
}

ZERP.SLO.handleThisSearchInputFieldClick = function(thisf){
}



ZERP.SLO.handleCustomSearch = function(thisf){
  if($('#listDOCExpandDivID').length) $('body').find('#listDOCExpandDivID').remove();
  
  var customSearchFiedlName = $(thisf).closest('td').prop('class');
  if(!!ZERP.SLO.compositeColumns[customSearchFiedlName]){
    if(!!ZERP.SLO.compositeColumns[customSearchFiedlName][customSearchFiedlName]){ //its already single
      if(!!!ZERP.SLO.compositeColumns[customSearchFiedlName][customSearchFiedlName]['customsearch'])  return;
      // if(!!ZERP.SLO.compositeColumns[customSearchFiedlName][customSearchFiedlName]['customsearch']  && ZERP.SLO.compositeColumns[customSearchFiedlName][customSearchFiedlName]['hidefromcsearch'])  return;
    }
  } 

  var fieldvalue = $(thisf).closest('td').find('input').val();
  var fieldvalues = fieldvalue.split(',__');  

  var dateSearchDiv = '\
    <div id="listDOCExpandDivID" style="position:relative; display:none;">\
    <div class="customSearchExpand ListMgrExpandDiv" style="position:absolute; background:white; min-width:300px; padding:10px; padding-bottom:25px;">\
    <div style="float:right;">\
    <button type="button" onclick="ZERP.SLO.closeExpandDiv(this);"><img src="lib/img/cancel.png" alt="" height="10" width="10"></button>\
    </div>\
    <div style="clear:both;"></div>\
    <form id="customSearchForm">\
    <table>';

    count = 0;
    $.each(ZERP.SLO.compositeColumns[customSearchFiedlName],function(fieldname,fieldprop){
      dateSearchDiv += ZERP.SLO.makeHTML_InputField(fieldname,fieldprop,fieldvalue,count);
      count++;
    });

    dateSearchDiv +='<tr><td colspan="3" style="text-align:right;">\
      <button type="button" onclick="ZERP.SLO.submitCustomSearchField(this,\''+customSearchFiedlName+'\');">Search</button>\
        &nbsp;&nbsp;&nbsp;\
        <button type="button" onclick="ZERP.SLO.resetCustomSearchField(this);">Reset</button>\
      </td></tr>\
      </table>\
      </form>\
      </div>\
      </div>';
  $(thisf).closest('td').append(dateSearchDiv);
  $('#listDOCExpandDivID').fadeIn('slow');
  jsClient.initDateTimePicker();

}

ZERP.SLO.closeExpandDiv = function(thisf){
  if($('#listDOCExpandDivID').length) $('body').find('#listDOCExpandDivID').remove();
}



ZERP.SLO.resetCustomSearchField = function(thisf){
  var fieldname = $(thisf).attr('destinationAttribute');
  $('#listTableSearchForm #searchForm').find('td[fieldname='+ fieldname +']').find('input, select').val('');
  $('body').find('#listDOCExpandDivID').remove();
  ZERP.SLO.getSearchData();

  // var fieldname = $(thisf).parent().parent().parent().parent().parent().parent().parent(). parent().prop('class');
  // $(thisf).parent().parent().parent().parent().parent().parent().parent(). parent().find('center input').val('');
  // $('body').find('#listDOCExpandDivID').remove();
  // ZERP.SLO.getSearchData();
}



ZERP.SLO.submitCustomSearchField = function(thisf,compositeFieldName){
  var fieldname = $(thisf).attr('destinationAttribute');
  var thisForm = $('#customSearchForm');
  var searchParams = jsClient.formToSerializeObject(thisForm);

  var countFieldWithValue = 0;
  $.each(searchParams, function(fieldname, fieldvalue){
    countFieldWithValue++;
  });
  if(countFieldWithValue == 0) return;

  var customSearchValue = "";
  // var compositeFields = ZERP.SLO.compositeColumns[compositeFieldName];
  if(!!ZERP.SLO.compositeColumns[compositeFieldName]){
    for (var fieldname in compositeFields) {
      var fieldprop = compositeFields[fieldname];
      // if(!!fieldprop.hidefromcsearch && fieldprop.hidefromcsearch == true) continue;
      if(!!fieldprop.type && fieldprop.type == 'date'){
        var formdate = (searchParams[fieldname+'_from']);
        var todate = (searchParams[fieldname+'_to']);
        fieldvalue = formdate + '_to_' + todate;
        customSearchValue += (formdate != '' && todate != '') ? fieldvalue + ',__' : ',__';
      } else {
        customSearchValue += (!!searchParams[fieldname]) ? searchParams[fieldname] + ',__' : ',__'; // separate by , and two underscore
      }
    }

  } else {

    var formdate = (searchParams[fieldname+'_from']);
    var todate = (searchParams[fieldname+'_to']);
    fieldvalue = formdate + '_to_' + todate;
    customSearchValue += (formdate != '' && todate != '') ? fieldvalue + ',__' : ',__';
  }


  var customSearchValue = customSearchValue.slice(0,-3);
  var fieldvalue = customSearchValue;
  $('#listTableSearchForm #searchForm').find('td[fieldname='+ fieldname +']').find('input, select').val(fieldvalue);
  $('body').find('#listDOCExpandDivID').remove();
  ZERP.SLO.getSearchData();

}

ZERP.SLO.makeHTML_InputField = function(fieldname,fieldprop,fieldvalue,count){}




ZERP.SLO.genereicDropdownOptionsMaker = function(fieldname, defaultval, fieldproperties) {
  if( !!!fieldproperties.datasource && !!!fieldproperties.library && !!!fieldproperties.sql ) return;
  var showkeys = false;

  var options = '<option value="">Select</option>';
  if(!!fieldproperties.datasource){
    var setasdefault = 'selected';
    $.each(fieldproperties.datasource, function(index, value) {
      setasdefault = (!!defaultval && (value == defaultval || index == defaultval)) ? 'selected' : '';
      options += '<option value="' + index + '" '+ setasdefault +'>' + value + '</option>';
    });
    return options;
  }

  // Check cache 
  if(!!fieldproperties.library){
    if(ZERP.SLO.populateLibCache[fieldproperties.library]){
      var cacheData = ZERP.SLO.populateLibCache[fieldproperties.library];
      var setasdefault = 'selected';
      $.each(cacheData, function(index, value) {
        setasdefault = (!!defaultval && (value == defaultval || index == defaultval)) ? 'selected' : '';
        options += '<option value="' + index + '" '+ setasdefault +'>' + value + '</option>';
      });
      return options;
    }
  }
  

  // prepare ajax retquest to take data from server
  var baseStructure = JSON.parse( ZERP.SLO._baseStructure );
  var _URL_MODULEDIR = baseStructure['_URL_MODULEDIR'];

  var url_pathname  = window.location.pathname;
  var url_pathnames = url_pathname.split('/');
  var maindir = url_pathnames[1];

  // var xurl = ( fieldproperties.hasOwnProperty('syslib') ) ? _URL_MODULEDIR + '/api/sys_library_api.php' : _URL_MODULEDIR + '/api/pdm_library_api.php';
  var xurl = ( fieldproperties.hasOwnProperty('syslib') ) ? '/'+maindir+'/api/sys_library_api.php' : '/'+maindir+'/api/pdm_library_api.php';

  if(fieldproperties.hasOwnProperty('library')){
    var libraryname = fieldproperties['library'];
    var xsearchParams = {};
    xsearchParams.library = libraryname;
    if(fieldproperties.hasOwnProperty('onlydesc')) xsearchParams.onlydesc = true;

    $.ajax({
      async :   false,
      type  :   'GET',
      url   :   xurl,
      data  :   xsearchParams,
      success :   function(data){
        var data = JSON.parse(data);
        var setasdefault = 'selected';
        $.each(data, function(index, value) {
          setasdefault = (!!defaultval && (value == defaultval || index == defaultval)) ? 'selected' : '';
          if (!!showkeys && showkeys === true && index != value) {
            options += '<option value="' + v + '">' + v + '</option>';
          } else {
            options += '<option value="' + index + '" '+ setasdefault +'>' + value + '</option>';
          }
        });
        return options;
      },
      error :   function(){
        alert("error");
        return;
      }
    });

    return options;

  }


}




// CSS added by Mamun
ZERP.SLO.changeTempleteCSS = function(){

  var windowWidth = window.innerWidth
  || document.documentElement.clientWidth
  || document.body.clientWidth;

  var windowHeight = window.innerHeight
  || document.documentElement.clientHeight
  || document.body.clientHeight;

  var screenWidth = screen.width;
  var screenHeight = screen.height 
  // alert('screen width*height = ' + screenWidth + '*' + screenHeight);

  var www = $('#listTable').width(); // which element is max width
  var minwidth = www;
  // var minheight = 1024;

  var bodye = $('body');
  var bodywidth = bodye.width ();
  if (bodywidth < minwidth){   
    // bodye.css({'background-size': www+'px 100%'});

    // // Previous
    // $('#header-wrapper .container .row').css({'min-width':www+'px'});
    // $('#main-wrapper .container .row #content').css({'min-width':www+'px'});

    // // Now
    // // $('body').css({'min-width':www+'px', 'width':www+'px'});
    // $('body').css({'min-width':www+'px'});
    // $('.container').css({
    //   'margin-left': '10pt',
    //   'margin-right': '10pt',
    // });

  } else {   
  }

}

ZERP.SLO.clearSearchData = function(){
  delete ZERP.SLO._searchParams;
  $('table#listTableSearchForm thead tr').each(function() {
      $(this).find("td input:text, input:hidden,select").each(function() {
          $(this).val('');
      });
  });

  // 2019-05-02: Push search data in URL
  var params = jsClient.paramsToObj(window.location.search);
  if(!!!params.rQueryFromFather){ // it just applicable for header not in child entity.
    for (var key in params) {
      if(key == 'rEntityName' || key == 'rReqType' || key == 'rRunTime') continue;
      delete params[key];
    }
  }
  var queryString = jsClient.paramsToQueryString(params);
  var currURL = window.location.pathname + '?' + queryString;
  // history.pushState(state, pageTitle, url);
  window.history.pushState('', 'Title', currURL); 

  ZERP.SLO.getListData('20', '1');
}
/**
* List template code end ================================================================================================================================================================
*/



/**
* Custom code------------------------------------------------------------------------------------------------------
*/
ZERP.SLO.handleLineChooserCheckboxClick = function(thisf){
  var thisrow = $(thisf).closest('tr').attr('data-id');
  console.log(thisrow);
  var docnumber = $(thisf).closest('tr').find('td[fieldname=docnumber] .ccell3 a').text();
  // var bomlinestatus = $(thisf).closest('tr').find('td[fieldname=bomlinestatus]').text();

  var chooserType = $(thisf).prop('class');
  if(chooserType == 'multipleLineChooser'){
    // define array
    if(!!!ZERP.SLO.selectedLineInfo){
      ZERP.SLO.selectedLineInfo  = {};
      ZERP.SLO.selectedLineInfo.uniquekey = [];
      ZERP.SLO.selectedLineInfo.docnumber = [];
    } 
    if($(thisf).prop('checked')){
      $(thisf).prop('checked', true);
      // push data in array
      ZERP.SLO.selectedLineInfo.uniquekey.push(thisrow);
      ZERP.SLO.selectedLineInfo.docnumber.push(docnumber);

    } else {
      $(thisf).prop('checked', false);
      var index = ZERP.SLO.selectedLineInfo.uniquekey.indexOf(thisrow);
      // pop data in array
      ZERP.SLO.selectedLineInfo.uniquekey.splice(index, 1);
      ZERP.SLO.selectedLineInfo.docnumber.splice(index, 1);
      console.log(JSON.stringify(ZERP.SLO.selectedLineInfo.docnumber) + '---' + index);
    }


  } else if (chooserType == 'singleLineChooser'){

    if($(thisf).prop('checked')){
      $('.singleLineChooser').prop('checked', false);
      $(thisf).prop('checked', true);

      delete ZERP.SLO.docnumber;
      delete ZERP.SLO.bomlinestatus;
      // define variable
      if(!!!ZERP.SLO.docnumber) ZERP.SLO.docnumber = docnumber;
      if(!!!ZERP.SLO.bomlinestatus) ZERP.SLO.bomlinestatus = 'xxxx';

    } else {
      $(thisf).prop('checked', false);
      delete ZERP.SLO.docnumber;
      delete ZERP.SLO.bomlinestatus;
    }
  }


}

/**
 * [handleLineChooserSelectAll description]
 * @param  {[type]} thisf [description]
 * @return {[type]}       [description]
 */
ZERP.SLO.handleLineChooserSelectAll = function(thisPtr){
  if($(thisPtr).prop('checked')){
    $(thisPtr).prop('checked', true);

    // define array
    if(!!!ZERP.SLO.selectedLineInfo){
      ZERP.SLO.selectedLineInfo  = {};
      ZERP.SLO.selectedLineInfo.uniquekey = [];
      ZERP.SLO.selectedLineInfo.docnumber = [];
    }

    // looping data row
    $('#listTableWrapper #listTable tbody tr').each(function(indx, thisTr){
      $(thisTr).find("td:nth-child(1)").find('input[type=checkbox]').prop('checked', true);
      var thisrow = $(thisTr).closest('tr').attr('data-id');
      var docnumber = $(thisTr).closest('tr').find('td[fieldname=docnumber] div span.dbvalue').text();

      // push data in array
      ZERP.SLO.selectedLineInfo.uniquekey.push(thisrow);
      ZERP.SLO.selectedLineInfo.docnumber.push(docnumber);
    });


  } else {
    $(thisPtr).prop('checked', false);
    $('#listTableWrapper #listTable tbody tr').find("td:nth-child(1)").find('input[type=checkbox]').prop('checked', false);
    delete ZERP.SLO.selectedLineInfo;
  }
  console.log(JSON.stringify(ZERP.SLO.selectedLineInfo));

}


ZERP.SLO.handleLineChooserSubmitClick = function(){
  
  // $(document).on("click",".btnBarcodeCreatePrint",function(){
  //   var thisPtr = this;

    // 0. Processing post data
    var postData = {};
    postData.header = {};
    postData.lines = [];

    // 1. Header data
    var params = jsClient.paramsToObj(window.location.search);
    postData.header = params; // push all
    // postData.header['TransactionDate'] = params.TransactionDate;
    // postData.header['TransactionTime'] = params.TransactionTime;
    // postData.header['TemplateCode'] = params.TemplateCode;

    // 2. Line data
    // Iteration through line
    var selectedLineCounter = 0;
    $('#listTableWrapper #listTable tbody tr').each(function(indx, thisTr){
      var lineObj = {};

      if ($(thisTr).find("td:nth-child(1)").find('input[type=checkbox]').prop('checked') == true){
        selectedLineCounter++;
        var thisRowId = $(thisTr).attr('data-id');
        console.log('thisRowId-->' + thisRowId);

        $(thisTr).find('td').each(function(){
          var fieldname = $(this).attr('fieldname');
          var fieldvalue = '';

          if($(this).find('div').find('input').length > 0){
            fieldvalue = $(this).find('div #'+fieldname).val();
          }else{
            fieldvalue = $(this).find('div span.dbvalue').text();
          }
          console.log('fieldname: ' + fieldname + '   ---> fieldvalue :' + fieldvalue);

          if(fieldname == 'x-options' || fieldname == 'x-lineformactionbuttons') return true;
          lineObj[fieldname] = fieldvalue;

        });
        postData.lines.push(lineObj);
      } 
    });
    var postDataString = JSON.stringify(postData);

    // 3. Check
    if(selectedLineCounter == 0){
      alert("Please select at least one Line!"); 
      return;
    }


    // 4. Send
    var next_href = window.location.origin + '/zerp09-beta/pkg/edi/ScanPackBarcodeGenerationAndPrintAPI.php' + '?PostDataString=' + postDataString;
    window.location.href = next_href;
    // // window.open('/user/index.php');


    // Goto another page with post methos
    // SRC: https://stackoverflow.com/questions/17378619/navigate-to-another-page-with-post-request-through-link
    // https://stackoverflow.com/questions/19064352/how-to-redirect-through-post-method-using-javascript/27766998
    /*var payload = {
      name: 'John',
      time: '2pm'
    };
    var form = document.createElement('form');
    form.style.visibility = 'hidden'; // no user interaction is necessary
    form.method = 'POST'; // forms by default use GET query strings
    form.action = 'index.html';
    for (key in Object.keys(payload)) {
      var input = document.createElement('input');
      input.name = key;
      input.value = payload[key];
      form.appendChild(input); // add key/value pair to form
    }
    document.body.appendChild(form); // forms cannot be submitted outside of body
    form.submit(); // send the payload and navigate*/

  // });


}







ZERP.SLO.actionButton = function(){

  if ( $('#listSuccessDiv').css('display') == 'none' ){

    var cloneDiv = $('#listSuccessDiv').clone();
    cloneDiv.css({'display':'block'})
        .insertBefore('#listSuccessDiv')
        .find('#listSuccessMsg').text('sdfsferwerewrewr');
    
  } else if($('#listSuccessDiv').css('display') == 'block'){
    // element is block
    var cloneDiv = $('#listSuccessDiv').clone();
    cloneDiv.css({'display':'block'})
        .insertBefore('#listSuccessDiv')
        .find('#listSuccessMsg').text('this is success');

    var cloneDiv = $('#listWarningDiv').clone();
    cloneDiv.css({'display':'block'})
        .insertBefore('#listWarningDiv')
        .find('#listWarningMsg').text('this is warning');

    var cloneDiv = $('#listErrorDiv').clone();
    cloneDiv.css({'display':'block'})
        .insertBefore('#listErrorDiv')
        .find('#listErrorMsg').text('this is error');

  }

}


ZERP.SLO.closeISWEMsg = function(thisf){
  var parentId = $(thisf).parent().attr('id');
  $(thisf).closest('div').css({'display':'none'});
  $(thisf).closest('div').find('#listSuccessMsg').text('');
}


ZERP.SLO.enableExcelMode = function(){}





//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * [setPriviousSearchParams description]
 * @param {[type]} searchParams [description]
 */
ZERP.SLO.setPriviousSearchParams = function(searchParams){
  $('table#listTableSearchForm tr#searchForm .displaySearchParams .searchByLbl').html('');
  $('table#listTableSearchForm tr#searchForm .displaySearchParams .searchByTxt').html('');

  $('table#listTableSearchForm tr#searchForm .displaySearchParams .searchByLbl').css('display', 'inline-block');
  $('table#listTableSearchForm tr#searchForm .displaySearchParams .searchByTxt').css('display', 'inline-block');


  searchParams = JSON.parse(searchParams);
  $.each(searchParams, function(key, val){
    var fieldID = "#"+key;
    var fieldValue = val;
    // $("#searchForm "+fieldID).val(fieldValue);
    // $("#searchForm "+fieldID).focus();

    $("#searchForm input[name="+key+"], select[name="+key+"]").val(fieldValue);
    $("#searchForm "+fieldID).focus();

    var EntityAttributes = ZERP.System.EntityStructureObj['Attributes'];
    var thisAttributeProperties = (!!EntityAttributes[key]) ? EntityAttributes[key] : {};
    if(!!thisAttributeProperties.HtmlType && thisAttributeProperties.HtmlType == 'combobox'){
      if(!!thisAttributeProperties.data){
        var userFieldValue = thisAttributeProperties.data[fieldValue];
        $("#searchForm td[fieldname="+ key +"] input").val(val);
        $("#searchForm td[fieldname="+ key +"] input[type=text]").val(userFieldValue);
      }
    } else if(!!thisAttributeProperties.HtmlType && thisAttributeProperties.HtmlType == 'odDropdownRefObj'){
      if(!!ZERP.ODDDH.populateCache[key]){
        if(!!ZERP.ODDDH.populateCache[key][val]){
          var userFieldValue = ZERP.ODDDH.populateCache[key][val];
          $("#searchForm td[fieldname="+ key +"] input").val(val);
          $("#searchForm td[fieldname="+ key +"] input[type=text]").val(userFieldValue);
        }
      }
    }


    // return;

    var fieldname = key;
    var fieldNames = fieldname.split('__');
    var fieldValues = fieldValue.split(',__');

    var span = '<span class="searchByLbl" style="display:block; color:blue; font-weight:bold; white-space:nowrap;">Seacrhed by</span>';

    if(fieldValues.length > 1){
      for(var i = 0; i < fieldValues.length; i++){
        var fn = fieldNames[i];
        var fv = fieldValues[i];
        if(fv == '') continue;

        var fd = fn;
        for(key in ZERP.SLO.compositeColumns){
          var val = ZERP.SLO.compositeColumns[key];
          for(k in val){
            var v = val[k];
            if(k == fn){
              fd = (!!v.fielddesc) ? v.fielddesc : k;
              fv = (!!v.islibrary && !!v.datasource) ? v.datasource[fv] : fv;
              break;
            }
          }
        }
        span += '<span style="display:block; white-space:nowrap;">'+ fd + ' : ' + fv +'</span>';
      }
      $(fieldID +"_displaySearchParams").html(span);

    } else {
      // first assume its single and composite
      if(!!ZERP.SLO.libraryColumns[fieldname]){ 

        var fielddesc = (!!ZERP.SLO.libraryColumns[fieldname]['fielddesc']) ? ZERP.SLO.libraryColumns[fieldname]['fielddesc'] : fieldname;
        if(!!ZERP.SLO.libraryColumns[fieldname]['datasource']){
          var fieldValue = ZERP.SLO.libraryColumns[fieldname]['datasource'][fieldValue];

        } else if(!!ZERP.SLO.populateLibCache[fieldname]) {
          var fieldValue = ZERP.SLO.populateLibCache[fieldname][fieldValue];
        }         
        span += '<span style="display:block; white-space:nowrap;">'+ fielddesc + ' : ' + fieldValue +'</span>';
        $(fieldID +"_displaySearchParams").html(span);


      } else if(!!ZERP.SLO.compositeColumns[fieldname]){

        var fielddesc = (!!ZERP.SLO.compositeColumns[fieldname][fieldname]['fielddesc']) ? ZERP.SLO.compositeColumns[fieldname][fieldname]['fielddesc'] : fieldname;
        var fieldValue = (!!ZERP.SLO.compositeColumns[fieldname][fieldname]['datasource']) ? ZERP.SLO.compositeColumns[fieldname][fieldname]['datasource'][fieldValue] : fieldValue;        
        span += '<span style="display:block; white-space:nowrap;">'+ fielddesc + ' : ' + fieldValue +'</span>';
        $(fieldID +"_displaySearchParams").html(span);

      } else {

        var fielddesc = fieldname;
        if (!!ZERP.SLO.translationsHardCode[fieldname]) fielddesc = ZERP.SLO.translationsHardCode[fieldname];
        // span += '<span class="searchByTxt" style="display:block; white-space:nowrap;">'+ fielddesc + ' : ' + fieldValue +'</span>';
        span += '<span class="searchByTxt" style="display:block; white-space:nowrap;">'+ 'more sp' + fieldValue +'</span>';
        $(fieldID +"_displaySearchParams").html(span);
        

        var searchByTxtWidth = $(fieldID +"_displaySearchParams").width();        
        $('table#listTableSearchForm tr#searchForm').find('td[fieldname='+fieldname+']').css({
          'overflow': '',
          'max-width': '',
          'min-width': searchByTxtWidth + 'px',
          'width': searchByTxtWidth + 'px',
        });
        $('table#listTableSearchForm tr#searchForm').find('td[fieldname='+fieldname+'] .FilterCt').css({
          'max-width': '',
          'min-width': '',
          'width': '',
        });
        
        // var searchByTxtWidth = $(fieldID +"_displaySearchParams .searchByTxt").width();
        // alert(searchByTxtWidth + '---' + fieldname);

      }
    }

  });


    // $('table#listTableSearchForm tr#searchForm .displaySearchParams .searchByLbl').css('display', 'none');
    // $('table#listTableSearchForm tr#searchForm .displaySearchParams .searchByTxt').css('display', 'none');


}




/**
 * [getSearchData description]
 * @return {[type]} [description]
 */
ZERP.SLO.getSearchData = function(){
  var searchParams = {};
  $('table#listTableSearchForm thead tr#searchForm').each(function() {
      $(this).find("td input:text, input:hidden,select").each(function() {
          textVal = this.value.trim();
          inputName = $(this).attr("name");
          tagName = $(this).prop("tagName");

          dataEntryHelper = $(this).attr("dataEntryHelper");
          domainAttributeName = $(this).attr("domainAttributeName");
          if(!!domainAttributeName && domainAttributeName != ""){
            inputName = domainAttributeName;
          }

          // if inputName is undefined then assume its combobox 
          if(inputName == undefined) return;
          if(dataEntryHelper == "yes") return;
          // try to retrive name by closest select tag


          if(textVal != ""){
            searchParams[inputName] = textVal;
          }            
      });
  });


  // 2019-05-02: Push search data in URL
  var params = jsClient.paramsToObj(window.location.search);
  if(!!!params.rQueryFromFather){ // it just applicable for header not in child entity.
    var size = 0, key;
    for (var key in searchParams) {
      params[key] = searchParams[key];
      size++;
    }
    // if(size == 0){
    //   for (var key in params) {
    //     if(key == 'rEntityName' || key == 'rReqType' || key == 'rRunTime') continue;
    //     delete params[key];
    //   }
    // }

    // if(size == 0){
      for (var key in params) {
        if(key == 'rEntityName' || key == 'rReqType' || key == 'rRunTime' || key == 'rMyOwn') continue;
        if(searchParams.hasOwnProperty(key)){
          // keep
        } else {
          // clear
          delete params[key];
        }
        
      }
    // }

  }
  var queryString = jsClient.paramsToQueryString(params);
  // var currURL = window.location.pathname + window.location.search + '&' + queryString;
  var currURL = window.location.pathname + '?' + queryString;
  // history.pushState(state, pageTitle, url);
  window.history.pushState('', 'Title', currURL); 


  ZERP.SLO._searchParams = JSON.stringify(searchParams);

  var pagenum = $('#pagination').find('span.current').text();
  var lineperpage = $('#divRowLimit').find('select[name=show]').val();
  if(!!!pagenum) pagenum=1;
  if(!!!lineperpage) lineperpage=10;
  //                  show,   page,   api_url search_param
  // ZERP.SLO.getListData(10,   1,    '',   searchParams);
  ZERP.SLO.getListData(lineperpage,   pagenum,    '',   searchParams);

}











ZERP.SLO.getLineFormButtons = function(){
  var btnEdit = '<input type="button" class="material-icons x-btnLineEdit" value="edit" title="Click to edit this line" onclick="ZERP.SLO.makeEditableThisLine(this);" style="display:inline-block;" />';
  var btnSave = '<input type="button" class="btn-blue material-icons x-btnLineSave" value="done" onclick="ZERP.SLO.saveThisEditableLineData(this);" style="display:none;" />';
  var btnCopy = '<input type="button" class="material-icons x-btnLineCopy" value="content_copy" onclick="ZERP.SLO.copyThisLineData(this);" style="display:inline-block;" />';
  
  return {
    btnEdit: btnEdit,
    btnSave: btnSave,
    btnCopy: btnCopy,
  };
}
ZERP.SLO.getNewLineFormButtons = function(){}
ZERP.SLO.getLineBeingEdited = function(){}
ZERP.SLO.makeEditableThisLine = function(thisLinePtr){}


/**
 * [genericHtmlInputFieldMaker description]
 * @param  {[type]} fieldname     [description]
 * @param  {[type]} fieldvalue    [description]
 * @param  {[type]} fieldpropties [description]
 * @return {[type]}               [description]
 */
ZERP.SLO.genericHtmlInputFieldMaker = function(fieldname, fieldvalue, fieldpropties){
  var returnInputTag = '';

  var fieldvalue   = (!!fieldvalue && fieldvalue != '') ? fieldvalue : '';
  var fielddesc     = (!!fieldpropties.fielddesc ) ? fieldpropties.fielddesc : fieldname; 

  if(!!fieldpropties.type && fieldpropties.type == 'date'){
    returnInputTag += '<input type="text" name="'+fieldname+'" value="'+fieldvalue+'" class="datepicker" id="" />';
  
  } else if(!!fieldpropties.library){
    var options = ZERP.SLO.genereicDropdownOptionsMaker(fieldname,fieldvalue,fieldpropties);
    returnInputTag += '<select name="'+fieldname+'" class="select2" id="">'+ options +'</select>';
  
  } else{
    returnInputTag += '<input type="text" name="'+fieldname+'" value="'+fieldvalue+'" class="" id="" />';
  }
  return returnInputTag;

}

ZERP.SLO.postGenericLineDataForUpdate = function(postGenericBean){}
ZERP.SLO.postGenericLineDataForCreate = function(postGenericBean){}
ZERP.SLO.postGenericLineDataForDelete = function(){}
ZERP.SLO.saveThisEditableLineData = function(thisLinePtr){}



ZERP.SLO.customizeSetThisTdData = function(fieldname, fieldvalue){
  return fieldvalue;
}


/////////////////////////////////// 
ZERP.SLO.saveThisNewLineData = function(thisLinePtr){}
ZERP.SLO.copyThisLineData  = function(thisLinePtr){}
ZERP.SLO.makeLineEntryForm = function(){}





ZERP.SLO.getHeaderData = function(){
  var params = jsClient.paramsToObj(window.location.search);

  var baseStructure = ZERP.System.EntityStructureObj;
  var fatherQueryKeys = baseStructure.fatherQueryKeys;
  var FATHER_KEYS_RELATION = (!!baseStructure.FATHER_KEYS_RELATION) ? baseStructure.FATHER_KEYS_RELATION : {};

  var fatherQueryParams = {};
  fatherQueryParams = params;
  for (var i = 0; i < fatherQueryKeys.length; i++) {
    var fatherQueryKey = fatherQueryKeys[i];
    var fatherQueryVal = params[fatherQueryKey];
    if(!!FATHER_KEYS_RELATION[fatherQueryKey]){
      fatherQueryParams[FATHER_KEYS_RELATION[fatherQueryKey]] = fatherQueryVal;
    } else {
      fatherQueryParams[fatherQueryKey] = fatherQueryVal;
    }
  }

  var fatherQueryString = jsClient.paramsToQueryString(fatherQueryParams);

  // if( !!!params.rFatherSessionName ) return;
  // if( !!!params.rFatherID ) return;

  // if( !!!params.rFatherEntityName ) return;
  if( !!!params.rQueryFromFather ) return;

  var searchParams = fatherQueryParams;
  searchParams['rReqType'] = 'readFatherData';

  var rFatherApi = params.rFatherEntityName;
  // var rSessionAPI = rSessionName + '_api.php';
  var rSessionAPI = "/" + rFatherApi + '_api.php';
  if(!!params.rFRunTime){
    var PKG_DIR = baseStructure.PKG_DIR;
    rSessionAPI = PKG_DIR + '/ProcessClientRequest.php';
  }
  // delete searchParams.rEntityName;
  // delete searchParams.rEntityName;

  // searchParams['rFatherID'] = params.rFatherID;
  $.get(ZERP.System.rRequestApiUrl, searchParams, getHeaderData_results(searchParams), 'json');


  function getHeaderData_results(extraParams) {
    return function(data, textStatus, jqXHR) {
      var mydata = data['entityData'];
      var entityStructure = data['entityStructure'];

      var hideColumns = ['iddocument', 'destination', 'docdate'];
      var translationsHardCode = {};
      translationsHardCode.entitynumber     = 'BOM No.';
      translationsHardCode.docdate          = 'BOM Date';

      var baseStructure = entityStructure;
      var entityFields = baseStructure['Attributes'];

      for(var fieldname in entityFields){
        var fieldpropties = entityFields[fieldname];
        var fielddesc = (!!fieldpropties.fielddesc) ? fieldpropties.fielddesc : fieldname;
        var fielddesc = (!!fieldpropties.shortfielddesc) ? fieldpropties.shortfielddesc : fielddesc;
        translationsHardCode[fieldname] = fielddesc;

        if(!!fieldpropties.HdrSequence && fieldpropties.HdrSequence != '0'){
          // Show
        } else {
          hideColumns.push(fieldname);
        }
        if(!!fieldpropties.restriction && fieldpropties.restriction == 'hidden'){
          hideColumns.push(fieldname);
        }

        if(!!fieldpropties.restriction && fieldpropties.restriction == 'hidden'){
          hideColumns.push(fieldname);
        }
        if(!!fieldpropties.hidefromchildsession && fieldpropties.hidefromchildsession == true){
          hideColumns.push(fieldname);
        }

      }


      var $motherDiv = $('<div style="padding:5px 20px 0px 10px;" class="x-panel-bwrap" />');
      $.each(mydata, function(key, val){

        $childDiv = $('<div class="vHdrFieldGroup" style="display:inline-block; padding-right: 15px; padding-left: 5px; padding-bottom:20px;" />');
        $cellDiv1 = $('<div style="padding-bottom:5px;" />');
        $cellDiv2 = $('<div/>');
        $cellDiv3 = $('<div/ style="display:none;">');

        $cellDiv1.text(key);
        $cellDiv1.attr('class', 'fieldlbl');
        if (!!translationsHardCode[key]) $cellDiv1.text(translationsHardCode[key]);

        if(!!entityFields[key]['data']){
          if(!!entityFields[key]['data'][val]){
            $cellDiv2.text(entityFields[key]['data'][val]);
          } else {
            $cellDiv2.text(val);
          }
        } else {
          $cellDiv2.text(val);
        }
        

        $cellDiv2.attr('class', key + ' fieldtxt');
        $cellDiv3.text(val);
        $cellDiv3.attr('class', 'db' + key);

        $cellDiv1.appendTo($childDiv);
        $cellDiv2.appendTo($childDiv);
        $cellDiv3.appendTo($childDiv);

        $childDiv.appendTo($motherDiv);
        if (hideColumns.indexOf(key) >= 0) $childDiv.css('display', 'none');

      });

      $legend = $('<legend>'+ baseStructure.ENTITY_TITTLE +'</legend>');
      $fieldSet = $('<fieldset id="" />');
      $legend.appendTo($fieldSet);
      $fieldSet.css({
        'border': '1px solid rgb(191, 191, 191)',
        'border': '1px solid #dee2e6',
        'padding': '10px',
        'border-radius': '5px',
        'margin': '3px 0px'
      });

      // $table.css('margin-bottom', '10pt')
      $('#ZERP_FatherDataCt .ZERP_FatherDataCt-first').empty().append($fieldSet);
      $('#ZERP_FatherDataCt .ZERP_FatherDataCt-first fieldset').append($motherDiv);
      $('#ZERP_FatherDataCt').css({
        // 'height':'40px',
        // 'border-top': '2px solid',
        // 'border-bottom': '2px solid',
        // 'border-color': ' #98c0f4',
      });
      $('#ZERP_FatherDataCt .x-panel-bwrap .fieldtxt').css({
        'color': ' #696969',
        'font-weight': 'normal',
      });


    }

  }

}




ZERP.SLO.applyCustomListCSS = function(){
  $('#listTable tr td:not(.xxxx)').css({
    // 'width':'95%',
  });
  $('#listTable tr td:nth-child(1)').css({
    'min-width': '50px',
    'padding-top' : '8px',
  });
  $('#listTable tr td:nth-child(2)').css({
    'min-width': '50px',
    'padding-top' : '8px',
  });

  $('#listTableSearchForm tr#searchForm input:not([type="checkbox"]').css({
    'width':'95%',
    'min-width': '60px',
    'font-family':'Arial',
    'padding':'2px',
    'border':'1px solid #7F7F7F',
    'border-radius':'3px',
    'height': '25px'
  });

  $('#listTableSearchForm tr#searchForm select').css({
    'width':'95%',
    'min-width': '60px',
    'font-family':'Arial',
    'padding':'2px',
    'border':'1px solid #7F7F7F',
    'border-radius':'3px',
    'height': '25px'
  });

}



ZERP.SLO.handleThisComboxSearch = function(event, thisPtr){
  // need track combobox dropdown scrolling initiate by user
  // if not initiate, then if user press enter key, then search list data 
  if(event.keyCode == 13){
    console.log('\n\n Enter Key Press\n\n');
    return;
  }


  var parentNode = thisPtr.parentNode.parentNode
  var child = parentNode.children[1];
  ZERP.Utils.ActiveComboboxPtr = child;

  var cmbxOptionsCntId = thisPtr.getAttribute('cmbxOptionsCntId');
  ZERP.Utils.CmbxOptionsCntId = cmbxOptionsCntId;
  var userEntryChar = $(thisPtr).val();

  if( $('#'+cmbxOptionsCntId).is(':hidden') ){
    var userEntryChar = $(thisPtr).val();
    if(userEntryChar.length > 0){
      ZERP.Utils.showComboboxOptions();
    } else if(userEntryChar.length == 0){
      $(thisPtr).closest('div.ComboboxContainer').find('input[type=hidden]').val('');
    }
  } else if(userEntryChar.length == 0){
  $(thisPtr).closest('div.ComboboxContainer').find('input[type=hidden]').val('');
  }



    var input, filter, ul, li, a, i;

  var userEntry = $(thisPtr).val();
  var combobox_fieldname = $(thisPtr).attr('class');
  var comboboxName = 'combobox_' + combobox_fieldname;

    // input = document.getElementById("myInput");
    filter = userEntry.toUpperCase();
    div = document.getElementById(comboboxName);
    // a = div.getElementsByTagName("a");
    a = div.getElementsByClassName('zerp-listitem-element');
    // console.log(a);
    for (i = 0; i < a.length; i++) {
        if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "block";
        } else {
            a[i].style.display = "none";
        }
    }


}


ZERP.SLO.makeHeaderSearchInputField = function(attributeName){
  var baseStructure = ZERP.SLO._baseStructure;
  baseStructure = JSON.parse(baseStructure);
  var EntityAttributes = baseStructure['Attributes'];
  var thisAttributeProperties = EntityAttributes[attributeName];

  var HTML_Tag = '';
  HTML_Tag = '<input type="text"  name="'+ attributeName +'" class="'+ attributeName +'" value="" id="'+attributeName+'" onclick="ZERP.SLO.handleThisSearchInputFieldClick(this);" style="width:94%;" />';
  if(!!!thisAttributeProperties) return HTML_Tag;

  var fielddesc     = (!!thisAttributeProperties.fielddesc ) ? thisAttributeProperties.fielddesc : attributeName; 
  var defaultval     = (!!thisAttributeProperties.defaultval ) ? thisAttributeProperties.defaultval : ''; 
  var hideOnSearch     = (!!thisAttributeProperties.hideOnSearch ) ? thisAttributeProperties.hideOnSearch : false; 
  var defaultval     = ''; 

  if(hideOnSearch === true) return '';

  // if(!!thisAttributeProperties.type && thisAttributeProperties.type == 'date'){
  if(!!thisAttributeProperties.HtmlType && thisAttributeProperties.HtmlType == 'date'){
    HTML_Tag = '<input type="text"  name="'+ attributeName +'" class="'+ attributeName +'" value="" id="'+attributeName+'" onclick="ZERP.SLO.handleDateTimeSearch(this);" style="width:94%;" />';
    return HTML_Tag;

  } else if( !!thisAttributeProperties.HtmlType && thisAttributeProperties.HtmlType == 'select' ){
    // var options = ZERP.Utils.genereicDropdownOptionsMaker(fieldname,fieldvalue,fieldpropties);

    if( !!!thisAttributeProperties.datasource && !!!thisAttributeProperties.data ) return HTML_Tag;
    var options = '<option value=""></option>';
    if(!!thisAttributeProperties.data){
      var objectLength = Object.keys(thisAttributeProperties.data).length;
      if(objectLength > 0){
        var setasdefault = 'selected';
        $.each(thisAttributeProperties.data, function(index, value) {
          setasdefault = (!!defaultval && (value == defaultval || index == defaultval)) ? 'selected' : '';
          options += '<option value="' + index + '" '+ setasdefault +'>' + value + '</option>';
        });
      }
    }

    HTML_Tag = '<select name="'+attributeName+'" class="'+ attributeName +'" id="" onchange="ZERP.SLO.handleOnChangeThisSearchFieldValue(this);" '+' >'+ options +'</select>';
  
  } else if( !!thisAttributeProperties.HtmlType && thisAttributeProperties.HtmlType == 'datalist' ){

    var thisDataList = '<datalist id="list_'+ attributeName +'">'
    // var options = ZERP.Utils.genereicDropdownOptionsMaker(fieldname,fieldvalue,fieldpropties);

    if( !!!thisAttributeProperties.datasource && !!!thisAttributeProperties.data ) return HTML_Tag;
    var options = '<option value=""></option>';
    if(!!thisAttributeProperties.data){
      var objectLength = Object.keys(thisAttributeProperties.data).length;
      if(objectLength > 0){
        var setasdefault = 'selected';
        $.each(thisAttributeProperties.data, function(index, value) {
          setasdefault = (!!defaultval && (value == defaultval || index == defaultval)) ? 'selected' : '';
          options += '<option value="' + index + '" '+ setasdefault +'>' + value + '</option>';
        });
      }
    }

    thisDataList += options;
    thisDataList += '</datalist>';
    $('body').append(thisDataList);

    HTML_Tag = '<input type="text"  name="'+ attributeName +'" class="'+ attributeName +'" value="" id="'+attributeName+'" list="list_'+attributeName+'" onclick="ZERP.SLO.handleThisSearchInputFieldClick(this);" style="width:94%;" />';
  
  } else if( !!thisAttributeProperties.HtmlType && thisAttributeProperties.HtmlType == 'combobox' ){

    ZERP.SLO.makeSearchableComboboxAndAppendInBody(attributeName, thisAttributeProperties);
    HTML_Tag = '<div class="ComboboxContainer" style="position:relative;">';

    HTML_Tag += '<div style="position:relative; float:left; ">';
    HTML_Tag += '<input type="hidden"  name="'+ attributeName +'" class="'+ attributeName +'" id="'+attributeName+'" />';
    HTML_Tag += '<input type="text"   class="'+ attributeName +'" cmbxOptionsCntId="combobox_'+attributeName+'"  id="'+attributeName+'" onkeyup="ZERP.SLO.handleThisComboxSearch(event, this);" style="width:94%;" />';
    HTML_Tag += '</div>';

    HTML_Tag += '<div role="button" forAttribute="'+attributeName+'" cmbxOptionsCntId="combobox_'+attributeName+'"  class="dropdownlistArrowZERPComboBox" style="float:right; position:absolute; left:20px; border: 1px solid gray; height: 25px; cursor: pointer;" onclick="ZERP.SLO.showHideComboboxOptions(this);" ><div><i class="material-icons">keyboard_arrow_down</i></div></div>';
    HTML_Tag += '<div class="clearfix" style="overflow:auto;height:25px;"></div>';
    HTML_Tag += '</div>';

  } else if(!!thisAttributeProperties.AttributeType && thisAttributeProperties.AttributeType == 'Virtual'){
    return '';

  } else if(!!thisAttributeProperties.HtmlType && thisAttributeProperties.HtmlType == 'odDropdownRefObj'){

    HTML_Tag = '<div style="position:relative;">';
    HTML_Tag += '<input type="text" name="'+attributeName+'" dataEntryHelper="yes" class="odDropdownRefObj_List" value="" id="'+attributeName+'" onkeyup="ListMgr.handleODDDHSearchField_onKeyup(this, event);" />';
    HTML_Tag += '<input type="hidden" name="'+attributeName+'_code" domainAttributeName="'+attributeName+'"  value="" id="'+attributeName+'_code" ' +' />';
    var btnDropdownToggle = ZERP.Utils.HTML_button('btnDropdownOption', thisAttributeProperties, attributeName);
    HTML_Tag += btnDropdownToggle;
    HTML_Tag += '</div>';

  } else {
    // returnInputTag += '<input type="text" name="'+fieldname+'" value="'+fieldvalue+'" class="" id="" '+ReadOnly+'/>';
  }

  return HTML_Tag;

}



ZERP.SLO.initComboboxArrowNavigation = function(attributeName){
  $('#searchForm td[fieldname='+ attributeName +']').find('input[type=text]').focus();
  var combobox_id = '#combobox_'+ attributeName;

  $('#searchForm td[fieldname='+ attributeName +']').find('input[type=text]').off('keyup').on('keyup',function(e){
        // Make sure to stop event bubbling
        e.preventDefault();
        e.stopPropagation();
    if (e.keyCode == 40) {  
      var curr = $(combobox_id + ' div').find('.current');
      console.log(curr);
      if(curr.length){
        // $(curr).attr('class', 'display_box');
                // $(curr).next().attr('class', 'display_box current');
        $(curr).removeClass('current');
        $(curr).css('background-color', '');
                $(curr).next().addClass('current');
                $(curr).next().css('background-color', 'skyblue');
      } else {
        $(combobox_id + ' div div:first-child').addClass('current');
        $(combobox_id + ' div div:first-child').css('background-color', 'skyblue');
      }
      // Navigate(1);
    } else if(e.keyCode==38){
      var curr = $(combobox_id + ' div').find('.current');
      if(curr.length){
        $(curr).removeClass('current');
        $(curr).css('background-color', '');
        $(curr).prev().addClass('current');
        $(curr).prev().css('background-color', 'skyblue');
      } else {
        $(combobox_id + ' div div:last-child').addClass('current');
        $(combobox_id + ' div div:last-child').css('background-color', 'skyblue');        
      }

    } else if(e.keyCode == 13){
      var chosenOptionCode = $(combobox_id + ' div').find('.current').find('span.code').text();
      var chosenOptionDesc = $(combobox_id + ' div').find('.current').find('span.description').text();
      $('#searchForm td[fieldname='+ attributeName +']').find('input[type=hidden]').val(chosenOptionCode);
      $('#searchForm td[fieldname='+ attributeName +']').find('input[type=text]').val(chosenOptionDesc);
      ZERP.SLO.hideComboboxOptions(attributeName);
      ZERP.SLO.redrawList();
    }
  });
  
  // $(document).on('keyup','#searchForm td[fieldname='+ attributeName +'] input[name='+attributeName+']',function(e){
  //  if (e.keyCode == 40) {  
  //    alert(e.keyCode);
  //    $(combobox_id + ' div div:first-child').css('background-color', 'skyblue');
  //  } else if(e.keyCode==38){
  //    alert(e.keyCode);
  //  }
  // });
}


ZERP.SLO.showHideComboboxOptions = function(thisPtr){
/*So, if an attribute is non-standard, there won’t be DOM-property for it. Is there a way to access such attributes?
Sure. All attributes are accessible using following methods:*/

/*elem.hasAttribute(name) – checks for existence.
elem.getAttribute(name) – gets the value.
elem.setAttribute(name, value) – sets the value.
elem.removeAttribute(name) – removes the attribute.*/

  var tagName = thisPtr.tagName;
  var hasAttribute = thisPtr.hasAttribute('forAttribute');
  var attributeName = thisPtr.getAttribute('forAttribute');
  console.log(thisPtr);
  console.log(attributeName);

  var thisOffset = $(thisPtr).offset();
  var thisTop = thisOffset.top;
  var thisLeft = thisOffset.left;

  var thisTdOffset = $(thisPtr).closest('td').offset();
  var thisTdTop = thisTdOffset.top;
  var thisTdLeft = thisTdOffset.left;
  var thisTdWidth = $(thisPtr).closest('td').width();

  var combobox_id = '#combobox_'+ attributeName;
  if( $(combobox_id).is(':hidden') ){
    $(combobox_id).css({
      'display':'block',
      'top': (thisTop+27) + 'px',
      'left': (thisTdLeft + 1) + 'px',
      'position': 'absolute',
      'margin-left': '3px',
      'background-color': 'white',
      'width': thisTdWidth + 'px',
      'max-height': '300px',
      'overflow-y': 'scroll',
      'border-width': '0px 1px 1px 1px',
      'border-style': 'solid',
      'border-color': 'skyblue'
    });
    $('.zerp-listitem-element').css({
      'padding': '3px',
    });

    $('.zerp-listitem-element').hover(function(){
        $(this).css("background-color", "skyblue");
        }, function(){
        $(this).css("background-color", "");
    });



    ZERP.SLO.initComboboxArrowNavigation(attributeName);

  } else if( $(combobox_id).is(':visible') ){
    $(combobox_id).css({
      'display':'none',
    });
  }

}



ZERP.SLO.hideComboboxOptions = function(attributeName){
  var combobox_id = '#combobox_'+ attributeName;
    $(combobox_id).css({
      'display':'none',
    });

}

ZERP.SLO.setChosenOptionElement = function(thisPtr){
  var chosenOptionCode = $(thisPtr).find('span.code').text();
  var chosenOptionDesc = $(thisPtr).find('span.description').text();
  var attributeName = $(thisPtr).attr('forattribute');
  $('#searchForm td[fieldname='+ attributeName +']').find('input[type=hidden]').val(chosenOptionCode);
  $('#searchForm td[fieldname='+ attributeName +']').find('input[type=text]').val(chosenOptionDesc);
  ZERP.SLO.hideComboboxOptions(attributeName);
  ZERP.SLO.redrawList();
}

ZERP.SLO.makeSearchableComboboxAndAppendInBody = function(attributeName, thisAttributeProperties){
    if( !!!thisAttributeProperties.datasource && !!!thisAttributeProperties.data ) return;

    var CmbxOptionsCntId  = 'combobox_'+ attributeName;
    $('body').find('#'+CmbxOptionsCntId).remove();

    var thisCombobox = '<div role="select" id="'+ CmbxOptionsCntId +'" style="display:none;">'
    thisCombobox += '<div style="outline: none 0px; overflow: hidden; position: relative; min-height: 40px;">';
    var options = '';
    if(!!thisAttributeProperties.data){
      var objectLength = Object.keys(thisAttributeProperties.data).length;
      if(objectLength > 0){
        $.each(thisAttributeProperties.data, function(index, value) {
          // options += '<option value="' + index > + value + '</option>';
          options += '<div role="option" forattribute="'+attributeName+'" id="listitem0innerListBoxZERPWidget" class="zerp-listitem-element" onclick="ZERP.SLO.setChosenOptionElement(this);" ><span class="code" style="display:none;"  >'+index+'</span><span class="description">'+value+'</span></div>';
        });
      }
    }

    thisCombobox += options;
    thisCombobox += '</div>';
    thisCombobox += '</div>';
    $('body').append(thisCombobox);



//  for (i = 1; i < startFromOne; i++) {
//    var element = document.createElement('div');
//    element.id = "circle" + i;
//    element.className = "circle";
// // element.onclick = attack(key);
//    document.getElementById('gamecanvas').appendChild(element);
//    document.getElementById("circle" + i).innerHTML = i;
//  }

// var el = document.createElement('div');
// var domString = '<div class="container"><span class="intro">Hello</span> <span id="name"> World!</span></div>';
// el.innerHTML =  domString;
// document.body.appendChild(el.firstChild);   


// var container = document.createElement('div',{ class: 'container'});
// var intro = document.createElement('span',{ class: 'intro'});
// var name = document.createElement('span',{ id: 'name'});
// var introText = document.createTextNode('Hello');
// var nameText = document.createTextNode('World!');

// name.appendChild(nameText);
// intro.appendChild(introText);
// container.appendChild(intro);
// container.appendChild(name);

// document.body.appendChild(container);

}





ZERP.SLO.handleOnChangeThisSearchFieldValue = function(thisPtr){
  // alert('ok');
  ZERP.SLO.redrawList();
}




ZERP.SLO.handleDateTimeSearch = function(thisf){
  if($('#listDOCExpandDivID').length) $('body').find('#listDOCExpandDivID').remove();
  
  var customSearchFiedlName = $(thisf).closest('td').prop('class');
  var thisAttributeProperties = ZERP.SLO.EntityAttributes[customSearchFiedlName];
  var fielddesc = thisAttributeProperties['fielddesc'];

  var fieldvalue = $(thisf).closest('td').find('input').val();
  var fieldvalues = fieldvalue.split(',__');  

  var dateSearchDiv = '\
    <div id="listDOCExpandDivID" style="position:relative; display:none;">\
    <div class="customSearchExpand ListMgrExpandDiv" style="position:absolute; background:white; min-width:300px; padding:10px; padding-bottom:25px;">\
    <div style="float:right;">\
    <button type="button" onclick="ZERP.SLO.closeExpandDiv(this);"><i class="fas fa-times text-danger"></i></button>\
    </div>\
    <div style="clear:both;"></div>\
    <form id="customSearchForm">\
    <table>';


    var from_to_dates = (fieldvalue != '') ? fieldvalue.split('_to_') : '';
    var from_date     = '';
    var to_date       = '';
    if(from_to_dates.length > 1){
      from_date = from_to_dates[0];
      to_date   = from_to_dates[1];
    }
    dateSearchDiv += '<tr><td style="min-width:100px; padding:10px;"><span>'+fielddesc+'</span></td><td style="padding:10px;">:</td><td style="min-width:365px; padding:10px;"><input type="text" name="'+customSearchFiedlName+'_from" value="'+from_date+'" class="datepicker" id="" style="width:150px;" /> to <input type="text" name="'+customSearchFiedlName+'_to" value="'+to_date+'" class="datepicker" id="" style="width:150px;" /></td></tr>';
  


    // count = 0;
    // $.each(ZERP.SLO.compositeColumns[customSearchFiedlName],function(fieldname,fieldprop){
    //   dateSearchDiv += ZERP.SLO.makeHTML_InputField(fieldname,fieldprop,fieldvalue,count);
    //   count++;
    // });

    dateSearchDiv +='<tr><td colspan="3" style="text-align:right;">\
      <button type="button" destinationAttribute="'+ customSearchFiedlName +'" onclick="ZERP.SLO.submitCustomSearchField(this,\''+customSearchFiedlName+'\');">Search</button>\
        &nbsp;&nbsp;&nbsp;\
        <button type="button" destinationAttribute="'+ customSearchFiedlName +'" onclick="ZERP.SLO.resetCustomSearchField(this);">Reset</button>\
      </td></tr>\
      </table>\
      </form>\
      </div>\
      </div>';
  
  // $(thisf).closest('td').append(dateSearchDiv);
  $('body').append(dateSearchDiv);
  $('#listDOCExpandDivID').fadeIn('slow');
  jsClient.initDateTimePicker();

  var formOffsetLeft = $(thisf).offset().left;
  var formOffsetTop = $(thisf).offset().top;

  $('#listDOCExpandDivID').css({
    'left': formOffsetLeft + 'px',
    'top': (formOffsetTop + 27) + 'px',
    'position': 'absolute'
  });

}


ZERP.SLO.makeSearchHeaderTable = function(jsonData){

  if($('#listTableSearchForm').length > 0){
  	// if EQB is change then redraw header again
  	if(!!!ZERP.SLO.EqbChanged) return;
  	if(!!ZERP.SLO.EqbChanged && ZERP.SLO.EqbChanged === false) return;
  }
  ZERP.SLO.EqbChanged = false;
  // 2019-01-13 Eqb Change Effect Reason
  // thats why it comment
  // We need to redraw header


  // some trickery for nice formatting
  var hideColumns = ZERP.SLO.hideColumns;
  var translationsHardCode = ZERP.SLO.translationsHardCode;

  /**
   * builds the table header
   */
  var data = JSON.parse(jsonData);
  var mydata = data['listData'];
  var firstRow = mydata[0];


  var compositeColumnsLength = Object.keys(ZERP.SLO.compositeColumns).length;
  var countVisibleColumn = 1; // here start from 1 cz first td for option


  var $table = $('<table border=1 id="listTableSearchForm" class="listTable" />');
  var $thead = $('<thead />');


  var $tr = $("<tr/>").attr("id","labelForm");
  // LineChooser
  var $td;
  $td = $('<th/>');
  $td.attr('fieldname', 'x-options');
  $td.html('<div><center>Option</center></div>');
  $td.appendTo($tr);
  // List form action buttons --- Save, eidt, delete 
  var $td;
  $td = $('<th/>');
  $td.attr('fieldname', 'x-lineformactionbuttons');
  $td.html('<div><center></center></div>');
  $td.appendTo($tr);


  var firstRowCopy = JSON.parse(jsonData)['listData'][0];

  $.each(firstRowCopy, function (fieldname, fieldvalue) {
    if(fieldname == "CodeAttributeDecoVals") return
      
    // search this field is in composite column
    // and assume that its not under in composite colums
    var groupName = '';
    var groupFields = {};
    var hasInCompositeColumn = false;
    if(compositeColumnsLength > 0){
      for (var groupName in ZERP.SLO.compositeColumns) {
        groupFields = ZERP.SLO.compositeColumns[groupName];
        for (var thisfieldname in groupFields) {
          if(thisfieldname == fieldname){
            hasInCompositeColumn = true;
            break;
          }
        }
        if(hasInCompositeColumn) break;
      }
    }


    if (hasInCompositeColumn) {   // if have then procceed composite column
      var compositeClass = '';  

    } else {

      var fielddesc = fieldname;
      if (!!translationsHardCode[fieldname]) fielddesc = translationsHardCode[fieldname];

      $divLabelCt = $('<div onclick="ZERP.SLO.sortByThisColumn(\''+fieldname+'\');" />');
      $divLabelCt.attr('class', fieldname + ' searchFieldLabel');
      $divLabelCt.text(fielddesc);
      $divLabelCt.append('<div class="'+fieldname+' sortByIcon" style="display:inline-block; padding-left:2px;"><i class="fas fa-sort"></i></div>');
      $divLabelCt.css('cursor', 'pointer');


      $td = $('<th/>');
      $td.attr('fieldname', fieldname);
      $td.attr('class', fieldname);
      $td.html($divLabelCt);

      if ( hideColumns.indexOf(fieldname) >= 0 ) $td.css('display','none');
      $td.appendTo($tr);

    }

  });
  $tr.appendTo($thead);



  var $tr = $("<tr/>").attr("id","searchForm");
  // LineChooser
  var $td;
  $td = $('<td/>');
  $td.attr('fieldname', 'x-options');
  // $td.html('<center>Option</center>');
  $td.html('<center><center><input type="checkbox" onclick="ZERP.SLO.handleLineChooserSelectAll(this);" ></center></center>');
  $td.appendTo($tr);
  // List form action buttons --- Save, eidt, delete 
  var $td;
  $td = $('<td/>');
  $td.attr('fieldname', 'x-lineformactionbuttons');
  $td.html('<center></center>');
  $td.appendTo($tr);

  $.each(firstRowCopy, function (fieldname, fieldvalue) {
    if(fieldname == "CodeAttributeDecoVals") return
      
    // search this field is in composite column
    // and assume that its not under in composite colums
    var groupName = '';
    var groupFields = {};
    var hasInCompositeColumn = false;
    if(compositeColumnsLength > 0){
      for (var groupName in ZERP.SLO.compositeColumns) {
        groupFields = ZERP.SLO.compositeColumns[groupName];
        for (var thisfieldname in groupFields) {
          if(thisfieldname == fieldname){
            hasInCompositeColumn = true;
            break;
          }
        }
        if(hasInCompositeColumn) break;
      }
    }


    if (hasInCompositeColumn) {   // if have then procceed composite column
      var compositeClass = '';  

    } else {

      var fielddesc = fieldname;
      if (!!translationsHardCode[fieldname]) fielddesc = translationsHardCode[fieldname];

      $divLabelCt = $('<div/>');
      $divLabelCt.attr('class', fieldname + ' searchFieldLabel');
      $divLabelCt.text(fielddesc);
      $divLabelCt.css('display', 'none');

      var headerSearchInputField = ZERP.SLO.makeHeaderSearchInputField(fieldname);
      // var sc = '<center><input type="text"  name="'+ fieldname +'" class="'+ fieldname +'" value="" id="'+fieldname+'" onclick="ZERP.SLO.handleThisSearchInputFieldClick(this);" style="width:94%;" /></center>';
      // var sc = '<center>'+ headerSearchInputField +'</center>';
      var searchField = '';
      var searchField = headerSearchInputField;
      var searchLabel = $('<div id="'+fieldname+'_displaySearchParams" class="displaySearchParams" style="background-color:white;">');

      $divFilterCt = $('<div/>');
      $divFilterCt.attr('class', 'FilterCt');
      $divFilterCt.html(searchField);
      $divFilterCt.append(searchLabel);
      // $divFilterCt.css({
      //   'border': '1px solid gray',
      //   'height': '25px',
      //   'cursor': 'pointer',
      // });


      var entityAttributes = ZERP.System.EntityStructureObj['Attributes'];
      var thisAttributeProperties = (!!entityAttributes[fieldname]) ? entityAttributes[fieldname] : {};
      var attributeWidth = (!!thisAttributeProperties.charwidth) ? thisAttributeProperties.charwidth : '60'; // 60 is deafult
      var ListSize = (!!thisAttributeProperties.ListSize) ? thisAttributeProperties.ListSize : '';
      if(ListSize == ''){
        ListSize = attributeWidth;
      }
      // console.log(attributeWidth + fieldname);

      $td = $('<td/>');
      $td.attr('fieldname', fieldname);
      $td.attr('class', fieldname);
      $td.css({'min-width': ListSize+'px', 'width': ListSize+'px'});
      // $td.css({'min-width': attributeWidth+'px', 'width': attributeWidth+'px', 'max-width': attributeWidth+'px'});
      $td.html($divLabelCt);
      $td.append($divFilterCt);

      if ( hideColumns.indexOf(fieldname) >= 0 ) $td.css('display','none');
      $td.appendTo($tr);

    }

  });

  $tr.appendTo($thead);
  $thead.appendTo($table);

  $("#ZERP_listGridPanel_headerOffset").html($table);

}





//Add Customization Below =================================================================================
ZERP.SLO.makeTable = function(jsonData,hasData) {

  var data   = JSON.parse(jsonData);
  var mydata = data['listData'];
  var pageNum      = parseInt(data['pageNum']-1);
  var showLimit    = parseInt(data['showLimit']);
  var trDataId = parseInt(pageNum * showLimit) + 1;
  // console.log(pageNum + '  ' +showLimit);


  //for composition column
  ZERP.SLO.compositeColumns = {
    // docnumber:{
    //   docnumber: {
    //     style: 'font-weight:bold; color:blue',
    //     customsearch: true,
    //     single: true,
    //     end: true
    //   }
    // },
  }


  var baseStructure = ZERP.SLO._baseStructure;

  baseStructure = JSON.parse(baseStructure);
  var hideOnListFields = baseStructure['hideOnListFields'];



  var EntityAttributes = baseStructure['Attributes'];

  // some trickery for nice formatting
  var hideColumns = ['doctype','workorderdocnumber'];
  if(hideOnListFields.length > 0){
    for (var i = 0; i < hideOnListFields.length; i++) {
      hideColumns.push( hideOnListFields[i] );
    }
  }
  ZERP.SLO.hideColumns = hideColumns;

  var translationsHardCode = {};
  translationsHardCode.docnumber = 'Document Number';
  translationsHardCode.linenumber = 'Line Number';
  translationsHardCode.lineentrytime = 'Line entry time';
  
  translationsHardCode.countername = 'Counter Name';
  translationsHardCode.iduom = 'UoM';
  translationsHardCode.elementuom = 'Elem. UoM';
  translationsHardCode.itemspecification = 'Item Specification';
  translationsHardCode.linestatus__company__docdate  = 'Document Information';

  ZERP.SLO.translationsHardCode = translationsHardCode;
  var entityFields = baseStructure['Attributes'];

  for(var fieldname in entityFields){
    var fieldpropties = entityFields[fieldname];
    var fielddesc = (!!fieldpropties.fielddesc) ? fieldpropties.fielddesc : fieldname;
    var fielddesc = (!!fieldpropties.LstLabel && fieldpropties.LstLabel != '' && fieldpropties.LstLabel != null) ? fieldpropties.LstLabel : fielddesc;
    ZERP.SLO.translationsHardCode[fieldname] = fielddesc;
  }


  ZERP.SLO.makeSearchHeaderTable(jsonData);
  // return;


  /**
   * builds the table header
   */
  var orgBgOn = '';
  var mydata_json = JSON.stringify(mydata);
  var firstRow = mydata[0];

  var firstRowCopy = firstRow;
  var compositeColumnsLength = Object.keys(ZERP.SLO.compositeColumns).length;
  var countVisibleColumn = 1; // here start from 1 cz first td for option


  var $table = $('<table border=1 id="listTable" class="listTable" />');
  var $thead = $('<thead />');
  var $tbody = $('<tbody/>');
  /**
  * first header row------------------------------------------------------------------------------------------------------------------------------------------------------------
  */
  // var $tr = ZERP.SLO.generateFirstHeaderTr(firstRowCopy, translationsHardCode);
  var $tr = $("<tr/>");
  // LineChooser
  $td = $('<th/>');
  $td.attr('fieldname', 'x-options'); 
  $td.html(''); 
  $td.appendTo($tr);
  // List form action buttons --- Save, eidt, delete 
  $td = $('<th/>');
  $td.attr('fieldname', 'x-lineformactionbuttons'); 
  $td.html(''); 
  $td.appendTo($tr);  

    $.each(firstRowCopy, function (fieldname, fieldvalue) {


      // } else {            //procceed normal column

      countVisibleColumn++;
      var fielddesc = fieldname;
      $td = $('<th/>');
      $td.attr('fieldname', fieldname);
      $td.attr('class',fieldname);
      if (!!translationsHardCode[fieldname]) fielddesc = translationsHardCode[fieldname];
      $td.html('<center>'+ fielddesc +'</center>');
      if ( hideColumns.indexOf(fieldname) >= 0 ){ $td.css('display','none'); countVisibleColumn--};
      $td.appendTo($tr);

      // }

    // }  
    });
  $tr.appendTo($thead);
  $thead.appendTo($table);
  // end -----------------------------------------------------------------------------------------------------------------



  if(hasData == 'no'){
    $thead.appendTo($table);
    //custom for no record found
    var $tr = $("<tr/>");
    var $td = $('<td/>');
    $td.appendTo($tr);
    var $td = $('<td/>');
    $td.appendTo($tr);
    var $td = $('<td/>').attr("colspan",countVisibleColumn);
    $td.html('No Data Found')
    .css({'text-align':'center','vertical-align':'middle'});
    $td.appendTo($tr);
    $tr.appendTo($table);
    return $table;
  }


  /**
  * populates with data--------------------------------------------------------------------------------------------------------------------------------------------------
  */
  var lineFormButtons = ZERP.SLO.getLineFormButtons();
  var trColorBandsClasses = ['oddTr','evenTr'];

  var mydata = JSON.parse(mydata_json);
  $.each(mydata, function (index, value) {

    var trColorBandIndex = (index % 2);
    var colorBandsClass = trColorBandsClasses[trColorBandIndex];    

    var $tr = $("<tr/>"); // it should be in here
    $tr.attr("data-id",trDataId);
    $tr.attr("class", colorBandsClass);
    trDataId++;

    var thisRow = value;
    var thisRowCopy = thisRow;
    var thisRowCopy_Json =  JSON.stringify(thisRow);
    
    // db-data-id // need to manage it ---@al-mamun@2020-01-21
    if(!!thisRow['id']){
      $tr.attr("db-data-id",thisRow['id']);
    }

    // retrieve variable here which is needed
    var formtype = thisRow['formtype'];
    var linestatus = thisRow['linestatus'];

    // generate button if needed
    var btnLineChooser = '<center><input type="checkbox" class="multipleLineChooser" onclick="ZERP.SLO.handleLineChooserCheckboxClick(this);" ></center>';
    var btnThisLineAction = '';
    if(linestatus == 'Requisition Sent'){
      btnThisLineAction = '<button type="button" class="mbutton delete" onclick="ZERP.SLO.handleLineEvolutionBtnAction(this)">Cancel this line</button>';
    } else if(linestatus == 'Requisition Planned'){
      btnThisLineAction = '';
    }

    // LineChooser
    $td = $('<td/>');
    $td.attr('fieldname', 'x-options');
    $td.html(btnLineChooser);
    $td.appendTo($tr);

    // List form action buttons --- Save, eidt, delete 
    $td = $('<td/>');
    $td.attr('fieldname', 'x-lineformactionbuttons');
    $td.html('&nbsp;' +lineFormButtons['btnEdit'] + '&nbsp;' + lineFormButtons['btnSave'] + '&nbsp;' + lineFormButtons['btnCopy']);
    $td.appendTo($tr);


      // looping over this row
      $.each(thisRow, function (fieldname, fieldvalue) {
        if(fieldname == "CodeAttributeDecoVals") return
        var thisfieldproperties = EntityAttributes[fieldname];
      // for (var fieldname in firstRowCopy) {
        // var fieldvalue = firstRowCopy[fieldname];
        
        // *** write custom code here ---
        // fieldvalue = (fieldname == "docnumber") ? "<a href='erpdocument.php?docnumber="+fieldvalue+"&doctype=DR&formtype="+formtype+"&docviewflag=apparel' target='_blank''>"+fieldvalue+"</a>" : fieldvalue;
        var dbvalue = fieldvalue;
        fieldvalue = ZERP.SLO.processThisFieldValue(fieldname, fieldvalue, thisRow, thisfieldproperties);
        var NumberClass = '';
        if (!!thisfieldproperties.HtmlType && thisfieldproperties.HtmlType == 'number') NumberClass = ' NumberClass ';
        // *** custom code end ----------

        var span = '<span class="dbvalue" style="display:none;">'+dbvalue+'</span> <span class="uservalue">'+fieldvalue+'</span>'
        $td = $('<td class="'+ NumberClass +'" />');
        $td.html( '<div>'+span+'</div>')
        .css("white-space","pre-wrap")
        .attr("fieldname",fieldname)
        .css("cursor","pointer")
        .hover(
          function(){bgOn = $(this).closest("tr").css("background-color"); $(this).closest("tr").css("background-color", "lightblue");},
          // function(){$(this).closest("tr").css("background-color", bgOn);}
          function(){$(this).closest("tr").css("background-color", '');}
        );
        if ( hideColumns.indexOf(fieldname) >= 0 ) $td.css('display','none');
        $td.appendTo($tr);

        // }

      // }  
      });

    // *** custom code start-----------------------------------------------------------------------------------------
    // $tr.find('td.requiredinformation').append(btnThisLineAction);
    // *** custom code end-------------------------------------------------------------------------------------------

      // // handle hover action
      // $tr
      //   .hover(function(e) {
      //     if( $(this).hasClass('dirtyLine') ) return;
      //     $(this).find('td[fieldname=x-lineformactionbuttons]').find('.x-btnLineEdit').css('display', 'inline-block');
      //   }, function(e) {
      //     $(this).find('td[fieldname=x-lineformactionbuttons]').find('.x-btnLineEdit').css('display', 'none');
      // });

      $tr.click( function(e) { 
          var event = e;

          // if(orgBgOn != '') $('#listTable tbody tr.clicked').css("background-color", orgBgOn);
          $('#listTable tbody tr').removeClass('clicked');
          // orgBgOn = bgOn;
          // $(this).closest("tr").css("background-color", "yellow");
          // $(this).closest("tr").css("background-color", "rgba(255, 87, 51, 0.2)");

          // $(this).closest("tr").css("background-color", "#dffafd");
          // bgOn = $(this).closest("tr").css("background-color")
          $(this).closest("tr").addClass('clicked');

          // var cell = $(e.target).get(0); // This is the TD you clicked
          var typex = $(e.target).attr('type'); 
          if(typex == 'checkbox') return; // LineChooser

          if(ZERP.SLO.isEnableExcelMode) return;
          if(ZERP.SLO.lineEditEntryMode) return;
          // var thisfieldname = $(this).closest('td').attr('fieldname');
          var thisfieldname = $(e.target).closest('td').attr('fieldname');

          if(thisfieldname == 'x-options' || thisfieldname == 'x-lineformactionbuttons') return;       
          if(thisfieldname == 'docnumber' || thisfieldname == 'docnumber') return;       

          var thisPtr = this;
          ZERP.SLO.sendBackSearchChoice($(this));
          ZERP.SLO.handleReadEntity(thisPtr, event);

        })
        .appendTo($tbody);
    });

    $thead.appendTo($table)
    $tbody.appendTo($table)

    return $table;
};



/**
 * Override it in child
 * @param  {[type]} thisPtr [description]
 * @param  {[type]} event   [description]
 * @return {[type]}         [description]
 */
ZERP.SLO.handleReadEntity = function(thisPtr, event){
  
  var toolbars = ZERP.System.EntityStructureObj['toolbars'];
  /*if(!!toolbars.std_btnstatus.btnDelete){
    if(!!toolbars.std_btnstatus.btnDelete.active){
      $('.btnDelete  ').closest('table').removeClass('x-item-disabled');
    }
  } else {
    $('.btnDelete  ').closest('table').addClass('x-item-disabled');
  }*/

}




ZERP.SLO.processThisFieldValue = function(fieldname, fieldvalue, thisRow, thisfieldproperties){
  if(!!!thisfieldproperties) return fieldvalue;

  if(!!thisfieldproperties.HtmlType && (thisfieldproperties.HtmlType == 'select' || thisfieldproperties.HtmlType == 'combobox')){
    if (!!thisfieldproperties.DataSource && thisfieldproperties.DataSource == 'this'){
      fieldvalue = thisfieldproperties['data'][fieldvalue];
    } else if (!!thisfieldproperties.DataSource && thisfieldproperties.DataSource == 'CustomizeSQL'){
      fieldvalue = (!!thisfieldproperties['data'][fieldvalue]) ? thisfieldproperties['data'][fieldvalue] : fieldvalue;
    } else if (!!thisfieldproperties.DataSource && thisfieldproperties.DataSource == 'UserGenericGroup'){
      fieldvalue = (!!thisfieldproperties['data'][fieldvalue]) ? thisfieldproperties['data'][fieldvalue] : fieldvalue;
    } else if (!!thisfieldproperties.DataSource && thisfieldproperties.DataSource == 'DomainInstance'){
      fieldvalue = (!!thisfieldproperties['data'][fieldvalue]) ? thisfieldproperties['data'][fieldvalue] : fieldvalue;
    }
  }

  if (!!thisfieldproperties.HtmlType && thisfieldproperties.HtmlType == 'checkbox'){
    if(fieldvalue == '1'){
      fieldvalue = '<input type="checkbox" name="vehicle" value="'+ fieldvalue +'" checked disabled>';
    } else {
      fieldvalue = '<input type="checkbox" name="vehicle" value="'+ fieldvalue +'" disabled>';
    }
    
  }

  if (!!thisfieldproperties.HTMLLinkOutput){
    if(thisfieldproperties.HTMLLinkOutput == 'NewWindow'){
      fieldvalue = '<a href="'+fieldvalue+'" target="_blank">'+fieldvalue+'</a>';
    } else if(thisfieldproperties.HTMLLinkOutput == 'SameWindow') {
      fieldvalue = '<a href="'+fieldvalue+'">'+fieldvalue+'</a>';
    }
  }

  // fieldvalue = (fieldname == "countercode") ? "<a href='erpdocument.php?docnumber="+fieldvalue+"&doctype=DR&&docviewflag=apparel' target='_blank''>"+fieldvalue+"</a>" : fieldvalue;
  fieldvalue = (fieldname == 'docnumber') ? '<a href="main.php?rEntityName=zerp/pkg/sal/SalesOrderLine&rFatherID='+fieldvalue+'" target="_blank">'+fieldvalue+'</a>' : fieldvalue;
  
  if (!!thisfieldproperties.HtmlType && thisfieldproperties.HtmlType == 'odDropdownRefObj'){
    if(!!thisRow.CodeAttributeDecoVals){
      fieldvalue = thisRow.CodeAttributeDecoVals[fieldname];
    }
  }

  if(fieldvalue == null){
    fieldvalue = '';
  }

  if (!!thisfieldproperties.HtmlType && thisfieldproperties.HtmlType == 'number'){
  	fieldvalue = Number(fieldvalue).toLocaleString();
  }
  

  return fieldvalue;
}

/**
* List template code end ================================================================================================================================================================
*/



var ZERP = ZERP || {};
ZERP.ListMgr = {};
ZERP.ListMgr.GenList = {};
ZERP.ListMgr.GenList = {};

ZERP.ListMgr.GenList.setListHeightWidth = function(){
    var _windowWidth = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

    var _windowHeight = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;

    var _screenWidth = screen.width;
    var _screenHeight = screen.height 

    var ZERPContainerID = ZERP.UIMgr.ZERPContainerID;
    var ZERPContainerIDWidth = $('#'+ZERPContainerID).width();
    var ZERPContainerIDHeight = $('#'+ZERPContainerID).height();
    // alert(ZERPContainerIDWidth);

    var _scrollPaneWidth = 150;


    // handle overflow later
    var listTable_width = $('#listTable').width();          // childl
    var listTable_height = $('#listTable').height();          // childl

    // *** 
    // don't care others
    // 1. footer height + ZERP_listGridPanel_header
    // = minus px

    if(listTable_height > _windowHeight){
        $('#ZERP_listGridPanel_scrollerFullWidth').css({
            // 'overflow-y': 'scroll',
            // 'overflow-x' : '',
            // 'height': (_windowHeight - 95) + 'px',
            'float': 'left',
        });
    }

    var listTable_width = $('#ZERP_listGridPanel_scrollerFullWidth').width();          // childl
    if(listTable_height > _windowHeight){
        $('#ZERP_listGridPanel_headerFullWidth').css({
            'overflow': 'hidden',
            'width': listTable_width + 'px'
        });
    }

    // addtional bulbul vai template
    if(listTable_height > _windowHeight){
      $('#main-wrapper').css('padding-bottom', '0px');
    }

}


ZERP.SLO.initTableTdResizeAction = function(){
/*    var pressed = false;
    var start = undefined;
    var startX, startWidth;
    
    $('#listTableSearchForm thead th').mousedown(function(e) {
      // alert('sss');
        start = $(this);
        pressed = true;
        startX = e.pageX;
        startWidth = $(this).width();
        $(start).addClass("resizing");
        $(start).addClass("noSelect");
    });
    
    $(document).mousemove(function(e) {
        if(pressed) {
            $(start).width(startWidth+(e.pageX-startX));
            $(start).css('max-width', startWidth+(e.pageX-startX));
            $(start).css('min-width', startWidth+(e.pageX-startX));
        }
    });
    
    $(document).mouseup(function() {
        if(pressed) {
            $(start).removeClass("resizing");
            $(start).removeClass("noSelect");
            pressed = false;
        }
    });
*/



    var attributeName;
    var EntityAttributes = ZERP.System.EntityStructureObj['Attributes'];
    var CurERP_listGridPanelHeaderWidth = $('#ZERP_listGridPanel_headerFullWidth').width();

    var thElm;
    var startOffset;

    Array.prototype.forEach.call(
      document.querySelectorAll('#listTableSearchForm thead th'),
      function (th) {
        th.style.position = 'relative';

        var grip = document.createElement('div');
        grip.innerHTML = "&nbsp;";
        grip.style.top = 0;
        grip.style.right = 0;
        grip.style.bottom = 0;
        grip.style.width = '5px';
        grip.style.position = 'absolute';
        grip.style.cursor = 'col-resize';
        grip.addEventListener('mousedown', function (e) {
            thElm = th;
            startOffset = th.offsetWidth - e.pageX;
            attributeName = thElm.getAttribute('fieldname');
        });

        th.appendChild(grip);
      });

    document.addEventListener('mousemove', function (e) {
      if (thElm) {
        thElm.style.width = startOffset + e.pageX + 'px';
        $(thElm).css('max-width', startOffset+(e.pageX));
        $(thElm).css('min-width', startOffset+(e.pageX));

    var updateTdWidth = startOffset + e.pageX;
    $('#ZERP_listGridPanel_headerFullWidth').css('width', (CurERP_listGridPanelHeaderWidth + e.pageX) + 'px');

    $(thElm).find('input[type=text]').css({
      "min-width":  (updateTdWidth-8)+"px",
      "width":  (updateTdWidth-8)+"px",
      "max-width":  (updateTdWidth-8)+"px"
    });
    
      var thisAttributeProperties = ( !!EntityAttributes[attributeName] ) ? EntityAttributes[attributeName] : {};
      var htmltype = (!!thisAttributeProperties.HtmlType) ? thisAttributeProperties.HtmlType : '';
      if(htmltype == 'select'){
      $("#listTableSearchForm thead tr#searchForm").find('td[fieldname='+attributeName+'] select').css("min-width",(updateTdWidth-8) + "px");
      $("#listTableSearchForm thead tr#searchForm").find('td[fieldname='+attributeName+'] select').css("width",(updateTdWidth-8) + "px");
      $("#listTableSearchForm thead tr#searchForm").find('td[fieldname='+attributeName+'] select').css("max-width",(updateTdWidth-8) + "px");   

      } else if(htmltype == 'combobox'){
      $("#listTableSearchForm thead tr#searchForm").find('td[fieldname='+attributeName+'] input').css("min-width",(updateTdWidth-30) + "px");
      $("#listTableSearchForm thead tr#searchForm").find('td[fieldname='+attributeName+'] input').css("width",(updateTdWidth-30) + "px");
      $("#listTableSearchForm thead tr#searchForm").find('td[fieldname='+attributeName+'] input').css("max-width",(updateTdWidth-30) + "px");   
      $("#listTableSearchForm thead tr#searchForm").find('td[fieldname='+attributeName+']').find('div.dropdownlistArrowZERPComboBox').css('left', (updateTdWidth-30+0)+'px');

      } else {

      $("#listTableSearchForm thead tr#searchForm").find('td[fieldname='+attributeName+'] input[type=text]').css("min-width",(updateTdWidth-8) + "px");
      $("#listTableSearchForm thead tr#searchForm").find('td[fieldname='+attributeName+'] input[type=text]').css("width",(updateTdWidth-8) + "px");
      $("#listTableSearchForm thead tr#searchForm").find('td[fieldname='+attributeName+'] input[type=text]').css("max-width",(updateTdWidth-8) + "px");    
      
      $("#listTableSearchForm thead tr#searchForm").find('td[fieldname='+attributeName+']').css("min-width",(updateTdWidth-8) + "px");
      $("#listTableSearchForm thead tr#searchForm").find('td[fieldname='+attributeName+']').css("width",(updateTdWidth-8) + "px");
      $("#listTableSearchForm thead tr#searchForm").find('td[fieldname='+attributeName+']').css("max-width",(updateTdWidth-8) + "px");    
      
      $("#listTableSearchForm thead tr#searchForm").find('td[fieldname='+attributeName+'] div.FilterCt').css("min-width",(updateTdWidth-8) + "px");
      $("#listTableSearchForm thead tr#searchForm").find('td[fieldname='+attributeName+'] div.FilterCt').css("width",(updateTdWidth-8) + "px");
      $("#listTableSearchForm thead tr#searchForm").find('td[fieldname='+attributeName+'] div.FilterCt').css("max-width",(updateTdWidth-8) + "px");    
      

      }


    $("#listTable thead tr").find('th[fieldname='+attributeName+']').css("min-width",(updateTdWidth-0) + "px");
    $("#listTable thead tr").find('th[fieldname='+attributeName+']').css("width",(updateTdWidth-0) + "px");
    $("#listTable thead tr").find('th[fieldname='+attributeName+']').css("max-width",(updateTdWidth-0) + "px");

    $("#listTable tbody tr").find('td[fieldname='+attributeName+']').css("min-width",(updateTdWidth-0) + "px");
    $("#listTable tbody tr").find('td[fieldname='+attributeName+']').css("width",(updateTdWidth-0) + "px");
    $("#listTable tbody tr").find('td[fieldname='+attributeName+']').css("max-width",(updateTdWidth-0) + "px");
    $("#listTable tbody tr").find('td[fieldname='+attributeName+'] div').css("width",(updateTdWidth-0) + "px");


      }
    });

    document.addEventListener('mouseup', function () {
        thElm = undefined;
    });


/*
Resource
------------------------------

arr.forEach(function callback(currentValue[, index[, array]]) {
    //your iterator
}[, thisArg]);

Array.prototype.forEach.call( document.querySelectorAll('a'), function(el) {
});

forEach( document.querySelectorAll('a'), function( el ) {
   // whatever with the current node
});

var divs = document.querySelectorAll('div');
[].forEach.call(divs, function(div) {
  // do whatever
  div.style.color = "red";
});

[].forEach.call(
  document.querySelectorAll('.awsome'), 
  function(el){
    doStuffWith(el);
  }
);

---------------------------
var list = document.querySelectorAll( 'input[type=checkbox]' );
for (var item of list) {
  item.checked = true;
}
There is also an Internet Explorer compatible way to use Array.prototype.forEach for iteration.
var list = document.querySelectorAll( 'input[type=checkbox]' );
Array.prototype.forEach.call(list, function (item) {
  item.checked = true;
});
---------------------------

Array.prototype.forEach.call( document.querySelectorAll( selector ),
    function( el ) {
    el.textContent = Math.random();
});
*/

}



ZERP.SLO.searchHeaderTableResizeMaker = function(){
  var $trObj1 = $("#listTable thead tr:nth-child(1)");
  var listTableWidth = $("#listTable").width();
  var isChrome = false; 
  var isFirefox = false;
  if(navigator.userAgent.indexOf("Chrome") != -1 ){
    isChrome = true;
  }
  if(navigator.userAgent.indexOf("Firefox") != -1 ){
    isFirefox = true;
  }

    $('#listTableSearchForm thead tr').find("td").each(function(index) {

      $(this).find('div.searchFieldLabel').css({ 
        // "min-width" : (xx-10) + "px", 
        "overflow":"hidden", 
        "white-space": "nowrap", 
        "text-overflow": "ellipsis"
      });

      var xx =  $(this).innerWidth();     
      var oxx =  $(this).outerWidth();     
      var nxx =  $(this).width();     
      // console.log(xx + '-----' + oxx + '----' + nxx);

      $(this).find('div.FilterCt').css('width', xx + 'px');

      var cn = index + 1;
      var thisfieldname =  $(this).attr('fieldname');
      var fieldname =  $trObj1.find('th:nth-child('+ cn +')').attr('fieldname');
      if(fieldname != thisfieldname) return;

      var thisAttributeProperties = ( !!ZERP.SLO.EntityAttributes[thisfieldname] ) ? ZERP.SLO.EntityAttributes[thisfieldname] : {};
      var htmltype = (!!thisAttributeProperties.HtmlType) ? thisAttributeProperties.HtmlType : '';
      // console.log(htmltype);

      // xx = xx + 2;
      // xx = oxx + 5;
      xx = oxx;

      $(this).find('div.FilterCt').css("padding", "3px");
      $(this).css("vertical-align",  "middle");

      if(htmltype == 'combobox'){

        $(this).css("min-width",  xx+"px");
        $(this).css("width",  xx+"px");
        $(this).css("max-width",  xx+"px");
        $(this).css("overflow",  "hidden");

        $(this).find('input').css({
          "min-width":  (xx-30)+"px",
          "width":  (xx-30)+"px",
          "max-width":  (xx-30)+"px"
        });
        $(this).find('div.dropdownlistArrowZERPComboBox').css({
          "left":  (xx-30+0)+"px",
        });

      } else if(htmltype == 'select'){

        $(this).css("min-width",  xx+"px");
        $(this).css("width",  xx+"px");
        $(this).css("max-width",  xx+"px");
        $(this).css("overflow",  "hidden");
      } else {
        
        $(this).css("min-width",  xx+"px");
        $(this).css("width",  xx+"px");
        $(this).css("max-width",  xx+"px");
        $(this).css("overflow",  "hidden");
        $(this).find('input[type=text]').css({
          "min-width":  (xx-8)+"px",
          "width":  (xx-8)+"px",
          "max-width":  (xx-8)+"px"
        });
      }


      $("#listTableSearchForm thead tr#labelForm").find('th[fieldname='+thisfieldname+']').css("min-width",(xx-0) + "px");
      $("#listTableSearchForm thead tr#labelForm").find('th[fieldname='+thisfieldname+']').css("width",(xx-0) + "px");
      $("#listTableSearchForm thead tr#labelForm").find('th[fieldname='+thisfieldname+']').css("max-width",(xx-0) + "px");
      $("#listTableSearchForm thead tr#labelForm").find('th[fieldname='+thisfieldname+']').css("padding","3px");
      $("#listTableSearchForm thead tr#labelForm").find('th[fieldname='+thisfieldname+']').css("overflow","hidden");
      $("#listTableSearchForm thead tr#labelForm").find('th[fieldname='+thisfieldname+']').find('div.searchFieldLabel').css("text-overflow", "ellipsis");



      $trObj1.find('th:nth-child('+ cn +')').css("min-width",xx + "px");
      $trObj1.find('th:nth-child('+ cn +')').css("width",xx + "px");
      $trObj1.find('th:nth-child('+ cn +')').css("max-width",xx + "px");

      $("#listTable tbody tr").find('td[fieldname='+thisfieldname+']').css("min-width",(xx-16) + "px");
      $("#listTable tbody tr").find('td[fieldname='+thisfieldname+']').css("width",(xx-16) + "px");
      $("#listTable tbody tr").find('td[fieldname='+thisfieldname+']').css("max-width",(xx-16) + "px");
      $("#listTable tbody tr").find('td[fieldname='+thisfieldname+'] div').css({
        'padding-top': '5px',
        'padding-bottom': '5px',
        'padding-left': '8px',
        'padding-right': '8px',
        'width': (xx-0) + 'px',
        'height': '50px',
        'overflow': 'hidden',
        'text-overflow': 'ellipsis'
      });

      $("#listTable tbody tr").find('td[fieldname='+thisfieldname+']').css({
        "overflow": "hidden",
        "text-overflow": "ellipsis"
      });



    });


  $('#ZERP_listGridPanel_scroller').scroll(function(){
    var left = $(this).scrollLeft();
    console.log('I am her---ZERP_listGridPanel_scroller'+left);
    ZERP.SLO.listGridPanelScrolled = true;
    // var left = $(this).scrollLeft() / 1.08 ;
    // left = left + ( -33 );
    $('#ZERP_listGridPanel_headerFullWidth').css('left', -left);


    // if( $('#ZERP_formGridPanel').is(':visible') ){
      var ERP_listGridPanelScroller = $('#ZERP_listGridPanel_scroller').width();
      var aww = ERP_listGridPanelScroller + left;
      $('#ZERP_listGridPanel_headerFullWidth').css({
        'width': aww + 'px'
      });
    // }

    // scrollFixed();
  }); 


  var listTableSearchFormWidth = $('#listTableSearchForm').width();
  $('#listTableSearchForm').css({
    'width': (listTableSearchFormWidth + 0) + 'px',
    'min-width': (listTableSearchFormWidth + 0) + 'px',
    'max-width': (listTableSearchFormWidth + 0) + 'px',
  });

  $('#listTable').css({
    'width': (listTableSearchFormWidth + 0) + 'px',
    'min-width': (listTableSearchFormWidth + 0) + 'px',
    'max-width': (listTableSearchFormWidth + 0) + 'px',
  });

  
  $('#ZERP_listGridPanel_headerFullWidth').css({
    'width': (listTableSearchFormWidth + 0) + 'px',
    // 'min-width': (listTableSearchFormWidth + 0) + 'px',
  });
  var ERP_listGridPanelHeaderWidth = $('#ZERP_listGridPanel_headerFullWidth').width();
  $('#ZERP_listGridPanel_scrollerFullWidth').css({
    'width': (ERP_listGridPanelHeaderWidth + 30) + 'px',
    'min-width': (ERP_listGridPanelHeaderWidth + 30) + 'px',
  });


  $('table#listTableSearchForm tr#searchForm .displaySearchParams .searchByLbl').css('display', 'none');
  $('table#listTableSearchForm tr#searchForm .displaySearchParams .searchByTxt').css('display', 'none');
  $('#ZERP_clearAbsoluteLTH').css('height', $('#ZERP_listGridPanel_headerFullWidth').height() );



  // alert($('#ZERP_listGridPanel_header').height());
  // alert($('#ZERP_listGridPanel_headerInner').height());
  if( $('#ZERP_listGridPanel_headerFullWidth').height() >  ( $('#ZERP_listGridPanel_headerInner').height() + 5) ){
    $('#ZERP_listGridPanel_header').css({
      'height' : $('#ZERP_listGridPanel_headerInner').height() + 'px',
    });
    $('#ZERP_clearAbsoluteLTH').css('height', $('#ZERP_listGridPanel_headerFullWidth').height() );
  }


}




ZERP.SLO.sortByThisColumn = function(SortColumnName){
  // ZERP.SLO.redrawList();
  
  ZERP.SLO.rActiveSortColumnName = SortColumnName;
  if(!!ZERP.SLO.rColumnSortDir){
    if(!!ZERP.SLO.rColumnSortDir[ZERP.SLO.rActiveSortColumnName]){
      if(ZERP.SLO.rColumnSortDir[ZERP.SLO.rActiveSortColumnName] == 'asc'){
        ZERP.SLO.rColumnSortDir[ZERP.SLO.rActiveSortColumnName] = 'desc';
      } else {
        ZERP.SLO.rColumnSortDir[ZERP.SLO.rActiveSortColumnName] = 'asc';
      }
    } else {
      ZERP.SLO.rColumnSortDir[ZERP.SLO.rActiveSortColumnName] = 'asc';
    }
  } else {
    ZERP.SLO.rColumnSortDir = {};
    ZERP.SLO.rColumnSortDir[ZERP.SLO.rActiveSortColumnName] = 'asc';
  }

  var pagenum = $('#pagination').find('span.current').text();
  var lineperpage = $('#divRowLimit').find('select[name=show]').val();
  if(!!!pagenum) pagenum = 1;
  if(!!!lineperpage) lineperpage = 10;

  var searchParams = ZERP.SLO.checkAndRetriveSearchData();
  searchParams.rEntityName = ZERP.SLO.rEntityName;
  searchParams.rSortColumnName = ZERP.SLO.rActiveSortColumnName;
  searchParams.rColumnSortDir = ZERP.SLO.rColumnSortDir[ZERP.SLO.rActiveSortColumnName];

  ZERP.SLO.getListData( lineperpage, pagenum, ZERP.SLO._URL_API, searchParams);

  delete ZERP.SLO.selectedLineInfo;

}








/**
 * [deleteEntity description]
 * @return {[type]} [description]
 */
ZERP.SLO.deleteEntity = function(){
  var r = confirm('Are you sure want to delete this item?');
  if(!r) return;
  
  ZERP.Utils.showProcessinOverlay();

  var baseStructure = ZERP.System.EntityStructureObj;
  var entityKeys = ZERP.System.EntityStructureObj['entityKeys'];
  var entityKeyVals = [];
  var entityKeyValsObj = {};


  // 2. collect data
  var entityObj = {};

  // Iteration through line
  var selectedLineCounter = 0;
  $('#listTableWrapper #listTable tbody tr').each(function(indx, thisTr){
    if( $(thisTr).hasClass('clicked') ){
      selectedLineCounter++;
      $(thisTr).find('td').each(function(){
          var fieldname = $(this).attr('fieldname');
          var fieldvalue = '';
          if($(this).find('div').find('input').length > 0){
            fieldvalue = $(this).find('div #'+fieldname).val();
          }else{
            fieldvalue = $(this).find('div span.dbvalue').text();
          }
          entityObj[fieldname] = fieldvalue;
      });
    }
  });

  // validation
  if(selectedLineCounter == 0){
    alert("Please select at least one Line!"); 
    return;
  } else if(selectedLineCounter > 1){
    alert("Please select one Line!"); 
    return;
  }


  var rEntityName = ZERP.System.EntityStructureObj['_entityName'];
  var rRunTime = ZERP.System.EntityStructureObj['rRunTime'];

  // 3. post data
  /* Submit via ajax */
  var postGB = {
    rEntityName: rEntityName,
    rRunTime: rRunTime,
    rReqType: 'deleteEntity',
    entityObj: JSON.stringify(entityObj),
  };

  // ajax request
  var returnJOSN = {};
  $.ajax({
    async: true,
    type: "POST",
    url: ZERP.System.rRequestApiUrl,
    data: postGB,
    beforeSend: function() {
    },
    success: function(data) {
      returnJOSN = JSON.parse(data);
      ZERP.Utils.removeProcessingOverlay();

      if(!!returnJOSN.errormsgs && returnJOSN.errormsgs.length > 0) {
        console.log(returnJOSN.errormsgs.join('\n'));

        if(returnJOSN._TransactionStatus == 'fail'){
          jsClient.showErrorMeaasge('Fail to save transaction');
        }
        if(!!returnJOSN.UserErrorMsgs){
          jsClient.showErrorMeaasge(returnJOSN.UserErrorMsgs, false);
        }

      } else if(!!returnGB.userErrorMsg){
        jsClient.showErrorMeaasge(returnGB.userErrorMsg, false);
      }


      if(returnJOSN._TransactionStatus == 'success'){
        jsClient.showSuccessMeaasge('Successfully delete data');
        ZERP.SLO.redrawList();
      }

    }
  }).fail(function(e) {
    ZERP.Utils.removeProcessingOverlay();
    jsClient.renderFormError(e.responseText);
  });

}




























































ZERP.SLO.makePagination = function(jsonData){

  var data = JSON.parse(jsonData);
  pageNum      = data['pageNum'];
  lastPageNum  = data['lastPageNum'];
  queryRowsNum = data['queryRowsNum'];
  showLimit    = data['showLimit'];

  var rowLimit =  ZERP.SLO.makeRowLimit(showLimit);
  var pagTable =  ZERP.SLO.getPagination(showLimit, queryRowsNum, pageNum);

  var paginationDiv = '<div style="display:block" id="paginationContainer">';

  paginationDiv += '<div style="float:left;" id="divRefreshList">';
  paginationDiv += '<a href="javascript:void(0);" class="" onclick="ZERP.SLO.redrawList() " style="font-weight:bold;" ><i class="fas fa-sync-alt"></i></a>';
  // paginationDiv += '<a href="javascript:void(0);" class="x-tbar-loading" onclick="ZERP.SLO.redrawList() " style="font-weight:bold; background-image: url(\'lib/assets/images/default/grid/refresh.gif\'); display: inline-block;height: 16px;width: 16px;vertical-align: middle;" ></a>';
  paginationDiv += '</div>';

  paginationDiv += '<div style="float:left;" id="divClearSearch">';
  paginationDiv += '<a href="javascript:void(0);" onclick="ZERP.SLO.clearSearchData()">Clear Search</a>';
  paginationDiv += '</div>';

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

  // var eqbList = ZERP.SLO.makeEQB(jsonData);
  // paginationDiv += '<div style="float:left; margin-left:10px;" id="divEQB">';
  // paginationDiv += '<div>';
  // paginationDiv += '<button type="button" class="btn btn-light" style="padding: .01rem .5rem;font-size: 13px; background-color: white;" onclick="ZERP.SLO.createUpdateEQB();">';
  // paginationDiv += '<i class="fas fa-cog"></i>';
  // paginationDiv += 'Eqb ';
  // paginationDiv += '</button>';
  // paginationDiv += eqbList;
  // paginationDiv += '</div>';
  // paginationDiv += '</div>';

  // paginationDiv += '<div style="float:right; display:block;">';
  // paginationDiv += '<div id="divFullScreenList" class="ListHelperIcon">';
  // paginationDiv += '<a href="javascript:void(0);" onclick="ZERP.SLO.redrawList() " style="font-weight:bold;" ><i class="fas fa-list-ul"></i></a>';
  // paginationDiv += '</div>';
  // paginationDiv += '<div id="divFullScreenList" class="ListHelperIcon">';
  // paginationDiv += '<a href="javascript:void(0);" onclick="ZERP.SLO.redrawList() " style="font-weight:bold;" ><i class="fas fa-grip-horizontal"></i></a>';
  // paginationDiv += '</div>';
  // paginationDiv += '<div id="divFullScreenList" class="ListHelperIcon">';
  // paginationDiv += '<a href="javascript:void(0);" onclick="ZERP.SLO.redrawList() " style="font-weight:bold;" ><i class="fas fa-arrows-alt"></i></a>';
  // paginationDiv += '</div>';
  // paginationDiv += '</div>';



  paginationDiv += '</div>';

  return paginationDiv;
}


ZERP.SLO.makeRowLimit = function(show){

    var rowLimit = "";
    rowLimit += '<div> <span id="spanRowLimit">Rows Limit:</span>' 
    rowLimit += '<select name="show" onChange="ZERP.SLO.changeDisplayRowCount(this.value);">';
    rowLimit += (show == 5) ? '<option value="5" selected="selected" >5</option>' : '<option value="5">5</option>';
    rowLimit += (show == 10) ? '<option value="10" selected="selected" >10</option>' : '<option value="10">10</option>';
    rowLimit += (show == 20) ? '<option value="20" selected="selected" >20</option>' : '<option value="20">20</option>';
    rowLimit += (show == 30) ? '<option value="30" selected="selected" >30</option>' : '<option value="30">30</option>';
    rowLimit += (show == 40) ? '<option value="40" selected="selected" >40</option>' : '<option value="40">40</option>';
    rowLimit += (show == 50) ? '<option value="50" selected="selected" >50</option>' : '<option value="50">50</option>';
    rowLimit += (show == 100) ? '<option value="100" selected="selected" >100</option>' : '<option value="100">100</option>';
    rowLimit += (show == 150) ? '<option value="150" selected="selected" >150</option>' : '<option value="150">150</option>';
    rowLimit += '</select>';
    rowLimit += '</div>';

    return rowLimit;

}

ZERP.SLO.changeDisplayRowCount = function(numRecords) {
    ZERP.SLO.getListData(numRecords, 1);
}

ZERP.SLO.getPagination = function(showLimit, rows, page){ 

    var limit = showLimit;
    var adjacents = 3;
    show = showLimit;

    pagination='';
    if (page == 0) page = 1;                    //if no page var is given, default to 1.
    prev = Number(page) - 1;                            //previous page is page - 1
    next = Number(page) + 1;                            //next page is page + 1
    prev_='';
    first='';
    // lastpage = Math.round(rows/limit);  
    lastpage = Math.ceil(rows/limit);  
    next_='';
    last='';

    if(lastpage > 1)
    {   
        
        //previous button
        if (page > 1) 
            // prev_+= "<a class='page-numbers' href=\"?page=prev\">previous</a>";
            prev_  += '<a href="javascript:void(0);" class="page-numbers page-'+ prev +'"  onclick="ZERP.SLO.getListData(  \''+ show +'\'      ' +","+ '    \'' + prev+ '\');" > previous </a>';

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
                    pagination  += '<a href="javascript:void(0);" class="page-numbers page-'+ counter +'"  onclick="ZERP.SLO.getListData(  \''+ show +'\'      ' +","+ '    \'' + counter+ '\');" > ' + counter + ' </a>';
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
                    pagination  += '<a href="javascript:void(0);" class="page-numbers page-'+ counter +'"  onclick="ZERP.SLO.getListData(  \''+ show +'\'      ' +","+ '    \'' + counter+ '\');" > ' + counter + ' </a>';

                }
            // last+= "<a class='page-numbers' href='?page="+lastpage + "' " + ">Last</a>";          
            last+= '<a href="javascript:void(0);" class="page-numbers page-'+ counter +'"  onclick="ZERP.SLO.getListData(  \''+ show +'\'      ' +","+ '    \'' + lastpage+ '\');" > ' + 'Last' + ' </a>';          
            }
            
            //in middle; hide some front and some back
            else if(lastpage - (adjacents * 2) > page && page > (adjacents * 2))
            {
               // first+= "<a class='page-numbers' href='?page=1'>First</a>";    
               first+='<a href="javascript:void(0);" class="page-numbers page-'+ counter +'"  onclick="ZERP.SLO.getListData(  \''+ show +'\'      ' +","+ '    \'' + '1'+ '\');" > ' + 'First' + ' </a>';          
   
            for (counter = page - adjacents; counter <= (Number(page) + Number(adjacents)); counter++)
                {
                    if (counter == page)
                        pagination+= "<span class=current>" + counter + "</span>";
                    else
                        // pagination+= "<a class='page-numbers' href='?page=" + counter + "' " + ">counter</a>"; 
                    pagination  += '<a href="javascript:void(0);" class="page-numbers page-'+ counter +'"  onclick="ZERP.SLO.getListData(  \''+ show +'\'      ' +","+ '    \'' + counter+ '\');" > ' + counter + ' </a>';

                }
                // last+= "<a class='page-numbers' href='?page='"+lastpage +"' " + ">Last</a>";          
                last+= '<a href="javascript:void(0);" class="page-numbers page-'+ counter +'"  onclick="ZERP.SLO.getListData(  \''+ show +'\'      ' +","+ '    \'' + lastpage+ '\');" > ' + 'Last' + ' </a>';                  
            }
            //close to end; only hide early pages
            else
            {
                // first+= "<a class='page-numbers' href='?page=1'>First</a>";   
                first+='<a href="javascript:void(0);" class="page-numbers page-'+ counter +'"  onclick="ZERP.SLO.getListData(  \''+ show +'\'      ' +","+ '    \'' + '1'+ '\');" > ' + 'First' + ' </a>';             
                for (counter = lastpage - (2 + (adjacents * 2)); counter <= lastpage; counter++)
                {
                    if (counter == page)
                        pagination+= "<span class='current'>"+counter+"</span>";
                    else
                        // pagination+= "<a class='page-numbers' href='?page="+counter+"' " + ">counter</a>";   
                    pagination  += '<a href="javascript:void(0);" class="page-numbers page-'+ counter +'"  onclick="ZERP.SLO.getListData(  \''+ show +'\'      ' +","+ '    \'' + counter+ '\');" > ' + counter + ' </a>';

                }
                last='';
            }
            
            }





        if (page < counter - 1) 
            // next_+= "<a class='page-numbers' href='?page='"+next+">next</a>";
            next_  += '<a href="javascript:void(0);" class="page-numbers page-'+ next +'"  onclick="ZERP.SLO.getListData(  \''+ show +'\'      ' +","+ '    \'' + next+ '\');" > next </a>';


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


ZERP.SLO.paginationCSS = function(){


  $('#paginationContainer #divClearSearch').css({
    // 'padding':'4px 10px',
    'padding-left' : '10px',
    'color':'dodgerblue',
    'font-weight':'bold',
    // 'margin-top': '3pt',
    // 'height': '20pt'
  });


  $('#paginationContainer #divRowCounter').css({
    // 'padding':'4px 10px',
    'padding-left' : '10px',
    // 'color':'black',
    'font-weight':'bold',
    // 'border': '2px solid blue',
    // 'vertical-align': 'text-bottom',
    // 'margin-top': '3pt',
    // 'height': '20pt'
  });


  $('#paginationContainer #divPage').css({
    'padding-left' : '10px',
    // 'padding':'4px 10px',
  });

  $('#paginationContainer #divRowLimit').css({
    'padding-left' : '10px',
    // 'padding':'4px 10px',
    // 'color':'black',
    'font-weight':'bold',
    // 'border': '2px solid blue',
    // 'vertical-align': 'text-bottom',
    // 'height': '20pt'
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
    'padding':'3px 7px',
    'color':'white',
    'margin':'0px 1px 0px 1px',
    'display':'block',
    'text-decoration':'none',
    'float':'left',
    'text-transform':'capitalize',
    'background':'whitesmoke',
    'background':'#1ca8dd',
  });
  $('.pagination .page-numbers').css({
    'padding':'3px 7px',
    'color':'white !important',
    'margin':'0px 1px 0px 1px',
    'display':'block',
    'text-decoration':'none',
    'float':'left',
    'text-transform':'capitalize',
    // 'background':'#98c0f4',
    'background':'#1ca8dd',
    'background':'whitesmoke',
    // 'color': 'steelblue',
    'color': 'powderblue',
    'color': 'gray'
  });

  $('#paginationContainer').css({
    'padding-top': '5px',
  });


}
//======================================================= ===================================================================




ZERP.SLO.makeEQB = function(jsonData){

  var data = JSON.parse(jsonData);
  var UserSelectedEqbName = '';
  var rActiveEqb = '';
  if(!!data.rActiveEqb){
    UserSelectedEqbName = data['rActiveEqb'];
    rActiveEqb = ''; data['rActiveEqb'];
  }

  var baseStructureObj = ZERP.System.EntityStructureObj;
  var ExtEqbs = baseStructureObj['EXTEQBS'];

  var options = '<option value="System">System</option>';
  var options = '';
  // for (var i = 0; i < ExtEqbs.length; i++) {
  //   var thisEqbName = ExtEqbs[i];
  //   options += '<option value="'+thisEqbName+'">'+ thisEqbName +'</option>';
  // }

  for (var key in ExtEqbs) {
    var thisEqbName = key;
    var thisEqbProperties = ExtEqbs[key];

    var Name = thisEqbProperties['Name'];
    var Default = thisEqbProperties['Default'];
    var selected = '';
    // console.log('@M--->'+UserSelectedEqbName + '----' + Name);
    if(UserSelectedEqbName != ''){
      if(UserSelectedEqbName == Name){
        selected = 'selected';
      }
      
    } else {
      if(Default == '1'){
        selected = 'selected';
      } 
    }
    options += '<option value="'+thisEqbName+'" '+selected+' >'+ Name +'</option>';
  }


  var eqbList = '';
  eqbList += '<select style="vertical-align: middle;" onchange="ZERP.SLO.handleUserChangeEQB(this);">';
  eqbList += '<option value="">Select</option>';
  eqbList += options;
  eqbList += '</select>';

  return eqbList;
  
}





ZERP.SLO.handleUserChangeEQB = function(thisPtr){
  ZERP.SLO.EqbChanged = true;
  var UserSelectEqbName = $(thisPtr).val();

  ZERP.SLO.rActiveEqb = UserSelectEqbName;

  // alert(UserSelectEqbName);

  // Cal get List data function with this EqbName


  var pagenum = $('#pagination').find('span.current').text();
  var lineperpage = $('#divRowLimit').find('select[name=show]').val();
  if(!!!pagenum) pagenum=1;
  if(!!!lineperpage) lineperpage=10;

  var searchParams = ZERP.SLO.checkAndRetriveSearchData();
  searchParams.rEntityName = ZERP.SLO.rEntityName;

  ZERP.SLO.getListData( lineperpage, pagenum, ZERP.SLO._URL_API, searchParams);


}











ZERP.SLO.createUpdateEQB = function(){

  modalInts = new wModal.WindowModalBSV1Class();
  var modalContainer = modalInts.createNewModal();
  // alert(modalContainer);
  var modal = $(modalContainer);
  modal.find('.modal-title').text('Customize List');
  var bodyStr = 'ABC';
  var bodyStr = '\
  <div class="ct" id="EqbContainer">\
    <div class="ct-in" style="display:flex;"">\
      <div class="AvailableFields" style="width: 50%; min-height:150px; display:inline-block; border:1px solid red; padding: 5px;">\
        <label style="display:block;">All Fields</label>\
        <textarea rows="4" cols="10" style="width:100%" id="txtAvailableFields"></textarea>\
      </div>\
      <div class="SelectedFields" style="width: 50%; min-height:150px; display:inline-block; border:1px solid red; padding: 5px;">\
        <label style="display:block;">Choosen Fields</label>\
        <textarea rows="4" cols="10" style="width:100%" id="txtSelectedFields"></textarea>\
      </div>\
    </div>\
    <div class="fth-ct" style="display:flex;">\
      <div class="WhereClause" style="width:50%; min-height:100px; border:1px solid red; padding:5px;">\
        Customize Conditions\
        <textarea rows="4" cols="10" style="width:100%" id="txtWhereClause"></textarea>\
      </div>\
      <div class="OrderClause" style="width:50%; min-height:100px; border:1px solid red; padding:5px;">\
        Order Conditions\
        <textarea rows="4" cols="10" style="width:100%" id="txtOrderClause"></textarea>\
      </div>\
    </div>\
    <div style="padding:5px;">EQB Name: <input type="text" name="EqbName" id="EqbName" style="width:70%;" />*</div>\
    <div style="padding:5px;">User Name: <input type="text" name="EqbUserName" id="EqbUserName" style="width:40%;" /> Default: <input type="checkbox" name="EqbUserDefault" id="EqbUserDefault" /></div>\
  </div>\
  ';

  modalInts.setBodyHTML(bodyStr);
  modalInts.addFade();
  modalInts.setCallBackFunctionName('ZERP.SLO.saveUserEqbData');


  var EntityAttributes = ZERP.System.EntityStructureObj['Attributes'];
  var ConcateAttribute = '';
  for(key in EntityAttributes){
    var ThisAttributesProperties = EntityAttributes[key];
    if(ThisAttributesProperties.attributetype == 'UIStyle') continue;
    ConcateAttribute += key + ",\n";
  }
  $('#txtAvailableFields').val(ConcateAttribute);

  // Call to server if have already choosen fields
  // Call to server if have already where fields
  // Call to server if have already order by fields
  // 

  // This will take will action in php in during field cluasue prepartion
}


ZERP.SLO.saveUserEqbData = function(thisPtr){
  // alert('Save data');

  var txtSelectedFields = $('#EqbContainer #txtSelectedFields').val();
  var txtWhereClause = $('#EqbContainer #txtWhereClause').val();
  var txtOrderClause = $('#EqbContainer #txtOrderClause').val();

  var txtEqbName = $('#EqbContainer #EqbName').val();
  var txtEqbUserName = $('#EqbContainer #EqbUserName').val();
  var txtEqbUserDefault = ( $('#EqbContainer #EqbUserDefault').prop('checked') === true ) ? '1' : '0';

  var txtEntityName = ZERP.System.EntityStructureObj['ENTITY_NAME'];

  // Validation
  if(txtSelectedFields == '' || txtSelectedFields == null){
    // alert('Choosen Fields is mandatory');
    // return;
  }
  if(txtEqbName == '' || txtEqbName == null){
    alert('Eqb Name is mandatory');
    return;
  }
  if(txtEntityName == '' || txtEntityName == null){
    alert('Entity Name is mandatory');
    return;
  }



  var PostBean = {};
  PostBean.EqbName = txtEqbName;
  PostBean.EntityName = txtEntityName;
  PostBean.UserName = txtEqbUserName;

  PostBean.ExtSelectStr = txtSelectedFields;
  PostBean.ExtWhereStr = txtWhereClause;
  PostBean.ExtOrderByStr = txtOrderClause;

  PostBean.Default = txtEqbUserDefault;
  PostBean.ExtQueryStr = '';
  // System Variable
  PostBean.rEntityName = 'UserEqb';
  PostBean.rReqType = 'saveUserEqb';

  var apiURL = ZERP.System.EntityStructureObj['ENTITY_API_URL'];

  $.ajax({
    method: "POST",
    url: apiURL,
    data: PostBean,
    cache: false,
    beforeSend: function( jqXHR, settings ) {
    }

  }).done(function( response, textStatus, xhr ) {

    modalInts.closeThisModal();

    // if ( console && console.log ) {
    //   console.log( "Sample of data:", data.slice( 0, 100 ) );
    // }

  }).fail(function() {

    alert( "error" );

  });
  

}