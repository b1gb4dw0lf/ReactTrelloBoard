import React from 'react';
import _ from 'lodash';

import './Board.less';

import List from '../List/List.jsx';

class Board extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
          lists: []
        };

        this.handleAddList = this.handleAddList.bind(this);
        this.handleDeleteList = this.handleDeleteList.bind(this);
    }

    render() {
        return (
            <div className="board">
                {this.state.lists}
                <div className="board-dialogue" onClick={this.handleAddList}>
                        Add list
                </div>
            </div>
        );
    }

    handleAddList() {
        let id = this.guid();
        this.setState({lists: this.state.lists.concat(<List key={id} id={id} deleteList={this.handleDeleteList} />)});
    }

    handleDeleteList(id) {
        let index = _.findIndex(this.state.lists, (list) => {
            return list.props.id == id;
        });
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

export default Board;