
const getAnalysis = require('../src/server/getAnalysis_serv.js');

jest.setTimeout(15000);


test('"Testing getAnalysis function"', () => {
  expect(getAnalysis).toBeDefined();
});

// test('getAnalysis with positive input', async () => {
//   const result = await getAnalysis("https://shauvia.github.io/landing-page");
//   expect(result.status.code).toBe("0");
//   expect(result.score_tag).toBe("P");
// });




