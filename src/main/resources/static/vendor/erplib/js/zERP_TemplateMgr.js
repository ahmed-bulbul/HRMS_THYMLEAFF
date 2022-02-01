// //////////////////////////////////////////////////
/**
 * Declare the namespace ZERP if not existent
 */


var ZERP = ZERP || {};
ZERP.UIManager = {};

/*ZERPContainerID
ZERP Container ID is needed for this Template for set width and height automatically
Within this Container Div this below code will be placed*/

var ZERP = ZERP || {};
ZERP.UIMgr = ZERP.UIMgr || {};
ZERP.UIMgr.ZERPContainerID = 'ZERPContainerID';


ZERP.buildZERPTemplate = function(doexe){
  if(!!!doexe) return;

/*    var DOMStr = `
<!-- ================================ ZERP HTML Template Start ============================================================== -->
<!-- ZERPContainerID -->
<!-- ZERP Container ID is needed for this Template for set width and height automatically -->
<!-- Within this Container Div this below code will be placed -->
<div id="ZERP_mainContainerWrapper">
  <div id="ZERP_mainContainer">
      
    <!-- loading and message bar     -->
    <div id="ZERPDataLoadingPanel">
      <!-- <center><img src="/images/loading_spinner.gif"></center> -->
    </div>

    <div id="ZERP_Header">
        <div id="ZERP_EntityTittle" class="border-bottom mb-2"></div>
    </div>
    <div id="ZERP_GridPanel">
        <!-- Grid panel content -->
        <!-- 
        1. Generic Button
        2. Custom Button
        3. Pagination
        4. List
        5. Form 
        -->
        <div id="ZERP_GridPanelWarrper">

            <div id="ZERP_UserAlertCt"></div> <!-- error, warning, success, general message -->
            <div id="ZERP_FatherDataCt">
                <div class="ZERP_FatherDataCt-first"></div>     <!-- for header -->
                <div class="ZERP_FatherDataCt-second"></div>    <!-- for line -->
            </div>

            <div id="ZERP_HeaderEntryCt" class="ZERP_HeaderEntryCt ZERP_EntryCt"></div> <!-- user want to make some field header -->
            <div class="clearfix" style="clear:both;"></div>

            <div id="ZERP_TbarListFromWrapper">
                
                <div id="ZERP_GenericToolbar"></div>
                <div id="ZERP_CustomToolbar"></div>

                <div id="ZERP_ListFromWrapper">
                  

                    <div id="ZERP_listFormGridPanel" class="x-panel-scroller border-top">
                      <div id="ZERP_listFormGridPanel_scroller">

                        <div id="ZERP_pgnGridPanelWrapper">
                          <div id="ERP_pgnGridPanel"></div>
                        </div>

 
                        <div id="ZERP_listGridPanelFull_scrollerWrapper">
                        <div id="ZERP_listGridPanelFull_scroller">

                          <div id="ZERP_listGridPanel">
                            <div id="ZERP_listGridPanel_headerWrapper" style=""> <!-- padding will apply here (L-10px, R-10px) -->
                              <div id="ZERP_listGridPanel_header" style=""> <!-- overflow will apply here (hidden or auto) -->
                                <div id="ZERP_listGridPanel_headerFullWidth"> 
                                    <div id="ZERP_listGridPanel_headerInner" class="x-panel-bwrap">
                                        <div id="ZERP_listGridPanel_headerOffset"></div>
                                    </div>
                                </div>         
                              </div>
                            </div>

                            <!-- <div id="ZERP_clearAbsoluteLTH" class="clearAbsolute" style="height: 50px;"></div> -->

                            <div id="ZERP_listGridPanel_scrollerWrapper"> <!-- padding will apply here (L-10px, R-10px) -->
                              <div id="ZERP_listGridPanel_scroller"> <!-- overflow will apply here (auto-it will make scrollable) -->
                                <div id="ZERP_listGridPanel_scrollerFullWidth"> <!-- full width will be apply here -->
                                    <div id="listCntrDiv">
                                        <div id="listTableWrapper" class="listTableWrapper"></div>
                                    </div>
                                </div>
                              </div>
                            </div>
                          </div>

                        </div>
                        </div>

                        <div id="ZERP_formGridPanel" style="display: none;">    
                            <div id="formCntrDiv" class="ZERP_EntryCt">
                                <div id="formWrapper" class="formWrapper">
                                </div>
                            </div>
                        </div>
                        
                      </div>
                    
                    </div>


                </div> <!-- ZERP_ListFromWrapper End -->                    

            </div> <!-- ZERP_TbarListFromWrapper End -->

            <div id="ZERP_FooterEntryCt" class="ZERP_HeaderEntryCt ZERP_EntryCt"></div>

        </div>  <!-- ZERP_GridPanelWarrper End -->
    </div> <!-- ZERP_GridPanel End -->
    <div id="ZERP_Footer">
        <div id="" class=""></div>
    </div> <!-- currently no need -->


  </div> <!-- ZERP_mainContainer End -->
</div> <!-- ZERP_mainContainerWrapper End -->
<!-- ================================ ZERP HTML Template End ================================================================= -->
    `;
*/

    var DOMStr = '\
<!-- ================================ ZERP HTML Template Start ============================================================== -->\
<!-- ZERPContainerID -->\
<!-- ZERP Container ID is needed for this Template for set width and height automatically -->\
<!-- Within this Container Div this below code will be placed -->\
<div id="ZERP_mainContainerWrapper">\
  <div id="ZERP_mainContainer">\
      \
    <!-- loading and message bar     -->\
    <div id="ZERPDataLoadingPanel">\
      <!-- <center><img src="/images/loading_spinner.gif"></center> -->\
    </div>\
\
    <div id="ZERP_Header">\
        <div id="ZERP_EntityTittle" class="border-bottom mb-2"></div>\
    </div>\
    <div id="ZERP_GridPanel">\
        <!-- Grid panel content -->\
        <!-- \
        1. Generic Button\
        2. Custom Button\
        3. Pagination\
        4. List\
        5. Form \
        -->\
        <div id="ZERP_GridPanelWarrper">\
\
            <div id="ZERP_UserAlertCt"></div> <!-- error, warning, success, general message -->\
            <div id="ZERP_FatherDataCt">\
                <div class="ZERP_FatherDataCt-first"></div>     <!-- for header -->\
                <div class="ZERP_FatherDataCt-second"></div>    <!-- for line -->\
            </div>\
\
            <div id="ZERP_HeaderEntryCt" class="ZERP_HeaderEntryCt ZERP_EntryCt"></div> <!-- user want to make some field header -->\
            <div class="clearfix" style="clear:both;"></div>\
\
            <div id="ZERP_TbarListFromWrapper">\
                \
                <div id="ZERP_GenericToolbar"></div>\
                <div id="ZERP_CustomToolbar"></div>\
\
                <div id="ZERP_ListFromWrapper">\
                  \
\
                    <div id="ZERP_listFormGridPanel" class="x-panel-scroller border-top">\
                      <div id="ZERP_listFormGridPanel_scroller">\
\
                        <div id="ZERP_pgnGridPanelWrapper">\
                          <div id="ERP_pgnGridPanel"></div>\
                        </div>\
\
 \
                        <div id="ZERP_listGridPanelFull_scrollerWrapper">\
                        <div id="ZERP_listGridPanelFull_scroller">\
\
                          <div id="ZERP_listGridPanel">\
                            <div id="ZERP_listGridPanel_headerWrapper" style=""> <!-- padding will apply here (L-10px, R-10px) -->\
                              <div id="ZERP_listGridPanel_header" style=""> <!-- overflow will apply here (hidden or auto) -->\
                                <div id="ZERP_listGridPanel_headerFullWidth"> \
                                    <div id="ZERP_listGridPanel_headerInner" class="x-panel-bwrap">\
                                        <div id="ZERP_listGridPanel_headerOffset"></div>\
                                    </div>\
                                </div>         \
                              </div>\
                            </div>\
\
                            <!-- <div id="ZERP_clearAbsoluteLTH" class="clearAbsolute" style="height: 50px;"></div> -->\
\
                            <div id="ZERP_listGridPanel_scrollerWrapper"> <!-- padding will apply here (L-10px, R-10px) -->\
                              <div id="ZERP_listGridPanel_scroller"> <!-- overflow will apply here (auto-it will make scrollable) -->\
                                <div id="ZERP_listGridPanel_scrollerFullWidth"> <!-- full width will be apply here -->\
                                    <div id="listCntrDiv">\
                                        <div id="listTableWrapper" class="listTableWrapper"></div>\
                                    </div>\
                                </div>\
                              </div>\
                            </div>\
                          </div>\
\
                        </div>\
                        </div>\
\
                        <div id="ZERP_formGridPanel" style="display: none;">    \
                            <div id="formCntrDiv" class="ZERP_EntryCt">\
                                <div id="formWrapper" class="formWrapper">\
                                </div>\
                            </div>\
                        </div>\
                        \
                      </div>\
                    \
                    </div>\
\
\
                </div> <!-- ZERP_ListFromWrapper End -->                    \
\
            </div> <!-- ZERP_TbarListFromWrapper End -->\
\
            <div id="ZERP_FooterEntryCt" class="ZERP_HeaderEntryCt ZERP_EntryCt"></div>\
\
        </div>  <!-- ZERP_GridPanelWarrper End -->\
    </div> <!-- ZERP_GridPanel End -->\
    <div id="ZERP_Footer">\
        <div id="" class=""></div>\
    </div> <!-- currently no need -->\
\
\
  </div> <!-- ZERP_mainContainer End -->\
</div> <!-- ZERP_mainContainerWrapper End -->\
<!-- ================================ ZERP HTML Template End ================================================================= -->\
    ';




    $('#ZERPContainerID').empty().append(DOMStr);
    return;
}


