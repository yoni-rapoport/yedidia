import React from "react"

const Name = ({ value, onChange }) => {
  return (
    <>
      <h2>באיזה שם היית רוצה שהצוות יפנה אליך?</h2>
      <input type="text" value={value} onChange={onChange} />
    </>
  )
}

export default Name
