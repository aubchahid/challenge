<script setup lang="ts">
import { ref, onMounted, computed, watchEffect, watch } from 'vue';
import { TextInput, SelectInput, Modal } from '@/components';
import { useGroupStore, useUserStore } from '@/stores';
import { groupService, userService } from '@/services';

import UsersTable from './UsersTable.vue';
import { helpers } from '@/utils';

const userStore = useUserStore();
const groupStore = useGroupStore();


const isLoading = ref(false);
const isOnline = ref('false');
const users = ref(computed(() => userStore.users));
const groups = ref(computed(() => groupStore.groups));


const formData = ref({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    birthdate: '',
    address: '',
    city: '',
    password: '',
    groups: '',
});

const attachData = ref({
    group: '',
});

const updatedData = ref({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    birthdate: '',
    address: '',
    city: '',
    password: '',
});

const selectedUser = ref(computed(() => userStore.selectedUser));
const isSuccess = ref(false);
const message = ref('');

onMounted(async () => {
    await userService.getAll();
    await groupService.getAll();
    isOnline.value = localStorage.getItem('isOnline') ?? 'false';
});


const deleteUser = async () => {
    isLoading.value = true;
    await userService.deleteUser().then(() => {
        isSuccess.value = true;
        message.value = 'User deleted successfully';
        $('#deleteUser').modal('hide');
    }).catch((error) => {
        isLoading.value = false;
        console.log(error);
    }).finally(() => {
        isLoading.value = false;
    })
};

const createUser = async () => {
    isLoading.value = true;
    formData.value.groups = [formData.value.groups];
    await userService.createUser(formData.value).then(() => {
        $('#newUser').modal('hide');
        isSuccess.value = true;
        message.value = 'User created successfully';
    }).catch(() => {
        console.log('error');
    }).finally(() => {
        clearForm();
        isLoading.value = false;

    })
};

const attachUser = async () => {
    isLoading.value = true;
    await userService.attachUser(attachData.value).then(() => {
        isSuccess.value = true;
        message.value = 'User attached successfully';
        $('#attachUser').modal('hide');
    }).catch(() => {
        console.log('error');
    }).finally(() => {
        isLoading.value = false;
    })
};

const editUser = async () => {
    isLoading.value = true;
    await userService.updateUser(updatedData.value).then(() => {
        isSuccess.value = true;
        message.value = 'User updated successfully';
        $('#editUser').modal('hide');
    }).catch(() => {
        console.log('error');
    }).finally(() => {
        isLoading.value = false;
    })
};

watchEffect(() => {
    users.value = userStore.users;
});

watch(selectedUser, () => {
    if (selectedUser.value) {
        updatedData.value = selectedUser.value;
    }
});

const clearForm = () => {
    formData.value = {
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        birthdate: '',
        address: '',
        city: '',
        password: '',
        groups: '',
    };
};

