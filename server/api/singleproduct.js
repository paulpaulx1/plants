const router = require('express').Router()
const {Beer} = require('../db')

//we need another get route for all products

router.get('/:id', async function(req, res, next) {
  const id = req.params.id
  try {
    const thisBeer = await Beer.findOne({where: {id: id}})

    res.send(thisBeer)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const beer = await Beer.create(req.body)
    res.json(beer)
  } catch (e) {
    next(e)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const beer = await Beer.findByPk(req.params.id)
    await beer.destroy()
    res.send(beer)
  } catch (ex) {
    next(ex)
  }
})

router.put('/:id', async (req, res, next) => {
  const id = req.params.id
  try {
    const beer = await Beer.findOne({where: {id: id}})
    res.send(await beer.update(req.body))
  } catch (ex) {
    next(ex)
  }
})

module.exports = router
