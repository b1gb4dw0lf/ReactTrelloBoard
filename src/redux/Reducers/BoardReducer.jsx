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

function findParentList(lists, id) {
    let listIndex = -1;
    _.forEach(lists, (list, index) => {
        let itemIndex = _.findIndex(list.items, (item) => {
            return item.id == id
        });

        if (itemIndex != -1) {
            listIndex = index;
            return;
        }
    });

    return listIndex;
}

const reducer = (state = {}, action) => {
    let swapState = {
        ...state,
        lists: state.lists.slice()

    },
        listIndex = findListIndex(swapState.lists, action.list),
        itemIndex = null;

    switch(action.type) {
        case 'addItem':
            swapState.lists[listIndex].items = swapState.lists[listIndex].items.slice();
            swapState.lists[listIndex].items.push({id: action.item, description: ''});
            return swapState;

        case 'deleteItem':
            swapState.lists[listIndex].items = swapState.lists[listIndex].items.slice();
            itemIndex = findItemIndex(swapState.lists[listIndex].items, action.item);
            swapState.lists[listIndex].items.splice(itemIndex, 1);
            return swapState;

        case 'editItem':
            swapState.lists[listIndex].items = swapState.lists[listIndex].items.slice();
            itemIndex = findItemIndex(swapState.lists[listIndex].items, action.item);
            swapState.lists[listIndex].items[itemIndex].description = action.description;
            return swapState;

        case 'addList':
            swapState.lists.push({id: action.id, title: '', items: []});
            return swapState;

        case 'deleteList':
            swapState.lists.splice(listIndex, 1);
            return swapState;

        case 'editList':
            swapState.lists[listIndex].title = action.title;
            return swapState;

        default:
            return state;
    }
};

export default reducer;

