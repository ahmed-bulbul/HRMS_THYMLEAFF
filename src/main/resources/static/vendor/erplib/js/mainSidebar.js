$('#btnShowSidebar').click(function(){

  $('.main-sidebar').css({
    'width' : '220px',
  });
  $('#main').css({
    'margin-left' : '220px',
  });

  $('.navbar-brand-ct-width').css({
    'width' : '202px',
  });

  $('#btnSidebarLockUnlock').css('display', 'block');

  $(this).css('display', 'none');
  $('#btnHideSidebar').css({
    'display' : 'block',
    // 'margin-left': '185px',
    'margin-left': '35px'
  });

  $('body').removeClass('sidebar-collapse');
  $('body').removeClass('sidebar-mini');
  $('body').addClass('active-main-sidebar');

});


$('#btnHideSidebar').click(function(){
  // Click to hide sidebar menu

  $('.main-sidebar').css({
    'width' : '40px',
  });
  $('#main').css({
    'margin-left' : '40px',
  });


  $('.navbar-brand-ct-width').css({
    'width' : '',
  });
  $('body.active-main-sidebar .navbar-brand-ct-width').css({
    'width' : '',
  });
  $('body').removeClass('active-main-sidebar');

  $('#btnSidebarLockUnlock').css('display', 'none');

  $(this).css('display', 'none');
  $('#btnShowSidebar').css({
    'display' : 'block',
  });

  $('body').addClass('sidebar-collapse');
  $('body').addClass('sidebar-mini');
  $('body').removeClass('active-main-sidebar');

});



$('#btnSidebarLockUnlock').click(function(){

  if (typeof(Storage) !== "undefined") {
    // Code for localStorage/sessionStorage.
    var storageKey = getLockLocalStoragekey();
    // var IszERP_mainSidebarLock = window.localStorage.getItem('zERP_mainSidebarLock');
    var IszERP_mainSidebarLock = window.localStorage.getItem(storageKey);

    if(IszERP_mainSidebarLock === null){
      // this user not set yet
      // window.localStorage.setItem('zERP_mainSidebarLock', 'Yes');
      window.localStorage.setItem(storageKey, 'Yes');

    } else if(IszERP_mainSidebarLock == "Yes"){
      // window.localStorage.setItem('zERP_mainSidebarLock', 'No');
      window.localStorage.setItem(storageKey, 'No');

    } else {
      // window.localStorage.setItem('zERP_mainSidebarLock', 'Yes');
      window.localStorage.setItem(storageKey, 'Yes');

    }
    

  } else {
    // Sorry! No Web Storage support..
  }

});



// handle page wise
function getLockLocalStoragekey(){

    var fullUrlPath = window.location.href;
    fullUrlPath = fullUrlPath.replace("//", "_");
    fullUrlPath = fullUrlPath.replace(":", "_");
    fullUrlPath = fullUrlPath.replace("?", "_");
    fullUrlPath = fullUrlPath.replace("=", "_");
    fullUrlPath = fullUrlPath.replace("/", "_");

	fullUrlPath = fullUrlPath.split("/").join("_");
	fullUrlPath = fullUrlPath.split(":").join("_");

    var storageKey = 'zERP_mainSidebarLock__' + fullUrlPath;
    return storageKey;

}


// check local storage and set UI
$(document).ready(function(){

  if (typeof(Storage) !== "undefined") {

    var storageKey = getLockLocalStoragekey();
    // var IszERP_mainSidebarLock = window.localStorage.getItem('zERP_mainSidebarLock');
    var IszERP_mainSidebarLock = window.localStorage.getItem(storageKey);
    if(IszERP_mainSidebarLock === null) return;

    if(IszERP_mainSidebarLock == "Yes"){
      $("#btnShowSidebar").click();
    } else {
    }

  }

});
