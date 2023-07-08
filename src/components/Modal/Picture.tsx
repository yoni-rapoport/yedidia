import { ChangeEvent, Dispatch, SetStateAction, useRef } from "react"
import { PatientImage } from "../../model/PatientImage"
import { CustomBox } from "../Poster/PosterBlock"
import { Avatar, Box, Typography, styled } from "@mui/material"
import imageIcon from "../../assets/imageIcon.svg"
import theme from "../../theme"

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
      <h2>מומלץ לבחור בתמונה שמייצגת אותך היטב</h2>
      <CustomBox
        customStyle={{
          display: "flex",
          marginLeft: "auto",
          marginRight: "auto",
          width: 300,
          height: isImageExits ? 320 : 200,
          maxWidth: 300,
          maxHight: "100%",
        }}
      >
        {!images && <>טוען תמונות...</>}
        {!isImageExits && (
          <>
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
          </>
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
      </CustomBox>
      {!isImageExits && (
        <h2>לא מצאת? אפשר אפשר לשלוח בקשה לאדם אחר שיעלה תמונה.</h2>
      )}
    </>
  )
}
