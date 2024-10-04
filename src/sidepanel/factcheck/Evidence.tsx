import React, { useEffect } from 'react';
import {getFromStorage} from './../../utils/storage';

interface EvidenceProps {
  idx : number;
  premise: {
    premise: string;
    relationship: string;
    url: string;
    title: string;
    date: string;
  };
}

const Evidence: React.FC<EvidenceProps> = ({idx, premise }) => {
  const [mode, setMode] = React.useState<string>('onlineDatabase');

  useEffect(() => {
    getFromStorage('factCheckMode').then((result) => {
      const data = result as { factCheckMode: string };
      if (data.factCheckMode) {
        setMode(data.factCheckMode);
      }
    }).catch((error) => {
      console.error('Error retrieving factCheckMode from storage:', error);
    });

    const handleStorageChange = (changes: { [key: string]: chrome.storage.StorageChange }, areaName: string) => {
      if (areaName === 'local' && changes.factCheckMode) {
        const newMode = changes.factCheckMode.newValue as string;
        setMode(newMode);
      }
    };
  }, []);

  const getIcon = (url: string) => {
    return "https://www.google.com/s2/favicons?sz=32&domain_url=" + url;
  };

  const getBasedUrl = (url: string) => {
    return new URL(url).hostname;
  }

  return (
    <div key={idx} className="evidence">
      <img src={getIcon(premise.url)} alt="icon of image" />
      <div>
        <a href={premise.url} target="_blank" rel="noopener noreferrer">
          {getBasedUrl(premise.url)}
        </a>
      </div>
      <h2>
        {premise.title}
      </h2>
      <p>
        {premise.premise}
      </p>
      <p className="date">
        {premise.date ? `Published Date: ${premise.date}` : ''}
      </p>
      {
        mode != 'google' && (
          <div className={`relationship ${premise.relationship}`}>
            {premise.relationship}
          </div>
        )
      }
    </div>
  );
};

export default Evidence;