ZERP.UIManager.refixPanelsHeightWidth = function(){
    // makeGridPanleScrollable();
}


ZERP.UIManager.buildProcessList = function(UserName){
 var $ERP_layoutBrowser =  $('#ERP_layout-browser div.x-panel-bwrap');

 var $serarchInputWrapper = $('<div/>');
 $serarchInputWrapper.appendTo($ERP_layoutBrowser);
 $serarchInputWrapper.css({
     'padding': '10px 5px 0px 5px',
 });
 var $serarchInput = $('<input type="text" placeholder="Search.." id="myInput" onclick="ZERP.UIManager.myFunctionShowPDL();" onkeyup="ZERP.UIManager.filterFunctionPDL();">');
 $serarchInput.appendTo($serarchInputWrapper);
 $serarchInputWrapper.find('input').css({
     'width': '210px',
 });



    var $processDropdown = $('<div class="zErpProcessDropdown" />');
    $processDropdown.appendTo($ERP_layoutBrowser);

    var $processDropdownIn = $('<div id="zErpProcessDropdown" class="zErpProcessDropdown-content" />')
    $processDropdownIn.appendTo($processDropdown);

    var allProcess = {
        'UserGenericType' : {
            'text' : 'MRD Library',
            'processLink' : 'zerp/pdm/libraryname'
        },
        'MRD Color Linrary' : {
            'text' : 'MRD Color Library',
            'processLink' : 'zerp/pdm/pdmcolor'
        },
        'DesignID' : {
            'text' : 'Product Code Request',
            'processLink' : 'zerp/dev/fabricdesignid'
        },
        'ASN' : {
            'text' : 'ASN',
            'processLink' : 'zerp/qua/asn'
        },
        'FabricOrder' : {
            'text' : 'Fabric Order',
            'processLink' : 'zerp/pkg/whs/FabricOrder'
        }                          
    };

    // $processLink = $('<a />');
    // $processLink.text('Base');
    // $processLink.appendTo($processDropdownIn);
    for (var processName in allProcess ) {
        var processAttr = allProcess[processName];
        var processText = processAttr['text'];
        var processLink = processAttr['processLink'];
        $processLink = $('<a class = "processLink" />');
        $processLink.text(processText);
        $processLink.attr('href', '#');
        $processLink.attr('processlink', processLink);
        $processLink.appendTo($processDropdownIn);
    }


    // bind click event
    $('body').on('click', '.zErpProcessDropdown a', function(event) {
        event.stopPropagation();
        event.stopImmediatePropagation();
        console.log(event.target.class);

        var $target = $(event.target);   
        var text = $target.text();
        var text = event.target.text;

        var processLink = $target.attr('processlink');
        // alert(processLink);
        ZERP.callProcessEntity(processLink);
        hideLeftSidePanel();


    });


// CSS
$('.zErpProcessDropdown').css({
    'position': 'relative',
    'display': 'inline-bloc',
});

$('.zErpProcessDropdown-content').css({
    'display': 'none',
    'position': 'absolute',
    'background-color': '#f6f6f6',
    'min-width': '210px',
    'overflow': 'auto',
    'box-shadow': '0px 8px 16px 0px rgba(0,0,0,0.2)',
    'z-index': '1',
    'padding-left': '5px'
});

$('.zErpProcessDropdown-content a').css({
    'color': 'black',
    'padding': '12px 16px',
    'text-decoration': 'none',
    'display': 'block',
    'cursor': 'pointer'  
});

$('.zErpProcessDropdown a').hover(
    function(){ $(this).css('background-color', '#ddd'); },
    function(){ $(this).css('background-color', ''); }
);


    
}



