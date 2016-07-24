# CS52 HW3 React Note App

I implemented the note app with three components: app, note and noteBar.
To add a note type the content of the note in the bar and either press enter or click 'New Note'. The new note initially has no title and its content is the item typed into the bar.

A note consists of the title (if a note has a title), the content, a drag handle, a delete button and an edit button. After pressing the pencil edit button the title and the content become input fields. To finish editing either press enter or click the edit button again.

For extra credit I implemented an undo button. If you make a mistake and delete a note by accident or edit content and accidentally erase an important part, the undo button reverts back to a previous state of notes and your mistake is 'undone'.
The implementation of undo saves the state of the notes when a notes is added, deleted or the content changed. When the undo button is pressed, the last state is popped off of undo and set as the current state. 

I initially attempted to call my function addNote in the constructor of app to test the function, but found this resulted in errors where the state was unchanged despite calling this.setState in line prior.
