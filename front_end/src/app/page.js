"use client";
import Image from "next/image";

import Map from "@/components/Map";

export default function Home() {
  return (
    <div className="flex flex-col text-white">
      <div className="flex flex-col justify-center items-center shadow-md shadow-slate-400 p-6">
        <div className="flex flex-row gap-4">
          <Image src="/logo.png" alt="Vehicle Icon" width={40} height={30} />
          <h1 className="text-2xl">Vehicle Tracking System</h1>
        </div>
          <p className="flex items-center justify-center text-sm">{`Track your Vehicle's Location...`}</p>
      </div>
      <div className="flex flex-row">
        <div className="flex flex-col w-1/2 items-center justify-center">
          <p>Check your vehicle is safe or not</p>
          <Image
            src="/vehicleSmoke.png"
            alt="Vehicle Icon"
            width={400}
            height={300}
          />
        </div>
        <div className="flex w-2/3 m-4">
          <Map />
        </div>
      </div>
    </div>
  );
}