//findRootBackward
ZERP.BaseToolbar = {};
ZERP.BaseToolbar.buildGenericToolbar = function(xEntityStructure){
    var xEntityStructureObj = xEntityStructure;

    var baseToolbarJson = xEntityStructureObj['toolbars'];

 // for (var key in baseToolbarJson) {
 //  if(baseToolbarJson.hasOwnProperty(key)){
 //      var fieldname = '';
 //      var fieldvalue = '';
 //  }
 // }

 // 1. Main Table
 var $fTable = $('<table/>');
 $fTable.attr('cellspacing', '0');
 $fTable.attr('class', 'x-toolbar-ct');

 $fTableBody = $('<tbody/>');
 $tr = $('<tr/>');
 $ftd1 = $('<td class="x-toolbar-left" align="left" />');
 $ftd2 = $('<td class="x-toolbar-right" align="right" />');

 $ftd1.appendTo($tr);
 $ftd2.appendTo($tr);
 $tr.appendTo($fTableBody);
 $fTableBody.appendTo($fTable);


 // 2. two sub table
 // 2.1
 var $sTable = $('<table/>');
 $sTable.attr('cellspacing', '0');
 $sTableBody = $('<tbody/>');
 $str = $('<tr/>');
 $str.attr('class', 'x-toolbar-left-row');
 $str.appendTo($sTableBody);
 $sTableBody.appendTo($sTable);
 $sTable.appendTo($ftd1);

 // 2.2
 var $lTable = $('<table/>');
 $lTable.attr('cellspacing', '0');
 $lTable.appendTo($ftd2);
 $lTableBody = $('<tbody/>');
 $lTableBody.appendTo($lTable);
 $ltr = $('<tr/>');
 $ltr.attr('class', 'x-toolbar-left-row');
 $ltr.appendTo($lTableBody);


    // var stdButtons = baseToolbarJson.toolbars.std;
 var stdButtons = baseToolbarJson.std;

 for (var i = 0; i < stdButtons.length; i++) {
     var thisButtonPrts = stdButtons[i];
     var btnID = thisButtonPrts.id;
     var btnGrpClass = thisButtonPrts.grpClass;
     var btnClass = thisButtonPrts.class;
     var bgimg = thisButtonPrts.bgimg;
     var btnText = thisButtonPrts.text;
     var btnUiPlacement = thisButtonPrts.uiPlacement;
        // var iiconL = (!!thisButtonPrts.iiconL) ? '<i class="material-icons">'+ thisButtonPrts.iiconL +'</i>' : '';
        var iiconL = (!!thisButtonPrts.iiconL) ? '<i class="'+thisButtonPrts.iiconL+'"></i> ' : '';
        var iiconR = (!!thisButtonPrts.iiconR) ? ' <i class="'+thisButtonPrts.iiconR+'"></i> ' : '';
        var btnColor = (!!thisButtonPrts.btnColor) ? thisButtonPrts.btnColor : 'btn-blue';
     var disabled = thisButtonPrts.disabled;

     var multiple = (!!thisButtonPrts.multiple && thisButtonPrts.multiple === true) ? true : false;
     var SubButtons = (!!thisButtonPrts.buttons) ? thisButtonPrts.buttons : {};

     // console.log('disabled-----');
     // console.log(disabled);
     // console.log(thisButtonPrts);

     $toolbarCell = $('<td/>');
     $toolbarCell.attr('class', 'x-toolbar-cell');
     $toolbarCell.appendTo($str);
     if(btnText == 'Help' || btnUiPlacement == 'right') $toolbarCell.appendTo($ltr);

     var $tTable = $('<table/>');
     $tTable.attr('cellspacing', '0');
     $tTable.attr('class', 'x-btn x-btn-text-icon');
     if(disabled === true) $tTable.addClass('x-item-disabled');
     $tTable.appendTo($toolbarCell);
     $tTableBody = $('<tbody/>');
     $tTableBody.appendTo($tTable);
     $tr = $('<tr/>');
     $tr.appendTo($tTableBody);
     $td = $('<td class="x-btn-mc" />');
     $td.appendTo($tr);

     $em = $('<em class="x-unselectable">');
     $em.appendTo($td);

        // $thisButton = $('<button type="button" class=" x-btn-text">'+ btnText +'</button>');
     // $thisButton = $('<button type="button" class=" btn-blue">' + iiconL + btnText + iiconR +'</button>');
     $thisButton = $('<button type="button" class=" '+ btnColor +' ">' + iiconL + btnText + iiconR +' </button>');
     $thisButton.addClass(btnClass);
     $thisButton.css({
         // 'background-image': 'url('+bgimg+')', // working
         // 'background-image': 'url(&quot;images/com/dat/abs/web/new.png&quot;)',
     });

     if(multiple){

      var SubButtonsOptions = '';
      for (var key in SubButtons) {
        var val = SubButtons[key];
        var ActionFunction = val['ActionFunction'];
        var Text = val['text'];
        SubButtonsOptions += '<a class="dropdown-item" href="#" onclick="'+ActionFunction+';" >'+ Text +'</a>';
      }

      var SubButtonsDomStr = '\
      <div class="btn-group">\
        <button type="button" class="btn btn-sm btn-danger">Other Actions</button>\
        <button type="button" class="btn btn-sm btn-danger dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
          <span class="sr-only">Toggle Dropdown</span>\
        </button>\
        <div id="'+btnID+'-dropdown-menu" class="dropdown-menu">\
        '+SubButtonsOptions+'\
        </div>\
      </div>\
      ';
      var SubButtonsDomStr = '\
      <div class="btn-group '+btnGrpClass+'">\
        <button type="button" class="btn btn-sm btn-secondary '+btnClass + " " + btnColor +'">'+btnText+'</button>\
        <button type="button" class="btn btn-sm btn-secondary dropdown-toggle dropdown-toggle-split '+btnColor+'  " data-toggle="alx-dropdown" aria-haspopup="true" aria-expanded="false" for-element="'+btnID+'" >\
          <span class="sr-only">Toggle Dropdown</span>\
        </button>\
      </div>\
      ';      
      $em.append(SubButtonsDomStr);

      var btnDropdownMenuDomStr = '\
        <div id="'+btnID+'-dropdown-menu" class="dropdown-menu">\
        '+SubButtonsOptions+'\
        </div>\
      ';
      $('body').append(btnDropdownMenuDomStr);

//       $em.append(
//         '\
// <div class="btn-group">\
//   <button type="button" class="btn btn-danger btn-sm">Other Actions</button>\
//   <button type="button" class="btn btn-danger btn-sm dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
//     <span class="sr-only">Toggle Dropdown</span>\
//   </button>\
//   <div class="dropdown-menu">\
//     <a class="dropdown-item" href="#">Action</a>\
//     <a class="dropdown-item" href="#">Another action</a>\
//     <a class="dropdown-item" href="#">Something else here</a>\
//     <div class="dropdown-divider"></div>\
//     <a class="dropdown-item" href="#">Separated link</a>\
//   </div>\
// </div>\
//         '
//         );

     } else {
        $thisButton.appendTo($em);  
     }
     

 }


 $('#ZERP_GenericToolbar').empty().append($fTable);

}


