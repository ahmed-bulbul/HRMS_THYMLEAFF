// Declare NameSpace
var ZERP = ZERP || {};
ZERP.System = ZERP.System || {};

ZERP.Utils = ZERP.Utils || {};
ZERP.Entity = ZERP.Entity || {};
ZERP.FileMgr = ZERP.FileMgr || {};

ZERP.Entity.Utils = ZERP.Entity.Utils || {};

ZERP.SLO = ZERP.SLO || {};
ZERP.FrmMgr = ZERP.FrmMgr || {};
ZERP.FrmMgr.genFrm = ZERP.FrmMgr.genFrm || {};
ZERP.FrmMgr.plnFrm = ZERP.FrmMgr.plnFrm || {};

// Declare System Global Variable
ZERP.System.host;
ZERP.System.contextPath;
ZERP.System.queryString;

ZERP.System.rRunTime;
ZERP.System.rFRuntime;
ZERP.System.rEntityName;
ZERP.System.rFEntityName;
ZERP.System.rPkgApiUrl;
ZERP.System.rRequestApiUrl = '/systemApi/processClientRequest'; // default context
ZERP.System.rPkgRequestApiUrl;

// Static Mapping API URL
ZERP.System.rMapStaticApiUrl = {
  StockTransaction: '/stockTransactionApi/processClientRequest', 
  PurchaseModuleApi: '/purchaseModuleApi/processClientRequest',
  MaterialReceiveForm: '/purchaseModuleApi/processClientRequest',
  MaterialReceiveList: '/purchaseModuleApi/processClientRequest',
  SalesInvoiceEntryForm: '/salesModuleApi/processClientRequest',
  SalesInvoiceList: '/salesModuleApi/processClientRequest',
  Item: '/baseModuleApi/processClientRequest',
  FinishedItemWL: '/baseModuleApi/processClientRequest',
  WLFgItemEntity: '/baseModuleApi/processClientRequest',
  foo: 'I am foo' // end
};

ZERP.rActiveOperation;
ZERP.System.rActiveFormTab;
ZERP.System.rActiveFocusField;

ZERP.System.LoginUser;
ZERP.System.LoginUserID;
ZERP.System.LoginUserType;

ZERP.System.EntityStructure;
ZERP.System.EntityStructureObj;

ZERP.System.appCommonDir;
ZERP.System.appMySystemDir;
ZERP.System.appPageBrowseDir;
ZERP.System.appClassLoadingDir;

ZERP.System.rDebugMode = false;
// ZERP.System.rDebugMode = true;

ZERP.System.wrkOrganizationId = 0;
ZERP.System.wrkOperatingUnitId = 0;

