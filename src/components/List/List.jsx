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
        this.handleSelfDelete = this.handleSelfDelete.bind(this);

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
            return (<div className="header" onDoubleClick={this.handleDoubleClick} >
                <div className="title">{this.state.title}</div>
                <div className="list-dialogue" >
                    <a onClick={this.handleSelfDelete}>delete</a>
                </div>
            </div>)
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
            if (!this.state.editText && this.state.children.length == 0)
                this.handleSelfDelete(this.props.id);
            else if (!this.state.editText) {
                return this.setState({isEditing: false});
            }

            this.setState({title: this.state.editText, isEditing: false});
        } else if (event.keyCode == 27) {
            //If ESC is pressed and there is already a text
            if (this.state.title) {
                this.setState({isEditing: false});
            }
            else { // If ESC is pressed and there is no text
                this.handleSelfDelete(this.props.id);
            }
        }
    }

    handleSelfDelete(id) {
        if (this.state.children.length == 0)
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