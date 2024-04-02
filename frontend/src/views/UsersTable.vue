<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { DataTable } from '@/components';
import { useUserStore } from '@/stores';

const userStore = useUserStore();

const props = defineProps({
    users: {
        type: Array,
        required: true,
    },
});

const headers = [
    { text: 'Full name', value: 'name', type: 'fullname' },
    { text: 'Email', value: 'email', type: 'text' },
    { text: 'Group', value: 'gourps', type: 'list' },
    { text: 'Created at', value: 'created_at', type: 'datetime' },
    { text: 'Age', value: 'age', type: 'age' },
];

const actionsConfig = [
    { icon: 'fa-solid fa-eye', class: 'btn btn-primary btn-sm', onClick: (item: any) => detailsItem(item) },
    { icon: 'fa-solid fa-pen', class: 'btn btn-warning btn-sm', onClick: (item: any) => editItem(item) },
    { icon: 'fa-solid fa-trash', class: 'btn btn-danger btn-sm', onClick: (item: any) => deleteItem(item) },
    { icon: 'fa-solid fa-share', class: 'btn btn-success btn-sm', onClick: (item: any) => attachItem(item) }
];

const detailsItem = (item: any) => {
    userStore.setUser(item);
    $('#userDetails').modal('show');
};

const editItem = (item: any) => {
    userStore.setUser(item);
    userStore.setSelectedId(item.id);
    $('#editUser').modal('show');
};

const deleteItem = (item: any) => {
    userStore.setSelectedId(item.id);
    $('#deleteUser').modal('show');
};

const attachItem = (item: any) => {
    userStore.setSelectedId(item.id);
    $('#attachUser').modal('show');
};

const filteredData = ref(props.users);

const searchQuery = ref('');
const itemPerPage = ref(20);

const filter = () => {
    filteredData.value = props.users.filter((item: any) => {
        const groupsNames = item.groups.map(group => group.name).join(' ');
        const combinedFields = `${item.first_name} ${item.last_name} ${groupsNames}`.toLowerCase();
        const searchWords = searchQuery.value.toLowerCase().split(' ');
        return searchWords.every(word => combinedFields.includes(word));
    });
};

watchEffect(() => {
    filter();
});

</script>
<template>
    <div>
        <div class="row mb-4">
            <div class="col-12">
                <div class="d-flex align-items-center">
                    <input v-model="searchQuery" type="search" class="form-control w-240 me-2"
                        placeholder="Rechercher..." @input="filter" />

                    <div class="d-flex align-items-center ms-auto">
                        <label for="">Afficher</label>
                        <select v-model="itemPerPage" name="" class="form-select ms-2 me-2 w-120">
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="50">50</option>
                            <option value="60">60</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <DataTable :items="filteredData" :headers="headers" :page-size=itemPerPage :actionsConfig="actionsConfig"
            buttonType="simple" />
    </div>
</template>
<style>
.w-240 {
    width: 240px;
}
</style>
