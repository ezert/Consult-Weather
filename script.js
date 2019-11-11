const key = "85c38a49c3e5b76a0c5c39ef91bae002";
const imageStock_URL = "https://api.openweathermap.org/img/w/";

let city,
    API_URL,
    unlockedAPI,
    imageKey,
    weather,
    icon,
    temperature
;

const notFoundIcon = "https://i.imgur.com/olYeSHh.png";

const cityInput = () => {

    city = $('.city').val();
    getData(city);

}

const getData = (city) => {

    API_URL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=";
    unlockedAPI = API_URL + key;

    $.ajax({
        url: unlockedAPI,
        type: "GET",
        statusCode: {
            404: function() {
                printData("City Not Found", notFoundIcon, "Error 404");
            },
            200: function() {

                $.getJSON(unlockedAPI, function (data) {
            
                    imageKey = data.weather[0].icon;
            
                    weather = data.weather[0].main;
                    icon = imageStock_URL + imageKey;
                    temperature = Math.floor(data.main.temp);
            
                    printData(weather, icon, temperature + "°C");
                    
                });

            }
        }
    })
}

const printData = (weather, icon, temperature) => {

    $(".weather").text(weather);
    $(".icon").attr("src", icon);
    $(".temperature").text(temperature);

}