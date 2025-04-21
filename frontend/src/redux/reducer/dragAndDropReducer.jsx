export const addFileReducer = (state, action) => {
    state.files = [...state.files, action.payload];
};

export const removeAllFilesReducer = (state, action) => {
    state.files = [];
};

export const removeSingleFileReducer = (state, action) => {
    state.files = state.files.filter(
        (file) => file.name !== action.payload.name
    );
};