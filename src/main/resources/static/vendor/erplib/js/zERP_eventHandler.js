// This Js will handle encode/decode data by on blur/change field value which bind to action by calling to event handler class

// 1.
$('.alx-dropdown').click(function(){
	alert('Hi I am here');
});

// 2. 
$(document).on("click",".alx-dropdown",function(){
	alert('Hi I am here');
});

// 3. 
$(document).on("click","button[data-toggle='alx-dropdown']",function( event ){
	event.preventDefault();
	console.log( $( this ).text() );

  var x = $( this ).offset();
  var top = x.top;
  var left = x.left;
  console.log("My position: Top: " + top + " Left: " + left);

  var y = $( this ).height();

  var forEelement = $( this ).attr('for-element');
  ZERP.bsDataToggleForEelement = forEelement;
  $('#'+forEelement+'-dropdown-menu').css({
    // 'display':'block',
    'left': left,
    'top': (top + y),
  });


  if( $('#'+forEelement+'-dropdown-menu').hasClass('show') ){
    $('#'+forEelement+'-dropdown-menu').removeClass('show');
  } else {
    $('#'+forEelement+'-dropdown-menu').addClass('show');
  }

  
});








/**
 * Event Handling Methods =================================================
 */

ZERP.viewLogHistory = function(thisPtr){
  // alert('I am');
  if(!!ZERP.bsDataToggleForEelement){
    $('#'+ZERP.bsDataToggleForEelement+'-dropdown-menu').removeClass('show');
  }
  
}


ZERP.saveAndNewForm = function(thisPtr){
  // alert('I am');
  if(!!ZERP.bsDataToggleForEelement){
    $('#'+ZERP.bsDataToggleForEelement+'-dropdown-menu').removeClass('show');
  }
  ZERP.FrmMgr.genFrm.saveAndNewForm();
  
}
