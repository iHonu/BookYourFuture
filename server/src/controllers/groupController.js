import GroupModel from "../models/Group.js";

export const add = async (req, res) => {
  try {
    await GroupModel.syncIndexes();

    const newGroup = {
      numberOfGroupName: req.body.numberOfGroupName,
      status: req.body.status,
      students: req.body.students || [],
      user: req.body.userId,
    };

    const group = await GroupModel.create(newGroup);

    res.status(200).json({ success: true, groupData: group });
  } catch (err) {
    //eslint-disable-next-line
    console.error(err);
    if (err.code === 11000) {
      // Duplicate key error
      res.status(400).json({ message: "Duplicate numberOfGroupName" });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export const all = async (req, res) => {
  try {
    const groups = await GroupModel.find()
      .populate({ path: "students", select: "_id lastName firstName email" })
      .exec();
    res.status(200).json({ success: true, groupsData: groups });
  } catch (err) {
    //eslint-disable-next-line
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const groupId = req.params.id;

    if (!groupId) {
      return res.status(404).json({
        message: "Group not found",
      });
    }

    const group = await GroupModel.findById(groupId).populate("user").exec();

    if (!group) {
      return res.status(404).json({
        message: "Group not found",
      });
    }
    res.status(200).json({ success: true, groupData: group });
  } catch (err) {
    //eslint-disable-next-line
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
export const remove = async (req, res) => {
  try {
    const groupId = req.params.id;

    GroupModel.findByIdAndDelete(
      {
        _id: groupId,
      },
      (err, group) => {
        if (err) {
          return res.status(500).json({
            message: "can`t delete group",
          });
        }
        if (!group) {
          return res.status(404).json({
            message: "group not found",
          });
        }
      }
    );

    if (!groupId) {
      return res.status(404).json({
        message: "group not found",
      });
    }

    res.status(200).json({ success: true });
  } catch (err) {
    //eslint-disable-next-line
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
export const edit = async (req, res) => {
  try {
    const groupId = req.params.id;

    if (!groupId) {
      return res.status(404).json({
        message: "group not found",
      });
    }

    const updatedGroup = await GroupModel.findByIdAndUpdate(
      {
        _id: groupId,
      },
      {
        status: req.body.status,
        students: req.body.students || [],
      },
      { new: true } // This option returns the updated document
    );

    res.status(200).json({ success: true, groupData: updatedGroup }); // Send the updatedGroup in the response
  } catch (err) {
    //eslint-disable-next-line
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
