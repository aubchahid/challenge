<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { TextInput, TextAreaInput, Modal } from '@/components';
import { useGroupStore } from '@/stores';
import { groupService } from '@/services';

const groupStore = useGroupStore();

import GroupTable from './GroupTable.vue';

const isOnline = ref('false');
const groups = ref(computed(() => groupStore.groups));
const isSuccess = ref(false);
const message = ref('');
const isLoading = ref(false);

onMounted(async () => {
    await groupService.getAll();
    isOnline.value = localStorage.getItem('isOnline') ?? 'false';
});

const formData = ref({
    name: '',
    slug: '',
    description: '',
});

const newGroup = async () => {
    isLoading.value = true;

    await groupService.createGroup(formData.value).then(() => {
        groupService.getAll();
        isSuccess.value = true;
        message.value = 'Group created successfully';
    }).catch(() => {
        console.log('error');
    }).finally(() => {
        $('#newGroup').modal('hide');
        clearForm();
        isLoading.value = false;
    });
};

const deleteGroup = async () => {
    isLoading.value = true;

    await groupService.deleteGroup().then(() => {
        isSuccess.value = true;
        message.value = 'Group deleted successfully';
        $('#deleteGroup').modal('hide');
    }).catch(() => {
        console.log('error');
    }).finally(() => {
        isLoading.value = false;
    });
};

const clearForm = () => {
    formData.value = {
        name: '',
        slug: '',
        description: '',
    };
};

</script>
<template>
    <div class="container">
        <div class="breadcrumb-section d-flex align-items-center">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="#">Wiggle</a></li>
                <li class="breadcrumb-item active" aria-current="page">Groups</li>
            </ol>
        </div>

        <div class="row">
            <div class="col-12">
                <div class="alert alert-success alert-dismissible fade show" role="alert" v-if="isSuccess">
                    {{ message }}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            </div>
        </div>


        <div class="card border-none shadow p-3 mb-5 bg-body-tertiary rounded">
            <div class="card-header border-none">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="header">
                        <h5>Groups</h5>
                        <small>Manage all groups</small>
                    </div>
                    <button v-if="isOnline == 'true'" class="btn btn-primary btn-sm" data-bs-toggle="modal"
                        data-bs-target="#newGroup">
                        <i class="fa-solid fa-square-plus me-2"></i>
                        New Group
                    </button>
                </div>
            </div>
            <div v-if="groups" class="card-body">
                <GroupTable :groups="groups" :isOnline="isOnline" />
            </div>
            <div v-else class="card-body border-top pt-4 d-flex align-items-center justify-content-center"
                style="height: 650px;">
                <div class="row mt-5">
                    <div class="col-12 text-center">
                        <h5>Chargement des données...</h5>
                        <div class="spinner-border text-primary mt-4" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <Modal modalId="newGroup" title="New Group" size="modal-md">
            <form @submit.prevent="newGroup">
                <div class="modal-body">
                    <div class="row">
                        <TextInput label="Name" id="name" placeholder="Ex : Admins" type="text" size="col-12"
                            v-model="formData.name" />
                        <TextInput label="Slug" id="slug" placeholder="Ex : ADM" type="text" size="col-12"
                            v-model="formData.slug" />
                        <TextAreaInput label="Description" id="description" placeholder="Ex : Admins group"
                            size="col-12" v-model="formData.description" />
                    </div>
                </div>
                <div class="modal-footer border-none">
                    <button type="button" class="btn btn-link" data-bs-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary">
                        <span v-if="isLoading" class="d-flex align-items-center">
                            <div class="spinner-border spinner-border-sm text-white" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </span>
                        <span v-else>Save</span>
                    </button>
                </div>
            </form>
        </Modal>


        <Modal modalId="deleteGroup" title="Delete Group" size="modal-md">
            <div class="modal-body">
                <div class="row">
                    <div class="col-12">
                        <p v-if="isOnline == 'true'">Are you sure you want to delete this group?</p>
                        <p v-else>You can't delete this group while offline</p>
                    </div>
                </div>
            </div>
            <div class="modal-footer border-none">
                <button type="button" class="btn btn-link" data-bs-dismiss="modal">Close</button>
                <button v-if="isOnline == 'true'" type="button" class="btn btn-danger" @click="deleteGroup">
                    <span v-if="isLoading" class="d-flex align-items-center">
                        <div class="spinner-border spinner-border-sm text-white" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </span>
                    <span v-else>Delete</span>
                </button>
            </div>
        </Modal>
    </div>
</template>

<style>
.breadcrumb-section {
    padding: 1rem 0;
    height: 100px !important;
    align-items: center;
    justify-self: center;
}

.breadcrumb-section ol li {
    list-style: none;
    display: inline;
    font-size: 18px !important;
    color: #6c757d !important;
}

.breadcrumb-section ol li a {
    text-decoration: none;
    color: #199e93 !important;
    font-weight: 600;
}

.breadcrumb-section ol li.active {
    color: #000 !important;
}

.w-300 {
    width: 300px !important;
}
</style>