const KEY = "nft-marketplace.token";

export const sessionStorageToken = {
  get(): string | null {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem(KEY);
  },
  set(token: string) {
    window.localStorage.setItem(KEY, token);
  },
  clear() {
    window.localStorage.removeItem(KEY);
  },
};
