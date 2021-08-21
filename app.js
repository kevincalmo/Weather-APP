let weather = {
    "apiKey":"63b8a73f3c573d806ace50369d0cc1dc",
    fetchWeather: function(city) {
        fetch("http://api.openweathermap.org/data/2.5/weather?q="
        + city
        + "&appid="
        + this.apiKey
        + "&lang=en&units=metric"
        ).then((response)=>response.json()) //on transforme la requête de l'api en un objet javascript avec la methode .json
        .then((data)=>this.displayWeather(data));
    },
    displayWeather:function(data){
        const {name} = data;
        const {icon,description} = data.weather[0];
        const { temp,humidity} = data.main;
        const {speed}= data.wind;
        console.log(name,icon,description,temp,humidity,speed);
        document.querySelector('.city').innerText = "Weather in "+name;
        document.querySelector('.icon').src = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
        document.querySelector('.description').innerText = description;
        document.querySelector('.temp').innerText = temp+"°C";
        document.querySelector('.humidity').innerText = "Humidity: "+humidity+"%";
        document.querySelector('.wind').innerText = "Wind speed: "+speed+" Km/H";
       // document.querySelector('.weather').classList.remove('loading');
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?"+ name +"')";
    },
    search:function(){
        this.fetchWeather(document.querySelector('.search__bar').value);
    }
}

document.querySelector('.search button').addEventListener('click',()=>{
    weather.search();
})

document.querySelector('.search__bar').addEventListener('keyup',(e)=> {
    if(e.key == "Enter") {
        weather.search();
    }
})

weather.fetchWeather("Martinique");