const app = require('./imageTest');
const request = require('supertest');

const { PrismaClient } = require('@prisma/client');
const databaseUrl =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_DATABASE_URL
    : process.env.DATABASE_URL;

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
});


describe('/', () => {
    it('returns image', async () => {
      const res = await request(app).get('/').send({})
      expect(res.body.message).toEqual('Image returned from database');
    })

    it('should specify json in the content type header', async () => {
        const res = await request(app).get('/').send({});
        expect(res.headers['content-type']).toEqual(
          expect.stringContaining('json')
        );
      });
})