const express = require("express");

const router = express.Router();

router.use("/clients", require("./clientRoutes"));
router.use("/college", require("./collegeRoutes"));
router.use("/colleges", require("./collegeRoutes"));
router.use("/project", require("./projectsRoutes"));
router.use("/team", require("./teamRoutes"));
router.use("/menus", require("./menuRoutes"));
router.use("/career", require("./careerRoutes"));
router.use("/careerApply", require("./careerApplyRoutes"));
router.use("/contact", require("./contactRoutes"));
router.use("/enquiry", require("./enquiryRoutes"));
router.use("/project-enquiry", require("./projectEnquiryRoutes"));
router.use("/start-project", require("./startProjectRoutes"));
router.use("/admin", require("./adminAuthRoutes"));
router.use("/internEnquiry", require("./internEnquiryRoutes"));

module.exports = router;
