/**
 * Declare the namespace ZERP if not existent
 */

/*ZERPContainerID
ZERP Container ID is needed for this Template for set width and height automatically
Within this Container Div this below code will be placed*/

var ZERP = ZERP || {};
ZERP.UIMgr = ZERP.UIMgr || {};
ZERP.Client = ZERP.Client || {};
ZERP.UIMgr.ZERPContainerID = 'ZERPContainerID';

ZERP.UIMgr.ObjectOpen = false;
ZERP.UIMgr.CollectionOpen = true;


ZERP.UIMgr.getDeviceInfo = function(){

	var info={
    timeOpened:new Date(),
    timezone:(new Date()).getTimezoneOffset()/60,
  }
}

ZERP.Client.isMobileX = function(){

		function Android(){
			return navigator.userAgent.match(/Android/i);
		}

    function BlackBerry() {
        return navigator.userAgent.match(/BlackBerry/i);
    }
    function iOS() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    }
    function Opera() {
        return navigator.userAgent.match(/Opera Mini/i);
    }
    function Windows() {
        return navigator.userAgent.match(/IEMobile/i);
    }
    function any(){
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }

}

function detectmob() {
   if(window.innerWidth <= 800 && window.innerHeight <= 600) {
     return true;
   } else {
     return false;
   }
}

ZERP.Client.isMobile = function(){

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

// alert(ZERP.Client.isMobile());


ZERP.UIMgr.getZERPlistFormGridPanelHeight = function(){
	// ZERP_listFormGridPanel
}
ZERP.UIMgr.getZERPmainContainerHeight = function(){
	// ZERP_mainContainer
}

ZERP.UIMgr.getZERPNavbarHeight = function(){
	// ZERP_mainContainer
}


ZERP.UIMgr.getZERPListTableHeight = function(){
	if($('#listTable').length > 0){
		return $('#listTable').height();
	}
	return 0;
}

ZERP.UIMgr.getZERPListTableSearchFormHeight = function(){
	if($('#listTableSearchForm').length > 0){
		return $('#listTableSearchForm').height();
	}
	return 0;	
}



ZERP.UIMgr.removeZERPmainContainerScrollable = function(){
  $('#ZERP_mainContainer').css({
    'overflow-x': '',
    'overflow-y': '',
  });
}

ZERP.UIMgr.setZERPmainContainerScrollable = function(){
  // $('#ZERP_mainContainer').css({
  //   'overflow': 'scroll',
  //   'overflow-x': 'scroll',
  //   // 'overflow-y': 'hidden',
  // });
}


ZERP.UIMgr.setZERPmainContainerHeight = function(){
  return; // currently make it off

	if(ZERP.Client.isMobile()) return;

    // Note: We need to consider width, not only height
    // for more width we want to show scroll bar by setting height

	var _width = window.innerWidth
	|| document.documentElement.clientWidth
	|| document.body.clientWidth;

	var _height = window.innerHeight
	|| document.documentElement.clientHeight
	|| document.body.clientHeight;
	

	// ZERP.UIMgr.getZERPNavbarHeight();
	var ZERPListTableSearchFormHeight = ZERP.UIMgr.getZERPListTableSearchFormHeight();
	var ZERPListTableHeight = ZERP.UIMgr.getZERPListTableHeight();
	if(ZERPListTableHeight == 0) return;

	var setHeight = (_height - 75);
	if(ZERPListTableHeight < setHeight) return;

	$('#ZERP_mainContainer').height(setHeight);
	$('#ZERP_mainContainer').css({
		'overflow': 'scroll',
		'margin-right': '-15px',
    'overflow-x': 'scroll',
    // 'overflow-y': 'hidden',
    // 'overflow': '-webkit-paged-x',
	});

	$('#ZERP_listFormGridPanel').css({
		// 'overflow': 'unset',
	});
	
}




















/*ZERP.UIMgr.handleZERP_mainContainerScroll = function(){
  console.log('Hi I am');
  console.log('pageYOffset--->' + window.pageYOffset);
  console.log('pageYOffset--->' + this.pageYOffset);

    var scroll = this.scrollY;
    console.log(scroll);

    var top = this.scrollY,
        left = this.scrollX;


    var a = this.scrollTop;
    console.log(a);


}*/


// var xZERP_mainContainer = document.getElementById("ZERP_mainContainer");
// xZERP_mainContainer.addEventListener("scroll", ZERP.UIMgr.handleZERP_mainContainerScroll);





///////////////////////////////////////////////////////////////////////////////////////////
function isScrolledIntoView(el) {
    var rect = el.getBoundingClientRect();
    var elemTop = rect.top;
    var elemBottom = rect.bottom;

    // Only completely visible elements return true:
    var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    // Partially visible elements return true:
    //isVisible = elemTop < window.innerHeight && elemBottom >= 0;
    return isVisible;
}


///////////////////////////////////////////////////////////////////////////
// SRC: https://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport

/*function isElementInViewport (el) {

    //special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }

    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && 
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) 
    );
}
*/



ZERP.UIMgr.handleUI_ListMgrReadEntity = function(){
  ZERP.UIMgr.removeStickyListHeader();
  ZERP.UIMgr.ObjectOpen = true;
}

ZERP.UIMgr.handleUI_FormMgrCloseObject = function(){
  ZERP.UIMgr.ObjectOpen = false;
  ZERP.UIMgr.setZERPmainContainerScrollable();
}


// Note check Entity object is open or not???
// if open then don not apply this

ZERP.UIMgr.showStickyListHeader = function(a, b){
  /*var boxes = document.getElementById("boxes");
  var clone = boxes.firstElementChild.cloneNode(true);
  boxes.appendChild(clone);*/  
  if(ZERP.UIMgr.ObjectOpen) return;

  var pageYOffset = window.pageYOffset
  var pageXOffset = window.pageXOffset

  // Note: if horizontal scroll then remove and update its
  // ZERP_listGridPanel_header
  var offset = $('#ZERP_listGridPanel_header').offset();
  var xLeft = offset.left;
  var xTop = offset.top;

  var xTop = 60;
  xTop = xTop + pageYOffset;
  console.log(pageYOffset +'---abc---'+ xTop);
   
  if($('#ZERP_listGridPanel_header_clone').length > 0){
    // already exist
    // and horizontal scroll
    if( (b > 0) || (pageYOffset > 0) ){
      $('#ZERP_listGridPanel_header_clone').remove();
      b = (-1 * b);
    } else {
      return;
    }

  }

  // clone
  var $div = $('div#ZERP_listGridPanel_header');
  var $klon = $div.clone().prop('id', 'ZERP_listGridPanel_header_clone' );

  // process
  $klon.find("tr#searchForm").remove();
  $klon.css({
    'position': 'absolute',
    'top': (xTop+'px'),
    'left': (xLeft+'px'),
  });

  // append
  $('body').append($klon);

}


ZERP.UIMgr.removeStickyListHeader = function(){
  if($('#ZERP_listGridPanel_header_clone').length > 0){
    $('#ZERP_listGridPanel_header_clone').remove();
  }
}



//non-jQuery
function isElementInViewport (el) {

    //special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }

    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && 
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) 
    );
}


