import { ReactElement } from "react"
import { Box, Button, Modal, Typography } from "@mui/material"

interface CustomModalProps {
  open: boolean
  handleClose: () => void
  children?: ReactElement
  save: () => void
  modalTitle: string
}
const CustomModal = ({
  open,
  handleClose,
  children,
  save,
  modalTitle,
}: CustomModalProps) => {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    height: "100%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style, width: 400 }}>
        <Typography>{modalTitle}</Typography>
        {children}
        <button onClick={save}>שמור</button>
        <Button onClick={handleClose}>ביטול</Button>
      </Box>
    </Modal>
  )
}

export default CustomModal
