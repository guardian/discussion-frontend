import 'intersection-observer';

export function observeRatio (target, options, callback) {
    if (target && window.IntersectionObserver) {
        const threshold = 'threshold' in options ? options.threshold : 0;
        const observer = new IntersectionObserver(function(entries) {
            const event = entries.filter(entry => entry.target === target)[0];
            if (event) {
                callback(event.intersectionRatio > threshold);
            }
        }, options);
        observer.observe(target);
        return observer;
    }
}
