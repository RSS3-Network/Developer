import Image from "next/image";
import React from "react";

import bgImg from "./bg.svg";
import mobileBgImg from "./mobile-bg.png";

export function FirstScreen() {
  return (
    <div data-nav-theme="light" className="relative">
      <div className="relative mx-auto box-content flex min-h-screen max-w-[1300px] flex-col items-center justify-center gap-5 text-white lg:px-16">
        <h1 className="whitespace-nowrap text-center text-3xl font-light lg:text-8xl">
          The Open <br />
          Information Layer
        </h1>

        <div className="w-[250px] text-center font-light lg:absolute lg:bottom-16 lg:right-16 lg:text-right lg:text-lg">
          RSS3 structures open information for the next Twitter, Google, and
          OpenAI
        </div>
      </div>
    </div>
  );
}

export function FirstScreenBg() {
  return (
    <div className="absolute left-0 top-0 -z-10 flex h-screen w-full items-center justify-center overflow-hidden mix-blend-multiply">
      <Image
        src={mobileBgImg}
        alt="Mobile Background"
        fill={true}
        className="w-[390px] -translate-y-24 object-cover lg:hidden"
      />
      <Image
        src={bgImg}
        alt="Background"
        className="mb-auto hidden min-w-[2101px] -translate-y-10 lg:block"
      />
    </div>
  );
}
