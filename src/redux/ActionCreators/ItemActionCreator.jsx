import ActionTypes from '../Types/ActionTypes.jsx';

export default {
    moveItem: (from, to, itemId) => {
        return {
            type: ActionTypes.MOVE_ITEM,
            from: from,
            to: to,
            item: itemId
        };
    },
    addItem: (listId, item) => {
        return {
            type: ActionTypes.ADD_ITEM,
            list: listId,
            item: item
        };
    },
    deleteItem: (listId, itemId) => {
        return {
            type: ActionTypes.DELETE_ITEM,
            list: listId,
            item: itemId
        };
    }
}
