import path from "path";
import url from "url";

const DIRNAME = path.dirname(url.fileURLToPath(import.meta.url));

export const getDay = async (day, part) => {
    const pathToModule = `${DIRNAME}/${day}/${part}.js`;
    const module = await import(pathToModule);

    return {
        ...module,
        filepath: pathToModule,
    };
};

export default {
    getDay,
};
