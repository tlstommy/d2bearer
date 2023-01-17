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

  let cliIDSet = false;

  //counts each step in the cycle of token generation



  const apiURL = "https://www.bungie.net/Platform/App/OAuth/Token/"

  
  // Declare a new state variable, inputData and set setdata to input data
  const [inputData, setData] = useState('');
  const [cliID, setCliID] = useState('');
  const [cliSecret, setCliSecret] = useState('');

  //use setTextData(""); to update textboxText
  const [textboxText, setTextData] = useState('');
  const [buttonText, setButtonTextData] = useState('');
  const [stepCounter, setStepCounter] = useState(0);


  //strings for each step
  const stepStrings = {
    enterClientIDString: <p>This tool provides an easy and secure way to generate a oAuth bearer token for Bungie.net's Destiny 2 api.<br/><br/>You can access the Bungie developer portal&nbsp; 
    <a class="hover:underline text-blue-600" href="https://www.bungie.net/en/Application">here.</a>
    <br/><br/>To begin, please enter your Application's Client ID below and click submit.</p>,
    step1Button: "Submit Client ID",


    enterClientSecretString: <p><b>App Client ID: </b>{cliID}<br/><br/><hr/><br/>Now, please enter your Application's Client Secret below and click submit.</p>,
    step2Button: "Submit Client Secret",

    openAuthUrlString: <p><b>App Client ID: </b>{cliID}<br/><b>App Client Secret: </b>{cliSecret}<br/><br/><hr/><br/>Now, please enter your Application's Client Secret below and click submit.</p>,
  }




  //use effect with an empty cond will trigger on page load.
  useEffect(() => {
    setTextData(stepStrings.enterClientIDString);
    setButtonTextData(stepStrings.step1Button);
  }, []);
  
  //update input data for each step
  function updateInputData(e){
    //https://beta.reactjs.org/learn
    //set the setData var from above to e
    setData(e);
    if(stepCounter == 0){
      console.log(stepCounter);
      setCliID(e);
      let cliIDSet = true;

    } else if(stepCounter == 1){
      setCliSecret(e);
    }
    
    
    
  }
  
  //this may be a bit of scuffed way to do this
  function updateAppData(step,data){
    console.log(stepCounter);
    console.log(data);
    
    //update contents for each step
    if (step == 0){
      setTextData(stepStrings.enterClientSecretString);
      setButtonTextData(stepStrings.step2Button)
    } else if (step == 1){
      setTextData(stepStrings.openAuthUrlString);
    }

  }


  //on button submit print out the inputData var from above
  function submit(e) {
    e.preventDefault();

    //set data from submit
    userInput = inputData;
    //console.log(appCliID);

    console.log(userInput);

    
    updateAppData(stepCounter,inputData);
    setStepCounter(stepCounter+1)

  }

  console.log("current step: ",stepCounter);
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
        <div className="m-auto">
          <div className="title">
              <h1 className="text-6xl font-normal">
                D2-Bearer
              </h1>
          </div>
          <form onSubmit={submit}>
            <div className="flex flex-col space-y-5">
              <div className="flex flex-col items-center space-y-2">
                <TextBox textboxText={textboxText} />
                <input className="textInputBox " type="text" id="textInput" name="textInput" placeholder="Input Data Here" onChange={event=>updateInputData(event.target.value)}></input>
                <Button buttonText={buttonText}/>
              </div>
            </div>
          </form>
        </div>
        
      </main>
      <div></div>
    </div>
  );
}