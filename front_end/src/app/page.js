"use client";
import Image from "next/image";

import Map from "@/components/Map";

export default function Home() {
  return (
    <div className="">
      <div className="flex flex-row items-center justify-center text-green-700 font-bold gap-3 shadow-md">
        <Image src="/logo.png" alt="Vehicle Icon" width={30} height={30} />
        <h1 className="flex items-center justify-center md:text-xl text-sm p-2">{`Track the Vehicle's Location...`}</h1>
        <Image
          src="/vehicleSmoke.png"
          alt="Vehicle Icon"
          width={50}
          height={40}
        />
      </div>
      <Map />
    </div>
  );
}
