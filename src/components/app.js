import React, { Component } from 'react';
import Immutable from 'immutable';

import NoteBar from './noteBar';
import Note from './note';

// example class based component (smart component)
class App extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {
      id: 0,
      notes: Immutable.Map(),
      undo: Immutable.Stack(),
    };
    this.deleteNote = this.deleteNote.bind(this);
    this.addNote = this.addNote.bind(this);
    this.moveNote = this.moveNote.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
    this.changeText = this.changeText.bind(this);
    this.undoChange = this.undoChange.bind(this);
    this.resize = this.resize.bind(this);
  }

  addNote(text) {
    this.setState({
      id: this.state.id + 1,
      notes: this.state.notes.set(this.state.id, {
        title: '',
        text,
        x: 400,
        y: 12,
        width: 100,
        height: 100,
        zIndex: this.state.id,
      }),
      undo: this.state.undo.unshift(this.state.notes),
    });
  }
  deleteNote(id) {
    this.setState({
      notes: this.state.notes.remove(id),
      undo: this.state.undo.unshift(this.state.notes),
    });
  }
  moveNote(id, x, y) {
    this.setState({
      notes: this.state.notes.update(id, (n) => { return Object.assign({}, n, { x, y }); }),
    });
  }
  changeTitle(id, title) {
    this.setState({
      notes: this.state.notes.update(id, (n) => { return Object.assign({}, n, { title }); }),
      undo: this.state.undo.unshift(this.state.notes),
    });
  }
  changeText(id, text) {
    this.setState({
      notes: this.state.notes.update(id, (n) => { return Object.assign({}, n, { text }); }),
      undo: this.state.undo.unshift(this.state.notes),
    });
  }
  undoChange() {
    if (this.state.undo.size !== 0) {
      this.setState({
        notes: this.state.undo.first(),
        undo: this.state.undo.shift(),
      });
    }
  }
  resize(id, width, height) {
    this.setState({
      notes: this.state.notes.update(id, (n) => { return Object.assign({}, n, { width, height }); }),
    });
  }

  render() {
    const getNotes = this.state.notes.entrySeq().map(([id, note]) => {
      return (
        <Note
          note={note}
          id={id}
          deleteNote={this.deleteNote}
          moveNote={this.moveNote}
          changeText={this.changeText}
          changeTitle={this.changeTitle}
          moveToFront={this.moveToFront}
          resize={this.resize}
        />);
    });
    return (
      <div id="app">
        <NoteBar addNote={this.addNote} undoChange={this.undoChange} />
        <div id="notesSet">
          {getNotes}
        </div>
      </div>

    );
  }
}

export default App;
