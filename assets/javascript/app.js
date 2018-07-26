var searchName = "";
var searchNamePlus = "";
var searchNameNoSpace = "";
var showBuyTicketURL = "";
var newsGoToURL = "";

var artistName = "";
var artistBanner = "";


$(document).on("click", ".news-go-to-article", function () {
    window.open(newsGoToURL);
});

$(document).on("click", ".show-buy-tickets", function () {
    window.open(showBuyTicketURL);
});

$(document).on("click", "#search-button-x", function (event) {
    event.preventDefault();
    $("#myInput").val("");
});


$(document).on("click", "#search-button-submit", function (event) {
    event.preventDefault();

    searchButton();

});

$(document).on("click", "#splash-search-button-submit", function (event) {
    event.preventDefault();

    searchButtonSplash()

});


// Main search function
function searchButton() {

    $("#no-upcoming-show").empty();
    $("#no-news").empty();
    $("#show-content-for-hide").show();
    $("#news-content-for-hide").show();
    $("#discography").empty();

    var value = $("#myInput").val().trim();
    searchName = value
    searchNamePlus = value.split(' ').join('+');
    searchNameNoSpace = value.replace(/\s+/g, '');


    // TicketMaster API AJAX Call
    $.ajax({
        url: "https://app.ticketmaster.com/discovery/v2/events.json?format=ajax&keyword=" + searchNamePlus + "&size=1&apikey=ZgJGOucLYGUGeSJ6U1KvDW1tOCTObkMy",
        method: "GET",
    }).then(function (response) {


        if (response.page.totalElements == 0) {
            $("#no-upcoming-show").html("Sorry, no upcoming shows for this artist!");
            $("#show-content-for-hide").hide();
        } else {

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

        }

    });


    // YouTube API AJAX Call
    $.ajax({
        url: "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&publishedAfter=2014-01-01T00%3A00%3A00Z&q=" + searchNamePlus + "&type=video&key=AIzaSyCgx6pi_0yRLlDdsCEGs19vZGH5dreIX8A",
        method: "GET",
    }).then(function (response) {
        var vidID = response.items[0].id.videoId;
        $("#youtube-video").html(`<iframe src="https://www.youtube.com/embed/${vidID}" frameborder="0" allowfullscreen></iframe>`)

    });


    // AudioDB API AJAX Call (For Artist Info)
    $.ajax({
        url: `http://www.theaudiodb.com/api/v1/json/195003/search.php?s=${searchNamePlus}`,
        method: "GET",
    }).then(function (response) {

        var artistName = response.artists[0].strArtist;
        var artistThumbURL = response.artists[0].strArtistThumb;
        var artistDesc = response.artists[0].strBiographyEN;


        $(".info-slot-image").css("background-image", `url("${artistThumbURL}")`);
        $(".info-slot-image-name").text(artistName);
        $(".info-desc-box").text(artistDesc);

    });


    // NewsAPI AJAX Call
    $.ajax({
        url: `https://newsapi.org/v2/everything?q=+%22${searchNamePlus}%22&sortBy=relevancy&pageSize=1&from=2018-01-01&langunge=en&domains=buzzfeed.com,wired.com,abcnews.go.com,cnn.com,ew.com,fortune.com,mashable.com,newsweek.com,time.com,usatoday.com,wsj.com&apiKey=b41fba392394421eb2ab979c343a2812`,
        method: "GET",
    }).then(function (response) {

        if (response.totalResults == 0) {
            $("#no-news").html("Sorry, no recent news for this artist!");
            $("#news-content-for-hide").hide();
        } else {
            console.log(response);
            var nTitle = response.articles[0].title;
            var nDesc = response.articles[0].description;
            var nSource = response.articles[0].source.name;
            var nImage = response.articles[0].urlToImage;
            newsGoToURL = response.articles[0].url;

            $("#news-title").empty();
            $("#news-desc").empty();
            $("#news-source").empty();
            $("#news-title").append(nTitle);
            $("#news-desc").append(nDesc);
            $("#news-source").append(nSource);

            $(".news-image").css("background-image", `url("${nImage}")`);
        }

    });

}


// Main search function
function searchButtonSplash() {

    $("#no-upcoming-show").empty();
    $("#no-news").empty();
    $("#show-content-for-hide").show();
    $("#news-content-for-hide").show();
    $("#discography").empty();
    $("#splash-screen").hide();

    var value = $("#myInputSplash").val().trim();
    searchName = value
    searchNamePlus = value.split(' ').join('+');
    searchNameNoSpace = value.replace(/\s+/g, '');


    // TicketMaster API AJAX Call
    $.ajax({
        url: "https://app.ticketmaster.com/discovery/v2/events.json?format=ajax&keyword=" + searchNamePlus + "&size=1&apikey=ZgJGOucLYGUGeSJ6U1KvDW1tOCTObkMy",
        method: "GET",
    }).then(function (response) {


        if (response.page.totalElements == 0) {
            $("#no-upcoming-show").html("Sorry, no upcoming shows for this artist!");
            $("#show-content-for-hide").hide();
        } else {

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

        }

    });


    // YouTube API AJAX Call
    $.ajax({
        url: "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&publishedAfter=2014-01-01T00%3A00%3A00Z&q=" + searchNamePlus + "&type=video&key=AIzaSyCgx6pi_0yRLlDdsCEGs19vZGH5dreIX8A",
        method: "GET",
    }).then(function (response) {
        var vidID = response.items[0].id.videoId;
        $("#youtube-video").html(`<iframe src="https://www.youtube.com/embed/${vidID}" frameborder="0" allowfullscreen></iframe>`)

    });


    // AudioDB API AJAX Call (For Artist Info)
    $.ajax({
        url: `http://www.theaudiodb.com/api/v1/json/195003/search.php?s=${searchNamePlus}`,
        method: "GET",
    }).then(function (response) {

        var artistName = response.artists[0].strArtist;
        var artistThumbURL = response.artists[0].strArtistThumb;
        var artistDesc = response.artists[0].strBiographyEN;


        $(".info-slot-image").css("background-image", `url("${artistThumbURL}")`);
        $(".info-slot-image-name").text(artistName);
        $(".info-desc-box").text(artistDesc);

    });


    // NewsAPI AJAX Call
    $.ajax({
        url: `https://newsapi.org/v2/everything?q=+%22${searchNamePlus}%22&sortBy=relevancy&pageSize=1&from=2018-01-01&langunge=en&domains=buzzfeed.com,wired.com,abcnews.go.com,cnn.com,ew.com,fortune.com,mashable.com,newsweek.com,time.com,usatoday.com,wsj.com&apiKey=b41fba392394421eb2ab979c343a2812`,
        method: "GET",
    }).then(function (response) {

        if (response.totalResults == 0) {
            $("#no-news").html("Sorry, no recent news for this artist!");
            $("#news-content-for-hide").hide();
        } else {
            console.log(response);
            var nTitle = response.articles[0].title;
            var nDesc = response.articles[0].description;
            var nSource = response.articles[0].source.name;
            var nImage = response.articles[0].urlToImage;
            newsGoToURL = response.articles[0].url;

            $("#news-title").empty();
            $("#news-desc").empty();
            $("#news-source").empty();
            $("#news-title").append(nTitle);
            $("#news-desc").append(nDesc);
            $("#news-source").append(nSource);

            $(".news-image").css("background-image", `url("${nImage}")`);
        }

    });

}