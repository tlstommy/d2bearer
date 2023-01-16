//container to hold stuff and do funcs
//https://beta.reactjs.org/learn
//import reactand navbar
import React from "react";
import Navbar from "./Navbar";
import TextBox from "./TextBox";

import Button from "./Button";
import { useState, useEffect  } from 'react';



export default function Container() {
  let userInput;
  let appCliID;
  let appCliSecret;
  let textInputComponent;
  //counts each step in the cycle of token generation



  const apiURL = "https://www.bungie.net/Platform/App/OAuth/Token/"


  appCliID = "1"
  //strings for instructions so i could practice a bit with this data type
  const instructionStrings = {
    enterClientIDString: <p>This tool provides an easy and secure way to generate a oAuth bearer token for Bungie.net's Destiny 2 api.<br/><br/>You can access the Bungie developer portal&nbsp; 
    <a class="hover:underline text-blue-600" href="https://www.bungie.net/en/Application">here.</a>
    <br/><br/>To begin, please enter your Application's Client ID below and click submit.</p>,
    
    enterClientSecretString: <p><b>App Client ID: </b>{appCliID}<br/><br/><hr/><br/>Now, please enter your Application's Client Secret below and click submit.</p>,

    openAuthUrlString: <p><b>App Client ID: </b>{appCliID}<br/><b>App Client Secret: </b>{appCliSecret}<br/><br/><hr/><br/>Now, please enter your Application's Client Secret below and click submit.</p>,
  }

  // Declare a new state variable, inputData and set setdata to input data
  const [inputData, setData] = useState('');
  //use setTextData(""); to update textboxText
  const [textboxText, setTextData] = useState('');
  const [stepCounter, setStepCounter] = useState(0);

  //use effect with an empty cond will trigger on page load.
  useEffect(() => {
    setTextData(instructionStrings.enterClientIDString);
  }, []);
  
  function updateInputData(e){
    //https://beta.reactjs.org/learn
    //set the setData var from above to e
    setData(e);
  }
  
  //this may be a bit of scuffed way to do this
  function updateAppData(step,data){
    console.log(stepCounter);
    console.log(data);

  }


  //on button submit print out the inputData var from above
  function submit(e) {
    e.preventDefault();

    //set data from submit
    userInput = inputData;
    //console.log(appCliID);

    //console.log(userInput);
    //alertTest(inputData);

    updateAppData(stepCounter,inputData);
    setStepCounter(stepCounter+1)
    setTextData(instructionStrings.enterClientSecretString);

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
            <div class="flex flex-col space-y-5">
              <div className="flex flex-col items-center space-y-2">
                <TextBox textboxText={textboxText} />
                <input className="textInputBox " type="text" id="textInput" name="textInput" placeholder="Input Data Here" onChange={event=>updateInputData(event.target.value)}></input>
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