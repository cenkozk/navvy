import { useState } from "react";

function Footer() {
  return (
    <div className=" scale-75">
      <footer class="w-full py-16">
        <div class="md:px-12 lg:px-28">
          <div class="container m-auto space-y-6 text-gray-600 ">
            <img
              src="https://res.cloudinary.com/dewy2csvc/image/upload/v1691746298/LogoNaavly_zewaav.svg"
              alt="logo tailus"
              class="m-auto w-40"
            />

            <div class="text-center">
              <span class="text-sm tracking-wide">
                Copyright © navvy <span id="year"></span> | All right reserved
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
