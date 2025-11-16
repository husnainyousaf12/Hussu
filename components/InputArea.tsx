
import React from 'react';
import { SparkleIcon, HashtagIcon } from './icons';

interface InputAreaProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onGenerateCaptions: () => void;
  onGenerateHashtags: () => void;
  isLoading: boolean;
}

export const InputArea: React.FC<InputAreaProps> = ({
  prompt,
  setPrompt,
  onGenerateCaptions,
  onGenerateHashtags,
  isLoading,
}) => {
  return (
    <div className="w-full flex flex-col space-y-4">
      <label htmlFor="prompt-input" className="font-semibold text-gray-700">
        Enter a category or keyword
      </label>
      <textarea
        id="prompt-input"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="e.g., travel, funny, aesthetic..."
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition duration-200 resize-none h-24"
        disabled={isLoading}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={onGenerateCaptions}
          disabled={isLoading}
          className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <SparkleIcon />
          <span>Generate Captions</span>
        </button>
        <button
          onClick={onGenerateHashtags}
          disabled={isLoading}
          className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-500 to-teal-400 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <HashtagIcon />
          <span>Generate Hashtags</span>
        </button>
      </div>
    </div>
  );
};
