import React from "react";
import SectionWrapper from '../SectionWrapper';
import { SectionId } from '../../types';

const Education = () => {
  return (
    <SectionWrapper id={SectionId.EDUCATION} title="EDUCATION">
      <div className="flex flex-col gap-16 text-gray-300 text-lg">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <img
              src="/assets/nus.png"
              alt="NUS Logo"
              className="w-16 h-16 object-contain"
            />
            <h2 className="text-3xl font-bold text-white">National University of Singapore</h2>
          </div>
          <p className="mb-4 font-bold">Bachelor of Engineering in Computer Engineering</p>
          <p className="text-gray-400 mb-6">August 2024 - May 2028</p>
          <ul className="list-disc ml-8 text-secondary">
            <li>CS2040C - Data Structures and Algorithms (A)</li>
            <li>EE2026 - Digital Design, Logic and FPGA</li>
          </ul>
        </div>
        <div>
          <div className="flex items-center gap-4 mb-4">
            <img
              src="/assets/certificate.svg"
              alt="NUS Logo"
              className="w-16 h-16 object-contain"
            />
            <h2 className="text-3xl font-bold text-white">Certifications</h2>
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
