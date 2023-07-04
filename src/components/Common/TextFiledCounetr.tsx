import { forwardRef } from "react"
import {
  TextField,
  TextFieldProps as MuiTextFieldProps,
  Box,
} from "@mui/material"

export const TextFieldCounter = forwardRef<
  HTMLInputElement,
  MuiTextFieldProps & { counter?: boolean }
>(
  (
    {
      counter = true,
      onFocus,
      onBlur,
      helperText,
      inputProps,
      value,
      ...other
    },
    ref
  ) => {
    if (counter && !inputProps?.maxLength) {
      throw new Error("counter needs maxLength to be set on inputProps")
    }

    return (
      <>
        <TextField
          {...other}
          variant="filled"
          value={value}
          ref={ref}
          inputProps={{ ...inputProps }}
          helperText={
            <Box
              component="span"
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>{helperText}</span>
              {counter && (
                <Box
                  sx={{
                    position: "absolute",
                    right: "10px ",
                    bottom: "25px",
                  }}
                >
                  {`${(value as string).length} / ${inputProps?.maxLength}`}
                </Box>
              )}
            </Box>
          }
        ></TextField>
      </>
    )
  }
)
