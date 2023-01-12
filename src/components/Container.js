//container to hold stuff

//import reactand navbar
import React from "react";
import Navbar from "./Navbar";
import TextBox from "./TextBox";
import TextInput from "./TextInput";
import Button from "./Button";



export default function Container() {
  return (
    <div>
      <Navbar/>

      <main className="place-items-center flex h-screen ">
        <div></div>
        <div class="m-auto">
          <div className="title">
              <h1 class="text-6xl font-normal">
                D2-Bearer
              </h1>
          </div>
          <div class="flex flex-col items-center">
            <TextBox/>
            <TextInput/>
            <Button/>
          </div>
        </div>
        
      </main>
      <div></div>
    </div>
  );
}