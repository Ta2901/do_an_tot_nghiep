export default function Header () {
    return (
       

<nav class="bg-[#95938A]">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="/logo.PNG" class="h-8" alt="Flowbite Logo" />
        {/* thêm chữ cạnh logo */}
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
    </a>
    <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div class="hidden w-full md:block md:w-auto" id="navbar-default">
        <ul className=" flex space-x-3">
            <li className="hover:bg-[#DFDED7]   text-black px-4 hover:h-full rounded-md"> 
                Home
            </li>
            <li className="hover:bg-[#DFDED7]  text-black px-4 rounded-md"> 
                Tin tức
            </li>
            <li className="hover:bg-[#DFDED7]  text-black px-4 rounded-md"> 
                Pháp luật
            </li>
            <li className="hover:bg-[#DFDED7]  text-black px-4 rounded-md"> 
                Du lịch
            </li>
              <li className="hover:bg-[#DFDED7]  text-black px-4 rounded-md"> 
                Khác
            </li>
            
              <li className="hover:bg-[#DFDED7]  text-black px-4 rounded-md"> 
                Blog
            </li>
            
              <li className="bg-[#DFDED7]  border border-white  px-2 py-1 text-black rounded-md flex"> 
                <img src="/Flag_of_Vietnam.png"  className="h-5 rounded-full" /> 
                
                <p className="text-xs text-gray-700 mt-[2px] ml-1">Tuan anh</p>
            </li>
        </ul>
     
    </div>
  </div>
</nav>

    )
}