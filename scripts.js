// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key} for weather api
// take location from user and then search it using the api key
//




const api = {
    key: "sample-api-key",
    url:"https://api.openweathermap.org/data/2.5/"
}

// adding event listener to search box for reading the keypress and detecting name until enter is pressed

const searchbox = document.querySelector('.search');
searchbox.addEventListener("keypress", setQuery);
function setQuery(e) {
    if (e.keyCode == 13) {
        getName(searchbox.value)
        
    }
}

// fetching data from openweathermap api

function getName(query) {
    fetch(`${api.url}weather?q=${query}&units=metric&appid=${api.key}`)
        .then(weather => {
            return weather.json();
    }).then(showResults)
}

// using data from api for rendering the data on app

function showResults(weather) {
    console.log(weather);
   
    let city = document.querySelector(".location .city");
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let today = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuild(today)
   
    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;
   
    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;
    
    let minmax = document.querySelector('.max-min');
    minmax.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;
    
    // if loop to change background image for weather type
    
    if (weather.main.temp <= 10) {
        document.getElementById("changeImg").style.backgroundImage = "url(/images/very_cold.jpg)"
        document.getElementById("credit").href = 'https://unsplash.com/@jn10?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText';
    } else if (weather.weather[0].main === "Clear") {
        document.getElementById("changeImg").style.backgroundImage = "url(/images/hot_sunny.jpg)"
        document.getElementById("credit").href = 'https://unsplash.com/@dvdlw?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText';
    } else if (weather.weather[0].main === "Clouds") {
        document.getElementById("changeImg").style.backgroundImage = "url(/images/clouds.jpg)"
        document.getElementById("credit").href = 'https://unsplash.com/@ddufourphotographie?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText';
    } else if (weather.weather[0].main === "Snow") {
        document.getElementById("changeImg").style.backgroundImage = "url(/images/snow.jpg)"
        document.getElementById("credit").href = 'https://unsplash.com/@liammartens?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText';
    } else if (weather.weather[0].main === "Rain" || weather.weather[0].main === "Drizzle") {
        document.getElementById("changeImg").style.backgroundImage = "url(/images/rain.jpg)"
        document.getElementById("credit").href = 'https://unsplash.com/@colefarlow?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText';
    } else if (weather.weather[0].main === "Thunderstorm") {
        document.getElementById("changeImg").style.backgroundImage = "url(/images/storm.jpg)"
        document.getElementById("credit").href = 'https://unsplash.com/@davidmoum?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText';
    }   else {
        document.getElementById("changeImg").style.backgroundImage = "url(/images/haze.jpg)"
        document.getElementById("credit").href = 'https://unsplash.com/@mischievous_penguins?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText';
    }
    
}


// creating date month year

function dateBuild(d) {
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "jul", "aug", "sep", "oct", "Nov", "Dec"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}
