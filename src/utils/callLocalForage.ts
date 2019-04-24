import localforage from 'localforage';
export async function callLocalForage(response: any) {
  try {
    await localforage.setItem('token', JSON.stringify(response));
    return;
  } catch (e) {
    return e;
  }
}
