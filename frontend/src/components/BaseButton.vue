<script setup lang="ts">
defineProps({
    text: {
        type: String,
        required: true
    },
    className: {
        type: String,
        default: 'btn-primary'
    }
});
</script>

<template>
    <div class="mt-4 d-grid">
        <button type="submit" class="btn" :class="className">
            {{ text }}
        </button>
    </div>
</template>