ZERP.BaseToolbar.buildCustomToolbar = function(xEntityStructure){
    var xEntityStructureObj = JSON.parse(xEntityStructure);

    var baseToolbarJson = xEntityStructureObj['toolbars'];
    if(!!!baseToolbarJson.cst) return;

    // for (var key in baseToolbarJson) {
    //  if(baseToolbarJson.hasOwnProperty(key)){
    //      var fieldname = '';
    //      var fieldvalue = '';
    //  }
    // }

    // 1. Main Table
    var $fTable = $('<table/>');
    $fTable.attr('cellspacing', '0');
    $fTable.attr('class', 'x-toolbar-ct');

    $fTableBody = $('<tbody/>');
    $tr = $('<tr/>');
    $ftd1 = $('<td class="x-toolbar-left" align="left" />');
    $ftd2 = $('<td class="x-toolbar-right" align="right" />');

    $ftd1.appendTo($tr);
    $ftd2.appendTo($tr);
    $tr.appendTo($fTableBody);
    $fTableBody.appendTo($fTable);


    // 2. two sub table
    // 2.1
    var $sTable = $('<table/>');
    $sTable.attr('cellspacing', '0');
    $sTableBody = $('<tbody/>');
    $str = $('<tr/>');
    $str.attr('class', 'x-toolbar-left-row');
    $str.appendTo($sTableBody);
    $sTableBody.appendTo($sTable);
    $sTable.appendTo($ftd1);

    // 2.2
    var $lTable = $('<table/>');
    $lTable.attr('cellspacing', '0');
    $lTable.appendTo($ftd2);
    $lTableBody = $('<tbody/>');
    $lTableBody.appendTo($lTable);
    $ltr = $('<tr/>');
    $ltr.attr('class', 'x-toolbar-left-row');
    $ltr.appendTo($lTableBody);


    // var stdButtons = baseToolbarJson.toolbars.std;
    var stdButtons = baseToolbarJson.cst;

    for (var i = 0; i < stdButtons.length; i++) {
        var thisButtonPrts = stdButtons[i];
        var btnClass = thisButtonPrts.class;
        var bgimg = thisButtonPrts.bgimg;
        var btnText = thisButtonPrts.text;
        var iiconL = (!!thisButtonPrts.iiconL) ? '<i class="material-icons">'+ thisButtonPrts.iiconL +'</i>' : '';
        var iiconR = (!!thisButtonPrts.iiconR) ? '<i class="material-icons">'+ thisButtonPrts.iiconR +'</i>' : '';
        var disabled = thisButtonPrts.disabled;

        var ActionFunc = (!!thisButtonPrts.ActionFunc) ? thisButtonPrts.ActionFunc : '';
        var NextAPIFile = (!!thisButtonPrts.NextAPIFile) ? thisButtonPrts.NextAPIFile : '';
        var ParamKeys = (!!thisButtonPrts.ParamKeys) ? thisButtonPrts.ParamKeys : '';
        var ExtQueryString = (!!thisButtonPrts.ExtQueryString) ? thisButtonPrts.ExtQueryString : '';
        var HideOnListMode = (!!thisButtonPrts.HideOnListMode) ? thisButtonPrts.HideOnListMode : '';
        console.log(thisButtonPrts);

        $toolbarCell = $('<td/>');
        $toolbarCell.attr('class', 'x-toolbar-cell');
        $toolbarCell.appendTo($str);
        if(btnText == 'Help') $toolbarCell.appendTo($ltr);

        var $tTable = $('<table/>');
        $tTable.attr('cellspacing', '0');
        $tTable.attr('class', 'x-btn x-btn-text-icon');
        if(disabled == true) $tTable.addClass('x-item-disabled');
        if(HideOnListMode == true) $tTable.css('display', 'none');
        $tTable.appendTo($toolbarCell);
        $tTableBody = $('<tbody/>');
        $tTableBody.appendTo($tTable);
        $tr = $('<tr/>');
        $tr.appendTo($tTableBody);
        $td = $('<td class="x-btn-mc" />');
        $td.appendTo($tr);

        $em = $('<em class="x-unselectable">');
        $em.appendTo($td);

        // $thisButton = $('<button type="button" class=" x-btn-text">'+ btnText +'</button>');
        $thisButton = $('<button type="button" class="" onclick="'+ActionFunc+'(this);">' + iiconL + btnText + iiconR +'</button>');
        $thisButton.addClass(btnClass);
        if(NextAPIFile != '') $thisButton.attr('NextAPIFile', NextAPIFile);
        if(ParamKeys != '') $thisButton.attr('ParamKeys', ParamKeys);
        if(ExtQueryString != '') $thisButton.attr('ExtQueryString', ExtQueryString);
        $thisButton.css({
            // 'background-image': 'url('+bgimg+')', // working
            // 'background-image': 'url(&quot;images/com/dat/abs/web/new.png&quot;)',
        });
        $thisButton.appendTo($em);  
    }


    $('#ZERP_CustomToolbar').empty().append($fTable);

    $('#ZERP_CustomToolbar').css({
        'border-top': '1px solid',
        'border-bottom': '1px solid',
        'border-color': 'lightgrey',
    });

    if( $("#ZERP_CustomToolbar .x-btn:visible").length == 0){
        $('#ZERP_CustomToolbar').css('display', 'none');
    }

}

