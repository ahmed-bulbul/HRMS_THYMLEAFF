ListMgr.makeEQB = function(jsonData){

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
  eqbList += '<select style="vertical-align: middle;" onchange="ListMgr.handleUserChangeEQB(this);">';
  eqbList += '<option value="">Select</option>';
  eqbList += options;
  eqbList += '</select>';

  return eqbList;
  
}





ListMgr.handleUserChangeEQB = function(thisPtr){
  ListMgr.EqbChanged = true;
  var UserSelectEqbName = $(thisPtr).val();

  ListMgr.rActiveEqb = UserSelectEqbName;

  // alert(UserSelectEqbName);

  // Cal get List data function with this EqbName


  var pagenum = $('#pagination').find('span.current').text();
  var lineperpage = $('#divRowLimit').find('select[name=show]').val();
  if(!!!pagenum) pagenum=1;
  if(!!!lineperpage) lineperpage=10;

  var searchParams = ListMgr.checkAndRetriveSearchData();
  searchParams.rEntityName = ListMgr.rEntityName;

  ListMgr.getListData( lineperpage, pagenum, ListMgr._URL_API, searchParams);


}











ListMgr.createUpdateEQB = function(){

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
  modalInts.setCallBackFunctionName('ListMgr.saveUserEqbData');


  var EntityAttributes = ZERP.System.EntityStructureObj['attributes'];
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


ListMgr.saveUserEqbData = function(thisPtr){
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
