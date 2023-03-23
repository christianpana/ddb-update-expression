export const isObject = (obj: any) => {
    return typeof obj === "object" && !Array.isArray(obj) && obj !== null;
};

export const normalizeName = (key: String) => {
    const regex = new RegExp('[^A-Za-z0-9_]', 'gi')
    return key.replace(regex, '')
}