import { Cross1Icon } from "@radix-ui/react-icons";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";

function BasicInfo({ handleNextStep, setBasicInfo }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState("");
  const [randomIdChecked, setRandomIdChecked] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const basicInfo = {
    name: name,
    description: description,
    userId: userId,
    selectedImage: selectedImage,
  };

  useEffect(() => {
    setBasicInfo(basicInfo);
  }, [name, description, userId, selectedImage]);

  const handleRandomIdCheck = () => {
    setRandomIdChecked(!randomIdChecked);
    setUserId(randomIdChecked ? "" : nanoid(4));
  };

  const isFormValid = () => {
    if (name && (randomIdChecked || userId)) {
      return true;
    }
    return false;
  };

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
    <div className="overflow-y-auto sm:max-w-xl flex flex-col h-[40rem] justify-between max-w-screen-md md:h-[40rem] w-auto p-12 bg-white rounded-xl z-30 shadow-xl mt-6 m-6 overflow-auto">
      <div className="flex flex-col items-center justify-center">
        <img
          src="https://res.cloudinary.com/dewy2csvc/image/upload/v1691746298/LogoNaavly_zewaav.svg"
          width={75}
          className="mx-auto mb-6"
        />
        <div class="text-center">
          <h2 class=" text-3xl font-bold text-gray-800">Basic Info</h2>
        </div>
        <div class="mt-8 space-y-3">
          <div class="grid grid-cols-1 space-y-2">
            <label class="text-sm font-bold text-gray-500 tracking-wide">
              *Name
            </label>
            <input
              class=" border border-gray-200 shadow-sm rounded-md text-sm p-3 px-3 borderfocus:outline-none focus:border-green-400"
              type=""
              placeholder="Your name?"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div class="grid grid-cols-1 space-y-2">
            <label class="text-sm font-bold text-gray-500 tracking-wide">
              *Description | Optional
            </label>
            <input
              class=" border border-gray-200 shadow-sm rounded-md text-sm p-3 px-3 borderfocus:outline-none focus:border-green-400"
              type=""
              placeholder="About your self.."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div class="grid grid-cols-1 space-y-2">
            <label class="text-sm font-bold text-gray-500 tracking-wide">
              *User Id
            </label>
            <input
              class=" border border-gray-200 shadow-sm rounded-md text-sm p-3 px-3 borderfocus:outline-none focus:border-green-400"
              type=""
              placeholder={`navvly.us.to/`}
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              disabled={randomIdChecked}
            />
            <div className="flex items-center py-2 gap-x-3">
              <label class="text-sm font-bold text-gray-500 tracking-wide">
                Random Id
              </label>
              <input
                checked={randomIdChecked}
                type="checkbox"
                id="remember-me-checkbox"
                className="checkbox-item peer hidden"
                onChange={handleRandomIdCheck}
              />
              <label
                htmlFor="remember-me-checkbox"
                className="relative flex w-5 h-5 bg-white peer-checked:bg-green-500 rounded-md border ring-offset-2 ring-green-500 duration-150 peer-active:ring cursor-pointer after:absolute after:inset-x-0 after:top-[3px] after:m-auto after:w-1.5 after:h-2.5 after:border-r-2 after:border-b-2 after:border-white after:rotate-45"
              ></label>
            </div>
            <hr />
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
      <button
        onClick={handleNextStep}
        className={`my-5 md:w-80 w-full flex justify-center text-gray-100 p-4 rounded-2xl mt-10 tracking-wide font-semibold ${
          isFormValid()
            ? " bg-green-500 active:bg-green hover:bg-green-300 shadow-lg cursor-pointer duration-150"
            : "bg-gray-300 cursor-not-allowed"
        }`}
      >
        Next
      </button>
    </div>
  );
}

export default BasicInfo;
