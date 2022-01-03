
const getAnalysis = require('../src/server/getAnalysis_serv.js');

test('getAnalysis with positive input', async () => {
  const result = await getAnalysis("I love my dog");
  expect(result.status.code).toBe("0");
  expect(result.score_tag).toBe("P+");
});




