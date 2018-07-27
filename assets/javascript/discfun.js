var albumNameButton = $(".slot-content-album");

//track list expand/collapse
$("#discography").on("click", ".slot-content-album", function (event) {
    var trackExpand = $(this).attr("data-expand")
    var content = $(this).children();
    if (trackExpand === "expanded") {
        // console.log("collapsing");
        $(this).attr("data-expand", "collapsed");
        content.css("display", "none");
    }
    else {
        $(this).attr("data-expand", "expanded");
        // console.log("expanding");
        content.css("display", "block");
    }
});

var coll2 = document.getElementsByClassName("info-desc-button");
var j;

for (j = 0; j < coll2.length; j++) {
    coll2[j].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
}