import React, { useEffect, useState } from "react";
import WaveSurfer from "wavesurfer.js";
interface WaveformProps {
  audioUrl: any;
}

const Waveform: React.FC<WaveformProps> = ({ audioUrl }) => {
  const [waveSurfer, setWaveSurfer] = useState<WaveSurfer | null>(null);

  useEffect(() => {
    const options = {
      container: "#waveform",
      waveColor: "#555",
      progressColor: "#03a9f4",
      cursorWidth: 1,
      cursorColor: "#03a9f4",
      barWidth: 2,
      barHeight: 1,
    };

    const instance = WaveSurfer.create(options);
    instance.load(audioUrl);
    setWaveSurfer(instance);
    return () => {
      instance.destroy();
    };
  }, [audioUrl]);

  const handlePlay = () => {
    if (waveSurfer) {
      waveSurfer.playPause();
    }
  };
  return (
    <div>
      <div id="waveform" />
      <button onClick={handlePlay}>Play</button>
    </div>
  );
};

export default Waveform;
