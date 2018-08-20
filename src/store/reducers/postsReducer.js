import {
    FAIL_GET_ANNOUNCES, FAIL_GET_NEWS,
    RECEIVE_ANNOUNCES, RECEIVE_BILL, RECEIVE_GET_RELATION, RECEIVE_NEWS, RECEIVE_UPD_RELATION,
    REQUEST_ANNOUNCES, REQUEST_NEWS
} from '../actions/actionTypes';
import moment from "moment";
import buildUrl from "build-url";
import {ONLY_CONTENT_PARAM} from "../../../config";

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
                    let postDate = null;
                    let permalink = item.guid;

                    if (storeKey === 'news') {
                        postDate = moment(item.post_date);
                    } else {
                        postDate = moment.unix(item.seminar_date_time);
                        if (item.association_post) permalink = item.association_post;
                    }

                    tempItems[item.ID] = {
                        key: item.post_name,
                        date: postDate,
                        thumbnail: {
                            uri: item.post_thumbnail
                        },
                        title: item.post_title,
                        excerpt: item.post_excerpt,
                        permalink: {
                            uri: buildUrl(
                                permalink,
                                {
                                    queryParams: {
                                        [ONLY_CONTENT_PARAM]: true
                                    }
                                }
                            )
                        },
                        relation: 'none'
                    }
                });
                // Sort items by date desc
                const sortedKeys = Object.keys(tempItems).sort((a, b) =>
                    -moment(tempItems[a].date)
                        .diff(moment(tempItems[b].date)));
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
                [storeKey]: {
                    ...postsState[storeKey],
                    items: tempItems,
                    sortedItems,
                    recentItems,
                    updatedAt: Date.now(),
                    isLoading: false
                }
            };
        case RECEIVE_GET_RELATION:
        case RECEIVE_UPD_RELATION:
            const postId = action.meta.announceId;
            let relation = null;

            if (
                action.payload
                && action.payload.success
            ) {
                if (postsState.announces.items[postId] !== undefined) {
                    relation = postsState.announces.items[postId].relation;
                    if (action.payload.data) {
                        relation = action.payload.data.relation;
                    } else if (action.meta.relation) {
                        relation = action.meta.relation;
                    }


                }
            }

            return {
                ...postsState,
                announces: {
                    ...postsState.announces,
                    items: {
                        ...postsState.announces.items,
                        [postId]: {
                            ...postsState.announces.items[postId],
                            relation
                        }
                    }
                }
            }
        default:
            return postsState;
    }
};