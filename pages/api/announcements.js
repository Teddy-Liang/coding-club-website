const { connectToDatabase } = require("../../middleware/mongodb");

export default async function handler(req, res) {
  const db = await connectToDatabase();
  switch (req.method) {
    case "GET": {
      return getAnnouncements(req, res, db);
    }
    case "POST": {
      return addAnnouncements(req, res, db);
    }
  }
}

async function getAnnouncements(req, res, db) {
  try {
    const myDoc = await db
      .collection("announcements")
      .find({ announcement: true })
      .toArray();
    return res.json(myDoc);
  } catch (err) {
    return res.json({
      message: new Error(err).message,
      success: false,
    });
  }
}

async function addAnnouncements(req, res, db) {
  try {
    await db.collection("announcements").insertOne(req.body);
    return res.json({
      success: true,
    });
  } catch (err) {
    return res.json({
      message: new Error(err).message,
      success: false,
    });
  }
}
