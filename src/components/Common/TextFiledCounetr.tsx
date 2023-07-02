import { forwardRef, useState } from "react"
import {
  TextField,
  TextFieldProps as MuiTextFieldProps,
  Box,
} from "@mui/material"

export const TextFieldCounter = forwardRef<
  HTMLInputElement,
  MuiTextFieldProps & { counter?: boolean }
>((props, ref) => {
  const { counter = false, onFocus, onBlur, helperText, ...other } = props

  if (counter && !props.inputProps?.maxLength) {
    throw new Error("counter needs maxLength to be set on inputProps")
  }
  if (counter && props.type !== "text") {
    throw new Error("invalid input type")
  }

  const [visible, setVisible] = useState(false)

  return (
    <TextField
      ref={ref}
      {...other}
      onFocus={(event) => {
        setVisible(true)
        onFocus && onFocus(event)
      }}
      onBlur={(event) => {
        setVisible(false)
        onBlur && onBlur(event)
      }}
      helperText={
        <Box
          component="span"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <span>{helperText}</span>
          {visible && counter && (
            <span>
              {`${(props.value as string).length} / ${
                props?.inputProps?.maxLength
              }`}
            </span>
          )}
        </Box>
      }
    />
  )
})

TextFieldCounter.displayName = "TextField"
