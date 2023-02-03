export const SaleSnapshotAPI = superclass =>
    class extends superclass {
        async statsSaleSnapshot(options = {}) {
            const url = `${this.baseUrl}omni/sale_snapshots/stats.json`;
            const response = await this.get(url, options);
            return response;
        }
    };

export default SaleSnapshotAPI;
