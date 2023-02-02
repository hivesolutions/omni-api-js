const omni = require("..");

const tobias = async () => {
    const api = new omni.API();
    console.info("cenas");
    const result = await api.selfUser();
    console.info(result);
};

tobias();
