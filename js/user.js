export const UserAPI = superclass =>
    class extends superclass {
        async selfUser() {
            const url = `${this.baseUrl}omni/users/self.json`;
            const response = await this.get(url);
            return response;
        }
    };

export default UserAPI;
