export function getCurrentTime () {
  const date = new Date();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();
  return `${
    hours < 10 ? `0${hours}` : hours
  }:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${
    seconds < 10 ? `0${seconds}` : seconds
  }`;
}