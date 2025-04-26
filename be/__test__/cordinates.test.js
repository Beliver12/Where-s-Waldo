const app = require("./cordinatesTest");
const request = require("supertest");

const { PrismaClient } = require("@prisma/client");
const databaseUrl =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_DATABASE_URL
    : process.env.DATABASE_URL;

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
});

const removeUsername = async () => {
  await prisma.leaderBoard.deleteMany({});
};

describe("/", () => {
  beforeAll(() => {
    return removeUsername();
  });
  it("returns cordinates", async () => {
    const res = await request(app).post("/").send({ username: "Nikola" });

    expect(res.body).toBeDefined();
  });

  it("should specify json in the content type header", async () => {
    const res = await request(app).post("/").send({});
    expect(res.headers["content-type"]).toEqual(
      expect.stringContaining("json"),
    );
  });

  it("returns message Username allready in use", async () => {
    const res = await request(app).post("/").send({ username: "Nikola" });
    expect(res.body.error).toEqual("Username allready in use.");
  });

  it("returns message Username required", async () => {
    const res = await request(app).post("/").send({});
    expect(res.body.error).toEqual("Username allready in use.");
  });
});

describe("/check", () => {
  it("returns cordinates after checking if user guessed cordinates", async () => {
    const res = await request(app).post("/check").send({ id: "2", num: 3 });
    expect(res.body).toBeDefined();
  });

  it("should specify json in the content type header", async () => {
    const res = await request(app).post("/").send({});
    expect(res.headers["content-type"]).toEqual(
      expect.stringContaining("json"),
    );
  });
});
