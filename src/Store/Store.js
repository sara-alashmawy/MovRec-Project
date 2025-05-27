import { configureStore } from "@reduxjs/toolkit"
import homeSlice from "./HomeSlice"
import authSlice from "./AuthSlice"

export const store = configureStore({
  reducer: {
    home: homeSlice,
    auth: authSlice,
  },
})

export default store
