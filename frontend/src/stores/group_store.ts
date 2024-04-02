import { defineStore } from 'pinia';


export const useGroupStore = defineStore('GroupStore', {
    state: () => ({
        groups: null,
        group: null,
        selectedId: null
    }),
    actions: {
        setGroups(groups: any) {
            this.groups = groups;
        },
        addGroup(group: any) {
            this.groups?.push(group);
        },
        setGroup(group: any) {
            this.group = group;
        },
        setSelectedId(id: any) {
            this.selectedId = id;
        },
        removeGroup(id: Number) {
            const itemIdToDelete = id;
            const indexToDelete = this.groups.findIndex((item: any) => item.id == itemIdToDelete);
            if (indexToDelete !== -1) {
                this.groups.splice(indexToDelete, 1);
            } else {
                console.log('Item not found in array.');
            }

        },
    }
});
