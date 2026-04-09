// const express = require("express");
// const router = express.Router();

// const Service = require("../models/Service");

// // POST (Create)
// router.post("/", async (req, res) => {
//   try {
//     const service = new Service(req.body);
//     await service.save();
//     res.json(service);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // GET (Read)
// router.get("/", async (req, res) => {
//   try {
//     const services = await Service.find();
//     res.json(services);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // UPDATE service
// router.put("/:id", async (req, res) => {
//   try {
//     const updatedService = await Service.findByIdAndUpdate(
//       req.params.id,     // which document
//       req.body,          // new data
//       { new: true }      // return updated data
//     );

//     res.json(updatedService);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // DELETE service
// router.delete("/:id", async (req, res) => {
//   try {
//     await Service.findByIdAndDelete(req.params.id);
//     res.json({ message: "Service deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const Service = require("../models/Service");
const { verifyAdmin } = require("../middleware/authMiddleware");

// GET: everyone can view
router.get("/", async (req, res) => {
  const services = await Service.find();
  res.json(services);
});

const upload = require("../middleware/upload");

// POST (Admin only)
router.post("/", verifyAdmin, upload.single("image"), async (req, res) => {
  const { name, description } = req.body;

  const service = new Service({
    name,
    description,
    image: req.file ? req.file.filename : "",
  });

  await service.save();
  res.json(service);
});
// PUT: only admin

router.put("/:id", verifyAdmin, async (req, res) => {
  const { name, description } = req.body;
  const service = await Service.findByIdAndUpdate(
    req.params.id,
    { name, description },
    { new: true }
  );
  res.json(service);
});

// DELETE: only admin
router.delete("/:id", verifyAdmin, async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  res.json({ message: "Service deleted" });
});

module.exports = router;