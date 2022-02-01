



function filterServiceOrderList(thisPtr) {
	var params = jsClient.paramsToObj(window.location.search);
	$('#qFilterParameterForm').find('input, select').each(function(thisElm){
		// console.log(this.value);
		console.log($(this).val());

	});

	params['orderPlaceTimeFrom'] = $('#qFilterParameterForm #fromDate').val();
	params['orderPlaceTimeTo'] = $('#qFilterParameterForm #toDate').val();
	params['orderCode'] = $('#qFilterParameterForm #orderCode').val();
	params['adv_byChooseParam'] = $('#qFilterParameterForm #adv_byChooseParam').val();

	var queryString = jsClient.paramsToQueryStringEncode(params);
	var next_href = window.location.origin + window.location.pathname + '?' + queryString;
	window.location.href = next_href;
	return;
}


function setFilterFormData() {
	var params = jsClient.paramsToObj(window.location.search);
	var adv_byChooseParam = params['adv_byChooseParam'];
	$('#qFilterParameterForm #adv_byChooseParam').val(adv_byChooseParam);
}




// Main method
$(document).ready(function() {


	$('#fromDate').daterangepicker({
	    singleDatePicker: true,
	    showDropdowns: true,
	    autoUpdateInput: false,
	    minYear: 1901,
	    locale: {
	        format: "YYYY-MM-DD",
	        cancelLabel: 'Cancel',
	        applyLabel: "Apply",
	    }
	}, function(start, end, label) {
	    console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
	    $('#fromDate').val(start.format('YYYY-MM-DD'));
	});

	$('#toDate').daterangepicker({
	    singleDatePicker: true,
	    showDropdowns: false,
	    autoUpdateInput: false,
	    minYear: 1901,
	    locale: {
	        format: "YYYY-MM-DD",
	        cancelLabel: 'Cancel',
	        applyLabel: "Apply",
	    }
	}, function(start, end, label) {
		$('#toDate').val(start.format('YYYY-MM-DD'));
	});


	setFilterFormData();

});
