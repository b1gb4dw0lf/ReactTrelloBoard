import _ from 'lodash';

function findListIndex(lists, id) {
    return _.findIndex(lists, (list) => {
        return list.id == id
    });
}

function findItemIndex(list, id) {
    return _.findIndex(list, (item) => {
        return item.id == id
    });
}

const reducer = (state = {}, action) => {
    let swapState = Object.assign({}, state),
        listIndex = null,
        itemIndex = null;

    switch(action.type) {
        case 'addItem':
            listIndex = findListIndex(swapState.lists, action.list);

            swapState.lists[listIndex].push(action.item);
            return swapState;

        case 'deleteItem':
            listIndex = findListIndex(swapState.lists, action.list);
            itemIndex = findItemIndex(swapState.lists[listIndex], action.item);

            swapState.lists[listIndex].splice(itemIndex, 1);
            return swapState;

        case 'addList':
            if(!swapState.lists)
                return {lists: [{id: action.id, title: '', children: []}]};

            swapState.lists.push({id: action.id, title: '', children: []});
            return swapState;

        case 'deleteList':
            listIndex = findListIndex(swapState.lists, action.id);
            swapState.lists.splice(listIndex, 1);
            return swapState;

        default:
            return state;
    }
};

export default reducer;

