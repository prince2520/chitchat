export const closeOverlayReducer = (state) => {
    state.showVideoChat = false;
    state.showSideMobileBar = false;
    state.showDragDrop = false;
    state.showSettings = {
        links: "Members",
        value: false
    };
    state.showOverlay = false;
};

export const openSideMobileBarReducer = (state) => {
    state.showSideMobileBar = true;
    state.showOverlay = true;
};

export const openDragDropReducer = (state) => {
    state.showDragDrop = true;
    state.showOverlay = true;
};


export const openVideoChatReducer = (state) => {
    state.showSideMobileBar = false;
    state.showDragDrop = false;
    state.showSettings = {
        links: "Members",
        value: false
    };
    state.showVideoChat = true;
    state.showOverlay = true;
};

export const openSettingsReducer = (state, action) => {
    state.showSettings = action.payload;
    state.showOverlay = true;
};