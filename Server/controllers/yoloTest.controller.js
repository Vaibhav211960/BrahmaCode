

const saveYoloTest = async (req, res) => {
  try {

    const { name , sport , bmi , verticalJump , broadJump , sprintTime , sprintSpeed , beepTest , wallSit , cooperTest } = req.body;




    res.status(200).json({ message: "YOLO test successful" });  
    } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}