import CommentLoader from '../src/index';

const beforeLoad = performance.now();
CommentLoader({
    apiHost: '/api',
    discussionId: '1234',
    element: document.getElementById('comments-container'),
    user: null
})
.then(mediator => {
    mediator.once('comment-count', () => {
        const scriptTiming = performance.getEntries().filter(entry => /example\.js/.test(entry.name))[0];
        const apiTiming = performance.getEntries().filter(entry => !/example\.js/.test(entry.name))[0];
        console.log('Loading comments took', performance.now() - beforeLoad);
        console.log('JavaScript time', performance.now() - scriptTiming.responseEnd - apiTiming.duration);
    });
});
