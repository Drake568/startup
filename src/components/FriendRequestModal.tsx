import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import { ModalClose, ModalDialog, Typography } from "@mui/joy";
import RemoveIcon from "@mui/icons-material/Remove";
import CheckIcon from "@mui/icons-material/Check";
import {
  acceptFriendRequest,
  getFriendRequests,
  rejectFriendRequest,
} from "../apiRouter";
import FriendRequest from "../model/friendRequest";

const FriendRequestModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFriendRequests();
        console.log(data);
        if (data) {
          setFriendRequests(data);
        }
      } catch (error) {
        console.error("Error in fetchData:", error);
      }
    };

    fetchData();
  }, []);

  const handleIconClick = () => {
    setIsModalOpen(true);
  };

  const handleAccept = async (index) => {
    try {
      const data = await acceptFriendRequest(friendRequests[index]);
      if (data) {
        const newFriendRequests = [...friendRequests];
        newFriendRequests.splice(index, 1);
        setFriendRequests(newFriendRequests);
        if (newFriendRequests.length === 0) {
          setIsModalOpen(false);
        }
        const oldFriends = JSON.parse(localStorage.getItem("friends") || "[]");
        const newFriends = [...oldFriends, friendRequests[index].from];
        localStorage.setItem("friends", JSON.stringify(newFriends));
      }
    } catch (error) {
      console.error("Error in fetchData:", error);
    }
  };

  const handleReject = async (index) => {
    try {
      const data = await rejectFriendRequest(friendRequests[index]);
      if (data) {
        const newFriendRequests = [...friendRequests];
        newFriendRequests.splice(index, 1);
        setFriendRequests(newFriendRequests);
        if (newFriendRequests.length === 0) {
          setIsModalOpen(false);
        }
      }
    } catch (error) {
      console.error("Error in fetchData:", error);
    }
  };

  return (
    <div>
      {friendRequests.length !== 0 && (
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
              <Typography>{request.from}</Typography>
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
