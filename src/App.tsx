import React, { Fragment } from "react";
import Waveform from "./component/Music/WaveForm";
import music from "./assets/music/Track1.mp3";
const App: React.FC = function () {
  return (
    <Fragment>
      <div>
        <h1>WaveSurfer React Example</h1>
        <Waveform audioUrl={music} />
      </div>
    </Fragment>
  );
};

export default App;
