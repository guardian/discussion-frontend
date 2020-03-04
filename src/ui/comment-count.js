import styles from './comment-count.css';

const CommentCount = ({ count }) => {
    if (count) {
        return (
            <h2 className="container__meta__title">
                Comments <span className={styles.count}>({count})</span>
            </h2>
        );
    } else {
        return <h2 className="container__meta__title">Comments</h2>;
    }
};

CommentCount.propTypes = {
    count: React.PropTypes.number
};

export default CommentCount;
