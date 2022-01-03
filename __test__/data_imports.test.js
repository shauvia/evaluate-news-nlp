const checkResponseOk = require('../src/client/js/data_import.js');

test('the function fails with an error', () => {
  const res= { ok: false, status: 201, statusText: 'Error' };
  expect(() => checkResponseOk(res).toThrow(Error));
});
