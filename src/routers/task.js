const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/authentication')
const router = new express.Router()


router.post('/tasks', auth, async (req, res) => {
    // const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
    // task.save().then(() => {
    //     res.status(201).send(task)
    // }).catch((e) => {
    //     res.status(400).send(e)
    // })
})

// get /tasks?complted=false
// get /tasks?limit=10&skip=20
// get /tasks?sortBy=createdAt_asc
router.get('/tasks', auth, async (req, res) => {
    const match = {}
    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split('_')
        sort[parts[1]] = parts[1] === 'desc' ? -1: 1
    }
    try {
        // const task = await Task.find({})
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort: {
                    createdAt: -1
                }
            }
        }).execPopulate()
        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send(e)
    }
    // Task.find({}).then((tasks) => {
    //     res.send(tasks)
    // }).catch((e) => {
    //     res.status(500).send(e)
    // })
})

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)
        if (!task) {
            return res.status(404).send(task)
        }
        res.status(200).send(task)
    } catch (e) {
        res.status(500).send()
    }

    // Task.findById(_id).then((tasks) => {
    //     if (!tasks) {
    //         return res.status(404).send()
    //     }
    //     res.status(200).send(tasks)
    // }).catch((e) => {
    //     res.status(500).send(e)
    // })
})
 
router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowableUpdate = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowableUpdate.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({error: "Invalid updates!"})
    } 
    const _id = req.params.id
    try {
        const task = await Task.findById(_id)
        updates.forEach((upadte) => task[update] = req.body[update])
        await task.save()

        // const task = await Task.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true})
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})
module.exports = router 