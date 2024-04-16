//tryCatch highOrder function
const tryCatch = (controller) => {
  return async (req, res) => {
    try {
      await controller(req, res);
    } catch (er) {
      console.log("errr", er);
      res.status(500).json({ success: false, message: "something went wrong" });
    }
  };
};

export default tryCatch;
