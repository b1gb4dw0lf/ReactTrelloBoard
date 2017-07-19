import React from 'react';
import { connect } from 'react-redux'
import List from '../List/ListContainer.jsx';
import ItemTypes from '../DraggableTypes/DraggableTypes.jsx';
import { DragSource } from 'react-dnd';

import './DraggableList.less';

const listSource = {
    beginDrag(props) {
        return {id: props.id};
    }
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource()
    }
}

class DraggableList extends  React.Component{

    render() {
        const {connectDragSource} = this.props;
        return connectDragSource(<div className="list-container">
            <List key={this.props.id} id={this.props.id} items={this.props.items} deleteList={this.props.deleteList}/>
        </div>);
    }
}

export default DragSource(ItemTypes.LIST, listSource, collect)(DraggableList);