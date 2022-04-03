import { createSlice } from "@reduxjs/toolkit"
import { userInfo } from "os"

export const slice = createSlice({
    name: 'user',
    initialState: {
        email: ''
    },
    reducers: {
        setEmail: (state, action) => {
            if(action.type === 'SET_EMAIL')
                return {...state, email:action.payload.email}
             return state
        }
    }

})

export const {setEmail} = slice.actions
export default slice.reducer;

/*export default (state = initialState, action) => {
    if(action.type === 'SET_EMAIL')
        return {...state, email:action.payload.email}
    return state
}*/