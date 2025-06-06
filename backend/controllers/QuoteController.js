import dbClient from '../utils/db';
import { ObjectId } from 'mongodb';

class QuoteController {
  // Create a Quote
  static async createQuote(req, res) {
    const user = req.user;
    if (!user) return res.status(401).json({ error: 'Unauthorized User' });

    const { quote, icon, color } = req.body;
    if (!quote) return res.status(401).json({ error: 'Missing Quote' });
    if (!icon) return res.status(401).json({ error: 'Missing Icon' });
    if (!color) return res.status(401).json({ error: 'Missing Color' });

    try {
      const result = await dbClient.db.collection('quotes').insertOne({
        userId: user._id,
        quote,
        icon,
        color,
      });

      return res
        .status(201)
        .json({ id: result.insertedId, message: 'Quote Created Successfully' });
    } catch (error) {
      console.error('Error Creating quote:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Get all Quotes
  static async getQuotes(req, res) {
    const user = req.user;
    if (!user) return res.status(401).json({ error: 'Unauthorized User' });

    try {
      const quote = await dbClient.db
        .collection('quotes')
        .find({ userId: user._id })
        .toArray();
      if (!quote) {
        res.status(401).json({ error: 'Quotes not found' });
      }

      res.status(200).json({ quote });
    } catch (error) {
      console.error('Error getting all quotes:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Delete Quote by Id
  static async deleteQuoteById(req, res) {
    const user = req.user;
    if (!user) return res.status(401).json({ error: 'Unauthorized User' });

    const quoteId = req.params.id;
    if (!ObjectId.isValid(quoteId)) {
      return res.status(404).json({ error: 'Not found' });
    }

    try {
      const result = await dbClient.db
        .collection('quotes')
        .deleteOne({ _id: new ObjectId(quoteId), userId: user._id });
      if (result.deletedCount === 0) {
        return res.status(404)
          .json({ error: 'Quote not found or not authorized to delete' });
      }

      res.status(200)
        .json({ message: `Quote ${quoteId} deleted successfully` });
    } catch (error) {
      console.error('Error deleting quote:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default QuoteController;
