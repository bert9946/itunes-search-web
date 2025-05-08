import React from 'react';
import ResultItem from './ResultItem';
import { SearchResult } from '../types';

interface ResultListProps {
  results: SearchResult[];
}

const ResultList: React.FC<ResultListProps> = ({ results }) => {
  return (
    <div className="result-list">
      {results.length > 0 ? (
        results.map((result) => (
          <ResultItem key={result.trackId} result={result} />
        ))
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default ResultList;