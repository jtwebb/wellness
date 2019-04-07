import { md5 } from './md5';

export const getUserImage = (email, size = 80) => {
    return `https://www.gravatar.com/avatar/${md5(email)}?d=404&s=${size}`;
};
