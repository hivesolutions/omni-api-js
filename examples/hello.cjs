const yonius = require("yonius");
const omni = require("..");

const hello = async () => {
    await yonius.load();
    const api = new omni.API();
    const result = await api.selfUser();
    console.info(result);
};

hello();
