import { PosterBlock } from "./PosterBlock"
import imageIcon from "../../assets/imageIcon.svg"
import editIcon from "../../assets/editIcon.svg"
import { Box, BoxProps, styled } from "@mui/material"
export const Poster = ({}) => {
  return (
    <CustomBox>
      <PosterBlock
        title="שם"
        customStyle={{
          width: "100%",
          maxWidth: "100%",
          height: 56,
          paddingRight: 16,
          alignItems: "start",
        }}
      />
      <PosterBlock title="תמונה 1" icon={imageIcon} />
      <PosterBlock title="קצת עלי" icon={editIcon} />
      <PosterBlock title="דברים משמעותיים בשבילי" icon={editIcon} />
      <PosterBlock title="תמונה 2" icon={imageIcon} />
      <PosterBlock title="דברים שאני מודה עליהם" icon={editIcon} />
      <PosterBlock title="תמונה 3" icon={imageIcon} />
    </CustomBox>
  )
}
const CustomBox = styled(Box)<BoxProps>(() => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
  gap: "20px",
  padding: "0 16px 0 16px",
}))
