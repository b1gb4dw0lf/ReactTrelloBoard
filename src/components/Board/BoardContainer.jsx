import { connect } from 'react-redux';
import ListActions from '../../redux/ActionCreators/ListActionCreator.jsx';

import Board from './Board.jsx';

const mapStateToProps = (state) => {
    console.log(state);
    return {
        lists: state.lists
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addList: (id) => (dispatch(ListActions.addList(id))),
        deleteList: (id) => (dispatch(ListActions.deleteList(id)))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);