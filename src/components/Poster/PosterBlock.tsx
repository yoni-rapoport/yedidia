import { Box, BoxProps, Typography, styled } from "@mui/material"
interface PosterBlockProps {
  title: string
  icon?: string
  customStyle?: object
  onClick?: object
  image? : Array<any>
}

interface StyledBoxProps extends BoxProps {
  customStyle?: object
}

export const PosterBlock = ({ title, icon, customStyle, onClick, image =[] }: PosterBlockProps) => {
  const firstImage = image[0] ?? []
  return (
    <CustomBox customStyle={customStyle} onClick={onClick}>
      {icon && <img height="48" width="48" src={icon} />}
      {firstImage.image && <img src={firstImage.image} height="50px" />}
      <Typography sx={{ color: "#FFFFFF", textAlign: "center" }}>
        {title}
      </Typography>
    </CustomBox>
  )
}
const CustomBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "customStyle",
})<StyledBoxProps>(({ customStyle }) => ({
  backgroundColor: "#1A74E4",
  borderRadius: "15px",
  boxShadow: "inset 0px -1px 2px rgba(0, 0, 0, 0.25)",
  cursor: "pointer",
  minWidth: "120px",
  maxWidth: "120px",
  padding: "0 16px 0 16px",
  height: 126,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  ...(customStyle && { ...customStyle }),
}))
