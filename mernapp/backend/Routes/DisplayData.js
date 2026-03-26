const express = require('express')
const router = express.Router()

const fallbackCategory = [{
  id: 0,
  CategoryName: 'Default',
  description: 'Sample category',
}] 

const fallbackItems = [{
  id: 0,
  name: 'Sample Item',
  CategoryName: 'Default',
  img: '',
  options: [{ size: 'Normal', price: 100 }],
  description: 'Sample fallback food item',
}]

router.post('/foodData',(req,res)=>{
    try {
        const items = Array.isArray(global.food_items) ? global.food_items : []
        const cats = Array.isArray(global.foodCategory) ? global.foodCategory : []
        const responseItems = items.length > 0 ? items : fallbackItems
        const responseCats = cats.length > 0 ? cats : fallbackCategory
        res.send([responseItems, responseCats])
    } catch (error) {
        console.error('foodData fetch error:', error)
        res.status(500).json({ error: 'Unable to fetch food data' })
    }
})
module.exports=router;