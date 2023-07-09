import { Box, BoxProps, styled } from "@mui/material"
import { PatientImage } from "./model/PatientImage"

interface StyledBoxProps extends BoxProps {
  customStyle?: object
  blockImage?: PatientImage
  blockText?: string
}

export const StyledTile = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== "blockImage" && prop !== "customStyle" && prop !== "blockText",
})<StyledBoxProps>(({ customStyle, blockImage, blockText }) => {
  return {
    backgroundColor: `${blockImage?.image || blockText ? "#E5E6EB" : ""}`,
    borderRadius: "15px",
    boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.25)",
    cursor: "pointer",
    maxWidth: "155px",
    maxHeight: "126px",
    height: "126px",
    width: "156px",
    display: "flex",
    flexDirection: `${
      blockImage?.image || blockText ? "row-reverse" : "column"
    }`,
    alignItems: "center",
    ...customStyle,
  }
})
