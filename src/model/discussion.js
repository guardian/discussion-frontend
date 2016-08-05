import CommentCount from '../ui/comment-count';
import { get } from '../utils/json';
import mediator from '../utils/mediator';

class Discussion extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            commentsCount: 0
        };
    }

    componentDidMount () {
        get(this.props.commentsCountApi + '?shortUrls=' + this.props.id)
        .then(response => {
            if (response.counts && response.counts.length > 0) {
                const count = response.counts[0].count;
                this.setState({ commentsCount: count }, () => {
                    mediator.emit('comment-count', count);
                });
            } else {
                return Promise.reject(new Error('Invalid comments count response'));
            }
        })
        .catch(ex => {
            mediator.emit('error', 'comments-count', ex);
        });
    }

    render () {
        return (
            <CommentCount count={this.state.commentsCount} />
        );
    }
}

Discussion.propTypes = {
    id: React.PropTypes.string,
    commentsCountApi: React.PropTypes.string
};

export default Discussion;
