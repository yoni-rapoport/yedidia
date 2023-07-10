import { Fragment, ReactElement } from "react"
import {
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemButtonProps,
  ListItemIcon,
  ListItemText,
  styled,
  Divider,
  DrawerProps,
  Typography,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import pencil from "../assets/pencil.svg"
import shareIcon from "../assets/shareIcon.svg"
import serviceIcon from "../assets/serviceIcon.svg"
import terms from "../assets/terms.svg"
import exit from "../assets/exit.svg"
import { Link, useLocation } from "react-router-dom"
import { CustomLink } from "./Common/CustomLink"
import useToggle from "../hooks/useToggle"
import { remult } from "remult"
import { Roles } from "../model/roles"
import { copyLink, sendAsEmail, sendSmsToFamily } from "../utils/helpers"
import { Patient } from "../model/patient"
import { PatientAnswer } from "../model/PatientAnswer"
import { PatientImage } from "../model/PatientImage"

interface List {
  name: string
  icon: ReactElement<HTMLImageElement>
  path: string
}

const listToRender: List[] = [
  {
    name: "שאלון",
    icon: <img src={pencil} />,
    path: "/",
  },
  { name: "שיתוף שאלון", icon: <img src={shareIcon} />, path: "/" },
  { name: "על השירות", icon: <img src={serviceIcon} />, path: "/" },
  { name: "תנאי השימוש", icon: <img src={terms} />, path: "/" },
  { name: "יציאה", icon: <img src={exit} />, path: "/" },
]

interface StyledListItemButtonProps extends ListItemButtonProps {
  isLocation?: boolean
}
interface DrawerComponentProps {
  patient: Patient
  answers: PatientAnswer[]
  images?: PatientImage[]
}
export const DrawerComponent = ({
  patient,
  answers,
  images,
}: DrawerComponentProps) => {
  const { isOpen, toggle } = useToggle()
  const location = useLocation()

  const renderList = () => (
    <Box role="presentation" onClick={toggle}>
      <Typography sx={{ padding: "16px" }}>נעים להכיר</Typography>
      <List>
        {listToRender.map((itemInList, index) => (
          <div key={index}>
            <ListItem disablePadding sx={{ width: 264 }}>
              <CustomLink to={itemInList.path}>
                <CustomListItemButton
                  isLocation={itemInList.path === location.pathname}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 24,
                      paddingLeft: "12px",
                    }}
                  >
                    {itemInList.icon}
                  </ListItemIcon>
                  <ListItemText
                    sx={{ textAlign: "start" }}
                    primary={itemInList.name}
                  />
                </CustomListItemButton>
              </CustomLink>
            </ListItem>
            {itemInList.name === listToRender[2].name && <Divider />}
          </div>
        ))}
      </List>
      <Box display="flex" flexDirection="column">
        {remult.isAllowed(Roles.department) && (
          <button onClick={() => copyLink(patient)}>
            העתק קישור להשלמת פרטים
          </button>
        )}

        {remult.isAllowed(Roles.department) && (
          <button onClick={() => sendSmsToFamily(patient, answers, images)}>
            שלח SMS להשלמת פרטים
          </button>
        )}
        {remult.isAllowed(Roles.department) && (
          <button onClick={() => sendAsEmail(patient, answers, images)}>
            שלח במייל
          </button>
        )}
        <Link to="/signIn">כניסת מנהל</Link>
      </Box>
    </Box>
  )

  return (
    <Fragment>
      <Button onClick={toggle}>
        <MenuIcon />
      </Button>
      <CustomDrawer anchor={"left"} open={isOpen} onClose={toggle}>
        {renderList()}
      </CustomDrawer>
    </Fragment>
  )
}

const CustomListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== "isLocation",
})<StyledListItemButtonProps>(({ isLocation }) => ({
  borderRadius: "100px",
  margin: 2,
  ...(isLocation && {
    backgroundColor: "rgba(202, 226, 255, 1)",
  }),
}))

const CustomDrawer = styled(Drawer)<DrawerProps>(({}) => ({
  " .MuiPaper-elevation": {
    borderRadius: "0 16px 16px 16px",
    padding: 12,
  },
}))
