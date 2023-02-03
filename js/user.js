export const UserAPI = superclass =>
    class extends superclass {
        async selfUser(options = {}) {
            const url = `${this.baseUrl}omni/users/self.json`;
            const response = await this.get(url, options);
            return response;
        }
    };

export default UserAPI;
