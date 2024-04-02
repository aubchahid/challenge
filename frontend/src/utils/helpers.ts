import router from "@/router";
import { useUserStore } from "@/stores";

const setSavedUser = (res: any): void => {
    localStorage.setItem('user', JSON.stringify(res.user));
    localStorage.setItem('isOnline', 'true');
    localStorage.setItem('token', res.token);

    const userStore = useUserStore();
    userStore.setLoggedIn();
};

const dateTime = (props: string | null): string => {
    if (props === null) return 'Aucune date.';

    const inputDate = new Date(props);

    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, '0');
    const day = String(inputDate.getDate()).padStart(2, '0');
    const hours = String(inputDate.getHours()).padStart(2, '0');
    const minutes = String(inputDate.getMinutes()).padStart(2, '0');

    return `${day}-${month}-${year} ${hours}:${minutes}`;
}

const calculateAge = (birthdate: string): number => {
    const birthDate = new Date(birthdate);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}

const next = (target: any): void => {
    router.push(target);
};


export default { setSavedUser, next, dateTime, calculateAge };