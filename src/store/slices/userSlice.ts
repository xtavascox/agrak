import {createSlice} from '@reduxjs/toolkit'
import {RootState} from "../store";

export const userSlice = createSlice({
    name: 'selectedUser',
    initialState: {
        id: '',
        avatar: '',
        createdAt: '',
        email: '',
        first_name: '',
        second_name: ''
    },
    reducers: {
        setUser: (state, action) => {
            console.log('payload', action.payload)
            state.first_name = action.payload.first_name
            state.second_name = action.payload.second_name
            state.email = action.payload.email
            state.avatar = action.payload.avatar
            state.id = action.payload.id
        },
    },
})

export const {setUser} = userSlice.actions
export const user = (state: RootState) => state;



