import React from 'react';
import SectionWrapper from './SectionWrapper';
import { SectionId } from '../types';

const About: React.FC = () => {
  return (
    <SectionWrapper id={SectionId.ABOUT} title="ABOUT">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-gray-300 text-lg leading-relaxed">
        <div className="space-y-6">
            <p>
                Software and hardware engineer with over 4 years of experience.
                Part time wizard.
            </p>
            <div className="flex items-center gap-2 text-neon mt-4">
                <i className="fab fa-linux text-2xl"></i> 
                <span>Avid Dual Booting Fan</span>
            </div>
        </div>
        
        <div className="space-y-6">
            <p>
                Passionate about computer science and engineering since childhood,
                I've spent over 7 years refining my skills through competitive programming,
                robotics and diverse projects.
            </p>
            <p>
                Ever since I was 10 I was fascinated with computers and engineers. It was
                akin to being a wizard - add this, smack that, delete those, pray and viola!
                Code is written, magic is done and people live better lives!
            </p>
            <p>
                I like to learn by doing. Over the years, I have worked on both software
                solutions involving web, app, artificial intelligence, as well as hardware problems
                involving Arduino, ESP32, FPGA and robotics.
            </p>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default About;
