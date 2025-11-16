
import React from 'react';
import { ResultItem } from './ResultItem';
import type { ResultType } from '../types';
import { SparkleIcon } from './icons';

interface ResultsDisplayProps {
  results: string[];
  isLoading: boolean;
  error: string | null;
  resultType: ResultType | null;
}

const LoadingSkeleton: React.FC = () => (
  <div className="space-y-3 animate-pulse">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="h-6 bg-gray-200 rounded-md"></div>
    ))}
  </div>
);

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  results,
  isLoading,
  error,
  resultType,
}) => {
  return (
    <div className="w-full min-h-[250px] p-4 bg-gray-50 rounded-lg border border-gray-200 flex flex-col">
      {isLoading ? (
        <LoadingSkeleton />
      ) : error ? (
        <div className="m-auto text-center text-red-500 font-medium">
          <p>{error}</p>
        </div>
      ) : results.length > 0 ? (
        <div className="flex flex-col space-y-2">
            <h3 className="text-lg font-semibold text-gray-800 capitalize mb-2">{resultType}</h3>
            {resultType === 'captions' ? (
                 results.map((result, index) => (
                    <ResultItem key={index} text={result} index={index} />
                ))
            ) : (
                <div className="flex flex-wrap gap-2">
                    {results.map((result, index) => (
                         <ResultItem key={index} text={result} index={index} isHashtag={true} />
                    ))}
                </div>
            )}
        </div>
      ) : (
        <div className="m-auto text-center text-gray-400">
          <SparkleIcon className="mx-auto h-12 w-12 text-gray-300" />
          <p className="mt-2">Your generated content will appear here.</p>
        </div>
      )}
    </div>
  );
};
