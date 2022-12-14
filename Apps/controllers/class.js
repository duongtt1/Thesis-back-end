const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");

//! Models
const Classes = require("../models/ModelClass");

/**
 * @desc    Create class
 */
exports.createClass = asyncHandler(async (req, res, next) => {
    const class_room = await Classes.create(req.body);

    if (!class_room) { 
        return next(new ErrorResponse(`Classroom create error`, 404)); 
    }

    res.status(200).json({ success: true, data: class_room });
});

/**
 * @desc    get list student of class by id
 */
exports.getStudentsOfClassByID = asyncHandler(async (req, res, next) => {
    var { idClass } = req.params

    const classroom = await Classes.findOne({codeClass: idClass})
                            .populate({
                                path: 'listStudent',
                                select: '-password -token -__v',
                                populate: { path: 'listStudent'}
                            });
    console.log(classroom);
    if (!classroom) { 
        return next(new ErrorResponse(`Classroom create error`, 404)); 
    }

    res.status(200).json({ success: true, data: classroom.listStudent });
});

/**
 * @desc    Get list Assignments by Class
 */
exports.getAssignmentsOfClassByID = asyncHandler(async (req, res, next) => {
    var { idClass } = req.params

    const classroom = await Classes.findOne({codeClass: idClass})
                                .populate({
                                    path: 'assignments',
                                    populate: { path: 'assignments'}
                                });

    if (!classroom) { 
        return next(new ErrorResponse(`Classroom create error`, 404)); 
    }

    res.status(200).json({ success: true, data: classroom.assignments });
});

/**
 * @desc    Get list teacher by Class
 */
exports.getTeachersOfClassByID = asyncHandler(async (req, res, next) => {
    var { idClass } = req.params

    const classroom = await Classes.findOne({codeClass: idClass})
                            .populate({
                                path: 'teachers',
                                select: '-password -token -__v',
                                populate: { path: 'teachers'}
                            });

    if (!classroom) { 
        return next(new ErrorResponse(`Classroom create error`, 404)); 
    }

    res.status(200).json({ success: true, data: classroom.teachers });
});


/**
 * @desc    Get class by ID
 */
exports.getClassByID = asyncHandler(async (req, res, next) => {
	var { idClass } = req.params

    const classroom = await Classes.findOne({codeClass: idClass}).select("-password -token -__v");
    if (!classroom) { 
        return next(new ErrorResponse(`Classroom not found with id of ${idClass}`, 404)); 
    }

    res.status(200).json({ success: true, data: classroom });
});

/**
 * @desc    Get All class
 */
exports.getAllClass = asyncHandler(async (req, res, next) => {
    const list_class = await Classes.find().select("-password -token -__v");
    
    if (!list_class) { 
        return next(new ErrorResponse(`Class not found`, 404)); 
    }

    res.status(200).json({ success: true, data: list_class });
});

/**
 * @desc    Edit teacher by ID
 */
exports.updateClassByID = asyncHandler(async (req, res, next) => {
    delete req.body.token;
    const class_room = await Classes.findOneAndUpdate({ codeClass: req.params.codeClass }, req.body);
    
    if (!class_room) { 
        return next(new ErrorResponse(`Class not found with id of ${req.params.codeClass}`, 404)); 
    }

    res.status(200).json({ success: true, data: class_room });
});

/**
 * @desc    Delete class by ID
 */
exports.deleteClassByID = asyncHandler(async (req, res, next) => {
    const class_room = await Classes.findOneAndDelete({ codeClass: req.params.idClass });
    
    if (!class_room) { 
        return next(new ErrorResponse(`Classes not found with id of ${req.params.idClass}`, 404)); 
    }

    res.status(200).json({ success: true });
});

/**
 * @desc    Add teacher to class by ID
 */
exports.addTeacherToClassByID = asyncHandler(async (req, res, next) => {
	var { idClass } = req.params
    const classroom = await Classes.findOne({codeClass: idClass}).select("-password -token -__v");
    if (!classroom) { 
        return next(new ErrorResponse(`Classroom not found with id of ${codeClass}`, 404)); 
    }
    req.body.list_teacher.forEach(function (data) {
        classroom.teachers.push(data);
    });
    classroom.save();
    res.status(200).json({ success: true, data: classroom });
});

/**
 * @desc    Add student to class
 */
exports.addStudentToClassByID = asyncHandler(async (req, res, next) => {
	var { idClass } = req.params
    const classroom = await Classes.findOne({codeClass: idClass}).select("-password -token -__v");
    if (!classroom) { 
        return next(new ErrorResponse(`Classroom not found with id of ${idClass}`, 404)); 
    }
    req.body.list_students.forEach(function (data) {
        classroom.listStudent.push(data);
    });
    classroom.save();
    res.status(200).json({ success: true, data: classroom });
});

/**
 * @desc    Add assginments to class
 */
exports.addAssginmentsToClassByID = asyncHandler(async (req, res, next) => {
	var { idClass } = req.params
    const classroom = await Classes.findOne({codeClass: idClass}).select("-password -token -__v");
    if (!classroom) { 
        return next(new ErrorResponse(`Classroom not found with id of ${idClass}`, 404)); 
    }
    req.body.list_assigns.forEach(function (data) {
        classroom.assignments.push(data);
    });
    classroom.save();
    res.status(200).json({ success: true, data: classroom });
});