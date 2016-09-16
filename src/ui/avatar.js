import styles from './avatar.css';
import styleHelpers from '../ui/styles/helpers.css';
import { join } from '../utils/url';

const Avatar = function({
    avatarImagesHost,
    displayName,
    userId
}) {
    const avatarSrc = join(avatarImagesHost, 'user/', userId || 'undefined');

    return (
        <div className={styles.container}>
            <span className={styles.avatarWrapper}>
                <img className={styles.avatarImage} alt="" src={avatarSrc} />
            </span>
            <div className={styleHelpers.borderBox}>
                <span className={styles.label}>Signed in as</span>
                {' '}
                <span className={styles.author}>{displayName}</span>
            </div>
        </div>
    );
};

Avatar.propTypes = {
    avatarImagesHost: React.PropTypes.string.isRequired,
    displayName: React.PropTypes.string.isRequired,
    userId: React.PropTypes.string.isRequired,
};

export default Avatar;
