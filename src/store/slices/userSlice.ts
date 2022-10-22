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
            state.first_name = action.payload.first_name
            state.second_name = action.payload.second_name
            state.email = action.payload.email
            state.avatar = action.payload.avatar
            state.id = action.payload.id
        },
        clearUser: (state) => {
            state.first_name = ''
            state.second_name = ''
            state.email = ''
            state.avatar = ''
            state.id = ''
        }
    },
})

export const {setUser,clearUser} = userSlice.actions
export const user = (state: RootState) => state;



