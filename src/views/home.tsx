import React, { useEffect } from "react";
import "../css/home.css";
import "rsuite/dist/rsuite.min.css";
import Navbar from "../components/Navbar";
import Split from "react-split";
import Iframe from "react-iframe";
import { Box } from "@mui/joy";
import Study from "../model/study";
import StudiesGrid from "../components/StudiesGrid";
import { fetchStudies } from "../apiRouter";

const myStudy: Study = {
  username: "john_doe",
  note: "Study on React TypeScript",
  links: ["https://example.com", "https://typescriptlang.org"],
  shared: true,
  timestamp: new Date(),
};

export function Home() {
  const [expanded, setExpanded] = React.useState(true);
  const [url, setUrl] = React.useState(
    "https://www.churchofjesuschrist.org/study/scriptures?lang=eng&platform=web"
  );
  const [studies, setStudies] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = localStorage.getItem("username");
        if (username) {
          const data = await fetchStudies(username);
          console.log(data);
          if (data) {
            setStudies(data);
          }
        }
      } catch (error) {
        console.error("Error in fetchData:", error);
      }
    };

    fetchData();
  }, []);

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
              <div className="left-split-content">
                <Box sx={{ flexGrow: 1 }}>
                  <StudiesGrid
                    studies={studies}
                    setUrl={setUrl}
                    edit={true}
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
