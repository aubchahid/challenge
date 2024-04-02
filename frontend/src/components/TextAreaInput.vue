<script setup lang="ts">
defineProps({
    label: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    placeholder: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: 'text'
    },
});

const emits = defineEmits(['update:modelValue']);

const updateValue = (value: any) => {
    emits('update:modelValue', value.target.value);
};

</script>

<template>
    <div class="col-12">
        <label :for="id" class="form-label mb-0">{{ label }}</label>
        <div class="mt-2">
            <textarea :id="id" :placeholder="placeholder" :type="type" class="form-control"
                @input="updateValue($event)"></textarea>
        </div>
    </div>
</template>