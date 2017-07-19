import { connect } from 'react-redux'
import ItemActions from '../../redux/ActionCreators/ItemActionCreator.jsx';

import List from '../List/List.jsx';

const mapStateToProps = (state) => {
  return {}
};

const mapDispatchToProps = (dispatch) => {
    return {
        addItem: (listId, itemId) => (dispatch(ItemActions.addItem(listId, itemId))),
        deleteItem: (listId, itemId) => (dispatch(ItemActions.deleteItem(listId, itemId))),
        moveItem: (to, itemId, dropPos) => (dispatch(ItemActions.moveItem(to, itemId, dropPos))),
        editItem: (listId, itemId, description) => (dispatch(ItemActions.editItem(listId, itemId, description)))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(List);