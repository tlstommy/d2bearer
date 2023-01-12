//container to hold stuff and do funcs

//import reactand navbar
import React from "react";
import Navbar from "./Navbar";
import TextBox from "./TextBox";
import TextInput from "./TextInput";
import Button from "./Button";



export default function Container() {
  
  
  function consoleTest(){
    alert("Test!");
  }
  
  
  
  
  
  
  
  
  
  
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
          <form onSubmit={consoleTest}>
            <div class="flex flex-col items-center space-y-5">
              <div className="flex flex-col items-center space-y-2">
                <TextBox textboxText={"lorem ipsum text lusum text lusum text lusum text lule"}/>
                <TextInput/>
                <Button buttonText={"sUBMIT"}/>
              </div>
            </div>
          </form>
        </div>
        
      </main>
      <div></div>
    </div>
  );
}