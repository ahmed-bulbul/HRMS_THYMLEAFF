var toggler = document.getElementsByClassName("caret");
var toggler = document.getElementsByClassName("caret-parentmenu");
var i;

for (i = 0; i < toggler.length; i++) {
  toggler[i].addEventListener("click", function() {
    this.parentElement.querySelector(".nested").classList.toggle("active");
    // this.classList.toggle("caret-down");
    this.parentElement.querySelector(".caret").classList.toggle("caret-down");
  });
}
