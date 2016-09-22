import styles from './banner.css';
import bubbleLeft from '../../images/bubble-left.svg';
import { thousands } from '../../utils/format';
import { observeRatio } from '../../utils/intersection-observer';
import smoothScroll from '../../utils/smooth-scroll';

class StickyTopBanner extends React.Component {
    constructor () {
        super();
        this.state = {
            // The banner should only be visible when the user is viewing the body content.
            // Dismiss it when it reaches the bottom of the article (not of the page).
            inScrollTarget: false,
            clonedIconfacebook: null,
            clonedIcontwitter: null
        };
    }

    componentDidMount () {
        const options = {
            rootMargin: '-30% 0px -60%',
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
        ['facebook', 'twitter'].forEach(social => {
            const element = document.getElementsByClassName('social__item--' + social)[0];
            if (element) {
                this.setState({
                    ['clonedIcon' + social]: element.innerHTML
                });
            }
        });
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
        const {clonedIconfacebook, clonedIcontwitter} = this.state;
        const containerClasses = [styles.topBannerContainer, this.state.inScrollTarget ? styles.visible : styles.hiddenAbove].join(' ');

        return (
            <div className={containerClasses} data-link-name="comments sticky top banner">
                <ul className={styles.linksList}>
                    <li className={styles.linksItem} onClick={this.scrollToComments}>
                        <div className={styles.bubble}>
                            <span className={[styles.bubbleText, styles.bubbleTextWhite].join(' ')}>
                                {thousands(commentsCount)}
                            </span>
                            <span dangerouslySetInnerHTML={{__html: bubbleLeft}} />
                        </div>
                    </li>
                    <li
                        className={styles.linksItem}
                        dangerouslySetInnerHTML={{__html: clonedIcontwitter}}
                    />
                    <li
                        className={styles.linksItem}
                        dangerouslySetInnerHTML={{__html: clonedIconfacebook}}
                    />
                </ul>
            </div>
        );
    }
}

StickyTopBanner.propTypes = {
    commentsCount: React.PropTypes.number
};

export default StickyTopBanner;
