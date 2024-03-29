import { Github } from 'react-bootstrap-icons'
import { QuestionCircle } from 'react-bootstrap-icons'
import { Terminal } from 'react-bootstrap-icons'
import { Tooltip} from "@material-tailwind/react";
import React from "react";
import PopupModal from "./PopupModal";


export default function Navbar() {
  const [showModal, setShowModal] = React.useState(false);

  const helpStr = `
  D2-Bearer provides an easy and secure way to generate an OAuth Bearer Token.<br> 
  No data is ever stored server-side and data is transmitted to Bungie.net via POST requests.
  <br><br>
  
  It is important that the application's origin header is set correctly or it wont generate the token properly!
  <br><br>
  Have an issue or suggestion? Please submit an issue <a class="hover:underline text-blue-500" href="https://github.com/lulamae12/d2bearer/issues">here!</a>
  <hr>
  <small>
    <a class="hover:underline text-blue-500" href="https://github.com/Bungie-net/api/wiki/OAuth-Documentation">Bungie.net API documentation</a>
  </small>`
  

  return (
    <header>
      <nav class="mb-2 mt-0 text-2xl bg-gray-500 py-5 px-3 lg:px-6 sfont-medium leading-tight text-primary">
        <div class="flex flex-wrap justify-between items-center">
          <div class="flex justify-start items-center">
            <span className="logo-icon-navbar"></span>
            <b>2-Bearer</b>
          </div>
          <div className="flex items-center lg:order-2">
            <Tooltip class="absolute z-50 whitespace-normal break-words rounded-lg bg-black py-1.5 px-3 font-sans text-sm font-normal text-white focus:outline-none"
              content="CLI-Version"
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: 25 },
              }}
            >
              <a class="px-3" href="https://github.com/tlstommy/d2bearer-cli"><Terminal size={32}/></a>
            </Tooltip>

            <Tooltip class="absolute z-50 whitespace-normal break-words rounded-lg bg-black py-1.5 px-3 font-sans text-sm font-normal text-white focus:outline-none" 
              content="Help" 
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: 25 },
              }}
            >
              <QuestionCircle size={32} onClick={()=>setShowModal(true)}/>
            </Tooltip>

            <Tooltip class="absolute z-50 whitespace-normal break-words rounded-lg bg-black py-1.5 px-3 font-sans text-sm font-normal text-white focus:outline-none"
              content="View Source Code on Github" 
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: 25 },
              }}
            >
              <a class="px-3" href="https://github.com/tlstommy/d2bearer"><Github size={32}/></a>
            </Tooltip>
          </div>
        </div>
      </nav>
      {showModal ? (<PopupModal showModal={showModal} setShowModal={setShowModal} modalTitle={"Help"} modalBody={<div dangerouslySetInnerHTML={{ __html: helpStr }} />}/>) : null}
    </header>
  );
}