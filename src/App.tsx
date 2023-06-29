import { useEffect, useMemo, useState } from "react"
import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom"
import rtlPlugin from "stylis-plugin-rtl"
import { prefixer } from "stylis"
import createCache from "@emotion/cache"
import { CacheProvider } from "@emotion/react"
import SignIn from "./components/sign-in"
import { remult } from "remult"
import { SignInController } from "./controllers/sign-in-controller"
import Departments from "./components/departments"
import Patients from "./components/patients"
import { DepartmentSignIn, PatientSignIn } from "./components/departmentSignIn"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Roles } from "./model/roles"
import PatientInfo from "./components/patientInfo"
import { departmentsRoute } from "./utils"
import { DrawerComponent } from "./components/DrawerComponent"
import { ThemeProvider } from "@mui/material"
import theme from "./theme"

import { HomePage } from "./components/HomePage"
function App() {
  const [_, render] = useState<{}>()
  const navigate = useNavigate()
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          mutations: {
            onError: (error: any) => alert(error.message),
          },
        },
      }),
    []
  )
  useEffect(() => {
    SignInController.currentUser().then((user) => {
      remult.user = user
      render({})
    })
  }, [])
  async function signOut() {
    await SignInController.signOut()
    remult.user = undefined
    render({})
  }
  const defaultRoute = useMemo(() => {
    if (!remult.authenticated()) {
      return (
        <>
          <HomePage />
          <Link to="/signIn">כניסת מנהל</Link>
        </>
      )
    } else if (remult.isAllowed(Roles.admin)) {
      return <Navigate to={departmentsRoute} replace />
    } else if (remult.isAllowed(Roles.department)) {
      return (
        <Navigate to={departmentsRoute + remult.user!.departmentId} replace />
      )
    }
  }, [remult.user])
  if (_ === undefined) return <>טוען...</>
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  })

  return (
    <>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            {remult.authenticated() && (
              <div>
                שלום {remult.user?.name} (
                {remult.isAllowed(Roles.admin)
                  ? "מנהל"
                  : remult.isAllowed(Roles.department)
                  ? "מחלקה"
                  : "מטופל"}
                ){"  "}
                <button onClick={signOut}>יציאה</button>
              </div>
            )}
            <DrawerComponent />
            <Routes>
              <Route path="/patients/:id" element={<PatientInfo />} />
              <Route path="/patientSignIn/:id" element={<PatientSignIn />} />
              <Route
                path="/departmentSignIn/:id"
                element={<DepartmentSignIn />}
              />
              {remult.isAllowed(Roles.department) && (
                <Route path={departmentsRoute + ":id"} element={<Patients />} />
              )}
              {remult.isAllowed(Roles.admin) && (
                <>
                  <Route path={departmentsRoute} element={<Departments />} />
                </>
              )}

              <Route
                path="/signIn"
                element={
                  <SignIn
                    signedIn={() => {
                      render({})
                      navigate(departmentsRoute)
                    }}
                  />
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
              <Route path="/" element={defaultRoute} />
            </Routes>
          </QueryClientProvider>
        </ThemeProvider>
      </CacheProvider>
    </>
  )
}

export default App

//TODO - העתק קישור למטופל
//TODO - ערוך מטופל
