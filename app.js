const header = document.querySelector(".display h1");
const weatherIcon = document.querySelector(".icon");
const locationIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector(".part1");
const tempLetter = document.querySelector(".part2");
const hummidity = document.querySelector(".humidity");
const press = document.querySelector(".pressure");
const descriptions = document.querySelector(".description");
const temperatureDisplay = document.querySelector(".temperature-display");
const dayNightBody = document.querySelector("body");
let lat;
let lon;
window.addEventListener("load", () => {
    navigator.geolocation.getCurrentPosition((position) => {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        getData();
        nightMode();
        setInterval(nightMode, 1000*60*60);
    });
});

async function getData()
{
    const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a5d3ef7f43d5c56271288ed713cd7a22&lang=tr`);
    const result = await data.json();
    console.log(result)
    header.textContent = result.name;
    const {temp,humidity,pressure} = result.main;
    const {icon,description} = result.weather[0];
    temperature.textContent = Math.round(temp);
    hummidity.textContent = "Nem : " + humidity + " %";
    locationIcon.innerHTML = `<img src="icons/${icon}.png" width="50" height="50">`;
    press.textContent = "Basınç : " + pressure;
    descriptions.textContent = "Durum : " + description;
    temperatureDisplay.addEventListener("click",() => {
        if (tempLetter.textContent === "K")
        {   
            
            let celcius = (temp-273.15);
            temperature.textContent = Math.round(celcius);
            tempLetter.textContent = "°C";
        }

        else
        {
            temperature.textContent = Math.round(temp);
            tempLetter.textContent = "K";
        }

    });

}

function nightMode()
{
    const day = new Date();
    const hours = day.getHours();

    if(hours > 20 || hours < 8)
    {
        dayNightBody.style.backgroundImage = 'url(./image/gece.jpg)';
    }
    else
    {
        dayNightBody.style.backgroundImage = 'url(./image/galata.jpg)';
    }
}



