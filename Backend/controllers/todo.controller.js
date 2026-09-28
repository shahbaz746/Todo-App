const Todo = require('../models/todo.model');
const mongoose = require('mongoose');
const asyncHandler = require('../middelware/asyncHander');


// cretar todo

const createTodo = asyncHandler(async (req, res) => {
        const { title, description } = req.body;

        // validate title
        if(!title || title.trim() === ''){
            return res.status(400).json({ success: false, message: 'Title is required' });
        }

        // create new 
const todo = await Todo.create({
            title,
            description,
            user: req.user.id,
        });


res.status(201).json({ success: true, data: todo });
});

// get all todos

const getAllTodos = asyncHandler(async (req, res) => {
        //  qury perms

        const {search, sort, page = 1, limit = 10} = req.query;

        // base query
        const query = { user: req.user.id };
        
        // search by title
        if(search){
            query.title = { $regex: search, $options: 'i' };
        }

        // sorting
        let sortOption = {};
        if(sort === 'asc') sortOption.createdAt = 1; // 1 for ascending
        else sortOption.createdAt = -1; // -1 for descending

        // pagination
        const skip = (page - 1) * limit;
        
        // understand the query and find the todos by gpt
        const todos = await Todo.find(query)
            .sort(sortOption)
            .skip(skip)
            .limit(parseInt(limit));

        const totalTodos = await Todo.countDocuments(query);

        res.status(200).json({
            success: true,
            message: 'Todos fetched successfully',
            total: totalTodos,
            page: Number(page),
            limit: Number(limit),
            data: todos,
        });




});

// get todo by id

const getTodoById = asyncHandler(async (req, res) => {
        // get the id from params
        const { id } = req.params;
        
        // validate the id
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({ success: false, message: 'Invalid ID' });
        }

        // find the todo by id
        const todo = await Todo.findOne({ _id: id, user: req.user.id });

        // if not found todo
        if(!todo){
            return res.status(404).json({ success: false, message: 'Todo not found' });
        }

        // if found todo
        res.status(200).json({ success: true, data: todo });

});

// update todo by id

const updateTodoById = asyncHandler(async (req, res) => {
        // get the id from params
        const { id } = req.params;
        const { title, description, isCompleted } = req.body;

        // validate the id
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({ success: false, message: 'Invalid ID' });
        }

        // title is required
        if(!title || title.trim() === ''){
            return res.status(400).json({ success: false, message: 'Title is required' });
        }

        // find the todo by id and update

        const updatedTodo = await Todo.findOneAndUpdate(
            { _id: id, user: req.user.id },
            { title, description, isCompleted },
            { new: true, runValidators: true }
        );

        // if not found todo
        if(!updatedTodo){
            return res.status(404).json({ success: false, message: 'Todo not found' });
        }

        // if found and updated todo
        res.status(200).json({ success: true, data: updatedTodo });
});

// toggale isCompleted status of todo by id

const toggleTodoStatusById = asyncHandler(async (req, res) => {
        // get the id from params
        const { id } = req.params;

        // validate the id
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({ success: false, message: 'Invalid ID' });
        }

        // find the todo by id
        const todo = await Todo.findOne({ _id: id, user: req.user.id });

        // if not found todo
        if(!todo){
            return res.status(404).json({ success: false, message: 'Todo not found' });
        }

        // flip the isCompleted status
        todo.isCompleted = !todo.isCompleted;

        await todo.save();

        res.status(200).json({ success: true, data: todo });
});

// delete todo by id

const deleteTodoById = asyncHandler(async (req, res) => {
        // get the id from params
        const { id } = req.params;

        // validate the id
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({ success: false, message: 'Invalid ID' });
        }
        
        // find the todo by id and delete
        const deletedTodo = await Todo.findOneAndDelete({ _id: id, user: req.user.id });

        // if not found todo
        if(!deletedTodo){
            return res.status(404).json({ success: false, message: 'Todo not found' });
        }

        // if found and deleted todo
        res.status(200).json({ success: true, message: 'Todo deleted successfully', data: deletedTodo });

});
module.exports = {
    createTodo,
    getAllTodos,
    getTodoById,
    updateTodoById,
    toggleTodoStatusById,
    deleteTodoById,
};  
