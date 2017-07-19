import _ from 'lodash';


class Utils {

    static findListIndex(lists, id) {
        return _.findIndex(lists, (list) => {
            return list.id === id
        });
    }

    static findItemIndex(list, id) {
        return _.findIndex(list, (item) => {
            return item.id === id
        });
    }

    static findParentList(lists, id) {
        let listIndex = -1;
        _.forEach(lists, (list, index) => {
            let itemIndex = _.findIndex(list.items, (item) => {
                return item.id === id
            });

            if (itemIndex != -1) {
                listIndex = index;
                return;
            }
        });

        return listIndex;
    }

    static calculateDropPosition(listDOMElement, dropPos) {
        let itemsDomObjects = listDOMElement.getElementsByClassName('item');

        let dropIndex = 0;

        //Wow such insert to position, very coordinate calculation
        for (let i = 0; i < itemsDomObjects.length; i++) {
            let totalHeight = itemsDomObjects[i].offsetTop + itemsDomObjects[i].offsetHeight / 2;

            if (totalHeight < dropPos.y) {
                dropIndex = i + 1;
            }
        }

        return dropIndex;
    }
}

export default Utils;