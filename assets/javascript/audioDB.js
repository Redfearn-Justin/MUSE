// console.log("java working")

var keyAPI = "195003";
var artistSearch;
var audioDBArtist;
// var albumTitleArray = [];
// var albumReleaseYearArray = [];

var albumIdArray = [];
var albumIdTitleArray = [];
var albumIdReleaseYearArray = [];
var albumIdCoverURL = [];

var queryPrefix = "http://www.theaudiodb.com/api/v1/json/" + keyAPI;

$(document).ready(function () {

    //artist details AJAX
    $(".search-container").on("click", ".search-button-submit", function (event) {
        event.preventDefault();
        artistSearch = $(".myInput").val().trim();
        var artistDetailQuery = queryPrefix + "/search.php?s=" + artistSearch;

        $.ajax({
            url: artistDetailQuery,
            method: "GET"
        })
            .then(function (response) {
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
            })
    });

    // //artist discography AJAX
    // $("#navBarTop").on("click", "#navSearchBtn", function (event) {
    //     event.preventDefault();
    //     var artistDiscographyQuery = queryPrefix + "/discography.php?s=" + artistSearch;

    //     $.ajax({
    //         url: artistDiscographyQuery,
    //         method: "GET"
    //     })
    //         .then(function (response) {
    //             var results = response.album;
    //             console.log(results);
    //             for (i = 0; i < results.length; i++) {
    //                 albumTitleArray.push(results[i].strAlbum);
    //                 albumReleaseYearArray.push(results[i].intYearReleased);
    //             }
    //         })
    // });

    // //album details AJAX
    $(".search-button-submit").on("click", function (event) {
        event.preventDefault();
        var artistAudioDBIdQuery = queryPrefix + "/searchalbum.php?s=" + artistSearch;

        //this finds artist ID
        $.ajax({
            url: artistAudioDBIdQuery,
            method: "GET"
        })
            .then(function (response) {
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
            })
    });
});

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