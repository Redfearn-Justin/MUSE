//disable submit button by default
// $(".search-input-submit").prop('disabled', true);

//check input for validity and enable
// $(document).on("keyup", ".myInput", function () {
//     var artistSearchValidCheck = $(".myInput").val().trim();
//     var artistAudioDBIdQuery = queryPrefix + "/searchalbum.php?s=" + artistSearchValidCheck;
//     var inputBar = $(".myInput");
//     $.ajax({
//         url: artistAudioDBIdQuery,
//         method: "GET"
//     })
//         .then(function (response) {
//             if (response.album !== null) {
//                 $(".search-input-submit").prop('disabled', false);
//                 inputBar.removeClass("noInput");
//                 inputBar.attr("placeholder", "Search");
//             }
//             else {
//                 $(".search-input-submit").prop('disabled', true);
//                 inputBar.addClass("noInput");
//                 inputBar.attr("placeholder", "Required!");
//             }
//         })
// });

$("#failed-search").hide();

$(".search-bar").on("click", ".search-button-submit", function (event) {
    var inputBar = $(".myInput");
    var inputBarContent = inputBar.val().trim();
    if (inputBarContent.length < 1) {
        inputBar.addClass("noInput");
        inputBar.attr("placeholder", "Required!");
        $("#main-container").hide();
        $("#failed-search").show();
        $("footer").css("position", "absolute")
    }
    else {
        inputBar.removeClass("noInput");
        inputBar.attr("placeholder", "Search");
        $("#main-container").show();
        $("#failed-search").hide();
        $("footer").css("position", "relative")
    }
});