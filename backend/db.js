const mongoose = require('mongoose');

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/QuickEats';

async function connectDB() {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected successfully');
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
    } catch (err) {
      console.error('Error fetching data:', err);
    }

  } catch (err) {
    console.error('Database connection error:', err);
  }
}

module.exports = connectDB;

connectDB();

module.exports = connectDB;
