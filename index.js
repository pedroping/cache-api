const cacheName = 'TesteCache';
const blobKey = new Request('/my-blob');

async function setData() {
  const jData = {
    name: 'GFG123123123213',
    age: 30
  };

  const blob = new Blob([JSON.stringify(jData)], {
    type: 'text/plain',
  });

  const cacheStorage = await caches.open(cacheName);
  const request = createResponseFromBlob(blob);
  await cacheStorage.put(blobKey, request);

  console.log('====================================');
  console.log(request, blobKey);
  console.log('====================================');
}

async function getData() {
  const cacheStorage = await caches.open(cacheName);
  const cachedResponse = await cacheStorage.match(blobKey);
  const blob = await cachedResponse.blob();
  const text = await blob.text();

  console.log('Teste: ', text);
}

function createResponseFromBlob(blob) {
  return new Response(blob, {
    headers: { 'Content-Type': blob.type }
  });
}
