import Chat from '../models/Chat.js';
import User from '../models/User.js';

// @desc    Get or create one-on-one chat
// @route   POST /api/chats
// @access  Private
const accessChat = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'UserId param not sent' });
    }

    // Check if chat already exists
    let isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate('users', '-password')
      .populate('latestMessage');

    isChat = await User.populate(isChat, {
      path: 'latestMessage.sender',
      select: 'name avatar email',
    });

    if (isChat.length > 0) {
      res.json(isChat[0]);
    } else {
      // Create new chat
      const chatData = {
        chatName: 'sender',
        isGroupChat: false,
        users: [req.user._id, userId],
      };

      const createdChat = await Chat.create(chatData);
      const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        'users',
        '-password'
      );

      res.status(200).json(fullChat);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch all chats for a user
// @route   GET /api/chats
// @access  Private
const fetchChats = async (req, res) => {
  try {
    const chats = await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate('users', '-password')
      .populate('groupAdmin', '-password')
      .populate('latestMessage')
      .sort({ updatedAt: -1 });

    const results = await User.populate(chats, {
      path: 'latestMessage.sender',
      select: 'name avatar email',
    });

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create group chat
// @route   POST /api/chats/group
// @access  Private
const createGroupChat = async (req, res) => {
  try {
    const { users, name } = req.body;

    if (!users || !name) {
      return res.status(400).json({ message: 'Please fill all the fields' });
    }

    const usersArray = JSON.parse(users);

    if (usersArray.length < 2) {
      return res
        .status(400)
        .json({ message: 'More than 2 users are required to form a group chat' });
    }

    usersArray.push(req.user._id);

    const groupChat = await Chat.create({
      chatName: name,
      users: usersArray,
      isGroupChat: true,
      groupAdmin: req.user._id,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate('users', '-password')
      .populate('groupAdmin', '-password');

    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Search users
// @route   GET /api/chats/users?search=
// @access  Private
const searchUsers = async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: 'i' } },
            { email: { $regex: req.query.search, $options: 'i' } },
          ],
        }
      : {};

    const users = await User.find(keyword)
      .find({ _id: { $ne: req.user._id } })
      .select('-password');

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { accessChat, fetchChats, createGroupChat, searchUsers };
