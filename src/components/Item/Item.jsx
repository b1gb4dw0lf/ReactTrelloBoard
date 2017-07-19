import React from 'react';
import propTypes from 'prop-types';
import ItemTypes from '../DraggableTypes/DraggableTypes.jsx';
import { DragSource } from 'react-dnd';

import './Item.less';

const itemSource = {
    beginDrag(props) {
        return {id: props.id};
    }
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource()
    }
}

class Item extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            description: this.props.description,
            editText: '',
            isEditing: false
        };

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleEnableEdit = this.handleEnableEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    render() {
        const {connectDragSource} = this.props;
        if (this.props.description && !this.state.isEditing) {
            return connectDragSource(
                <div className="item" style={{cursor: 'move'}} onDoubleClick={this.handleEnableEdit}>
                    <div className="dialogue">
                        <span>{(new Date()).toDateString()}</span>
                        <a onClick={this.handleDelete}>delete</a>
                    </div>
                    <label>{this.props.description}</label>
                </div>);
        } else {
            return <textarea autoFocus="true" id="item-edit-input" className="edit-input" type="text" onChange={this.handleDescription} onKeyDown={this.handleKeyDown} value={this.state.editText}/>;
        }
    }

    handleDelete() {
        this.props.deleteItem(this.props.id);
    }

    handleKeyDown(event) {
        if (event.keyCode == 13) { // Pressed Enter
            this.props.editItem(this.props.id, this.state.editText);
            this.setState({isEditing: false});
        } else if (event.keyCode == 27) {
            //If ESC is pressed and there is already a text
            if (this.props.description) {
                this.setState({isEditing: false});
            }
            else { // If ESC is pressed and there is no text
                this.handleDelete(this.props.id);
            }
        }
    }

    handleDescription(event) {
        this.setState({editText: event.target.value});
    }

    handleEnableEdit() {
        this.setState({
            editText: this.props.description,
            isEditing: true
        });
    }
}

Item.propTypes = {
    id: propTypes.string.isRequired,
    deleteItem: propTypes.func.isRequired,
    connectDragSource: propTypes.func.isRequired
};

export default DragSource(ItemTypes.ITEM, itemSource, collect)(Item);