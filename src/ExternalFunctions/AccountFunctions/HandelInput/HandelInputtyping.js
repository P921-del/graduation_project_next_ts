export function onlyAlphabetical(event) {
    if (
        isNaN(
            event.key.replace(/[^a-zA-Z]/ig, "").charCodeAt(0)
        ) &&
        event.key.codePointAt(0) !== 32
        && event.key.codePointAt(0) > 31
    ) {
        event.preventDefault();
    }
}