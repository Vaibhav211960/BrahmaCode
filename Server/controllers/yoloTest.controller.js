import YoloTest from "../models/yoloTest.model.js";

const saveYoloTest = async (req, res) => {
  try {

    const { id , age , gender, ankleDorsiflexion , singleLegBalance ,  testCount , verticalJump , broadJump , sprintTime , agilityTtest ,beepTest , wallSit , cooperTest } = req.body;

    const athleteExists = await YoloTest.findOne({ id });
    

    const yoloTest = new YoloTest({
      id,
      age,
      gender,
      testCount,
      sport,
      bmi,
      verticalJump,
      broadJump,
      sprintTime,
      ankleDorsiflexion,
      singleLegBalance,
        agilityTtest,
      beepTest,
      wallSit,
      cooperTest
    });

    await yoloTest.save();

    res.status(200).json({ message: "YOLO test successful" , data: yoloTest });  
    } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

const getYoloTests = async (req, res) => {
  try {
    const yoloTests = await YoloTest.findById(req.params.id);    
    res.status(200).json({ message: "YOLO tests retrieved successfully", data: yoloTests });
    } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}


export { saveYoloTest , getYoloTests };
