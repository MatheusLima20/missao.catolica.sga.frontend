import axios from '../../config/axios';
import { Content } from '../../types/content/content';
import { Error } from '../errors/check.errors';
import { cookies } from '../user/adm.cookies';

const cookie = cookies.get('data.user');

export const ContentController = {
    store: async (content: Content, file: any) => {
        const values = content;

        try {
            const token = cookie.token;

            const formData = new FormData();

            Object.keys(values).forEach((key: string) => {
                if ((values as any)[key]) {
                    // formData.append(key, (values as any)[key]);
                }
            });

            if (file) {
                formData.append('file', file);
            }
            console.log(file);
            const request = await axios.post('/content', formData, {
                headers: {
                    'content-type': 'multipart/form-data',
                    authorization: `Bearer ${token}`
                }
            });

            const data = request.data;

            const message = data.message;

            return { error: false, message };
        } catch (error: any) {
            const message = await Error.check(error);

            return { error: true, message };
        }
    },

    patch: async (dataUser: any) => {
        const values = dataUser;

        try {
            const cookie = cookies.get('data.user');

            const token = cookie.token;

            const request = await axios.patch('/physical-person', values, {
                headers: { authorization: `Bearer ${token}` }
            });

            const data = request.data;

            const message = data.message;

            return { error: false, message };
        } catch (error: any) {
            const message = await Error.check(error);

            return { error: true, message };
        }
    },

    getByPage: async (page: string) => {
        try {
            const cookie = cookies.get('data.user');

            const token = cookie.token;

            const platformId = cookie.platformId;

            const request = await axios.get(`/content/${page}/${platformId}`, {
                headers: { authorization: `Bearer ${token}` }
            });

            const data = request.data;

            const message = data.message;

            return { error: false, message, data: data.data };
        } catch (error: any) {
            const message = await Error.check(error);

            return { error: true, message };
        }
    }
};
