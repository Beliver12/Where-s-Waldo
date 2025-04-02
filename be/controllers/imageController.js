const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.imageGet = async (req, res) => {
  const image = await prisma.images.findMany({});

  res.send({ message: "Hello", image: image });
};
