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
}

export default Utils;