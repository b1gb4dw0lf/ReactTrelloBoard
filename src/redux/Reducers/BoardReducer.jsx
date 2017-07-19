import Utils from '../../Utils.jsx';


const reducer = (state = {}, action) => {
    let swapState = {
        ...state,
        lists: state.lists.slice()

    },
        listIndex = Utils.findListIndex(swapState.lists, action.list),
        itemIndex = null;

    switch(action.type) {
        case 'addItem':
            swapState.lists[listIndex].items = swapState.lists[listIndex].items.slice();
            swapState.lists[listIndex].items.push({id: action.item, description: ''});
            return swapState;

        case 'deleteItem':
            swapState.lists[listIndex].items = swapState.lists[listIndex].items.slice();
            itemIndex = Utils.findItemIndex(swapState.lists[listIndex].items, action.item);
            swapState.lists[listIndex].items.splice(itemIndex, 1);
            return swapState;

        case 'editItem':
            swapState.lists[listIndex].items = swapState.lists[listIndex].items.slice();
            itemIndex = Utils.findItemIndex(swapState.lists[listIndex].items, action.item);
            swapState.lists[listIndex].items[itemIndex].description = action.description;
            return swapState;

        case 'moveItem':
            swapState.lists[listIndex].items = swapState.lists[listIndex].items.slice();
            let parentListIndex = Utils.findParentList(swapState.lists, action.item);
            swapState.lists[parentListIndex].items = swapState.lists[parentListIndex].items.slice();
            itemIndex = Utils.findItemIndex(swapState.lists[parentListIndex], action.item);

            //You saw nothing.
            let item = swapState.lists[parentListIndex].items.splice(itemIndex, 1)[0];

            swapState.lists[listIndex].items.push(item);
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

