/**
 * Declare the namespace LIZERP if not existent
 */
// var LIZERP = LIZERP || {};
var ZERP = ZERP || {};
ZERP.FrmMgr = ZERP.FrmMgr || {};
ZERP.FrmMgr.genFrm = ZERP.FrmMgr.genFrm || {};
ZERP.FrmMgr.plnFrm = ZERP.FrmMgr.plnFrm || {};


//=================================================================================================================================
/*
	======== All Functions at a Glance ========
POPLIST.initList = function()
POPLIST.redrawList = function()
POPLIST.getListData = function(numRecords, pageNum, apiURL, searchParams)
POPLIST.sendBackSearchChoice = function(thisRow)
POPLIST.exportToExecl = function()
POPLIST.enableExcelMode = function()
POPLIST.applyCustomListCSS = function()
POPLIST.displayQueryData = function(jsonData)
POPLIST.makeTable = function(jsonData,hasData) {
POPLIST.getSearchData = function()
POPLIST.initSearchAction = function()
POPLIST.changeTempleteCSS = function()
POPLIST.checkAndRetriveSearchData = function()
POPLIST.generateFirstHeaderTr = function()
POPLIST.setPriviousSearchParams = function(searchParams)
POPLIST.handleThisSearchInputFieldClick = function(thisf)
POPLIST.resetDateSearchField = function(thisf)
POPLIST.handleCustomSearch = function(thisf)
POPLIST.closeExpandDiv = function(thisf)
POPLIST.initDisApprear = function()
POPLIST.resetCustomSearchField = function(thisf)
POPLIST.submitCustomSearchField = function(thisf,compositeFieldName)
POPLIST.makeHTML_InputField = function(fieldname,fieldprop,fieldvalue,count)
POPLIST.makeDropdownOptions = function(field, defaultval, fieldprop) {
POPLIST.clearSearchData = function()
POPLIST.handleLineChooserCheckboxClick = function(thisf)
POPLIST.actionButton = function()
POPLIST.closeISWEMsg = function(thisf)
POPLIST.makePagination = function(jsonData)
POPLIST.makeRowLimit = function(show)
POPLIST.changeDisplayRowCount = function(numRecords) {
POPLIST.getPagination = function(showLimit, rows, page) 
POPLIST.paginationCSS = function()
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
 * Declare POPLIST Namespace if not exist
 */
var POPLIST = POPLIST || {};

$.extend(POPLIST, {
  mUrl: 'api/server_api.php',
  mType: 'get',
  mData: '',
  mAsync: false,
  mReqType: '',
  queryData: '',
  queryParam: '',
  _searchParams: '',
  _sessionCall: false,  
  _URL_API: 'list-docname_api.php',
  isEnableExcelMode: false,
  populateLibCache: [],
  libraryColumns: {},

  foo: 'here for no reason other than to be the last line, without a comma'
});


// System variables
POPLIST._URL_API;
POPLIST._baseStructure;;
POPLIST._baseStructureObj;
POPLIST.EntityAttributes;
POPLIST.rEntityName; // Company
POPLIST.rFullEntityPath; // zerp06/pkg/Company
POPLIST.rRunTime; // 0 or 1
POPLIST.rRequestAPI; // pkg/bas/ProcessClientRequest.php
POPLIST.LookupParameters;
POPLIST.LinkedAttrs;


POPLIST.addSystemVariables = function(GenericBean){
  GenericBean.rEntityName = POPLIST.rEntityName;
  GenericBean.rFullEntityPath = POPLIST.rFullEntityPath;
  GenericBean.rRunTime = POPLIST.rRunTime;
  return GenericBean;
}




// -------------------------------- Handle lookup fields -------------------------------------

POPLIST.processList = function(listparams){
  var listApiURL = listparams['listApiURL'];
  POPLIST._URL_API = listApiURL;
  POPLIST._baseStructure = listparams['_baseStructure'];
  POPLIST._baseStructureObj = JSON.parse(POPLIST._baseStructure);
  POPLIST.EntityAttributes = POPLIST._baseStructureObj['attributes'];
  //                  show,   page,   api_url
  POPLIST.getListData(20,     1,      listApiURL);
}


POPLIST.preListDocSettings = function(){
  // Enable Line entry form
  // define

  // POPLIST.enableListLineEditForm = false;
  // POPLIST.enableListLineEditForm = true;
  // POPLIST.enableNewListLineEntryForm = true;


  // POPLIST.showFirstOptionTd = true;
  // POPLIST.showLineChooserBtn = true;

  // POPLIST.lineEditEntryMode = false;


  POPLIST.enableListLineEditForm = false;
  POPLIST.enableNewListLineEntryForm = false;


  POPLIST.showFirstOptionTd = false;
  POPLIST.showLineChooserBtn = false;

  POPLIST.lineEditEntryMode = false;

  
}

POPLIST.postListDocSettings = function(){
  // execute

  // $("#listTable tr").find("th:first").css('display', 'none');
  // $("#listTable tr").find("td:first").css('display', 'none');
  if(!POPLIST.enableListLineEditForm){
    $("#listTable_PopList tr").find("th:nth-child(2)").css('display', 'none');
    $("#listTable_PopList tr").find("td:nth-child(2)").css('display', 'none');
  }
  if(!POPLIST.enableListLineEditForm){
    $("#listTableSearchForm_PopList tr").find("td:nth-child(2)").css('display', 'none');
  }
  if(!POPLIST.showFirstOptionTd){
    $("#listTableSearchForm_PopList tr").find("th:nth-child(2)").css('display', 'none');
    $("#listTableSearchForm_PopList tr").find("td:nth-child(2)").css('display', 'none');
  }
  if(!POPLIST.showLineChooserBtn){
    $("#listTableSearchForm_PopList tr").find("th:nth-child(1)").css('display', 'none');
    $("#listTableSearchForm_PopList tr").find("td:nth-child(1)").css('display', 'none');
    $("#listTable_PopList tr").find("td:nth-child(1)").css('display', 'none');
    $("#listTable_PopList tr").find("th:nth-child(1)").css('display', 'none');
  }


  // syncronus method, after table draw----------------------------
  POPLIST.searchHeaderTableResizeMaker();
  POPLIST.initTableTdResizeAction();

}



POPLIST.redrawList = function(){
	// if(!!something) delete something;
	// POPLIST.getListData('50', '1');
	var pagenum = $('#pagination').find('span.current').text();
	var lineperpage = $('#divRowLimit').find('select[name=show]').val();
	if(!!!pagenum) pagenum=1;
	if(!!!lineperpage) lineperpage=10;
	POPLIST.getListData( lineperpage, pagenum );

	delete POPLIST.selectedLineInfo;
}

POPLIST.initList = function(){
	if(!!POPLIST._searchParams){
		POPLIST.setPriviousSearchParams(POPLIST._searchParams);
	}
}


POPLIST.sendBackSearchChoice = function(thisRow){
  var docnumber = $(thisRow).find('td[fieldname=docnumber]').text();
  alert(docnumber);
}


/**
 * How to use 
 * just call this function
 */
POPLIST.initSearchAction = function(){
    // $('#searchForm input').keypress(function (event) {
    //     if (event.which == 13) {
    //         POPLIST.getSearchData();        
    //     }
    // });
    $('#searchForm_PopList input').off('keyup').on('keyup',function(event){
        if (event.which == 13) {
            POPLIST.getSearchData();        
        }
    });
}

