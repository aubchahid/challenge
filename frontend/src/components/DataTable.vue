<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { helpers } from '@/utils';

type Item = {
    [key: string]: any; // This allows any number of properties with any type
}

type ActionButton = {
    icon?: string;
    class: string;
    type?: string;
    text?: string;
    onClick: (item: Item) => void;
};

const props = defineProps<{
    items: Item[],
    headers: Array<{ text: string, value: string, isComplex?: boolean, type?: string }>,
    buttonType?: string,
    pageSize: number,
    disabled?: string,
    actionsConfig: ActionButton[];
}>();

const currentPage = ref(1);
const sortKey = ref('');
const sortOrder = ref('asc');

const sortedItems = computed(() => {
    return [...props.items].sort((a, b) => {
        let modifier = 1;
        if (sortOrder.value === 'desc') modifier = -1;
        if (a[sortKey.value] < b[sortKey.value]) return -1 * modifier;
        if (a[sortKey.value] > b[sortKey.value]) return 1 * modifier;
        return 0;
    });
});

const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * props.pageSize;
    const end = start + props.pageSize;
    return sortedItems.value.slice(start, end);
});

const totalPageNumbers = computed(() => {
    return Math.ceil(props.items.length / props.pageSize);
});

function sortTable(key: string) {
    if (sortKey.value === key) {
        sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
    } else {
        sortKey.value = key;
        sortOrder.value = 'asc';
    }
}

function changePage(page: number) {
    currentPage.value = page;
}

const visiblePageNumbers = computed(() => {
    const pages = [];
    const totalPages = totalPageNumbers.value;
    const currentPageNum = currentPage.value;
    const pageRangeDisplayed = 2; // Number of pages shown before and after the current page

    let startPage = currentPageNum - pageRangeDisplayed;
    let endPage = currentPageNum + pageRangeDisplayed;

    if (startPage <= 1) {
        startPage = 1;
        endPage = Math.min(startPage + pageRangeDisplayed * 2, totalPages);
    }

    if (endPage >= totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - pageRangeDisplayed * 2);
    }

    // Ensure startPage is always 1 or more
    startPage = Math.max(startPage, 1);

    for (let number = startPage; number <= endPage; number++) {
        pages.push(number);
    }

    return pages;
});

watch(() => props.pageSize, () => {
    currentPage.value = 1;
});


</script>

<template>
    <div>
        <table class="table">
            <thead class="thead-dark">
                <tr>
                    <th v-for="(header, index) in headers" @click="sortTable(header.value)" :key="header.value"
                        :class="index == 0 ? 'text-start' : 'text-center'" style="cursor: pointer" class="fw-bold">
                        {{ header.text }}
                        <span v-if="sortKey === header.value">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
                    </th>
                    <th></th>
                </tr>
            </thead>
            <tbody v-if="paginatedItems.length > 0">
                <tr v-for="item in paginatedItems" :key="item.id">
                    <template v-for="(header, index) in headers" :key="header.value">
                        <td :class="index == 0 ? 'text-start' : 'text-center'">
                            <small v-if="header.type == 'text'">{{ item[header.value] }}</small>
                            <small v-if="header.type == 'fullname'">
                                {{ item.first_name }} {{ item.last_name }}
                            </small>
                            <small v-if="header.type == 'datetime'">
                                {{ helpers.dateTime(item.created_at) }}
                            </small>
                            <small v-if="header.type == 'list'">
                                <span v-for="(group, index) in item.groups" :key="group.id">
                                    {{ group.name }}{{ index < item.groups.length - 1 ? ', ' : '' }} </span>
                            </small>

                            <small v-if="header.type == 'age'">
                                {{ helpers.calculateAge(item.birthdate) }} years
                            </small>
                        </td>
                    </template>

                    <td v-if="buttonType == 'simple'" class="text-center">
                        <button v-for="action in actionsConfig" :key="action.icon" class="btn me-2 btn-sm"
                            :class="action.class" @click="action.onClick(item)">
                            <i :class="action.icon"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
            <tbody v-else>
                <tr>
                    <td :colspan="headers.length + 1" class="text-center">Aucun enregistrements correspondants trouvés
                    </td>
                </tr>
            </tbody>
        </table>
        <nav aria-label="Page navigation" class="mt-4">
            <ul class="pagination">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                    <a class="page-link" href="#" @click.prevent="changePage(1)">
                        <i class="fa-solid fa-chevron-left"></i>
                    </a>
                </li>
                <li class="page-item" v-for="    page    in    visiblePageNumbers    " :key="page"
                    :class="{ active: page === currentPage }">
                    <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
                </li>
                <li class="page-item" :class="{ disabled: currentPage === totalPageNumbers }">
                    <a class="page-link" href="#" @click.prevent="changePage(totalPageNumbers)">
                        <i class="fa-solid fa-chevron-right"></i>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>
