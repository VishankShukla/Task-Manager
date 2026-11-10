const taskModel = require("../models/task.model");

async function deleteChildTasks(parentId, userId) {

    const childTasks = await taskModel.find({
        parentTask: parentId,
        userId: userId
    });

    for (const child of childTasks) {

        await deleteChildTasks(child._id, userId);

        await taskModel.findOneAndDelete({
            _id: child._id,
            userId: userId
        });
    }
}

async function createTask(req, res) {
  try {
    const { title, discription, parentTask } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    const task = await taskModel.create({
      title: title.trim(),
      discription: discription || "",
      parentTask: parentTask || null,
      userId: req.user.id,
    });

    return res.status(201).json({
      message: "Task Created Successfuly",
      task,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

async function getParentTask(req, res) {
  try {
    const task = await taskModel
      .find({
        userId: req.user.id,
        parentTask: null,
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Parent Task Fetch Successfuly",
      task,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

async function getChildTask(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "Task ID is required",
      });
    }

    const parent = await taskModel.findOne({
      _id: id,
      userId: req.user.id,
    });

    if (!parent) {
      return res.status(404).json({
        message: "Parent Task Not Found",
      });
    }

    const task = await taskModel.find({
      parentTask: id,
      userId: req.user.id,
    });

    return res.status(200).json({
      message: "All Task Fetch Successfuly",
      task,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

async function updateTask(req, res) {
  try {
    const { title, discription, status } = req.body;
    const { id } = req.params;

    const updateData = {};

    if (title !== undefined) {
      updateData.title = title;
    }

    if (discription !== undefined) {
      updateData.discription = discription;
    }

    if (status !== undefined) {
      updateData.status = status;
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        message: "At least one field is required",
      });
    }

    const task = await taskModel.findOneAndUpdate(
      {
        _id: id,
        userId: req.user.id,
      },
      {
        $set: updateData,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!task) {
      return res.status(404).json({
        message: "Task Not Found",
      });
    }

    return res.status(200).json({
      message: "Task Updated Successfuly",
      task,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

async function deleteTask(req, res){
    try{
        const {id} = req.params;

        const task = await taskModel.findOne({_id:id, userId: req.user.id})

        if(!task){
            return res.status(404).json({
                message:"Task not found"
            })
        };

        await deleteChildTasks(task._id, req.user.id);

        await taskModel.findOneAndDelete({
            _id:id,
            userId:req.user.id
        })

        return res.status(200).json({
            message:"Task Deleted Successfuly"
        })
    } catch(err){
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}

module.exports = {
    createTask,
    getChildTask,
    getParentTask,
    updateTask,
    deleteTask
}