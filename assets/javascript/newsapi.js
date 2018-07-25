$("#search-button-submit").on("click", function (event) {
    event.preventDefault();

    var value = $("#myInput").val().trim();
    searchName = value
    searchNamePlus = value.split(' ').join('+');
    searchNameNoSpace = value.replace(/\s+/g, '');

    $.ajax({
        url: `https://newsapi.org/v2/everything?q=+%22${searchNamePlus}%22&sortBy=relevancy&pageSize=1&from=2018-01-01&langunge=en&domains=buzzfeed.com,wired.com,abcnews.go.com,cnn.com,ew.com,fortune.com,mashable.com,newsweek.com,time.com,usatoday.com,wsj.com&apiKey=b41fba392394421eb2ab979c343a2812`,
        method: "GET",
    }).then(function (response) {

        console.log(response);

    });
});