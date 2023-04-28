import { Github } from 'react-bootstrap-icons'
import { QuestionCircle } from 'react-bootstrap-icons'


export default function Navbar() {
    return (
      <header>
        <nav class="mb-2 mt-0 text-2xl bg-gray-500 py-5 px-3 lg:px-6 sfont-medium leading-tight text-primary">
          <div class="flex flex-wrap justify-between items-center">
            <div class="flex justify-start items-center">
              <b>D2-Bearer</b>
            </div>
            <div class="flex items-center lg:order-2">
              <a class="px-3" href="https://github.com/lulamae12/d2bearer"><QuestionCircle size={32}/></a>
              <a class="px-3" href="https://github.com/lulamae12/d2bearer"><Github size={32}/></a>
            </div>
          </div>
        </nav>
      </header>
    );
  }