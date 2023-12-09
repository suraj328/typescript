import React, { useRef } from 'react'
import { useAppDispatch } from '../store/features/store';
import { addPerson } from '../store/features/personSlice';

export const Add = () => {
    const name = useRef<string>("");
    // storing dispatch to set data to store
    const dispatch = useAppDispatch();
  return (
    <div>
            <label htmlFor="">Enter person name</label>
            <br/>
            <input  className='p-2 border border-black' onChange={(e)=>name.current = e.target.value}/>
            <br/>
            {/* example of setting data to store */}
            <button onClick={() => dispatch(addPerson({name:name.current}))}>Add</button>
    </div>
  )
}
