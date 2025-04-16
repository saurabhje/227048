const WINDOW_SIZE = 7;
let numberWindow = [];

export function getWindowState() {
  return [...numberWindow];
}

export function updateWindow(newNumbers) {
  const uniqueNew = newNumbers.filter(n => !numberWindow.includes(n));
  numberWindow.push(...uniqueNew);

  numberWindow = numberWindow.slice(-WINDOW_SIZE);

  return [...numberWindow];
}