ZERP.BaseToolbar.buildHeaderToolbar = function(xEntityStructureObj){

    var params = jsClient.paramsToObj(window.location.search);
    if(!!!params.rHeaderID) return;

    var element = document.getElementById('ZERP_FatherDataCt');
    var newEelement = document.createElement('div');
    newEelement.id = 'ZERP_HeaderToolbar';
    var elementParent = element.parentNode;
    elementParent.insertBefore(newEelement, element.nextSibling);


    var baseToolbarJson = xEntityStructureObj['toolbars'];
    if(!!!baseToolbarJson.heb) return;

    // 1. Main Table
    var $fTable = $('<table/>');
    $fTable.attr('cellspacing', '0');
    $fTable.attr('class', 'x-toolbar-ct');

    $fTableBody = $('<tbody/>');
    $tr = $('<tr/>');
    $ftd1 = $('<td class="x-toolbar-left" align="left" />');
    $ftd2 = $('<td class="x-toolbar-right" align="right" />');

    $ftd1.appendTo($tr);
    $ftd2.appendTo($tr);
    $tr.appendTo($fTableBody);
    $fTableBody.appendTo($fTable);


    // 2. two sub table
    // 2.1
    var $sTable = $('<table/>');
    $sTable.attr('cellspacing', '0');
    $sTableBody = $('<tbody/>');
    $str = $('<tr/>');
    $str.attr('class', 'x-toolbar-left-row');
    $str.appendTo($sTableBody);
    $sTableBody.appendTo($sTable);
    $sTable.appendTo($ftd1);

    // 2.2
    var $lTable = $('<table/>');
    $lTable.attr('cellspacing', '0');
    $lTable.appendTo($ftd2);
    $lTableBody = $('<tbody/>');
    $lTableBody.appendTo($lTable);
    $ltr = $('<tr/>');
    $ltr.attr('class', 'x-toolbar-left-row');
    $ltr.appendTo($lTableBody);


    // var stdButtons = baseToolbarJson.toolbars.std;
    var stdButtons = baseToolbarJson.heb;
    var stdBtnStatusObj = baseToolbarJson.std_btnstatus;

    for (var i = 0; i < stdButtons.length; i++) {
        var thisButtonPrts = stdButtons[i];
        var btnID = thisButtonPrts.id;
        var btnGrpClass = thisButtonPrts.grpClass;
        var btnClass = thisButtonPrts.class;
        var bgimg = thisButtonPrts.bgimg;
        var btnText = thisButtonPrts.text;
        var btnUiPlacement = thisButtonPrts.uiPlacement;
        // var iiconL = (!!thisButtonPrts.iiconL) ? '<i class="material-icons">'+ thisButtonPrts.iiconL +'</i>' : '';
        var iiconL = (!!thisButtonPrts.iiconL) ? '<i class="'+thisButtonPrts.iiconL+'"></i>' : '';
        var iiconR = (!!thisButtonPrts.iiconR) ? '<i class="material-icons">'+ thisButtonPrts.iiconR +'</i>' : '';
        var btnColor = (!!thisButtonPrts.btnColor) ? thisButtonPrts.btnColor : 'btn-blue';
        var onClickFunc = (!!thisButtonPrts.onClickFunc) ? 'onclick="' + thisButtonPrts.onClickFunc + '"' : '';
        var paddingL = (!!thisButtonPrts.paddingL) ? thisButtonPrts.paddingL : '';
        var disabled = thisButtonPrts.disabled;

        var multiple = (!!thisButtonPrts.multiple && thisButtonPrts.multiple === true) ? true : false;
        var SubButtons = (!!thisButtonPrts.buttons) ? thisButtonPrts.buttons : {};
        // Al-Mamun@2020-03-04--added button active status
        var stdBtnStatus = (!!stdBtnStatusObj[btnID]) ? stdBtnStatusObj[btnID] : {};
        var btnActiveStatus = (stdBtnStatus['active'] === false) ? false : true;

        $toolbarCell = $('<td/>');
        $toolbarCell.attr('class', 'x-toolbar-cell');
        $toolbarCell.appendTo($str);

        if(paddingL != ''){
          $toolbarCell.css('padding-left', paddingL);
        }

        // if(btnText == 'Help') $toolbarCell.appendTo($ltr);
        if(btnText == 'Help' || btnUiPlacement == 'right') $toolbarCell.appendTo($ltr);

        var $tTable = $('<table/>');
        $tTable.attr('cellspacing', '0');
        $tTable.attr('class', 'x-btn x-btn-text-icon');
        if(disabled == true) $tTable.addClass('x-item-disabled');
        // Al-Mamun@2020-03-04--added button active status
        if(btnActiveStatus == false) $tTable.addClass('x-item-disabled');
        $tTable.appendTo($toolbarCell);
        $tTableBody = $('<tbody/>');
        $tTableBody.appendTo($tTable);
        $tr = $('<tr/>');
        $tr.appendTo($tTableBody);
        $td = $('<td class="x-btn-mc" />');
        $td.appendTo($tr);

        $em = $('<em class="x-unselectable">');
        $em.appendTo($td);

        // $thisButton = $('<button type="button" class=" btn-blue">' + iiconL + btnText + iiconR +'</button>');
        $thisButton = $('<button type="button" id=" '+btnID+' " class=" '+ btnColor +' " '+onClickFunc+' >' + iiconL + btnText + iiconR +'</button>');
        $thisButton.addClass(btnClass);
        $thisButton.css({
        });


        if(multiple){
          var SubButtonsOptions = '';
          for (var key in SubButtons) {
            var val = SubButtons[key];
            var ActionFunction = val['ActionFunction'];
            var Text = val['text'];
            SubButtonsOptions += '<a class="dropdown-item" href="#" onclick="'+ActionFunction+';" >'+ Text +'</a>';
          }

          var SubButtonsDomStr = '\
          <div class="btn-group">\
            <button type="button" class="btn btn-sm btn-danger">Other Actions</button>\
            <button type="button" class="btn btn-sm btn-danger dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
              <span class="sr-only">Toggle Dropdown</span>\
            </button>\
            <div id="'+btnID+'-dropdown-menu" class="dropdown-menu">\
            '+SubButtonsOptions+'\
            </div>\
          </div>\
          ';
          var SubButtonsDomStr = '\
          <div class="btn-group '+btnGrpClass+'">\
            <button type="button" id="'+btnID+'" class="btn btn-sm btn-secondary '+btnClass + " " + btnColor +'">' + iiconL + btnText + '</button>\
            <button type="button" class="btn btn-sm btn-secondary dropdown-toggle dropdown-toggle-split '+btnColor+'  " data-toggle="alx-dropdown" aria-haspopup="true" aria-expanded="false" for-element="'+btnID+'" onclick="ZERP.Utils.toggleToolbarSubbuttons(this);" >\
              <span class="sr-only">Toggle Dropdown</span>\
            </button>\
          </div>\
          ';      
          $em.append(SubButtonsDomStr);

          var btnDropdownMenuDomStr = '\
            <div id="'+btnID+'-dropdown-menu" class="dropdown-menu">\
            '+SubButtonsOptions+'\
            </div>\
          ';

          $('body').find('#'+btnID+'-dropdown-menu').remove();
          $('body').append(btnDropdownMenuDomStr);


        } else {

          $thisButton.appendTo($em);  

        }


        
    }


    $('#ZERP_HeaderToolbar').empty().append($fTable);


}





