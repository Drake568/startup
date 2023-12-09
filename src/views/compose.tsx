import React, { useState } from "react";
import "../css/home.css";
import "../css/explore.css";
import "rsuite/dist/rsuite.min.css";
import Navbar from "../components/Navbar";
import Split from "react-split";
import Iframe from "react-iframe";
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  Input,
  Stack,
  Textarea,
  Typography,
} from "@mui/joy";
import Plus from "@rsuite/icons/Plus";
import RemoveIcon from "@mui/icons-material/Remove";
import LaunchIcon from "@mui/icons-material/Launch";
import Study from "../model/study";
import { postStudy } from "../apiRouter";
import { toast } from "react-toastify";
import { set } from "lodash";

export default function compose() {
  const [expanded, setExpanded] = React.useState(true);
  const [url, setUrl] = React.useState(
    "https://www.churchofjesuschrist.org/study/scriptures?lang=eng&platform=web"
  );
  const [linkNum, setLinkNum] = React.useState(0);
  const [links, setLinks] = useState<string[]>([]);
  const [privateStudy, setPrivateStudy] = useState<boolean>(false);
  const [note, setNote] = useState<string>("");

  const handleAddLink = () => {
    setLinks([...links, ""]); // Add an empty link to the array
  };

  const handleRemoveLink = (indexToRemove: number) => {
    setLinks((prevLinks) =>
      prevLinks.filter((_, index) => index !== indexToRemove)
    );
  };

  const testLink = (index: number) => {
    setUrl(links[index]);
  };

  const saveStudy = () => {
    const newStudy: Study = {
      username: localStorage.getItem("username") || "",
      note: note,
      links: links,
      shared: privateStudy,
      timestamp: new Date(),
    };

    postStudy(newStudy);

    toast.success("Study saved!");

    setNote("");
    setLinks([]);
    setLinkNum(0);
  };

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
                <Box sx={{ flexGrow: 1, padding: 3 }}>
                  <Typography level="h4">{"Your Notes:"}</Typography>
                  <Textarea
                    minRows={10}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  ></Textarea>

                  <Typography level="h4">{"Links"}</Typography>
                  <div>
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <Stack direction="row" spacing={1} alignItems={"center"}>
                        <Button
                          startDecorator={<Plus />}
                          onClick={handleAddLink}
                        >
                          {"Add Link"}
                        </Button>
                        <Checkbox label="Private"></Checkbox>
                      </Stack>
                      <Button onClick={saveStudy}>Save Study</Button>
                    </Stack>

                    {/* Render Input components with IconButton for removing */}
                    {links.map((link, index) => (
                      <div
                        key={index}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Input
                          placeholder={`Link ${index + 1}`}
                          value={link}
                          onChange={(e) => {
                            const newLinks = [...links];
                            newLinks[index] = e.target.value;
                            setLinks(newLinks);
                          }}
                          style={{ marginTop: "8px" }}
                        />
                        <IconButton onClick={() => handleRemoveLink(index)}>
                          <RemoveIcon />
                        </IconButton>
                        <IconButton onClick={() => testLink(index)}>
                          <LaunchIcon />
                          Test
                        </IconButton>
                      </div>
                    ))}
                  </div>
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
