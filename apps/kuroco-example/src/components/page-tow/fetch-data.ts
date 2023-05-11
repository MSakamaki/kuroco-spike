declare global {
  interface Promise<T> {
    status: 'pending' | 'fulfilled' | 'rejected';
    value: T;
    reason: any;
  }
}

export function use<T>(promise: Promise<T>) {
  if (promise.status === 'fulfilled') {
    return promise.value;
  } else if (promise.status === 'rejected') {
    throw promise.reason;
  } else if (promise.status === 'pending') {
    throw promise;
  } else {
    promise.status = 'pending';
    promise.then(
      (result) => {
        promise.status = 'fulfilled';
        promise.value = result;
      },
      (reason) => {
        promise.status = 'rejected';
        promise.reason = reason;
      }
    );
    throw promise;
  }
}

interface FetchData<T> {
  errors: string[];
  list: T;
  messages: string[];
  pageInfo: object;
}

const cache = new Map();

export function fetchData<T>(path: string): Promise<FetchData<T[]>> {
  const promise = new Promise((resolve, rejected) => {
    fetch(path)
      .then((response) => response.json())
      .then((json) => resolve(json))
      .catch((error) => rejected(error));
  });

  if (!cache.has(path)) {
    cache.set(path, promise);
  }
  return cache.get(path);
}
