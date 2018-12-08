const express = require('express');
const router = express.Router();
const actionModelDB = require('../data/helpers/actionModel');

router.get('/', (req, res) => {
    actionModelDB.get()
        .then(actions => {
            res
                .status(200)
                .json(actions);
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: "Error getting a response from server" })
        })
})
router.get('/:id', (req, res) => {
    const { id } = req.params
    actionModelDB.get(id)
        .then(action => {
            res
                .status(200)
                .json(action);
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: "Error getting a response from server" })
        })
})

router.post('/', (req, res) => {

    const action = req.body;
    if (!action.project_id || !action.description || !action.notes) {
        res.status(404)
            .json({ message: "Please provide complete action information." })
        return
    }
    actionModelDB.insert(action)
        .then(action => {
            res
                .status(200)
                .json(action)
        }).catch(err => {
            res
                .status(500)
                .json({ error: "Error adding action to server" })
        })
})

router.put('/:id', (req, res) => {
    const action = req.body;
    const { id } = req.params;
    if (!action.project_id || !action.description || !action.notes || !id) {
        res.status(404)
            .json({ message: "Please provide complete action information and/or ID." })
        return
    }
    actionModelDB.update(id, action)
        .then(updatedAction => {
            if (updatedAction) {
                res
                    .status(200)
                    .json(updatedAction);
            } else {
                res
                    .status(404)
                    .json({ message: "The action with the specified ID does not exist." })
            }
        }).catch(err => {
            res
                .status(500)
                .json({ error: "The action could not be updated: " })
        })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    let foundAction;
    actionModelDB.get(id).then(action => {
        foundAction = action;
        actionModelDB.remove(id)
            .then(() => {
                res
                    .status(200)
                    .json(foundAction);
            }).catch(err => {
                res
                    .status(500)
                    .json({ error: "The action could not be removed" })
            })
    }).catch(err => {
        res
            .status(404)
            .json({ error: "The action with the specified ID does not exist." })
    });
})

module.exports = router;