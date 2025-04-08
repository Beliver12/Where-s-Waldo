const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.imageGet = async (req, res) => {
  
 

  const image = await prisma.images.findMany({ orderBy: [
    {
      id: 'asc',
    }
  ],});

  res.send({ message: "Hello", image: image });
};

exports.imagePost = async (req, res) => {
   await prisma.images.updateMany({
    where:{
      selected: 'true'
    },
    data: {
      selected: 'false'
    }
   })

   await prisma.images.update({
    where: {
      id: req.body.id
    },
    data: {
      selected: 'true'
    }
   })
   const image = await prisma.images.findMany({
    orderBy: [
      {
        id: 'asc',
      }
    ],
   });
   

   res.send({ image: image });
}