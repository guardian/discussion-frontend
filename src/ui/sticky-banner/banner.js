import styles from './banner.css';
import CloseButton from '../button/close';
import FauxLink from '../faux-link/faux-link';
import bubbleCentral from '../../images/bubble-central.svg';

class StickyBanner extends React.Component {
    constructor () {
        super();
    }

    render ({
        commentsCount,
        dismissable
    } = this.props) {
        return (
            <div className={styles.bannerContainer} data-link-name="comments sticky banner">
                <FauxLink href="#comments">
                    <div className={styles.bannerMessage}>
                        <div className={styles.options}>
                            <div className={styles.bubble}>
                                <span className={styles.bubbleText}>{commentsCount}</span>
                                <span
                                    className={styles.bubbleImage}
                                    dangerouslySetInnerHTML={{__html: bubbleCentral}}
                                />
                            </div>
                            {dismissable ? <CloseButton className={[styles.promote, styles.closeButton].join(' ')} /> : null}
                        </div>
                        <div className={dismissable ? styles.textMessageSmall : styles.textMessage}>The conversation continues below the line</div>
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
