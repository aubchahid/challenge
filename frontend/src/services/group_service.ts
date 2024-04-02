import { api } from '@/utils';
import { useGroupStore } from '@/stores';

const getAll = async () => {
    try {
        const response = await api().get('/groups');
        if (response.status === 200) {
            const groupStore = useGroupStore();
            groupStore.setGroups(response.data.groups);
        }
        return response.status;
    } catch (error) {
        console.log(error);
        return '500'
    }
};

const createGroup = async (formData: any) => {
    try {
        const response = await api().post('/groups', formData);
        if (response.status === 201) {
            const groupStore = useGroupStore();
            groupStore.addGroup(response.data.group);
        }
        return response.status;
    } catch (error) {
        console.log(error);
        return [];
    }
};

const getGroup = async (id: number) => {
    try {
        const response = await api().get(`/groups/${id}`);
        if (response.status === 200) {
            const groupStore = useGroupStore();
            groupStore.setGroup(response.data.group);
        }
        return true;
    } catch (error) {
        console.log(error);
        return [];
    }
};

const deleteGroup = async () => {
    try {
        const groupStore = useGroupStore();
        const response = await api().delete(`/groups/${groupStore.selectedId}`);
        if (response.status === 200) {
            const groupStore = useGroupStore();
            groupStore.removeGroup(groupStore.selectedId);
        }
        return response.status;
    } catch (error) {
        console.log(error);
        return [];
    }
};

const updateGroup = async (id: number, formData: any) => {
    try {
        const response = await api().put(`/groups/${id}`, formData);
        if (response.status === 200) {
            const groupStore = useGroupStore();
            groupStore.setGroup(response.data.group);
        }
        return response.status;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export default {
    getAll,
    createGroup,
    getGroup,
    deleteGroup,
    updateGroup
}