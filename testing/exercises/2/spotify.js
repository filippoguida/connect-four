const https = require('https');
const url = 'https://elegant-croissant.glitch.me/spotify';

exports.search = (q, type) => {
    q = encodeURIComponent(q);
    type = encodeURIComponent(type);
    return new Promise(
        (rslv, rjct) => {
            https.get(
                `${url}?type=${type}&q=${q}`,
                res => {
                    if (res.statusCode != 200) {
                        return rjct(
                            new Error(
                                res.statusCode
                            )
                        );
                    }
                    let body = '';
                    res.on(
                        'data',
                        chunk => body += chunk
                    ).on(
                        'end',
                        () => {
                            rslv(
                                JSON.parse(
                                    body
                                )
                            );
                        }
                    ).on(
                        'error',
                        err => rjct(err)
                    );
                }
            );
        }
    );
};
