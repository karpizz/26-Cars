import {createHash} from 'crypto';

export function hash(params) {
    return createHash('sha512', {encoding: 'utf8'}).update(params).digest('hex');
}