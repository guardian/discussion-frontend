import styles from './comment-box.css';

class CommentBox extends React.Component {

  constructor (props) {
      super(props);
      this.api = this.props.api;
      this.state = { score: null };
      this.handleChange = this.debounce(this.getScore.bind(this), 200);
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
      let message = percent + "% similar to comments breaking our comunity guidlines";
      return message;
  }

  getSeverity() {
      if(this.state.score < 0.4){
          return "severity-low";
      } else if(0.4 < this.state.score < 0.7) {
          return "severity-medium";
      } else {
          return "severity-high";
      }
  }

  render () {
      const score = this.state.score;
      let scoreStatus = null;
      if(score ==null){
        scoreStatus = null
      }else if(score=='pending') {
          scoreStatus = "Analysing..."
      } else {
          scoreStatus = this.getMessage(score);
      }

    return (
        <div className="container__meta">
          <textarea className={styles.textArea} name="comment" maxLength="5000" onChange={(event) => {this.handleChange(event.target.value)}}></textarea>
          <button type="submit" className={styles['button']}>Post</button>
          <div className={[styles[this.getSeverity()], styles["message"]].join(' ')}>{scoreStatus}</div>
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
