// Generic utilities.
// MyApp.Utils = {};

// Namespace Naming Guidelines
// CompanyName.TechnologyName[.Feature][.Design]
// For example:
// Microsoft.Media
// Microsoft.Media.Design
// System.Web.UI
// System.Web.UI.Design

// Some popular namespace
// <Company>.(<Product>|<Technology>)[.<Feature>][.<Subnamespace>]
// System.Windows*
// System.Web.UI
// System.IO
// System.Net
// (<Company>.<Technology>*), such as Microsoft.Build.Utilities and Microsoft.Build.Tasks. It 

// ZERP NameSpace
var ZERP = ZERP || {};

ZERP.Utils = ZERP.Utils || {};
ZERP.Entity = ZERP.Entity || {};
ZERP.FileMgr = ZERP.FileMgr || {};

ZERP.Entity.Utils = ZERP.Entity.Utils || {};
ZERP.Entity.FrmMgr = ZERP.Entity.FrmMgr || {};
ZERP.Entity.LstMgr = ZERP.Entity.LstMgr || {};

ZERP.Entity.FrmMgr.GenForm = ZERP.Entity.FrmMgr.GenForm || {};
ZERP.Entity.FrmMgr.PlnForm = ZERP.Entity.FrmMgr.PlnForm || {};
ZERP.Entity.LstMgr.GenList = ZERP.Entity.LstMgr.GenList || {};



ZERP.Utils.HTML_button = function(button, properties, attributeName){
  var buttons = {};
  
  var lookupSession = (!!properties.lookupSession) ? properties.lookupSession : '';
  var ReferenceEntityThisFieldName = (!!properties.ReferenceEntityThisFieldName) ? properties.ReferenceEntityThisFieldName : '';
  var ReferenceEntity = (!!properties.ReferenceEntity) ? properties.ReferenceEntity : '';
  var ReferenceEntityName = (!!properties.ReferenceEntityName) ? properties.ReferenceEntityName : '';

  var LookupParameters = (!!properties.LookupParameters) ? properties.LookupParameters : '';
  var LinkedAttrs = (!!properties.LinkedAttrs) ? properties.LinkedAttrs : '';


  var DirectREPath = (!!properties.DirectREPath) ? properties.DirectREPath : '';
  var ReferenceEntityPkgPath = (!!properties.ReferenceEntityPkgPath) ? properties.ReferenceEntityPkgPath : '';
  var ReferenceEntityThisFieldName = (!!properties.ReferenceEntityThisFieldName) ? properties.ReferenceEntityThisFieldName : '';
  
  buttons['btnSaveForm'] = '<input type="button" class="btnEditMode btnSaveForm btn-blue" value="Save (CTRL+S)" title="Save the current document" style="display:none;"/>';
  // button dropdown toggle
  buttons['btnDropdownOption'] = '<button type="button" class="btnEditMode btnDropdownOption btnDropdownToggle" title="Click this for look up data" style="" onclick="ZERP.ODDDH.makeOnDemandDropdownOptionsAndShow_ToggleButton(this);" forAttribute="'+attributeName+'" ><i class="fa fa-fw fa-angle-double-down"></i></button>';
  // button lookup --- search icon
  buttons['btnLookup'] = '<button type="button" class="btnEditMode btnLookup" title="Click this for look up data" style="" onclick="POPLIST.handleLookup(this);" forAttribute="'+attributeName+'" ><i class="material-icons">search</i></button>';
  // button reference --- plus icon for search reference entity
  buttons['btnReference'] = '<button type="button" class="btnEditMode btnReference" title="Click this for look up data" style="" onclick="ZERP.FrmMgr.genFrm.handleReferenceEntity(this);" forAttribute="'+attributeName+'"  ><i class="fa fa-fw fa-plus"></i></button>';

  var thisButton = buttons[button];
  return thisButton;
}


/**
 * [genericHtmlInputFieldMaker description]
 * @param  {[type]} fieldname     [description]
 * @param  {[type]} fieldvalue    [description]
 * @param  {[type]} fieldpropties [description]
 * @return {[type]}               [description]
 */
