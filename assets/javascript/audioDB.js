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
var trackListById = [];

var queryPrefix = "http://www.theaudiodb.com/api/v1/json/" + keyAPI;

$(document).ready(function () {

    //artist details AJAX
    $("#search-bar").on("click", "#search-button-submit", function (event) {
        event.preventDefault();
        artistSearch = $("#myInput").val().trim();
        var artistDetailQuery = queryPrefix + "/search.php?s=" + artistSearch;

        $.ajax({
            url: artistDetailQuery,
            method: "GET"
        })
            .then(function (response) {
                var results = response.artists[0];
                console.log(results);
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
    $("#search-bar").on("click", "#search-button-submit", function (event) {
        event.preventDefault();
        var artistAudioDBIdQuery = queryPrefix + "/searchalbum.php?s=" + artistSearch;

        //this finds artist ID
        $.ajax({
            url: artistAudioDBIdQuery,
            method: "GET"
        })
            .then(function (response) {
                audioDBArtistId = response.album[0].idArtist;
                // console.log(audioDBArtistId);
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
                            for (i = 0; i < albumIdTitleArray.length; i++) {
                                var newAlbumDiv = $("<div>");
                                newAlbumDiv.text(albumIdTitleArray[i]);
                                
                            }
                        }
                        for (i = 0; i < albumIdArray.length; i++) {
                            var albumTrackQuery = queryPrefix + "/track.php?m=" + albumIdArray[i];

                            $.ajax({
                                url: albumTrackQuery,
                                method: "GET"
                            })

                                //this pushes track names to arrays
                                .then(function (response) {
                                    // console.log(response);
                                    var results = response.track;
                                    for (i = 0; i < response.length; i++) {
                                        var trackList = [];
                                        trackList.push(results[i].strTrack);
                                        trackListById.push(trackList);
                                        console.log(trackListById);
                                    }
                                })
                        }
                    })
            })
    });
});