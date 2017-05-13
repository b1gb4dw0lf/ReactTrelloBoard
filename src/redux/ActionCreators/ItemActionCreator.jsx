import ActionTypes from '../Types/ActionTypes.jsx';

export default {
    moveItem: (to, itemId) => {
        return {
            type: ActionTypes.MOVE_ITEM,
            list: to,
            item: itemId
        };
    },
    addItem: (listId, itemId) => {
        return {
            type: ActionTypes.ADD_ITEM,
            list: listId,
            item: itemId
        };
    },
    deleteItem: (listId, itemId) => {
        return {
            type: ActionTypes.DELETE_ITEM,
            list: listId,
            item: itemId
        };
    },
    editItem: (listId, itemId, description) => {
        return {
            type: ActionTypes.EDIT_ITEM,
            list: listId,
            item: itemId,
            description: description
        }
    }
}
