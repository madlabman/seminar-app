const initialState = {
    items: [],
    fetched: 0
};

export default citiesReducer = (citiesState = initialState, action) => {
    switch (action.type) {
        case 'persist/REHYDRATE':
            console.warn(action);
            return {
                ...citiesState,
                items: action.payload.cities.items,
                fetched: action.payload.cities.fetched
            };
        case 'RECEIVE_CITIES':
            return {
                ...citiesState,
                items: action.payload.map(item => {
                    return {
                        key: item.id,
                        title: item.slug,
                        name: item.name
                    }
                }),
                fetched: citiesState.fetched + 1
            };
        default:
            return {
                ...citiesState
            }
    }
}