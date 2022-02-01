
// Author: Al-Mamun
// CreationDate: 2020-12-10
// LastUpdateDate: 2020-12-10


function bindLMenuClickEvent(){

	// root // first element handling
	$('ul.nav-sidebar > li.nav-item').click(function(e){

	    // e.preventDefault();
	    // e.stopPropagation();

		var mCode = $(this).attr("mcode");
		console.log("@click----->");
		console.log(mCode);
		// alert(mCode);

		var lsMCode = window.localStorage.getItem(mCode);
		if(lsMCode === null){
			// this user not set yet
			window.localStorage.setItem(lsMCode, 'Yes');
		} else if(lsMCode == "Yes"){
			window.localStorage.setItem(lsMCode, 'No');
		} else {
			window.localStorage.setItem(lsMCode, 'Yes');
		}

		var clickMenuCode = window.localStorage.getItem("clickMenuCode");
		var clickMenuCodeCode = window.localStorage.getItem("clickMenuCode_" + mCode);
		console.log(clickMenuCode);
		console.log(clickMenuCodeCode);

		// if previous exist and change menu
		// then clean previous
		if(!!clickMenuCode && clickMenuCode != null){
			if(mCode != clickMenuCode){
				clickMenuCodeCode = null;
				window.localStorage.removeItem("clickMenuCode");
				window.localStorage.removeItem("clickMenuCode_" + clickMenuCode);
			}
		}

		// set toggle
		if(!!clickMenuCodeCode && clickMenuCodeCode != null){
			window.localStorage.removeItem("clickMenuCode");
			window.localStorage.removeItem("clickMenuCode_" + mCode);
			console.log("@I am null set...");
		} else {
			window.localStorage.setItem("clickMenuCode", mCode);
			window.localStorage.setItem("clickMenuCode_" + mCode, mCode);
			console.log("@I am not null...");
		}

		// selected
		window.localStorage.setItem("clickMenuCode_Selected", mCode);

	});



	// second element handling
	$('ul.nav-sidebar > li.nav-item > ul > li').click(function(e){ 

	    // e.preventDefault();
	    e.stopPropagation();

		var mCode = $(this).attr("mcode");
		console.log("@click----->");
		console.log(mCode);
		// alert(mCode);

		// selected
		window.localStorage.setItem("clickMenuCode_Selected", mCode);

	});



}



function setClickMenuAndFocus(){

	var clickMenuCode = window.localStorage.getItem("clickMenuCode");
	console.log(clickMenuCode);
	if(!!clickMenuCode && clickMenuCode != null){

		// $('ul.nav-sidebar').find("li[mCode='"+clickMenuCode+"']").click();
		$('ul.nav-sidebar').find("li[mCode='"+clickMenuCode+"']").addClass('menu-open');
		console.log($('ul.nav-sidebar').find("li[mCode='"+clickMenuCode+"']"));

	}

	var clickMenuCode_Selected = window.localStorage.getItem("clickMenuCode_Selected");
	if(!!clickMenuCode_Selected && clickMenuCode_Selected != null){
		$('ul.nav-sidebar').find("li[mCode='"+clickMenuCode_Selected+"'] > a").css('color', '#007bff');
	}

}



// Main
$(document).ready(function(){

  if (typeof(Storage) !== "undefined") {

  	bindLMenuClickEvent();
  	setClickMenuAndFocus();

  }

});

