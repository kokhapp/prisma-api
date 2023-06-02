import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

var express = require('express')
var cors = require('cors')
var app = express()

app.use(cors())

app.get('/users', async function (req: Request, res: Response, next: NextFunction){
  const allUsers = await prisma.user.findMany()
  //console.log(allUsers)

  res.json({users: allUsers})
})

app.get('/users/:id', async function (req: Request, res: Response, next: NextFunction) {
  const id = req.params.id
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      pets: true,
    },
  })
  res.json({user: user})

})

app.listen(5000, function () {
  console.log('CORS-enabled web server listening on port 5000')
})