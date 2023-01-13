export function paginate(items, pageNumber, pageSize) {
    const startIndex = (pageNumber - 1) * pageSize;
    // console.log("items", items.splice(startIndex, pageSize));
    // console.log("[...items]", [...items].splice(startIndex, pageSize));
    return [...items].splice(startIndex, pageSize);
}
