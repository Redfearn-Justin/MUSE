var searchName = "";
var searchNamePlus = "";
var searchNameNoSpace = "";
var showBuyTicketURL = "";

var artistName = "";
var artistBanner = "";

$(document).on("click", ".show-buy-tickets", function (){
    window.open(showBuyTicketURL);
});

$("#search-button-x").on("click", function (event) {
    event.preventDefault();
    $("#myInput").val("");
});

$("#search-button-submit").on("click", function (event) {
    event.preventDefault();

    var value = $("#myInput").val().trim();
    searchName = value
    searchNamePlus = value.split(' ').join('+');
    searchNameNoSpace = value.replace(/\s+/g, '');

    $.ajax({
        url: "https://app.ticketmaster.com/discovery/v2/events.json?format=ajax&keyword=" + searchNamePlus + "&size=1&apikey=ZgJGOucLYGUGeSJ6U1KvDW1tOCTObkMy",
        method: "GET",
    }).then(function (response) {
        
        console.log(response);
        var event = response._embedded.events[0];
        var eName = response._embedded.events[0].name;
        var eDate = response._embedded.events[0].dates.start.localDate;
        var eVenue = response._embedded.events[0]._embedded.venues[0].name;
        var eCountryCode = response._embedded.events[0]._embedded.venues[0].country.countryCode;
        var eState = response._embedded.events[0]._embedded.venues[0].state.name;
        var eCityName = response._embedded.events[0]._embedded.venues[0].city.name;
        var eImage = response._embedded.events[0].images[1].url;
        showBuyTicketURL = response._embedded.events[0].url;
        
        $("#show-title").empty();
        $("#show-venue").empty();
        $("#show-city").empty();
        $("#show-state").empty();
        $("#show-country").empty();
        $("#show-date").empty();
        $("#show-title").append(eName);
        $("#show-venue").append(eVenue);
        $("#show-city").append(eCityName);
        $("#show-state").append(eState);
        $("#show-country").append(eCountryCode);
        $("#show-date").append(eDate);
        $(".show-image").css("background-image", `url("${eImage}")`);

    });


    $.ajax({
        url: "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&publishedAfter=2014-01-01T00%3A00%3A00Z&q=" + searchNamePlus + "&type=video&key=AIzaSyCgx6pi_0yRLlDdsCEGs19vZGH5dreIX8A",
        method: "GET",
    }).then(function (response) {
        var vidID = response.items[0].id.videoId;
        $("#youtube-video").html(`<iframe src="https://www.youtube.com/embed/${vidID}" frameborder="0" allowfullscreen></iframe>`)

    });


    $.ajax({
        url: `http://www.theaudiodb.com/api/v1/json/195003/search.php?s=${searchNamePlus}`,
        method: "GET",
    }).then(function (response) {
        console.log(response);
        var artistName = response.artists[0].strArtist;
        var artistThumbURL = response.artists[0].strArtistThumb;
        var artistDesc = response.artists[0].strBiographyEN;


        $(".info-slot-image").css("background-image", `url("${artistThumbURL}")`);
        $(".info-slot-image-name").text(artistName);
        $(".info-desc-box").text(artistDesc);

    });

});