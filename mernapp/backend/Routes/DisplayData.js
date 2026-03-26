const express = require('express')
const router = express.Router()
router.post('/foodData',(req,res)=>{
    try {
        res.send([global.food_items || [], global.foodCategory || []])
    } catch (error) {
        console.error('foodData fetch error:', error)
        res.status(500).json({ error: 'Unable to fetch food data' })
    }
})
module.exports=router;