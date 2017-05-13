import React from 'react';
import propTypes from 'prop-types';
import ItemTypes from '../DraggableTypes/DraggableTypes.jsx';
import { DropTarget } from 'react-dnd'

import './List.less';

import Item from '../Item/Item.jsx';

const listTarget = {
    drop(props, monitor) {
        let item = monitor.getItem();
        props.moveItem(props.id, item.id)
    }
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget()
    };
}

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
            editText: ''
        };
    }

    render () {
        const {connectDropTarget} = this.props;
        return connectDropTarget(
            <div className="list">
                {this.getHeader()}
                {console.log(this.props.items)}
                {this.props.items.map((obj) => <Item key={obj.id} id={obj.id} description={obj.description} deleteItem={this.handleDeleteItem}/>)}
                <div className="dialogue">
                    <div className="add-button" onClick={this.handleAddItem}>Add item</div>
                </div>
            </div>
        );
    }

    getHeader() {
        if (this.state.title && !this.state.isEditing) {
            return (<div className="header" onDoubleClick={this.handleDoubleClick} >
                <div className="title">
                    <span>{this.state.title}</span>
                </div>
                <div className="list-dialogue" >
                    <a onClick={this.handleSelfDelete}>delete</a>
                </div>
            </div>)
        } else {
            return (<div>
                <input autoFocus="true" className="list-title" onChange={this.handleTitleInput} onKeyDown={this.handleKeyDown} value={this.state.editText} />
            </div>);
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
                this.handleSelfDelete();
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
                this.handleSelfDelete();
            }
        }
    }

    handleSelfDelete() {
        if (this.props.items.length == 0)
            this.props.deleteList(this.props.id);
    }

    handleTitleInput(event) {
        this.setState({editText: event.target.value});
    }

    handleAddItem () {
        let id = this.guid();
        this.props.addItem(this.props.id, id);
        console.log(this.props.items);
    }

    handleDeleteItem(id) {
        this.props.deleteItem(this.props.id, id);
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

List.propTypes = {
    id: propTypes.string.isRequired,
    deleteList: propTypes.func.isRequired,
    addItem: propTypes.func.isRequired,
    deleteItem: propTypes.func.isRequired
};

export default DropTarget(ItemTypes.ITEM, listTarget, collect)(List);