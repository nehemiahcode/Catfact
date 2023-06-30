import React, { useEffect, useState } from "react";
import axios from "axios";

function Catfact() {
  const [catFact, setCatFact] = useState("");
  const [catImage, setCatImage] = useState("");
  const [animation, setAnimation] = useState(true);

  const fetchCatFact = () => {
    axios.get("https://catfact.ninja/fact").then((res) => {
      setCatFact(res.data.fact);
    });

    axios.get("https://api.thecatapi.com/v1/images/search").then((res) => {
      setCatImage(res.data[0].url);
    });
  };

  useEffect(() => {
    fetchCatFact();
  }, []);

  useEffect(() => {
    const Timer = setTimeout(() => {
      setAnimation(false);
    }, 5000);
  });
  return (
    <>
      {animation ? (
        <div className=" fixed h-full w-full bg-white flex flex-col justify-center items-center">
          <h1 className="  font-bold text-lg pb-10 ">Fetching Facts....</h1>
          <div className=" dark:bg-black bg-slate-800  w-20 h-20 rounded-full  animate-bounce   shadow-2xl flex justify-center items-center">
            <div className=" bg-white w-10 h-10 rounded-full"></div>
          </div>
        </div>
      ) : (
        <>
          <h1 className=" font-bold text-4xl text-center dark:text-white pt-5">
            Catfacts
          </h1>
          <div className="bg-black dark:bg-white rounded-lg w-[95%] lg:w-[70%]  mt-5 sm:w-[90%] h-[auto] lg:h-[600px] shadow-xl mx-auto  flex items-center flex-col py-5">
            <button
              onClick={fetchCatFact}
              className="bg-slate-900 dark:bg-blue-900 px-4 py-4 dark:ring-lime-500 w-[200px] font-bold rounded-full text-white text-lg hover:ring-4 ring-inset ring-slate-600"
            >
              Generate Facts
            </button>
            {catImage && (
              <img
                src={catImage}
                alt="Random Cat"
                className="mx-auto mt-4 rounded-md w-[85%] sm:w-[70%] md:w-[50%] lg:w-[50%] lg:h-[230px] object-cover h-[190px]"
              />
            )}
            <div className=" bg-neutral-900 dark:bg-white shadow-2xl my-8 w-[85%] sm:w-[70%] lg:py-12 md:w-[50%] h-[auto] lg:h-[300px] rounded-lg px-7 py-10">
              <p className="text-white dark:text-black font-medium text-lg text-center">
                <strong className=" font-extrabold dark:text-red-600 text-3xl">
                  {" "}
                  "{" "}
                </strong>
                {catFact}
                <strong className=" font-extrabold dark:text-red-600  text-3xl">
                  {" "}
                  "{" "}
                </strong>
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Catfact;
