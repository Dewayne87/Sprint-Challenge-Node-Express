const express = require('express');
const router = express.Router();
const projectModelDB = require('../data/helpers/projectModel');

router.get('/', (req, res) => {
    projectModelDB.get()
        .then(project => {
            res
                .status(200)
                .json(project);
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: "Error getting a response from server" })
        })
})
router.get('/:id', (req, res) => {
    const projectID = req.params.id
    projectModelDB.getProjectActions(projectID)
        .then(project => {
            if (project.length) {
                res
                    .status(200)
                    .json(project);
            } else {
                res
                    .status(404)
                    .json({
                        error: "The project with the specified ID does not exist."
                    })
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({
                    error: "Error getting a response from server"
                })
        })
})

router.post('/', (req, res) => {
    const project = req.body;
    if (!project.name || !project.description) {
        res.status(404)
            .json({ error: "Please provide complete project information." })
        return
    }
    projectModelDB.insert(project)
        .then(project => {
            res
                .status(200)
                .json(project)
        }).catch(err => {
            res
                .status(500)
                .json({ error: "Error adding project to server" })
        })
})

router.put('/:id', (req, res) => {
    const project = req.body;
    const { id } = req.params;
    if (!project.name || !project.description || !id) {
        res.status(404)
            .json({ error: "Please provide complete project information and/or ID." })
        return
    }
    projectModelDB.update(id, project)
        .then(updatedProject => {
            if (updatedProject) {
                res
                    .status(200)
                    .json(updatedProject);
            } else {
                res
                    .status(404)
                    .json({ error: "The project with the specified ID does not exist." })
            }
        }).catch(err => {
            res
                .status(500)
                .json({ error: "The project could not be updated " })
        })
})
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    let foundProject;
    projectModelDB.get(id).then(project => {
        foundProject = project;
        projectModelDB.remove(id)
            .then(() => {
                res
                    .status(200)
                    .json(foundProject);
            }).catch(err => {
                res
                    .status(500)
                    .json({ error: "The project could not be removed" })
            })
    }).catch(err => {
        res
            .status(404)
            .json({ error: "The project with the specified ID does not exist." })
    });
})

module.exports = router;