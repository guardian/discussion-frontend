import styles from './banner.css';
import CloseButton from '../button/close';
import FauxLink from '../faux-link/faux-link';
import bubbleCentral from '../../images/bubble-central.svg';
import { thousands } from '../../utils/format';
import { observeRatio } from '../../utils/intersection-observer';
import smoothScroll from '../../utils/smooth-scroll';

class StickyBanner extends React.Component {
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
            rootMargin: '-20% 0px -25%',
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
        commentsCount,
        dismissable
    } = this.props) {
        const containerClasses = [styles.bannerContainer, this.state.inScrollTarget ? styles.visible : styles.hiddenBelow].join(' ');

        return (
            <div className={containerClasses} data-link-name="comments sticky banner">
                <FauxLink onClick={this.scrollToComments}>
                    <div className={styles.bannerMessage}>
                        <div className={styles.options}>
                            <div className={styles.bubble}>
                                <span className={styles.bubbleText}>{thousands(commentsCount)}</span>
                                <span dangerouslySetInnerHTML={{__html: bubbleCentral}} />
                            </div>
                            {dismissable ? <CloseButton className={[styles.promote, styles.closeButton].join(' ')} /> : null}
                        </div>
                        <div className={dismissable ? styles.textMessageSmall : styles.textMessage}>
                            The conversation continues below
                        </div>
                    </div>
                </FauxLink>
            </div>
        );
    }
}

StickyBanner.propTypes = {
    commentsCount: React.PropTypes.number,
    dismissable: React.PropTypes.bool
};

export default StickyBanner;
