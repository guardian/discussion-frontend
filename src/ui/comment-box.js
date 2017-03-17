import styles from './comment-box.css';
import LinkBox from '../ui/linkBox';

class CommentBox extends React.Component {

  constructor (props) {
      super(props);
      this.api = this.props.api;
      this.state = {
        score: null,
        linkBoxVisible : false,
      };
      this.handleChange = this.debounce(this.getScore.bind(this), 500);
      this.insertLink = this.insertLink.bind(this)
  }

  getScore (body) {
    if (body === '') {
      this.setState({score: null});
      return;
    } else if (body != '') {
        this.setState({score:'pending'})
    }
    this.api.commentScore(body)
    .then(score => {
      this.setState({score: score});
    });
  }

  getMessage (score) {
      let percent =  Math.round(score * 100);
      let message = <span className={styles.messageText}>{percent}% similar to comments breaking our <a href="/community-standards">community guidlines</a></span>
      return message;
  }

  getSeverity() {
      if(0.4 < this.state.score && this.state.score < 0.80) {
          return "severity-medium";
      } else if (this.state.score > 0.80){
          return "severity-high";
      }
  }

  insertTextElement(element) {
    let textBox = document.getElementsByName("comment")[0];
    textBox.value = textBox.value + element;
  }

  insertLink(link){
    this.setState({linkBoxVisible: (this.state.linkBoxVisible==true ? false : true)})
    if(!link){
      return
    }
    this.insertTextElement('<a href="'+link+'">'+link+'</a>')
  }

  render () {
      const score = this.state.score;
      let scoreStatus = null;
      if(score ==null){
        scoreStatus = <span >Please keep comments respectful and abide by the community guidlines <a href="/community-standards">community guidlines</a></span>
      }else if(score=='pending') {
          scoreStatus = <span className={styles.analysing}>Analysing...</span>
      } else {
          scoreStatus = this.getMessage(score);
      }
      let message = ""

    return (
        <div className={styles.container__meta}>
          <div>
              <button className={styles.smallButton} onClick={ () => this.insertTextElement('<b></b>')}><b>B</b></button>
              <button className={styles.smallButton} onClick={ () => this.insertTextElement('<i></i>')}> i  </button>
              <button className={styles.smallButton} onClick={ () => this.insertTextElement('<blockquote></blockquote>')}> &quot; </button>
              <button className={styles.smallButton} onClick= { () => this.insertLink()}>Link</button>
              <LinkBox
                visible={this.state.linkBoxVisible}
                insertLink={this.insertLink}
                />
          </div>
          <textarea className={styles.textArea} name="comment" maxLength="5000" onChange={(event) => {this.handleChange(event.target.value)}}></textarea>
          <div className={styles.messageArea}>
              <button type="submit" className={[styles['button'], styles[this.getSeverity()]].join(' ')}>Post</button>
              <div className={[styles[this.getSeverity()], styles["message"]].join(' ')}>{scoreStatus}</div>
          </div>
        </div>
    );
  }

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  debounce (func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

}

CommentBox.propTypes = {
    api: React.PropTypes.shape({
        commentScore: React.PropTypes.func.isRequired
    }).isRequired,
};

export default CommentBox;