ZERP.Utils.genericHtmlInputFieldMaker = function(fieldname, fieldvalue, fieldpropties){
  var returnInputTag = '';
  var attributeName = fieldname;


  var fieldvalue   = (!!fieldvalue && fieldvalue != '') ? fieldvalue : '';
  var fielddesc     = (!!fieldpropties.fielddesc ) ? fieldpropties.fielddesc : fieldname; 
  

  var ReadOnly = '';
  if(!!fieldpropties.ReadOnly ){
    ReadOnly = fieldpropties.ReadOnly; 
    if (ReadOnly == 'AlwaysReadOnly'){
      ReadOnly = ' readonly=readonly disabled=disabled ';
    } else if(true){

    }
  }

  var required = '';
  if(!!fieldpropties.MandatoryInUI && fieldpropties.MandatoryInUI == true){
    required = ' required="required" ';
  }


  var ReferenceAttribute = 0;
  var ReferenceEntityValidationFnc = '';
  var ReferenceAttributeClass = '';
  if(fieldpropties.hasOwnProperty('Reference') && (fieldpropties.hasOwnProperty('ReferenceEntityValidation') && fieldpropties.ReferenceEntityValidation ) ){
    ReferenceAttribute = 1;
    ReferenceEntityValidationFnc = 'onblur="ZERP.Entity.Utils.validateUserValue(this);"';
    ReferenceAttributeClass = 'ReferenceAttribute';
  }

  // Style
  var style = ' style="';
  var HTMLSize = 160;
  var HTMLHeight = '';

  var styleCharwidth = ' width:'+HTMLSize+'px; '; // default
  if(!!fieldpropties.HTMLSize && fieldpropties.HTMLSize != ''){
    HTMLSize = fieldpropties.HTMLSize;
    styleCharwidth = ' width:' + fieldpropties.HTMLSize + 'px; max-width:' + fieldpropties.HTMLSize + 'px; ';
  }
  style += styleCharwidth;

  var styleCharHeight = '';
  if(!!fieldpropties.HTMLHeight && fieldpropties.HTMLHeight != ''){
    styleCharHeight = ' height:' + fieldpropties.HTMLHeight + 'px; ';
  }
  style += styleCharHeight;

  var comboboxFieldDivWidth = Number(HTMLSize) + 0;
  var comboboxFieldLeftWidth = Number(HTMLSize) - 25;
  

  style += '"';

  // On Change function
  var OnChangeCallFunc = '';
  if(fieldpropties.hasOwnProperty('OnChangeCallFunc')){
    OnChangeCallFunc = ' onchange=' + fieldpropties.OnChangeCallFunc + ' ';
  }
  // On Change function body
  var OnChangeCallFuncBody = '';
  if(fieldpropties.hasOwnProperty('OnChangeCallFuncBody')){
    OnChangeCallFuncBody = ' <script>' + fieldpropties.OnChangeCallFuncBody + '</script> ';
  }


  // On blur function
  var OnBlurCallFunc = '';
  if(fieldpropties.hasOwnProperty('OnBlurCallFunc')){
    OnBlurCallFunc = ' onblur=' + fieldpropties.OnBlurCallFunc + ' ';
  }
  // On blur function
  var OnKeyCallFunc = '';
  if(fieldpropties.hasOwnProperty('OnKeyCallFunc')){
    OnKeyCallFunc = ' ' + fieldpropties.OnKeyCallFunc + ' ';
  }
  // On click function
  var OnClickCallFunc = '';
  if(fieldpropties.hasOwnProperty('OnClickCallFunc')){
    OnClickCallFunc = ' ' + fieldpropties.OnClickCallFunc + ' ';
  }

  // Entity Code Attribute
  var EntityCodeAttributeClass = '';
  if(fieldpropties.hasOwnProperty('CapitalCodeAttribute') && fieldpropties.CapitalCodeAttribute === true){
    EntityCodeAttributeClass = ' CapitalCodeAttribute ';
  }

  // Attribute Length
  var AttributeLength = '';
  if(fieldpropties.hasOwnProperty('CharLength') && fieldpropties.CharLength != ''){
    AttributeLength = ' maxlength="'+fieldpropties.CharLength+'" ';
  }  

  // Group checkbox
  var CheckboxGroupName = '';
  if(fieldpropties.hasOwnProperty('GroupChekbox') && fieldpropties.GroupChekbox != ''){
    CheckboxGroupName = ' CheckboxGroupName="'+fieldpropties.CheckboxGroupName+'" ';
  }
  if(fieldpropties.hasOwnProperty('GroupCheckbox') && fieldpropties.GroupCheckbox != ''){
    CheckboxGroupName = ' CheckboxGroupName="'+fieldpropties.CheckboxGroupName+'" ';
  }


  var fielddesc     = (!!fieldpropties.fielddesc ) ? fieldpropties.fielddesc : fieldname; 

  if(!!fieldpropties.HtmlType && fieldpropties.HtmlType == 'date'){
    returnInputTag += '<input type="text" name="'+fieldname+'" value="'+fieldvalue+'" class="datepicker" id="'+attributeName+'" ' + ReadOnly + style +'  />';
  
  } else if(!!fieldpropties.HtmlType && fieldpropties.HtmlType == 'dateMEF7'){
    returnInputTag += '<input type="text" name="'+fieldname+'" value="'+fieldvalue+'" class="dateMEF7" id="'+attributeName+'" ' + OnChangeCallFunc + OnBlurCallFunc + OnClickCallFunc + OnKeyCallFunc + ReadOnly + style +'  />';
    returnInputTag += '<label onclick="jsClient.toggleDateFieldBindAction(this);" forAttribute="'+fieldname+'" class="'+fieldname+'_dateMEF7 dateMEF7" style="position:absolute;width: 20px;top: 5px; right: 0px; font-size: small; font-weight: 600; cursor: pointer;"><i class="far fa-calendar-alt"></i></label>';

  } else if(!!fieldpropties.HtmlType && fieldpropties.HtmlType == 'time'){
    returnInputTag += '<input type="text" name="'+fieldname+'" value="'+fieldvalue+'" class="timepicker" id="'+attributeName+'" '+ReadOnly + style +' />';
  
  } else if(!!fieldpropties.HtmlType && fieldpropties.HtmlType == 'datetime'){
    returnInputTag += '<input type="text" name="'+fieldname+'" value="'+fieldvalue+'" class="datetimepicker" id="'+attributeName+'" '+ReadOnly + style +' />';
  
  } else if(!!fieldpropties.HtmlType && fieldpropties.HtmlType == 'select'){
    var options = ZERP.Utils.genereicDropdownOptionsMaker(fieldname,fieldvalue,fieldpropties);
    returnInputTag += '<select name="'+fieldname+'" class="" id="'+attributeName+'" '+ReadOnly + required + style + OnChangeCallFunc + '>' + options + '</select>';
  
  } else if(!!fieldpropties.HtmlType && fieldpropties.HtmlType == 'mselect'){
    var options = ZERP.Utils.genereicDropdownOptionsMaker(fieldname,fieldvalue,fieldpropties);
    returnInputTag += '<select name="'+fieldname+'" class="" id="'+attributeName+'" multiple="multiple" '+ReadOnly + required + style + OnChangeCallFunc + '>' + options + '</select>';
  
  } else if(!!fieldpropties.HtmlType && fieldpropties.HtmlType == 'textarea'){
    returnInputTag += '<textarea name="'+attributeName+'" id="'+attributeName+'" '+style+' '+OnKeyCallFunc + OnClickCallFunc + OnBlurCallFunc +' ></textarea>';
  
  } else if(!!fieldpropties.HtmlType && fieldpropties.HtmlType == 'select'){
    var options = ZERP.Utils.genereicDropdownOptionsMaker(fieldname,fieldvalue,fieldpropties);
    returnInputTag += '<select name="'+fieldname+'" class="select2" id="'+attributeName+'" '+ReadOnly+' >'+ options +'</select>';
  
  } else if(!!fieldpropties.HtmlType && fieldpropties.HtmlType == 'checkbox'){
    returnInputTag += '<input type="checkbox" name="'+fieldname+'" id="'+attributeName+'" class="checkbox"  value="" '+ReadOnly + required + CheckboxGroupName +' >';
  
  } else if(!!fieldpropties.HtmlType && fieldpropties.HtmlType == 'number'){
    returnInputTag += '<input type="number" name="'+fieldname+'" step="1" value="'+fieldvalue+'" class="number-val" id="'+attributeName+'" '+ReadOnly+ style + OnChangeCallFunc + OnKeyCallFunc +' />';
  
  } else if(!!fieldpropties.HtmlType && fieldpropties.HtmlType == 'number2'){
    returnInputTag += '<input type="text" name="'+fieldname+'" step="1" value="'+fieldvalue+'" class="number-val" id="'+attributeName+'" onkeypress="jsClient.validateNumberValue(event, this)" '+ReadOnly+ style + OnChangeCallFunc + OnKeyCallFunc +' />';
    
  } else if(!!fieldpropties.HtmlType && fieldpropties.HtmlType == 'integer'){
    returnInputTag += '<input type="number" name="'+fieldname+'" step="1" value="'+fieldvalue+'" class="integer-val" id="'+attributeName+'" '+ReadOnly + style + OnChangeCallFunc + OnKeyCallFunc +' />';
  
  } else if(!!fieldpropties.HtmlType && fieldpropties.HtmlType == 'pInteger'){
    returnInputTag += '<input type="text" name="'+fieldname+'" value="'+fieldvalue+'" class="pinteger-val" id="'+attributeName+'"   onkeypress="jsClient.validatePositiveIntegerValue(event, this)"   '+ReadOnly + style + OnChangeCallFunc + OnKeyCallFunc +' />';
  
  } else if(!!fieldpropties.HtmlType && fieldpropties.HtmlType == 'odDropdownRefObj'){
    returnInputTag += '<input type="text" name="'+fieldname+'" value="'+fieldvalue+'" id="'+attributeName+'" '+ReadOnly + style +' />';
    returnInputTag += '<input type="hidden" forAttribute="'+fieldname+'"  name="'+fieldname+'_code" value="'+fieldvalue+'" id="'+attributeName+'_code" '+ReadOnly + OnChangeCallFunc + OnKeyCallFunc + style +' />';

  } else if(!!fieldpropties.HtmlType && fieldpropties.HtmlType == 'combobox'){
    var options = ZERP.Utils.makeSearchableComboboxAndAppendInBody(fieldname,fieldvalue,fieldpropties);

    returnInputTag = '<div class="ComboboxContainer" style="position:relative; width:'+comboboxFieldDivWidth+'px ">';
    // returnInputTag = '<div class="ComboboxContainer" style="position:relative; border:1px solid red; height:50px; width:'+comboboxFieldDivWidth+'px ">';
    // returnInputTag = '<div class="ComboboxContainer" style="position:relative; width:195px">';
    // returnInputTag += '<div style="position:absolute; float:left; ">';
    returnInputTag += '<div style="position:relative; float:left; ">';
    returnInputTag += '<input type="hidden"  name="'+ attributeName +'" class="'+ attributeName +'" id="'+attributeName+'" />';
    returnInputTag += '<input type="text" '+ style +' class="'+ attributeName +'" id="'+attributeName+'" cmbxOptionsCntId="frm_combobox_'+attributeName+'" onkeyup="ZERP.Utils.handleThisComboxSearch(this);" />';
    returnInputTag += '</div>';
    returnInputTag += '<div role="button" forAttribute="'+attributeName+'" cmbxOptionsCntId="frm_combobox_'+attributeName+'" class="dropdownlistArrowZERPComboBox" style="float:right; position:absolute; left:'+comboboxFieldLeftWidth+'px; border: 1px solid gray; cursor: pointer;" onclick="ZERP.Utils.showHideComboboxOptions(this);" ><div><i class="material-icons">keyboard_arrow_down</i></div></div>';
    // returnInputTag += '<div role="button" forAttribute="'+attributeName+'" cmbxOptionsCntId="frm_combobox_'+attributeName+'" class="dropdownlistArrowZERPComboBox" style="float:right; position:absolute; left:170px; border: 1px solid gray; height: 22px; cursor: pointer;" onclick="ZERP.Utils.showHideComboboxOptions(this);" ><div><i class="material-icons">keyboard_arrow_down</i></div></div>';
    returnInputTag += '</div>';

  } else if(!!fieldpropties.HtmlType && fieldpropties.HtmlType == 'file2'){

    var OnChangeFileHandleFunc = 'onchange="ZERP.FileClient.onChangeHandleSingleFile(this);"';
    if(fieldpropties.hasOwnProperty('MultipleFile') && fieldpropties['MultipleFile'] == true){
      OnChangeFileHandleFunc = 'onchange="ZERP.FileClient.onChangeHandleMultipleFile(this);"';
    }

    returnInputTag += '<div class="div-mother">';
      returnInputTag += '<div class="item-details-image text-left" style="display:block;">';
        // returnInputTag += '<img src="..." class="img-thumbnail" alt="...">';
        returnInputTag += '<img forAttribute="'+attributeName+'" data-src="holder.js/200x200" class="img-thumbnail" alt="200x200" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22200%22%20height%3D%22200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20200%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16a86b7f866%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16a86b7f866%22%3E%3Crect%20width%3D%22200%22%20height%3D%22200%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2274.4296875%22%20y%3D%22104.5%22%3E150x100%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" data-holder-rendered="true" style="width: 150px; height: 100px;">';
      returnInputTag += '</div>';

      returnInputTag += '<div class="file-list-container">';
      returnInputTag += '</div>';

      returnInputTag += '<div class="custom-file" style="width:200px;">';
        returnInputTag += '<input type="file" class="custom-file-input form-control-sm" id="customFile" '+OnChangeFileHandleFunc+' forAttribute="'+attributeName+'" >';
        returnInputTag += '<label class="custom-file-label col-form-label-sm" for="customFile" >Choose file</label>';
      returnInputTag += '</div>';

      returnInputTag += '<div class="d-none mt-1 pl-1"><label class="d-inline-block">File size:</label> <span class="file-size-container"></span></div>';
    returnInputTag += '</div>';

  
  } else if(!!fieldpropties.HtmlType && fieldpropties.HtmlType == 'percentageField'){
    returnInputTag += '<input type="text" name="'+fieldname+'" step="1" value="'+fieldvalue+'" class="number-val" id="'+attributeName+'" onkeypress="jsClient.validateNumberValue(event, this)" '+ReadOnly+ style + OnChangeCallFunc + OnKeyCallFunc +' />';
    returnInputTag += '<label class="'+fieldname+'_percentageLabel" style="position:absolute;width: 20px;top: 5px; right: 0px; font-size: small; font-weight: 600;">%</label>';

  } else if(!!fieldpropties.HtmlType && fieldpropties.HtmlType == 'percentage_currencyField'){
    
  } else if(!!fieldpropties.HtmlType && fieldpropties.HtmlType == 'button7'){
    returnInputTag += '<button type="button" id="'+fieldpropties.buttonID+'" class="btn btn-outline-info btn-sm button7" ' +OnClickCallFunc+ ' >'+fieldpropties.buttonText+'</button>';

  } else if(!!fieldpropties.HtmlType && fieldpropties.HtmlType == 'smpNumber'){
    returnInputTag += '<input type="text" onkeypress="jsClient.validateNumberValue(event, this)" '+style+' name="'+fieldname+'" value="'+fieldvalue+'" class="smp-number-val"  '+AttributeLength+'  id="'+attributeName+'"   '+ReferenceEntityValidationFnc + OnChangeCallFunc + OnBlurCallFunc + OnClickCallFunc + OnKeyCallFunc +'  '+ReadOnly + required +  ' />';
  
  }  else {
    // console.log('I am simple....' + fieldname);
    returnInputTag += '<input type="text" '+style+' name="'+fieldname+'" value="'+fieldvalue+'" class="'+ReferenceAttributeClass + EntityCodeAttributeClass +'"  '+AttributeLength+'  id="'+attributeName+'"   '+ReferenceEntityValidationFnc + OnChangeCallFunc + OnBlurCallFunc + OnClickCallFunc + OnKeyCallFunc +'  '+ReadOnly + required +  ' />';
  }
  returnInputTag += OnChangeCallFuncBody;
  return returnInputTag;

}


