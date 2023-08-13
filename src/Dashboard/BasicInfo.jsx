import { Cross1Icon } from "@radix-ui/react-icons";
import { useState } from "react";

function BasicInfo() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageDelete = () => {
    setSelectedImage(null);
  };

  return (
    <div className="z-30 overflow-auto sm:max-w-xl flex flex-col justify-between max-w-screen-md md:h-[40rem] w-auto p-12 bg-white rounded-xl shadow-xl mt-6 m-6">
      <div>
        <img
          src="https://res.cloudinary.com/dewy2csvc/image/upload/v1691746298/LogoNaavly_zewaav.svg"
          width={75}
          className="mx-auto mb-6"
        />
        <div class="text-center">
          <h2 class="mt-5 text-3xl font-bold text-gray-800">Basic Info</h2>
        </div>
        <div class="mt-8 space-y-3">
          <div class="grid grid-cols-1 space-y-2">
            <label class="text-sm font-bold text-gray-500 tracking-wide">
              Name
            </label>
            <input
              class=" border border-gray-200 shadow-sm rounded-md text-sm p-3 px-3 borderfocus:outline-none focus:border-green-400"
              type=""
              placeholder="Name"
            />
          </div>
          <div class="grid grid-cols-1 space-y-4">
            <label class="text-sm font-bold text-gray-500 tracking-wide">
              Upload A Profile Picture | Optional
            </label>
            <div>
              <label for="file-input" class="sr-only">
                Choose file
              </label>
              <input
                id="imageInput"
                type="file"
                onChange={handleImageChange}
                accept="image/jpeg, image/png"
                class="block w-full border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-green-500 focus:ring-green-500 file:bg-transparent file:border-0 file:bg-gray-100 file:mr-4 file:py-3 file:px-4"
              />
              {selectedImage && (
                <div className="relative my-5">
                  <div className="relative max-w-full max-h-24 rounded-lg overflow-hidden hover-trigger">
                    <img
                      src={selectedImage}
                      alt="Preview"
                      className="max-w-full max-h-24 rounded-lg"
                    />
                    <button
                      onClick={handleImageDelete}
                      className="absolute inset-0 max-w-fit scale-75 flex items-center justify-center bg-red-500 h-10 text-gray-100 p-4 py-2 rounded-lg text-sm font-semibold active:bg-red-500 hover:bg-red-400 shadow-lg cursor-pointer duration-150 opacity-0 group-hover:opacity-100"
                      style={{ transition: "opacity 150ms ease-in-out" }}
                    >
                      <Cross1Icon className="" />
                    </button>
                  </div>
                  <style>
                    {`
        .hover-trigger:hover button {
          opacity: 1;
        }
      `}
                  </style>
                </div>
              )}
            </div>
          </div>
          <div></div>
        </div>
      </div>
      <button class="my-5 md:w-80 w-full flex justify-center bg-green-500 text-gray-100 p-4 rounded-2xl mt-10 tracking-wide font-semibold active:bg-green hover:bg-green-300 shadow-lg cursor-pointer duration-150">
        Next
      </button>
    </div>
  );
}

export default BasicInfo;
