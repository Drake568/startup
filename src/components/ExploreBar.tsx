import React, { useEffect } from "react";
import "./ExploreBar.css";
import "rsuite/dist/rsuite.min.css";
import { Button, MenuItem, MenuList, Modal, Stack } from "@mui/joy";
import { ClickAwayListener } from "@mui/base";
import { Popup } from "@mui/base/Unstable_Popup/Popup";
import { toast } from "react-toastify";
import { Input } from "rsuite";
import FriendRequestModal from "./FriendRequestModal";
import { sendFriendRequest } from "../apiRouter";
import { isMissing } from "../utils";
import { set } from "lodash";
import { useWebSocket } from "./Websocket";

const ExploreBar = ({ fetch }) => {
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [open, setOpen] = React.useState(false);
  const [friendListOpen, setFriendListOpen] = React.useState(false);
  const friendsFromStorage = localStorage.getItem("friends");
  const friends = friendsFromStorage ? JSON.parse(friendsFromStorage) : [];
  const [searchInput, setSearchInput] = React.useState("");
  const socket = useWebSocket();

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (friend) => {
    setFriendListOpen(false);
    fetch(friend);
  };

  const handleListKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Tab") {
      setOpen(false);
    } else if (event.key === "Escape") {
      buttonRef.current!.focus();
      setOpen(false);
    }
  };

  async function addFriendRequest() {
    if (searchInput == localStorage.getItem("username")) {
      toast.error("You cannot send a friend request to yourself.");
      return;
    }
    const data = await sendFriendRequest(
      localStorage.getItem("username"),
      searchInput
    );
    if (data) {
      if (data.message === "Friend request already exists") {
        toast.error(data.message);
      } else {
        toast.success(data.message);
        if (socket?.socket) {
          // toast.success("WooooHoooo");
          socket.socket.send(
            JSON.stringify({
              type: "friendRequest",
              friendUsername: searchInput,
            })
          );
        }
      }
    }
  }

  return (
    <div className="ExploreBar-container">
      <Stack direction="row" spacing={2}>
        <Button
          ref={buttonRef}
          id="composition-button"
          aria-controls={"composition-menu"}
          aria-haspopup="true"
          aria-expanded={friendListOpen ? "true" : undefined}
          variant="plain"
          color="primary"
          onClick={() => {
            setFriendListOpen(!friendListOpen);
          }}
          disabled={friends.length === 0}
        >
          Select Friend
        </Button>
        <Input
          placeholder="Search for Friends"
          value={searchInput}
          style={{ width: "150px" }}
          onChange={(e) => {
            setSearchInput(e.valueOf().toString());
          }}
        />
        <Button
          size="sm"
          disabled={isMissing(searchInput)}
          variant="plain"
          onClick={addFriendRequest}
        >
          {" "}
          Send
        </Button>
        <FriendRequestModal />
      </Stack>
      <div className="composition-menu">
        <Popup
          role={undefined}
          id="composition-menu"
          open={friendListOpen}
          disablePortal
          modifiers={[
            {
              name: "offset",
              options: {
                offset: [0, 4],
              },
            },
          ]}
        >
          <ClickAwayListener
            onClickAway={(event) => {
              if (event.target !== buttonRef.current) {
                handleClose();
              }
            }}
          >
            <MenuList
              variant="outlined"
              onKeyDown={handleListKeyDown}
              sx={{ boxShadow: "md" }}
            >
              {friends.map((friend, index) => (
                <MenuItem key={index} onClick={() => handleClick(friend)}>
                  {friend}
                </MenuItem>
              ))}
            </MenuList>
          </ClickAwayListener>
        </Popup>
      </div>
    </div>
  );
};

export default ExploreBar;
