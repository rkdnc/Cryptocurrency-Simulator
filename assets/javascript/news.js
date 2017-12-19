var bitcoinNews = "https://newsapi.org/v2/top-headlines?q=bitcoin&apiKey=efe7ea0cf29f4c4aa3ad832ec34fc1ca";
    $.ajax({
        url: bitcoinNews,
        method: "GET"
    }).done(function(bitcoin){
        $(".icon").text(`Current Headlines: {}`)
    })