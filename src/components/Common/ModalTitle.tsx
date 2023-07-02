import { Typography } from "@mui/material"

interface ModalTitleProps {
  title: string
}
export const ModalTitle = ({ title }: ModalTitleProps) => (
  <Typography
    sx={{
      textAlign: "center",
      fontSize: "22px",
      fontWeight: 500,
      fontFamily: "Roboto",
      lineHeight: "30px",
      letterSpacing: " 0.15px",
    }}
  >
    {title}
  </Typography>
)
