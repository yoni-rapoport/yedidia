import { ChangeEvent, Dispatch, SetStateAction, useRef } from "react"
import { PatientImage } from "../../model/PatientImage"
import { Avatar, Box, Typography, styled } from "@mui/material"
import imageIcon from "../../assets/imageIcon.svg"
import theme from "../../theme"
import { StyledTile } from "../../sharedStyle"

//[ ] add loader while image is loaded from the server
interface PictureProps {
  images?: PatientImage[] | undefined
  onInput: (e: ChangeEvent<HTMLInputElement>) => void
  setImages: Dispatch<SetStateAction<PatientImage[] | undefined>>
}
export const Picture = ({ images, onInput, setImages }: PictureProps) => {
  const hiddenFileInput = useRef<HTMLInputElement>(null)
  const deleteFileInput = useRef<HTMLButtonElement>(null)
  const isImageExits = images && images[0].image.length > 0

  const uploadImage = () => {
    hiddenFileInput.current!.click()
  }

  const removeImage = () => {
    deleteFileInput.current!.click()
  }

  const BoxImageRapper = styled(Box)(() => ({
    display: "flex",
    justifyContent: "center",
    padding: "1rem 1.5rem",
    backgroundColor: "white",
    borderRadius: "2rem",
    width: 100,
    height: 20,
    marginLeft: "25%",
    borderWidth: "1px",
    borderStyle: "solid",
  }))

  return (
    <>
      <Typography fontSize={22}>
        מומלץ לבחור בתמונה שמייצגת אותך היטב
      </Typography>
      <StyledTile
        customStyle={{
          marginLeft: "auto",
          marginRight: "auto",
          width: 300,
          height: !isImageExits ? 315 : 200,
          maxWidth: 300,
          maxHeight: 315,
        }}
      >
        {!images && <>טוען תמונות...</>}
        {!isImageExits && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar
                onClick={uploadImage}
                src={imageIcon}
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  width: 64,
                  height: 64,
                }}
                imgProps={{ sx: { width: "45px", height: "30px" } }}
              />
              <Typography>העלאת תמונה</Typography>
              <input
                type="file"
                onInput={onInput}
                accept="image/*"
                multiple={true}
                ref={hiddenFileInput}
                style={{
                  display: "none",
                  height: "100%",
                  width: "100%",
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  opacity: 0,
                  cursor: "pointer",
                }}
              />
            </Box>
          </Box>
        )}

        {images
          ?.filter((x) => x.image)
          .map((image) => {
            function deleteImage() {
              setImages((images) =>
                images!.map((i) => (i === image ? { ...image, image: "" } : i))
              )
            }
            return (
              <div key={image.id}>
                <img src={image.image} width="300px" height="250px" />
                {isImageExits && (
                  <>
                    <BoxImageRapper onClick={removeImage}>
                      <Typography>מחיקה</Typography>
                    </BoxImageRapper>
                  </>
                )}
                <button
                  ref={deleteFileInput}
                  style={{ display: "none" }}
                  onClick={deleteImage}
                >
                  מחק תמונה
                </button>
              </div>
            )
          })}
      </StyledTile>
      {!isImageExits && (
        <Typography fontSize={22}>
          לא מצאת? אפשר אפשר לשלוח בקשה לאדם אחר שיעלה תמונה.
        </Typography>
      )}
    </>
  )
}
//[x] on the small - make sure the also add padding to the right, as in the figma
