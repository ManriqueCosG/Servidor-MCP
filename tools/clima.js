import axios from "axios";

const API_KEY = "bd52080ccf3aa1e8d0e1bd4032ca4f3e"; // 👈 pon aquí tu API key de OpenWeather

export async function clima({ ciudad }) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&units=metric&lang=es`;
    const response = await axios.get(url);
    const data = response.data;

    return ` En ${data.name}, ${data.sys.country} hace ${data.main.temp}°C con ${data.weather[0].description}`;
  } catch (error) {
    return ` No pude obtener el clima para ${ciudad}: ${error.message}`;
  }
}
