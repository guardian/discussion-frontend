const express = require('express');

const app = express();

app.get('/getCommentCounts', (req, res) => {
    res.send(req.query['short-urls'].split(',').reduce((resp, id) => {
        return Object.assign(resp, { [id]: Math.floor(Math.random() * 5000) });
    }, {}));
});

app.get('/profile/:id', (req, res) => {
    switch (req.params.id) {
        case 'me':
            res.send(userResponse('Your Self'));
            break;
        default:
            res.send({
                'status': 'error',
                'statusCode': 400,
                'message': 'You must be signed in to view this page',
                'errorCode': 'NOT_SIGNED_IN'
            });
            break;
    }
});

function userResponse (name) {
    const id = name.split('').reduce((sum, character) => 2 * sum + character.charCodeAt(0), Math.floor(Math.random() * 10) + 1);

    return {
        status: 'ok',
        userProfile: {
            userId: '' + id,
            displayName: name,
            webUrl: 'https://profile.theguardian.com/user/id/' + id,
            apiUrl: 'https://discussion.guardianapis.com/discussion-api/profile/' + id,
            avatar: 'https://avatar.guim.co.uk/user/' + id,
            secureAvatarUrl: 'https://avatar.guim.co.uk/user/' + id,
            badge: [],
            details: {},
            privateFields: {
                internalId: Math.floor(id / 2),
                canPostComment: true,
                isPremoderated: false,
                isSocial: true,
                hasCommented: true
            }
        }
    };
}

module.exports = app;
