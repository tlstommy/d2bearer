//container to hold stuff and do funcs
//https://beta.reactjs.org/learn
//import reactand navbar
import React from "react";
import Navbar from "./Navbar";
import TextBox from "./TextBox";

import Button from "./Button";
import { useState } from 'react';



export default function Container() {
  let userInput;
  let appCliID;
  let appCliSecret;


  // Declare a new state variable, inputData and set setdata to input data
  const [inputData, setData] = useState('');
  const [textboxText, setTextData] = useState('');


  function updateInputData(e){
    //https://beta.reactjs.org/learn
    //set the setData var from above to e
    setData(e);
  }

  //on button submit print out the inputData var from above
  function submit(e) {
    e.preventDefault();

    //set data from submit
    userInput = inputData;
    console.log(appCliID);

    console.log(userInput);
    //alertTest(inputData);
    setTextData("he there");

  }


  function refreshData(){
    return (
      <div>
        <Container/>
      </div>
    );
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
          <form onSubmit={submit}>
            <div class="flex flex-col items-center space-y-5">
              <div className="flex flex-col items-center space-y-2">
                <TextBox textboxText={textboxText}/>
                <input className="textInputBox " type="text" id="textInput" name="textInput" placeholder="Input Text Here" onChange={event=>updateInputData(event.target.value)}></input>
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