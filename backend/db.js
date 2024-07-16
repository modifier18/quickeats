const mongoose = require('mongoose');
async function connectDB() {
  try {
    await mongoose.connect('mongodb://localhost:27017/QuickEats', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    //console.log('Database connection successful');
    const fetch_data = mongoose.connection.db.collection('food_items');
    try {
      const data = await fetch_data.find({}).toArray();
      const foodCategory=mongoose.connection.db.collection('food_category');
      try {
        const catData= await foodCategory.find({}).toArray();
        if(catData.length===0) console.log('No Data')
        else{
            global.food_items=data;
            global.foodCategory=catData;
        }
      } catch (error) {
        
      }
      // if (data.length === 0) {
      //   console.log('No data found in the food_items collection');
      // } else {
      //   global.food_items=data;
      // }
    } catch (err) {
      console.error('Error fetching data:', err);
    }

  } catch (err) {
    console.error('Database connection error:', err);
  }
}

connectDB();

module.exports = connectDB;
