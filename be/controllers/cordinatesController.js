const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.cordinatesPost = async (req, res) => {
  const nums = [0, 1, 2, 3, 4, 5, 6];
  const num = nums[Math.floor(Math.random() * nums.length)];

  
 
    const image = await prisma.images.findMany({
      where: {
        selected: 'true'
      }
    })
   const id = image[0].id
  
  await prisma.cordinates.updateMany({
      where: {
        found: "true",
      },
      data: {
        found: "false",
      },
    });

  const cordinates = await prisma.cordinates.findMany({
    skip: num,
    take: 3,
    where: {
      imageId: id,
      found: 'false'
    },
  });

  const user = await prisma.leaderBoard.findMany({
    where: {
      userName: req.body.username,
      imageId: id,
    },
  });

  if (user.length !== 0) {
    return res.status(400).send({
      error: 'Username allready in use.',
    });
  } 
   if(req.body.username === '') {
    return res.status(400).send({
      error: 'Username required.',
    });
  }
 
    const date = new Date()
    const time = ((date.getHours() * 3600) + (date.getMinutes() * 60) + date.getSeconds()).toString()

    await prisma.leaderBoard.create({
      data: {
        userName: req.body.username,
        time: time,
        imageId: id,
        finishedGame: 'false'
      }
    })
  

  res.send({ cordinates: cordinates, num: num, messsage: 'success' });
};

exports.cordinatesCheck = async (req, res) => {
  const id = Number(req.body.id);

  const cords = await prisma.cordinates.findUnique({
    where: {
      id: id,
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
        id: id,
      },
      data: {
        found: "true",
      },
    });
    message = "guess";
  }

  const image = await prisma.images.findMany({
    where: {
      selected: 'true'
    }
  })
 const imgId = image[0].id

  const num = Number(req.body.num);
  const cordinates = await prisma.cordinates.findMany({
    skip: num,
    take: 3,
    where:{
      imageId: imgId
    }
  });

  let numOfGuesses = [];
  cordinates.forEach((cord) => {
    if (cord.found === "true") {
      numOfGuesses.push(cord.found);
    }
  });

  if (numOfGuesses.length === 3) {
    await prisma.cordinates.updateMany({
      where: {
        found: "true",
      },
      data: {
        found: "false",
      },
    });
    message = "Game Over"

    const image = await prisma.images.findMany({
      where: {
        selected: 'true'
      }
    })
   const id = image[0].id

    const leaderBoard = await prisma.leaderBoard.findMany({
      where:{
        userName: req.body.username,
        imageId: id
      }
    })
    const startTime = Number(leaderBoard[0].time)
    const date = new Date()
    const time = ((date.getHours() * 3600) + (date.getMinutes() * 60) + date.getSeconds()).toString()

    const currentTime =  (time - startTime).toString();
    currentTime
    await prisma.leaderBoard.updateMany({
      where:{
        userName: req.body.username,
        imageId: id
      },
      data: {
        time: currentTime,
        finishedGame: 'true'
      }
    })
  }

  

  res.send({ cordinates: cordinates, message: message });
};
