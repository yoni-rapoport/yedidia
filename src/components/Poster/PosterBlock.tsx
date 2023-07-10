import {
  Avatar,
  AvatarProps,
  Box,
  Divider,
  Typography,
  styled,
} from "@mui/material"
import { PatientImage } from "../../model/PatientImage"
import edit from "../../assets/edit.svg"
import { modalTitles } from "../../consts"
import { TypographyProps } from "@mui/system"
import { StyledTile } from "../../sharedStyle"
import { CheckIcon } from "../../assets/check"
interface PosterBlockProps {
  title: string
  icon?: string
  customStyle?: object
  onClick?: () => void
  blockImage?: PatientImage
  blockText?: string
  className?: string
}

export const PosterBlock = ({
  title,
  icon,
  customStyle,
  onClick,
  blockImage,
  blockText,
  className,
}: PosterBlockProps) => {
  const renderContent = () => {
    if (blockText) {
      return (
        <Box display="flex">
          {title === modalTitles.name && (
            <Box sx={{ paddingRight: "0.2rem" }}>
              <CheckIcon color="success" />
            </Box>
          )}
          <DisplayTextOnBlock title={title}>{blockText}</DisplayTextOnBlock>
        </Box>
      )
    }
    if (blockImage && blockImage.image) {
      return <img src={blockImage.image} height="93.238px" width="98.27px" />
    }
    return <Typography>{title}</Typography>
  }
  return (
    <StyledTile
      blockImage={blockImage}
      blockText={blockText}
      customStyle={customStyle}
      onClick={onClick}
      className={className}
    >
      {icon && !(blockImage?.image || blockText) && (
        <CustomAvatar
          src={icon}
          imgProps={{ sx: { width: "45px", height: "30px" } }}
        />
      )}

      <Box
        sx={{
          display: blockImage?.image ? "flex" : "block",
          overflow: "hidden",
          width: "100%",
          justifyContent: blockImage?.image ? "end" : "unset",
        }}
      >
        {blockText && title !== modalTitles.name && (
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
                  <CheckIcon color="success" />
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
    </StyledTile>
  )
}

const CustomAvatar = styled(Avatar)<AvatarProps>(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  width: 64,
  height: 64,
  margin: "auto",
}))

const DisplayTextOnBlock = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "title",
})<TypographyProps>(({ title }) => ({
  width: `${title !== modalTitles.name ? "112px" : ""}`,
  overflow: "hidden",
  display: "-webkit-box",
  WebkitLineClamp: "3",
  WebkitBoxOrient: "vertical",
  height: `${title !== modalTitles.name ? "72px" : "unset"}`,
}))
