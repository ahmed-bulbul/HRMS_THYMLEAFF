// Declare global variable
ZERP.ODDDH = ZERP.ODDDH || {};
ZERP.ODDDH.TargetODDDInputElmntName = '';
ZERP.ODDDH.IsClickODDOPToggleElmnt = false;
ZERP.ODDDH.AlreadyOpenODDDTgOptionBox = false;
ZERP.ODDDH.clickODDDOPToggleElmnt;
ZERP.ODDDH.populateCache = {};

ZERP.SFHL = ZERP.SFHL || {};


ZERP.ODDDH.makeOnDemandDropdownOptionsAndShow_ToggleButton = function(thisPtr){
  // Remove old all open box
  $('body').find('.autocomplete-items').remove();

  // Start making new one
  var clickToggleElmnt = thisPtr;
  var actionElmntType = thisPtr.getAttribute('type');
  var rAttributeName = thisPtr.getAttribute('forAttribute');

  ZERP.ODDDH.clickODDDOPToggleElmnt = clickToggleElmnt;
  ZERP.ODDDH.IsClickODDOPToggleElmnt = true;

  if(ZERP.ODDDH.AlreadyOpenODDDTgOptionBox == false){
    ZERP.ODDDH.AlreadyOpenODDDTgOptionBox = true;

  } else if(ZERP.ODDDH.AlreadyOpenODDDTgOptionBox === true && ZERP.ODDDH.TargetODDDInputElmntName == rAttributeName){
    ZERP.ODDDH.AlreadyOpenODDDTgOptionBox = false;
    return;
  }
  ZERP.ODDDH.TargetODDDInputElmntName = rAttributeName;
  console.log( '-->: ' +ZERP.ODDDH.TargetODDDInputElmntName + '----' + rAttributeName);


  var inp;
  var inp_code;
  if(actionElmntType == 'button'){
    // rAttributeName = $(thisPtr).closest('div').find('input[type=text]').attr('name');
    // inp = thisPtr.previousSibling;
    inp = $(thisPtr).closest('div').find('input[name='+rAttributeName+']');
    inp_code = $(thisPtr).closest('div').find('input[name='+rAttributeName+'_code]');
    $(thisPtr).closest('div').find('input[name='+rAttributeName+']').focus();
  }

  var thisAttributeProperties = ZERP.System.EntityStructureObj['Attributes'][rAttributeName];
  var OnChangeCallFunc = false;
  if( thisAttributeProperties.hasOwnProperty('OnChangeCallFunc') ) {
    OnChangeCallFunc =  thisAttributeProperties.OnChangeCallFunc;
  }
  var LookupParameters = '';
  if( thisAttributeProperties.hasOwnProperty('LookupParameters') ) {
    LookupParameters =  thisAttributeProperties.LookupParameters;
  }

  var LinkedAttrs = '';
  if( thisAttributeProperties.hasOwnProperty('LinkedAttrs') ) {
    LinkedAttrs =  thisAttributeProperties.LinkedAttrs;
  }  

  var LinkedAttrsRestrict = false;
  if( thisAttributeProperties.hasOwnProperty('LinkedAttrsRestrict') ) {
    LinkedAttrsRestrict =  thisAttributeProperties.LinkedAttrsRestrict;
  }
  var LinkedAttrsDescUse = false;
  if( thisAttributeProperties.hasOwnProperty('LinkedAttrsDescUse') ) {
    LinkedAttrsDescUse =  thisAttributeProperties.LinkedAttrsDescUse;
  }  


  var HtmlType = thisAttributeProperties['HtmlType'];

  var ReferenceEntityExtraFieldShowOnDesc = 0;
  if( thisAttributeProperties.hasOwnProperty('ReferenceEntityExtraFieldShowOnDesc') ) {
    ReferenceEntityExtraFieldShowOnDesc =  thisAttributeProperties.ReferenceEntityExtraFieldShowOnDesc;
  }

  var DdOptionCtBoxFixWidth = 0;
  if( thisAttributeProperties.hasOwnProperty('DdOptionCtBoxFixWidth') ) {
    DdOptionCtBoxFixWidth =  thisAttributeProperties.DdOptionCtBoxFixWidth;
  }



  var thisElmOffset = $(thisPtr).offset();
  var thisElmTop = thisElmOffset.top;
  var thisElmLeft = thisElmOffset.left;
  var thisElmWidth = $(thisPtr).width();

  var thisElmParentOffset = $(thisPtr).parent().offset();
  var thisElmParentTop = thisElmParentOffset.top;
  var thisElmParentLeft = thisElmParentOffset.left;
  var thisElmParentWidth = $(thisPtr).parent().width();
  if(DdOptionCtBoxFixWidth != 0){
    thisElmParentWidth = DdOptionCtBoxFixWidth;
  }

  // Consider window scrolling
  var doc = document.documentElement;
  var pageYOffset = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
  var pageXOffset = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
  // calculation
  thisElmParentTop = thisElmParentTop - pageYOffset;
  thisElmParentLeft = thisElmParentLeft - pageXOffset;


  var a, b, i;

  a = document.createElement("DIV");
  a.setAttribute("id", rAttributeName + "-autocomplete-list");
  a.setAttribute("class", "autocomplete-items");
  // a.style.cssText = "position: absolute; border: 1px solid #d4d4d4; border-top: none; background: white ; z-index: 99; top: "+xTop+"px; left: 0px; right: 0; overflow: auto; max-height:200px; width:100%;  ";
  a.style.cssText = "position: fixed; border: 1px solid #d4d4d4; border-top: none; background: white ; z-index: 99; top: "+(thisElmParentTop+30)+"px; left:"+thisElmParentLeft+"px; right: 0; overflow: auto; max-height:200px; width:"+thisElmParentWidth+"px;  ";
  /*append the DIV element as a child of the autocomplete container:*/

  var myEle = document.getElementById(thisPtr.id + "-autocomplete-list");
  if(myEle) myEle.remove();
  thisPtr.parentNode.appendChild(a);
  $(thisPtr).parent().css('position', 'relative');
  // alert('Hi i am here...');

  var searchSpan = document.createElement('span');
  searchSpan.id = "ODDDH_SearchingSpinnerCt";
  searchSpan.innerHTML = 'Searching ....<i class="fas fa-spinner fa-spin"></i>';
  searchSpan.style.cssText = 'display: block;background: gainsboro; padding: 3px;';
  searchSpan.style.fontSize = '13px';

  a.innerHTML = '';
  a.appendChild(searchSpan);


  // Org control params
  var organization = $('.ZERP_EntryCt #organization').val();
  var operatingUnit = $('.ZERP_EntryCt #operatingUnit').val();  
  var organization = $('.ZERP_EntryCt #organization_code').val();
  var operatingUnit = $('.ZERP_EntryCt #operatingUnit_code').val();

  // Call to server for retrieve data ...........................
  var url = ZERP.System.rRequestApiUrl;
  var params = 'rReqType=getOnDemandDropdownResource';
  params += '&rEntityName=OnDemandDropdownResHandling';
  params += '&rResRetrieveEntityName=OnDemandDropdownResHandling';
  params += '&rEventEntityName=' + ZERP.System.rEntityName;
  params += '&rAttributeName=' + rAttributeName;
  params += '&rRunTime=' + ZERP.System.rRunTime;
  params += '&q=';
  params += '&rDropdownRes=' + '';
  params += '&rDynamicResource=1';
  params += '&rDataResourceSql=' + '';
  if(!!organization) params += '&organization=' + organization;
  if(!!operatingUnit) params += '&operatingUnit=' + operatingUnit;
  

  if(LookupParameters != '' && LookupParameters != null){
    var LookupParametersArray = LookupParameters.split(';'); // '||' is not working in grails
    for (var i = 0; i < LookupParametersArray.length; i++) {
      var thisPart =  LookupParametersArray[i];
      var thisPartArray = thisPart.split('=>');
      params += '&'+thisPartArray[0] + '=' + thisPartArray[1];
    }
  }


  var hasLinkedAttrsVal = false;
  if(!!LinkedAttrs && LinkedAttrs.length > 0){
    LinkedAttrsArray = LinkedAttrs.split(';');   // '||' is not working in grails
    for (var i = 0; i < LinkedAttrsArray.length; i++) {
      var thisLinkedAttrs = LinkedAttrsArray[i];
      if(thisLinkedAttrs == '' || thisLinkedAttrs == null) break;
      var thisLinkedAttrsArray = thisLinkedAttrs.split('=>');
      var thisEntityFieldName = thisLinkedAttrsArray[0];
      var thisReferenceEntityFieldName = thisLinkedAttrsArray[1];
      var valXy = $('.ZERP_EntryCt').find('#'+thisEntityFieldName).val();

      var valXy_code = $('.ZERP_EntryCt').find('#'+thisEntityFieldName+"_code").val(); // for handle reference link attribute
      if(!!valXy_code && valXy_code != "") valXy = valXy_code; // for handle reference link attribute
      if(LinkedAttrsDescUse) valXy = $('.ZERP_EntryCt').find('#'+thisEntityFieldName).val(); // 2020-02-04@Mamun

      if(!!valXy && valXy != '' && valXy != null){
        params += '&'+thisReferenceEntityFieldName+ '='+ valXy;
        hasLinkedAttrsVal = true;
      }
    }
  }

  if(LinkedAttrsRestrict && !hasLinkedAttrsVal){
    return;
  }




  var xhr = new XMLHttpRequest();
  xhr.open('GET', url+"?"+params, true);

  xhr.addEventListener('readystatechange', function(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // Done. Inform the user
      makeDropdown(xhr.responseText);
      // $("#ODDDH_SearchingSpinnerCt").remove();
      // $('#ODDDH_SearchingSpinnerCt').fadeOut(900, function(){ $(this).remove();});
      $('#ODDDH_SearchingSpinnerCt').hide('slow', function(){ $(this).remove(); });
    }
    else if (xhr.readyState == 4 && xhr.status != 200) {
      // Error. Inform the user
    }
  });
  xhr.send();


  // Call back function
  function makeDropdown(responseText){
    // console.log(responseText);
    var options = JSON.parse(responseText);
    var extraParams = {};
    if(!!options.extraParams){
      extraParams = options.extraParams;
      delete options.extraParams;
    }

    for (var code in options) {
      var description = options[code];

      var description2 = description;
      // cocate extra params to description just for show???
      if (ReferenceEntityExtraFieldShowOnDesc == 1) {
        description2 = description +" - "+ extraParams[code];
      } else if(ReferenceEntityExtraFieldShowOnDesc == 2){
        description2 = extraParams[code] +" - " + description;
      } else if(ReferenceEntityExtraFieldShowOnDesc == 3){
        description2 = extraParams[code] +" - " + description;
        description = description2;
      }

      // handle cache
      if(!!!ZERP.ODDDH.populateCache[rAttributeName]){
        ZERP.ODDDH.populateCache[rAttributeName] = {};
        ZERP.ODDDH.populateCache[rAttributeName][code] = description;
      } else {
        ZERP.ODDDH.populateCache[rAttributeName][code] = description;
      }
      // console.log(ZERP.ODDDH.populateCache[rAttributeName]);

      /*create a DIV element for each matching element:*/
      b = document.createElement("DIV");
      /*make the matching letters bold:*/
      b.innerHTML = description2;
      b.setAttribute('fieldname', rAttributeName);
      /*insert a input field that will hold the current array item's value:*/
      b.innerHTML += "<input type='hidden' value='" + code + "'>";

      b.innerHTML += "<span class='code' style='display:none;'>"+code+"</span>";
      b.innerHTML += "<span class='description' style='display:none;'>"+description+"</span>";
      b.innerHTML += "<span class='extraParams' style='display:none;'>"+description+"</span>";

      b.style.cssText = "padding: 10px; cursor: pointer; background-color: #fff; border-bottom: 1px solid #d4d4d4;font-size: 13px; display: block;";

      /*execute a function when someone clicks on the item value (DIV element):*/
      b.addEventListener("click", function(e) {
        /*insert the value for the autocomplete text field:*/

        var forFieldName = b.getAttribute('fieldname');
        var code = this.getElementsByTagName("input")[0].value;

        // inp.value = val;
        $(inp).val(code);

        if(HtmlType == "odDropdownRefObj"){
          // var textVal = this.textContent
          var code = this.getElementsByClassName('code')[0].textContent
          var description = this.getElementsByClassName('description')[0].textContent
          var extraParams = this.getElementsByClassName('extraParams')[0].textContent

          $(inp).val(description)
          $(inp_code).val(code);
        }


        if(HtmlType == "odDropdownRefObj"){
          if( !(OnChangeCallFunc === false) ){
            $(inp_code).change();
            // ZERP.FrmMgr.handleODDDHFields_onChangeEvent(this);
          }
        } else {
          if( !(OnChangeCallFunc === false) ){
            // inp.onchange();
            $(inp).change();
          }
        }

        
        // var event = new Event('change');
        // inp.dispatchEvent(event);
        // inp.focus();
        $(inp).focus();
        ZERP.Entity.Utils.decodeValue2(rAttributeName, code);
        /*close the list of autocompleted values,
        (or any other open lists of autocompleted values:*/
        closeAllLists_Mamun();
      });

      b.addEventListener("mouseover", function( event ) {
        this.style.backgroundColor = '#e9e9e9';
      });
      b.addEventListener("mouseout", function( event ) {
        this.style.backgroundColor = '#fff';
      });
      a.appendChild(b);

    }

  }

  function closeAllLists_Mamun() {
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      x[i].parentNode.removeChild(x[i]);
    }
  }


}


