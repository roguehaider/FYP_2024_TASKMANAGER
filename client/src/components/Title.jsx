import React from 'react'
import { clsx } from "clsx";
const Title = ({ title, className }) => {
  return (
    <h2 className = {clsx ("text-2x1 font-semibold capitalize", className)}>
      {title}
    </h2>
  )
}

export default Title
