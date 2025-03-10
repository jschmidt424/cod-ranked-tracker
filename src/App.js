import React, { useState, useEffect, useRef } from "react";

const SRInput = ({ label, value, onChange }) => (
  <div className="input-group">
    <label>{label}</label>
    <input type="number" value={value} onChange={onChange} />
  </div>
);

const SRDifference = ({ difference }) => (
  <div className={difference >= 0 ? "sr-diff positive" : "sr-diff negative"}>
    {difference >= 0 ? `+${difference}` : difference}
  </div>
);

const getRankImage = (sr) => {
  if (sr >= 10000) return '/assets/img/Iridescent.webp';
  if (sr >= 7500) return '/assets/img/Crimson.webp';
  if (sr >= 5400) return '/assets/img/Diamond.webp';
  if (sr >= 3600) return '/assets/img/Platinum.webp';
  if (sr >= 2100) return '/assets/img/Gold.webp';
  if (sr >= 900) return '/assets/img/Silver.webp';
  return '/assets/img/Bronze.webp';
};

const SRDisplay = ({ currentSR, startingSR }) => {
  const difference = currentSR - startingSR;
  
  return (
    <div className="sr-display">
      <img src={getRankImage(currentSR)} alt="SR Rank" className="rank-image" />
      <div className="sr-value">{currentSR}</div>
      <SRDifference difference={difference} />
    </div>
  );
};

const OpenInNewTab = ({ currentSR, startingSR }) => {
  const newWindowRef = useRef(null);

  useEffect(() => {
    if (newWindowRef.current && !newWindowRef.current.closed) {
      newWindowRef.current.location.href = `/obs-overlay?currentSR=${currentSR}&startingSR=${startingSR}`;
    }
  }, [currentSR, startingSR]);

  const openTab = () => {
    newWindowRef.current = window.open(`/obs-overlay?currentSR=${currentSR}&startingSR=${startingSR}`, "_blank");
  };

  return <button onClick={openTab}>Open in New Tab</button>;
};

const OBSOverlay = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const currentSR = Number(queryParams.get("currentSR")) || 2000;
  const startingSR = Number(queryParams.get("startingSR")) || 2000;
  
  useEffect(() => {
    document.title = "SR Overlay";
  }, []);

  const difference = currentSR - startingSR;

  return (
    <div className="obs-overlay">
      <img src={getRankImage(currentSR)} alt="SR Rank" className="rank-image" />
      <div className={difference >= 0 ? "sr-diff positive" : "sr-diff negative"}>
        {difference >= 0 ? `+${difference}` : difference}
      </div>
    </div>
  );
};

export default function App() {
  const [startingSR, setStartingSR] = useState(2000);
  const [currentSR, setCurrentSR] = useState(2000);

  return (
    <div className="container">
      <h1>OBS SR Overlay</h1>
      <SRInput label="Starting SR" value={startingSR} onChange={(e) => setStartingSR(Number(e.target.value))} />
      <SRInput label="Current SR" value={currentSR} onChange={(e) => setCurrentSR(Number(e.target.value))} />
      <SRDisplay currentSR={currentSR} startingSR={startingSR} />
      <OpenInNewTab currentSR={currentSR} startingSR={startingSR} />
    </div>
  );
}

export { OBSOverlay };
