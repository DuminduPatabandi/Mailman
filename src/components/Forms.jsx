import Draggable from "react-draggable";
import { useEffect, useState, useRef } from "react";
import {
  XCircleIcon,
  SparklesIcon,
  XMarkIcon,
  UserIcon,
  DocumentCheckIcon,
  LightBulbIcon,
  FaceSmileIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";

// Suggestions.
const suggestions = [
  {
    id: "1",
    mode: "Make it short",
    prompt: "Summarize the main points of this email .",
    icon: DocumentCheckIcon,
    color: "text-[#e76f51]",
  },
  {
    id: "2",
    mode: "Descriptive",
    prompt: "Make it short. More understandable.",
    icon: LightBulbIcon,
    color: "text-[#fcbf49]",
  },
  {
    id: "3",
    mode: "Polite",
    prompt: "Make this more polite. We need to be polite and kind.",
    icon: FaceSmileIcon,
    color: "text-[#2a9d8f]",
  },
  {
    id: "4",
    mode: "Formal",
    prompt:
      "Make this in a formal manner.",
    icon: HandThumbUpIcon,
    color: "text-[#8338ec]",
  },
];

export default function Forms() {
  const draggableRef = useRef();

  const [mail, setMail] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);
  const [prompt, setPrompt] = useState(
    "Write a email for this. You must give the result using following format.\n\n[subject]subject\n[salutation]salutation\n[body]body\n[thanking]thanking\n[signature]signature."
  );
  const [data, setData] = useState(false);
  const [customMode, setCustomMode] = useState("");

  const handleGenerateMail = async () => {
    setButtonClicked(false);
    console.log(prompt)
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
    setButtonClicked(true);
    setPrompt(suggestedData);
  };

  const handleKeyPress = async (event) => {
    if (event.key === 'Enter') {
      setButtonClicked(true);
      console.log('enter pressed.')
      setPrompt(customMode);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log(prompt);
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
    if (buttonClicked) {
      fetchData();
      setButtonClicked(false); // Reset the state after fetching
    }
    // fetchData();
  }, [buttonClicked]);

  return (
    <>
      <Draggable handle=".handle" nodeRef={draggableRef}>
        <div className="z-10 flex pb-6 min-h-full flex-1 flex-col w-1/3 ring-1 ring-inset ring-gray-300 rounded-lg bg-[#f8fafc] drop-shadow-md">
          <div
            className="close handle flex justify-end  relative bg-white py-3 rounded-t-lg  ring-1 ring-inset ring-gray-300"
            ref={draggableRef}
          >
            <XMarkIcon className="w-6 h-6 mx-4 text-gray-400 p-1 rounded-md hover:bg-gray-200 hover:ring-1 ring-inset ring-gray-400" />
          </div>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm handle">
            <h2 className=" text-center text-l flex justify-center font-bold leading-9 tracking-tight text-gray-900 pt-6">
              Unicorn AI
              <SparklesIcon className="w-4 h-4 mx-1 text-gray-500" />
            </h2>
          </div>

          <div className="mt-2">
            <div>
              <div className="mt-2">
                <textarea
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Tell me what you want..."
                  value={mail}
                  onChange={(e) => setMail(e.target.value)}
                  className="block scrollbar-hidden text-pretty resize-none  h-64 w-full border-0 py-5 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#2a9d8f] sm:leading-6"
                />
              </div>
            </div>

            <div>
              {!data ? (
                <div className="flex justify-center">
                  <button
                    onClick={handleGenerateMail}
                    className="flex justify-center mt-6 rounded-md bg-[#2a9d8f] py-2 px-10 text-sm font-semibold  text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Generate
                    <SparklesIcon className="w-4 h-4 mx-1" />
                  </button>
                </div>
              ) : (
                <>
                  <div className="suggestions mt-4 text-start">
                    {suggestions.map((suggestions) => (
                      <div class="relative flex">
                        <a
                          key={suggestions.id}
                          onClick={() => handleSuggestion(suggestions.prompt)}
                          className="w-full flex px-3 py-3 text-md text-gray-600 font-normal border-b hover:bg-gray-200 cursor-pointer"
                        >
                          <span>
                            <suggestions.icon
                              className={`w-6 h-6 mx-3 text-[#2a9d8f] ${suggestions.color}`}
                              aria-hidden="true"
                            />
                          </span>
                          {suggestions.mode}.
                        </a>
                      </div>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="Try a custom mood."
                    className="mx-4 mt-4 rounded-md drop-shadow-md focus:ring-[#2a9d8f] p-3 w-4/5"
                    onChange={(e) => setCustomMode(e.target.value)}
                    onKeyDown={handleKeyPress}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </Draggable>
    </>
  );
}