ZERP.Utils.genereicDropdownOptionsMaker = function(fieldname, defaultval, fieldproperties) {
  if( !!!fieldproperties.DataSource && !!!fieldproperties.data ) return;

  var options = '<option value="">Select</option>';
  if(!!fieldproperties.data){
    var objectLength = Object.keys(fieldproperties.data).length;
    if(objectLength > 0){
      var setasdefault = 'selected';
      $.each(fieldproperties.data, function(index, value) {
        setasdefault = (!!defaultval && (value == defaultval || index == defaultval)) ? 'selected' : '';
        options += '<option value="' + index + '" '+ setasdefault +'>' + value + '</option>';
      });
      return options;
    }

  }


  // // Check cache 
  // if(!!fieldproperties.library){
  //   if(ZERP.populateLibCache[fieldproperties.library]){
  //     var cacheData = ZERP.populateLibCache[fieldproperties.library];
  //     var setasdefault = 'selected';
  //     $.each(cacheData, function(index, value) {
  //       setasdefault = (!!defaultval && (value == defaultval || index == defaultval)) ? 'selected' : '';
  //       options += '<option value="' + index + '" '+ setasdefault +'>' + value + '</option>';
  //     });
  //     return options;
  //   }
  // }

  // // prepare ajax retquest to take data from server
  // var baseStructure = JSON.parse( ZERP._baseStructure );
  // var _URL_MODULEDIR = baseStructure['_URL_MODULEDIR'];

  // var url_pathname  = window.location.pathname;
  // var url_pathnames = url_pathname.split('/');
  // var maindir = url_pathnames[1];

  // // var xurl = ( fieldproperties.hasOwnProperty('syslib') ) ? _URL_MODULEDIR + '/api/sys_library_api.php' : _URL_MODULEDIR + '/api/pdm_library_api.php';
  // var xurl = ( fieldproperties.hasOwnProperty('syslib') ) ? '/'+maindir+'/api/sys_library_api.php' : '/'+maindir+'/api/pdm_library_api.php';

  // if(fieldproperties.hasOwnProperty('library')){
  //   var libraryname = fieldproperties['library'];
  //   var xsearchParams = {};
  //   xsearchParams.library = libraryname;
  //   if(fieldproperties.hasOwnProperty('onlydesc')) xsearchParams.onlydesc = true;

  //   $.ajax({
  //     async :   false,
  //     type  :   'GET',
  //     url   :   xurl,
  //     data  :   xsearchParams,
  //     success :   function(data){
  //       var data = JSON.parse(data);
  //       var setasdefault = 'selected';
  //       $.each(data, function(index, value) {
  //         setasdefault = (!!defaultval && (value == defaultval || index == defaultval)) ? 'selected' : '';
  //         if (!!showkeys && showkeys === true && index != value) {
  //           options += '<option value="' + v + '">' + v + '</option>';
  //         } else {
  //           options += '<option value="' + index + '" '+ setasdefault +'>' + value + '</option>';
  //         }
  //       });
  //       return options;
  //     },
  //     error :   function(){
  //       alert("error");
  //       return;
  //     }
  //   });

  //   return options;

  // }


}



