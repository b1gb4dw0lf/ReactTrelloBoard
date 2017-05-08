import React from 'react';

import './Board.less';

import List from '../List/List.jsx';

class Board extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
          lists: []
        };

        this.handleAddList = this.handleAddList.bind(this);
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
        this.setState({lists: this.state.lists.concat(<List key={id} id={id} />)});
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