function closeAllOnDemandDropdownListToggle(elmnt) {
  var clickToggleElmnt;
  if(!!ZERP.ODDDH.clickODDDOPToggleElmnt){
    clickToggleElmnt = ZERP.ODDDH.clickODDDOPToggleElmnt;
  } else {
    return;
  }
  
  var nParentNode = elmnt.parentNode;
  var xParentClickToggleElmnt = clickToggleElmnt.parentNode;

  console.log(nParentNode);
  console.log('----');
  console.log(clickToggleElmnt);
  
  if(clickToggleElmnt === nParentNode) return;
  if(xParentClickToggleElmnt === nParentNode) return;

  var x = document.getElementsByClassName("autocomplete-items");
  for (var i = 0; i < x.length; i++) {
    x[i].parentNode.removeChild(x[i]);
  }
}


function closeAllOnDemandDropdownList(elmnt) {
  var clickToggleElmnt;
  if(!!ZERP.FrmMgr.genFrm.clickODDOPElmnt){
    clickToggleElmnt = ZERP.FrmMgr.genFrm.clickODDOPElmnt;
  } else {
    return;
  }

  console.log('----');
  console.log(elmnt);
  
  if(elmnt === clickToggleElmnt) return;
  if(ZERP.ODDDH.IsClickODDOPToggleElmnt == true) return;

  var x = document.getElementsByClassName("autocomplete-items");
  for (var i = 0; i < x.length; i++) {
    x[i].parentNode.removeChild(x[i]);
  }
}





