
class CommentBox extends React.Component {

  constructor (props) {
      super(props);
      this.api = this.props.api;
      this.handleChange = this.handleChange.bind(this);
  }

  handleChange () {
    this.api.commentScore('fuck you');
  }

  render () {
    return (
        <div className="container__meta">
          <textarea name="comment" maxLength="5000" onChange={this.handleChange}></textarea>
          <div><button type="submit">Submit</button></div>
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
