const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.imageGet = async (req, res) => {

  //await prisma.leaderBoard.deleteMany({})


const prisma = new PrismaClient();


//await prisma.leaderBoard.deleteMany({})

  const [image, i] = await Promise.all([
    prisma.images.findMany({
      orderBy: [
        {
          id: "asc",
        },
      ],
    }),
  
    prisma.cordinates.updateMany({
      where: {
        found: "true",
      },
      data: {
        found: "false",
      },
    }) 
  ])

  res.send({ message: "Image returned from database", image: image });
};

exports.imagePost = async (req, res) => {
 await prisma.$transaction([
    prisma.images.updateMany({
      where: { selected: "true" },
      data: { selected: "false" },
    }),
    prisma.images.update({
      where: { id: req.body.id },
      data: { selected: "true" },
    }),
  ]);
  const image = await prisma.images.findMany({
    orderBy: [
      {
        id: "asc",
      },
    ],
  });



  res.send({ image: image });
};