ZERP.Utils.makeSearchableComboboxAndAppendInBody = function(attributeName, attributeValue, thisAttributeProperties){
    if( !!!thisAttributeProperties.datasource && !!!thisAttributeProperties.data ) return;

    var CmbxOptionsCntId  = 'frm_combobox_'+ attributeName;
    $('body').find('#'+CmbxOptionsCntId).remove();

    var thisCombobox = '<div role="select" id="'+ CmbxOptionsCntId +'" style="display:none;">'
    thisCombobox += '<div style="outline: none 0px; overflow: hidden; position: relative; min-height: 40px;">';
    var options = '';
    if(!!thisAttributeProperties.data){
      var objectLength = Object.keys(thisAttributeProperties.data).length;
      if(objectLength > 0){
        $.each(thisAttributeProperties.data, function(index, value) {
          // options += '<option value="' + index > + value + '</option>';
          options += '<div role="option" forattribute="'+attributeName+'" id="listitem0innerListBoxZERPWidget" class="zerp-listitem-element" onclick="ZERP.Utils.setChosenOptionElement(this);" ><span class="code" style="display:none;"  >'+index+'</span><span class="description">'+value+'</span></div>';
        });
      }
    }

    thisCombobox += options;
    thisCombobox += '</div>';
    thisCombobox += '</div>';
    $('body').append(thisCombobox);

}


