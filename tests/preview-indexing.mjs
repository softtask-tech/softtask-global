import {readFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
assert.match(await readFile('dist/robots.txt','utf8'),/Disallow: \//);
assert.match(await readFile('dist/_headers','utf8'),/X-Robots-Tag: noindex/);
assert.match(await readFile('dist/index.html','utf8'),/<meta name="robots" content="noindex, nofollow">/);
console.log('Preview HTML, robots.txt and headers are non-indexable.');
