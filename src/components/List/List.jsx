import React from 'react';
import _ from 'lodash';

import './List.less';

import Item from '../Item/Item.jsx';

class List extends React.Component {

    constructor(props) {
        super(props);

        this.handleAddItem = this.handleAddItem.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleTitleInput = this.handleTitleInput.bind(this);
        this.handleDoubleClick = this.handleDoubleClick.bind(this);

        this.state = {
            title: '',
            isEditing: false,
            editText: '',
            children: []
        };
    }

    render () {
        return (
            <div className="list">
                {this.getHeader()}
                {this.state.children}
                <div className="dialogue">
                    <div className="add-button" onClick={this.handleAddItem}>Add item</div>
                </div>
            </div>
        );
    }

    getHeader() {
        if (this.state.title && !this.state.isEditing) {
            return <div className="header" onDoubleClick={this.handleDoubleClick} >{this.state.title}</div>
        } else {
            return <input autoFocus="true" className="list-title" onChange={this.handleTitleInput} onKeyDown={this.handleKeyDown} value={this.state.editText} />
        }
    }

    handleDoubleClick(event) {
        this.setState({
            editText: this.state.title,
            isEditing: true
        });
    }

    handleKeyDown(event) {
        if (event.keyCode == 13) { // Pressed Enter
            this.setState({title: this.state.editText, isEditing: false});
        }
    }

    handleSelfDelete(id) {
        this.props.deleteList(id);
    }

    handleTitleInput(event) {
        this.setState({editText: event.target.value});
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