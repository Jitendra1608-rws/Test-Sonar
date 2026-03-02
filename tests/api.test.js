/**
 * Partial tests - only GET /api/validate is covered.
 * Other routes and utils remain uncovered for Sonar coverage report.
 */

const request = require('supertest');
const app = require('../app');

describe('API /api/validate GET', () => {
  it('returns valid for good input', async () => {
    const res = await request(app).get('/api/validate?input=hello');
    expect(res.status).toBe(200);
    expect(res.body.valid).toBe(true);
    expect(res.body.value).toBe('hello');
  });

  it('returns invalid for short input', async () => {
    const res = await request(app).get('/api/validate?input=ab');
    expect(res.body.valid).toBe(false);
    expect(res.body.error).toBe('Too short');
  });
});
