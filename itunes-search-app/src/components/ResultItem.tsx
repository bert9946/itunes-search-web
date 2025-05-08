import React from 'react';

interface ResultItemProps {
  title: string;
  artist: string;
  url: string;
}

const ResultItem: React.FC<ResultItemProps> = ({ title, artist, url }) => {
  return (
    <div className="result-item">
      <h3 className="result-title">{title}</h3>
      <p className="result-artist">{artist}</p>
      <a href={url} target="_blank" rel="noopener noreferrer" className="result-link">
        View on iTunes
      </a>
    </div>
  );
};

export default ResultItem;