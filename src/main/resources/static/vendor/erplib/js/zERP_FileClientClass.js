var ZERP = ZERP || {};
ZERP.FileClient = ZERP.FileClient || {};

ZERP.FileClient.activeFilePtr;
ZERP.FileClient.activeFileParams;
ZERP.FileClient.createModeFileUpload = false;


ZERP.FileClient.FileClientClass = function(){
	// Private attributes
	var _apiURL = '/360ba/src-ent/api/FileClientAPI.php';
	var _apiURL = ZERP.System.contextPath + '/systemMultimedia/processClientRequest/';

	// Public Attributes
	this._apiURL = '/360ba/src-ent/api/FileClientAPI.php';
	this._apiURL = ZERP.System.contextPath + '/systemMultimedia/processClientRequest/';


	// Private methods
	function fnFileUploaderCallBackFunction(apiResult){
		// var params = paramsToObj(window.location.search);
		// var docnumber     = params.docnumber;
		// var directoryPath = "/attachments/erp-apparel/"+ docnumber;
		// LIZERP.readFile(directoryPath, '.fileViewerContainer');
		$('#CoverImagePath').val(apiResult.uploadedFilepath);
	}

    function fileUploader(formData, _apiURL){
		$.ajax({
			url : _apiURL,
			type : 'POST',
			data : formData,
			processData: false,  // tell jQuery not to process the data
			contentType: false,  // tell jQuery not to set contentType
			xhr: function(){
				//upload Progress
				var xhr = $.ajaxSettings.xhr();
				if (xhr.upload) {
					xhr.upload.addEventListener('progress', function(event) {
						var percent = 0;
						var position = event.loaded || event.position;
						var total = event.total;
						if (event.lengthComputable) {
							percent = Math.ceil(position / total * 100);
						}
						// update progressbar
						// Create necessary div tag and show progress
						$("#progress-wrp .progress-bar").css("width", + percent +"%");
						$("#progress-wrp .status").text(percent +"%");
					}, true);
				}
				return xhr;
			},
			success : function(data) {
				console.log("-->"+data);
				var returnBean = JSON.parse(data);
				var result = returnBean.result;

				var tf = '';
				if(formData.has('fileUploaderCallBackFunction')){
					tf = formData.get('fileUploaderCallBackFunction');
				}

				if(result == 'success'){
					$('.form-file-upload #output').text('File uploaded successfully');
					$('.form-file-upload .btnClose').css('display', 'block');
					if(typeof tf !== "undefined" && tf != "undefined" && tf != '' && tf != null){
						/*Simple Example
						// Function name to invoke
						var fnName = "helloWorld";
						// Params to pass to the function
						var params = "ctrlq.org"
						// Call function using Window object
						window[fnName](params);						
						*/
						// executeFunctionByName("My.Namespace.functionName", window, arguments);
						// runFunctionByName(tf, window, arguments);
						executeFunctionByName(tf, window, returnBean);
					} else {
						fnFileUploaderCallBackFunction(returnBean);
					}


				} else {
					$('.form-file-upload #output').text('Fail to file uploaded. \nTry againg ');
					$('.form-file-upload .btnClose').css('display', 'block');
					if(typeof tf !== "undefined" && tf != "undefined" && tf != '' && tf != null){
						executeFunctionByName(tf, window, returnBean);
					} else {
						fnFileUploaderCallBackFunction(returnBean);
					}


				}
			}
		}).fail(function(e) {
		    console.log(e);
		    console.log(e.responseText);
		    jsClient.renderFormError(e.responseText)
		});

	}


	function processFileForUpload(input, reqparams){
	  	var saveFilepathInDB = false;
	  	var filepathSavingDBKeys = '';
	  	var filepathSavingDBTableName = '';
	  	var filepathSavingColumnName = '';
	  	var fileUploadDirectory = '';
	  	var fileUploaderCallBackFunction = '';
	  	var filepathSavingDomainName = ''
	  	var filepathSavingDomainKeyAttributeName = '';
	  	var filepathSavingDomainKeyAttributeValue = '';

	  	saveFilepathInDB = (!!reqparams.saveFilepathInDB) ? reqparams.saveFilepathInDB : saveFilepathInDB; 
	  	filepathSavingDBKeys = (!!reqparams.filepathSavingDBKeys) ? reqparams.filepathSavingDBKeys : filepathSavingDBKeys; 
	  	fileUploadDirectory = (!!reqparams.fileUploadDirectory) ? reqparams.fileUploadDirectory : fileUploadDirectory; 
	  	filepathSavingDBTableName = (!!reqparams.filepathSavingDBTableName) ? reqparams.filepathSavingDBTableName : filepathSavingDBTableName; 
	  	filepathSavingColumnName = (!!reqparams.filepathSavingColumnName) ? reqparams.filepathSavingColumnName : filepathSavingColumnName; 
	  	fileUploaderCallBackFunction = (!!reqparams.fileUploaderCallBackFunction) ? reqparams.fileUploaderCallBackFunction : fileUploaderCallBackFunction; 
	  	filepathSavingDomainName = (!!reqparams.filepathSavingDomainName) ? reqparams.filepathSavingDomainName : filepathSavingDomainName; 
	  	filepathSavingDomainKeyAttributeName = (!!reqparams.filepathSavingDomainKeyAttributeName) ? reqparams.filepathSavingDomainKeyAttributeName : filepathSavingDomainKeyAttributeName; 
	  	filepathSavingDomainKeyAttributeValue = (!!reqparams.filepathSavingDomainKeyAttributeValue) ? reqparams.filepathSavingDomainKeyAttributeValue : filepathSavingDomainKeyAttributeValue; 

	  	// validation
	  	if(fileUploadDirectory == '' || fileUploadDirectory == null){
	  		alert('File upload directory is mandatory');
	  		return;
	  	}

		var formData = new FormData();
		for (var i = 0; i < input.files.length; i++) {
			if (input.files && input.files[i]) {
				var file = input.files[i];
				var fileName = file.name;
			}
			formData.append('file_'+i, file);
		}

		formData.append('saveFilepathInDB', saveFilepathInDB);
		formData.append('filepathSavingDBKeys', JSON.stringify( filepathSavingDBKeys ) );
		formData.append('fileUploadDirectory', fileUploadDirectory);
		formData.append('filepathSavingDBTableName', filepathSavingDBTableName);
		formData.append('filepathSavingColumnName', filepathSavingColumnName);
		formData.append('fileUploaderCallBackFunction', fileUploaderCallBackFunction);
		formData.append('filepathSavingDomainName', filepathSavingDomainName);
		formData.append('filepathSavingDomainKeyAttributeName', filepathSavingDomainKeyAttributeName);
		formData.append('filepathSavingDomainKeyAttributeValue', filepathSavingDomainKeyAttributeValue);

		formData.append('rReqType', 'uploadFile');
	    _apiURL = ZERP.System.contextPath + '/systemMultimedia/processClientRequest/';
		fileUploader(formData, _apiURL);

	}



	//SRC: https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_fileupload_files
	function showFileNameAndSize(){
	    var x = document.getElementById("myFile");
	    var txt = "";
	    if ('files' in x) {
	        if (x.files.length == 0) {
	            txt = "Select one or more files.";
	        } else {
	            for (var i = 0; i < x.files.length; i++) {
	                txt += "<br><strong>" + (i+1) + ". file</strong><br>";
	                var file = x.files[i];
	                if ('name' in file) {
	                    txt += "name: " + file.name + "<br>";
	                }
	                if ('size' in file) {
	                    txt += "size: " + file.size + " bytes <br>";
	                }
	            }
	        }
	    } 
	    else {
	        if (x.value == "") {
	            txt += "Select one or more files.";
	        } else {
	            txt += "The files property is not supported by your browser!";
	            txt  += "<br>The path of the selected file: " + x.value; // If the browser does not support the files property, it will return the path of the selected file instead. 
	        }
	    }
	    document.getElementById("demo").innerHTML = txt;
	}



	// Public methods
	this.processFileForUpload = function(input, reqparams){
		processFileForUpload(input, reqparams);
	}


	this.previewSingleFile = function(inputFile){

		if (inputFile.files && inputFile.files[0]) {

			var reader = new FileReader();
			reader.onload = function (e) {
	            $('.ZERP_EntryCt .img-thumbnail')
	              .attr('src', e.target.result)
	              .width(140)
	              .height(90);
			};
			reader.readAsDataURL(inputFile.files[0]);
		}

		// show file name
		var file = inputFile.files[0];
		var label = file.name;
		var size = file.size;
		$(inputFile).next('.custom-file-label').html(label);
		$('.file-size-container').text(size);

	}




}

ZERP.FileClient.processFileParamsForUploadFiles = function(){
	var fileParams = {};
	return fileParams;
}





// Public API for use
ZERP.FileClient.onChangeHandleSingleFile = function(thisPtr){
	var fileClient = new ZERP.FileClient.FileClientClass();
	fileClient.previewSingleFile(thisPtr);
	var fileParams = ZERP.FileClient.processFileParamsForUploadFiles();
	fileClient.processFileForUpload(thisPtr, fileParams);
}




// public method to access class method ...................................................
// How to use
function zerpUploadFile(input){
	var reqparams = {};
	reqparams.fileUploadDirectory = '/mutimedia';
	var fileClient = new ZERP.FileClient.FileClientClass();
	fileClient.processFileForUpload(input, reqparams);

	// OR Like This

	var file    = document.querySelector('#'+modalContainerID+' input[type=file]').files[0];
	var title = file.name;
	var files   = document.querySelector('#'+modalContainerID+' input[type=file]');
	var input = files;
	fileClient.processFileForUpload(input, reqparams);
}

function fileUploaderCallBackFunction(){

}