</script>
<template>
    <div class="container">
        <div class="breadcrumb-section d-flex align-items-center">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="#">Wiggle</a></li>
                <li class="breadcrumb-item active" aria-current="page">Users</li>
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
                        <h5>Users</h5>
                        <small>Manage your users</small>
                    </div>
                    <button v-if="isOnline == 'true'" class="btn btn-primary btn-sm" data-bs-toggle="modal"
                        data-bs-target="#newUser">
                        <i class="fa-solid fa-square-plus me-2"></i>
                        New User
                    </button>
                </div>
            </div>
            <div v-if="users" class="card-body">
                <UsersTable :users="users" />
            </div>
        </div>

        <Modal modalId="newUser" title="New User" size="modal-lg">
            <form @submit.prevent="createUser">
                <div class="modal-body">
                    <div class="row">
                        <TextInput label="First name" id="first-name" placeholder="Ex : John" type="text" size="col-6"
                            v-model="formData.first_name" />
                        <TextInput label="Last name" id="last-name" placeholder="Ex : Doe" type="text" size="col-6"
                            v-model="formData.last_name" />
                        <TextInput label="Email" id="email" placeholder="Ex : johndoe@wiggle.com" type="email"
                            v-model="formData.email" size="col-12" />
                        <TextInput label="Phone number" id="phone-number" placeholder="Ex : 0654223443" type="phone"
                            v-model="formData.phone_number" size="col-12" />
                        <TextInput label="Birthdate" id="birthdate" placeholder="Ex : johndoe@wiggle.com" type="date"
                            v-model="formData.birthdate" size="col-12" />

                        <TextInput label="Address" id="address" placeholder="Ex : Rue de france" type="text"
                            v-model="formData.address" size="col-6" />
                        <TextInput label="City" id="city" placeholder="Ex : Rue de france" type="text"
                            v-model="formData.city" size="col-6" />
                        <TextInput label="Password" id="password" placeholder="" type="password"
                            v-model="formData.password" size="col-12" />
                        <SelectInput v-if=groups label="Groups" id="group"
                            :options="groups.map(group => ({ value: group.id, text: group.name }))" size="col-12"
                            v-model="formData.groups" />
                    </div>
                </div>
                <div class="modal-footer border-none">
                    <button type="button" class="btn btn-link" data-bs-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary">Save</button>
                </div>
            </form>
        </Modal>

        <Modal modalId="editUser" title="Edit User" size="modal-lg">
            <form @submit.prevent="editUser">
                <div class="modal-body">
                    <div class="row" v-if="isOnline == 'true'">
                        <TextInput label="First name" id="first-name" placeholder="Ex : John" type="text" size="col-6"
                            v-model="updatedData.first_name" />
                        <TextInput label="Last name" id="last-name" placeholder="Ex : Doe" type="text" size="col-6"
                            v-model="updatedData.last_name" />
                        <TextInput label="Phone number" id="phone-number" placeholder="Ex : 0654223443" type="phone"
                            v-model="updatedData.phone_number" size="col-12" />
                        <TextInput label="Birthdate" id="birthdate" placeholder="Ex : johndoe@wiggle.com" type="date"
                            v-model="updatedData.birthdate" size="col-12" />

                        <TextInput label="Address" id="address" placeholder="Ex : Rue de france" type="text"
                            v-model="updatedData.address" size="col-6" />
                        <TextInput label="City" id="city" placeholder="Ex : Rue de france" type="text"
                            v-model="updatedData.city" size="col-6" />
                        <TextInput label="Password" id="password" placeholder="" type="password"
                            v-model="updatedData.password" size="col-12" />
                    </div>
                    <div class="row" v-else>
                        <p>You can't edit this user while offline</p>
                    </div>
                </div>
                <div class="modal-footer border-none">
                    <button type="button" class="btn btn-link" data-bs-dismiss="modal">Close</button>
                    <button v-if="isOnline == 'true'" type="submit" class="btn btn-primary">Save</button>
                </div>
            </form>
        </Modal>

        <Modal modalId="userDetails" title="User Details" size="modal-lg">
            <div class="modal-body" v-if="selectedUser">
                <div class="row">
                    <div class="col-12">
                        <div class="d-flex">
                            <img src="@/assets/img/logo.svg" class="rounded border p-2" width="50" height="50"
                                alt="User avatar">
                            <div class="ms-2">
                                <p class="mb-0">{{ selectedUser.first_name + ' ' + selectedUser.last_name }}</p>
                                <small>{{ selectedUser.email }}</small>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 mt-4">
                        <div class="row g-3">
                            <div class="col-6">
                                <p class="mb-0">Phone number</p>
                                <small>{{ selectedUser.phone_number }}</small>
                            </div>
                            <div class="col-6">
                                <p class="mb-0">Birthdate</p>
                                <small>{{ selectedUser.birthdate }}</small>
                            </div>
                        </div>
                        <div class="row g-3 mt-3">
                            <div class="col-6">
                                <p class="mb-0">City</p>
                                <small>{{ selectedUser.city }}</small>
                            </div>
                            <div class="col-6">
                                <p class="mb-0">Address</p>
                                <small>{{ selectedUser.address }}</small>
                            </div>
                        </div>
                        <div class="row g-3 mt-3">
                            <div class="col-6">
                                <p class="mb-0">Created at</p>
                                <small>{{ helpers.dateTime(selectedUser.created_at) }}</small>
                            </div>
                            <div class="col-6">
                                <p class="mb-0">Last update</p>
                                <small>{{ helpers.dateTime(selectedUser.updated_at) }}</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer border-none">
                <button type="button" class="btn btn-link" data-bs-dismiss="modal">Close</button>
            </div>
        </Modal>

        <Modal modalId="deleteUser" title="Delete User" size="modal-md">
            <div class="modal-body">
                <div class="row">
                    <div class="col-12">
                        <p v-if="isOnline == 'true'">Are you sure you want to delete this user ?</p>
                        <p v-else>You can't delete this user while offline</p>

                    </div>
                </div>
            </div>
            <div class="modal-footer border-none">
                <button type="button" class="btn btn-link" data-bs-dismiss="modal">Close</button>
                <button v-if="isOnline == 'true'" type="button" class="btn btn-danger" @click="deleteUser">
                    <span v-if="isLoading" class="d-flex align-items-center">
                        <div class="spinner-border spinner-border-sm text-white" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </span>
                    <span v-else>Delete</span>
                </button>
            </div>
        </Modal>


        <Modal modalId="attachUser" title="Attach User" size="modal-md">
            <form @submit.prevent="attachUser">
                <div class="modal-body">
                    <div class="row">
                        <div class="col-12" v-if="isOnline == 'true'">
                            <SelectInput v-if=groups label="Groups" id="group"
                                :options="groups.map(group => ({ value: group.id, text: group.name }))" size="col-12"
                                v-model="attachData.group" />
                        </div>
                        <div class="col-12" v-else>
                            <p>You can't attach user to a group while offline</p>
                        </div>
                    </div>
                </div>
                <div class="modal-footer border-none">
                    <button type="button" class="btn btn-link" data-bs-dismiss="modal">Close</button>
                    <button v-if="isOnline == 'true'" type="submit" class="btn btn-success">
                        <span v-if="isLoading" class="d-flex align-items-center">
                            <div class="spinner-border spinner-border-sm text-white" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </span>
                        <span v-else>Attach</span>
                    </button>
                </div>
            </form>
        </Modal>

    </div>
</template>

<style scoped>
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