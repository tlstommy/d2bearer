export default function Navbar() {
    return (
      <header>
        <nav class="mb-2 mt-0 text-2xl bg-gray-500 py-5 px-3 lg:px-6 sfont-medium leading-tight text-primary">
          <div class="flex flex-wrap justify-between items-center">
            <div class="flex justify-start items-center">
              <b>D2-Bearer</b>
            </div>
            <div class="flex items-center lg:order-2">
                <b>[GH]</b>
            </div>
          </div>
        </nav>
      </header>
    );
  }