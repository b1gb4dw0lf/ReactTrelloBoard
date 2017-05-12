import React from 'react';
import _ from 'lodash';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import propTypes from 'prop-types';

import './Board.less';

import List from '../ListContainer/ListContainer.jsx';

class Board extends React.Component {

    constructor(props) {
        super(props);

        this.handleAddList = this.handleAddList.bind(this);
        this.handleDeleteList = this.handleDeleteList.bind(this);
    }

    componentDidMount() {
        console.log(this.props);
    }

    render() {
        return (
            <div className="board">
                {this.props.lists.map((id) => <List key={id} id={id} deleteList={this.handleDeleteList}/>)}
                <div className="board-dialogue" onClick={this.handleAddList}>
                    Add list
                </div>
            </div>
        );
    }

    handleAddList() {
        let id = this.guid();
        this.props.addList(id);
        console.log(this.props);
    }

    handleDeleteList(id) {
        let index = _.findIndex(this.state.lists, (list) =>  list == id);
        let lists = this.state.lists.slice();
        lists.splice(index, 1);
        this.setState({lists: lists});
    }

    /**
     * Nothing down below.
     * **/
    guid() {
        // Act cool.
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
            this.s4() + '-' + this.s4() + this.s4() + this.s4();
    }

    s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
}

export default DragDropContext(HTML5Backend)(Board);