import  {UserTip}  from "../models/userTips.model.js";

const getTips = async (req, res) => {
    try {
        const tips = await UserTip.find();
        res.json(tips);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}


const addTips = async (req, res) => {
    const tip = new UserTip(req.body);
    try {
        const newTip = await tip.save();
        res.status(201).json(newTip); 
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteTips = async (req,res) => { 
    try {
        await UserTip.findByIdAndDelete(req.params.id);
        res.json({message : "Tip deleted successfully !"})
    } catch (error) {
        res.status(400).json({message : error })
    }
}

export {getTips, deleteTips, addTips }