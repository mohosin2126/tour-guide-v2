import "./index.css";
import { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";

const AccordionMenu = ({
  icon:Icon,
  title = "",
  children,
  isOpen,
  onToggle,
}) => {
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen]);

  return (
    <div className="accordion-head">
      <button className="accordion-button" onClick={onToggle}>
        {isOpen ? (
          <div className="accordion-button-class">
            <div className={`accordion-menu ${isOpen && "text-[#419197]"}`}>
            <Icon className="text-xl font-bold" />
              {title}
            </div>
            <MdKeyboardArrowDown className="text-2xl scale-105 font-bold" />
          </div>
        ) : (
          <div className="accordion-button-class">
            <div className="accordion-menu">
            <Icon className="text-xl font-bold" />
              {title}
            </div>
            <MdKeyboardArrowRight className="text-2xl font-bold" />
          </div>
        )}
      </button>
      <div
        className={`accordion-transition ${isOpen ? "max-h-full" : "max-h-0"}`}
        style={{ maxHeight: isOpen ? `${height}px` : "0px" }}
        ref={contentRef}
      >
        <div className="accordion-component">
          <ul className="p-2 accordion-ul ml-3">{children}</ul>
        </div>
      </div>
    </div>
  );
};

export default AccordionMenu;
