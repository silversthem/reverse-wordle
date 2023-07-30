import React from "react";
import "./App.css";
import NormalMode from "./components/modes/Normal";
import ChallengeMode from "./components/modes/Challenge";

type Modes = "normal" | "challenge";

function App() {
  const [mode, setMode] = React.useState<Modes | null>(null);
  const switchToMode = (m: Modes) => () => setMode(m);
  const resetMode = () => setMode(null);

  return (
    <div className="app">
      <div className="app-header">
        <button type="button" onClick={resetMode}>
          Reverse Wordle
        </button>
      </div>
      <div className="app-body">
        {mode === "normal" && <NormalMode />}
        {mode === "challenge" && <ChallengeMode />}
        {!mode && (
          <div className="chose-mode">
            <button type="button" onClick={switchToMode("normal")}>
              Normal Mode
            </button>
            <button type="button" onClick={switchToMode("challenge")}>
              Challenge Mode
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
