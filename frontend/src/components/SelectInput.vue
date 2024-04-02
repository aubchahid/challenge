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
    options: {
        type: Array,
        required: true,
    }
});

const emits = defineEmits(['update:modelValue']);

const updateValue = (event: any) => {
    emits('update:modelValue', event.target.value);
};

</script>

<template>
    <div :class="size" class="mb-2">
        <label :for="id" class="form-label mb-1">{{ label }}</label>
        <select :id="id" class="form-select" @change="updateValue">
            <option value="" disabled selected>Select an option</option>
            <option v-for="option in options" :key="option.value" :value="option.value">
                {{ option.text }}
            </option>
        </select>

    </div>
</template>