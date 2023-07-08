import {
  Avatar,
  AvatarProps,
  Box,
  BoxProps,
  Divider,
  Typography,
  styled,
  useTheme,
} from "@mui/material"
import { PatientImage } from "../../model/PatientImage"
import edit from "../../assets/edit.svg"
import check from "../../assets/check.svg"
import { modalTitles } from "../../consts"
import { TypographyProps } from "@mui/system"
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
  const renderContent = () => {
    if (blockText) {
      return (
        <Box>
          <DisplayTextOnBlock title={title}>{blockText}</DisplayTextOnBlock>
        </Box>
      )
    }
    if (blockImage && blockImage.image) {
      return <img src={blockImage.image} height="72px" width="120px" />
    }
    return <Typography>{title}</Typography>
  }
  return (
    <WrapperBox
      blockImage={blockImage}
      blockText={blockText}
      customStyle={customStyle}
      onClick={onClick}
    >
      {icon && !(blockImage?.image || blockText) && (
        <CustomAvatar
          src={icon}
          imgProps={{ sx: { width: "45px", height: "30px" } }}
        />
      )}

      <Box
        sx={{
          overflow: "hidden",
          width: " 100%",
        }}
      >
        {(blockImage?.image || blockText) && title !== modalTitles.name && (
          <>
            <Box
              sx={{
                display: "flex",
                padding: "0 0 0 0.4rem",
                alignItems: "center",
              }}
            >
              <>
                <Box flexGrow={1}>
                  <img src={check} />
                </Box>

                <Typography flexGrow={2}>{title}</Typography>
              </>
            </Box>
            <Divider sx={{ borderColor: "white" }} />
          </>
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: `${
              title !== modalTitles.name ? "center" : "space-between"
            }`,
            alignItems: "center",
            padding: "0.5rem",
          }}
        >
          {renderContent()}

          {(blockImage?.image || blockText) && <img src={edit} />}
        </Box>
      </Box>
    </WrapperBox>
  )
}

const WrapperBox = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== "blockImage" && prop !== "customStyle" && prop !== "blockText",
})<StyledBoxProps>(({ customStyle, blockImage, blockText }) => {
  return {
    backgroundColor: `${blockImage?.image || blockText ? "#E5E6EB" : ""}`,
    borderRadius: "15px",
    boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.25)",
    cursor: "pointer",
    maxWidth: "156px",
    maxHeight: "126px",
    height: "126px",
    width: "156px",
    display: "flex",
    flexDirection: `${
      blockImage?.image || blockText ? "row-reverse" : "column"
    }`,
    alignItems: "center",
    ...(customStyle && { ...customStyle }),
  }
})

const CustomAvatar = styled(Avatar)<AvatarProps>(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  width: 64,
  height: 64,
  margin: "auto",
}))

const DisplayTextOnBlock = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "title",
})<TypographyProps>(({ title }) => ({
  width: "112px",
  overflow: "hidden",
  display: "-webkit-box",
  WebkitLineClamp: "3",
  WebkitBoxOrient: "vertical",
  height: `${title !== modalTitles.name ? "72px" : "unset"}`,
}))
