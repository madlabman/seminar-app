const initialState = {
    items: [],
    recentItems: [],
    currentPost: null,
    updatedAt: null,
    isLoading: false
};

export const newsReducer = (newsState = initialState, action) => {
    switch (action.type) {
        default:
            return newsState;
    }
};