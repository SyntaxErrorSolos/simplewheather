"use client";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const wheather = document.getElementById("wheather");
    const wind = document.getElementById("wind_kph");
    const humidity = document.getElementById("humidity");

    const runFunction = function () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          if (Notification.permission === "denied")
            return (wheather.innerText = "Permission Denied.");
          fetch("http://localhost:3001/wheather", {
            method: "GET",
            mode: "cors",
            headers: {
              lat: position.coords.latitude,
              long: position.coords.longitude,
            },
          })
            .then((response) => response.json())
            .then((data) => {
              const tempC = data.current.temp_c;
              const windkph = data.current.wind_kph;
              const humidity2 = data.current.humidity;
              wheather.innerText = `${tempC}°c`;
              wind.innerText = `Wind is ${windkph}kph |`;
              humidity.innerText = `Humidity is ${humidity2}%`;
            });
        });
      }
    };

    wheather.onload = runFunction();
  }, []);
  return (
    <main className="flex-col flex justify-center items-center h-screen">
      <div className=" bg-neutral-500 bg-opacity-40 rounded-lg w-[48rem] h-[20rem]">
        <h1
          id="wheather"
          className="text-center text-[10rem] text-zinc-100 font-bold opacity-100 bg-clip-text rounded-lg"
        >
          Loading
        </h1>
        <div
          id="other"
          className="flex items-center justify-center space-x-3 text-center"
        >
          <h2
            id="wind_kph"
            className="text-2xl text-zinc-100 font-medium opacity-100"
          >
            Loading wind |
          </h2>
          <h2
            id="humidity"
            className="text-2xl text-zinc-100 font-medium opacity-100"
          >
            Loading Humidity
          </h2>
        </div>
      </div>
    </main>
  );
}
