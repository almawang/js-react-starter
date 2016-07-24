import React, { Component } from 'react';

class NoteBar extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onUndo = this.onUndo.bind(this);
  }
  onInputChange(event) {
    this.setState({ value: event.target.value });
  }
  onSubmit() {
    this.props.addNote(this.state.value);
    this.setState({ value: '' });
  }
  onUndo() {
    this.props.undoChange();
  }

  render() {
    return (
      <div id="note-bar">
        <input onChange={this.onInputChange}
          onKeyPress={(event) => { if (event.which === 13) { this.onSubmit(); } }}
          value={this.state.value}
        />
        <button onClick={this.onSubmit}>New Note</button>
        <button onClick={this.onUndo}>Undo</button>
      </div>
    );
  }
}

export default NoteBar;
