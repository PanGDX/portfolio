import React from 'react';
import SectionWrapper from './SectionWrapper';
import { SectionId } from '../types';

const Contact: React.FC = () => {
  return (
    <SectionWrapper id={SectionId.CONTACT} title="CONTACT">
      <div className="flex flex-col md:flex-row gap-16 md:gap-32">
        {/* Left Info */}
        <div className="md:w-1/3 space-y-8">
            <div>
                <h3 className="text-3xl font-bold text-green-400 mb-2">Have a project in mind?</h3>
                <p className="text-gray-400">My inbox is always open for new opportunities.</p>
            </div>
            
            <div className="space-y-4">
                <a href="#" className="flex items-center gap-4 text-xl text-gray-300 hover:text-white transition-colors">
                    <i className="fab fa-github text-2xl w-8 text-center"></i> Myphz
                </a>
                <a href="mailto:danielscanu45@outlook.it" className="flex items-center gap-4 text-xl text-gray-300 hover:text-white transition-colors">
                    <i className="fas fa-envelope text-2xl w-8 text-center"></i> danielscanu45@outlook.it
                </a>
                <a href="#" className="flex items-center gap-4 text-xl text-gray-300 hover:text-white transition-colors">
                    <i className="fab fa-linkedin text-2xl w-8 text-center"></i> Daniel Scanu
                </a>
            </div>
        </div>

        {/* Right Form */}
        <div className="md:w-2/3 max-w-lg">
            <form className="space-y-6">
                <div className="space-y-2">
                    <label htmlFor="email" className="block text-gray-300 text-lg">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        className="w-full bg-transparent border border-gray-600 rounded p-3 text-white focus:border-neon focus:outline-none focus:ring-1 focus:ring-neon transition-all"
                    />
                </div>
                
                <div className="space-y-2">
                    <label htmlFor="subject" className="block text-gray-300 text-lg">Subject</label>
                    <input 
                        type="text" 
                        id="subject" 
                        className="w-full bg-transparent border border-gray-600 rounded p-3 text-white focus:border-neon focus:outline-none focus:ring-1 focus:ring-neon transition-all"
                    />
                </div>
                
                <div className="space-y-2">
                    <label htmlFor="message" className="block text-gray-300 text-lg">Message</label>
                    <textarea 
                        id="message" 
                        rows={4}
                        className="w-full bg-transparent border border-gray-600 rounded p-3 text-white focus:border-neon focus:outline-none focus:ring-1 focus:ring-neon transition-all"
                    ></textarea>
                </div>

                <button 
                    type="submit" 
                    className="w-full bg-yellow-300 text-black font-bold text-xl py-3 rounded hover:bg-yellow-400 transition-colors shadow-[0_0_15px_rgba(253,224,71,0.3)]"
                >
                    Submit
                </button>
            </form>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Contact;
