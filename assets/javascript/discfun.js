var albumNameButton = $(".slot-content-album");

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