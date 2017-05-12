import ActionTypes from '../Types/ActionTypes.jsx';

export default {
    moveList: (id, index) => {
        return {
            type: ActionTypes.MOVE_LIST,
            index: index,
            id: id
        };
    },
    addList: (id) => {
        return {
            type: ActionTypes.ADD_LIST,
            id: id
        };
    },
    deleteList: (id) => {
        return {
            type: ActionTypes.DELETE_LIST,
            id: id
        };
    },
    editList: (id, title) => {
        return {
            type: ActionTypes.EDIT_LIST,
            id: id,
            title: title
        }
    }
}