ZERP.ODDDH.makeOnDemandDropdownOptionsAndShow = function(thisPtr, Exrta){
  // console.log(Exrta);

  // Remove all open box
  $('body').find('.autocomplete-items').remove();
  ZERP.FrmMgr.genFrm.clickODDOPElmnt = thisPtr;
  ZERP.ODDDH.IsClickODDOPToggleElmnt = false;

  if(!!Exrta && Exrta == 'Click'){

    var targetInputElmntName = thisPtr.getAttribute('name');
    if(typeof AlreadyOpenODDOptionBox === 'undefined'){
      AlreadyOpenODDOptionBox = true;
      targetODDOInputElmntName = targetInputElmntName;

    } else if(AlreadyOpenODDOptionBox === true && targetODDOInputElmntName == targetInputElmntName){
      AlreadyOpenODDOptionBox = false;
      targetODDOInputElmntName = targetInputElmntName;
      return;

    } else if(AlreadyOpenODDOptionBox === true){
      AlreadyOpenODDOptionBox = true;
      targetODDOInputElmntName = targetInputElmntName;

    } else if(AlreadyOpenODDOptionBox === false){
      AlreadyOpenODDOptionBox = true;
      targetODDOInputElmntName = targetInputElmntName;
      // Open it again
    }
    
  }



	var qVal = $(thisPtr).val();
  var actionElmntType = thisPtr.getAttribute('type');
  var rAttributeName = thisPtr.getAttribute('name');
	console.log('query val...'+qVal);

  var thisAttributeProperties = ZERP.System.EntityStructureObj['Attributes'][rAttributeName];

  var Restrict3Char = false;
  if( thisAttributeProperties.hasOwnProperty('Restrict3Char') ) {
    Restrict3Char =  thisAttributeProperties.Restrict3Char;
  }
  if(Restrict3Char){
    if(qVal == "") return;
    if(qVal != ""){
      if(qVal.length < 3) return;
    }
  }


  var OnChangeCallFunc = false;
  if( thisAttributeProperties.hasOwnProperty('OnChangeCallFunc') ) {
    OnChangeCallFunc =  thisAttributeProperties.OnChangeCallFunc;
  }
  var LookupParameters = '';
  if( thisAttributeProperties.hasOwnProperty('LookupParameters') ) {
    LookupParameters =  thisAttributeProperties.LookupParameters;
  }
  var LinkedAttrs = '';
  if( thisAttributeProperties.hasOwnProperty('LinkedAttrs') ) {
    LinkedAttrs =  thisAttributeProperties.LinkedAttrs;
  }
  var LinkedAttrsRestrict = false;
  if( thisAttributeProperties.hasOwnProperty('LinkedAttrsRestrict') ) {
    LinkedAttrsRestrict =  thisAttributeProperties.LinkedAttrsRestrict;
  }


  var HtmlType = thisAttributeProperties['HtmlType'];
  
  var ReferenceEntityExtraFieldShowOnDesc = 0;
  if( thisAttributeProperties.hasOwnProperty('ReferenceEntityExtraFieldShowOnDesc') ) {
    ReferenceEntityExtraFieldShowOnDesc =  thisAttributeProperties.ReferenceEntityExtraFieldShowOnDesc;
  }

  var DdOptionCtBoxFixWidth = 0;
  if( thisAttributeProperties.hasOwnProperty('DdOptionCtBoxFixWidth') ) {
    DdOptionCtBoxFixWidth =  thisAttributeProperties.DdOptionCtBoxFixWidth;
  }

  var thisElmOffset = $(thisPtr).offset();
  var thisElmTop = thisElmOffset.top;
  var thisElmLeft = thisElmOffset.left;
  var thisElmWidth = $(thisPtr).width();

  var thisElmParentOffset = $(thisPtr).parent().offset();
  var thisElmParentTop = thisElmParentOffset.top;
  var thisElmParentLeft = thisElmParentOffset.left;
  var thisElmParentWidth = $(thisPtr).parent().width();
  if(DdOptionCtBoxFixWidth != 0){
    thisElmParentWidth = DdOptionCtBoxFixWidth;
  }

  // Consider window scrolling
  var doc = document.documentElement;
  var pageYOffset = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
  var pageXOffset = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
  // calculation
  thisElmParentTop = thisElmParentTop - pageYOffset;
  thisElmParentLeft = thisElmParentLeft - pageXOffset;

  var a, b, i, val = thisPtr.value;
  var inp = thisPtr;
  // inp = $(thisPtr).closest('div').find('input[name='+rAttributeName+']');
  var inp_code = $(thisPtr).closest('div').find('input[name='+rAttributeName+'_code]');


  a = document.createElement("DIV");
  a.setAttribute("id", rAttributeName + "-autocomplete-list");
  a.setAttribute("class", "autocomplete-items");
  // a.style.cssText = "position: absolute; border: 1px solid #d4d4d4; border-bottom: none; border-top: none; z-index: 99; top: "+thisElmTop+"px; left: 0; right: 0; overflow: auto; max-height:200px; width:"+ thisElmWidth +"px;  ";
  // a.style.cssText = "position: absolute; border: 1px solid #d4d4d4; border-bottom: none; border-top: none; background: white ; z-index: 99; top: "+xTop+"px; left: "+xLeft+"px; right: 0; overflow: auto; max-height:200px; width:"+ (thisElmWidth+30) +"px;  ";
  a.style.cssText = "position: fixed; border: 1px solid #d4d4d4; border-top: none; background: white ; z-index: 99; top: "+(thisElmParentTop+30)+"px; left: "+thisElmParentLeft+"px; right: 0; overflow: auto; max-height:200px; width:"+thisElmParentWidth+"px;  ";
  /*append the DIV element as a child of the autocomplete container:*/

  var myEle = document.getElementById(thisPtr.id + "-autocomplete-list");
  if(myEle) myEle.remove();
  thisPtr.parentNode.appendChild(a);
  $(thisPtr).parent().css('position', 'relative');
  // alert('Hi i am here...');

  var searchSpan = document.createElement('span');
  searchSpan.innerHTML = 'Searching ....';
  searchSpan.id = "ODDDH_SearchingSpinnerCt";
  searchSpan.innerHTML = 'Searching ....<i class="fas fa-spinner fa-spin"></i>';
  searchSpan.style.cssText = 'display: block;background: gainsboro; padding: 3px;';
  searchSpan.style.fontSize = '13px';

  a.innerHTML = '';
  a.appendChild(searchSpan);


  // Org control params
  var organization = $('.ZERP_EntryCt #organization').val();
  var operatingUnit = $('.ZERP_EntryCt #operatingUnit').val();  
  var organization = $('.ZERP_EntryCt #organization_code').val();
  var operatingUnit = $('.ZERP_EntryCt #operatingUnit_code').val();

  // Call to server for retrieve data ...........................
  var url = ZERP.System.rRequestApiUrl;
  var params = 'rReqType=getOnDemandDropdownResource';
  params += '&rEntityName=OnDemandDropdownResHandling';
  params += '&rResRetrieveEntityName=OnDemandDropdownResHandling';
  params += '&rEventEntityName=' + ZERP.System.rEntityName;
  params += '&rAttributeName=' + rAttributeName;
  params += '&rRunTime=' + ZERP.System.rRunTime;
  params += '&q=' + encodeURIComponent(qVal);
  params += '&rDropdownRes=' + '';
  params += '&rDynamicResource=1';
  params += '&rDataResourceSql=' + '';
  if(!!organization) params += '&organization=' + organization;
  if(!!operatingUnit) params += '&operatingUnit=' + operatingUnit;


  if(LookupParameters != '' && LookupParameters != null){
    var LookupParametersArray = LookupParameters.split(';'); // '||' is not working in grails
    for (var i = 0; i < LookupParametersArray.length; i++) {
      var thisPart =  LookupParametersArray[i];
      var thisPartArray = thisPart.split('=>');
      params += '&'+thisPartArray[0] + '=' + thisPartArray[1];
    }
  }


  var hasLinkedAttrsVal = false;
  if(!!LinkedAttrs && LinkedAttrs.length > 0){
    LinkedAttrsArray = LinkedAttrs.split(';');   // '||' is not working in grails
    for (var i = 0; i < LinkedAttrsArray.length; i++) {
      var thisLinkedAttrs = LinkedAttrsArray[i];
      if(thisLinkedAttrs == '' || thisLinkedAttrs == null) break;
      var thisLinkedAttrsArray = thisLinkedAttrs.split('=>');
      var thisEntityFieldName = thisLinkedAttrsArray[0];
      var thisReferenceEntityFieldName = thisLinkedAttrsArray[1];
      var valXy = $('.ZERP_EntryCt').find('#'+thisEntityFieldName).val();

      var valXy_code = $('.ZERP_EntryCt').find('#'+thisEntityFieldName+"_code").val(); // for handle reference link attribute
      if(!!valXy_code && valXy_code != "") valXy = valXy_code; // for handle reference link attribute

      if(!!valXy && valXy != '' && valXy != null){
        params += '&'+thisReferenceEntityFieldName+ '='+ valXy;
        hasLinkedAttrsVal = true;
      }
    }
  }

  if(LinkedAttrsRestrict && !hasLinkedAttrsVal){
    return;
  }



  var xhr = new XMLHttpRequest();
  xhr.open('GET', url+"?"+params, true);

  xhr.addEventListener('readystatechange', function(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // if(xhr.responseText == '' || xhr.responseText == null) return;
      // Done. Inform the user
      // console.log(xhr.responseText);
      makeDropdown(xhr.responseText);
      // $("#ODDDH_SearchingSpinnerCt").remove();
      // $('#ODDDH_SearchingSpinnerCt').fadeOut(900, function(){ $(this).remove();});
      $('#ODDDH_SearchingSpinnerCt').hide('slow', function(){ $(this).remove(); });
    }
    else if (xhr.readyState == 4 && xhr.status != 200) {
      // Error. Inform the user
    }
  });
  xhr.send();


  // Call back function
  function makeDropdown(responseText){
    // console.log(responseText);
    var options = JSON.parse(responseText);
    var extraParams = {};
    if(!!options.extraParams){
      extraParams = options.extraParams;
      delete options.extraParams;
    }

    for (var code in options) {
      var description = options[code];
      var description2 = description;
      // cocate extra params to description just for show???
      if (ReferenceEntityExtraFieldShowOnDesc == 1) {
        description2 = description +" - "+ extraParams[code];
      } else if(ReferenceEntityExtraFieldShowOnDesc == 2){
        description2 = extraParams[code] +" - " + description;
      } else if(ReferenceEntityExtraFieldShowOnDesc == 3){
        description2 = extraParams[code] +" - " + description;
        description = description2;
      }

      // handle cache
      if(!!!ZERP.ODDDH.populateCache[rAttributeName]){
        ZERP.ODDDH.populateCache[rAttributeName] = {};
      } else {
        ZERP.ODDDH.populateCache[rAttributeName][code] = description;
      }
      // console.log(ZERP.ODDDH.populateCache[rAttributeName]);

      /*create a DIV element for each matching element:*/
      b = document.createElement("DIV");
      /*make the matching letters bold:*/
      if(!!description2){
        b.innerHTML = "<strong>" + description2.toString().substr(0, val.length) + "</strong>";
        b.innerHTML += description2.toString().substr(val.length);
      }
      b.setAttribute('fieldname', rAttributeName);
      /*insert a input field that will hold the current array item's value:*/
      b.innerHTML += "<input type='hidden' value='" + code + "'>";
      
      b.innerHTML += "<span class='code' style='display:none;'>"+code+"</span>";
      b.innerHTML += "<span class='description' style='display:none;'>"+description+"</span>";
      b.innerHTML += "<span class='extraParams' style='display:none;'>"+description+"</span>";

      b.style.cssText = "padding: 10px; cursor: pointer; background-color: #fff; border-bottom: 1px solid #d4d4d4;font-size: 13px; display: block;";

      /*execute a function when someone clicks on the item value (DIV element):*/
      b.addEventListener("click", function(e) {
        /*insert the value for the autocomplete text field:*/
        var val = this.getElementsByTagName("input")[0].value;
        inp.value = val;

        if(HtmlType == "odDropdownRefObj"){
          var textVal = this.textContent
          var forFieldName = b.getAttribute('fieldname');

          var code = this.getElementsByClassName('code')[0].textContent
          var description = this.getElementsByClassName('description')[0].textContent
          var extraParams = this.getElementsByClassName('extraParams')[0].textContent

          $(inp_code).val(code);
          $(inp).val(description)
          // inp_code.value = val;
        }

        // document.getElementById("elementID").onchange();
        if(HtmlType == "odDropdownRefObj"){
          if( !(OnChangeCallFunc === false) ){
            $(inp_code).change();
            // ZERP.FrmMgr.handleODDDHFields_onChangeEvent(this);
          }
        } else {
          if( !(OnChangeCallFunc === false) ){
            inp.onchange();
          }
        }

        
        // var event = new Event('change');
        // inp.dispatchEvent(event);

        inp.focus();
        ZERP.Entity.Utils.decodeValue2(rAttributeName, val);
        /*close the list of autocompleted values,
        (or any other open lists of autocompleted values:*/
        closeAllLists_Mamun();
      });

      b.addEventListener("mouseover", function( event ) {
        this.style.backgroundColor = '#e9e9e9';
      });
      b.addEventListener("mouseout", function( event ) {
        this.style.backgroundColor = '#fff';
      });
      a.appendChild(b);

    }

  }

  function closeAllLists_Mamun() {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      x[i].parentNode.removeChild(x[i]);
    }
  }


}





