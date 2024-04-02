<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useGroupStore } from '@/stores';
import { groupService } from '@/services';
import { Modal, TextInput, TextAreaInput } from '@/components';

const groupStore = useGroupStore();
const isOnline = ref('false');


const props = defineProps({
    id: {
        type: Number,
        required: true,
    },
});

const group = ref(computed(() => groupStore.group));
const isSuccess = ref(false);
const message = ref('');

const formData = ref({
    name: '',
    slug: '',
    description: '',
});

onMounted(async () => {
    await groupService.getGroup(props.id);
    formData.value = {
        name: group.value?.name,
        slug: group.value?.slug,
        description: group.value?.description,
    };
    isOnline.value = localStorage.getItem('isOnline') ?? 'false';

});



const editGroup = async () => {
    await groupService.updateGroup(props.id, formData.value).then(() => {
        console.log('Group updated successfully');
        isSuccess.value = true;
        message.value = 'Group updated successfully';
    }).catch((error) => {
        console.log(error);
    }).finally(() => {

        $('#editGroup').modal('hide');
    })
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
        <div v-if="group">
            <div class="row">
                <div class="col-12">
                    <div class="alert alert-success alert-dismissible fade show" role="alert" v-if="isSuccess">
                        {{ message }}
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-body">
                    <h5 class="card-title d-flex">
                        <span>{{ group.name }}</span>
                        <button v-if="isOnline == 'true'" class="ms-auto btn btn-sm btn-warning fw-bold"
                            data-bs-toggle="modal" data-bs-target="#editGroup">
                            <i class="fa-solid fa-pen me-2"></i>
                            Edit
                        </button>
                    </h5>
                    <h6 class="card-subtitle mb-2 text-muted">Slug : {{ group.slug }} </h6>
                    <p class="card-text">
                        {{ group.description }}
                    </p>
                    <p class="mt-3 fw-bold">Users of this group</p>
                    <table class="table">
                        <thead class="thead-dark">
                            <tr>
                                <th>Full name</th>
                                <th class="text-center">Email</th>
                                <th class="text-center">Created at</th>
                                <th class="text-center">Age</th>
                            </tr>
                        </thead>
                        <tbody v-if="group.users.length > 0">
                            <tr v-for="(user, index) in group.users" :key="index">
                                <td>{{ user.first_name + ' ' + user.last_name }}</td>
                                <td class="text-center">{{ user.email }}</td>
                                <td class="text-center">{{ user.created_at }}</td>
                                <td class="text-center">{{ user.birthdate }}</td>
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <tr>
                                <td colspan="4" class="text-center">No users found</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal modalId="editGroup" title="Edit Group" size="modal-md">
                <form @submit.prevent="editGroup">
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
                        <button type="submit" class="btn btn-primary">Save</button>
                    </div>
                </form>
            </Modal>
        </div>
    </div>
</template>