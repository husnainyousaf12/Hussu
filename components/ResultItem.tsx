
import React, { useState } from 'react';
import { CopyIcon, CheckIcon } from './icons';

interface ResultItemProps {
  text: string;
  index: number;
  isHashtag?: boolean;
}

export const ResultItem: React.FC<ResultItemProps> = ({ text, index, isHashtag = false }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  if (isHashtag) {
    return (
        <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1.5 rounded-full hover:bg-blue-200 transition-colors"
        >
            <span>{text}</span>
            {isCopied ? <CheckIcon className="h-4 w-4 text-blue-600" /> : <CopyIcon className="h-4 w-4 text-blue-600" />}
        </button>
    )
  }

  return (
    <div className="group flex items-center justify-between p-3 bg-white hover:bg-fuchsia-50 rounded-lg transition-colors duration-200 border border-gray-200">
      <p className="text-gray-700">{text}</p>
      <button
        onClick={handleCopy}
        className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-md hover:bg-fuchsia-100"
        title="Copy to clipboard"
      >
        {isCopied ? (
          <CheckIcon className="h-5 w-5 text-green-500" />
        ) : (
          <CopyIcon className="h-5 w-5 text-gray-500" />
        )}
      </button>
    </div>
  );
};
