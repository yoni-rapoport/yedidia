import { Avatar, Box, BoxProps, Typography, styled } from "@mui/material"
import { PatientImage } from "../../model/PatientImage"

interface PosterBlockProps {
  title: string
  icon?: string
  customStyle?: object
  onClick?: () => void
  blockImage?: PatientImage
  blockText?: string
}

interface StyledBoxProps extends BoxProps {
  customStyle?: object
  blockImage?: PatientImage
  blockText?: string
}

export const PosterBlock = ({
  title,
  icon,
  customStyle,
  onClick,
  blockImage,
  blockText,
}: PosterBlockProps) => {
  return (
    <CustomBox
      blockText={blockText}
      customStyle={customStyle}
      onClick={onClick}
    >
      {icon && !blockImage?.image && (
        <Avatar
          src={icon}
          sx={{ backgroundColor: "#488EBD", width: 56, height: 56 }}
        />
      )}
      {blockImage?.image && (
        <img src={blockImage.image} height="100%" width="100%" />
      )}
      {!blockImage?.image && (
        <Typography sx={{ textAlign: "center", fontFamily: "Roboto" }}>
          {blockText ? blockText : title}
        </Typography>
      )}
    </CustomBox>
  )
}
const CustomBox = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== "blockImage" && prop !== "customStyle" && prop !== "blockText",
})<StyledBoxProps>(({ customStyle, blockImage, blockText }) => ({
  backgroundColor: `${blockImage || blockText ? "#E5E6EB" : ""}`,
  borderRadius: "15px",
  boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.25)",
  cursor: "pointer",
  minWidth: "120px",
  maxWidth: "120px",
  padding: "16px",
  height: 126,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  ...(customStyle && { ...customStyle }),
}))