ZERP.Utils.toggleToolbarSubbuttons = function(thisPtr){
  var forElement = $(thisPtr).attr('for-element');
  var toggleSubButtonsId = forElement + '-dropdown-menu';

  var orgButtonWidth = $('button#'+forElement).width();
  var tglButtonWidth = $(thisPtr).width();
  var totalMinusWidth = orgButtonWidth + tglButtonWidth;

  var offset = $(thisPtr).offset();
  // var xLeft = offset.left - 104;
  var xLeft = offset.left - totalMinusWidth;
  var xTop = offset.top + 30;

  if($('#'+toggleSubButtonsId).css('display') == 'none'){
    $('#'+toggleSubButtonsId).css({
      'display': 'block',
      left:xLeft + 'px',
      top: xTop + 'px',
    });
  } else {
    $('#'+toggleSubButtonsId).css({
      'display': 'none',
    });
  }

}



// var _width = window.innerWidth
// || document.documentElement.clientWidth
// || document.body.clientWidth;

// var _height = window.innerHeight
// || document.documentElement.clientHeight
// || document.body.clientHeight;


// /**
// * ERP Constant
// */
// var _ERP_leftSidePanelWidth_showMode = 220; // default
// var _ERP_leftSidePanelWidth_hideMode = 32; // default

