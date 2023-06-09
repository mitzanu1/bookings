import { connectToDatabase } from '../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET': {
            return getBookings(req, res);
        }
        case 'POST': {
            return addBookings(req, res);
        }
        case 'PUT': {
            return updateBookings(req, res);
        }
        case 'DELETE': {
            return deleteBookings(req, res);
        }
    }
}

async function getBookings(req,res){
  try {
      let { db } = await connectToDatabase()
      let bookings = await db
          .collection('bookings')
          .find({})
          .sort()
          .toArray();
      return res.json({
          message: JSON.parse(JSON.stringify(bookings)),
          success: true,
      });
  } catch (error) {
      return res.json({
          message: new Error(error).message,
          success: false,
      });
  }
}

async function addBookings(req, res) {
  try {
      let { db } = await connectToDatabase();
      await db.collection('bookings').insertOne(JSON.parse(req.body));
      return res.json({
          message: 'Booking added successfully',
          success: true,
      });
  } catch (error) {
      return res.json({
          message: new Error(error).message,
          success: false,
      });
  }
}


async function updateBookings(req, res) {
  try {
      let { db } = await connectToDatabase();
      await db.collection('bookings').updateOne(
          {
              _id: new ObjectId(req.body),
          },
          { $set: { published: true } }
      );
      return res.json({
          message: 'Booking updated successfully',
          success: true,
      });
  } catch (error) {
      return res.json({
          message: new Error(error).message,
          success: false,
      });
  }
}

async function deleteBookings(req, res) {
  try {
      let { db } = await connectToDatabase();
      await db.collection('bookings').deleteOne({
          _id: new ObjectId(req.body),
      });
      return res.json({
          message: 'Booking deleted successfully',
          success: true,
      });
  } catch (error) {
      return res.json({
          message: new Error(error).message,
          success: false,
      });
  }
}