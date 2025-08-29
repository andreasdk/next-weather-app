"use client";

import { useState } from "react";
import { WeatherData } from "@/types";
import WeatherCard from "./components/WeatherCard";

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
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error occurred");
      }
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
          className="px-3 py-2 rounded-xl border border-orange-600 text-slate-900 focus:outline-none focus:ring-3 focus:ring-orange-500 transition"
        />

        <button
          onClick={fetchWeather}
          className="px-4 py-2 bg-orange-600 text-white rounded-xl shadow hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-800 transition"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-amber-600">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {weather && <WeatherCard weather={weather} />}
    </main>
  );
}
