import React, { useEffect } from "react";
import "../css/home.css";
import "rsuite/dist/rsuite.min.css";
import Navbar from "../components/Navbar";
import Split from "react-split";
import Iframe from "react-iframe";
import { Box } from "@mui/joy";
import StudiesGrid from "../components/StudiesGrid";
import ExploreBar from "../components/ExploreBar";
import { fetchStudies } from "../apiRouter";
import { isMissing } from "../utils";

export default function Explore() {
  const [expanded, setExpanded] = React.useState(true);
  const [url, setUrl] = React.useState(
    "https://www.churchofjesuschrist.org/study/scriptures?lang=eng&platform=web"
  );
  const [studies, setStudies] = React.useState([]);

  const getFriendStudies = async (currentFriend) => {
    try {
      if (!isMissing(currentFriend)) {
        const data = await fetchStudies(currentFriend);
        console.log(data);
        if (data) {
          setStudies(data);
        }
      }
    } catch (error) {
      console.error("Error in fetchData:", error);
    }
  };

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
                <ExploreBar fetch={getFriendStudies} />
              </div>
              <div className="left-split-content" style={{ marginLeft: 10 }}>
                <Box sx={{ flexGrow: 1 }}>
                  <StudiesGrid
                    studies={studies}
                    setUrl={setUrl}
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
