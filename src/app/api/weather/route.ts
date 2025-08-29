import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { WeatherData } from "@/types";

type CacheEntry = {
  data: WeatherData;
  timestamp: number;
};

const cache: Record<string, CacheEntry> = {};
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

export async function GET(req: NextRequest) {
  const city = req.nextUrl.searchParams.get("city");
  if (!city)
    return NextResponse.json({ error: "City is required" }, { status: 400 });

  const key = city.toLowerCase();
  const cached = cache[key];

  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return NextResponse.json(cached.data);
  }

  const apiKey = process.env.OPENWEATHER_KEY;
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&units=metric&appid=${apiKey}`
  );

  if (!res.ok)
    return NextResponse.json({ error: "City not found" }, { status: 404 });

  const data: WeatherData = await res.json();
  cache[key] = { data, timestamp: Date.now() };

  return NextResponse.json(data);
}
