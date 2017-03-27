import React, { Component } from 'react';
import styles from './rich-text-box.css';

class RichTextBox extends React.Component {
  constructor (props) {
      super(props);
  }

  click(action,event) {
    event.currentTarget.classList.contains(styles.selected) ? event.currentTarget.classList.remove(styles.selected) : event.currentTarget.className += ' '+ styles.selected ;
    document.execCommand(action);
  }

  render() {
    return (
      <div className={styles.richTextArea}>
        <button className={styles.smallButton} onClick={ (event) => this.click('bold',event)}><b>B</b></button>
        <button className={styles.smallButton} onClick={ () => this.click('italic',event)}> i  </button>
        <button className={styles.smallButton} onClick={ () => this.click('formatBlock',event)}> &quot; </button>
        <button className={styles.smallButton}>Link</button>
        <div className={styles.richTextContainer} contentEditable="true" />
      </div>
    )
  }
}
export default RichTextBox;
