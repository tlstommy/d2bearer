//container to hold stuff and do funcs
//https://beta.reactjs.org/learn
//import reactand navbar
import React from "react";
import Navbar from "./Navbar";
import TextBox from "./TextBox";

import Button from "./Button";
import { useState, useEffect  } from 'react';

//heroicons icons
import { DocumentDuplicateIcon } from '@heroicons/react/24/solid'



export default function Container() {
  let userInput;
  let appCliID;
  let split = " Not Set.";
  let showInputBool;
  let appCliSecret;
  let authURL;
  let postResponseJSON;


  let cliIDSet = false;

  //counts each step in the cycle of token generation



  const apiURL = "https://www.bungie.net/Platform/App/OAuth/Token"

  
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


    var data;
    var fetchResponse;
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
  //getting 401
  //this may be a bit of scuffed way to do this
  async function appSubmit(step,data){
    var split;
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
      split = " Not Set."
      setTextData(<p><b>App Client ID: </b>{cliID}<br/><b>App Client Secret: </b>{cliSecret}<br/><b>App Authorization Code: </b>{split}<br/><br/><hr/><br/>Now, please&nbsp;<a class="hover:underline text-blue-600 hover:text-blue-700 transition duration-300 ease-in-out" href={authURL} target="_blank" rel="noreferrer">click here to authorize with bungie.net</a>&nbsp;and sign in to your Bungie account.<br/><br/>Upon successful authorization, your browser will redirected to the "Redirect URL" listed in your application's settings.<br/><br/>Please paste the redirect URL from above, below.</p>);
      setInputDataPlaceholder("Enter Redirect URL")
      setButtonTextData("Submit Redirect URL")
    }else if (step == 2){
      console.log(redirectUrl);
      split = redirectUrl.split("code=").slice(-1);
      setAuthCode(split);
      setButtonTextData("Reveal Bearer Token")
      setTextData(<p><b>App Client ID: </b>{cliID}<br/><b>App Client Secret: </b>{cliSecret}<br/><b>App Authorization Code: </b>{split}<br/><br/><hr/><br/>Your Bearer token has been generated, please click the button below to reveal it!</p>);
    
    //show token step
    }else if (step == 3){
      //get json
      postResponseJSON = await grabBearerToken(cliID,cliSecret,authCode);
      console.log("async response: ", postResponseJSON);
      //alert(postResponseJSON)

      //return a description list of data
      setTextData(
        <div class="bg-white shadow sm:rounded-lg">
          <div class="px-4 py-3 sm:px-6">
            <h3 class="text-lg font-medium leading-6 text-black">Application {cliID} JSON response</h3>
          </div>
          <hr/>
          <div>
            <div class="px-4 py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-black sm:col-span-1">Access Token</dt>
              <dd class="overflow-x-auto mt-1 text-sm text-white bg-slate-700 sm:col-span-2 sm:mt-0 scrollbar-hide"><code>{postResponseJSON["access_token"]}</code></dd>
              <dd class="sm:col-span-1"><DocumentDuplicateIcon className="h-6 w-6 text-blue-500"/></dd>
            </div>
            <hr/>
            <div class="px-4 py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-black sm:col-span-1">Access Token Type</dt>
              <dd class="mt-1 text-sm text-white bg-slate-700 sm:col-span-3 sm:mt-0"><code>{postResponseJSON["token_type"]}</code></dd>
            </div>
            <hr/>
            <div class="px-4 py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-black sm:col-span-1">Access Token Expiry</dt>
              <dd class="mt-1 text-sm text-white bg-slate-700 sm:col-span-3 sm:mt-0"><code>{postResponseJSON["expires_in"]} seconds. [{calculateExpiryTime(postResponseJSON["expires_in"])}]</code></dd>
            </div>
            <hr/>
            <div class="px-4 py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-black sm:col-span-1">Refresh Token</dt>
              <dd class="overflow-x-auto mt-1 text-sm text-white bg-slate-700 sm:col-span-2 sm:mt-0 scrollbar-hide"><code>{postResponseJSON["refresh_token"]}</code></dd>
              <dd class=" sm:col-span-1"><DocumentDuplicateIcon className="h-6 w-6 text-blue-500"/></dd>
            </div>
            <hr/>
            <div class="px-4 py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-black sm:col-span-1">Refresh Token Expiry</dt>
              <dd class="mt-1 text-sm text-white bg-slate-700 sm:col-span-3 sm:mt-0"><code>{postResponseJSON["refresh_expires_in"]} seconds. [{calculateExpiryTime(postResponseJSON["refresh_expires_in"])}]</code></dd>
            </div>
            <hr/>
            <div class="px-4 py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-black sm:col-span-1">App Membership ID</dt>
              <dd class="mt-1 text-sm text-white bg-slate-700 sm:col-span-3 sm:mt-0"><code>{postResponseJSON["membership_id"]}</code></dd>
            </div>
            <hr/>
            <div class="px-4 py-5 sm:grid sm:grid-cols-1 sm:gap-4 sm:px-6">
              <div id="accordion-collapse" data-accordion="collapse">
                <h2 id="accordion-collapse-heading-1">
                  <button type="button" class="flex items-center justify-between w-full" data-accordion-target="#accordion-collapse-body-1" aria-expanded="true" aria-controls="accordion-collapse-body-1">
                    <span>Full JSON Response</span>
                    <svg data-accordion-icon class="w-6 h-6 rotate-180 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                  </button>
                </h2>
                <div id="accordion-collapse-body-1" class="hidden" aria-labelledby="accordion-collapse-heading-1">
                  <div class="p-5">
                    <p class="mb-2 text-gray-500 dark:text-gray-400">Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons, dropdowns, modals, navbars, and more.</p>
                    <p class="text-gray-500 dark:text-gray-400">Check out this guide to learn how to <a href="/docs/getting-started/introduction/" class="text-blue-600 dark:text-blue-500 hover:underline">get started</a> and start developing websites even faster with components on top of Tailwind CSS.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>          
        </div>
      );






      //alert(postResponseJSON["access_token"]);

      //console.log("async response: ", postResponseJSON);
      ////alert(postResponseJSON["access_token"]);
    }

  }


  //on button submit print out the inputData var from above
  function submit(e) {
    

    e.preventDefault();
    
    //check if data was left blank
    if(inputData == ""){
      ////alert("The input field is empty!")
      //return;
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
                {showInputBool && <input className="textInputBox " type="text" id="textInput" name="textInput" value={inputData} placeholder={InputDataPlaceholder} onChange={event=>updateInputData(event.target.value)}></input>}
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