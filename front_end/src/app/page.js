"use client";

import Map from "@/components/Map";

export default function Home() {
  return (
    <div className="">
      <h1 className="flex items-center justify-center md:text-xl text-sm p-2">{`Track the Vehicle's Location`}</h1>
      <Map />
    </div>
  );
}
