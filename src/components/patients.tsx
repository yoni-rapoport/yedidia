import { remult } from "remult"
import { Patient } from "../model/patient"
import { FormEvent,  useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Department } from "../model/department"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Roles } from "../model/roles"
import { departmentsRoute } from "../utils"

const repo = remult.repo(Patient)
export default function Patients() {
  const [newItem, setNewItem] = useState("")
  const params = useParams()
  const department = useQuery(["department", params.id!], () =>
    remult.repo(Department).findId(params.id!)
  )
  const patients = useQuery(["patients", params.id!], () =>
    repo.find({
      where: {
        departmentId: params.id!,
      },
    })
  )
  const insertPatient = useMutation({
    mutationFn: repo.insert,
    onSuccess: () => patients.refetch(),
  })

  async function add(e: FormEvent) {
    e.preventDefault()
    insertPatient.mutate({
      name: newItem,
      departmentId: department.data!.id,
    })
  }
  if ([department, patients].find((x) => x.isLoading)) return <>טוען....</>
  return (
    <>
      {remult.isAllowed(Roles.admin) && (
        <Link to={departmentsRoute}> חזרה לרשימת המחלקות</Link>
      )}
      <main>
        <h3>{department.data!.name}</h3>
        <form onSubmit={add}>
          <input
            value={newItem}
            placeholder="שם מטופל חדש"
            onChange={(e) => setNewItem(e.target.value)}
          />
          <button>הוסף</button>
        </form>
        {patients.data!.map((item) => {
          return (
            <div key={item.id}>
              {item.name}
              <Link to={"/patients/" + item.id}>ערוך</Link>
            </div>
          )
        })}
      </main>
    </>
  )
}
