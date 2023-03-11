export function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const parts = cookies[i].split("=");
    if (decodeURIComponent(parts[0]) === name) {
      return decodeURIComponent(parts[1]);
    }
  }
  return null;
}

export function deleteCookie(cookieKey) {
  return document.cookie = cookieKey + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}



export function setCookie(name, value, expires) {
  document.cookie = `${name}=${value}`;
}