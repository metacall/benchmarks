'use strict';

// For other addresses: https://www.thinkbroadband.com/download
const ADDRES = process.env['ADDRES'] || 'http://ipv4.download.thinkbroadband.com/10MB.zip';

const http = require('http');
const url = require('url');

const target = url.parse(`${ADDRES}?cacheBuster=${Date.now()}`);

const options = {
    hostname: target.hostname,
    path: target.pathname,
    headers: {
        'User-Agent': `nodejs/${process.version}`,
        'Accept': '*/*',
    },
};

const bench_bandwidth_inbound = async () => {
    const start = Date.now();

    return new Promise((resolve, reject) => {
        http.get(options, (res) => {
            const { statusCode, headers } = res;
            const contentType = headers['content-type'];
            const resume = (err) => {
                res.resume();
                return reject(err);
            };

            if (statusCode !== 200) {
                return resume(new Error(`Request failed with status sode: ${statusCode}`));
            } else if (!/^application\/zip/.test(contentType)) {
                return resume(new Error(`Invalid content-type, expected application/zip but received: ${contentType}`));
            }

            let size = 0;
            res.on('data', (chunk) => { size += chunk.length; });
            res.on('end', () => {
                try {
                    const time = Date.now() - start;
                    const seconds = time / 1000;
                    const MB = size / 1048576;
                    const Mb = MB * 8;
                    const bandwidth = Mb / seconds;

                    return resolve({
                        time: `${time} milliseconds`,
                        size: `${size} bytes`,
                        bandwidth: `${bandwidth} Mbps`,
                    });
                } catch (err) {
                    return reject(err.message);
                }
            });
        }).on('error', (err) => {
            return reject(err.message);
        });
    });
};

const bench_bandwidth_outbound = async () => {
    return new Promise((resolve, reject) => reject('Not implemented'));
};

module.exports = {
    bench_bandwidth_inbound,
    bench_bandwidth_outbound,
};

/*
(async () => {
    try {
        console.log(await bench_bandwidth_inbound());
    } catch (err) {
        console.log(err.message);
    }
})();
*/
