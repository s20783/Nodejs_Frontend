export function validationNumberRange(value, min, max) {
    if (!value) {
        return false;
    }
    if (isNaN(value)) {
        return false;
    }
    value = parseFloat(value);

    if (value > max) {
        return false;
    }
    if (value < min) {
        return false;
    }
    return true;
}