///////////////////// Global Window Function   /////////////////////////////////////////
/*execute a function when someone clicks in the document:*/
document.addEventListener("click", function (e) {
  closeAllOnDemandDropdownListToggle(e.target);
  closeAllOnDemandDropdownList(e.target);
});
///////////////////////////////////////////////////////////////////////////////////////









ZERP.ODDDH.hideComboboxOptions = function(attributeName){
  var comboboxElCnt_id = '#'+ ZERP.ODDDH.CmbxOptionsCntId;
  $(comboboxElCnt_id).remove();
}


ZERP.ODDDH.initComboboxArrowNavigation = function(thisPtr, keyCode){
  // Note
  // In normal GenList it will not work
  // Gen Form and HL form it will work

  var attributeName = thisPtr.getAttribute('name');
  var thisAttributeProperties = ZERP.System.EntityStructureObj['Attributes'][attributeName];
  var HtmlType = thisAttributeProperties['HtmlType'];

  var OnChangeCallFunc = false;
  if( thisAttributeProperties.hasOwnProperty('OnChangeCallFunc') ) {
    OnChangeCallFunc =  true;
  }


  // headerItemForSearch-autocomplete-list
  var comboboxElCnt_id = attributeName + "-autocomplete-list";
  ZERP.ODDDH.CmbxOptionsCntId = comboboxElCnt_id;

  if ( keyCode == 40 ) {

      var curr = $("#"+comboboxElCnt_id + '').find('.current:visible');

      if(curr.length){
        $(curr).removeClass('current');
        $(curr).css('background-color', '');
        $(curr).next(':visible').addClass('current');
        $(curr).next(':visible').css('background-color', 'skyblue');

      } else {
        // $("#"+comboboxElCnt_id + ' div:visible:first-child').addClass('current');
        // $(comboboxElCnt_id + ' div:visible:first-child').css('background-color', 'skyblue');
        $("#"+comboboxElCnt_id).find('div').eq(0).css('background-color', 'skyblue');
        $("#"+comboboxElCnt_id).find('div').eq(0).addClass('current');
      }

  } else if( keyCode == 38 ){

      var curr = $("#"+comboboxElCnt_id + '').find('.current:visible');
      if(curr.length){
        $(curr).removeClass('current');
        $(curr).css('background-color', '');
        $(curr).prev().addClass('current');
        $(curr).prev().css('background-color', 'skyblue');

      } else {
        // $("#"+comboboxElCnt_id + ' div div:visible:last-child').addClass('current');
        // $("#"+comboboxElCnt_id + ' div div:visible:last-child').css('background-color', 'skyblue');    
        $("#"+comboboxElCnt_id).find('div').last().css('background-color', 'skyblue');
        $("#"+comboboxElCnt_id).find('div').last().addClass('current');
      }

    } else if( keyCode == 13 ){

      // var chosenOptionCode = $(combobox_id + ' div').find('.current').find('span.code').text();
      // var chosenOptionDesc = $(combobox_id + ' div').find('.current').find('span.description').text();
      // $(ZERP.Utils.ActiveComboboxPtr).closest('div.ComboboxContainer').find('input[type=hidden]').val(chosenOptionCode);
      // $(ZERP.Utils.ActiveComboboxPtr).closest('div.ComboboxContainer').find('input[type=text]').val(chosenOptionDesc);
      // ZERP.Utils.hideComboboxOptions();

      var chosenOptionCode = $("#"+comboboxElCnt_id + '').find('.current').find('input').val();
      var chosenOptionDesc = $("#"+comboboxElCnt_id + '').find('.current').find('span.description').text();

      if(HtmlType == "odDropdownRefObj"){
	      $(thisPtr).val(chosenOptionDesc);
	      $(thisPtr).next('input[type=hidden]').val(chosenOptionCode);
	      ZERP.ODDDH.hideComboboxOptions();
	      if(OnChangeCallFunc){
	        $(thisPtr).next('input[type=hidden]').change();
	      }
	      ZERP.Entity.Utils.decodeValue2(attributeName, chosenOptionCode);
      } else {
	      $(thisPtr).val(chosenOptionCode);
	      ZERP.ODDDH.hideComboboxOptions();
	      if(OnChangeCallFunc){
	        $(thisPtr).change();
	      }
      }


    }


}




