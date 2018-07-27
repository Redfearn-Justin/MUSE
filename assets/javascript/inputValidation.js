//disable submit button by default
$(".search-input-submit").prop('disabled', true);

//check input for validity and enable
$(document).on("keyup", ".myInput", function () {
    var artistSearchValidCheck = $(".myInput").val().trim();
    var artistAudioDBIdQuery = queryPrefix + "/searchalbum.php?s=" + artistSearchValidCheck;
    var inputBar = $(".myInput");
    $.ajax({
        url: artistAudioDBIdQuery,
        method: "GET"
    })
        .then(function (response) {
            if (response.album !== null) {
                $(".search-input-submit").prop('disabled', false);
                inputBar.removeClass("noInput");
                inputBar.attr("placeholder", "Search");
            }
            else {
                $(".search-input-submit").prop('disabled', true);
                inputBar.addClass("noInput");
                inputBar.attr("placeholder", "Required!");
            }
        })
});
