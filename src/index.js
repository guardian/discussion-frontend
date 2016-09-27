import { render } from 'react-dom';
import Discussion from './model/discussion';
import mediator from './utils/mediator';
import { create as createApi } from './net/discussion-api.js';

export default function create ({
    /* Base host for discussion api */
    apiHost,
    /* Base host for avatar images */
    avatarImagesHost,
    /* Is the discussion closed for comments */
    closed,
    /* Discussion ID */
    discussionId,
    /* Element in which the discussion frontend is rendered */
    element,
    /* Show a sticky round badge with the comment count to engage users */
    featureStickyBadge,
    /* Show a sticky banner at the bottom of a page with the comment count to engage users */
    featureStickyBanner,
    /* Whether the sticky banner can be dismissed */
    featureStickyBannerDismissable,
    /* Show a sticky banner at the top of a page with comment count and share buttons */
    featureTopBanner,
    /* Custom net module, exports `json` and `jsonp` methods */
    net = {},
    /* Base path for profile service e.g. signin, register */
    profileUrl,
    /* Client id to add to profile links e.g. signin, register */
    profileClientId,
    /* User information, if null, it tries to get it from discussion API */
    user,
    /* Does the user have a valid guardian user cookie? If so it'll get the profile from API */
    userFromCookie,
    /* Dependency injection: Promise */
    Promise = window.Promise
}) {
    const api = createApi({ apiHost, net, Promise });

    const component = (
        <Discussion
            id={discussionId}
            api={api}
            avatarImagesHost={avatarImagesHost}
            profileUrl={profileUrl}
            profileClientId={profileClientId}
            closed={closed}
            featureStickyBadge={featureStickyBadge}
            featureStickyBanner={featureStickyBanner}
            featureStickyBannerDismissable={featureStickyBannerDismissable}
            featureTopBanner={featureTopBanner}
            user={user}
            userFromCookie={userFromCookie}
        />
    );

    return new Promise(resolve => {
        render(
            component,
            element,
            () => resolve(mediator)
        );
    });
}
