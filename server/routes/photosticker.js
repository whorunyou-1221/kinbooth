const express = require('express')
const router = express.Router()

const { PhotoSticker } = require('../models')

//get request => list of user
router.get("/", async (req, res) => { 
    try {
     const PhotoStickerList = await PhotoSticker.findAll({ 
        attributes: ["id", "name", "email", "password"],
        include:[
            {
                model: PhotoSticker,
                attributes: ["id", "SessionDate"],
                include: {
                  model: Collage,
                  attributes: ["id", "CollageName", "PhotoCount", "PreviewPath"],
                },
            },
            {
                  model: SavedPhoto,
                  attributes: ["id", "SavedAt"],
        
            }
        ]
    }); 
    res.status(200).json(PhotoStickerList); 
} catch (error) { 
    res.status(500).json({ message: "An error occurred while fetching user data!" 

    }); 
} 
});
//get user details using user id
router.get("/:id", async(req, res) => {
    const { id } = req.params;
    try{
       const user = await User.findAll({
        attributes:["id","name", "email", "password", "create_at"],
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
        const newUser = req.body
        await User.create(newUser)
        res.status(201).json({message: "new user data created"})
    } catch (error){
        res.status(404).json({message: "An error occured while adding new user"})
    }
});
//update user data
router.put("/:id", async (req,res) => {
const {id} = req.params
const {name, email, password} = req.body
try{
    const user = await User.update(
        {
            name: name,
            email: email,
            password: password
        }, 
        {
            where: {id : id}
        }
    )
    if(user [0] === 0) {
        return res.status(404).json ({message: "UpdateError: user data not found! "})
    }
    res.status(200).json ({message: "successfully updated user data!"});
}catch (error){
    res.status(400).json ({message: "an error occurred while updating user data"});

}
});

//last line
module.exports = router;