export const addFileHandler = (state, action) => {
    state.files = [...state.files, action.payload];
};

export const removeAllFiles = (state, action) => {
    state.files = [];
};

export const removeSingleFile = (state, action) => {
    state.files = state.files.filter(
        (file) => file.name !== action.payload.name
    );
};