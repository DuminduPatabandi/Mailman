import { useEffect, useState } from "react";
import axios from "axios";
import { XCircleIcon, SparklesIcon } from "@heroicons/react/24/outline";

// Suggestions.
const suggestions = [
  {
    id: '1',
    mode: "Make it short",
    prompt:
      "Write a email for this. You must add AAAAAAAAAAA in the begining.",
  },
  {
    id: '2',
    mode: "Descriptive",
    prompt:
      "Write a email for this. You must add BBBBBBBBBBB in the begining.",
  },
  {
    id: '3',
    mode: "Polite",
    prompt:
      "Write a email for this. You must add CCCCCCCCCCC in the begining.",
  },
  {
    id: '4',
    mode: "Formal",
    prompt:
      "Write a email for this. You must add DDDDDDDDDDDD in the begining.",
  },
];

export default function Forms() {
  const [mail, setMail] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);
  const [prompt, setPrompt] = useState(
    "Write a email for this. You must give the result using following format.\n\n[subject]subject\n[salutation]salutation\n[body]body\n[thanking]thanking\n[signature]signature"
  );
  const [data, setData] = useState(false);

  const handleGenerateMail = async () => {
    setButtonClicked(false)
    const response = await fetch("http://localhost:3001/generate-mail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: mail.concat(prompt) }),
    });

    if (response.ok) {
      const result = await response.json();
      setMail(result.text);
      setData(true);
    } else {
      console.error("Failed to generate story");
    }
  };
  
  const handleSuggestion = async (suggestedData) => {
    setButtonClicked(true)
    setPrompt(suggestedData)
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log('hello')
    // const response = await fetch("http://localhost:3001/generate-mail", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ prompt: mail.concat(prompt) }),
    // });

    // if (response.ok) {
    //   const result = await response.json();
    //   setMail(result.text);
    //   setData(true);
    // } else {
    //   console.error("Failed to generate story");
    // }
    // setButtonClicked(false)
  }
  fetchData()
  },[buttonClicked])

  return (
    <>
      <div className="flex  min-h-full flex-1 flex-col w-1/3 ring-1 ring-inset ring-gray-300 rounded-lg bg-[#f8fafc]  px-6 pb-8 pt-4 lg:px-8">
        <div className="close flex justify-end h-2 relative -mx-2 pb-4">
          <XCircleIcon className="w-6 h-6 mx-1" />
        </div>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className=" text-center text-l flex justify-center font-bold leading-9 tracking-tight text-gray-900">
            AI E-mail Assistant
            <SparklesIcon className="w-4 h-4 mx-1" />
          </h2>
        </div>

        <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
          <div>
            <div className="mt-2">
              <textarea
                id="email"
                name="email"
                type="email"
                placeholder="Tell me what you want..."
                value={mail}
                onChange={(e) => setMail(e.target.value)}
                className="block scrollbar-hidden text-pretty resize-none  h-64 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#2a9d8f] sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            {!data ? (
              <button
                onClick={handleGenerateMail}
                className="w-full flex justify-center mt-6 rounded-md bg-[#2a9d8f] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Generate
                <SparklesIcon className="w-4 h-4 mx-1" />
              </button>
            ) : (
              <div className="suggestions mt-4">
                {suggestions.map((suggestions) => (
                  <button
                    onClick={() => handleSuggestion(suggestions.prompt)}
                    className="w-[140px] mx-1 mt-2 rounded-md bg-[#2a9d8f] px-3 py-1.5 text-sm font-semibold  text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 focus:bg-black"
                  >
                    {suggestions.mode}.
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
