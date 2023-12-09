import React from "react";
import {
  Card,
  CardContent,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/joy";
import { Button, Col, Grid } from "rsuite";
import EditIcon from "@mui/icons-material/Edit";
import { auto } from "@popperjs/core";
import { toast } from "react-toastify";
import Study from "../model/study";

const StudiesGrid = ({ studies, setUrl, edit }) => {
  return (
    <Grid fluid style={{ padding: 8 }}>
      {studies
        .slice()
        .reverse()
        .map((Study: Study, index) => (
          <Col key={index} style={{ padding: 4 }}>
            <Card sx={{ width: 400, height: 200, position: "relative" }}>
              {edit && (
                <Stack
                  direction="row"
                  justifyContent="flex-end"
                  position="absolute"
                  top={0}
                  right={0}
                  p={1}
                >
                  <IconButton
                    onClick={() => {
                      // toast.success("Edit");
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </Stack>
              )}

              <div style={{ overflowY: "auto", maxHeight: "100%" }}>
                <CardContent orientation="horizontal">
                  <div>
                    <Typography level="h4">
                      {`${new Date(Study.timestamp).toLocaleString()}`}
                    </Typography>
                    <Typography fontSize={14}>{Study.note}</Typography>
                    {Study.links.map((link, index) => (
                      <React.Fragment key={index}>
                        <Link
                          fontSize={14}
                          component={Button}
                          onClick={() => setUrl(link)}
                        >
                          {"Link " + (index + 1) || ""}
                        </Link>
                        <br />
                      </React.Fragment>
                    ))}
                  </div>
                </CardContent>
              </div>
            </Card>
          </Col>
        ))}
    </Grid>
  );
};

export default StudiesGrid;
