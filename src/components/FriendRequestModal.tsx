import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import { ModalClose, ModalDialog, Typography } from "@mui/joy";
import RemoveIcon from "@mui/icons-material/Remove";
import CheckIcon from "@mui/icons-material/Check";

const FriendRequestModal = ({ hasFriendRequest, friendRequestData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [friendRequests, setFriendRequests] = useState<string[]>([
    "Jacob",
    "John",
    "Jane",
  ]);

  const handleIconClick = () => {
    setIsModalOpen(true);
  };

  const handleAccept = (index) => {
    // Implement logic to accept friend request
    // Close the modal
    setIsModalOpen(false);
  };

  const handleReject = (index) => {
    // Implement logic to reject friend request
    // Close the modal
    setIsModalOpen(false);
  };

  return (
    <div>
      {hasFriendRequest && (
        <IconButton style={{ position: "relative" }} onClick={handleIconClick}>
          <NotificationImportantIcon color="warning" />
        </IconButton>
      )}

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalDialog>
          <ModalClose onClick={() => setIsModalOpen(false)} />
          <Typography>Friend Requests</Typography>
          {friendRequests.map((request, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center" }}>
              <Typography>{request}</Typography>
              <IconButton onClick={() => handleReject(index)}>
                <RemoveIcon />
              </IconButton>
              <IconButton onClick={() => handleAccept(index)}>
                <CheckIcon />
              </IconButton>
            </div>
          ))}
        </ModalDialog>
      </Modal>
    </div>
  );
};

export default FriendRequestModal;
