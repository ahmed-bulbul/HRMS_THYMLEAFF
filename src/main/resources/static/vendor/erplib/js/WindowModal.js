/*
SRC: https://getbootstrap.com/docs/4.0/components/modal/
Date: 2018-11-11
*/


// wModal NameSpace
var wModal = wModal || {};
var modalInts; // Global declaration for access everywhere

// Execute call back function
wModal.executeFunctionByName = function(functionName, context /*, args */) {
  var args = Array.prototype.slice.call(arguments, 2);
  var namespaces = functionName.split(".");
  var func = namespaces.pop();
  for(var i = 0; i < namespaces.length; i++) {
    context = context[namespaces[i]];
  }
  return context[func].apply(context, args);
}



/**
 * [WindowModalBSV1Class description]
 * No need any additional CSS file
 * Bootstrap CSS will be used here
 */
wModal.WindowModalBSV1Class = function(){
  //Private attributes
  var serialNumber = 0;
  var modalContainerID;

  //public attribute
  this.modalContainer;
  this.modalContainerID;
  this.activeModalContainerID;

  // Private mathods
  function getNextSerial(){
    serialNumber = serialNumber + 1;
    return serialNumber
  }
  function setModalContainerID(serialNumber){
    modalContainerID = 'modalContainer-' + serialNumber;
  }
  function getModalContainerID(){
     return modalContainerID;
  }

  this.setModalContainerID = function(serialNumber){
    return setModalContainerID(serialNumber);
  }
  this.getModalContainerID = function(){
    return getModalContainerID();
  }

  //Protected Methods
  var createContainer = function(){
    var serialNumber = getNextSerial();
    setModalContainerID(serialNumber);
    container = document.getElementById('modalContainer-'+serialNumber);

    if (container == null){
      container = document.createElement('div');
      container.setAttribute('id','modalContainer-'+serialNumber);
      if (document.body != null) {
        document.body.appendChild(container);
      }
      else {
        document.addEventListener('DOMContentLoaded', function () {
          document.body.appendChild(container);
        });
      }
    }
    
    return container;
  }


  this.createNewModal = function(){
    console.log('\nCreating new modal v-WindowModalBSV1Class');
    // need a variable 
    // ZERPActiveModalBox = 101
    // here 101 will and attribute and it will be save in some where in modalbox
    // then dymanically access all ID by concatenating this ID.
  
    // don't do anything in below code
    $('body').find('#modalContainer').remove();
    modalContainer = createContainer();
    var newModal = '\
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">\
      <div class="modal-dialog" role="document">\
        <div class="modal-content">\
          <div class="modal-header">\
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>\
            <button type="button" class="close btnModalHeaderClose" data-dismiss="modal" aria-label="Close">\
              <span aria-hidden="true">&times;</span>\
            </button>\
          </div>\
          <div class="modal-body">\
            ...\
          </div>\
          <div class="modal-footer">\
            <button type="button" class="btn-Close btn btn-secondary" data-dismiss="modal">Close</button>\
            <button type="button" class="btn-Done  btn btn-primary" onclick="wModal.saveChanges(this);" callBackFunctionName="" >Save changes</button>\
            <!-- <button type="button" class="btn btn-primary" onclick="doSomething(event);" >Save changes</button> -->\
            <!-- <button type="button" class="btn btn-primary" onclick="doSomething2(this);" >Save changes</button> -->\
            <!-- <button type="button" class="btn btn-primary" onclick="(function(){modalInts.saveChanges();})();" >Save changes</button> -->\
          </div>\
        </div>\
      </div>\
    </div>\
      ';
      
    modalContainer.innerHTML = newModal;  
    // $('body').append(newModal);

    // apply css ---------
    $('#exampleModal').css({
      'position':'fixed',
      'top':'0',
      'right':'0',
      'bottom':'0',
      'left':'0',
      'z-index':'1050',
      'outline': '0',
    });
    // apply css show---------
    $('#exampleModal').css({
      'opacity':'1',
      'display':'block',
      // 'margin': '1.75rem auto',
      'margin': 'auto',
    });
    $('.modal.fade .modal-dialog').css({
      'webkit-transform': 'translate(0,0)',
      'transform': 'translate(0,0)',
    });

    // $("[data-dismiss=modal]").trigger({ type: "click" });
    $("[data-dismiss=modal]").click(function(){
      $('body').find('#'+modalContainerID).remove();
      $('body').find('.modal-backdrop').remove();
    });

    this.modalContainer = modalContainer;
    return modalContainer;
  }

  this.setTittle = function(tittle){
    $('#myModalFirst .ALx-modal-header').find('#ZERP_EntityListTittle_PopList').text(tittle);
  }
  this.setBodyHTML = function(strHTML){
    $(this.modalContainer).find('.modal-body').empty().append(strHTML);
  }
  this.setHieght = function(height){
    // $('#myModalFirst #modal-content').css('height', height+'px');
    $('#exampleModal .modal-content').css('height', height+'px');
  }
  this.setHieghtFW = function(height){  // set height Full Window
    var thisModal = document.getElementById('exampleModal');
    thisModal.getElementsByClassName('modal-body')[0].style.height = '70vh';
    thisModal.getElementsByClassName('modal-body')[0].style.cssText = "height:70vh; overflow-y: scroll;"; 
    // document.getElementById('SFileGallery').style.cssText = "margin-top:0px;";
  }
  this.setWidth = function(width){
    // $('#myModalFirst #modal-content').css('width', width+'px');
    $('#exampleModal .modal-content').css('width', width+'px');
  }

  this.setWidthFW = function(width){
    $('#myModalFirst #modal-content').css('width', width+'px');
  }

  this.setWidthLG = function(width){
    var thisModal = document.getElementById('exampleModal');
    thisModal.getElementsByClassName('modal-dialog')[0].classList.add("modal-lg");
  }


  this.setPosition = function(x, y){
    // if(!!x && x != '') $('.modal-dialog').css('padding-left', x+'px');
    // if(!!y && y != '') $('.modal-dialog').css('padding-top', y+'px');    
    if(!!x && x != '') $('.modal-dialog').css('margin-left', x+'px');
    if(!!y && y != '') $('.modal-dialog').css('margin-top', y+'px');    
  }

  this.setFitPosition = function(x = 0, y = 0){
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var windowWidthXX = windowWidth - 0;
    var windowHeightYY = windowHeight - 0;

    var offsetHeight = document.getElementById('exampleModal').getElementsByClassName('modal-body')[0].offsetHeight;
    var offsetWidth = document.getElementById('exampleModal').getElementsByClassName('modal-body')[0].offsetWidth; 
    var apMarginTop = (windowHeightYY-offsetHeight)/2;
    var apMarginLeft = (windowWidthXX-offsetWidth)/2;
    apMarginTop = apMarginTop - y;
    console.log(apMarginTop);
    console.log(apMarginLeft);

    $('.modal-dialog').css('margin-top', (apMarginTop)+'px');    
    $('.modal-dialog').css('margin-left', (apMarginLeft)+'px');
  }

  this.updateModalBox = function(x, y){
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    windowWidthXX = windowWidth - 50;
    windowHeightYY = windowHeight -100;
    var offsetHeight = document.getElementById('modal-body').offsetHeight;
    var offsetWidth = document.getElementById('modal-body').offsetWidth; 
  }
  this.removeSpinner = function(){
    $('#myModalFirst #modal-loadingDiv').empty();
  }
  this.close = function(){
    $('body').find('#myModalFirst').remove();
  }

  this.closeThisModal = function(){
    $('body').find('#'+modalContainerID).remove();
    $('body').find('.modal-backdrop').remove();
  }

  this.saveChanges = function(){
    alert('Inside saveChanges.....1');
  }

  this.setCallBackFunctionName = function(callBackFunctionName){
    $(this.modalContainer).find('.btn-Done').attr('callBackFunctionName', callBackFunctionName);
  }

  this.addFade = function(){
    $('body').append('<div class="modal-backdrop fade show"></div>');
  }


}

