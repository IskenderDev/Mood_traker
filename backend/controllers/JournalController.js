import dbClient from '../utils/db';
import { ObjectId } from 'mongodb';

class JournalController {
  // Create a New Journal
  static async createJournal(req, res) {
    const user = req.user;
    if (!user) return res.status(401).json({ error: 'Unauthorized User' });

    const { mood, title, content, date } = req.body;
    if (!mood) return res.status(401).json({ error: 'Missing Mood' });
    if (!title) return res.status(401).json({ error: 'Missing Title' });
    if (!content) return res.status(401).json({ error: 'Missing Content' });
    if (!date) return res.status(401).json({ error: 'Missing Date' });

    if (!isValidDate(date)) {
      return res.status(400).json({ error: 'Invalid date format' });
    }

    try {
      const result = await dbClient.db.collection('journals').insertOne({
        userId: user._id,
        mood,
        title,
        content,
        date,
      });
      res.status(201)
        .json({ message: 'Journal Added Successfully', id: result.insertedId });
    } catch (error) {
      console.error('Error Creating journal entry:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Get all Journals
  static async getAllJournal(req, res) {
    const user = req.user;
    if (!user) return res.status(401).json({ error: 'Unauthorized User' });

    try {
      const journals = await dbClient.db
        .collection('journals')
        .find({ userId: user._id })
        .toArray();
      if (!journals) {
        res.status(200).json({});
      }
      res.status(200).json({ journals });
    } catch (error) {
      console.error('Error getting all journal:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Get Journal By Id
  static async getJournalById(req, res) {
    const user = req.user;
    if (!user) return res.status(401).json({ error: 'Unauthorized User' });

    const journalId = req.params.id;
    if (!ObjectId.isValid(journalId)) {
      return res.status(400).json({ error: 'Invalid journal ID' });
    }

    try {
      const journal = await dbClient.db
        .collection('journals')
        .findOne({ _id: new ObjectId(journalId), userId: user._id });
      if (!journal) {
        res.status(200).json({});
      }
      res.status(200).json({ journal });
    } catch (error) {
      console.error('Error getting journal by id:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Update a Journal By Id
  static async updateJournalById(req, res) {
    const user = req.user;
    if (!user) return res.status(401).json({ error: 'Unauthorized User' });

    const { mood, title, content, date } = req.body;

    if (date && !isValidDate(date)) {
      return res.status(400).json({ error: 'Invalid date format' });
    }

    const journalId = req.params.id;
    if (!ObjectId.isValid(journalId)) {
      return res.status(400).json({ error: 'Invalid journal ID' });
    }

    const updateData = { mood, title, content };

    if (date) {
      // updateData.date = new Date(date);
      updateData.date = date;
    }

    try {
      const result = await dbClient.db
        .collection('journals')
        .updateOne(
          { _id: new ObjectId(journalId), userId: new ObjectId(user._id) },
          { $set: updateData }
        );
      if (result.matchedCount === 0) {
        return res.status(404).json({ error: 'Journal entry not found' });
      }

      res.status(200)
        .json({ message: `Journal entry ${journalId} updated successfully` });
    } catch (error) {
      console.error('Error updating journal entry:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Delete a journal By Id
  static async deleteJournalById(req, res) {
    const user = req.user;
    if (!user) return res.status(401).json({ error: 'Unauthorized User' });

    const journalId = req.params.id;
    if (!ObjectId.isValid(journalId)) {
      return res.status(404).json({ error: 'Not found' });
    }

    try {
      const result = await dbClient.db
        .collection('journals')
        .deleteOne({ _id: new ObjectId(journalId), userId: user._id });
      if (result.deletedCount === 0) {
        return res
          .status(404)
          .json({ error: 'Quote not found or not authorized to delete' });
      }

      res
        .status(200)
        .json({ message: `Quote ${journalId} deleted successfully` });
    } catch (error) {
      console.error('Error deleting journal entry:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Route to fetch mood data
  static async getMoodData(req, res) {
    const user = req.user;
    if (!user) return res.status(401).json({ error: 'Unauthorized User' });

    const pipeline = [
      { $match: { userId: user._id } },
      {
        $project: {
          _id: 0,
          icon: '$mood.icon',
          name: '$mood.name',
          value: '$mood.value',
          date: '$date',
        },
      },
    ];

    try {
      const moodData = await dbClient.db
        .collection('journals')
        .aggregate(pipeline)
        .toArray();

      if (!moodData) return res.status(401).json({ error: 'Moods not found' });
      res.status(200).json(moodData);
    } catch (error) {
      console.error('Error getting moods:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

// Validate the Date sent in the request
function isValidDate(dateString) {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

export default JournalController;
