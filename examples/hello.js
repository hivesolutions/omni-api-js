const omni = require("..");

const hello = async () => {
    const api = new omni.API();
    const result = await api.selfUser();
    console.info(result);
};

hello();
