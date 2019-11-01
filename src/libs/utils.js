export const storage = {
  set(key, value) {
    api.setPrefs({ key, value });
  },

  get(key) {
    return api.getPrefs({ sync: true, key });
  },

  del(key) {
    api.removePrefs({ key });
  }
};

export const memory = {
  set(key, value) {
    api.setGlobalData({ key, value });
  },

  get(key) {
    return api.getGlobalData({ key });
  }
};
