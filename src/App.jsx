import {
  Button,
  Image,
  Spinner,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";

function Catfact() {
  const [catFact, setCatFact] = useState("");
  const [catImage, setCatImage] = useState("");
  const [animation, setAnimation] = useState(true);
  const [theme, setTheme] = useState("dark");

  const Options = [
    { icon: "sunny", text: "light" },
    { icon: "moon", text: "dark", bg: true },
  ];
  const element = document.documentElement;

  useEffect(() => {
    switch (theme) {
      case "dark":
        element.classList.add("dark");
        localStorage.setItem("theme", "dark");
        break;
      case "light":
        element.classList.remove("dark");
        localStorage.setItem("theme", "light");
        break;
      default:
        break;
    }
  }, [theme]);

  const getOtherOption = (CurrentOption) => {
    return Options.find((opt) => opt.text !== CurrentOption);
  };

  // Api used to get catfatcs
  const fetchCatFact = () => {
    axios.get("https://catfact.ninja/fact").then((res) => {
      setCatFact(res.data.fact);
    });

    // Api used to get cat images
    axios.get("https://api.thecatapi.com/v1/images/search").then((res) => {
      setCatImage(res.data[0].url);
      setAnimation(false);
    });
  };

  useEffect(() => {
    fetchCatFact();
  }, []);

  useEffect(() => {
    const Timer = setTimeout(() => {
      setAnimation(false);
    }, 2000);
  });
  return (
    <>
      {/* Animation before page loads */}
      {animation ? (
        <div className=" fixed h-full w-full bg-white flex flex-col justify-center items-center">
          <Spinner size="lg" />
        </div>
      ) : (
        <>
          {/* header with dark mode icons */}
          <header
            className=" bg-white dark:bg-slate-900 h-[60px] flex items-center justify-end px-5
           shadow-2xl static top-0 left-0 w-[100%] z-50 "
          >
            <div
              onClick={() => setTheme(getOtherOption(theme).text)}
              className={` h-10 w-10 flex justify-center items-center text-2xl font-extrabold rounded-full
               text-black bg-white dark:bg-slate-700 dark:text-white`}
            >
              <Popover placement="right">
                <PopoverTrigger>
                  <Button isIconOnly>
                    <SlOptionsVertical />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className=" py-4 px-4 w-[100px] bg-slate-900 dark:bg-white dark:text-black text-white">
                  <ion-icon
                    name={theme === "light" ? Options[0].icon : Options[1].icon}
                  ></ion-icon>
                </PopoverContent>
              </Popover>
            </div>
          </header>
          <h1 className=" font-bold text-4xl text-center text-black dark:text-white pt-5  pb-2 ">
            Cat Facts
          </h1>
          {/* Main section with catfacts images and facts */}
          <div
            className=" dark:bg-slate-900 bg-white rounded-lg w-[95%] lg:w-[70%]  
          mt-5 sm:w-[90%] h-[auto] lg:h-[100%] shadow-xl mx-auto  flex items-center flex-col py-5"
          >
            {catImage && (
              <Image
                src={catImage}
                alt="Random catfact auto generated images"
                loading="lazy"
                className="mx-auto mt-3 rounded-md w-[100%]  object-cover h-[190px]"
              />
            )}
            <div
              className=" dark:bg-slate-900 bg-white shadow-2xl my-8 w-[85%] sm:w-[70%] lg:py-12
             md:w-[50%] h-[auto] lg:h-[300px] rounded-lg px-7 py-10"
            >
              <p className="dark:text-white text-black font-medium text-center">
                <strong className=" font-extrabold dark:text-white text-red-600 text-3xl">
                  {" "}
                  "{" "}
                </strong>
                {catFact}
                <strong className=" font-extrabold dark:text-white text-red-600  text-3xl">
                  {" "}
                  "{" "}
                </strong>
              </p>
            </div>
            {/* button used to generate facts */}
            <Button
              onClick={fetchCatFact}
              className="bg-slate-900
                dark:bg-blue-900 px-6 py-6  dark:ring-lime-500 w-[auto] shadow-lg font-medium 
                rounded-full text-white text-lg  ring-inset ring-slate-600"
            >
              Generate Facts
            </Button>
          </div>
        </>
      )}
    </>
  );
}

export default Catfact;
