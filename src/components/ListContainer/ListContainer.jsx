import React from 'react';

import List from '../List/List.jsx';
import ItemTypes from '../DraggableTypes/DraggableTypes.jsx';
import { DragSource } from 'react-dnd';

import './ListContainer.less';

const listSource = {
    beginDrag(props) {
        return {id: props.id};
    }
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

class ListContainer extends  React.Component{

    render() {
        const {connectDragSource, isDragging} = this.props;
        return connectDragSource(<div className="list-container">
            <List key={this.props.id} id={this.props.id} deleteList={this.props.deleteList}/>
        </div>);
    }
}

export default DragSource(ItemTypes.LIST, listSource, collect)(ListContainer);