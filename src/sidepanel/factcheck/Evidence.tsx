import React, { useEffect } from 'react';
import {getFactCheckMode} from './../../utils/pop_up_storage/storage';
import openPdf from './../../pdfViewer/openPdf';

interface EvidenceProps {
  idx : number;
  premise: {
    premise: string;
    relationship: string;
    url: string;
    title: string;
    date: string;
    confidence_level: number;
  };
}

const Evidence: React.FC<EvidenceProps> = ({idx, premise }) => {
  const [mode, setMode] = React.useState<string>('onlineDatabase');

  useEffect(() => {
    getFactCheckMode().then((result) => {
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

  const isValidURL = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };
  

  const getIcon = (url: string) => {
    let icon = "https://www.google.com/s2/favicons?sz=32&domain_url=" + url
    if (!isValidURL(url)) {
      icon = chrome.runtime.getURL("icon.png");
    }
    return icon;
  };

  const getUrlLink = (url: string) => {
    let newUrl = url
    if (!isValidURL(url)) {
      if (url.startsWith("#")) {
        url = url.substring(1);
      }
      const PAGE_URL = url;
      const TITLE = premise.title;
      newUrl = openPdf(PAGE_URL, TITLE);
    }
    return newUrl;
  }

  const getBasedUrl = (url: string) => {
    if (!isValidURL(url)) {
      return "Check out the source";
    }
    return new URL(url).hostname;
  }


  return (
    <div key={idx} className="evidence">
      <img src={getIcon(premise.url)} alt="icon of image" />
      <span style={{
        color: "white",
        backgroundColor: "green",
        borderRadius: "5px",
        padding: "5px",
        position: "absolute",
        right: "10px",
        bottom: "10px",
      }}>
        {premise.confidence_level}
      </span>
      <div>
        <a href={getUrlLink(premise.url)} target="_blank" rel="noopener noreferrer">
          {getBasedUrl(premise.url)}
        </a>
      </div>
      <h2 style={{ marginTop: mode !== 'google' ? '5px' : '0px' }}>
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