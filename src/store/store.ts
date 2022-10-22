import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit'
import {userSlice} from "./slices/userSlice";
import {userApi} from "./apis/userApi";


export const store = configureStore({
    reducer: {
        userSelected: userSlice.reducer,

        [userApi.reducerPath]: userApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(userApi.middleware)
})
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;
