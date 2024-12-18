export const elipsesString = (str, limit) => {
    if (!str)
        return "";
    if (str.length > limit)
        return `${str.substring(0, limit)}...`;
    return str;
}