ZERP.UIMgr.handleZERP_mainContainerScroll = function(){
  console.log('Hi I am-ZERP_mainContainerScroll');
  var a = this.scrollTop;
  var b = this.scrollLeft;
  console.log(a+'---'+b);

  var xZERP_listFormGridPanel = document.getElementById("ZERP_listFormGridPanel");
  if(xZERP_listFormGridPanel){
    var inView = isElementInViewport(xZERP_listFormGridPanel);
    console.log('inView--->' + inView);

    if(!inView){
      ZERP.UIMgr.showStickyListHeader(a, b);
    } else {
      ZERP.UIMgr.removeStickyListHeader();
    }
  }

}






// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
ZERP.UIMgr.handleWindowScroll = function(){
  // if (window.pageYOffset > sticky) {
  //   header.classList.add("sticky");
  // } else {
  //   header.classList.remove("sticky");
  // }
  console.log('window-pageYOffset--->' + window.pageYOffset);

  var xZERP_listFormGridPanel = document.getElementById("ZERP_listFormGridPanel");
  if(xZERP_listFormGridPanel){
    var inView = isElementInViewport(xZERP_listFormGridPanel);
    console.log('inView--->' + inView);

    if(!inView){
      ZERP.UIMgr.showStickyListHeader();
    } else {
      ZERP.UIMgr.removeStickyListHeader();
    }
  }

}






