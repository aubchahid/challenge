<script lang="ts" setup>
import { ref } from 'vue';
import { TextInput, BaseButton } from '@/components';
import { userService } from '@/services';

import { helpers } from '@/utils';

const year = new Date().getFullYear();

const formData = ref({
  email: '',
  password: '',
});

const isLoading = ref(false);

const isError = ref(false);


const submitForm = async () => {

  isLoading.value = true;

  await userService.login(formData.value).then((res) => {
    if (res === 200) {
      isError.value = false;
      isLoading.value = false;
      helpers.next('/groups')
      return;
    }
    isError.value = true;
    isLoading.value = false;
  }).catch(() => {
    console.log('Failed to login');
    isLoading.value = false;
  })
};

</script>

<template>
  <div class="">
    <div class="container mt-5">
      <div class="row justify-content-md-center">
        <div class="col-4">
          <div class="card bg-white border-none shadow-lg p-3 mb-5 bg-body-tertiary rounded">
            <div class="card-header text-center pb-4 bg-transparent">
              <img src="@/assets/img/logo.svg" height="35" alt="Wiggle Logo" class="logo mt-5" />
              <h4 class="text-center mt-5">Login</h4>
              <small>Enter your email and password to login</small>
            </div>
            <div class="card-body pb-5">
              <div v-if="isError" class="alert alert-danger" role="alert">
                <span class="text-danger">Invalid email or password</span>
              </div>
              <form @submit.prevent="submitForm" class="mx-auto mt-16 max-w-xl sm:mt-20">
                <div class="row">
                  <TextInput label="Email" id="email" placeholder="Ex : johndoe@wiggle.com" type="email"
                    v-model="formData.email" />
                  <TextInput label="Password" id="password" placeholder="Enter your password" type="password"
                    v-model="formData.password" />
                </div>
                <BaseButton text="Login" />
              </form>
            </div>
          </div>
          <div class="copyright text-center">
            <small class="text-muted">&copy; {{ year }} Ayoub Chahid. All rights reserved.</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style></style>