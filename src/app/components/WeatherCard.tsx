"use client";
import Image from "next/image";
import { WeatherData } from "@/types";

export default function WeatherCard({ weather }: { weather: WeatherData }) {
  return (
    <section
      aria-live="polite"
      className="bg-white rounded-2xl shadow p-6 text-center w-80"
    >
      <h2 className="text-xl font-semibold text-slate-900">{weather.name}</h2>
      <Image
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
        width={100}
        height={100}
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
  );
}
