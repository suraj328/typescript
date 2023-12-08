import React from 'react'
interface comp1Props{
  name:string
}
export const Comp1:React.FC<comp1Props> = ({name}) => {
  return (
    <>
    <div>Comp1</div>
    <div>{name}</div>
    </>
  )
}