POPLIST.checkAndRetriveSearchData = function(){
    var searchParams = {};
    $('table#listTableSearchForm_PopList thead tr').each(function() {
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
POPLIST.getListData = function(numRecords, pageNum, apiURL, searchParams) {

  var numRecords = (!!numRecords && numRecords != '') ? numRecords : '10';
  var pageNum    = (!!pageNum && pageNum != '') ? pageNum : '10';
  var apiURL     = (!!apiURL && apiURL != '') ? apiURL : POPLIST._URL_API;


  if(!!!searchParams){
    // check search field value is exist 
    // user may click in pagination page after search
    searchParams = POPLIST.checkAndRetriveSearchData();
  }
  var searchParams = (!!searchParams && Object.keys(searchParams).length > 0)? searchParams : {};

  var inputPlusUrlSearchParams = {};
  $.each(searchParams, function(key, val){
    inputPlusUrlSearchParams[key] = val; // push input search param
  });

  searchParams['showLimit'] = numRecords;
  searchParams['pageNum'] = pageNum;
  searchParams['rReqType'] = 'getListData';

  // var urlSearchParams = (!POPLIST._sessionCall) ? jsClient.paramsToObj(window.location.search) : {}
  var urlSearchParams = {}
  if( Object.keys(urlSearchParams).length > 0 ){
      // var inputSearchParams = (!!POPLIST._searchParams && POPLIST._searchParams.length > 0) ? JSON.parse(POPLIST._searchParams) : {};
    // var inputPlusUrlSearchParams = (Object.keys(inputSearchParams).length > 0) ? inputSearchParams : {};
    $.each(urlSearchParams, function(key, val){
      searchParams[key] = val; // push url search data in search param object
      inputPlusUrlSearchParams[key] = val; // push url search data in search param object
    });
  }
  if( Object.keys(inputPlusUrlSearchParams).length > 0 ){
    POPLIST._searchParams = JSON.stringify(inputPlusUrlSearchParams);
  }

  if(!!!searchParams.rEntityName) searchParams.rEntityName = POPLIST.rEntityName;
  if(!!!searchParams.rRunTime) searchParams.rRunTime = POPLIST.rRunTime;

    $.ajax({
      type: "GET",
      url: apiURL,
      data: searchParams,
      cache: false,
      beforeSend: function() {
          $('#ZERPDataLoadingPanel_PopList').html('<center><img src="lib/assets/img/loading_spinner.gif"></center>');
      },
      success: function(jsonData) {
        $('#ZERPDataLoadingPanel_PopList').html('');
          var parseData = JSON.parse(jsonData);
          POPLIST.displayQueryData(jsonData);
      }
    });

}


POPLIST.displayQueryData = function(jsonData){

  POPLIST.preListDocSettings();

  var pagination = POPLIST.makePagination(jsonData);

  var data = JSON.parse(jsonData);
  var hasData = (data.noResult) ? 'no' : 'yes';
  var listTable = POPLIST.makeTable(jsonData, hasData);

  $("#ZERP_pgnGridPanel_PopList").html(pagination);
  $("#listTableWrapper_PopList").html(listTable);
  POPLIST.initSearchAction();

  POPLIST.paginationCSS();
  POPLIST.applyCustomListCSS();
  // POPLIST.changeTempleteCSS();
  POPLIST.initList();

  POPLIST.postListDocSettings();

  ZERP.ListMgr.GenList.setListHeightWidth();


}



POPLIST.generateFirstHeaderTr = function(){
	return $tr;
}

POPLIST.handleThisSearchInputFieldClick = function(thisf){}



POPLIST.handleCustomSearch = function(thisf){
  if($('#listDOCExpandDivID').length) $('body').find('#listDOCExpandDivID').remove();
	
  var customSearchFiedlName = $(thisf).closest('td').prop('class');
  if(!!POPLIST.compositeColumns[customSearchFiedlName]){
    if(!!POPLIST.compositeColumns[customSearchFiedlName][customSearchFiedlName]){ //its already single
      if(!!!POPLIST.compositeColumns[customSearchFiedlName][customSearchFiedlName]['customsearch'])  return;
      // if(!!POPLIST.compositeColumns[customSearchFiedlName][customSearchFiedlName]['customsearch']  && POPLIST.compositeColumns[customSearchFiedlName][customSearchFiedlName]['hidefromcsearch'])  return;
    }
  } 

  var fieldvalue = $(thisf).closest('td').find('input').val();
  var fieldvalues = fieldvalue.split(',__');  

  var dateSearchDiv = '\
    <div id="listDOCExpandDivID" style="position:relative; display:none;">\
    <div class="customSearchExpand listDOCExpandDiv" style="position:absolute; background:white; min-width:300px; padding:10px; padding-bottom:25px;">\
    <div style="float:right;">\
    <button type="button" onclick="POPLIST.closeExpandDiv(this);"><img src="lib/img/cancel.png" alt="" height="10" width="10"></button>\
    </div>\
    <div style="clear:both;"></div>\
    <form id="customSearchForm">\
    <table>';

    count = 0;
    $.each(POPLIST.compositeColumns[customSearchFiedlName],function(fieldname,fieldprop){
      dateSearchDiv += POPLIST.makeHTML_InputField(fieldname,fieldprop,fieldvalue,count);
      count++;
    });

    dateSearchDiv +='<tr><td colspan="3" style="text-align:right;">\
    	<button type="button" onclick="POPLIST.submitCustomSearchField(this,\''+customSearchFiedlName+'\');">Search</button>\
      	&nbsp;&nbsp;&nbsp;\
      	<button type="button" onclick="POPLIST.resetCustomSearchField(this);">Reset</button>\
      </td></tr>\
      </table>\
      </form>\
      </div>\
      </div>';
  $(thisf).closest('td').append(dateSearchDiv);
  $('#listDOCExpandDivID').fadeIn('slow');
  jsClient.initDateTimePicker();

}

POPLIST.closeExpandDiv = function(thisf){
	if($('#listDOCExpandDivID').length) $('body').find('#listDOCExpandDivID').remove();
}



POPLIST.resetCustomSearchField = function(thisf){
  var fieldname = $(thisf).attr('destinationAttribute');
  $('#listTableSearchForm #searchForm').find('td[fieldname='+ fieldname +']').find('input, select').val('');
  $('body').find('#listDOCExpandDivID').remove();
  POPLIST.getSearchData();

  // var fieldname = $(thisf).parent().parent().parent().parent().parent().parent().parent(). parent().prop('class');
  // $(thisf).parent().parent().parent().parent().parent().parent().parent(). parent().find('center input').val('');
  // $('body').find('#listDOCExpandDivID').remove();
  // POPLIST.getSearchData();
}



POPLIST.submitCustomSearchField = function(thisf,compositeFieldName){
	var fieldname = $(thisf).attr('destinationAttribute');
	var thisForm = $('#customSearchForm');
	var searchParams = jsClient.formToSerializeObject(thisForm);

  var countFieldWithValue = 0;
  $.each(searchParams, function(fieldname, fieldvalue){
    countFieldWithValue++;
  });
  if(countFieldWithValue == 0) return;

  var customSearchValue = "";
  // var compositeFields = POPLIST.compositeColumns[compositeFieldName];
  if(!!POPLIST.compositeColumns[compositeFieldName]){
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
  POPLIST.getSearchData();

}

POPLIST.makeHTML_InputField = function(fieldname,fieldprop,fieldvalue,count){}




POPLIST.genereicDropdownOptionsMaker = function(fieldname, defaultval, fieldproperties) {
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
    if(POPLIST.populateLibCache[fieldproperties.library]){
      var cacheData = POPLIST.populateLibCache[fieldproperties.library];
      var setasdefault = 'selected';
      $.each(cacheData, function(index, value) {
        setasdefault = (!!defaultval && (value == defaultval || index == defaultval)) ? 'selected' : '';
        options += '<option value="' + index + '" '+ setasdefault +'>' + value + '</option>';
      });
      return options;
    }
  }
  

  // prepare ajax retquest to take data from server
  var baseStructure = JSON.parse( POPLIST._baseStructure );
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




POPLIST.clearSearchData = function(){
    delete POPLIST._searchParams;
    $('table#listTableSearchForm_PopList thead tr').each(function() {
        $(this).find("td input:text, input:hidden,select").each(function() {
            $(this).val('');
        });
    });
  POPLIST.getListData('50', '1');
}
/**
* List template code end ================================================================================================================================================================
*/



/**
* Custom code------------------------------------------------------------------------------------------------------
*/
POPLIST.handleLineChooserCheckboxClick = function(thisf){
  var thisrow = $(thisf).closest('tr').attr('data-id');
  console.log(thisrow);
  var docnumber = $(thisf).closest('tr').find('td[fieldname=docnumber] .ccell3 a').text();
  // var bomlinestatus = $(thisf).closest('tr').find('td[fieldname=bomlinestatus]').text();

  var chooserType = $(thisf).prop('class');
  if(chooserType == 'multipleLineChooser'){
    // define array
    if(!!!POPLIST.selectedLineInfo){
      POPLIST.selectedLineInfo  = {};
      POPLIST.selectedLineInfo.uniquekey = [];
      POPLIST.selectedLineInfo.docnumber = [];
    } 
    if($(thisf).prop('checked')){
      $(thisf).prop('checked', true);
      // push data in array
      POPLIST.selectedLineInfo.uniquekey.push(thisrow);
      POPLIST.selectedLineInfo.docnumber.push(docnumber);

    } else {
      $(thisf).prop('checked', false);
      var index = POPLIST.selectedLineInfo.uniquekey.indexOf(thisrow);
      // pop data in array
      POPLIST.selectedLineInfo.uniquekey.splice(index, 1);
      POPLIST.selectedLineInfo.docnumber.splice(index, 1);
      console.log(JSON.stringify(POPLIST.selectedLineInfo.docnumber) + '---' + index);
    }


  } else if (chooserType == 'singleLineChooser'){

    if($(thisf).prop('checked')){
      $('.singleLineChooser').prop('checked', false);
      $(thisf).prop('checked', true);

      delete POPLIST.docnumber;
      delete POPLIST.bomlinestatus;
      // define variable
      if(!!!POPLIST.docnumber) POPLIST.docnumber = docnumber;
      if(!!!POPLIST.bomlinestatus) POPLIST.bomlinestatus = 'xxxx';

    } else {
      $(thisf).prop('checked', false);
      delete POPLIST.docnumber;
      delete POPLIST.bomlinestatus;
    }
  }


}






//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * [setPriviousSearchParams description]
 * @param {[type]} searchParams [description]
 */
POPLIST.setPriviousSearchParams = function(searchParams){
  $('table#listTableSearchForm_PopList tr#searchForm_PopList .displaySearchParams .searchByLbl').html('');
  $('table#listTableSearchForm_PopList tr#searchForm_PopList .displaySearchParams .searchByTxt').html('');

  $('table#listTableSearchForm_PopList tr#searchForm_PopList .displaySearchParams .searchByLbl').css('display', 'inline-block');
  $('table#listTableSearchForm_PopList tr#searchForm_PopList .displaySearchParams .searchByTxt').css('display', 'inline-block');

  searchParams = JSON.parse(searchParams);
  $.each(searchParams, function(key, val){
    var fieldID = "#"+key;
    var fieldValue = val;
    // $("#searchForm "+fieldID).val(fieldValue);
    // $("#searchForm "+fieldID).focus();

    $("#searchForm_PopList input[name="+key+"], #searchForm_PopList select[name="+key+"]").val(fieldValue);
    $("#searchForm_PopList "+fieldID).focus();

    var EntityAttributes = POPLIST._baseStructureObj['attributes'];
    var thisAttributeProperties = (!!EntityAttributes[key]) ? EntityAttributes[key] : {};
    if(!!thisAttributeProperties.htmltype && thisAttributeProperties.htmltype == 'combobox'){
      if(!!thisAttributeProperties.data){
        var userFieldValue = thisAttributeProperties.data[fieldValue];
        $("#searchForm_PopList td[fieldname="+ key +"] input").val(val);
        $("#searchForm_PopList td[fieldname="+ key +"] input[type=text]").val(userFieldValue);
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
        for(key in POPLIST.compositeColumns){
          var val = POPLIST.compositeColumns[key];
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
      $('#listTableSearchForm_PopList ' + fieldID +"_displaySearchParams").html(span);

    } else {
      // first assume its single and composite
      if(!!POPLIST.libraryColumns[fieldname]){ 

        var fielddesc = (!!POPLIST.libraryColumns[fieldname]['fielddesc']) ? POPLIST.libraryColumns[fieldname]['fielddesc'] : fieldname;
        if(!!POPLIST.libraryColumns[fieldname]['datasource']){
          var fieldValue = POPLIST.libraryColumns[fieldname]['datasource'][fieldValue];

        } else if(!!POPLIST.populateLibCache[fieldname]) {
          var fieldValue = POPLIST.populateLibCache[fieldname][fieldValue];
        }         
        span += '<span style="display:block; white-space:nowrap;">'+ fielddesc + ' : ' + fieldValue +'</span>';
        $('#listTableSearchForm_PopList ' + fieldID +"_displaySearchParams").html(span);


      } else if(!!POPLIST.compositeColumns[fieldname]){

        var fielddesc = (!!POPLIST.compositeColumns[fieldname][fieldname]['fielddesc']) ? POPLIST.compositeColumns[fieldname][fieldname]['fielddesc'] : fieldname;
        var fieldValue = (!!POPLIST.compositeColumns[fieldname][fieldname]['datasource']) ? POPLIST.compositeColumns[fieldname][fieldname]['datasource'][fieldValue] : fieldValue;        
        span += '<span style="display:block; white-space:nowrap;">'+ fielddesc + ' : ' + fieldValue +'</span>';
        $('#listTableSearchForm_PopList ' + fieldID +"_displaySearchParams").html(span);

      } else {

        var fielddesc = fieldname;
        if (!!POPLIST.translationsHardCode[fieldname]) fielddesc = POPLIST.translationsHardCode[fieldname];
        // span += '<span class="searchByTxt" style="display:block; white-space:nowrap;">'+ fielddesc + ' : ' + fieldValue +'</span>';
        span += '<span class="searchByTxt" style="display:block; white-space:nowrap;">'+ 'more sp' + fieldValue +'</span>';
        $('#listTableSearchForm_PopList ' + fieldID +"_displaySearchParams").html(span);

        $('table#listTableSearchForm_PopList tr#searchForm_PopList').find('td[fieldname='+fieldname+']').css({
          'overflow': '',
          'max-width': '',
          // 'min-width': '',
          'width': '',
        });
        $('table#listTableSearchForm_PopList tr#searchForm_PopList').find('td[fieldname='+fieldname+'] .FilterCt').css({
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
 * @return {[type]} [description]`
 */
POPLIST.getSearchData = function(){
  var searchParams = {};
  $('table#listTableSearchForm_PopList thead tr#searchForm_PopList').each(function() {
      $(this).find("td input:text, input:hidden,select").each(function() {
          textVal = this.value.trim();
          inputName = $(this).attr("name");
          tagName = $(this).prop("tagName");

          // if inputName is undefined then assume its combobox 
          if(inputName == undefined) return;
          // try to retrive name by closest select tag
          if(!!POPLIST.libraryColumns[inputName]){
              if(textVal == '______'){ // define for empty
              	textVal = "";
              }
          }

          if(textVal != ""){
            searchParams[inputName] = textVal;
          }            
      });
  });

  POPLIST._searchParams = JSON.stringify(searchParams);

  var pagenum = $('#pagination').find('span.current').text();
  var lineperpage = $('#divRowLimit').find('select[name=show]').val();
  if(!!!pagenum) pagenum=1;
  if(!!!lineperpage) lineperpage=10;
  //                  show,   page,   api_url search_param
  // POPLIST.getListData(10,   1,    '',   searchParams);
  searchParams = POPLIST.addSystemVariables(searchParams);
  POPLIST.getListData(lineperpage,   pagenum,    '',   searchParams);

}













/**
 * [genericHtmlInputFieldMaker description]
 * @param  {[type]} fieldname     [description]
 * @param  {[type]} fieldvalue    [description]
 * @param  {[type]} fieldpropties [description]
 * @return {[type]}               [description]
 */
POPLIST.genericHtmlInputFieldMaker = function(fieldname, fieldvalue, fieldpropties){
  var returnInputTag = '';

  var fieldvalue   = (!!fieldvalue && fieldvalue != '') ? fieldvalue : '';
  var fielddesc     = (!!fieldpropties.fielddesc ) ? fieldpropties.fielddesc : fieldname; 

  if(!!fieldpropties.type && fieldpropties.type == 'date'){
    returnInputTag += '<input type="text" name="'+fieldname+'" value="'+fieldvalue+'" class="datepicker" id="" />';
  
  } else if(!!fieldpropties.library){
    var options = POPLIST.genereicDropdownOptionsMaker(fieldname,fieldvalue,fieldpropties);
    returnInputTag += '<select name="'+fieldname+'" class="select2" id="">'+ options +'</select>';
  
  } else{
    returnInputTag += '<input type="text" name="'+fieldname+'" value="'+fieldvalue+'" class="" id="" />';
  }
  return returnInputTag;

}




POPLIST.customizeSetThisTdData = function(fieldname, fieldvalue){
  return fieldvalue;
}


/////////////////////////////////// 
POPLIST.saveThisNewLineData = function(thisLinePtr){}
POPLIST.copyThisLineData  = function(thisLinePtr){}
POPLIST.makeLineEntryForm = function(){}





POPLIST.applyCustomListCSS = function(){
  $('#listTable_PopList tr td:not(.xxxx)').css({
    // 'width':'95%',
  });
  $('#listTable_PopList tr td:nth-child(1)').css({
    'min-width': '50px',
  });
  $('#listTable_PopList tr td:nth-child(2)').css({
    'min-width': '50px',
  });

  $('#listTableSearchForm_PopList tr#searchForm_PopList input').css({
    'width':'95%',
    'min-width': '60px',
    'font-family':'Arial',
    'padding':'2px',
    'border':'1px solid #7F7F7F',
    'border-radius':'3px',
    'height': '23px'
  });

  $('#listTableSearchForm_PopList tr#searchForm_PopList select').css({
    'width':'95%',
    'min-width': '60px',
    'font-family':'Arial',
    'padding':'2px',
    'border':'1px solid #7F7F7F',
    'border-radius':'3px',
    'height': '23px'
  });

}



POPLIST.handleThisComboxSearch = function(event, thisPtr){
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


POPLIST.makeHeaderSearchInputField = function(attributeName){
  var baseStructure = POPLIST._baseStructure;
  baseStructure = JSON.parse(baseStructure);
  var EntityAttributes = baseStructure['attributes'];
  var thisAttributeProperties = EntityAttributes[attributeName];

  var HTML_Tag = '';
  HTML_Tag = '<input type="text"  name="'+ attributeName +'" class="'+ attributeName +'" value="" id="'+attributeName+'" onclick="POPLIST.handleThisSearchInputFieldClick(this);" style="width:94%;" />';
  if(!!!thisAttributeProperties) return HTML_Tag;

  var fielddesc     = (!!thisAttributeProperties.fielddesc ) ? thisAttributeProperties.fielddesc : attributeName; 
  var defaultval     = (!!thisAttributeProperties.defaultval ) ? thisAttributeProperties.defaultval : ''; 

  if(!!thisAttributeProperties.type && thisAttributeProperties.type == 'date'){
    HTML_Tag = '<input type="text"  name="'+ attributeName +'" class="'+ attributeName +'" value="" id="'+attributeName+'" onclick="POPLIST.handleDateTimeSearch(this);" style="width:94%;" />';
    return HTML_Tag;

  } else if( !!thisAttributeProperties.htmltype && thisAttributeProperties.htmltype == 'select' ){
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

    HTML_Tag = '<select name="'+attributeName+'" class="'+ attributeName +'" id="" onchange="POPLIST.handleOnChangeThisSearchFieldValue(this);" '+' >'+ options +'</select>';
  
  } else if( !!thisAttributeProperties.htmltype && thisAttributeProperties.htmltype == 'datalist' ){

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

    HTML_Tag = '<input type="text"  name="'+ attributeName +'" class="'+ attributeName +'" value="" id="'+attributeName+'" list="list_'+attributeName+'" onclick="POPLIST.handleThisSearchInputFieldClick(this);" style="width:94%;" />';
  
  } else if( !!thisAttributeProperties.htmltype && thisAttributeProperties.htmltype == 'combobox' ){

    POPLIST.makeSearchableComboboxAndAppendInBody(attributeName, thisAttributeProperties);
    HTML_Tag = '<div class="ComboboxContainer" style="position:relative;">';

    HTML_Tag += '<div style="position:relative; float:left; ">';
    HTML_Tag += '<input type="hidden"  name="'+ attributeName +'" class="'+ attributeName +'" id="'+attributeName+'" />';
    HTML_Tag += '<input type="text"   class="'+ attributeName +'" cmbxOptionsCntId="combobox_'+attributeName+'"  id="'+attributeName+'" onkeyup="POPLIST.handleThisComboxSearch(event, this);" style="width:94%;" />';
    HTML_Tag += '</div>';

    HTML_Tag += '<div role="button" forAttribute="'+attributeName+'" cmbxOptionsCntId="combobox_'+attributeName+'"  class="dropdownlistArrowZERPComboBox" style="float:right; position:absolute; left:20px; border: 1px solid gray; height: 25px; cursor: pointer;" onclick="POPLIST.showHideComboboxOptions(this);" ><div><i class="material-icons">keyboard_arrow_down</i></div></div>';
    HTML_Tag += '<div class="clearfix" style="overflow:auto;height:25px;"></div>';
    HTML_Tag += '</div>';

  } else if(!!thisAttributeProperties.attributetype && thisAttributeProperties.attributetype == 'Virtual'){
  	return '';
  } else {
    // returnInputTag += '<input type="text" name="'+fieldname+'" value="'+fieldvalue+'" class="" id="" '+ReadOnly+'/>';
  }

  return HTML_Tag;

}



POPLIST.initComboboxArrowNavigation = function(attributeName){
	$('#searchForm_PopList td[fieldname='+ attributeName +']').find('input[type=text]').focus();
	var combobox_id = '#combobox_'+ attributeName;

	$('#searchForm_PopList td[fieldname='+ attributeName +']').find('input[type=text]').off('keyup').on('keyup',function(e){
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
      $('#searchForm_PopList td[fieldname='+ attributeName +']').find('input[type=hidden]').val(chosenOptionCode);
			$('#searchForm_PopList td[fieldname='+ attributeName +']').find('input[type=text]').val(chosenOptionDesc);
			POPLIST.hideComboboxOptions(attributeName);
			POPLIST.redrawList();
		}
	});
	
	// $(document).on('keyup','#searchForm td[fieldname='+ attributeName +'] input[name='+attributeName+']',function(e){
	// 	if (e.keyCode == 40) {  
	// 		alert(e.keyCode);
	// 		$(combobox_id + ' div div:first-child').css('background-color', 'skyblue');
	// 	} else if(e.keyCode==38){
	// 		alert(e.keyCode);
	// 	}
	// });
}


POPLIST.showHideComboboxOptions = function(thisPtr){
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



    POPLIST.initComboboxArrowNavigation(attributeName);

  } else if( $(combobox_id).is(':visible') ){
    $(combobox_id).css({
      'display':'none',
    });
  }

}



POPLIST.hideComboboxOptions = function(attributeName){
  var combobox_id = '#combobox_'+ attributeName;
    $(combobox_id).css({
      'display':'none',
    });

}

POPLIST.setChosenOptionElement = function(thisPtr){
  var chosenOptionCode = $(thisPtr).find('span.code').text();
  var chosenOptionDesc = $(thisPtr).find('span.description').text();
  var attributeName = $(thisPtr).attr('forattribute');
  $('#searchForm_PopList td[fieldname='+ attributeName +']').find('input[type=hidden]').val(chosenOptionCode);
  $('#searchForm_PopList td[fieldname='+ attributeName +']').find('input[type=text]').val(chosenOptionDesc);
  POPLIST.hideComboboxOptions(attributeName);
  POPLIST.redrawList();
}

POPLIST.makeSearchableComboboxAndAppendInBody = function(attributeName, thisAttributeProperties){
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
          options += '<div role="option" forattribute="'+attributeName+'" id="listitem0innerListBoxZERPWidget" class="zerp-listitem-element" onclick="POPLIST.setChosenOptionElement(this);" ><span class="code" style="display:none;"  >'+index+'</span><span class="description">'+value+'</span></div>';
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





POPLIST.handleOnChangeThisSearchFieldValue = function(thisPtr){
  // alert('ok');
  POPLIST.redrawList();
}




POPLIST.handleDateTimeSearch = function(thisf){
  if($('#listDOCExpandDivID').length) $('body').find('#listDOCExpandDivID').remove();
  
  var customSearchFiedlName = $(thisf).closest('td').prop('class');
  var thisAttributeProperties = POPLIST.EntityAttributes[customSearchFiedlName];
  var fielddesc = thisAttributeProperties['fielddesc'];

  var fieldvalue = $(thisf).closest('td').find('input').val();
  var fieldvalues = fieldvalue.split(',__');  

  var dateSearchDiv = '\
    <div id="listDOCExpandDivID" style="position:relative; display:none;">\
    <div class="customSearchExpand listDOCExpandDiv" style="position:absolute; background:white; min-width:300px; padding:10px; padding-bottom:25px;">\
    <div style="float:right;">\
    <button type="button" onclick="POPLIST.closeExpandDiv(this);"><img src="lib/img/cancel.png" alt="" height="10" width="10"></button>\
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
    dateSearchDiv += '<tr><td><span>'+fielddesc+'</span></td><td>:</td><td style="min-width:365px;"><input type="text" name="'+customSearchFiedlName+'_from" value="'+from_date+'" class="datepicker" id="" /> to <input type="text" name="'+customSearchFiedlName+'_to" value="'+to_date+'" class="datepicker" id="" /></td></tr>';
  


    // count = 0;
    // $.each(POPLIST.compositeColumns[customSearchFiedlName],function(fieldname,fieldprop){
    //   dateSearchDiv += POPLIST.makeHTML_InputField(fieldname,fieldprop,fieldvalue,count);
    //   count++;
    // });

    dateSearchDiv +='<tr><td colspan="3" style="text-align:right;">\
      <button type="button" destinationAttribute="'+ customSearchFiedlName +'" onclick="POPLIST.submitCustomSearchField(this,\''+customSearchFiedlName+'\');">Search</button>\
        &nbsp;&nbsp;&nbsp;\
        <button type="button" destinationAttribute="'+ customSearchFiedlName +'" onclick="POPLIST.resetCustomSearchField(this);">Reset</button>\
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


POPLIST.makeSearchHeaderTable = function(jsonData){

  if($('#listTableSearchForm_PopList').length > 0) return;

  // some trickery for nice formatting
  var hideColumns = POPLIST.hideColumns;
  var translationsHardCode = POPLIST.translationsHardCode;

  /**
   * builds the table header
   */
  var data = JSON.parse(jsonData);
  var mydata = data['listData'];
  var firstRow = mydata[0];


  var compositeColumnsLength = Object.keys(POPLIST.compositeColumns).length;
  var countVisibleColumn = 1; // here start from 1 cz first td for option


  var $table = $('<table border=1 id="listTableSearchForm_PopList" class="listTable" />');
  var $thead = $('<thead />');


  var $tr = $("<tr/>").attr("id","labelForm");
  // LineChooser
  var $td;
  $td = $('<th/>');
  $td.attr('fieldname', 'x-options');
  $td.html('<center>Option</center>');
  $td.appendTo($tr);
  // List form action buttons --- Save, eidt, delete 
  var $td;
  $td = $('<th/>');
  $td.attr('fieldname', 'x-lineformactionbuttons');
  $td.html('<center></center>');
  $td.appendTo($tr);


  var firstRowCopy = JSON.parse(jsonData)['listData'][0];

  $.each(firstRowCopy, function (fieldname, fieldvalue) {
      
    // search this field is in composite column
    // and assume that its not under in composite colums
    var groupName = '';
    var groupFields = {};
    var hasInCompositeColumn = false;
    if(compositeColumnsLength > 0){
      for (var groupName in POPLIST.compositeColumns) {
        groupFields = POPLIST.compositeColumns[groupName];
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



      $td = $('<th/>');
      $td.attr('fieldname', fieldname);
      $td.attr('class', fieldname);
      $td.html($divLabelCt);

      if ( hideColumns.indexOf(fieldname) >= 0 ) $td.css('display','none');
      $td.appendTo($tr);

    }

  });
  $tr.appendTo($thead);



  var $tr = $("<tr/>").attr("id","searchForm_PopList");
  // LineChooser
  var $td;
  $td = $('<td/>');
  $td.attr('fieldname', 'x-options');
  $td.html('<center>Option</center>');
  $td.appendTo($tr);
  // List form action buttons --- Save, eidt, delete 
  var $td;
  $td = $('<td/>');
  $td.attr('fieldname', 'x-lineformactionbuttons');
  $td.html('<center></center>');
  $td.appendTo($tr);

  $.each(firstRowCopy, function (fieldname, fieldvalue) {
      
    // search this field is in composite column
    // and assume that its not under in composite colums
    var groupName = '';
    var groupFields = {};
    var hasInCompositeColumn = false;
    if(compositeColumnsLength > 0){
      for (var groupName in POPLIST.compositeColumns) {
        groupFields = POPLIST.compositeColumns[groupName];
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

      var headerSearchInputField = POPLIST.makeHeaderSearchInputField(fieldname);
      // var sc = '<center><input type="text"  name="'+ fieldname +'" class="'+ fieldname +'" value="" id="'+fieldname+'" onclick="POPLIST.handleThisSearchInputFieldClick(this);" style="width:94%;" /></center>';
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


      var entityAttributes = POPLIST._baseStructureObj['attributes'];
      var thisAttributeProperties = (!!entityAttributes[fieldname]) ? entityAttributes[fieldname] : {};
      var attributeWidth = (!!thisAttributeProperties.charwidth) ? thisAttributeProperties.charwidth : '60'; // 60 is deafult
      console.log(attributeWidth + fieldname);

      $td = $('<td/>');
      $td.attr('fieldname', fieldname);
      $td.attr('class', fieldname);
      $td.css({'min-width': attributeWidth+'px', 'width': attributeWidth+'px'});
      // $td.css({'min-width': attributeWidth+'px', 'width': attributeWidth+'px', 'max-width': attributeWidth+'px'});
      $td.html($divLabelCt);
      $td.append($divFilterCt);

      if ( hideColumns.indexOf(fieldname) >= 0 ) $td.css('display','none');
      $td.appendTo($tr);

    }

  });

  $tr.appendTo($thead);
  $thead.appendTo($table);

  $("#ZERP_listGridPanel_headerOffset_PopList").html($table);

}

POPLIST.getLineFormButtons = function(){
  var btnEdit = '<input type="button" class="material-icons x-btnLineEdit" value="edit" title="Click to edit this line" onclick="LISTDOC.makeEditableThisLine(this);" style="display:inline-block;" />';
  var btnSave = '<input type="button" class="btn-blue material-icons x-btnLineSave" value="done" onclick="LISTDOC.saveThisEditableLineData(this);" style="display:none;" />';
  var btnCopy = '<input type="button" class="material-icons x-btnLineCopy" value="content_copy" onclick="LISTDOC.copyThisLineData(this);" style="display:inline-block;" />';
  
  return {
    btnEdit: btnEdit,
    btnSave: btnSave,
    btnCopy: btnCopy,
  };
}



//Add Customization Below =================================================================================
POPLIST.makeTable = function(jsonData,hasData) {

  var data   = JSON.parse(jsonData);
  var mydata = data['listData'];
  var pageNum      = parseInt(data['pageNum']-1);
  var showLimit    = parseInt(data['showLimit']);
  var trDataId = parseInt(pageNum * showLimit) + 1;
  // console.log(pageNum + '  ' +showLimit);


  //for composition column
  POPLIST.compositeColumns = {
    // docnumber:{
    //   docnumber: {
    //     style: 'font-weight:bold; color:blue',
    //     customsearch: true,
    //     single: true,
    //     end: true
    //   }
    // },
  }


  var baseStructure = POPLIST._baseStructure;
  baseStructure = JSON.parse(baseStructure);
  var hideOnViewFields = baseStructure['hideOnViewFields'];
  var EntityAttributes = baseStructure['attributes'];

  // some trickery for nice formatting
  var hideColumns = ['doctype','workorderdocnumber'];
  if(hideOnViewFields.length > 0){
    for (var i = 0; i < hideOnViewFields.length; i++) {
      hideColumns.push( hideOnViewFields[i] );
    }
  }
  POPLIST.hideColumns = hideColumns;

  var translationsHardCode = {};
  translationsHardCode.docnumber = 'Document Number';
  translationsHardCode.linenumber = 'Line Number';
  translationsHardCode.lineentrytime = 'Line entry time';
  
  translationsHardCode.countername = 'Counter Name';
  translationsHardCode.iduom = 'UoM';
  translationsHardCode.elementuom = 'Elem. UoM';
  translationsHardCode.itemspecification = 'Item Specification';
  translationsHardCode.linestatus__company__docdate  = 'Document Information';

  POPLIST.translationsHardCode = translationsHardCode;
  var entityFields = baseStructure['attributes'];

  for(var fieldname in entityFields){
    var fieldpropties = entityFields[fieldname];
    var fielddesc = (!!fieldpropties.fielddesc) ? fieldpropties.fielddesc : fieldname;
    POPLIST.translationsHardCode[fieldname] = fielddesc;
  }


  POPLIST.makeSearchHeaderTable(jsonData);
  // return;


  /**
   * builds the table header
   */
  var orgBgOn = '';
  var mydata_json = JSON.stringify(mydata);
  var firstRow = mydata[0];

  var firstRowCopy = firstRow;
  var compositeColumnsLength = Object.keys(POPLIST.compositeColumns).length;
  var countVisibleColumn = 1; // here start from 1 cz first td for option


  var $table = $('<table border=1 id="listTable_PopList" class="listTable" />');
  var $thead = $('<thead />');
  var $tbody = $('<tbody/>');
  /**
  * first header row------------------------------------------------------------------------------------------------------------------------------------------------------------
  */
  // var $tr = POPLIST.generateFirstHeaderTr(firstRowCopy, translationsHardCode);
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
  var lineFormButtons = POPLIST.getLineFormButtons();

  var mydata = JSON.parse(mydata_json);
  $.each(mydata, function (index, value) {

    var $tr = $("<tr/>"); // it should be in here
    $tr.attr("data-id",trDataId);
    trDataId++;

    var thisRow = value;
    var thisRowCopy = thisRow;
    var thisRowCopy_Json =  JSON.stringify(thisRow);

    // retrieve variable here which is needed
    var formtype = thisRow['formtype'];
    var linestatus = thisRow['linestatus'];

    // generate button if needed
    var btnLineChooser = '<center><input type="checkbox" class="multipleLineChooser" onclick="POPLIST.handleLineChooserCheckboxClick(this);" ></center>';
    var btnThisLineAction = '';
    if(linestatus == 'Requisition Sent'){
      btnThisLineAction = '<button type="button" class="mbutton delete" onclick="POPLIST.handleLineEvolutionBtnAction(this)">Cancel this line</button>';
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
        var thisfieldproperties = EntityAttributes[fieldname];
      // for (var fieldname in firstRowCopy) {
        // var fieldvalue = firstRowCopy[fieldname];
        
        // *** write custom code here ---
        // fieldvalue = (fieldname == "docnumber") ? "<a href='erpdocument.php?docnumber="+fieldvalue+"&doctype=DR&formtype="+formtype+"&docviewflag=apparel' target='_blank''>"+fieldvalue+"</a>" : fieldvalue;
        fieldvalue = POPLIST.processThisFieldValue(fieldname, fieldvalue, thisRow, thisfieldproperties);
        // *** custom code end ----------


        $td = $('<td/>');
        $td.html( '<div>'+fieldvalue+'</div>')
        .css("white-space","pre-wrap")
        .attr("fieldname",fieldname)
        .css("cursor","pointer")
        .hover(
          function(){bgOn = $(this).closest("tr").css("background-color"); $(this).closest("tr").css("background-color", "lightblue");},
          function(){$(this).closest("tr").css("background-color", bgOn);}
        );
        if ( hideColumns.indexOf(fieldname) >= 0 ) $td.css('display','none');
        $td.appendTo($tr);

        // }

      // }  
      });


      $tr.click( function(e) { 
          
          if(orgBgOn != '') $('#listTable_PopList tbody tr.clicked').css("background-color", orgBgOn);
          $('#listTable_PopList tbody tr').removeClass('clicked');
          orgBgOn = bgOn;
          $(this).closest("tr").css("background-color", "yellow");
          bgOn = $(this).closest("tr").css("background-color")
          $(this).closest("tr").addClass('clicked');

          // var cell = $(e.target).get(0); // This is the TD you clicked
          var typex = $(e.target).attr('type'); 
          if(typex == 'checkbox') return; // LineChooser

          if(POPLIST.isEnableExcelMode) return;
          if(POPLIST.lineEditEntryMode) return;
          // var thisfieldname = $(this).closest('td').attr('fieldname');
          var thisfieldname = $(e.target).closest('td').attr('fieldname');

          if(thisfieldname == 'x-options' || thisfieldname == 'x-lineformactionbuttons') return;       
          if(thisfieldname == 'docnumber' || thisfieldname == 'docnumber') return;       

          var _baseStructure = JSON.parse( POPLIST._baseStructure );
          var ENTITY_KEY_FIELDNAME = _baseStructure['ENTITY_KEY_FIELDNAME'];
          var docnumber = $(this).find('[fieldname='+ENTITY_KEY_FIELDNAME+']').text();
          // ZERP.FrmMgr.genFrm.readEntity(docnumber);
          POPLIST.sendBackSearchChoice($(this));
        })
        .appendTo($tbody);
    });

    $thead.appendTo($table)
    $tbody.appendTo($table)

    return $table;
};


POPLIST.processThisFieldValue = function(fieldname, fieldvalue, thisRow, thisfieldproperties){
  if(!!!thisfieldproperties) return fieldvalue;
  if (!!thisfieldproperties.datasource && thisfieldproperties.datasource == 'this'){
    fieldvalue = thisfieldproperties['data'][fieldvalue];
  } else if (!!thisfieldproperties.datasource && thisfieldproperties.datasource == 'mrd_library'){
    fieldvalue = (!!thisfieldproperties['data'][fieldvalue]) ? thisfieldproperties['data'][fieldvalue] : fieldvalue;
  }

  // fieldvalue = (fieldname == "countercode") ? "<a href='erpdocument.php?docnumber="+fieldvalue+"&doctype=DR&&docviewflag=apparel' target='_blank''>"+fieldvalue+"</a>" : fieldvalue;
  fieldvalue = (fieldname == 'docnumber') ? '<a href="main.php?rAPIFile=zerp/pkg/sal/SalesOrderLine&rFatherID='+fieldvalue+'" target="_blank">'+fieldvalue+'</a>' : fieldvalue;
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

    var _scrollPaneWidth = 150;


    // handle overflow later
    var listTable_width = $('#listTable_PopList').width();          // childl
    var listTable_height = $('#listTable_PopList').height();          // childl

    // *** 
    // don't care others
    // 1. footer height + ZERP_listGridPanel_header
    // = minus px

    if(listTable_height > _windowHeight){
    }

    // var listTable_width = $('#ZERP_listGridPanel_scroller_PopList').width();          // childl
    // if(listTable_height > _windowHeight){
    //     $('#ZERP_listGridPanel_header_PopList').css({
    //         'overflow': 'hidden',
    //         'width': listTable_width + 'px'
    //     });
    // }

}


POPLIST.initTableTdResizeAction = function(){
    var attributeName;
    var EntityAttributes = POPLIST._baseStructureObj['attributes'];
    var CurERP_listGridPanelHeaderWidth = $('#ERP_listGridPanel_header_PopList').width();

    var thElm;
    var startOffset;

    Array.prototype.forEach.call(
      document.querySelectorAll('#listTableSearchForm_PopList thead th'),
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
    		$('#ZERP_listGridPanel_header_PopList').css('width', (CurERP_listGridPanelHeaderWidth + e.pageX) + 'px');

    		$(thElm).find('input').css({
    			"min-width":  (updateTdWidth-8)+"px",
    			"width":  (updateTdWidth-8)+"px",
    			"max-width":  (updateTdWidth-8)+"px"
    		});
    		
        var thisAttributeProperties = ( !!EntityAttributes[attributeName] ) ? EntityAttributes[attributeName] : {};
        var htmltype = (!!thisAttributeProperties.htmltype) ? thisAttributeProperties.htmltype : '';
        if(htmltype == 'select'){
      		$("#listTableSearchForm_PopList thead tr#searchForm_PopList").find('td[fieldname='+attributeName+'] select').css("min-width",(updateTdWidth-8) + "px");
      		$("#listTableSearchForm_PopList thead tr#searchForm_PopList").find('td[fieldname='+attributeName+'] select').css("width",(updateTdWidth-8) + "px");
      		$("#listTableSearchForm_PopList thead tr#searchForm_PopList").find('td[fieldname='+attributeName+'] select').css("max-width",(updateTdWidth-8) + "px");		

        } else if(htmltype == 'combobox'){
      		$("#listTableSearchForm_PopList thead tr#searchForm_PopList").find('td[fieldname='+attributeName+'] input').css("min-width",(updateTdWidth-30) + "px");
      		$("#listTableSearchForm_PopList thead tr#searchForm_PopList").find('td[fieldname='+attributeName+'] input').css("width",(updateTdWidth-30) + "px");
      		$("#listTableSearchForm_PopList thead tr#searchForm_PopList").find('td[fieldname='+attributeName+'] input').css("max-width",(updateTdWidth-30) + "px");		
      		$("#listTableSearchForm_PopList thead tr#searchForm_PopList").find('td[fieldname='+attributeName+']').find('div.dropdownlistArrowZERPComboBox').css('left', (updateTdWidth-30+0)+'px');

        } else {
      		$("#listTableSearchForm_PopList thead tr#searchForm_PopList").find('td[fieldname='+attributeName+'] input').css("min-width",(updateTdWidth-8) + "px");
      		$("#listTableSearchForm_PopList thead tr#searchForm_PopList").find('td[fieldname='+attributeName+'] input').css("width",(updateTdWidth-8) + "px");
      		$("#listTableSearchForm_PopList thead tr#searchForm_PopList").find('td[fieldname='+attributeName+'] input').css("max-width",(updateTdWidth-8) + "px");		
        }

    		$("#listTable_PopList tbody tr").find('td[fieldname='+attributeName+']').css("min-width",(updateTdWidth-0) + "px");
    		$("#listTable_PopList tbody tr").find('td[fieldname='+attributeName+']').css("width",(updateTdWidth-0) + "px");
        $("#listTable_PopList tbody tr").find('td[fieldname='+attributeName+']').css("max-width",(updateTdWidth-0) + "px");
    		$("#listTable_PopList tbody tr").find('td[fieldname='+attributeName+'] div').css("width",(updateTdWidth-0) + "px");

      }

    });

    document.addEventListener('mouseup', function () {
        thElm = undefined;
    });

}



POPLIST.searchHeaderTableResizeMaker = function(){
	var $trObj1 = $("#listTable_PopList thead tr:nth-child(1)");
	var listTableWidth = $("#listTable_PopList").width();
  var isChrome = false; 
  var isFirefox = false;
  if(navigator.userAgent.indexOf("Chrome") != -1 ){
    isChrome = true;
  }
  if(navigator.userAgent.indexOf("Firefox") != -1 ){
    isFirefox = true;
  }

    $('#listTableSearchForm_PopList thead tr').find("td").each(function(index) {

      $(this).find('div.searchFieldLabel').css({ 
        // "min-width" : (xx-10) + "px", 
        "overflow":"hidden", 
        "white-space": "nowrap", 
        "text-overflow": "ellipsis"
      });

      var xx =  $(this).innerWidth();     
      var oxx =  $(this).outerWidth();     
      var nxx =  $(this).width();     
      console.log(xx + '-----' + oxx + '----' + nxx);

      $(this).find('div.FilterCt').css('width', xx + 'px');

      var cn = index + 1;
      var thisfieldname =  $(this).attr('fieldname');
      var fieldname =  $trObj1.find('th:nth-child('+ cn +')').attr('fieldname');
      if(fieldname != thisfieldname) return;

      var thisAttributeProperties = ( !!POPLIST.EntityAttributes[thisfieldname] ) ? POPLIST.EntityAttributes[thisfieldname] : {};
      var htmltype = (!!thisAttributeProperties.htmltype) ? thisAttributeProperties.htmltype : '';
      console.log(htmltype);

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
        $(this).find('input').css({
          "min-width":  (xx-8)+"px",
          "width":  (xx-8)+"px",
          "max-width":  (xx-8)+"px"
        });
      }


      $("#listTableSearchForm_PopList thead tr#labelForm").find('th[fieldname='+thisfieldname+']').css("min-width",(xx-0) + "px");
      $("#listTableSearchForm_PopList thead tr#labelForm").find('th[fieldname='+thisfieldname+']').css("width",(xx-0) + "px");
      $("#listTableSearchForm_PopList thead tr#labelForm").find('th[fieldname='+thisfieldname+']').css("max-width",(xx-0) + "px");
      $("#listTableSearchForm_PopList thead tr#labelForm").find('th[fieldname='+thisfieldname+']').css("padding","3px");
      $("#listTableSearchForm_PopList thead tr#labelForm").find('th[fieldname='+thisfieldname+']').css("overflow","hidden");
      $("#listTableSearchForm_PopList thead tr#labelForm").find('th[fieldname='+thisfieldname+']').find('div.searchFieldLabel').css("text-overflow", "ellipsis");



      $trObj1.find('th:nth-child('+ cn +')').css("min-width",xx + "px");
      $trObj1.find('th:nth-child('+ cn +')').css("width",xx + "px");
      $trObj1.find('th:nth-child('+ cn +')').css("max-width",xx + "px");

      $("#listTable_PopList tbody tr").find('td[fieldname='+thisfieldname+']').css("min-width",(xx-16) + "px");
      $("#listTable_PopList tbody tr").find('td[fieldname='+thisfieldname+']').css("width",(xx-16) + "px");
      $("#listTable_PopList tbody tr").find('td[fieldname='+thisfieldname+']').css("max-width",(xx-16) + "px");
      $("#listTable_PopList tbody tr").find('td[fieldname='+thisfieldname+'] div').css({
      	'padding-top': '3px',
      	'padding-bottom': '3px',
      	'padding-left': '8px',
      	'padding-right': '8px',
      	'width': (xx-0) + 'px',
        'height': '30px',
      	'overflow': 'hidden',
      	'text-overflow': 'ellipsis'
      });

      $("#listTable_PopList tbody tr").find('td[fieldname='+thisfieldname+']').css({
        "overflow": "hidden",
        "text-overflow": "ellipsis"
      });



    });


  $('#ERP_listGridPanel_scroller_PopList').scroll(function(){
    var left = $(this).scrollLeft();
    POPLIST.listGridPanelScrolled = true;
    // var left = $(this).scrollLeft() / 1.08 ;
    // left = left + ( -33 );
    $('#ZERP_listGridPanel_header_PopList').css('left', -left);

    // if( $('#ZERP_formGridPanel').is(':visible') ){
      var ERP_listGridPanelScroller = $('#ERP_listGridPanel_scroller_PopList').width();
      var aww = ERP_listGridPanelScroller + left;
      $('#ERP_listGridPanel_header_PopList').css({
        'width': aww + 'px'
      });
    // }

    // scrollFixed();
  }); 


  var listTableSearchFormWidth = $('#listTableSearchForm_PopList').width();
  $('#listTableSearchForm_PopList').css({
    'width': (listTableSearchFormWidth + 0) + 'px',
    'min-width': (listTableSearchFormWidth + 0) + 'px',
    'max-width': (listTableSearchFormWidth + 0) + 'px',
  });

  $('#listTable_PopList').css({
    'width': (listTableSearchFormWidth + 0) + 'px',
    'min-width': (listTableSearchFormWidth + 0) + 'px',
    'max-width': (listTableSearchFormWidth + 0) + 'px',
  });

  
  $('#ERP_listGridPanel_header_PopList').css({
    'width': (listTableSearchFormWidth + 0) + 'px',
    // 'min-width': (listTableSearchFormWidth + 0) + 'px',
  });
  var ERP_listGridPanelHeaderWidth = $('#ERP_listGridPanel_header_PopList').width();
  $('#ERP_listGridPanel_scroller_PopList').css({
    'width': (ERP_listGridPanelHeaderWidth + 30) + 'px',
    'min-width': (ERP_listGridPanelHeaderWidth + 30) + 'px',
  });


  $('table#listTableSearchForm_PopList tr#searchForm_PopList .displaySearchParams .searchByLbl').css('display', 'none');
  $('table#listTableSearchForm_PopList tr#searchForm_PopList .displaySearchParams .searchByTxt').css('display', 'none');
  $('#ZERP_clearAbsoluteLTH').css('height', $('#ERP_listGridPanel_header').height() );



}













/**
 * [makePagination description] -------------------------------------------------------------------------------------------------------
 * @param  {[type]} jsonData [description]
 * @return {[type]}          [description]
 */
POPLIST.makePagination = function(jsonData){

  var data = JSON.parse(jsonData);
  pageNum      = data['pageNum'];
  lastPageNum  = data['lastPageNum'];
  queryRowsNum = data['queryRowsNum'];
  showLimit    = data['showLimit'];

  var rowLimit =  POPLIST.makeRowLimit(showLimit);
  var pagTable =  POPLIST.getPagination(showLimit, queryRowsNum, pageNum);

  var paginationDiv = '<div style="display:inline-block" id="paginationContainer">';

  paginationDiv += '<div style="float:left;" id="divRefreshList">';
  // paginationDiv += '<a href="javascript:void(0);" class="material-icons" onclick="POPLIST.redrawList() " style="font-weight:bold; color:blue;" >cached</a>';
  paginationDiv += '<a href="javascript:void(0);" class="x-tbar-loading" onclick="POPLIST.redrawList() " style="font-weight:bold; background-image: url(\'lib/assets/img/refresh.gif\');" ></a>';
  paginationDiv += '</div>';

  paginationDiv += '<div style="float:left;" id="divClearSearch">';
  paginationDiv += '<a href="javascript:void(0);" onclick="POPLIST.clearSearchData()">Clear Search</a>';
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

  paginationDiv += '</div>';

  return paginationDiv;
}


POPLIST.makeRowLimit = function(show){

    var rowLimit = "";
    rowLimit += '<label> <span id="spanRowLimit">Rows Limit:</span>' 
    rowLimit += '<select name="show" onChange="POPLIST.changeDisplayRowCount(this.value);">';
    rowLimit += (show == 5) ? '<option value="5" selected="selected" >5</option>' : '<option value="5">5</option>';
    rowLimit += (show == 10) ? '<option value="10" selected="selected" >10</option>' : '<option value="10">10</option>';
    rowLimit += (show == 20) ? '<option value="20" selected="selected" >20</option>' : '<option value="20">20</option>';
    rowLimit += (show == 30) ? '<option value="30" selected="selected" >30</option>' : '<option value="30">30</option>';
    rowLimit += (show == 40) ? '<option value="40" selected="selected" >40</option>' : '<option value="40">40</option>';
    rowLimit += (show == 50) ? '<option value="50" selected="selected" >50</option>' : '<option value="50">50</option>';
    rowLimit += (show == 100) ? '<option value="100" selected="selected" >100</option>' : '<option value="100">100</option>';
    rowLimit += (show == 150) ? '<option value="150" selected="selected" >150</option>' : '<option value="150">150</option>';
    rowLimit += '</select>';
    rowLimit += '</label>';

    return rowLimit;

}

POPLIST.changeDisplayRowCount = function(numRecords) {
    POPLIST.getListData(numRecords, 1);
}

POPLIST.getPagination = function(showLimit, rows, page){ 

    var limit = showLimit;
    var adjacents = 3;
    show = showLimit;

    pagination='';
    if (page == 0) page = 1;                    //if no page var is given, default to 1.
    prev = page - 1;                            //previous page is page - 1
    next = page + 1;                            //next page is page + 1
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
            prev_  += '<a href="javascript:void(0);" class="page-numbers page-'+ prev +'"  onclick="POPLIST.getListData(  \''+ show +'\'      ' +","+ '    \'' + prev+ '\');" > previous </a>';

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
                    pagination  += '<a href="javascript:void(0);" class="page-numbers page-'+ counter +'"  onclick="POPLIST.getListData(  \''+ show +'\'      ' +","+ '    \'' + counter+ '\');" > ' + counter + ' </a>';
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
                    pagination  += '<a href="javascript:void(0);" class="page-numbers page-'+ counter +'"  onclick="POPLIST.getListData(  \''+ show +'\'      ' +","+ '    \'' + counter+ '\');" > ' + counter + ' </a>';

                }
            // last+= "<a class='page-numbers' href='?page="+lastpage + "' " + ">Last</a>";          
            last+= '<a href="javascript:void(0);" class="page-numbers page-'+ counter +'"  onclick="POPLIST.getListData(  \''+ show +'\'      ' +","+ '    \'' + lastpage+ '\');" > ' + 'Last' + ' </a>';          
            }
            
            //in middle; hide some front and some back
            else if(lastpage - (adjacents * 2) > page && page > (adjacents * 2))
            {
               // first+= "<a class='page-numbers' href='?page=1'>First</a>";    
               first+='<a href="javascript:void(0);" class="page-numbers page-'+ counter +'"  onclick="POPLIST.getListData(  \''+ show +'\'      ' +","+ '    \'' + '1'+ '\');" > ' + 'First' + ' </a>';          
   
            for (counter = page - adjacents; counter <= page + adjacents; counter++)
                {
                    if (counter == page)
                        pagination+= "<span class=current>" + counter + "</span>";
                    else
                        // pagination+= "<a class='page-numbers' href='?page=" + counter + "' " + ">counter</a>"; 
                    pagination  += '<a href="javascript:void(0);" class="page-numbers page-'+ counter +'"  onclick="POPLIST.getListData(  \''+ show +'\'      ' +","+ '    \'' + counter+ '\');" > ' + counter + ' </a>';

                }
                // last+= "<a class='page-numbers' href='?page='"+lastpage +"' " + ">Last</a>";          
                last+= '<a href="javascript:void(0);" class="page-numbers page-'+ counter +'"  onclick="POPLIST.getListData(  \''+ show +'\'      ' +","+ '    \'' + lastpage+ '\');" > ' + 'Last' + ' </a>';                  
            }
            //close to end; only hide early pages
            else
            {
                // first+= "<a class='page-numbers' href='?page=1'>First</a>";   
                first+='<a href="javascript:void(0);" class="page-numbers page-'+ counter +'"  onclick="POPLIST.getListData(  \''+ show +'\'      ' +","+ '    \'' + '1'+ '\');" > ' + 'First' + ' </a>';             
                for (counter = lastpage - (2 + (adjacents * 2)); counter <= lastpage; counter++)
                {
                    if (counter == page)
                        pagination+= "<span class='current'>"+counter+"</span>";
                    else
                        // pagination+= "<a class='page-numbers' href='?page="+counter+"' " + ">counter</a>";   
                    pagination  += '<a href="javascript:void(0);" class="page-numbers page-'+ counter +'"  onclick="POPLIST.getListData(  \''+ show +'\'      ' +","+ '    \'' + counter+ '\');" > ' + counter + ' </a>';

                }
                last='';
            }
            
            }





        if (page < counter - 1) 
            // next_+= "<a class='page-numbers' href='?page='"+next+">next</a>";
            next_  += '<a href="javascript:void(0);" class="page-numbers page-'+ next +'"  onclick="POPLIST.getListData(  \''+ show +'\'      ' +","+ '    \'' + next+ '\');" > next </a>';


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


POPLIST.paginationCSS = function(){

  $('#paginationContainer #divRowCounter').css({
    // 'padding':'4px 10px',
    'padding-left' : '10px',
    'color':'black',
    'font-weight':'bold',
    // 'border': '2px solid blue',
    // 'vertical-align': 'text-bottom',
    'margin-top': '3pt',
    'height': '20pt'
  });

  $('#paginationContainer #divClearSearch').css({
    // 'padding':'4px 10px',
    'padding-left' : '10px',
    'color':'dodgerblue',
    'font-weight':'bold',
    'margin-top': '3pt',
    'height': '20pt'
  });
  $('#paginationContainer #divClearSearch a').css({
    // 'padding':'4px 10px',
    'color':'dodgerblue',
  });


  $('#paginationContainer #divPage').css({
    'padding-left' : '10px',
    // 'padding':'4px 10px',
  });

  $('#paginationContainer #divRowLimit').css({
    'padding-left' : '10px',
    // 'padding':'4px 10px',
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
    'padding':'3px 7px',
    'color':'black',
    'margin':'1px 0px 9px 6px',
    'display':'block',
    'text-decoration':'none',
    'float':'left',
    'text-transform':'capitalize',
    'background':'whitesmoke'
  });
  $('.pagination .page-numbers').css({
    'padding':'3px 7px',
    'color':'white !important',
    'margin':'1px 0px 9px 6px',
    'display':'block',
    'text-decoration':'none',
    'float':'left',
    'text-transform':'capitalize',
    // 'background':'#98c0f4',
    'background':'#1ca8dd',
    // 'color': 'steelblue',
    'color': 'powderblue',
    // 'color': '#1ca8dd'
  });

  $('#paginationContainer').css({
    'padding-top': '5px',
  });


}
//======================================================= ===================================================================