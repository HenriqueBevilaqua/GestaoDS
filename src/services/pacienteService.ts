
 function getPacientesData(): any {
  const openRequest = indexedDB.open("clinica", 1);
  const retorno: any = [];
  openRequest.onsuccess = async function (event: any) {
    const db = event.target.result;
    const transaction = db.transaction("pacientes", "readonly");
    const userObjectStore = transaction.objectStore("pacientes");
    const request = userObjectStore.getAll();

    request.onsuccess = await function (event: any) {
      request.result.forEach((item: any) => {
        retorno.push(item);
      });
    };
  }
  return retorno;
};
export default getPacientesData;