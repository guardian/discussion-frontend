import { render } from 'react-mount';
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
    /* Show a sticky banner with the comment count to engage users */
    featureStickyBanner,
    /* Whether the sticky banner can be dismissed */
    featureStickyBannerDismissable,
    /* Custom net module, exports `json` and `jsonp` methods */
    net = {},
    /* Base path for profile service e.g. signin, register */
    profileUrl,
    /* Client id to add to profile links e.g. signin, register */
    profileClientId,
    /* User information, if null, it tries to get it from discussion API */
    user,
    /* Does the user have a valid guardian user cookie? If so it'll get the profile from API */
    userFromCookie
}) {
    const api = createApi({ apiHost, net });

    const component = (
        <Discussion
            id={discussionId}
            api={api}
            avatarImagesHost={avatarImagesHost}
            profileUrl={profileUrl}
            profileClientId={profileClientId}
            closed={closed}
            featureStickyBanner={featureStickyBanner}
            featureStickyBannerDismissable={featureStickyBannerDismissable}
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
