const CommentBox = function() {
    return (
        <div className="container__meta">
          <textarea name="comment" maxLength="5000"></textarea>
          <div><button type="submit">Submit</button></div>
        </div>
    );
};

CommentBox.propTypes = {
};

export default CommentBox;
