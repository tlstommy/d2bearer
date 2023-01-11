//container to hold stuff

//import reactand navbar
import React from "react";
import Navbar from "./Navbar";
import TextBox from "./TextBox";
import TextInput from "./TextInput";



export default function Container() {
  return (
    <div>
      <Navbar/>
      <main className="grid place-items-center flex h-screen">
        <div>
            <TextBox/>
            <TextInput/>
        </div>
      </main>
    </div>
  );
}