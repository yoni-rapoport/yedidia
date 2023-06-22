import { Box, Button, Typography, TypographyProps, styled } from "@mui/material"
import { allText } from "../consts"
import heart from "../assets/heart.svg"
import leftBracket from "../assets/leftBracket.svg"
import rightBracket from "../assets/rightBracket.svg"
import { green } from "@mui/material/colors"
export const HomePage = () => {
  return (
    <Box
      sx={{
        padding: "0 24px 0 24px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Title fontFamily={"Spacer"}>{allText.niceToMeetTitle}</Title>
      <CustomParagraph>{allText.niceToMeet1}</CustomParagraph>
      <CustomParagraph>
        {allText.niceToMeet2}
        <img src={heart} />
      </CustomParagraph>
      <CustomParagraph>{allText.niceToMeet3}</CustomParagraph>
      <Button
        sx={{
          backgroundColor: green[600],
          color: "rgba(255, 255, 255, 1)",
          width: "100%",
          margin: "30px",
        }}
      >
        <img src={rightBracket} />
        <CustomParagraph>{allText.letsStart}</CustomParagraph>
        <img src={leftBracket} />
      </Button>
    </Box>
  )
}

const Title = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 700,
  fontSize: 48,
  color: theme.palette.primary.main,
  textAlign: "center",
  margin: "20px 0 20px 0",
}))
const CustomParagraph = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontSize: 20,
  fontWeight: 400,
  lineHeight: "24px",
  fontFamily: "Roboto",
  width: "100%",
  margin: "1rem 0 0 1rem",
}))
