const express = require('express')
const router = express.Router()

const { Template } = require('../models')

//get request => list of user
router.get("/", async (req, res) => { 
    try {
     const templateList = await User.findAll({ 
        attributes: ["id", "TemplateName", "TemplatePath", "Description"] 
    }); 
    res.status(200).json(templateList); 
} catch (error) { 
    res.status(500).json({ message: "An error occurred while fetching user data!" 

    }); 
} 
});
//get user details using user id
router.get("/:id", async(req, res) => {
    const { id } = req.params;
    try{
       const template = await Template.findAll({
        attributes:["id","TemplateName", "TemplatePath","Description"],
        where: {id: id},
       });
       res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message: "database error while fetching user data!"})
    }
});
//add new user\\
router.post("/new", async (req, res) => {
    try{
        const newTemplate = req.body
        await Template.create(newTemplate)
        res.status(201).json({message: "new user data created"})
    } catch (error){
        res.status(404).json({message: "An error occured while adding new user"})
    }
});
//update user data
router.put("/:id", async (req,res) => {
const {id} = req.params
const {TemplateName, TemplatePath, Description} = req.body
try{
    const template = await Template.update(
        {
            TemplateName: TemplateName,
            TemplatePath: TemplatePath,
            Desciption: Description
        }, 
        {
            where: {id : id}
        }
    )
    if(template [0] === 0) {
        return res.status(404).json ({message: "UpdateError: user data not found! "})
    }
    res.status(200).json ({message: "successfully updated user data!"});
}catch (error){
    res.status(400).json ({message: "an error occurred while updating user data"});

}
});

//last line
module.exports = router;