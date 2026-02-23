/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import { GoPlus } from "react-icons/go";
import { HiMinus } from "react-icons/hi";

function Accordion({ questions, colorClasses = "" }) {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const contentRefs = useRef([]);

  const toggleAccordion = (index) => {
    setActiveAccordion((prev) => (prev === index ? null : index));
  };

  return (
    <div className="w-full">
      {
        questions.map((item, index) => (
          <div
            key={index}
            className={`py-[10px] mb-2 px-5 rounded-md custom-box-shadow cursor-pointer bg-inherit border dark:border-none hover:shadow ${colorClasses}`}
          >
            <div
              className={`flex items-center justify-start gap-5 p-1 
                 ${activeAccordion === index ?
                   'bg-white shadow-2xl border dark:border-none text-black dark:bg-gray-800 dark:text-white' :
                    'bg-white text-black dark:bg-gray-800 dark:text-white'
                }`}
              onClick={() => toggleAccordion(index)}
            >
              {/* Static background color for the icon */}
              <div className=" flex items-center justify-center">
                <span
                  className={`transition-transform duration-500 ease-in-out transform 
                    ${activeAccordion === index ?
                       'bg-amber-500 rotate-180 text-black' : 
                       'rotate-0'
                    }`}
                >
                  {
                    activeAccordion === index ? (
                      <HiMinus size={40} />
                    ) : (
                      <GoPlus size={40} />
                    )
                  }
                </span>
              </div>
              <h4 className="text-base lg:text-lg font-semibold ">
                {item.title}
              </h4>
            </div>

            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out`}
              style={{
                maxHeight:
                  activeAccordion === index
                    ? `${contentRefs.current[index]?.scrollHeight}px`
                    : "0px",
              }}
              ref={(el) => (contentRefs.current[index] = el)}
            >
              <p className="text-sm lg:text-base text-gray-700 dark:text-gray-400 mt-2">{item.content}</p>
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default Accordion;
