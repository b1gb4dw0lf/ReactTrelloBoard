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

/**
 * Crappy Reducer
 */
const reducer = (state = {}, action) => {
    let swapState = Object.assign({}, state),
        listIndex = null,
        itemIndex = null,
        items = null,
        list = null,
        lists = null;

    switch(action.type) {
        case 'addItem':
            //Wow such immutable very design
            listIndex = findListIndex(swapState.lists, action.list);
            lists = swapState.lists.slice();
            list = Object.assign({}, lists[listIndex]);
            items = list.items.slice();
            items.push({id: action.item, description: ''});
            list.items = items;
            lists[listIndex] = list;
            swapState.lists = lists;
            return swapState;

        case 'deleteItem':
            //Wow such immutable very design
            listIndex = findListIndex(swapState.lists, action.list);
            itemIndex = findItemIndex(swapState.lists[listIndex].items, action.item);
            lists = swapState.lists.slice();
            list = Object.assign({}, lists[listIndex]);
            items = list.items.slice();
            items.splice(itemIndex, 1);
            list.items = items;
            lists[listIndex] = list;
            swapState.lists = lists;
            return swapState;

            return swapState;

        case 'addList':
            lists = swapState.lists.slice();
            lists.push({id: action.id, title: '', items: []});
            swapState.lists = lists;
            return swapState;

        case 'deleteList':
            listIndex = findListIndex(swapState.lists, action.id);
            lists = swapState.lists.slice();
            lists.splice(listIndex, 1);
            swapState.lists = lists;
            return swapState;

            return swapState;

        default:
            return swapState;
    }
};

export default reducer;

