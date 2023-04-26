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
  let split = " Not Set.";
  let showInputBool;

  let postResponseJSON;


  
  // Declare a new state variable, inputData and set setInputData to input data
  const [inputData, setInputData] = useState('');
  const [InputDataPlaceholder, setInputDataPlaceholder] = useState('');
  const [cliID, setCliID] = useState('Not Set.');
  const [cliSecret, setCliSecret] = useState('Not Set.');
  const [redirectUrl, setRedirectUrl] = useState('');
  const [authCode, setAuthCode] = useState('');

  //use setTextData(""); to update textboxText
  const [textboxText, setTextData] = useState('');
  const [buttonText, setButtonTextData] = useState('');
  const [stepCounter, setStepCounter] = useState(0);
  const [inputType,setInputType] = useState('')

  

  //strings for each step
  const stepStrings = {
    enterClientIDString: <p>This tool provides an easy and secure way to generate a OAuth bearer token for Bungie.net's Destiny 2 api.<br/><br/>You can access the Bungie Developer Portal&nbsp;<a class="hover:underline text-blue-600 hover:text-blue-700 transition duration-300 ease-in-out" href="https://www.bungie.net/en/Application" target="_blank" rel="noreferrer">here.</a><br/><br/>To begin, please enter your Application's Client ID below and click submit.</p>,
    enterClientSecretString: <p><b>App Client ID: </b>{cliID}<br/><b>App Client Secret: </b>{cliSecret}<br/><b>App Authorization Code: </b>{split}<br/><br/><hr/><br/>Now, please enter your Application's Client Secret below and click submit.</p>,

  }
  //determines when to show the input box based on what step the user is on.
  if(stepCounter < 3){
    showInputBool = true;
  }else{
    showInputBool = false;
  }

function calculateExpiryTime(time){

  var hours;
  var minutes;
  var seconds;

  hours = Math.floor(time/3600);
  minutes = Math.floor((time/3600 - hours) * 60);
  seconds = Math.floor(((time/3600 - hours) * 60) * 60);


  return `${hours}:${minutes}:${seconds}`;
}


