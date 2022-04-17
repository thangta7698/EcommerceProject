import userClient from './userClient';
export const userApi = {
    register(data) {
        const url = '/auth/local/register';
        return userClient.post(url, data);
    },
    login(data) {
        const url = 'auth/local';
        return userClient.post(url, data);
        
    }
}
export default userApi