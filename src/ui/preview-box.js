import React, { Component } from 'react';
import styles from './preview-box.css';

class PreviewBox extends React.Component {
  constructor (props) {
      super(props);
  }

  render() {
    return (
      <div className={this.props.visible ?  'visible' : styles.hidden}>
        <div className={styles.previewContainer}>
          <div dangerouslySetInnerHTML={{__html: this.props.text}}></div>
        </div>
      </div>
    )
  }
}
export default PreviewBox;
