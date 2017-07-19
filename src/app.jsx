import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import Reducer from './redux/Reducers/BoardReducer.jsx';

import Board from './components/Board/BoardContainer.jsx';

let initialState = {lists: []};
let store = createStore(Reducer, initialState);

ReactDOM.render(
    <Provider store={store}>
        <Board/>
    </Provider>,
    document.getElementById('root')
);