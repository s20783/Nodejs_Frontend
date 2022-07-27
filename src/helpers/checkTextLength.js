export function checkTextLength(value, max) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    const length = value.length;
    if (length > max) {
        return false;
    }
    if (length < 1) {
        return false;
    }
    return true;
}