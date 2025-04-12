const ensureAuthenticated = require("../middlewares/Auth");

const router = require("express").Router();


router.get('/', ensureAuthenticated,(req, res) => {

console.log(req.user);
    
  
        res.status(200).json([
            {
                name: 'Product 1',
                price: 100000,
            },
            {
                name: 'Product 2',
                price: 200000,
            },
            {
                name: 'Product 3',
                price: 300000,
            }
        ])
})


module.exports = router;