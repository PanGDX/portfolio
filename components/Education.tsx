import React from "react";
import SectionWrapper from "./SectionWrapper";
import { SectionId } from "../types";

const Education = () => {
  return (
    <SectionWrapper id={SectionId.EDUCATION} title="EDUCATION">
      <div className="flex flex-col gap-8 text-secondary">
        <div>
          <h2 className="text-4xl font-bold text-white mb-4">NUS Modules</h2>
          <ul className="list-disc ml-8">
            <li>CS2040C</li>
          </ul>
        </div>
        <div>
          <h2 className="text-4xl font-bold text-white mb-4">Certificate</h2>
          <ul className="list-disc ml-8">
            <li>AWS Cloud</li>
          </ul>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Education;
