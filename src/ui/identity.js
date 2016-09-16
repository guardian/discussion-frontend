import { user } from '../model/proptypes';
import styleHelpers from '../ui/styles/helpers.css';
import Avatar from '../ui/avatar';

const Identity = function({
    anonymous,
    avatarImagesHost,
    closed,
    loading,
    profile,
    profileUrl,
    profileClientId
}) {
    if (loading) {
        // While loading don't show anything, it conflicts with what's rendered by frontend
        return null;
    } else if (anonymous || !profile) {
        const signIn = profileUrl + '/signin?INTCMP=DOTCOM_COMMENTS_SIGNIN' + (profileClientId ? '&clientId=' + profileClientId : '');
        const register = profileUrl + '/register?INTCMP=DOTCOM_COMMENTS_REG' + (profileClientId ? '&clientId=' + profileClientId : '');
        return (
            <p className="container__meta__item">
                <a className={styleHelpers.underline} href={signIn}>Sign in</a>
                {' '}or{' '}
                <a className={styleHelpers.underline} href={register}>create your Guardian account</a>
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
        return (
            <Avatar avatarImagesHost={avatarImagesHost} userId={profile.userId} displayName={profile.displayName} />
        );
    }
};

Identity.propTypes = {
    anonymous: React.PropTypes.bool,
    avatarImagesHost: React.PropTypes.string.isRequired,
    closed: React.PropTypes.bool,
    loading: React.PropTypes.bool.isRequired,
    profile: user,
    profileUrl: React.PropTypes.string.isRequired,
    profileClientId: React.PropTypes.string,
};

export default Identity;
