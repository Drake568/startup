import React from "react";
import "../css/home.css";
import "rsuite/dist/rsuite.min.css";
import Navbar from "../components/Navbar";
import Split from "react-split";
import Iframe from "react-iframe";
import {
  Box,
  Button,
  List,
  ListItem,
  MenuItem,
  MenuList,
  Typography,
} from "@mui/joy";
import Study from "../model/study";
import StudiesGrid from "../components/StudiesGrid";
import { ClickAwayListener } from "@mui/base";
import { Popup } from "@mui/base/Unstable_Popup/Popup";
import ExploreBar from "../components/ExploreBar";
import FriendRequestModal from "../components/FriendRequestModal";

const myStudy: Study = {
  username: "john_doe",
  note: "Study on React TypeScript",
  links: ["https://example.com", "https://typescriptlang.org"],
  shared: true,
  timestamp: new Date(),
};

export default function Explore() {
  const [expanded, setExpanded] = React.useState(true);
  const [url, setUrl] = React.useState(
    "https://www.churchofjesuschrist.org/study/scriptures?lang=eng&platform=web"
  );
  const [studies, setStudies] = React.useState([myStudy, myStudy, myStudy]);

  return (
    <div className="home-container">
      <main>
        <Navbar expanded={expanded} setExpanded={setExpanded} />
        <div className="content-container">
          <Split className="split">
            <div
              className="left-split"
              style={{ marginLeft: expanded ? 140 : 60 }}
            >
              <div className="friend-info-container">
                <ExploreBar />
              </div>
              <div className="left-split-content" style={{ marginLeft: 10 }}>
                <Box sx={{ flexGrow: 1 }}>
                  <StudiesGrid
                    studies={studies}
                    setUrl={url}
                    edit={false}
                  ></StudiesGrid>
                </Box>
              </div>
            </div>
            <div className="right-split">
              <div className="iframe-container">
                <Iframe url={url} width="100%" height="100%"></Iframe>
              </div>
            </div>
          </Split>
        </div>
      </main>
    </div>
  );
}
