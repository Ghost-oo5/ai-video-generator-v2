'use client';

import { useState } from 'react';
import UseCaseSwitcher, {UseCase } from './components/UseCaseSwitcher';
import { SuplimaxSection } from './components/SuplimaxSection';
import { RealEstateSection } from './components/RealEstateSection';


const VideoGenerator = () => {
  const [useCase, setUseCase] = useState<UseCase>('suplimax');

  return (
    <div className="bg-slate-800 shadow-2xl rounded-xl p-6 md:p-10 w-full max-w-3xl transform transition-all duration-500 hover:scale-[1.01]">
      <header className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">
          AI Video Generator
        </h1>
        <p className="text-slate-400 mt-2 text-sm md:text-base">
          Craft compelling video scripts for marketing and real estate.
        </p>
      </header>

      <UseCaseSwitcher currentUseCase={useCase} onUseCaseChange={setUseCase} />
      
      <main className="mt-8">
        {useCase === 'suplimax' ? <SuplimaxSection /> : <RealEstateSection />}
      </main>
    </div>
  );
};

export default VideoGenerator;
