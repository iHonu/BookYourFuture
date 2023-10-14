import { Event as EventModel } from "../models/Event.js";

export const add = async (req, res) => {
  try {
    const newEvent = {
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      sessionSlot: req.body.sessionSlot || [],
      group: req.body.group || [],
    };

    const event = await EventModel.create(newEvent);

    res.status(200).json({ success: true, eventData: event });
  } catch (err) {
    //eslint-disable-next-line
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const all = async (req, res) => {
  try {
    const { title, groupId } = req.query;
    const query = {};

    if (title) {
      // Use a regular expression for case-insensitive partial match
      query.title = { $regex: new RegExp(title, "i") };
    }

    if (groupId) {
      query.group = { _id: groupId }; // Assuming `group` is the field storing the group's _id
    }

    const events = await EventModel.find(query)
      .populate({
        path: "sessionSlot.student",
        select: "_id lastName firstName email",
      })
      .populate("user")
      .populate("group")
      .exec();

    res.status(200).json({ success: true, eventsData: events });
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
    const eventId = req.params.id;

    if (!eventId) {
      return res.status(404).json({
        message: "event not found",
      });
    }

    const event = await EventModel.findById(eventId)
      .populate({
        path: "sessionSlot.student",
        select: "_id lastName firstName email",
      })
      .populate("user")
      .populate("group")
      .exec();

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }
    res.status(200).json({ success: true, eventData: event });
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
    const eventId = req.params.id;

    EventModel.findByIdAndDelete(
      {
        _id: eventId,
      },
      (err, event) => {
        if (err) {
          return res.status(500).json({
            message: "can`t delete event",
          });
        }
        if (!event) {
          return res.status(404).json({
            message: "event not found",
          });
        }
      }
    );

    if (!eventId) {
      return res.status(404).json({
        message: "event not found",
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
    const eventId = req.params.id;

    if (!eventId) {
      return res.status(404).json({
        message: "event not found",
      });
    }

    const updatedEvent = await EventModel.findByIdAndUpdate(
      {
        _id: eventId,
      },
      {
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        sessionSlot: req.body.sessionSlot || [],
        group: req.body.group || [],
      },
      { new: true } // This option returns the updated document
    );

    res.status(200).json({ success: true, eventData: updatedEvent }); // Send the updatedGroup in the response
  } catch (err) {
    //eslint-disable-next-line
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const bookSession = async (req, res) => {
  try {
    const sessionId = req.params.sessionId;
    const studentId = req.body.studentId; // Assuming you send the studentId in the request body

    // Find the event by sessionId and update the sessionSlot with the new studentId
    const event = await EventModel.findOne({ "sessionSlot._id": sessionId });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const sessionSlotToBook = event.sessionSlot.find(
      (slot) => slot._id.toString() === sessionId && !slot.student
    );

    if (!sessionSlotToBook) {
      return res
        .status(400)
        .json({ message: "Session slot is already booked or not found" });
    }

    const isAlreadyBooked = await EventModel.exists({
      "sessionSlot._id": sessionId,
      "sessionSlot.student": studentId, // Check if any student is already booked
    });

    if (isAlreadyBooked) {
      return res
        .status(400)
        .json({ message: "Session slot is already booked" });
    }

    const bookSlot = await EventModel.findOneAndUpdate(
      { "sessionSlot._id": sessionId },
      { $push: { "sessionSlot.$.student": studentId } },
      { new: true }
    )
      .populate({
        path: "sessionSlot.student",
        select: "_id lastName firstName email",
      })
      .exec();

    if (!bookSlot) {
      return res.status(404).json({ message: "bookSlot not found" });
    }

    res.status(200).json({ success: true, eventData: bookSlot });
  } catch (err) {
    //eslint-disable-next-line
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteStudentFromSessionSlot = async (req, res) => {
  try {
    const sessionId = req.params.sessionId;
    const studentId = req.body.studentId; // Assuming you send the studentId in the request body

    // Find the event by sessionId and remove the studentId from the sessionSlot
    const bookedSlot = await EventModel.findOneAndUpdate(
      { "sessionSlot._id": sessionId },
      { $pull: { "sessionSlot.$.student": studentId } },
      { new: true }
    ).populate({
      path: "sessionSlot.student",
      select: "_id lastName firstName email",
    });

    if (!bookedSlot) {
      return res.status(404).json({ message: "timeSlot not found" });
    }

    if (!studentId) {
      return res.status(404).json({ message: "student not found" });
    }

    res.status(200).json({ success: true, sessionSlot: bookedSlot });
  } catch (err) {
    //eslint-disable-next-line
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const findTimeSlotByStudentId = async (req, res) => {
  try {
    const studentId = req.params.studentId;

    const bookedSlot = await EventModel.find({
      "sessionSlot.student": studentId,
    })
      .populate({
        path: "sessionSlot.student",
        select: "_id lastName firstName email",
      }) // Populate the student field within sessionSlot
      .exec();

    if (!bookedSlot) {
      return res.status(404).json({ message: "bookedSlot not found" });
    }

    res.status(200).json({ success: true, bookedSlot });
  } catch (err) {
    //eslint-disable-next-line
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
