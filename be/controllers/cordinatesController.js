const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.cordinatesPost = async (req, res) => {
    const nums = [0, 1, 2, 3, 4, 5, 6]
  const num = nums[Math.floor(Math.random() * nums.length)]
  const cordinates = await prisma.cordinates.findMany({ 
    skip: num,
    take: 3,
    where: {
        
        imageId: req.body.id
    }
   });

   

  res.send({  cordinates: cordinates, num: num });
};

exports.cordinatesCheck = async (req, res) => {
  const id = Number(req.body.id);

  const cords = await prisma.cordinates.findUnique({
    where: {
      id: id
    }
  })

  if(req.body.x >= cords.cordLeftX && req.body.x <= cords.cordRightX && req.body.y >= cords.cordTopY && req.body.y <= cords.cordBotY) {
    await prisma.cordinates.update({
      where: {
        id: id
      },
      data:{
        found: 'true'
      }
    })
  }
  const num = Number(req.body.num)
  const cordinates = await prisma.cordinates.findMany({ 
    skip: num,
    take: 3,
   });

   res.send({  cordinates: cordinates});
}