// var _ERP_panelHeaderHeight = 125;
// var _ERP_panelHeaderHeight_NoTbar = 85;

// var _ERP_panelHeaderHeight = 40;
// var _ERP_panelHeaderHeight_NoTbar = 40;

// var _ERP_panelFooterHeight = 20;

// var _ERP_listGridPanelHeaderHeight = 60;


// var ZERP = ZERP || {};
// ZERP.UIManager = {};
// ZERP.UIManager.refixPanelsHeightWidth = function(){
//     makeGridPanleScrollable();
// }
















// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// var MYAPPLICATION = MYAPPLICATION || {};
// // create a general purpose namespace method
// // this will allow us to create namespace a bit easier
// MYAPPLICATION.createNS = function (namespace) {
//     var nsparts = namespace.split(".");
//     var parent = MYAPPLICATION;
 
//     // we want to be able to include or exclude the root namespace 
//     // So we strip it if it's in the namespace
//     if (nsparts[0] === "MYAPPLICATION") {
//         nsparts = nsparts.slice(1);
//     }
 
//     // loop through the parts and create 
//     // a nested namespace if necessary
//     for (var i = 0; i < nsparts.length; i++) {
//         var partname = nsparts[i];
//         // check if the current parent already has 
//         // the namespace declared, if not create it
//         if (typeof parent[partname] === "undefined") {
//             parent[partname] = {};
//         }
//         // get a reference to the deepest element 
//         // in the hierarchy so far
//         parent = parent[partname];
//     }
//     // the parent is now completely constructed 
//     // with empty namespaces and can be used.
//     return parent;
// };


// // Create the namespace for products
// MYAPPLICATION.createNS("MYAPPLICATION.MODEL.PRODUCTS");
 
// MYAPPLICATION.MODEL.PRODUCTS.product = function(width, height){
//     // private variables
//     var dimensions = {
//         width: width,
//         height: height
//     };
//     // private methods
//     // creating getWidth and getHeight
//     // to prevent access by reference to dimensions
//     var getWidth = function(){
//         return dimensions.width;
//     };
//     var getHeight = function(){
//         return dimensions.height;
//     };
//     // public API
//     return {
//         getWidth: getWidth,
//         getHeight: getHeight
//     };
// };


