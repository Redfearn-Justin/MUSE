var searchName = "";
var searchNamePlus = "";
var searchNameNoSpace = "";
var showBuyTicketURL = "";
var newsGoToURL = "";

var artistName = "";
var artistBanner = "";

var keyAPI = "195003";
var artistSearch;
var audioDBArtist;

var albumIdArray = [];
var albumIdTitleArray = [];
var albumIdReleaseYearArray = [];
var albumIdCoverURL = [];

var queryPrefix = "https://www.theaudiodb.com/api/v1/json/" + keyAPI;

function renderAlbums() {
    //for each album...
    for (var i = 0; i < albumIdTitleArray.length; i++) {
        var newAlbumDiv = $("<div>");
        var albumArt = $("<img>");
        var albumArtUrl = albumIdCoverURL[i];
        albumArt.addClass("thumbnailArt");
        albumArt.attr("src", albumArtUrl);
        newAlbumDiv.prepend(albumArt);
        var albumNameContainer = $("<p>");
        albumNameContainer.addClass("albumNameStyle");
        var albumNameText = albumIdTitleArray[i];
        albumNameContainer.text(albumNameText);
        newAlbumDiv.append(albumNameContainer);
        newAlbumDiv.addClass("slot-content-album");
        var albumTrackQuery = queryPrefix + "/track.php?m=" + albumIdArray[i];
        newAlbumDiv.attr("data-query", albumTrackQuery);
        newAlbumDiv.attr("data-state", "not-rendered");
        $("#discography").append(newAlbumDiv);
    }
};

$(document).on("click", ".news-go-to-article", function () {
    window.open(newsGoToURL);
});

$(document).on("click", ".show-buy-tickets", function () {
    window.open(showBuyTicketURL);
});

$(".search-button-x").on("click", function (event) {
    event.preventDefault();
    $("#search-input").val("");
    $("#myInputSplash").val("");
});


// DISCOGRAPHY FUNCTIONALITY
$("#discography").on("click", ".slot-content-album", function (event) {
    event.preventDefault();
    var state = $(this).attr("data-state");
    if (state === "not-rendered") {
        var albumTrackQuery = $(this).attr("data-query");
        var albumDiv = $(this);
        var trackContainer = $("<div>");
        trackContainer.addClass("expandable-album");
        $(this).attr("data-state", "rendered");
        $(this).attr("data-expand", "collapsed");
        albumDiv.append(trackContainer);

        $.ajax({
            url: albumTrackQuery,
            method: "GET"
        })

            //this generates track names into expandable track container
            .then(function (response) {
                var results = response.track;
                //for each track...
                for (var ii = 0; ii < results.length; ii++) {
                    var newTrack = $("<div>");
                    newTrack.addClass("slot-content-song");
                    newTrack.text(results[ii].strTrack);
                    trackContainer.append(newTrack);
                }
            })
    }
});


// MAIN SEARCH BUTTON FUNCTIONALITY
$("#search-btn-sub").on("click", function (event) {
    event.preventDefault();

    $("#no-upcoming-show").empty();
    $("#no-news").empty();
    $("#show-content-for-hide").show();
    $("#news-content-for-hide").show();
    $("#discography").empty();
    $("#splash-screen").hide();
    $("html, body").animate({ scrollTop: 0 }, 0);
    albumIdArray = [];
    albumIdTitleArray = [];
    albumIdReleaseYearArray = [];
    albumIdCoverURL = [];

    var inputBar = $(".myInput");
    
    var value = $("#search-input").val().trim();
    searchName = value
    searchNamePlus = value.split(' ').join('+');
    searchNameNoSpace = value.replace(/\s+/g, '');

    // AudioDB API AJAX Call (For Artist Info)
    $.ajax({
        url: queryPrefix + `/search.php?s=${searchNamePlus}`,
        method: "GET",
    }).then(function (response) {

        if (response.artists == null) {
            inputBar.addClass("noInput");
            inputBar.attr("placeholder", "Required!");
            $("#main-container").hide();
            $("#failed-search").show();
            $("footer").css("position", "absolute")
        } else {

            var artistName = response.artists[0].strArtist;
            var artistThumbURL = response.artists[0].strArtistThumb;
            var artistDesc = response.artists[0].strBiographyEN;
            inputBar.removeClass("noInput");
            inputBar.attr("placeholder", "Search");

            $(".info-slot-image").css("background-image", `url("${artistThumbURL}")`);
            $(".info-slot-image-name").text(artistName);
            $(".info-desc-box").text(artistDesc);
            
            // TicketMaster API AJAX Call
            $.ajax({
                url: "https://app.ticketmaster.com/discovery/v2/events.json?format=ajax&keyword=" + searchNamePlus + "&size=1&apikey=ZgJGOucLYGUGeSJ6U1KvDW1tOCTObkMy",
                method: "GET",
            }).then(function (response) {

                if (response.page.totalElements == 0) {
                    $("#no-upcoming-show").html("Sorry, no upcoming shows for this artist!");
                    $("#show-content-for-hide").hide();
                } else {

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

            artistSearch = $("#search-input").val().trim();
            var artistDetailQuery = queryPrefix + "/search.php?s=" + artistSearch;

            $.ajax({
                url: artistDetailQuery,
                method: "GET"
            }).then(function (response) {

                var results = response.artists[0];
                // console.log(results);
                var artistName = results.strArtist;
                $(".info-slot-image-name").text(artistName);
                var artistThumb = results.strArtistThumb;
                var artistBiography = results.strBiographyEN;
                $(".info-desc-box").text(artistBiography);
                var artistGenre = results.strGenre;
                $(".genre").text(artistGenre);
                var artistOrigin = results.strCountry;
                $(".artist-origin").text(artistOrigin)
                var artistStartYear = results.intFormedYear;
                $(".artist-start-year").text(artistStartYear);
                var artistMusicMood = results.strMood;
                $(".music-mood").text(artistMusicMood);

            });


            // album details AJAX
            var artistAudioDBIdQuery = queryPrefix + "/searchalbum.php?s=" + artistSearch;

            //this finds artist ID
            $.ajax({
                url: artistAudioDBIdQuery,
                method: "GET"
            }).then(function (response) {

                audioDBArtistId = response.album[0].idArtist;
                var artistDiscographyByIdQuery = queryPrefix + "/album.php?i=" + audioDBArtistId;

                //this calls discography by ID
                $.ajax({
                    url: artistDiscographyByIdQuery,
                    method: "GET"
                })
                    //this pushes album ids and titles to respective arrays
                    .then(function (response) {

                        // console.log(response);
                        var results = response.album;
                        for (i = 0; i < results.length; i++) {
                            albumIdArray.push(results[i].idAlbum);
                            albumIdCoverURL.push(results[i].strAlbumThumb);
                            albumIdReleaseYearArray.push(results[i].intYearReleased);
                            albumIdTitleArray.push(results[i].strAlbum);

                        }

                        renderAlbums();

                    })

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
                    // console.log(response);
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
    });



});