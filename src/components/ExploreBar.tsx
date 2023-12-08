import React from "react";
import "./ExploreBar.css";
import "rsuite/dist/rsuite.min.css";
import { Button, MenuItem, MenuList } from "@mui/joy";

import { ClickAwayListener } from "@mui/base";
import { Popup } from "@mui/base/Unstable_Popup/Popup";
import { toast } from "react-toastify";

const ExploreBar = () => {
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [open, setOpen] = React.useState(false);
  const friendsFromStorage = localStorage.getItem("friends");
  const friends = friendsFromStorage ? JSON.parse(friendsFromStorage) : [];

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (friend) => {
    toast.success(`You selected ${friend}`);
  };

  const handleListKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Tab") {
      setOpen(false);
    } else if (event.key === "Escape") {
      buttonRef.current!.focus();
      setOpen(false);
    }
  };

  return (
    <div className="ExploreBar-container">
      <Button
        ref={buttonRef}
        id="composition-button"
        aria-controls={"composition-menu"}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="outlined"
        color="neutral"
        onClick={() => {
          setOpen(!open);
        }}
      >
        Select Friend
      </Button>
      <div className="composition-menu">
        <Popup
          role={undefined}
          id="composition-menu"
          open={open}
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
