const fs = require('fs/promises');
const path = require('path');
const Jimp = require('jimp');

const { User } = require('../../models');

const avatarsDir = path.join(__dirname, '../../', 'public/avatars');

const updateAvatar = async (req, res, next) => {
  const { _id } = req.user;
  idUserToString = _id.toString();
  const { path: tempPath, originalname } = req.file;
  uniqueAvatarName = idUserToString + originalname;

  await Jimp.read(tempPath)
  .then(avatar => {
    return avatar
      .resize(250, 250)
      .quality(60)
      .write(`${avatarsDir}/${uniqueAvatarName}`);
  })
  .catch(err => {
    console.error(err);
  });

  try {
    const avatarUrl = `/public/avatars/${uniqueAvatarName}`;
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