"use client";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const wheather = document.getElementById("wheather");
    const search = document.getElementById("search");
    const enter = document.getElementById("enter");

    enter.addEventListener("click", function () {
      if (search.value === "") return;
      fetch("http://localhost:3001/wheathercity", {
        method: "GET",
        mode: "cors",
        headers: {
          city: search.value,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const temp = data.current.temp_c;
          wheather.innerText = `${temp}°c`;
        });
    });

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
              wheather.innerText = `${tempC}°c`;
            });
        });
      }
    };

    wheather.onload = runFunction();
  }, []);
  return (
    <main className="flex-col flex justify-center items-center h-screen">
      <div>
        <input
          id="search"
          placeholder="Search"
          className="w-[38rem] text-center outline-none text-3xl font-bold h-[5rem] rounded-full border-white border-y-2 border-x-2 "
        ></input>
        <button
          id="enter"
          className="bg-none border-white border-y-2 border-x-2 rounded-full w-20 h-10 text-white font-bold space-x-10"
        >
          Enter
        </button>
      </div>
      <h1
        id="wheather"
        className="text-center text-[10rem] text-zinc-100 font-bold opacity-100 bg-clip-text rounded-lg"
      >
        Loading
      </h1>
    </main>
  );
}