ZERP.UIMgr.handleNotFoundOrNotAuthoEntity = function(){
  $('#ZERP_TbarListFromWrapper').css('display', 'none');
}



// ======================== ZERP_mainContainer scrolling handler
// var xZERP_mainContainer = document.getElementById("ZERP_mainContainer");
// xZERP_mainContainer.addEventListener("scroll", ZERP.UIMgr.handleZERP_mainContainerScroll);
// xZERP_mainContainer.addEventListener("resize", ZERP.UIMgr.handleZERP_mainContainerScroll);

// // // Call
// ZERP.UIMgr.setZERPmainContainerHeight();



ZERP.UIMgr.handleGenericToolbarScroll = function(){
  // console.log("dddddddd");
}


/**
 * 2020-01-16 @Al-Mamun
 * for VAT Software huge line handling
 * @return {[type]} [description]
 * 
 * Status: tested and working
 */
ZERP.UIMgr.handleLineTableHeaderThFixScroll = function(){
  $('#ZERP_listGridPanel_headerOffset').offset();
  var offset = $('#ZERP_listGridPanel_headerOffset').offset();
  var xLeft = offset.left;
  var xTop = offset.top;
  // console.log("this el top --> " + xTop);
  // console.log("this el left --> " + xLeft);
  if(!!!ZERP.UIMgr.ZERP_listGridPanel_headerOffset_initialOffset_top) ZERP.UIMgr.ZERP_listGridPanel_headerOffset_initialOffset_top = xTop;
  var pageYOffset = window.pageYOffset
  var pageXOffset = window.pageXOffset
  // console.log("this w top --> " + pageYOffset);
  // console.log("this w left --> " + pageXOffset);
  // if(pageYOffset > xTop){
  if(pageYOffset > ZERP.UIMgr.ZERP_listGridPanel_headerOffset_initialOffset_top){
    $('#ZERP_listGridPanel_headerOffset').addClass('ZERP_listGridPanel_headerOffset_thFixClass');
    $('.ZERP_listGridPanel_headerOffset_thFixClass').css({
      // 'position': 'fixed',
      // 'top': '5px',
      // 'z-index': '99',
      // 'background': 'aliceblue',
    });
    // create dynamic class css
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '.ZERP_listGridPanel_headerOffset_thFixClass { position: fixed; top: 5px; z-index: 99;background:  aliceblue; }';
    document.getElementsByTagName('head')[0].appendChild(style);
  } else {
    $('#ZERP_listGridPanel_headerOffset').removeClass('ZERP_listGridPanel_headerOffset_thFixClass');
  }
}



// ======================== Window scrolling handle
// When the user scrolls the page, execute myFunction 
window.onscroll = function() {
  // ZERP.UIMgr.handleWindowScroll();
  ZERP.UIMgr.handleGenericToolbarScroll();
  if(!!ZERP.System.EntityStructureObj){
    if(!!ZERP.System.EntityStructureObj['_lineTableHeaderThFixScroll']){
      ZERP.UIMgr.handleLineTableHeaderThFixScroll();
    }   
  }
}



$(document).ready(function(){

  var _windowWidth = window.innerWidth
  || document.documentElement.clientWidth
  || document.body.clientWidth;

  var _windowHeight = window.innerHeight
  || document.documentElement.clientHeight
  || document.body.clientHeight;

  var _screenWidth = screen.width;
  var _screenHeight = screen.height 
  console.log('window width*height = ' + _windowWidth + '*' + _windowHeight);
  console.log('screen width*height = ' + _screenWidth + '*' + _screenHeight);




  var params = jsClient.paramsToObj(window.location.search);
  if(!!params.rDocumentHL && params.rDocumentHL == '1'){
    // For Document header line its not applicable 
    return;

  } else {

    if(_screenHeight < 1000){
  	  $('#ZERP_listFormGridPanel').css({
  	    'min-height': (_windowHeight-250) + 'px',
  	  });
    } else if(_screenHeight > 1000){
  	  $('#ZERP_listFormGridPanel').css({
  	    'min-height': (_windowHeight-350) + 'px',
  	  });
    }
    
  }


});



// attach window event listener
function reportWindowSize() {
	console.log( 'WindowSize H - ' + window.innerHeight);
	console.log( 'WindowSize W - ' + window.innerWidth);
}
window.addEventListener('resize', reportWindowSize);
