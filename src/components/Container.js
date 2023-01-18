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
  let authURL;



  let cliIDSet = false;

  //counts each step in the cycle of token generation



  const apiURL = "https://www.bungie.net/Platform/App/OAuth/Token/"

  
  // Declare a new state variable, inputData and set setInputData to input data
  const [inputData, setInputData] = useState('');
  const [InputDataPlaceholder, setInputDataPlaceholder] = useState('');
  const [cliID, setCliID] = useState('');
  const [cliSecret, setCliSecret] = useState('');
  const [redirectUrl, setRedirectUrl] = useState('');
  const [authCode, setAuthCode] = useState('');

  //use setTextData(""); to update textboxText
  const [textboxText, setTextData] = useState('');
  const [buttonText, setButtonTextData] = useState('');
  const [stepCounter, setStepCounter] = useState(0);


  //strings for each step
  const stepStrings = {
    enterClientIDString: <p>This tool provides an easy and secure way to generate a OAuth bearer token for Bungie.net's Destiny 2 api.<br/><br/>You can access the Bungie Developer Portal&nbsp;<a class="hover:underline text-blue-600 hover:text-blue-700 transition duration-300 ease-in-out" href="https://www.bungie.net/en/Application" target="_blank">here.</a><br/><br/>To begin, please enter your Application's Client ID below and click submit.</p>,
    enterClientSecretString: <p><b>App Client ID: </b>{cliID}<br/><br/><hr/><br/>Now, please enter your Application's Client Secret below and click submit.</p>,

  }

  async function grabBearerToken(id,secret,code){
    var data;
    const oAuthRequestString = `client_id=${id}&client_secret=${secret}&Authorization%3A%20Basic%20%7Bbase64encoded(client-id%3Aclient-secret)%7D=&Content-Type%3A%20application%2Fx-www-form-urlencoded=&grant_type=authorization_code&code=${code}`

    fetch(apiURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization' : `Basic base64(${id}:${secret}`,
      },
      body: JSON.stringify(oAuthRequestString),
    }).then(res => {
      console.log("Request complete! response:", res);
    });
    //send a post request
    console.log(oAuthRequestString);
   
    console.log(data);
    
  }


  //use effect with an empty cond will trigger on page load.
  useEffect(() => {
    setTextData(stepStrings.enterClientIDString);
    setButtonTextData("Submit Client ID");
    setInputDataPlaceholder("Enter Client ID")
  }, []);
  
  //update input data for each step
  function updateInputData(e){
    //https://beta.reactjs.org/learn
    //set the setInputData var from above to e
    setInputData(e);
    if(stepCounter == 0){
      console.log(stepCounter);
      setCliID(e);
    } else if(stepCounter == 1){
      setCliSecret(e);
    }else if(stepCounter == 2){
      setRedirectUrl(e);
    }else if(stepCounter == 3){
      
    }

    
    
    
  }
  
  //this may be a bit of scuffed way to do this
  function updateAppData(step,data){
    console.log(stepCounter);
    console.log(data);
    
    //update contents for each step
    if (step == 0){
      setTextData(stepStrings.enterClientSecretString);
      setButtonTextData("Submit Client Secret")
      setInputDataPlaceholder("Enter Client Secret")
    } else if (step == 1){
      //create the auth url str
      let authURL = `https://www.bungie.net/en/OAuth/Authorize?client_id=${cliID}&response_type=code`;
      setTextData(<p><b>App Client ID: </b>{cliID}<br/><b>App Client Secret: </b>{cliSecret}<br/><br/><hr/><br/>Now, please&nbsp;<a class="hover:underline text-blue-600 hover:text-blue-700 transition duration-300 ease-in-out" href={authURL} target="_blank">click here to authorize with bungie.net</a>&nbsp;and sign in to your Bungie account.<br/><br/>Upon successful authorization, your browser will redirected to the "Redirect URL" listed in your application's settings.<br/><br/>Please paste the redirect URL from above, below.</p>);
      setInputDataPlaceholder("Enter Redirect URL")
    }else if (step == 2){
      console.log(redirectUrl);
      setAuthCode(redirectUrl.split("code=").slice(-1));
    }else if (step == 3){
      grabBearerToken(cliID,cliSecret,authCode);
    }

  }


  //on button submit print out the inputData var from above
  function submit(e) {
    

    e.preventDefault();
    
    //check if data was left blank
    if(inputData == ""){
      //alert("The input field is empty!")
      //return;
    }
    
    
    //set data from submit
    userInput = inputData;
    //console.log(appCliID);

    console.log(userInput);
    
    //reset input data
    setInputData("")
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
                <input className="textInputBox " type="text" id="textInput" name="textInput" value={inputData} placeholder={InputDataPlaceholder} onChange={event=>updateInputData(event.target.value)}></input>
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