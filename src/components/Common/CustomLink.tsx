import { ReactElement } from "react"
import { styled } from "@mui/material"
import { Link } from "react-router-dom"

interface CustomLinkProps {
  to: string
  children: ReactElement
}
export const CustomLink = ({ to, children }: CustomLinkProps) => {
  return <CustomLinkStyle to={to}>{children}</CustomLinkStyle>
}

const CustomLinkStyle = styled(Link)(({}) => ({
  textDecoration: "none",
  color: "black",
  width: "100%",
}))
