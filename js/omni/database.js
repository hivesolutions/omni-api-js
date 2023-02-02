export const DatabaseAPI = superclass =>
    class extends superclass {
        async resetDatabase() {
            const url = `${this.baseUrl}database/reset`;
            const response = await this.post(url);
            return response;
        }
    };

export default DatabaseAPI;
