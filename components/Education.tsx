import React from "react";
import SectionWrapper  from "./SectionWrapper";

const Education = () => {
  return (
    <SectionWrapper id="education" title="EDUCATION">
      <div className="flex flex-col md:flex-row gap-16">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/thumb/b/b9/Nus_logo.svg/320px-Nus_logo.svg.png"
              alt="NUS Logo"
              className="w-12 h-12 object-contain"
            />
            <h2 className="text-4xl font-bold text-white">NUS Modules</h2>
          </div>
          <ul className="list-disc ml-8 text-secondary">
            <li>CS2040C</li>
          </ul>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white"
            >
              <path
                d="M9 11L12 14L22 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h2 className="text-4xl font-bold text-white">Official Certificates</h2>
          </div>
          <ul className="list-disc ml-8 text-secondary">
            <li>AWS Cloud</li>
          </ul>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Education;
