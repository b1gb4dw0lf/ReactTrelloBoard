import React from 'react';
import _ from 'lodash';

import './List.less';

import Item from '../Item/Item.jsx';

class List extends React.Component {

    constructor(props) {
        super(props);

        this.handleAddItem = this.handleAddItem.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);

        this.state = {
            children: []
        };
    }

    render () {
        return (
            <div className="list">
                <div className="header">List Title</div>
                {this.state.children}
                <div className="dialogue">
                    <div className="add-button" onClick={this.handleAddItem}>Add item</div>
                </div>
            </div>
        );
    }

    handleAddItem () {
        let id = this.guid();
        this.setState({
            children: this.state.children.concat(
                <Item key={id} id={id} deleteItem={this.handleDeleteItem}/>
            )
        });
    }

    handleDeleteItem(id) {
        let children = this.state.children.slice();
        let index = _.findIndex(children, (child) => {
            return child.props.id == id;
        });
        children.splice(index, 1);
        this.setState({children: children});
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

export default List;