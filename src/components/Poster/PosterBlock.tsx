import {
  Avatar,
  Box,
  BoxProps,
  Typography,
  styled,
  useTheme,
} from "@mui/material"
import { PatientImage } from "../../model/PatientImage"
import edit from "../../assets/edit.svg"
import { Patient } from "../../model/patient"
interface PosterBlockProps {
  title: string
  icon?: string
  customStyle?: object
  onClick?: () => void
  blockImage?: PatientImage
  blockText?: Patient
}

interface StyledBoxProps extends BoxProps {
  customStyle?: object
  blockImage?: PatientImage
  blockText?: Patient
}

export const PosterBlock = ({
  title,
  icon,
  customStyle,
  onClick,
  blockImage,
  blockText,
}: PosterBlockProps) => {
  const theme = useTheme()
  return (
    <CustomBox
      blockImage={blockImage}
      blockText={blockText}
      customStyle={customStyle}
      onClick={onClick}
    >
      {icon && !blockImage?.image && (
        <Avatar
          src={icon}
          sx={{
            backgroundColor: theme.palette.primary.main,
            width: 64,
            height: 64,
            margin: "auto",
          }}
          imgProps={{ sx: { width: "45px", height: "30px" } }}
        />
      )}
      {(blockImage?.image || blockText) && <img src={edit} />}
      {blockImage?.image && (
        <img src={blockImage.image} height="100%" width="100%" />
      )}
      {!blockImage?.image && (
        <Box sx={{ textAlign: "center" }}>
          {blockText?.name ? (
            <Box>{`${blockText.name} (חדר ${blockText.roomNumber})`}</Box>
          ) : (
            title
          )}
        </Box>
      )}
    </CustomBox>
  )
}
export const CustomBox = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== "blockImage" && prop !== "customStyle" && prop !== "blockText",
})<StyledBoxProps>(({ customStyle, blockImage, blockText }) => ({
  backgroundColor: `${blockImage?.image || blockText ? "#E5E6EB" : ""}`,
  borderRadius: "15px",
  boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.25)",
  cursor: "pointer",
  minWidth: "120px",
  maxWidth: "120px",
  padding: "16px",
  height: 126,
  display: "flex",
  flexDirection: `${blockImage?.image || blockText ? "row-reverse" : "column"}`,
  alignItems: "center",
  justifyContent: "center",

  ...(customStyle && { ...customStyle }),
}))
