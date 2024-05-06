"use client";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const wheather = document.getElementById("time");

    const runFunction = function () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log(position);
        });
      }
    };

    wheather.onload = runFunction();
  }, []);
  return (
    <main className="flex justify-center items-center h-screen">
      <div id="time" className="text-8xl text-neutral-800 font-thin">
        Loading wheather
      </div>
    </main>
  );
}
