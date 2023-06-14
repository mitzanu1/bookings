import { connectToDatabase } from '../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET': {
            return getServices(req, res);
        }
        case 'POST': {
            return addServices(req, res);
        }
        case 'PUT': {
            return updateServices(req, res);
        }
        case 'PATCH': {
            return deleteServices(req, res);
        }
    }
}

async function getServices(req,res){
  try {
      let { db } = await connectToDatabase();
      let services = await db
          .collection('services')
          .find({})
          .sort()
          .toArray()
      return res.json({
          message: JSON.parse(JSON.stringify(services)),
          success: true,
      });
  } catch (error) {
      return res.json({
          message: new Error(error).message,
          success: false,
      });
  }
}

async function addServices(req, res) {
  try {
      let { db } = await connectToDatabase();
      await db.collection('services').insertOne(JSON.parse(req.body));
      return res.json({
          message: 'Service added successfully',
          success: true,
      });
  } catch (error) {
      return res.json({
          message: new Error(error).message,
          success: false,
      });
  }
}


async function updateServices(req, res) {
  const updates = JSON.parse(req.body)
  try {
      let { db } = await connectToDatabase();
      await db.collection('services').updateOne(
          {
            _id: new ObjectId(updates._id),
          },
          { $set: { service: updates.service } }
      );
      return res.json({
          message: 'Service updated successfully',
          success: true,
      });
  } catch (error) {
      return res.json({
          message: new Error(error).message,
          success: false,
      });
  }
}

async function deleteServices(req, res) {
    const _id = JSON.parse(req.body)
  try {
      let { db } = await connectToDatabase();
      await db.collection('services').deleteOne({
          _id: new ObjectId(_id),
      });
      return res.json({
          message: 'Service deleted successfully',
          success: true,
      });
  } catch (error) {
      return res.json({
          message: new Error(error).message,
          success: false,
      });
  }
}