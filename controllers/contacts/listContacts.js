const { Contact } = require('../../models');

const listContacts = async (req, res) => {
  const { page = 1, limit = 20, favorite = 'true' } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner: req.user._id }, '', { skip, limit: +limit }).populate('owner', 'email');
  // Фильтр по favorite
  // const resultFavorite = await Contact.find({favorite}, '', {skip, limit: +limit}).populate('owner', 'email');
  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
      // resultFavorite
    }
  });  
};

module.exports = listContacts;
  