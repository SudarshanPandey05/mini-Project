// ⚠️ Replace this with your full 32-character OpenWeatherMap API key
const apiKey = "b59db6c452cb2120880aa4e713333c4b"; 
const apiUrl = "https://api.openweathermap.org/data/2.5/";

document.getElementById("searchButton").addEventListener("click", fetchWeather);

function fetchWeather() {
    const city = document.getElementById("cityInput").value.trim();
    if (city) {
        fetch(`${apiUrl}weather?q=${city}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => {
                if (data.cod !== 200) {
                    alert(data.message || "Error fetching weather data");
                    return;
                }
                updateWeatherInfo(data);
                fetchForecast(city);
            })
            .catch(error => console.error("Error fetching weather data:", error));
    }
}

function updateWeatherInfo(data) {
    document.getElementById("cityName").innerText = data.name || "Unknown City";
    document.getElementById("weatherDescription").innerText = data.weather?.[0]?.description || "No description available";
    document.getElementById("temperature").innerText = `Temperature: ${data.main?.temp ?? "N/A"} °C`;
    document.getElementById("humidity").innerText = `Humidity: ${data.main?.humidity ?? "N/A"}%`;
    document.getElementById("windSpeed").innerText = `Wind Speed: ${data.wind?.speed ?? "N/A"} m/s`;

    // Update background image based on weather condition
    const weatherCondition = data.weather?.[0]?.main || "Default";
    const backgroundContainer = document.querySelector(".background-container");
    if (weatherCondition === "Clear") {
        backgroundContainer.style.backgroundImage =
            "url('https://img.freepik.com/free-vector/realistic-sun-cloud-sky-composition-with-day-clear-sky-scenery-with-clouds-sun-flares-vector-illustration_1284-83008.jpg')";
    } else if (weatherCondition === "Clouds") {
        backgroundContainer.style.backgroundImage =
            "url('https://media.istockphoto.com/id/512218646/photo/storm-sky-rain.jpg?s=612x612&w=0&k=20&c=RoUDM9BMwqW8NkPXjzAzlDKCHPOmdZhmmeT3jGA2EaM=')";
    } else if (weatherCondition === "Rain") {
        backgroundContainer.style.backgroundImage =
            "url('https://cdn.wallpapersafari.com/80/79/6JmCqO.jpg')";
    } else {
        backgroundContainer.style.backgroundImage =
            "url('https://c4.wallpaperflare.com/wallpaper/320/348/955/summer-sunlight-leaves-the-garden-of-words-wallpaper-preview.jpg')";
    }
}

function fetchForecast(city) {
    fetch(`${apiUrl}forecast?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data.cod !== "200") {
                console.error("Forecast error:", data.message);
                return;
            }

            const forecastContainer = document.getElementById("forecastContainer");
            forecastContainer.innerHTML = "";

            data.list.forEach(item => {
                if (item.dt_txt.includes("12:00:00")) { // Only 12 PM forecast
                    const forecastItem = document.createElement("div");
                    forecastItem.className = "forecast-item";
                    forecastItem.innerHTML = `
                        <p>${new Date(item.dt_txt).toLocaleDateString()}</p>
                        <p>${item.weather?.[0]?.description || "N/A"}</p>
                        <p>Temp: ${item.main?.temp ?? "N/A"} °C</p>
                    `;
                    forecastContainer.appendChild(forecastItem);
                }
            });
        })
        .catch(error => console.error("Error fetching forecast data:", error));
}
