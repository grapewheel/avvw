/*
 * This api js IS NOT the apicloud api.js, DO NOT mess up!!!
 * Promisify the apicloud API ajax function, nice to use
 */

function ajax({ method = "get", url, headers, data, report = false }) {
  return new Promise((resolve, reject) => {
    api.ajax({ url, method, headers, data, report }, (ret, err) => {
      if (err) {
        reject(err);
      }

      resolve(ret);
    });
  });
}

export const TAOBAO = {
  async get(url) {
    return await ajax({ url });
  }
};
