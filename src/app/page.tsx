"use client";

import { useState } from "react";
import { WeatherData } from "@/types";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/weather?city=${city}`);
      if (!res.ok) throw new Error("City not found");
      const data: WeatherData = await res.json();
      setWeather(data);
    } catch (err: any) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-slate-200 p-6">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">Weather App</h1>

      <div className="flex gap-2 mb-4">
        <label htmlFor="city" className="sr-only">
          City
        </label>
        <input
          id="city"
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="px-3 py-2 rounded-xl border border-orange-600 text-slate-900 focus:outline-none focus:ring-3 focus:ring-blue-600"
        />
        <button
          onClick={fetchWeather}
          className="px-4 py-2 bg-orange-600 text-white rounded-xl shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-800 transition"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-amber-600">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {weather && (
        <section
          aria-live="polite"
          className="bg-white rounded-2xl shadow p-6 text-center w-80"
        >
          <h2 className="text-xl font-semibold text-slate-900">
            {weather.name}
          </h2>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
            className="mx-auto"
          />
          <p className="text-2xl text-slate-900">
            {Math.round(weather.main.temp)}°C
          </p>
          <p className="capitalize text-slate-700">
            {weather.weather[0].description}
          </p>
          <p className="text-sm text-slate-600">
            Feels like: {Math.round(weather.main.feels_like)}°C | Humidity:{" "}
            {weather.main.humidity}%
          </p>
        </section>
      )}
    </main>
  );
}