ZERP.Utils.showHideComboboxOptions = function(thisPtr){
/*So, if an attribute is non-standard, there won’t be DOM-property for it. Is there a way to access such attributes?
Sure. All attributes are accessible using following methods:*/

/*elem.hasAttribute(name) – checks for existence.
elem.getAttribute(name) – gets the value.
elem.setAttribute(name, value) – sets the value.
elem.removeAttribute(name) – removes the attribute.*/
  ZERP.Utils.ActiveComboboxPtr = thisPtr;

  var tagName = thisPtr.tagName;
  var hasAttribute = thisPtr.hasAttribute('forAttribute');
  var attributeName = thisPtr.getAttribute('forAttribute');
  var cmbxOptionsCntId = thisPtr.getAttribute('cmbxOptionsCntId');
  ZERP.Utils.CmbxOptionsCntId = cmbxOptionsCntId;

  console.log('--ActiveComboboxPtr--');
  console.log(thisPtr);
  console.log('--ActiveComboboxPtr--');
  // console.log(attributeName);

  var thisOffset = $(thisPtr).offset();
  var thisTop = thisOffset.top;
  var thisLeft = thisOffset.left;

  var thisTdOffset = $(thisPtr).closest('div').offset();
  var thisTdOffset = $(thisPtr).closest('div.ComboboxContainer').find('input[type=text]').offset();
  var thisTdTop = thisTdOffset.top;
  var thisTdLeft = thisTdOffset.left;
  var thisTdWidth = $(thisPtr).parent().find('input').width();
  var thisTdWidth = $(thisPtr).closest('div.ComboboxContainer').find('input[type=text]').width() + 24;

  var cmbxOptionsCntId = '#'+cmbxOptionsCntId;
  if( $(cmbxOptionsCntId).is(':hidden') ){
    $(cmbxOptionsCntId).css({
      'display':'block',
      'top': (thisTop+27) + 'px',
      'left': (thisTdLeft + 1) + 'px',
      'position': 'absolute',
      // 'margin-left': '3px',
      'background-color': 'white',
      'width': thisTdWidth + 'px',
      'max-height': '300px',
      'overflow-y': 'scroll',
      'border-width': '0px 1px 1px 1px',
      'border-style': 'solid',
      'border-color': 'skyblue',
      'z-index': '9999'
    });
    $('.zerp-listitem-element').css({
      'padding': '3px',
    });

    $('.zerp-listitem-element').hover(function(){
        $(this).css("background-color", "skyblue");
        }, function(){
        $(this).css("background-color", "");
    });


    ZERP.Utils.initComboboxArrowNavigation(thisPtr);

  } else if( $(cmbxOptionsCntId).is(':visible') ){
    $(cmbxOptionsCntId).css({
      'display':'none',
    });
  }

}