// // Create the namespace for the logic
// MYAPPLICATION.createNS("MYAPPLICATION.LOGIC.BUSINESS");
 
 
// MYAPPLICATION.LOGIC.BUSINESS.createAndAlertProduct = function () {
//     var model = MYAPPLICATION.MODEL.PRODUCTS;
//     var p = new model.product(50,100);
//     alert(p.getWidth() + " " + p.getHeight());
// };

// // Namespacing Strategies

// // Top level. All reusable code goes somewhere under this main object.
// var MyApp = {};

// // Widgets, and any components that manipulate the DOM.
// MyApp.UI = {};

// // Classes that have reusable logic or calculation.
// MyApp.Lib = {};

// // Custom code that works with external javascript libraries in a reusable way.
// MyApp.Vendor = {};

// // Generic utilities.
// MyApp.Utils = {};






// ZERP.UIManager.buildProcessList = function(UserName){    
// }

// /* When the user clicks on the button,
// toggle between hiding and showing the dropdown content */
// ZERP.UIManager.myFunctionShowPDL = function(){
//     document.getElementById("zErpProcessDropdown").classList.toggle("show");
//     document.getElementById("zErpProcessDropdown").style.display = "block";
// }

// ZERP.UIManager.filterFunctionPDL = function(){
//     var input, filter, ul, li, a, i;
//     input = document.getElementById("myInput");
//     filter = input.value.toUpperCase();
//     div = document.getElementById("zErpProcessDropdown");
//     a = div.getElementsByTagName("a");
//     for (i = 0; i < a.length; i++) {
//         if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
//             a[i].style.display = "block";
//         } else {
//             a[i].style.display = "none";
//         }
//     }
  
// }

// /////////////////////////////////////////////////////

// ZERP.callProcessEntity = function(processLink){
//     if(processLink == '' || processLink  == null) return;

//     // Way-1
//  var uri = window.location.href.toString();
//  if (uri.indexOf("?") > 0) {
//      var clean_uri = uri.substring(0, uri.indexOf("?"));
//      window.history.replaceState({}, document.title, clean_uri);
//  }

//  // Way-2
//     // if (window.location.href.indexOf('?') > -1) {
//     //     history.pushState('', document.title, window.location.pathname);
//     // }
//     // Way-3
//  // var clean_uri = location.protocol + "//" + location.host + location.pathname;
//  // window.history.replaceState({}, document.title, clean_uri);

//     var rAPIFile = processLink;
//     var _baseStructure;
//     var xEntityStructure;

//     var rSessionAPI = "/" + rAPIFile + '_api.php';
//     $.ajax({
//         url: rSessionAPI + '?reqType=getEntityStructure',
//         cache: false,
//     }).done(function(response) {
//         xEntityStructure = response;
//         _baseStructure = response;
//         console.log(JSON.parse(xEntityStructure));
//         ZERP.processEntity2(_baseStructure, rSessionAPI);

//         var xEntityStructureObj = JSON.parse(xEntityStructure);
//         // append custom JS and CSS
//         var cstDocJsURL = xEntityStructureObj._URL_MODULEDIR + '/cst-js/' + xEntityStructureObj.ENTITY_FORM_CST_JS;
//         var cstJsCode = document.createElement('script');
//         cstJsCode.type = 'text/javascript';
//         cstJsCode.src = cstDocJsURL;
//         document.getElementsByTagName('body')[0].appendChild(cstJsCode);  
              
//         var cstlistJsURL = xEntityStructureObj._URL_MODULEDIR + '/cst-js/' + xEntityStructureObj.ENTITY_LIST_CST_JS;
//         var cstJsCode = document.createElement('script');
//         cstJsCode.type = 'text/javascript';
//         cstJsCode.src = cstlistJsURL;
//         document.getElementsByTagName('body')[0].appendChild(cstJsCode);                

//     });

// }



// ZERP.processEntity2 = function(xEntityStructure, rSessionAPI){
//     var xEntityStructureObj = JSON.parse(xEntityStructure);
//     ZERP.BaseToolbar.buildGenericToolbar(xEntityStructure);
//     ZERP.BaseToolbar.buildCustomToolbar(xEntityStructure);
//     ZERP.UIManager.refixPanelsHeightWidth();
//     // ZERP.UIManager.buildObjetForm();

//     // load custom JS and CSS and append this in body
//     // by ajax request from class
//     // then execute below code

//     // set tittle
//     document.title = xEntityStructureObj.ENTITY_TITTLE;
//     $('#ERP_panel-listdoc-title').text(xEntityStructureObj.ENTITY_TITTLE);

//     // list processing
//     var listApiURL = rSessionAPI;
//     var _USERNAME = '';
//     var listparams = {listApiURL: listApiURL, _baseStructure:xEntityStructure, _USERNAME: _USERNAME};
//     LISTDOC.processList(listparams);

//     // document processing 
//     var formparams = {_baseStructure:xEntityStructure, _USERNAME: _USERNAME};
//     $.ajax({
//         url: rSessionAPI + '?reqType=buildObjetForm',
//     }).done(function(response) {
//         $('#formWrapper').empty().append(response);
//         erpdocument.processForm( '#formERP', formparams);    
//     });

// }
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////