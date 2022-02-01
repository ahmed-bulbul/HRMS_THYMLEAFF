
function renderMonthlyServiceRequestChart(jsonObj) {


  // Get context with jQuery - using jQuery's .get() method.
  var salesChartCanvas = $('#salesChart').get(0).getContext('2d');

  var salesChartData = {
    labels  : ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label               : 'Number of Request',
        backgroundColor     : 'rgba(60,141,188,0.9)',
        borderColor         : 'rgba(60,141,188,0.8)',
        pointRadius          : false,
        pointColor          : '#3b8bba',
        pointStrokeColor    : 'rgba(60,141,188,1)',
        pointHighlightFill  : '#fff',
        pointHighlightStroke: 'rgba(60,141,188,1)',
        data                : [28, 48, 40, 19, 86, 27, 90]
      },
      // {
      //   label               : 'Electronics',
      //   backgroundColor     : 'rgba(210, 214, 222, 1)',
      //   borderColor         : 'rgba(210, 214, 222, 1)',
      //   pointRadius         : false,
      //   pointColor          : 'rgba(210, 214, 222, 1)',
      //   pointStrokeColor    : '#c1c7d1',
      //   pointHighlightFill  : '#fff',
      //   pointHighlightStroke: 'rgba(220,220,220,1)',
      //   data                : [65, 59, 80, 81, 56, 55, 40]
      // },
    ]
  };

  var salesChartOptions = {
    maintainAspectRatio : false,
    responsive : true,
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        gridLines : {
          display : false,
        }
      }],
      yAxes: [{
        gridLines : {
          display : false,
        }
      }]
    }
  };

  // override data by us
  salesChartData['labels'] = jsonObj['months'];
  salesChartData['datasets'][0]['data'] = jsonObj['totalReqs'];

  // This will get the first returned node in the jQuery collection.
  var salesChart = new Chart(salesChartCanvas, { 
      type: 'line', 
      data: salesChartData, 
      options: salesChartOptions
    }
  )

  //---------------------------
  //- END MONTHLY SALES CHART -
  //---------------------------


}





function showTargetElmProcessinOverlay(targetOverlayEml, messageStr){
  if(!!!messageStr) messageStr = "Processing, please wait.";
  if(messageStr == "") messageStr = "Processing, please wait.";

  $('body').find('#myProcessinOverlay').remove();
  var processinOverlay = '<div id="myProcessinOverlay" class="myProcessinOverlay">\
    <div class="myProcessinOverlay-content" id="myProcessinOverlay-content">\
      <div id="myProcessinOverlay-loadingDiv">\
        <center><i class="fas fa-spinner fa-spin"></i></center>\
      </div>\
      <div class="myProcessinOverlay-body" id="myProcessinOverlay-body">\
        <div id="myProcessinOverlay-message" style="color:black; font-weight:bold; font-size:20px;"><center>'+messageStr+'</center></div>\
      </div>\
    </div>\
  </div>';
  $('body').append(processinOverlay);


  var offset = $('#'+targetOverlayEml).offset();
  var xLeft = offset.left;
  var xTop = offset.top;
  var height = $('#'+targetOverlayEml).height();

  // apply css ---------
  $('.myProcessinOverlay').css({
  'position':'fixed',
  'z-index':'9999',
  // 'padding-top': windowHeight_XX+'px',
  'left': xLeft +'px',
  'top': xTop + 'px',
  'width':'100%',
  'height': height + 'px',
  'background-color':'white',
  'opacity': '0.8',
  });
  return;
}


function removeTargetElmProcessingOverlay(targetOverlayEml){
  $('body').find('#myProcessinOverlay').remove();  
}






function loadMonthlyServiceRequestData(searchParams){

    $.ajax({
      async: true,
      method: "GET",
      // url: "http://localhost:7171/thikthak/api/loadServiceReqChartData",
      url: SysParams.appContextPath + "api/loadServiceReqChartData",
      data: searchParams,
      cache: false,
      beforeSend: function( jqXHR, settings ) {
        showTargetElmProcessinOverlay('cd_chartFromToLabelLoader');
      }

    }).done(function( response, textStatus, xhr ) {

      removeTargetElmProcessingOverlay('cd_chartFromToLabelLoader');
      // var jsonObj = JSON.parse(response);
      renderMonthlyServiceRequestChart(response);

    }).fail(function() {

      alert( "error" );

    });


}


function filterServiceRequestChartData(thisPtr){

  var params = jsClient.paramsToObj(window.location.search);
  $('#cdFilterParameterForm').find('input, select').each(function(thisElm){
    console.log($(this).val());
  });

  var searchParams = {};
  searchParams['cd_fromDate'] = $('#cdFilterParameterForm #cd_fromDate').val();
  searchParams['cd_toDate'] = $('#cdFilterParameterForm #cd_toDate').val();

  loadMonthlyServiceRequestData(searchParams);

  // 
  var fromDate = new Date(searchParams['cd_fromDate']);
  var toDate = new Date(searchParams['cd_toDate']);
  var fromDate7 = moment(fromDate).format("MMM Do YYYY");
  var toDate7 = moment(toDate).format("MMM Do YYYY");
  $('#cd_chartFromToLabel strong').text("Service: " + fromDate7 + " - " + toDate7);
}



function initDateRangePicker(){

  $('#cd_fromDate').daterangepicker({
      singleDatePicker: true,
      showDropdowns: false,
      autoUpdateInput: false,
      autoApply: true,
      minYear: 1901,
      locale: {
          format: "YYYY-MM-DD",
          cancelLabel: 'Cancel',
          applyLabel: "Apply",
      }
  }, function(start, end, label) {
      $('#cd_fromDate').val(start.format('YYYY-MM-DD'));
  });

  $('#cd_toDate').daterangepicker({
      singleDatePicker: true,
      showDropdowns: false,
      autoUpdateInput: false,
      autoApply: true,
      minYear: 1901,
      locale: {
          format: "YYYY-MM-DD",
          cancelLabel: 'Cancel',
          applyLabel: "Apply",
      }
  }, function(start, end, label) {
    $('#cd_toDate').val(start.format('YYYY-MM-DD'));
  });


}



$(document).ready(function(){
  initDateRangePicker();
  var searchParams = {};
  loadMonthlyServiceRequestData(searchParams);
});

