//container to hold stuff

//import reactand navbar
import React from "react";
import Navbar from "./Navbar";


export default function Container() {
  return (
    <div>
      <Navbar/>
      <main className="grid place-items-center">
        <p>cENTer grid stuff</p>
      </main>
    </div>
  );
}