async function grabBearerToken(id,secret,code){
  
    console.log("code", code);
    console.log("client_id", id);
    console.log("grant_type", "authorization_code");
    console.log("client_secret", secret);



    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    //https://www.bungie.net/en/OAuth/Authorize?client_id=40978&response_type=code

    var urlencoded = new URLSearchParams();
    urlencoded.append("code", code);
    urlencoded.append("client_id", id);
    urlencoded.append("grant_type", "authorization_code");
    urlencoded.append("client_secret", secret);
    urlencoded.append("mode", "cors");


    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow',
    };

    return fetch("https://www.bungie.net/Platform/App/OAuth/Token/", requestOptions).then(response => response.json())  
  }


  //use effect with an empty cond will trigger on page load.
  useEffect(() => {
    setInputType("number");
    setTextData(stepStrings.enterClientIDString);
    setButtonTextData("Submit Client ID");
    setInputDataPlaceholder("Enter Client ID")
  }, []);
  
  //update input data for each step
  function updateInputData(e){
    //https://beta.reactjs.org/learn
    //set the setInputData var from above to e
    setInputData(e);
    if(stepCounter === 0){
      setCliID(e);
    } else if(stepCounter === 1){
      setCliSecret(e);
    }else if(stepCounter === 2){
      setRedirectUrl(e);
    }

    
    
  }

  //this may be a bit of scuffed way to do this
  async function appSubmit(step,data){
    var split;
    console.log(stepCounter);
    console.log(data);
    
    
    //update contents for each step
    if (step === 0){
      setTextData(stepStrings.enterClientSecretString);
      setButtonTextData("Submit Client Secret");
      setInputDataPlaceholder("Enter Client Secret");
      setInputType("string");
      
    } else if (step === 1){
      //create the auth url str
      let authURL = `https://www.bungie.net/en/OAuth/Authorize?client_id=${cliID}&response_type=code`;
      split = " Not Set."
      setTextData(<p><b>App Client ID: </b>{cliID}<br/><b>App Client Secret: </b>{cliSecret}<br/><b>App Authorization Code: </b>{split}<br/><br/><hr/><br/>Now, please&nbsp;<a class="hover:underline text-blue-600 hover:text-blue-700 transition duration-300 ease-in-out" href={authURL} target="_blank" rel="noreferrer">click here to authorize with bungie.net</a>&nbsp;and sign in to your Bungie account.<br/><br/>Upon successful authorization, your browser will redirected to the "Redirect URL" listed in your application's settings.<br/><br/>Please paste the redirect URL from above, below.</p>);
      setInputDataPlaceholder("Enter Redirect URL")
      setButtonTextData("Submit Redirect URL")
      setInputType("string");
    }else if (step === 2){
      console.log(redirectUrl);
      split = redirectUrl.split("code=").slice(-1);
      setAuthCode(split);
      setButtonTextData("Reveal Bearer Token")
      setTextData(<p><b>App Client ID: </b>{cliID}<br/><b>App Client Secret: </b>{cliSecret}<br/><b>App Authorization Code: </b>{split}<br/><br/><hr/><br/>Your Bearer token has been generated, please click the button below to reveal it!</p>);
    
    //show token step
    }else if (step === 3){
      //get json
      postResponseJSON = await grabBearerToken(cliID,cliSecret,authCode);
      console.log("async response: ", postResponseJSON);
      setButtonTextData("Generate a new Bearer Token")

      //return a description list of data
      setTextData(
        <div class="bg-white shadow sm:rounded-lg">
          <div class="px-4 py-3 sm:px-6">
            <h3 class="text-lg font-medium leading-6 text-black">Application {cliID} JSON response</h3>
          </div>
          <hr/>
          <div>
            <div class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-black sm:col-span-1">Access Token</dt>
              <dd class="overflow-x-auto mt-1 text-sm text-white bg-slate-700 sm:col-span-2 sm:mt-0"><code>{postResponseJSON["access_token"]}</code></dd>
            </div>
            <hr/>
            <div class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-black sm:col-span-1">Access Token Type</dt>
              <dd class="mt-1 text-sm text-white bg-slate-700 sm:col-span-2 sm:mt-0"><code>{postResponseJSON["token_type"]}</code></dd>
            </div>
            <hr/>
            <div class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-black sm:col-span-1">Access Token Expiry</dt>
              <dd class="mt-1 text-sm text-white bg-slate-700 sm:col-span-2 sm:mt-0"><code>{postResponseJSON["expires_in"]} seconds. [{calculateExpiryTime(postResponseJSON["expires_in"])}]</code></dd>
            </div>
            <hr/>
            <div class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-black sm:col-span-1">Refresh Token</dt>
              <dd class="overflow-x-auto mt-1 text-sm text-white bg-slate-700 sm:col-span-2 sm:mt-0"><code>{postResponseJSON["refresh_token"]}</code></dd>
            </div>
            <hr/>
            <div class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-black sm:col-span-1">Refresh Token Expiry</dt>
              <dd class="mt-1 text-sm text-white bg-slate-700 sm:col-span-2 sm:mt-0"><code>{postResponseJSON["refresh_expires_in"]} seconds. [{calculateExpiryTime(postResponseJSON["refresh_expires_in"])}]</code></dd>
            </div>
            <hr/>
            <div class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-black sm:col-span-1">App Membership ID</dt>
              <dd class="mt-1 text-sm text-white bg-slate-700 sm:col-span-2 sm:mt-0"><code>{postResponseJSON["membership_id"]}</code></dd>
            </div>
            <hr/>
            <div class="px-4 py-5 sm:grid sm:grid-cols-1 sm:gap-4 sm:px-6">
              <div class="question-wrap">
                <details>
                  <summary class="text-sm font-medium text-black sm:col-span-1">
                    <h2>Click to view Full JSON Response</h2>
                  </summary>
                  <p class="text-sm text-white px-5 py-6 bg-slate-700 break-all">
                    <code>{JSON.stringify(postResponseJSON,null,2)+"\n"}</code>
                  </p>
                </details>
              </div>
            </div>
          </div>          
        </div>
      );
    }else{
      window.location.reload(false);
    }

  }


  //on button submit print out the inputData var from above
  function submit(e) {
    

    e.preventDefault();
    
    //check if data was left blank
    if(inputData === "" && stepCounter < 3){
      alert("The input field is empty!")
      return;
    }

    
    //set data from submit
    userInput = inputData;
    //console.log(appCliID);

    console.log(userInput);
    //reset input data
    setInputData("")
    appSubmit(stepCounter,inputData);
    setStepCounter(stepCounter+1)

  }

  console.log("current step: ",stepCounter);

  
  
 
  return (
    <div>
      <Navbar/>

      <main className="place-items-center flex">
        <div className="m-auto">
          <div className="title text-center">
              <h1 className="text-6xl font-normal">
                D2-Bearer
              </h1>
          </div>
          <form onSubmit={submit}>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col items-center space-y-2">
                <TextBox textboxText={textboxText} />
                {showInputBool && <input className="textInputBox" type={inputType} id="textInput" name="textInput" value={inputData} placeholder={InputDataPlaceholder} onChange={event=>updateInputData(event.target.value)}></input>}
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