ZERP.Utils.hideComboboxOptions = function(attributeName){
  var combobox_id = '#'+ ZERP.Utils.CmbxOptionsCntId;
    $(combobox_id).css({
      'display':'none',
    });
}

ZERP.Utils.showComboboxOptions = function(){

  var thisPtr = ZERP.Utils.ActiveComboboxPtr;
  var tagName = thisPtr.tagName;
  var hasAttribute = thisPtr.hasAttribute('forAttribute');
  var attributeName = thisPtr.getAttribute('forAttribute');
  var cmbxOptionsCntId = thisPtr.getAttribute('cmbxOptionsCntId');
  ZERP.Utils.CmbxOptionsCntId = cmbxOptionsCntId;


  var thisOffset = $(thisPtr).offset();
  var thisTop = thisOffset.top;
  var thisLeft = thisOffset.left;

  var thisTdOffset = $(thisPtr).closest('div').offset();
  var thisTdOffset = $(thisPtr).closest('div.ComboboxContainer').find('input[type=text]').offset();
  var thisTdTop = thisTdOffset.top;
  var thisTdLeft = thisTdOffset.left;
  var thisTdWidth = $(thisPtr).parent().find('input').width();
  var thisTdWidth = $(thisPtr).closest('div.ComboboxContainer').find('input[type=text]').width() + 24;

  var cmbxOptionsCntId = '#'+cmbxOptionsCntId;
  if( $(cmbxOptionsCntId).is(':hidden') ){
    $(cmbxOptionsCntId).css({
      'display':'block',
      'top': (thisTop+27) + 'px',
      'left': (thisTdLeft + 1) + 'px',
      'position': 'absolute',
      // 'margin-left': '3px',
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
    ZERP.Utils.initComboboxArrowNavigation(thisPtr);
  }


}



ZERP.Utils.initComboboxArrowNavigation = function(thisPtr){
  $(thisPtr).closest('div.ComboboxContainer').find('input').focus();
  var attributeName = thisPtr.getAttribute('forAttribute');

  // $('#searchForm td[fieldname='+ attributeName +']').find('input[name='+attributeName+']').focus();
  var combobox_id = '#frm_combobox_'+ attributeName;

  // $('#searchForm td[fieldname='+ attributeName +']').find('input[name='+attributeName+']').off('keyup').on('keyup',function(e){
  $(thisPtr).closest('div.ComboboxContainer').find('input').off('keyup').on('keyup',function(e){
        // Make sure to stop event bubbling
        e.preventDefault();
        e.stopPropagation();
    if (e.keyCode == 40) {  
      var curr = $(combobox_id + ' div').find('.current:visible');
      console.log(curr);
      if(curr.length){
        // $(curr).attr('class', 'display_box');
                // $(curr).next().attr('class', 'display_box current');
        $(curr).removeClass('current');
        $(curr).css('background-color', '');
        $(curr).next(':visible').addClass('current');
        $(curr).next(':visible').css('background-color', 'skyblue');
      } else {
        $(combobox_id + ' div div:visible:first-child').addClass('current');
        $(combobox_id + ' div div:visible:first-child').css('background-color', 'skyblue');
      }
      // Navigate(1);
    } else if(e.keyCode==38){
      var curr = $(combobox_id + ' div').find('.current:visible');
      if(curr.length){
        $(curr).removeClass('current');
        $(curr).css('background-color', '');
        $(curr).prev().addClass('current');
        $(curr).prev().css('background-color', 'skyblue');
      } else {
        $(combobox_id + ' div div:visible:last-child').addClass('current');
        $(combobox_id + ' div div:visible:last-child').css('background-color', 'skyblue');        
      }
    } else if(e.keyCode == 13){
      var chosenOptionCode = $(combobox_id + ' div').find('.current').find('span.code').text();
      var chosenOptionDesc = $(combobox_id + ' div').find('.current').find('span.description').text();
      $(ZERP.Utils.ActiveComboboxPtr).closest('div.ComboboxContainer').find('input[type=hidden]').val(chosenOptionCode);
      $(ZERP.Utils.ActiveComboboxPtr).closest('div.ComboboxContainer').find('input[type=text]').val(chosenOptionDesc);
      ZERP.Utils.hideComboboxOptions();
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


ZERP.Utils.handleThisComboxSearch = function(thisPtr){
  // console.log(thisPtr);
  var parentNode = thisPtr.parentNode.parentNode
  // console.log(parentNode);
  var child = parentNode.children[1];
  // console.log(child);
  ZERP.Utils.ActiveComboboxPtr = child;

  var cmbxOptionsCntId = thisPtr.getAttribute('cmbxOptionsCntId');
  ZERP.Utils.CmbxOptionsCntId = cmbxOptionsCntId;
  var userEntryChar = $(thisPtr).val();

  if( $('#'+cmbxOptionsCntId).is(':hidden') ){
    if(userEntryChar.length > 0){
      ZERP.Utils.showComboboxOptions();
    }
  }


  var input, filter, ul, li, a, i;

  var userEntry = $(thisPtr).val();
  var combobox_fieldname = $(thisPtr).attr('name');
  var cmbxOptionsCntId = $(thisPtr).attr('cmbxOptionsCntId');

  // input = document.getElementById("myInput");
  filter = userEntry.toUpperCase();
  div = document.getElementById(cmbxOptionsCntId);
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

ZERP.Utils.setChosenOptionElement = function(thisPtr){
  var chosenOptionCode = $(thisPtr).find('span.code').text();
  var chosenOptionDesc = $(thisPtr).find('span.description').text();
  var attributeName = $(thisPtr).attr('forattribute');
  $(ZERP.Utils.ActiveComboboxPtr).closest('div.ComboboxContainer').find('input[type=hidden]').val(chosenOptionCode);
  $(ZERP.Utils.ActiveComboboxPtr).closest('div.ComboboxContainer').find('input[type=text]').val(chosenOptionDesc);
  ZERP.Utils.hideComboboxOptions();
}


/**
 * [showProcessinOverlay description]
 * @return {[type]} [description]
 */
ZERP.Utils.showProcessinOverlay = function(messageStr = ""){
  if(messageStr == "") messageStr = "Processing, please wait.";

  $('body').find('#myProcessinOverlay').remove();
  var processinOverlay = '<div id="myProcessinOverlay" class="myProcessinOverlay">\
    <div class="myProcessinOverlay-content" id="myProcessinOverlay-content">\
      <div id="myProcessinOverlay-loadingDiv">\
        <center><img src="'+window.grailsSupport.loadingSpinner+'"/></center>\
      </div>\
      <div class="myProcessinOverlay-body" id="myProcessinOverlay-body">\
        <div id="myProcessinOverlay-message" style="color:black; font-weight:bold; font-size:20px;"><center>'+messageStr+'</center></div>\
      </div>\
    </div>\
  </div>';
  $('body').append(processinOverlay);

  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;
  var windowHeight_XX =  (windowHeight/2) - 200;

  // apply css ---------
  $('.myProcessinOverlay').css({
  'position':'fixed',
  'z-index':'9999',
  'padding-top': windowHeight_XX+'px',
  'left':'0',
  'top':'0',
  'width':'100%',
  'height':'100%',
  'background-color':'white',
  'opacity': '0.8',
  });
  return;
}

ZERP.Utils.removeProcessingOverlay = function(){
  $('body').find('#myProcessinOverlay').remove();  
}




// date: 2019-10-02 @ for the purpose of use _drawFixedRightSideForm
ZERP.Utils.buildHeaderEntryForm = function(){

  var _baseStructure = ZERP.System.EntityStructureObj;
  var HTML_HeaderEntryForm = '';

  var entityAttributes = _baseStructure['Attributes'];
  for (var attributeName in entityAttributes) {

    var thisAttributeProperties = entityAttributes[attributeName];
    if(thisAttributeProperties.hasOwnProperty('headerEntry')){

        var fielddesc = attributeName;
        fielddesc = (!!thisAttributeProperties.fielddesc) ? thisAttributeProperties.fielddesc : fielddesc;
        var defaultval = (!!thisAttributeProperties.defaultval) ? thisAttributeProperties.defaultval : '';
        var requiredSpan = '';
        if(!!thisAttributeProperties.MandatoryInUI && thisAttributeProperties.MandatoryInUI == true){
          requiredSpan = '<span class="required MInUI" style="">*</span>';
        }


        var htmlString = '';
        var UIPlacementBox1 = '', UIPlacementBox2 = '', UIPlacementBox3 = '';
        var HasBox1Item = true, HasBox2Item = false, HasBox3Item = false;

        if( !!thisAttributeProperties['AttributeType'] && thisAttributeProperties['AttributeType'] == "UIStyle"){

          if( !!thisAttributeProperties['UIStyleType'] && thisAttributeProperties['UIStyleType'] == "Begin Group Box"){
            var containerName = "fieldset_" + attributeName;
            htmlString = '<div class="clearfix"></div>';
            htmlString += '<fieldset id=' + containerName + '>';
            htmlString += '<legend>'+fielddesc+'</legend>';
          } else if( !!thisAttributeProperties['UIStyleType'] && thisAttributeProperties['UIStyleType'] == "End Group Box") {
            htmlString += '</fieldset>';

          } else {

            // htmlString += '<div class="row">'; // Grid systemmain added: 2019-05-06
            // htmlString += '<div class="col">'; // Grid systemmain added: 2019-05-06
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
            // btnReference = ZERP.Utils.HTML_button('btnReference', thisAttributeProperties, attributeName);
          }

          var checkboxClass = '';
          if( thisAttributeProperties.hasOwnProperty('HtmlType') ){
            if(thisAttributeProperties.HtmlType == 'checkbox'){
              checkboxClass = 'checkboxClass';
            }
          }
          

          // var inputTag = '';
          var inputTag = ZERP.Utils.genericHtmlInputFieldMaker(attributeName, defaultval, thisAttributeProperties);
          var packInputTag = '<div>'+inputTag + btnDropdownToggle + btnLookup + btnReference +'</div>';
          var label = '<label for="lbl_'+attributeName+'">'+fielddesc + requiredSpan +'</label>';

          // clear fix for new line
          if( thisAttributeProperties.hasOwnProperty('newline') ){
            htmlString += '<div class="clearfix" style="clear:both;"></div>';
          }
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
          } else {
            htmlString += '<div class="formGroup formGroup_'+attributeName+ ' ' + checkboxClass + ' ">' + label + packInputTag + '<span class="SpanDecode"></span></div>';
          }



          if( thisAttributeProperties.hasOwnProperty('PrintAttribute') ){
            if(thisAttributeProperties.PrintAttribute == '3'){
              htmlString += '<div class="clearfix" style="clear:both;"></div>';
            }
          }

        }

        // add in header or footer placement
        HTML_HeaderEntryForm += htmlString;



      }


    }


    return HTML_HeaderEntryForm;

}



ZERP.Utils.validateFormContainerFields = function(container){
  var entityAttributes = ZERP.System.EntityStructureObj['Attributes'];

  var error = false;
  $(container).find('input, select, textarea').each(function() {
    var type = $(this).attr('type');
    if(type == 'checkbox') return;

    var attributeName = $(this).attr('name');
    var attributeValue = $(this).val();

    if (entityAttributes.hasOwnProperty(attributeName)){
      var thisAttributeProperties = entityAttributes[attributeName];
      var MandatoryInUI = (!!thisAttributeProperties.MandatoryInUI) ? thisAttributeProperties.MandatoryInUI : false;
      if(MandatoryInUI){
        if(attributeValue == ''){
          error = true;
          ZERP.FrmMgr.genFrm.hightlightErrorField($(this));
          $(this).focus();
        }
      }
    }
  });

  return error;
}


ZERP.Utils.collectHeaderData = function(){
  var headerObj = {};
  $('.ZERP_HeaderEntryCt').find('.formGroup input, select, textarea').each(function(index, element){
    // element == this
    var fieldname = $(element).attr('name');
    if(!!!fieldname) return;
    var fieldvalue = $(element).val();
    headerObj[fieldname] = fieldvalue;
  });
  return headerObj;
}





ZERP.Utils.initOnDemandDataDropdownHandling = function(){
  // 1. Add Required Identity Class
  var EntityAttributes = ZERP.System.EntityStructureObj['Attributes'];
  for (var key in EntityAttributes) {
    if (EntityAttributes.hasOwnProperty(key)){
      var thisAttributeProperties = EntityAttributes[key];
      if(!!thisAttributeProperties.HtmlType && ( thisAttributeProperties.HtmlType == 'odDropdown2' ||  thisAttributeProperties.HtmlType == 'odDropdownRefObj' ) ){
        $('#ZERP_FixedRightSideEntryForm #' + key).addClass('OnDmdDropdown2');
        $('#ZERP_FixedRightSideEntryForm #' + key).attr('autocomplete', 'off');
      }
    }
  }

  //2. init Action Event
  $('#ZERP_FixedRightSideEntryForm .OnDmdDropdown2').off('click').on('click', function(event){
    event.preventDefault();
    event.stopPropagation();
    var thisPtr = this;
    ZERP.ODDDH.makeOnDemandDropdownOptionsAndShow(thisPtr, 'Click');

  });

  $('#ZERP_FixedRightSideEntryForm .OnDmdDropdown2').off('keyup').on('keyup',function(e){
    // Make sure to stop event bubbling
    e.preventDefault();
    e.stopPropagation();
    var thisPtr = this;
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
