import React, { Component } from 'react';
import styles from './link-box.css';

class LinkBox extends React.Component {
  constructor (props) {
      super(props);
      this.state = {value: 'http://www.'};
      this.handleChange = this.handleChange.bind(this)
      this.onSubmit = this.onSubmit.bind(this)
  }

  handleChange(event) {
   this.setState({value: event.target.value});
 }

 onSubmit(e) {
   e.preventDefault()
   this.props.insertLink(this.state.value)
   this.setState({value:'http://www.'})
 }

  render() {
    return (
      <div className={this.props.visible ?  'visible' : styles.hidden}>
        <form onSubmit={this.onSubmit}>
          <label>
            url:
            <input type="text" placeholder="http://www." value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Ok" />
        </form>
      </div>
    )
  }
}
export default LinkBox;
