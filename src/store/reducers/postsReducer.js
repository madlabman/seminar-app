import {
    FAIL_GET_ANNOUNCES, FAIL_GET_NEWS,
    RECEIVE_ANNOUNCES, RECEIVE_NEWS,
    REQUEST_ANNOUNCES, REQUEST_NEWS
} from '../actions/actionTypes';
import moment from "moment";

const initialState = {
    announces: {
        items: {},
        sortedItems: [],
        recentItems: {},
        updatedAt: null,
        isLoading: false
    },
    news: {
        items: {},
        sortedItems: [],
        recentItems: {},
        updatedAt: null,
        isLoading: false
    }
};

export const postsReducer = (postsState = initialState, action) => {
    const storeKey = [
        REQUEST_ANNOUNCES,
        RECEIVE_ANNOUNCES,
        FAIL_GET_ANNOUNCES
    ].indexOf(action.type) !== -1 ?
        'announces' : 'news';

    switch (action.type) {
        case REQUEST_ANNOUNCES:
        case REQUEST_NEWS:
            return {
                ...postsState,
                [storeKey]: {
                    ...postsState[storeKey],
                    isLoading: true
                }
            };
        case FAIL_GET_ANNOUNCES:
        case FAIL_GET_NEWS:
            return {
                ...postsState,
                [storeKey]: {
                    ...postsState[storeKey],
                    isLoading: false
                }
            };
        case RECEIVE_ANNOUNCES:
        case RECEIVE_NEWS:
            let tempItems = {
                ...postsState[storeKey].items
            };
            let sortedItems = [];

            if (
                action.payload
                && action.payload.success === true
            ) {
                // Concat new items
                action.payload.data.forEach(item => {
                    let date = moment(item.post_date).format('DD.MM.YYYY');
                    tempItems[item.ID] = {
                        key: item.post_name,
                        date: date,
                        thumbnail: {
                            uri: item.post_thumbnail
                        },
                        title: item.post_title,
                        excerpt: item.post_excerpt,
                        permalink: {
                            uri: item.guid
                        }
                    }
                });
                // Sort items by date
                const sortedKeys = Object.keys(tempItems).sort((a, b) => moment.max(
                    [moment(a.date), moment(b.date)]
                ));
                sortedKeys.forEach(key => {
                    sortedItems.push({
                        ...tempItems[key],
                        id: key
                    });
                });
            }

            sortedItems = sortedItems.length ? sortedItems : postsState[storeKey].sortedItems;
            let recentItems = sortedItems.slice(0, 5);

            return {
                ...postsState,
                [storeKey] : {
                    ...postsState[storeKey],
                    items: tempItems,
                    sortedItems,
                    recentItems,
                    updatedAt: Date.now(),
                    isLoading: false
                }
            };
        default:
            return postsState;
    }
};