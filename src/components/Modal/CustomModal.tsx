import { ReactElement } from "react"
import {
  Box,
  Button,
  IconButton,
  Modal,
  Typography,
  styled,
} from "@mui/material"
import rightArrow from "../../assets/rightArrow.svg"
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
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    height: "100%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style }}>
        <Box>
          <Box
            sx={{
              display: "flex",
              padding: "0.5rem 0.3rem",
              alignItems: "center",
              borderImage:
                "linear-gradient(rgba(72, 142, 189, 1), rgba(165, 206, 255, 1)) 0.5",
              borderWidth: "0 0 2px 0",
              borderStyle: "solid",
            }}
          >
            <IconButton onClick={handleClose}>
              <img src={rightArrow} />
            </IconButton>

            <Typography
              sx={{
                fontSize: "24px",
                letterSpacing: "0.15px",
              }}
            >
              {modalTitle}
            </Typography>
          </Box>
          <Box sx={{ padding: "0.1rem 1.875rem" }}>{children}</Box>
        </Box>
        <ButtonRapper>
          <Button variant="contained" onClick={save}>
            אישור
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            ביטול
          </Button>
        </ButtonRapper>
      </Box>
    </Modal>
  )
}

const ButtonRapper = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: "#F0F0F0",
  padding: "1rem 1.5rem",
  borderTop: "1px solid rgba(202, 196, 208, 1)",
}))
export default CustomModal
