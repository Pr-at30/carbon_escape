import React, { useEffect, useState } from "react";
import CodeEditorWindow from "./CodeEditorWindow";
import axios from "axios";
import { classnames } from "../utils/general";
import { languageOptions } from "../constants/languageOptions";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { defineTheme } from "../lib/defineTheme";
import OutputWindow from "./OutputWindow";
import OutputDetails from "./OutputDetails";
import LanguagesDropdown from "./LanguagesDropdown";


const Landing = () => {
  const scollToRef = React.useRef();

  const [language, setLanguage] = useState(languageOptions[0]);
  const [theme, setTheme] = useState("cobalt");

  const [codeleft, setCodeleft] = useState("");
  const [outputDetailsleft, setOutputDetailsleft] = useState(null);
  const [processingleft, setProcessingleft] = useState(null);

  const [coderight, setCoderight] = useState("");
  const [outputDetailsright, setOutputDetailsright] = useState(null);
  const [processingright, setProcessingright] = useState(null);

  const [carbonCompare, setCarbonCompare] = useState();
  const [processingCompare, setProcessingCompare] = useState(null);

  const onSelectChange = (sl) => {
    console.log("selected Option...", sl);
    setLanguage(sl);
  };

  const handleCompare = async () => {
    setProcessingCompare(true);
    try {
      const res = await axios.post("https://carbon-emmision-api.herokuapp.com/api/compare", {
        data: [
          codeleft,
          coderight,
        ],
      });
      console.log("res...", res);
      setCarbonCompare(res.data);
      console.log("carbonCompare...", carbonCompare);
      setProcessingCompare(false);
    }
    catch (err) {
      console.log("err...", err);
      setProcessingCompare(false);
      toast.error("Something went wrong");
    }

    setTimeout(() => {
      scollToRef.current.scrollIntoView({ behavior: 'smooth' })
    }, 500)

  }

  //  Left part
  const onChangeleft = (action, data) => {
    switch (action) {
      case "code": {
        setCodeleft(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };

  const handleCompileleft = () => {
    setProcessingleft(true);
    const formData = {
      language_id: language.id,
      // encode source code in base64
      source_code: btoa(codeleft),
    };
    const options = {
      method: "POST",
      url: process.env.REACT_APP_RAPID_API_URL,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log("res.data", response.data);
        const token = response.data.token;
        checkStatusleft(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        // get error status
        let status = err.response.status;
        console.log("status", status);
        if (status === 429) {
          console.log("too many requests", status);

          showErrorToast(
            `Quota of 100 requests exceeded for the Day!`,
            10000
          );
        }
        setProcessingleft(false);
        console.log("catch block...", error);
      });
  };


  const checkStatusleft = async (token) => {
    const options = {
      method: "GET",
      url: process.env.REACT_APP_RAPID_API_URL + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatusleft(token);
        }, 2000);
        return;
      } else {
        setProcessingleft(false);

        const newData = {
          ...response.data,
          carbonEmissions: 10
        }
        // Calculate carbon emissions using the runtime and memory used
        setOutputDetailsleft(newData);
        showSuccessToast(`Compiled Successfully!`);
        console.log("response.data", response.data);
        return;
      }
    } catch (err) {
      console.log("err", err);
      setProcessingleft(false);
      showErrorToast();
    }
  };

  //  Right part
  const onChangeright = (action, data) => {
    switch (action) {
      case "code": {
        setCoderight(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };

  // Handles the compilation of the code
  const handleCompileright = () => {
    setProcessingright(true);
    const formData = {
      language_id: language.id,
      // encode source code in base64
      source_code: btoa(coderight),
    };
    const options = {
      method: "POST",
      url: process.env.REACT_APP_RAPID_API_URL,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log("res.data", response.data);
        const token = response.data.token;
        checkStatusright(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        // get error status
        let status = err.response.status;
        console.log("status", status);
        if (status === 429) {
          console.log("too many requests", status);

          showErrorToast(
            `Quota of 100 requests exceeded for the Day!`,
            10000
          );
        }
        setProcessingright(false);
        console.log("catch block...", error);
      });
  };

  // Checks the status
  const checkStatusright = async (token) => {
    const options = {
      method: "GET",
      url: process.env.REACT_APP_RAPID_API_URL + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatusright(token);
        }, 2000);
        return;
      } else {
        setProcessingright(false);

        const newData = {
          ...response.data,
          carbonEmissions: 10
        }
        // Calculate carbon emissions using the runtime and memory used
        setOutputDetailsright(newData);
        showSuccessToast(`Compiled Successfully!`);
        console.log("response.data", response.data);
        return;
      }
    } catch (err) {
      console.log("err", err);
      setProcessingright(false);
      showErrorToast();
    }
  };


  useEffect(() => {
    defineTheme("oceanic-next").then((_) =>
      setTheme({ value: "oceanic-next", label: "Oceanic Next" })
    );
  }, []);

  const showSuccessToast = (msg) => {
    toast.success(msg || `Compiled Successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const showErrorToast = (msg, timer) => {
    toast.error(msg || `Something went wrong! Please try again.`, {
      position: "top-right",
      autoClose: timer ? timer : 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* Language selector */}
      <div className="flex flex-row">
        <div className="px-4 py-2">
          <LanguagesDropdown onSelectChange={onSelectChange} />
        </div>
      </div>

      {/* Code Editor Left*/}
      <div className="flex flex-row space-x-4 items-start px-4 py-4">
        <div className="flex flex-col w-full h-full justify-start items-end">
          <CodeEditorWindow
            code={codeleft}
            onChange={onChangeleft}
            language={language?.value}
            theme={theme.value}
          />

          <div className="flex flex-col items-end">

            <div className="flex flex-row space-x-4 items-center">
              <button
                onClick={handleCompileleft}
                disabled={!codeleft}
                className={classnames(
                  "mt-4 border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0",
                  !codeleft ? "opacity-50" : ""
                )}
              >
                {processingleft ? "Processing..." : "Compile and Execute"}
              </button>

            </div>
          </div>
          {/* Left output */}
          {outputDetailsleft &&
            <div className="right-container flex flex-shrink-0 w-[100%] flex-col">
              <OutputWindow outputDetails={outputDetailsleft} />

              <OutputDetails outputDetails={outputDetailsleft} />
            </div>}
        </div>


        {/* Code editor right */}
        <div className="flex flex-col w-full h-full justify-start items-end">
          <CodeEditorWindow
            code={coderight}
            onChange={onChangeright}
            language={language?.value}
            theme={theme.value}
          />
          <div className="flex flex-col items-end">

            <div className="flex flex-row space-x-4 items-center">
              <button
                onClick={handleCompileright}
                disabled={!coderight}
                className={classnames(
                  "mt-4 border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0",
                  !coderight ? "opacity-50" : ""
                )}
              >
                {processingright ? "Processing..." : "Compile and Execute"}
              </button>

            </div>
          </div>
          {/* Right output */}
          {outputDetailsright &&
            <div className="right-container flex flex-shrink-0 w-[100%] flex-col">
              <OutputWindow outputDetails={outputDetailsright} />


              <OutputDetails outputDetails={outputDetailsright} />
            </div>
          }
        </div>
      </div>
      <div className="flex flex-row justify-center items-center">
        <button
          onClick={handleCompare}
          disabled={!coderight && !codeleft}
          className={classnames(
            "mt-4 border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0",
            !coderight ? "opacity-50" : ""
          )}
        >
          {processingCompare ? "Processing..." : "Compare"}
        </button>
      </div>

      <div ref={scollToRef}>
        {carbonCompare &&
          <>
            <div className="flex flex-row justify-center items-center mt-10 scale-150">
              <span className="font-semibold px-100 py-1 rounded-md bg-gray-100 mx-10 ">
                Carbon Emissions
              </span>
            </div>
            <div className="flex flex-row justify-center items-center mt-10 scale-150">
              <div className="font-semibold px-2 py-1 rounded-md bg-gray-100 mx-10">
                Emissions of Code 1 = {carbonCompare?.energy1} gCO{<sub>2</sub>}e
              </div>

              <div className="font-semibold px-2 py-1 rounded-md bg-gray-100 ">
                Emissions of Code 2 = {carbonCompare?.energy2} gCO{<sub>2</sub>}e
              </div>
          </div>
          {carbonCompare?.ratio>1 ? <p>Code 2 is better</p> : <p>Code 1 is better</p>}
          </>
        }
      </div>
    </>
  );
};
export default Landing;
