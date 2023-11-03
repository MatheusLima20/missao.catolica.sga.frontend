import axios from '../../config/axios';
import { UserCustomer, UserLogin, UserMain } from '../../types/user/user';
import { companyCPFCNPJ } from '../../util/platform.number/platform.number';
import { Error } from '../errors/check.errors';
import { cookies } from './adm.cookies';

const cookie = cookies.get('data.user');

export const UserController = {
    login: async (dataLogin: UserLogin) => {
        let request;
        let data;

        try {
            request = await axios.post('/login', dataLogin);

            data = request.data;

            const message = data.message;

            const user = data.user;

            cookies.store(user, 'data.user');

            return { error: false, message };
        } catch (error: any) {
            const message = await Error.check(error);

            return { error: true, message };
        }
    },

    storePhysicalPerson: async (dataUser: UserCustomer) => {
        const values = dataUser;

        try {
            const token = cookie.token;

            const request = await axios.post('/user', values, {
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

    storeEditor: async (dataUser: UserCustomer) => {
        const values = dataUser;

        try {
            const request = await axios.post('/editor', values);

            const data = request.data;

            const message = data.message;

            return { error: false, message };
        } catch (error: any) {
            const message = await Error.check(error);

            return { error: true, message };
        }
    },

    storePlatform: async (dataUser: UserMain) => {
        const values = dataUser;

        try {
            const request = await axios.post('/platform-register', values);

            const data = request.data;

            const message = data.message;

            return { error: false, message };
        } catch (error: any) {
            const message = await Error.check(error);

            return { error: true, message };
        }
    },

    patchPhysicalPerson: async (dataUser: UserCustomer) => {
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

    getStatusDelivery: async (deliveryCode: string) => {
        let request;
        let data;

        try {
            request = await axios.get(
                `/order/${deliveryCode}/${companyCPFCNPJ}`
            );

            data = request.data;

            const message = data.message;

            return { error: false, message, data: data.data };
        } catch (error: any) {
            const message = await Error.check(error);

            return { error: true, message };
        }
    },

    getCollaborators: async () => {
        try {
            const cookie = cookies.get('data.user');

            const token = cookie.token;

            const request = await axios.get('/collaborators', {
                headers: { authorization: `Bearer ${token}` }
            });

            const data = request.data;

            const message = data.message;

            return { error: false, message, data: data.data };
        } catch (error: any) {
            const message = await Error.check(error);

            return { error: true, message };
        }
    },

    getCustomers: async () => {
        try {
            const cookie = cookies.get('data.user');

            const token = cookie.token;

            const request = await axios.get('/customers', {
                headers: { authorization: `Bearer ${token}` }
            });

            const data = request.data;

            const message = data.message;

            return { error: false, message, data: data.data };
        } catch (error: any) {
            const message = await Error.check(error);

            return { error: true, message };
        }
    },

    getClients: async () => {
        try {
            const cookie = cookies.get('data.user');

            const token = cookie.token;

            const request = await axios.get('/clients', {
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
