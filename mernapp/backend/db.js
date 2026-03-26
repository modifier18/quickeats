const mongoose = require('mongoose');

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/QuickEats';

async function connectDB() {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected successfully');

    global.food_items = [];
    global.foodCategory = [];

    const fetch_data = mongoose.connection.db.collection('food_items');
    try {
      const data = await fetch_data.find({}).toArray();
      global.food_items = data || [];
    } catch (err) {
      console.error('Error fetching food_items:', err);
    }

    try {
      const foodCategory = mongoose.connection.db.collection('food_category');
      const catData = await foodCategory.find({}).toArray();
      global.foodCategory = catData || [];
      if (!catData || catData.length === 0) {
        console.warn('No food_category data found');
      }
    } catch (err) {
      console.error('Error fetching food_category:', err);
    }
  } catch (err) {
    console.error('Database connection error:', err);
  }
}

module.exports = connectDB;

connectDB();
