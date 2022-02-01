// Declare NameSpace
var ZERP = ZERP || {};
ZERP.System = ZERP.System || {};
ZERP.System.MainHelper = ZERP.System.MainHelper || {};


ZERP.System.MainHelper.showErrorMessage = function(xEntityStructureObj) {
      $('#ZERPContainerID').empty().append('<div class="alert alert-warning mt-5" role="alert"><h4>Warning!</h4>' + xEntityStructureObj.userErrorMsg + '</div>');
      return false;
}

ZERP.System.MainHelper.showErrorMessage2 = function(response) {
	// alert('Some thing is wrong in API, check console log for details.');
    $('#ZERPContainerID').empty().append('<div class="alert alert-warning mt-5" role="alert"><h4>Warning!</h4>' + response + '</div>');
    return false;
}


ZERP.System.MainHelper.loadCustomFormJS = function(){

}

ZERP.System.MainHelper.loadCustomListJS = function(){
	
}


ZERP.System.MainHelper.loadCustomFormCSS = function(){

	var entityFormCstCss = (!!ZERP.System.EntityStructureObj._entityFormCstCSS) ? ZERP.System.EntityStructureObj._entityFormCstCSS : 'XyzForm.css';

	if(entityFormCstCss != 'XyzForm.css'){
		var pkgName = ZERP.System.EntityStructureObj._pkgName;

		// var cssId = 'myCss';  // you could encode the css path itself to generate id..
		var cssId = entityFormCstCss;  // you could encode the css path itself to generate id..
		if (!document.getElementById(cssId)){
		    var head  = document.getElementsByTagName('head')[0];
		    var link  = document.createElement('link');
		    link.id   = cssId;
		    link.rel  = 'stylesheet';
		    link.type = 'text/css';

		    var cstFormCSSURL = window.location.protocol + "//" + window.location.host + "" + ZERP.System.contextPath + "/PkgCustomJsCss/" + pkgName + "/css/" + entityFormCstCss + "?v=123";
		    // link.href = 'http://website.com/css/stylesheet.css';
		    link.href = cstFormCSSURL;
		    link.media = 'all';
		    head.appendChild(link);
		}

	}

}


ZERP.System.MainHelper.loadCustomListCSS = function(){
	
}




ZERP.System.MainHelper.autoLoginOthersSystemByAjax = function(){

  function doLogin(){
  // 	var loginUrl = "http://localhost:8080/jasperserver/j_spring_security_check";
  // 	console.log(loginUrl);
  // 	  $.ajax({
	 //    method: "GET",
	 //    // url: loginUrl,
	 //    url: 'http://localhost:8080/jasperserver/j_spring_security_check?j_username=jasperadmin&j_password=jasperadmin',
	 //    // url: 'http://localhost:8080/jasperserver/flow.html?_flowId=viewReportFlow&_flowId=viewReportFlow&ParentFolderUri=%2Freports&reportUnit=%2Freports%2Fet444444444444444&standAlone=true&ORG=23',
	 //    // url: 'http://localhost:8080/jasperserver/j_spring_security_check',
	 //    // data: {j_username: 'jasperadmin', j_password: 'jasperadmin'},
	 //    // cache: false,
	 //  }).done(function(response) {
	 //  });


	// var a = document.createElement('A');
	// // var href = ZERP.System.contextPath + "/systemMain/main?rEntityName=PurchaseRequisition&rHeaderID=__new__"
	// var href = "http://localhost:8080/jasperserver/j_spring_security_check?j_username=jasperadmin&j_password=jasperadmin"
	// a.href = href;
	// // a.setAttribute("target", "_blank");
	// a.setAttribute("target", "_self");
	// document.body.appendChild(a);
	// a.click();
  }

  setTimeout(function() {
    doLogin();
  }, 3000);

}


ZERP.System.MainHelper.Main = function(){

	ZERP.System.MainHelper.loadCustomFormCSS();
	// Auto connect others system by ajax request
	// @Al-Mamun@2020-01-26
	ZERP.System.MainHelper.autoLoginOthersSystemByAjax();

}
