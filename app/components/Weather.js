"use client";
import { useState, useEffect } from "react";
import './weather.css';

export default function Weather() {
  const [city, setCity] = useState("Seoul");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  const fetchWeatherData = () => {
    setLoading(true);
    setError(null);

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f50e68b7ce80b4b3f69cd445bda61db7&units=metric`)
      .then((response) => response.json())
      .then((data) => {
        if (data.cod === "404") {
          setError("Thành phố không tồn tại!");
        } else {
          setWeather(data);
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Lỗi khi tải dữ liệu!");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  return (
    <div className="weather-container">
      <div className="weather-header">
        <h2>Thời tiết hiện tại</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={city}
            onChange={handleCityChange}
            placeholder="Nhập tên thành phố"
            className="city-input"
          />
          <button type="submit" className="submit-button">
            Tìm kiếm
          </button>
        </form>
      </div>

      {loading && <p className="loading-text">Đang tải thời tiết...</p>}
      {error && <p className="error-text">{error}</p>}

      {weather && !loading && !error && (
        <div>
          <div className="weather-main">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="Weather Icon"
            />
            <div>
              <div className="temperature">{Math.round(weather.main.temp)}°C</div>
              <div>RealFeel: {Math.round(weather.main.feels_like)}°</div>
            </div>
          </div>

          <div className="weather-details">
            <div><span>Thành phố:</span><span>{weather.name}, {weather.sys.country}</span></div>
            <div><span>Nhiều mây:</span><span>{weather.weather[0].description}</span></div>
            <div><span>Độ ẩm:</span><span>{weather.main.humidity}%</span></div>
            <div><span>Gió:</span><span>{weather.wind.speed} m/s</span></div>
            <div><span>Áp suất:</span><span>{weather.main.pressure} hPa</span></div>
          </div>
        </div>
      )}
    </div>
  );
}
