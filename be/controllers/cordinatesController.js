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
        date.getSeconds() + 1
      ),
      imageId: id,
      finishedGame: "false",
    },
  }),

])



  await prisma.leaderBoardCordinates.createMany({
  data:[
    {cordBotY: cordinates[0].cordBotY, cordLeftX: cordinates[0].cordLeftX,
      cordRightX: cordinates[0].cordRightX, cordTopY: cordinates[0].cordTopY,
      imageId: cordinates[0].imageId, url: cordinates[0].url,
      found: cordinates[0].found, leaderBoardId: user.id,
    },

    {cordBotY: cordinates[1].cordBotY, cordLeftX: cordinates[1].cordLeftX,
      cordRightX: cordinates[1].cordRightX, cordTopY: cordinates[1].cordTopY,
      imageId: cordinates[1].imageId, url: cordinates[1].url,
      found: cordinates[1].found, leaderBoardId: user.id,
    },

    {cordBotY: cordinates[2].cordBotY, cordLeftX: cordinates[2].cordLeftX,
      cordRightX: cordinates[2].cordRightX, cordTopY: cordinates[2].cordTopY,
      imageId: cordinates[2].imageId, url: cordinates[2].url,
      found: cordinates[2].found, leaderBoardId: user.id,
    }
  ]
})

const userCordinates = await prisma.leaderBoardCordinates.findMany({
  where: {
    leaderBoardId: user.id
  },
  orderBy: [
    {
      id: "asc",
    },
  ],
})

 /*await prisma.leaderBoard.update({
  where: {
    id: user.id,
  },
  data: {
    time: (
      date.getHours() * 3600 +
      date.getMinutes() * 60 +
      date.getSeconds() 
    ),
  },
}),*/

  res.send({ cordinates: userCordinates, num: num, messsage: "success", userId: user.id, time: user.time, leaderBoardId: userCordinates[0].leaderBoardId });
};

///

exports.cordinatesCheck = async (req, res) => {

// finds unique cord user tried to guess 
  const cords = await prisma.leaderBoardCordinates.findUnique({
    where: {
      id: Number(req.body.id),
      leaderBoardId: Number(req.body.leaderBoardId)
    },
  });
  
  let message;

  if (
    req.body.x >= cords.cordLeftX &&
    req.body.x <= cords.cordRightX &&
    req.body.y >= cords.cordTopY &&
    req.body.y <= cords.cordBotY
  ) {
    // if user guessed update that cord to found: true
 await prisma.leaderBoardCordinates.update({
      where: {
        id: Number(req.body.id),
        leaderBoardId: Number(req.body.leaderBoardId)
      },
      data: {
        found: "true",
      },
    });
   
    message = "guess";

  } 



  const [cordinates, guesses] = await Promise.all([
    prisma.leaderBoardCordinates.findMany({
      where: {
        imageId: cords.imageId,  
        leaderBoardId: Number(req.body.leaderBoardId)
      },
      orderBy: [
        {
          id: "asc",
        },
      ],
    }),
    prisma.leaderBoardCordinates.findMany({
      where: {
        imageId: cords.imageId,
        found: 'true',
        leaderBoardId: Number(req.body.leaderBoardId)
      },
     })

  ])
//
  if( req.body.x < cords.cordLeftX ||
    req.body.x > cords.cordRightX ||
    req.body.y < cords.cordTopY ||
    req.body.y > cords.cordBotY) {

   return res.send({ cordinates: cordinates, message: message });
   } 

   if(guesses.length !== 3) {
    return res.send({ cordinates: cordinates, message: message });
   }

  if (guesses.length === 3) {
   
    message = "Game Over";


    const date = new Date();



    await prisma.leaderBoard.update({
      where: {
        userName: req.body.username,
        imageId: cords.imageId,
        id: Number(req.body.leaderBoardId),
      },
      data: {
        time: ((
          date.getHours() * 3600 +
          date.getMinutes() * 60 +
          date.getSeconds()
        ) - Number(req.body.time)),
        finishedGame: "true",
      },
    });
  }

  res.send({ cordinates: cordinates, message: message });
};
