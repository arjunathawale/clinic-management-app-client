import { configureStore } from "@reduxjs/toolkit";
import userSlice  from "./userSlice";


 const store = configureStore({
    reducer: {
        name: userSlice,
    }

})

export default store