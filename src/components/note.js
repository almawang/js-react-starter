import React, { Component } from 'react';
import Draggable from 'react-draggable';
import Textarea from 'react-textarea-autosize';
import marked from 'marked';

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      grid: [25, 25],
      curPos: { x: 0, y: 0 },
      curWandH: { width: 0, heidi: 0 },
      resizing: false,
    };
    this.onClick = this.onClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.onStartDrag = this.onStartDrag.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onStopDrag = this.onStopDrag.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.onResize = this.onResize.bind(this);
    this.onResizeStart = this.onResizeStart.bind(this);
  }

  onClick() {
    this.props.moveToFront(this.state.id);
  }
  onDeleteClick() {
    this.props.deleteNote(this.props.id);
  }
  onEditClick() {
    if (this.state.isEditing) {
      this.setState({ isEditing: false });
    } else {
      this.setState({ isEditing: true });
    }
  }
  onStartDrag() {
    this.setState({ grid: [1, 1] });
  }
  onDrag(e, ui) {
    this.props.moveNote(this.props.id, ui.x, ui.y);
  }
  onStopDrag() {
    this.setState({ grid: [50, 50] });
  }
  onTitleChange(event) {
    this.props.changeTitle(this.props.id, event.target.value);
  }
  onTextChange(event) {
    this.props.changeText(this.props.id, event.target.value);
  }
  onResizeStart(e) {
    this.setState({
      curPos: { x: e.clientX, y: e.clientY },
      curWandH: { width: this.props.note.width, height: this.props.note.height },
      resizing: true,
    });
  }
  onResize(e) {
    const newWidth = this.state.curWandH.width - this.state.curPos.x + e.clientX;
    const newHeight = this.state.curWandH.height - this.state.curPos.y + e.clientY;
    this.setState({
      curPos: { x: e.clientX, y: e.clientY },
    });
    this.props.resize(this.props.id, newWidth, newHeight);
  }
  onResizeStop(e) {
    this.setState({ resizing: false });
  }

  renderNote() {
    if (this.state.isEditing) {
      return (
        <div>
          <div className="noteTitleBar">
            <div>
              <Textarea value={this.props.note.title} onKeyPress={(event) => { if (event.which === 13) { this.onEditClick(); } }} onChange={this.onTitleChange} />
              <i onClick={this.onDeleteClick} className="fa fa-trash-o" />
              <i onClick={this.onEditClick} className="fa fa-pencil" />
            </div>
            <div className="note-mover">
              <i className="note-mover fa fa-arrows" />
            </div>
          </div>
          <Textarea className="editBox" value={this.props.note.text} onKeyPress={(event) => { if (event.which === 13) { this.onEditClick(); } }} onChange={this.onTextChange} />
        </div>
      );
    } else {
      return (
        <div>
          <div className="noteTitleBar">
            <div>
              {this.props.note.title}
              <i onClick={this.onDeleteClick} className="fa fa-trash-o" />
              <i onClick={this.onEditClick} className="fa fa-pencil" />
            </div>
            <i className="fa fa-arrows note-mover" />
          </div>
          <div className="noteBody" dangerouslySetInnerHTML={{ __html: marked(this.props.note.text) }} />
        </div>
      );
    }
  }

/*      <i className="resize fa fa-crop" onDragStart={this.onResizeStart} onDrag={(e) => { if (this.state.resizing) { this.onResize(e); } }} />*/

  render() {
    return (
      <Draggable
        handle=".note-mover"
        grid={this.state.grid}
        position={{ x: this.props.note.x, y: this.props.note.y }}
        onStart={this.onStartDrag}
        onDrag={this.onDrag}
        onStop={this.onStopDrag}
      >
        <div className="note" style={{ height: this.props.height, width: this.props.note.width }}>
          {this.renderNote()}
        </div>
      </Draggable>
    );
  }
}

export default Note;
