const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.cordinatesPost = async (req, res) => {
  const nums = [0, 1, 2, 3, 4, 5, 6];
  const num = nums[Math.floor(Math.random() * nums.length)];

  const image = await prisma.images.findFirst({
      where: {
        selected: "true",
      },
    })  
  
  const id = image.id;

  const date = new Date();

const [cordinates, user] = await Promise.all([
  prisma.cordinates.findMany({
    skip: num,
    take: 3,
    where: {
      imageId: id,
      found: "false",
    },
  }),

  prisma.leaderBoard.create({
    data: {
      userName: req.body.username,
      time: (
        date.getHours() * 3600 +
        date.getMinutes() * 60 +
        date.getSeconds()
      ).toString(),
      imageId: id,
      finishedGame: "false",
    },
  })

])




  res.send({ cordinates: cordinates, num: num, messsage: "success", userId: user.id, time: user.time });
};

///

exports.cordinatesCheck = async (req, res) => {
  //const id = Number(req.body.id);

  const cords = await prisma.cordinates.findUnique({
    where: {
      id: Number(req.body.id),
    },
  });
  
  let message;

  if (
    req.body.x >= cords.cordLeftX &&
    req.body.x <= cords.cordRightX &&
    req.body.y >= cords.cordTopY &&
    req.body.y <= cords.cordBotY
  ) {
   await prisma.cordinates.update({
      where: {
        id: Number(req.body.id),
      },
      data: {
        found: "true",
      },
    });
   
    message = "guess";
  } 

  //const num = Number(req.body.num);

  const [cordinates, guesses] = await Promise.all([
    prisma.cordinates.findMany({
      skip:  Number(req.body.num),
      take: 3,
      where: {
        imageId: cords.imageId,  
      },
    }),
    prisma.cordinates.findMany({
      where: {
        imageId: cords.imageId,
        found: 'true'
      },
     })

  ])

  if( req.body.x < cords.cordLeftX ||
    req.body.x > cords.cordRightX ||
    req.body.y < cords.cordTopY ||
    req.body.y > cords.cordBotY) {

   return res.send({ cordinates: cordinates, message: message });
   }



  if (guesses.length === 3) {
   
    message = "Game Over";


    const date = new Date();

   
    await prisma.leaderBoard.updateMany({
      where: {
        userName: req.body.username,
        imageId: cords.imageId,
        id: Number(req.body.userId),
      },
      data: {
        time: ((
          date.getHours() * 3600 +
          date.getMinutes() * 60 +
          date.getSeconds()
        ).toString() - Number(req.body.time)).toString(),
        finishedGame: "true",
      },
    });
  }

  res.send({ cordinates: cordinates, message: message });
};
