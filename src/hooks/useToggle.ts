import { useState } from "react"

const useToggle = (initialState = false) => {
  const [isOpen, setIsOpen] = useState<boolean>(initialState)
  const setClose = () => {
    setIsOpen(false)
  }

  const setOpen = () => {
    setIsOpen(true)
  }

  const toggle = () => {
    setIsOpen(!isOpen)
  }
  return { isOpen, setClose, setOpen, toggle }
}
export default useToggle
