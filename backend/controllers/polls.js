const {Poll} = require('../models/models'); // Poll from Models @desc used for operations in mongodb 
const bcrypt = require('bcrypt'); // ** npm install bcrypt @desc used for created hash passwords

/**
 *  @description API to view all polls
 *  @method POST /view
 */
exports.view = async (req, res) => {
    try {
        const polls = await Poll.find();
        res.send({polls: polls});
    } catch(error) {
        res.status(400).send([])
    }
}

/**
 *  @description API to view all likes
 *  @method POST /view/:option
 */
exports.viewCategory = async(req, res) => {
    const { option } = req.params;
    try {
        const polls = await Poll.find();
        switch(option) {
            case "likes" : 
                const totalLikes = polls.filter((each) => each.opinion === "like")
                res.send({likes: totalLikes.length})
                break;
            case "dislikes":
                const totalDislikes = polls.filter((each) => each.opinion === "dislike")
                res.send({dislikes: totalDislikes.length})
                break;
            default:
                res.send({allPolls: polls.length})              
        }
    } catch(error) {
        res.status(400).send("no available polls");
    }
}

exports.update = async (req, res) => {
    const { issueId, opinion } = req.params;
    try {
        await Poll.updateOne({issueId: issueId}, {$push: {opinions: opinion}})
        res.send("Opinion Added Successfully");
    } catch(error) {
        res.status(400).send("Unable to add Opinion, Try Again!");
    }
}