/**
 * Init action event
 */
ZERP.FrmMgr.genFrm.initOnDemandDataDropdownHandling = function(){
  // alert('Hi i am here');
  // stop auto complete
  $('.ZERP_EntryCt').find('input[type=text]').attr('autocomplete', 'off'); // not working
  // $('.ZERP_EntryCt').find('input[type=text]').attr('autocomplete', 'nope');
  /*let r = Math.random().toString(36).substring(7);
  $('.ZERP_EntryCt').find('input[type=text]').attr('autocomplete', r);*/
	
	// 1. Add Required Identity Class
  var EntityAttributes = ZERP.System.EntityStructureObj['Attributes'];
  for (var key in EntityAttributes) {
  	if (EntityAttributes.hasOwnProperty(key)){
  		var thisAttributeProperties = EntityAttributes[key];
  		if(!!thisAttributeProperties.HtmlType && (thisAttributeProperties.HtmlType == 'odDropdown2' || thisAttributeProperties.HtmlType == 'odDropdownRefObj')){
      	$('.ZERP_EntryCt #' + key).addClass('OnDmdDropdown2');
  		}
  	}
  }

  //2. init Action Event
  $('.ZERP_EntryCt .OnDmdDropdown2').off('click').on('click', function(event){
		event.preventDefault();
		event.stopPropagation();
		var thisPtr = this;
		ZERP.ODDDH.makeOnDemandDropdownOptionsAndShow(thisPtr, 'Click');
    ZERP.FrmMgr.genFrm.renderReferenceEntityAddonButton(thisPtr); // @Al-Mamun@2020-01-01
  });

  $('.ZERP_EntryCt .OnDmdDropdown2').off('keyup').on('keyup',function(e){
		// Make sure to stop event bubbling
		e.preventDefault();
		e.stopPropagation();
		var thisPtr = this;
    var thisVal = $(this).val();
    // make empty for hidden field if user make empty this field
    // if(thisVal == '') $(this).next('input[type=hidden]').val(''); // for text field
    if(thisVal == '') $(this).next('input[forAttribute='+$(this).attr('name')+']').val(0); // for integer field
    if(thisVal == '') $(this).next('input[forAttribute='+$(this).attr('name')+']').val(''); // for text field

    if (e.keyCode == 40) { // ArrowDown
      ZERP.ODDDH.initComboboxArrowNavigation(thisPtr, e.keyCode);
      return;
    } else if (e.keyCode == 38) { // ArrowUp
      ZERP.ODDDH.initComboboxArrowNavigation(thisPtr, e.keyCode);
      return;
		} else if (e.keyCode == 13) { // Enter
      ZERP.ODDDH.initComboboxArrowNavigation(thisPtr, e.keyCode);
      return;
    }
		ZERP.ODDDH.makeOnDemandDropdownOptionsAndShow(thisPtr);

  });


}





