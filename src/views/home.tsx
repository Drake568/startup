import React from "react";
import "../css/home.css";
import "rsuite/dist/rsuite.min.css";
import Navbar from "../components/Navbar";
import Split from "react-split";
import { display, margin } from "@mui/system";
import Iframe from "react-iframe";

export function Home() {
  const [expanded, setExpanded] = React.useState(true);
  return (
    <div className="home-container">
      <main>
        <Navbar expanded={expanded} setExpanded={setExpanded} />
        <div className="content-container">
          <Split className="split">
            <div
              className="left-split"
              style={{ marginLeft: expanded ? 147 : 71 }}
            >
              <div className="left-split-content"></div>
            </div>
            <div className="right-split">
              <div className="iframe-container">
                <Iframe
                  url="https://www.churchofjesuschrist.org/?lang=eng"
                  width="100%"
                  height="100%"
                ></Iframe>
              </div>
            </div>
          </Split>
        </div>
      </main>
    </div>
  );
}
