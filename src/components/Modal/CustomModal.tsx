import React from "react"
import Name from "./Name"
import { Box, Button, Modal } from "@mui/material"
import Picture from "./Picture"

const CustomModal = ({ open, handleClose, onChange, patient, onInput, pageToDisplay, save, images, setImages }) => {

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const getPageToDisplay = (key) => {
    switch (key) {
      case 'name':
        return (
          <Name
            value={patient.name}
            onChange={onChange}
          />
        )
      case 'pic':
        return (
          <Picture
            images={images}
            onInput={onInput}
            setImages={setImages}
          />
        )
      default:
        break;
    }
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style, width: 400 }}>
        {getPageToDisplay(pageToDisplay)}
        <button onClick={save}>שמור</button>
        <Button onClick={handleClose}>ביטול</Button>
      </Box>
    </Modal>
  )
}

export default CustomModal
