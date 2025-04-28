const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.leaderBoardPost = async (req, res) => {
  const id = Number(req.body.id);

 

  const leaderBoard = await prisma.leaderBoard.findMany({
    take: 10,
    where: {
      imageId: id,
      finishedGame: "true",
    },
    orderBy: [
      {
        time: "asc",
      },
    ],
  });

 

  res.send({ leaderBoard: leaderBoard });
};
