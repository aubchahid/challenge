import { defineStore } from 'pinia';


export const useUserStore = defineStore('UserStore', {
    state: () => ({
        users: null,
        selectedUser: null,
        selectedId: null,
        loggedIn: localStorage.getItem('isOnline') === 'true' ? true : false,
    }),
    actions: {
        setUsers(users: any) {
            this.users = users;
        },
        setUser(user: any) {
            this.selectedUser = user;
        },
        setSelectedId(id: any) {
            this.selectedId = id;
        },
        removeUser(id: Number) {
            const itemIdToDelete = id;
            const indexToDelete = this.users.findIndex((item: any) => item.id == itemIdToDelete);
            if (indexToDelete !== -1) {
                this.users.splice(indexToDelete, 1);
            } else {
                console.log('Item not found in array.');
            }

        },
        addUser(item: any) {
            const existingRouteur = this.users.find((t) => t.id === item.id)
            if (existingRouteur) {
                Object.assign(existingRouteur, item)
            } else {
                this.users.push(item)
            }

        },
        updateUser(item: any) {
            const existingRouteur = this.users.find((t) => t.id === item.id)
            if (existingRouteur) {
                Object.assign(existingRouteur, item)
            } else {
                this.users.push(item)
            }
        },
        setLoggedIn() {
            this.loggedIn = true;
        },
        setLoggedOut() {
            this.loggedIn = false;
        }
    },
});
