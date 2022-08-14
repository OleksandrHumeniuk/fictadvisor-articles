function getFileLink(path, type) {
    const lastSlash = path.lastIndexOf('/');
    const linkStart = lastSlash === -1 ? 0 : lastSlash
    const linkEnd = path.length - type.length;

    return path.substring(linkStart, linkEnd);
}

export default getFileLink;
