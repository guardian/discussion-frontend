import styles from './banner.css';
import bubbleLeftRound from '../../images/bubble-left-round.svg';
import { thousands } from '../../utils/format';
import { observeRatio } from '../../utils/intersection-observer';
import smoothScroll from '../../utils/smooth-scroll';

class StickyTopBanner extends React.Component {
    constructor () {
        super();
        this.state = {
            // The banner should only be visible when the user is viewing the body content.
            // Dismiss it when it reaches the bottom of the article (not of the page).
            inScrollTarget: false
        };
    }

    componentDidMount () {
        const options = {
            rootMargin: '-20% 0px -30%',
            threshold: 0
        };
        const target =
            document.getElementsByClassName('js-article__body')[0] ||
            document.getElementsByClassName('js-liveblog-body')[0];
        this.observer = observeRatio(
            target,
            options,
            visible => {
                this.setState({ inScrollTarget: visible });
            }
        );
    }

    scrollToComments () {
        const anchor = document.getElementById('comments');
        if (anchor) {
            smoothScroll({anchor});
        }
    }

    componentWillUnmount () {
        if (this.observer) {
            this.observer.disconnect();
        }
    }

    render ({
        commentsCount
    } = this.props) {
        const containerClasses = [styles.badgeContainer, this.state.inScrollTarget ? styles.visible : styles.hiddenBelowWithMargin].join(' ');

        return (
            <div className={containerClasses} onClick={this.scrollToComments} data-link-name="comments sticky badge">
                <div className={[styles.bubble, styles.bubbleSmall].join(' ')}>
                    <span className={[styles.bubbleText, styles.bubbleTextSmall].join(' ')}>
                        {thousands(commentsCount)}
                    </span>
                    <span dangerouslySetInnerHTML={{__html: bubbleLeftRound}} />
                </div>
            </div>
        );
    }
}

StickyTopBanner.propTypes = {
    commentsCount: React.PropTypes.number
};

export default StickyTopBanner;
