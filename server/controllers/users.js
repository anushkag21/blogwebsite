import User from "../models/user.js";

// READ

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(501).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(501).json({ message: err.message });
  }
};

/*UPDATE*/

export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);
    let friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friend.id);
      friend.friends = friend.friends.filter((friendId) => friendId !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    friends = await Promise.all(user.friends.map((id) => User.findById(id)));
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    console.log(formattedFriends);

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(501).json({ message: err.message });
  }
};
