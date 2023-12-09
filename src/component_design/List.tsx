import React from 'react'
import { useAppSelector } from '../store/features/store'

export const List = () => {
    // example of accessing data using useSelector
    const person = useAppSelector((state)=>state.person.persons);

  return (
    <>
    <h1>Your Added name</h1>
        <table>
            <thead>
                <th>id</th>
                <th>name</th>
            </thead>
            <tbody>
                {person.map((person)=>(
                    <tr key={person.id}>
                        <td>{person.id}</td>
                        <td>{person.name}</td>
                    </tr>  
                ))}
            </tbody>
        </table>
    </>
  )
}