ZERP.SFHL.initLineOnDemandDataDropdownHandling = function(){
  // 1. Add Required Identity Class
  var EntityAttributes = ZERP.System.EntityStructureObj['Attributes'];
  for (var key in EntityAttributes) {
    if (EntityAttributes.hasOwnProperty(key)){
      var thisAttributeProperties = EntityAttributes[key];
      if(!!thisAttributeProperties.HtmlType && ( thisAttributeProperties.HtmlType == 'odDropdown2' ||  thisAttributeProperties.HtmlType == 'odDropdownRefObj' ) ){
        $('#listTable #' + key).addClass('OnDmdDropdown2');
      }
    }
  }

  //2. init Action Event
  $('#listTable .OnDmdDropdown2').off('click').on('click', function(event){
    // alert('Hi...');
    event.preventDefault();
    event.stopPropagation();
    var thisPtr = this;
    ZERP.ODDDH.makeOnDemandDropdownOptionsAndShow(thisPtr, 'Click');

  });

  $('#listTable .OnDmdDropdown2').off('keyup').on('keyup',function(e){
    // Make sure to stop event bubbling
    e.preventDefault();
    e.stopPropagation();
    var thisPtr = this;
    var thisVal = $(this).val();
    // make empty for hidden field if user make empty this field
    // if(thisVal == '') $(this).next('input[type=hidden]').val(''); // for text field
    if(thisVal == '') $(this).next('input[forAttribute='+$(this).attr('name')+']').val(0); // for integer field
    if(thisVal == '') $(this).next('input[forAttribute='+$(this).attr('name')+']').val(''); // for text field

    if (e.keyCode == 40) { // ArrowDown
      ZERP.ODDDH.initComboboxArrowNavigation(thisPtr, e.keyCode);
      return;
    } else if (e.keyCode == 38) { // ArrowUp
      ZERP.ODDDH.initComboboxArrowNavigation(thisPtr, e.keyCode);
      return;
    } else if (e.keyCode == 13) { // Enter
      ZERP.ODDDH.initComboboxArrowNavigation(thisPtr, e.keyCode);
      return;
    }
    ZERP.ODDDH.makeOnDemandDropdownOptionsAndShow(thisPtr);

  });
  
}



