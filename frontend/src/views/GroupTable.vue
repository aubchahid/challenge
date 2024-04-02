<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { DataTable } from '@/components';
import router from '@/router';
import { useGroupStore } from '@/stores';

const groupStore = useGroupStore();

const props = defineProps({
    groups: {
        type: Array,
        required: true,
    },
    isOnline: {
        type: String,
        required: true,
    },
});

const headers = [
    { text: 'Name', value: 'name', type: 'text' },
    { text: 'Code', value: 'slug', type: 'text' },
    { text: 'Total Users', value: 'users_count', type: 'text' },

];

const actionsConfig = ref([
    { icon: 'fa-solid fa-eye', class: 'btn btn-primary btn-sm', onClick: (item: any) => detailsItem(item) },
    { icon: 'fa-solid fa-trash', class: 'btn btn-danger btn-sm', onClick: (item: any) => deleteItem(item) },
]);

const detailsItem = (item: any) => {
    router.push({ name: 'DetailsGroup', params: { id: item.id } });
};

const deleteItem = (item: any) => {
    groupStore.setSelectedId(item.id);
    $('#deleteGroup').modal('show');
};

const filteredData = ref(props.groups);

const searchQuery = ref('');
const itemPerPage = ref(20);

const filter = () => {
    filteredData.value = props.groups.filter((item: any) => {
        const combinedFields = `${item.name} ${item.last_name} ${item.role}`.toLowerCase();
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
