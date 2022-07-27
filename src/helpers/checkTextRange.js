export function checkTextRange(value, min, max) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    const length = value.length;
    if (length > max) {
        return false;
    }
    if (length < min) {
        return false;
    }
    return true;
}