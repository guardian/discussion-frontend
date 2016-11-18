/* eslint-disable no-console */
const path = require('path');
const jsdom = require('jsdom');
const fs = require('fs');

const ARTILCE_PATH = 'https://www.theguardian.com/lifeandstyle/2016/sep/19/beer-goggles-study-confirms-the-obvious-that-drinking-removes-shyness-about-sex';

const writeHead = writeTo('head', path.join(__dirname, '../example/article.head.html'));
const writeBody = writeTo('body', path.join(__dirname, '../example/article.html'));

fetchArticle()
.then(rewriteArticle)
.then(model => Promise.all([
    writeHead(model),
    writeBody(model)
]))
.then(done)
.catch(console.error);

function fetchArticle () {
    return new Promise((resolve, reject) => {
        jsdom.env({
            url: ARTILCE_PATH,
            done: function(err, window) {
                if (err) {
                    reject(err);
                } else {
                    resolve(window);
                }
            }
        });
    });
}

function rewriteArticle (window) {
    const unnecessaryHeadTags = [
        window.document.head.querySelector('title'),
        window.document.head.querySelector('meta[charset]'),
        window.document.head.querySelector('meta[name=viewport]'),
        window.document.head.querySelector('meta[http-equiv]'),
        ...window.document.head.querySelectorAll('link[rel=dns-prefetch]'),
        window.document.head.querySelector('script'),
    ].filter(Boolean);

    const unnecessaryBodyTags = [
        ...window.document.body.querySelectorAll('iframe'),
        ...filterUselessScripts(window.document.body.querySelectorAll('script')),
        ...filterUselessElements(window.document.body)
    ];

    console.log(`Removing ${unnecessaryHeadTags.length} tags from the head`);
    unnecessaryHeadTags.forEach(tag => tag.remove());

    console.log(`Removing ${unnecessaryBodyTags.length} tags from the body`);
    unnecessaryBodyTags.forEach(tag => tag.remove());

    Array.from(window.document.head.querySelectorAll('link[media="only x"]')).forEach(link => {
        link.setAttribute('media', 'screen');
    });

    return {
        head: window.document.head.innerHTML.trim(),
        body: window.document.body.innerHTML.trim()
    };
}

function filterUselessScripts (scripts) {
    return Array.from(scripts).filter(script => {
        if (script.innerHTML.indexOf('/ophan.js') !== -1) {
            return true;
        } else if (['comscore', 'gu-analytics', 'omniture', 'google_analytics'].includes(script.id)) {
            return true;
        }
        return false;
    });
}

function filterUselessElements (body) {
    return [
        body.querySelector('#omnitureNoScript'),
        body.querySelector('#googleNoScript'),
        body.querySelector('img[src*=beacon]'),
        body.querySelector('img[src*=facebook]'),
        body.querySelector('.top-banner-ad-container'),
        ...body.querySelectorAll('.ad-slot-container'),
        ...body.querySelectorAll('noscript')
    ].filter(Boolean);
}

function writeTo (key, destination) {
    return function(model) {
        const text = model[key];
        if (!text) {
            throw new Error(`Could not find '${key}' in the model`);
        } else {
            return new Promise((resolve, reject) => {
                console.log(`Writing ${key} to ${destination}`);
                fs.writeFile(destination, text, err => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
        }
    };
}

function done () {
    console.log('DONE');
}
