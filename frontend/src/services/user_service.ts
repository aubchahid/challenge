import { api, helpers } from '@/utils';
import { useUserStore } from '@/stores';

const login = async (formData: { email: string, password: string }) => {
    try {
        const response = await api().post('/login', formData);
        if (response.status === 200) {
            helpers.setSavedUser(response.data);
        }
        return response.status;
    } catch (error) {
        console.log(error);
        return '500'
    }
};

const getAll = async () => {
    try {
        const response = await api().get('/users');
        if (response.status === 200) {
            const userStore = useUserStore();
            userStore.setUsers(response.data.users);
            return response.data;
        }
    } catch (error) {
        console.log(error);
        return [];
    }
};

const deleteUser = async () => {
    try {
        const userStore = useUserStore();
        const response = await api().delete(`/users/${Number(userStore.selectedId)}`);
        if (response.status === 200) {
            userStore.removeUser(Number(userStore.selectedId));
        }
        return response.data;
    } catch (error) {
        console.log(error);
        return [];
    }
};

const createUser = async (formData: any) => {
    try {
        const response = await api().post('/users', formData);
        if (response.status === 201) {
            const userStore = useUserStore();
            userStore.addUser(response.data.user);
        }
        return response.data;
    } catch (error) {
        console.log(error);
        return [];
    };
};

const attachUser = async (formData: any) => {
    try {
        const userStore = useUserStore();
        const response = await api().post(`/users/attach/${Number(userStore.selectedId)}`, formData);
        if (response.status === 200) {
            userStore.updateUser(response.data.user);
        }
        return response.data;
    } catch (error) {
        console.log(error);
        return [];
    };
};

const updateUser = async (formData: any) => {
    try {
        const userStore = useUserStore();
        const response = await api().put(`/users/${Number(userStore.selectedId)}`, formData);
        if (response.status === 200) {
            userStore.updateUser(response.data.user);
        }
        return response.data;
    } catch (error) {
        console.log(error);
        return [];
    }
};
export default {
    login,
    getAll,
    deleteUser,
    createUser,
    attachUser,
    updateUser
}