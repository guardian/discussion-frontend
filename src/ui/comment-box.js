import styles from './comment-box.css';

class CommentBox extends React.Component {

  constructor (props) {
      super(props);
      this.api = this.props.api;
      this.state = { score: null };
      this.handleChange = this.handleChange.bind(this);
  }

  handleChange (event) {
    this.api.commentScore(event.target.value)
    .then(score => {
      this.setState({score: score});
    });
  }

  render () {
    return (
        <div className="container__meta">
          <textarea className={styles.textArea} name="comment" maxLength="5000" onChange={this.handleChange}></textarea>
          <button type="submit" className={styles.button}>Post</button>
          <div>SCORE IS: {this.state.score}</div>
        </div>
    );
  }
}

CommentBox.propTypes = {
    api: React.PropTypes.shape({
        commentScore: React.PropTypes.func.isRequired
    }).isRequired,
};

export default CommentBox;
