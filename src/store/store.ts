import { makeAutoObservable } from "mobx";
import { createClient, SupabaseClient, PostgrestResponse } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

interface UserData {
    tg_username: string;
    balance: number;
    rank?: number;
    imgsrc: string
}

export default class WebAppStore {
    users: UserData[] = [];
    loading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    setLoading(state: boolean) {
        this.loading = state;
    }

    setUsers(users: UserData[]) {
        this.users = users;
    }

    async fetchUsers() {
        this.setLoading(true);

        try {
            const { data, error }: PostgrestResponse<UserData> = await supabase
                .from('UserData')
                .select('tg_username, balance, imgsrc');

            if (error) {
                throw error;
            }

            // Фильтруем пользователей с нулевым балансом
            const filteredUsers = (data || []).filter(user => user.balance > 0);

            // Сортируем пользователей по балансу (от большего к меньшему)
            const sortedUsers = filteredUsers.sort((a, b) => b.balance - a.balance);

            // Добавляем каждому пользователю его позицию в рейтинге
            const rankedUsers = sortedUsers.map((user, index) => ({
                ...user,
                rank: index + 1, // Первое место начинается с 1
            }));

            this.setUsers(rankedUsers);
        } catch (error) {
            console.error('Failed to fetch users:', error);
        } finally {
            this.setLoading(false);
        }
    }
}
