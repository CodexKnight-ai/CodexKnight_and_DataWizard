import {Lesson} from '../models/selfDefenseLesson.model.js'

const seedLessons = async () => {

    const lessons = [
        { id: 1 , name: "Lesson 1" , description : "small nigga with one lag, no hairs, no hand, also gay and lesbian at a time",duration:"0:00", status: true  ,image:"/crim1.jpeg" , url:"/gtaBgVideo.mp4"},
        { id: 2 , name: "Lesson 2" , description : "small nigga with one lag, no hairs, no hand, also gay and lesbian at a time",duration:"0:00",status : false ,image:"/crim2.jpeg" , url:"/gtaBgVideo.mp4"},
        { id: 3 , name: "Lesson 3" , description : "small nigga with one lag, no hairs, no hand, also gay and lesbian at a time",duration:"0:00", status: true  ,image:"/crim3.jpeg" , url:"/gtaBgVideo.mp4"},
        { id: 4 , name: "Lesson 4" , description : "small nigga with one lag, no hairs, no hand, also gay and lesbian at a time",duration:"0:00", status: false ,image:"/crim4.jpeg" , url:"/gtaBgVideo.mp4"},
        { id: 5 , name: "Lesson 5" , description : "small nigga with one lag, no hairs, no hand, also gay and lesbian at a time",duration:"0:00", status: true  ,image:"/crim1.jpeg" , url:"/gtaBgVideo.mp4"},
        { id: 6 , name: "Lesson 6" , description : "small nigga with one lag, no hairs, no hand, also gay and lesbian at a time",duration:"0:00", status: false ,image:"/crim2.jpeg" , url:"/gtaBgVideo.mp4"},
        { id: 7 , name: "Lesson 7" , description : "small nigga with one lag, no hairs, no hand, also gay and lesbian at a time",duration:"0:00", status: true  ,image:"/crim3.jpeg" , url:"/gtaBgVideo.mp4"},
        { id: 8 , name: "Lesson 8" , description : "small nigga with one lag, no hairs, no hand, also gay and lesbian at a time",duration:"0:00", status: false ,image:"/crim4.jpeg" , url:"/gtaBgVideo.mp4"},
        { id: 9 , name: "Lesson 9" , description : "small nigga with one lag, no hairs, no hand, also gay and lesbian at a time",duration:"0:00", status: false ,image:"/crim4.jpeg" , url:"/gtaBgVideo.mp4"},
        { id: 10, name: "Lesson 10", description : "small nigga with one lag, no hairs, no hand, also gay and lesbian at a time",duration:"0:00", status: false ,image:"/crim4.jpeg" , url:"/gtaBgVideo.mp4"},
        { id: 11, name: "Lesson 11", description : "small nigga with one lag, no hairs, no hand, also gay and lesbian at a time",duration:"0:00", status: false ,image:"/crim4.jpeg" , url:"/gtaBgVideo.mp4"},
        { id: 12, name: "Lesson 12", description : "small nigga with one lag, no hairs, no hand, also gay and lesbian at a time",duration:"0:00", status: false ,image:"/crim4.jpeg" , url:"/gtaBgVideo.mp4"},
        { id: 13, name: "Lesson 13", description : "small nigga with one lag, no hairs, no hand, also gay and lesbian at a time",duration:"0:00", status: false ,image:"/crim4.jpeg" , url:"/gtaBgVideo.mp4"},
        // Add more lessons as needed
      ];

      try {
        await Lesson.insertMany(lessons);
        console.log("Lessons added")
      } catch (error) {
        console.log("Error in seeding lesson",error)
      }
}

const getLessons = async (req, res) => {
    try {
        const lessons = await Lesson.find();
        console.log(lessons); // Debug line to check fetched data
        res.json(lessons);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}


const addLessons = async (req,res) => {
    // res.send('new lesson')

    const lesson =  new Lesson(req.body)
    try {
        const newLesson = await lesson.save();
        res.status(201).json(newLesson);
        // console.log("created") // Debug line to check received data
    } catch (error) {
        res.status(400).json({ message: error });
    }
}

export {getLessons,addLessons}