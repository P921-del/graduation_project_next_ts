export function onlyAlphabetical(event: any) {
  if (
    isNaN(event.key.replace(/[^a-zA-Z]/gi, "").charCodeAt(0)) &&
    event.key.codePointAt(0) !== 32 &&
    event.key.codePointAt(0) > 31
  ) {
    event.preventDefault();
  }
}

export function onlyNumbers(event: any) {
  if (
    !(
      (event.key.codePointAt(0) >= 48 && event.key.codePointAt(0) <= 57) ||
      event.key === "Backspace" ||
      (event.ctrlKey && event.key === "a") ||
      (event.ctrlKey && event.key === "c")
    )
  ) {
    event.preventDefault();
  }
}
