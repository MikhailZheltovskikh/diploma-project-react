const express = require('express')

const router = express.Router({ mergeParams: true })

router.use('/', require('./auth.routes'))
router.use('/cart', require('./cart.routes'))
router.use('/groups', require('./group.routes'))
router.use('/products', require('./product.routes'))
router.use('/users', require('./user.routes'))
router.use('/catalog', require('./catalog.routes'))

module.exports = router