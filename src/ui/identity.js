import { user } from '../model/proptypes';
import styleHelpers from '../ui/styles/helpers.css';

const Identity = function({
    anonymous,
    closed,
    profile,
    profileUrl
}) {
    if (anonymous || !profile) {
        return (
            <p className="container__meta__item">
                <a className={styleHelpers.underline} href={profileUrl + '/signin?INTCMP=DOTCOM_COMMENTS_SIGNIN'}>Sign in</a>
                {' '}or{' '}
                <a className={styleHelpers.underline} href={profileUrl + '/register?INTCMP=DOTCOM_COMMENTS_REG'}>create your Guardian account</a>
                {' '}to join the discussion.
            </p>
        );
    } else if (closed) {
        return (
            <p className="container__meta__item">
                This discussion is closed for comments.
            </p>
        );
    } else if ((profile.privateFields || {}).canPostComment === false) {
        return (
            <p className={['container__meta__item', styleHelpers.error].join(' ')}>
                Commenting has been disabled for this account (<a href="/community-faqs#321a">why?</a>)
            </p>
        );
    } else {
        // Ideally the avatar goes here, but for now it's still in the comment box
        return null;
    }
};

Identity.propTypes = {
    anonymous: React.PropTypes.bool,
    closed: React.PropTypes.bool,
    profile: user,
    profileUrl: React.PropTypes.string.isRequired
};

export default Identity;
