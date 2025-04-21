export const closeOverlayHandler = (state) => {
    state.showVideoChat = false;
    state.showSideMobileBar = false;
    state.showDragDrop = false;
    state.showSettings = {
        links: "Members",
        value: false
    };
    state.showOverlay = false;
};

export const openSideMobileBarHandler = (state) => {
    state.showSideMobileBar = true;
    state.showOverlay = true;
};

export const openDragDropHandler = (state) => {
    state.showDragDrop = true;
    state.showOverlay = true;
};


export const openVideoChatHandler = (state) => {
    state.showSideMobileBar = false;
    state.showDragDrop = false;
    state.showSettings = {
        links: "Members",
        value: false
    };
    state.showVideoChat = true;
    state.showOverlay = true;
};

export const openSettingsHandler = (state, action) => {
    state.showSettings = action.payload;
    state.showOverlay = true;
};