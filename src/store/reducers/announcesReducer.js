import moment from 'moment';

import {REQUEST_ANNOUNCES, RECEIVE_ANNOUNCES, FAIL_GET_ANNOUNCES, SET_CURRENT_ANNOUNCE} from '../actions/actionTypes';

const initialState = {
    items: [],
    recentItems: [],
    currentPost: null,
    updatedAt: null,
    isLoading: false
};

export const announcesReducer = (announcesState = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_ANNOUNCE:
            return {
                ...announcesState,
                currentPost: action.post
            };
        case REQUEST_ANNOUNCES:
            return {
                ...announcesState,
                isLoading: true
            };
        case RECEIVE_ANNOUNCES: {
            const returnState = {
                ...announcesState,
                isLoading: false
            };

            let items = [];
            if (action.payload) {
                 items = action.payload.map(item => {
                     let date = moment(item.date).format('DD.MM.YYYY');
                    return {
                        key: item.slug, // id
                        date: date,
                        thumbnail: {
                            uri: "https://example.com/announce.jpg"
                        },
                        title: item.title.rendered,
                        excerpt: "Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому...",
                        permalink: {
                            uri: item.guid.rendered
                        },
                        relation: null
                    }
                });
            }

            return {
                ...announcesState,
                ...returnState,
                items: announcesState.items.concat(items),
                recentItems: items.slice(-5),
                updatedAt: Date.now()
            };
        }
        default:
            return announcesState;
    }
};