ZERP.System.Main = function(InitParams) {
  
  ZERP.System.contextPath = InitParams.contextPath;
  ZERP.System.rRequestApiUrl = ZERP.System.contextPath + '' + ZERP.System.rRequestApiUrl;

  ZERP.System.LoginUserID = InitParams._USERNAME;
  var LoginUserID = ZERP.System.LoginUserID;
  var PAGE_DIR = InitParams.PAGE_DIR;

  ZERP.System.host = window.location.hostname;
  var params = jsClient.paramsToObj(window.location.search);

  ZERP.System.rEntityName = params.rEntityName;
  if(ZERP.System.rMapStaticApiUrl.hasOwnProperty(ZERP.System.rEntityName)) ZERP.System.rRequestApiUrl = ZERP.System.contextPath + '' + ZERP.System.rMapStaticApiUrl[ZERP.System.rEntityName];
  


  // if(!!!params.rEntityName) return;
  if(!!!params.rEntityName){
    // Lets check its URL structure as like MVC style ---> Root/Controller/Method
    // https://css-tricks.com/example/index.html?s=flexbox
    // var newURL = window.location.protocol + "//" + window.location.host + "/" + window.location.pathname + window.location.search
    var pathArray = window.location.pathname.split('/');
    var pathArrayLength = pathArray.length;
    var appId = pathArray[pathArrayLength-3]; 
    var appController = pathArray[pathArrayLength-2];
    var appAction = pathArray[pathArrayLength-1];
    ZERP.System.rEntityName = appController.charAt(0).toUpperCase() + appController.slice(1);
    if(ZERP.System.rEntityName == "SystemMain") return;
    params["rEntityName"] = ZERP.System.rEntityName;
  }
  
  var rFromDesktop = params.rFromDesktop;
  ZERP.System.rRunTime = (!!params.rRunTime) ? params.rRunTime : 0;

  var xEntityStructure;

  var getParams = {};
  getParams = params;

  // 1. First Load Entity Structure
  var rRequestAPI = ZERP.System.rRequestApiUrl;
  ZERP.System.rPkgApiUrl = rRequestAPI;
  ZERP.System.rPkgRequestApiUrl = rRequestAPI;

  $.ajax({
    url: rRequestAPI + '?rReqType=getEntityStructure',
    data: getParams,
    cache: false,
  }).done(function(response) {

    xEntityStructure = response;
      
    try {

      xEntityStructure = JSON.parse(xEntityStructure);

      xEntityStructure.rRunTime = ZERP.System.rRunTime;
      xEntityStructureObj = xEntityStructure;
      ZERP.System.EntityStructureObj = xEntityStructure;

      xEntityStructure = JSON.stringify(xEntityStructure);
      ZERP.System.EntityStructure = xEntityStructure;

      console.log('Successfully loaded entity structure:\n');
      console.log(ZERP.System.EntityStructureObj);


    } catch (err) {
      // alert(err);
      // alert(err.message);
      console.log(xEntityStructure);
      ZERP.System.MainHelper.showErrorMessage2(response);
      return false;
    }

    if(xEntityStructureObj.error){
      ZERP.System.MainHelper.showErrorMessage(xEntityStructureObj);
      return;
    }
    
    
    // 0
    ZERP.System.MainHelper.Main();  


    // 1
    ZERP.processEntity(xEntityStructure);


    // 2 // processEntityForm
    // append custom JS and CSS for form
    var entityFormCstJs = (!!xEntityStructureObj._entityFormCstJS) ? xEntityStructureObj._entityFormCstJS : 'XyzForm.js';
    if(entityFormCstJs != 'XyzForm.js'){
      var pkgName = xEntityStructureObj._pkgName;
      var cstFormJsURL = window.location.protocol + "//" + window.location.host + "" + ZERP.System.contextPath + "/PkgCustomJsCss/" + pkgName + "/js/" + entityFormCstJs + "?v=123";
      var cstJsCode = document.createElement('script');
      cstJsCode.type = 'text/javascript';
      cstJsCode.onload = function () {
        ZERP.processEntityForm();
      };
      cstJsCode.src = cstFormJsURL;
      document.getElementsByTagName('body')[0].appendChild(cstJsCode);

    } else {
      ZERP.processEntityForm();
    }


    // 3 // processEntityList
    // append custom JS and CSS for list
    var entityListCstJs = (!!xEntityStructureObj._entityListCstJS) ? xEntityStructureObj._entityListCstJS : 'XyzList.js';
    if(entityListCstJs != 'XyzList.js'){
      var pkgName = xEntityStructureObj._pkgName;
      var cstlistJsURL = window.location.protocol + "//" + window.location.host + "" + ZERP.System.contextPath + "/PkgCustomJsCss/" + pkgName + "/js/" + entityListCstJs + "?v=123";
      var cstJsCode = document.createElement('script');
      cstJsCode.type = 'text/javascript';
      cstJsCode.onload = function () {
        //do stuff with the script
        ZERP.processEntityList();
      };
      cstJsCode.src = cstlistJsURL;
      document.getElementsByTagName('body')[0].appendChild(cstJsCode);

    } else {
      ZERP.processEntityList();
    }


    

  }).fail(function(e) {
    console.log(e.responseText);
    $('#ZERPContainerID').empty().append(e.responseText);
  });




  // 1
  ZERP.processEntity = function(xEntityStructure){
    var xEntityStructureObj = JSON.parse(xEntityStructure);

    // Set system main parameters
    ZERP.System.appCommonDir = xEntityStructureObj.appCommonDir;
    ZERP.System.appMySystemDir = xEntityStructureObj.appMySystemDir;
    ZERP.System.appPageBrowseDir = xEntityStructureObj.appPageBrowseDir;
    ZERP.System.appClassLoadingDir = xEntityStructureObj.appClassLoadingDir;


    ZERP.buildZERPTemplate(true);

    // LIZERP.BaseToolbar.buildGenericToolbar(xEntityStructure);
    ZERP.BaseToolbar.buildCustomToolbar(xEntityStructure);
    // LIZERP.BaseToolbar.buildHeaderToolbar(xEntityStructureObj);
    // LIZERP.UIManager.refixPanelsHeightWidth();

    // set tittle
    var params = jsClient.paramsToObj(window.location.search);
    var rHeaderID = (!!params.rHeaderID) ? params.rHeaderID : '';
    document.title = xEntityStructureObj._entityTitle;
    if(rHeaderID != ''){
      document.title = rHeaderID + ' - ' + xEntityStructureObj._entityTitle;
    }

    $('#ERP_panel-listdoc-title').text(xEntityStructureObj._entityTitle);
    $('#ZERP_EntityTittle').text(xEntityStructureObj._entityTitle);

    // load custom JS and CSS and append this in body
    // by ajax request from class
    // then execute below code

  }

  // 2
  ZERP.processEntityForm = function(){

    var _pattern = (!!ZERP.System.EntityStructureObj['_pattern']) ? ZERP.System.EntityStructureObj['_pattern'] : '';
    if( _pattern == 'ParameterRequest' ){
      ZERP.BaseToolbar.buildGenericToolbar(ZERP.System.EntityStructureObj);
      ZERP.SFO.processForm('#formERP');

    } else if( _pattern == 'SingleFormHL_inLineLineEntry' ){
      ZERP.BaseToolbar.buildHeaderToolbar(ZERP.System.EntityStructureObj);
      ZERP.FrmMgr.SFHL.processForm('#formERP');

    } else if( _pattern == 'Entity' ){
      ZERP.BaseToolbar.buildGenericToolbar(ZERP.System.EntityStructureObj);
      ZERP.FrmMgr.genFrm.processForm('#formERP');
    }

  }

  // 3
  ZERP.processEntityList = function(){

    var listApiURL = ZERP.System.rRequestApiUrl;
    var listparams = {listApiURL: listApiURL, rEntityName: ZERP.System.rEntityName, _baseStructure: ZERP.System.EntityStructure, LoginUserID: LoginUserID};

    var _pattern = (!!ZERP.System.EntityStructureObj['_pattern']) ? ZERP.System.EntityStructureObj['_pattern'] : '';
    if( _pattern == 'SingleListOnly' ){
      ZERP.BaseToolbar.buildGenericToolbar(ZERP.System.EntityStructureObj);
      ZERP.SLO.processList(listparams);

    } else if(_pattern == 'Entity'){
      ListMgr.processList(listparams);

    } else if(_pattern == 'ChooserSession'){
        ZERP.BaseToolbar.buildGenericToolbar(ZERP.System.EntityStructureObj);
        ZERP.SLO.processList(listparams);

    }

  }



}
