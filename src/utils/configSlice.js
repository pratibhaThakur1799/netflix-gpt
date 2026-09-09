import { createSlice } from "@reduxjs/toolkit";

const configSLice = createSlice({
    name: "config",
    initialState: {
        lang: "en"
    },
    reducers: {
        changeLang: (state, action) => {
            state.lang = action.payload;
        }
    }
});


export const { changeLang } = configSLice.actions

export default configSLice.reducer;