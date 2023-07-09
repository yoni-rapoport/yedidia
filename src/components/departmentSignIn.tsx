import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { remult } from "remult"
import { Roles } from "../model/roles"
import { SignInController } from "../controllers/sign-in-controller"
import { Department } from "../model/department"
import { Patient } from "../model/patient"

export function DepartmentSignIn() {
  const params = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    ;(async () => {
      if (remult.isAllowed(Roles.admin)) {
        navigate(
          `/departments/` +
            (await remult.repo(Department).findFirst({ url: params.id })).id
        )
      } else {
        const signInResult = await SignInController.departmentSignIn(params.id!)
        remult.user = signInResult.user
        navigate("/departments/" + signInResult.department.id)
      }
    })()
  }, [])
  return <>נכנס למחלקה</>
}

export function PatientSignIn() {
  const params = useParams()
  const navigate = useNavigate()
  const [patientId, setPatientId] = useState('')
  //[ ] - add another page for concent 
  useEffect(() => {
    ;(async () => {
      if (remult.isAllowed(Roles.department)) {
        const patient = await remult.repo(Patient).findFirst({ url: params.id })
        if (patient) {
          setPatientId(patient.id)
          
          return
        }
      } else {
        const user = await SignInController.patientSignIn(params.id!)
        remult.user = user
        setPatientId(remult.user.id)
        //[ ] - instead of automatically navigating to patients/ show the naim leakir landing page
      }
    })()
  }, [])
  if (!patientId)
    return <>טוען</>
    return <>
    <h1>נעים להכיר</h1>
    <button onClick={()=>navigate("/patients/" + patientId)}>בואו נתחיל</button></>
}

