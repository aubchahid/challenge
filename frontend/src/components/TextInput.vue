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
    size: {
        type: String,
        default: 'col-12'
    },
    modelValue: {
        type: String,
        default: ''
    },
});

const emits = defineEmits(['update:modelValue']);

const updateValue = (value: any) => {
    emits('update:modelValue', value.target.value);
};

</script>

<template>
    <div :class="size" class="mb-2">
        <label :for="id" class="form-label mb-1">{{ label }}</label>
        <input :type="type" name="id" :id="id" :placeholder="placeholder" @input="updateValue($event)"
            :value="modelValue" class="form-control" />
    </div>
</template>