"use client";
import { useState, useEffect } from "react";
import './weather.css';

export default function Weather() {
  const [city, setCity] = useState("Seoul"); // Thành phố mặc định là Seoul
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleCityChange = (e) => {
    setCity(e.target.value); // Cập nhật tên thành phố khi người dùng nhập
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Ngừng việc tải lại trang khi gửi form
    fetchWeatherData();
  };

  const fetchWeatherData = () => {
    setLoading(true);
    setError(null);

    // Thay YOUR_API_KEY bằng API Key của bạn
    fetch('https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=YOUR_VALID_API_KEY&units=metric')

      .then((response) => response.json())
      .then((data) => {
        if (data.cod === "404") {
          setError("Thành phố không tồn tại!");
        } else {
          setWeather(data);
        }
        setLoading(false);
      })
      .catch((error) => {
        setError("Lỗi khi tải dữ liệu!");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchWeatherData(); // Gọi dữ liệu thời tiết khi lần đầu render
  }, []); // Chạy 1 lần khi component mount

  return (
    <div className="weather-container">
      <h2>Thời tiết hiện tại</h2>

      {/* Form nhập thành phố */}
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

      {loading && <p>Đang tải thời tiết...</p>}

      {error && <p>{error}</p>}

      {weather && !loading && !error && (
        <div>
          <h3>
            {weather.name}, {weather.sys ? weather.sys.country : "Không xác định"}
          </h3>
          <table>
            <thead>
              <tr>
                <th>Nhiệt độ (°C)</th>
                <th>Thời tiết</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {/* Kiểm tra nếu weather.main tồn tại trước khi truy cập */}
                <td>{weather.main ? weather.main.temp : "Không có dữ liệu"}</td>
                <td>{weather.weather && weather.weather[0] ? weather.weather[0].description : "Không có dữ liệu"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
