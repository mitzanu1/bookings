import { connectToDatabase } from '../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET': {
            return getSettings(req, res);
        }
        case 'POST': {
            return addSettings(req, res);
        }
        case 'PUT': {
            return updateSettings(req, res);
        }
        case 'DELETE': {
            return deleteSettings(req, res);
        }
    }
}

async function getSettings(req,res){
  try {
      let { db } = await connectToDatabase();
      let settings = await db
          .collection('settings')
          .findOne({})
      return res.json({
          message: JSON.parse(JSON.stringify(settings)),
          success: true,
      });
  } catch (error) {
      return res.json({
          message: new Error(error).message,
          success: false,
      });
  }
}

async function addSettings(req, res) {
  try {
      let { db } = await connectToDatabase();
      await db.collection('settings').insertOne(JSON.parse(req.body));
      return res.json({
          message: 'Settings added successfully',
          success: true,
      });
  } catch (error) {
      return res.json({
          message: new Error(error).message,
          success: false,
      });
  }
}


async function updateSettings(req, res) {
  const updates = JSON.parse(req.body)
  try {
      let { db } = await connectToDatabase();
      await db.collection('settings').updateOne({ },
          { $set: { 
            height:updates.height,
            slotDuration:updates.slotDuration,
            businessHoursStartTime:updates.businessHoursStartTime, 
            businessHoursEndTime:updates.businessHoursEndTime,
            dayHeaderFormatWeekday:updates.dayHeaderFormatWeekday,
            slotMinTime:updates.slotMinTime,
            slotMaxTime:updates.slotMaxTime,
            scrollTime:updates.scrollTime,
            locale:updates.locale
          }}
      );
      return res.json({
          message: 'Settings updated successfully',
          success: true,
      });
  } catch (error) {
      return res.json({
          message: new Error(error).message,
          success: false,
      });
  }
}

async function deleteSettings(req, res) {

  try {
      let { db } = await connectToDatabase();
      await db.collection('settings').deleteOne({
          _id: new ObjectId(_id),
      });
      return res.json({
          message: 'Settings deleted successfully',
          success: true,
      });
  } catch (error) {
      return res.json({
          message: new Error(error).message,
          success: false,
      });
  }
}