wModal.saveChanges = function(thisPtr){
  // alert('Out side saveChanges...2');
  var callbackfunctionname = thisPtr.getAttribute('callbackfunctionname');
  // alert(callbackfunctionname);
  // executeFunctionByName("My.Namespace.functionName", window, arguments);
  wModal.executeFunctionByName(callbackfunctionname, window, thisPtr);
}





/**
 * How to use this Modal Class
 */
function howToUse(){
  modalInts = new wModal.WindowModalBSV1Class();
  var modalContainer = modalInts.createNewModal();
  alert(modalContainer);
  var modal = $(modalContainer);
  modal.find('.modal-title').text('New message to Xx');
  
  modalInts.setBodyHTML();

  // alert(modalContainer);
  // modalInts.setWidth('600');
  // modalInts.setHieght('300');
  // modalInts.setTittle('Item Code Creation');
  // modalInts.setPosition('', '50');
}




/**
 * [WindowModalALxV1Class description]
 */
wModal.WindowModalALxV1Class = function(){
  //Protected Methods
  var createContainer = function(){
    container = document.getElementById('modalContainer');

    if (container == null){
      container = document.createElement('div');
      container.setAttribute('id','modalContainer');
      if (document.body != null) {
        document.body.appendChild(container);
      }
      else {
        document.addEventListener('DOMContentLoaded', function () {
          document.body.appendChild(container);
        });
      }
    }
    
    return container;
  }


  this.createNewModal = function(){
    console.log('\nCreating new modal v-WindowModalBSV1Class');
    // need a variable 
    // ZERPActiveModalBox = 101
    // here 101 will and attribute and it will be save in some where in modalbox
    // then dymanically access all ID by concatenating this ID.
  
    // don't do anything in below code
    $('body').find('#modalContainer').remove();
    modalContainer = createContainer();
    var newModal = '\
    <div id="ALxModal" class="ALx-modal ALx-fade" tabindex="-1" role="dialog">\
      <div class="ALx-modal-dialog" role="document">\
        <div class="ALx-modal-content">\
          <div class="ALx-modal-header">\
            <h5 class="ALx-modal-title">Modal title</h5>\
            <button type="button" class="close btnModalHeaderClose">\
              <span aria-hidden="true">&times;</span>\
            </button>\
          </div>\
          <div class="ALx-modal-body">\
            ...\
          </div>\
          <div class="ALx-modal-footer">\
            <button type="button" class="btn btn-secondary">Close</button>\
            <button type="button" class="btn btn-primary">Save changes</button>\
          </div>\
        </div>\
      </div>\
    </div>\
      ';
    modalContainer.innerHTML = newModal;  
    // $('body').append(newModal);

    // apply css ---------
    $('#ALxModal').css({
      'position':'fixed',
      'top':'0',
      'right':'0',
      'bottom':'0',
      'left':'0',
      'z-index':'1050',
      'outline': '0',
      'display': 'block',
      'background-color':'rgba(0,0,0,0.4)',      
    });
    $('#ALxModal .ALx-modal-dialog').css({
      'max-width': '500px',
      'margin': '1.75rem auto',
      'background-color':'white',      
    });
    $('#ALxModal .ALx-modal-dialog .ALx-modal-content').css({
      'border': '1px solid rgba(0,0,0,.2)',
      'border-radius': '.3rem',     
    });

    // Get the modal
    var modal = document.getElementById('ALxModal');
    var span = document.getElementById("ALxModal").getElementsByClassName("close")[0];
    span.onclick = function() {
      modal.style.display = "none";
      $('body').find('#ALxModal').remove();
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
          $('body').find('#ALxModal').remove();
      }
    }


    return modalContainer;
  }

  this.setTittle = function(tittle){
    $('#myModalFirst .modal-header').find('#ZERP_EntityListTittle_PopList').text(tittle);
  }
  this.setHieght = function(height){
    $('#myModalFirst #modal-content').css('height', height+'px');
  }
  this.setWidth = function(width){
    $('#myModalFirst #modal-content').css('width', width+'px');
  }
  this.setPosition = function(x, y){
    if(!!x && x != '') $('#myModalFirst').css('padding-left', x+'px');
    if(!!y && y != '') $('#myModalFirst').css('padding-top', y+'px');    
  }
  this.updateModalBox = function(x, y){
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    windowWidthXX = windowWidth - 50;
    windowHeightYY = windowHeight -100;
    var offsetHeight = document.getElementById('modal-body').offsetHeight;
    var offsetWidth = document.getElementById('modal-body').offsetWidth; 
  }
  this.removeSpinner = function(){
    $('#myModalFirst #modal-loadingDiv').empty();
  }
  this.close = function(){
    $('body').find('#myModalFirst').remove();
  }



}
