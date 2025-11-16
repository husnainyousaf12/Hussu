
import React, { useState, useCallback } from 'react';
import { generateCaptions, generateHashtags } from './services/geminiService';
import { Header } from './components/Header';
import { InputArea } from './components/InputArea';
import { ResultsDisplay } from './components/ResultsDisplay';
import { Footer } from './components/Footer';
import type { ResultType } from './types';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [results, setResults] = useState<string[]>([]);
  const [resultType, setResultType] = useState<ResultType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGeneration = useCallback(async (type: ResultType) => {
    if (!prompt.trim()) {
      setError('Please enter a category or keyword.');
      return;
    }
    
    if (type === 'captions' && prompt.toLowerCase().trim() === 'caption please') {
        setResults(["What type of caption do you want? (love, sad, attitude, travel, aesthetic, funny, motivational, etc.)"]);
        setResultType('captions');
        setError(null);
        setIsLoading(false);
        return;
    }

    setIsLoading(true);
    setError(null);
    setResultType(type);

    try {
      let generatedContent: string[] = [];
      if (type === 'captions') {
        generatedContent = await generateCaptions(prompt);
      } else {
        generatedContent = await generateHashtags(prompt);
      }
      setResults(generatedContent);
    } catch (err) {
      setError('Failed to generate content. Please try again.');
      console.error(err);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [prompt]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col items-center justify-between p-4 selection:bg-fuchsia-300 selection:text-fuchsia-900">
      <div className="w-full max-w-2xl mx-auto flex flex-col flex-grow">
        <Header />
        <main className="flex-grow flex flex-col items-center justify-center w-full py-8">
          <div className="w-full bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 space-y-6">
            <InputArea
              prompt={prompt}
              setPrompt={setPrompt}
              onGenerateCaptions={() => handleGeneration('captions')}
              onGenerateHashtags={() => handleGeneration('hashtags')}
              isLoading={isLoading}
            />
            <ResultsDisplay
              results={results}
              isLoading={isLoading}
              error={error}
              resultType={resultType}
            />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default App;
