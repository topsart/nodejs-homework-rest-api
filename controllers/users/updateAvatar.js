const fs = require('fs/promises');
const path = require('path');

const { User } = require('../../models');

const avatarsDir = path.join(__dirname, '../../', 'public/avatars');

const updateAvatar = async (req, res, next) => {
  const { _id } = req.user;
  idUserToString = _id.toString();
  // const dirPath = path.join(avatarsDir, idUserToString);
  // const uploadDir = await fs.mkdir(dirPath);

  const { path: tempPath, originalname } = req.file;
  const uploadPath = path.join(avatarsDir, idUserToString, originalname);
  try {
    await fs.rename(tempPath, uploadPath);
    const avatarUrl = `/public/avatars/${_id}/${originalname}`;
    await User.findByIdAndUpdate(_id, { avatarUrl });
    res.json({
      status: 'success',
      code: 200,
      data: {
        result: avatarUrl
      }
    })
  } catch (error) {
    await fs.unlink(tempPath);
    throw (error);
  }
};

module.exports = updateAvatar;