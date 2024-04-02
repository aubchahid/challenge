<script setup lang="ts">
defineProps({
    modalId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    size: {
        type: String,
        default: 'modal-lg'
    }
})
</script>

<template>
    <div class="modal fade" :id="modalId" tabindex="-1" aria-labelledby="newUserLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" :class="size">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="newUserLabel">{{ title }}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <slot>
                </slot>
            </div>
        </div>
    </div>
</template>