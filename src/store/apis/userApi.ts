import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {IUser} from "../../interfaces/interfaces";


export const userApi = createApi({
    reducerPath: 'users',
    baseQuery: fetchBaseQuery({baseUrl: 'https://635017b9df22c2af7b630c3e.mockapi.io/api/v1'}),
    tagTypes: ['Posts','Delete','Put'],
    endpoints: builder => ({
        getUserList: builder.query<IUser[], undefined>({
            query: () => '/users',
            providesTags: ['Posts','Delete','Put']
        }),
        posCreateUser: builder.mutation({
            query: (newUser) => ({
                url: '/users',
                method: 'post',
                body: newUser
            }),
            invalidatesTags: ['Posts']
        }),
        deleteUser:builder.mutation({
            query:(id)=>({
                url:`/users/${id}`,
                method:'delete'
            }),
            invalidatesTags:['Delete']
        }),
        updateUser:builder.mutation({
            query:(updateData)=>({
                url:`/users/${updateData.id}`,
                method:'put',
                body:updateData
            }),
            invalidatesTags:['Put']

        })
    })

})

export const {useGetUserListQuery, usePosCreateUserMutation,useDeleteUserMutation,useUpdateUserMutation} = userApi;