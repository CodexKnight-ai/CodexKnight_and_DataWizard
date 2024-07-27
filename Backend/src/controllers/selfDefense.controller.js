import {Lesson} from '../models/selfDefenseLesson.model.js'

const getLessons = async (req, res) => {
    try {
        const lessons = await Lesson.find();//retrive all the documents from Lesson collection !
        // console.log(lessons); // Debug line to check fetched data
        res.json(lessons);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}


const addLessons = async (req, res) => {
    const lesson = new Lesson(req.body);
    try {
        const newLesson = await lesson.save();
        res.status(201).json(newLesson); 
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateLessons = async (req,res) => { 
    try {
        const updatedLesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedLesson);
    } catch (error) {
        res.status(400).json({message : error})
    }
    
}
const deleteLessons = async (req,res) => { 
    try {
        await Lesson.findByIdAndDelete(req.params.id);
        res.json({message : "Lesson deleted successdully !"})
    } catch (error) {
        res.status(400).json({message : error })
    }
}

export {getLessons, addLessons, deleteLessons, updateLessons }