/*ListMgr.initLineOnDemandDataDropdownHandling = function(){
  // 1. Add Required Identity Class
  var EntityAttributes = ZERP.System.EntityStructureObj['Attributes'];
  for (var key in EntityAttributes) {
    if (EntityAttributes.hasOwnProperty(key)){
      var thisAttributeProperties = EntityAttributes[key];
      if(!!thisAttributeProperties.HtmlType && ( thisAttributeProperties.HtmlType == 'odDropdown2' ||  thisAttributeProperties.HtmlType == 'odDropdownRefObj' ) ){
        $('#listTable #' + key).addClass('OnDmdDropdown2');
      }
    }
  }

  //2. init Action Event
  $('#listTable .OnDmdDropdown2').off('click').on('click', function(event){
    // alert('Hi...');
    event.preventDefault();
    event.stopPropagation();
    var thisPtr = this;
    ZERP.ODDDH.makeOnDemandDropdownOptionsAndShow(thisPtr, 'Click');

  });

  $('#listTable .OnDmdDropdown2').off('keyup').on('keyup',function(e){
    // Make sure to stop event bubbling
    e.preventDefault();
    e.stopPropagation();
    var thisPtr = this;
    if (e.keyCode == 40) {
    }
    ZERP.ODDDH.makeOnDemandDropdownOptionsAndShow(thisPtr);

  });
  
}*/



ZERP.FrmMgr.handleODDDHFields_onChangeEvent = function(thisPtr){
    // alert("Hi.....");
}
