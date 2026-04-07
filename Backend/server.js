const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, '../Front end')));

const mongoURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/gatewaysoftware";

mongoose.connect(mongoURI)
    .then(() => console.log(`MongoDB Connected: ${mongoURI}`))
    .catch(err => console.error("MongoDB connection error:", err));

mongoose.connection.once('open', async () => {
    const TeamMember = mongoose.model("TeamMember");
    const count = await TeamMember.countDocuments();
    
    const allTeamMembers = [
        { name: "SABARINATHAN MUTHU.ER", role: "Chief Executive Officer", order: 1, image: "/uploads/team-members/1763380710472-sir.jpeg", linkedin: "", facebook: "", instagram: "" },
        { name: "Kiruba", role: "Chief Financial Officer", order: 2, image: "/uploads/team-members/1763380804988-mam.jpeg", linkedin: "", facebook: "", instagram: "" },
        { name: "Balaji", role: "Chief Executive Director", order: 3, image: "/uploads/team-members/1763380866923-balajijpg.jpg", linkedin: "", facebook: "", instagram: "" },
        { name: "GAYATHIRI", role: "Senior Developer", order: 4, image: "/uploads/team-members/1763380990643-GAYATHIRI.jpeg", linkedin: "", facebook: "", instagram: "" },
        { name: "Devi", role: "UI/UX Designer", order: 5, image: "/uploads/team-members/1763381214518-devi.jpeg", linkedin: "", facebook: "", instagram: "" },
        { name: "Robin", role: "Backend Developer", order: 6, image: "/uploads/team-members/1763381281451-robin.jpeg", linkedin: "", facebook: "", instagram: "" },
        { name: "Prem Kumar", role: "Full Stack Developer", order: 7, image: "/uploads/team-members/1763381580582-prem.jpeg", linkedin: "", facebook: "", instagram: "" },
        { name: "Rubini", role: "Frontend Developer", order: 8, image: "/uploads/team-members/1763381812438-rubini.jpeg", linkedin: "", facebook: "", instagram: "" },
        { name: "Priyadharshini", role: "Marketing Manager", order: 9, image: "/uploads/team-members/1763381889271-priyadharshini.jpeg", linkedin: "", facebook: "", instagram: "" },
        { name: "Hema", role: "Project Manager", order: 10, image: "/uploads/team-members/1763382759153-Hema.jpeg", linkedin: "", facebook: "", instagram: "" },
        { name: "Sivagami", role: "Team Lead", order: 11, image: "/uploads/team-members/1763382849523-sivagami.jpeg", linkedin: "", facebook: "", instagram: "" },
        { name: "Durga", role: "QA Engineer", order: 12, image: "/uploads/team-members/1763383168484-Durga.jpeg", linkedin: "", facebook: "", instagram: "" },
        { name: "Azhagarsamy", role: "CEO", order: 13, image: "/uploads/team-members/1763383639054-Azhagarsamy.jpeg", linkedin: "", facebook: "", instagram: "" },
        { name: "Dhavarsanam", role: "Technical Lead", order: 14, image: "/uploads/team-members/1763383731097-dhavarsanam.jpeg", linkedin: "", facebook: "", instagram: "" },
        { name: "Vignesh", role: "Software Engineer", order: 15, image: "/uploads/team-members/1763383872905-vignesh.jpeg", linkedin: "", facebook: "", instagram: "" },
        { name: "Shafiq", role: "Web Developer", order: 16, image: "/uploads/team-members/1763384047620-shafiq.jpeg", linkedin: "", facebook: "", instagram: "" },
        { name: "Kishore", role: "App Developer", order: 17, image: "/uploads/team-members/1763384110754-kishore.jpeg", linkedin: "", facebook: "", instagram: "" },
        { name: "Preethi", role: "Data Analyst", order: 18, image: "/uploads/team-members/1763384229752-preethi.jpeg", linkedin: "", facebook: "", instagram: "" },
        { name: "Baheerathan", role: "Consultant", order: 19, image: "/uploads/team-members/1763384307729-baheerathan.jpeg", linkedin: "", facebook: "", instagram: "" },
        { name: "Indhu", role: "Content Writer", order: 20, image: "/uploads/team-members/1763384545166-indhu.jpeg", linkedin: "", facebook: "", instagram: "" },
        { name: "Sri Guna", role: "Developer", order: 21, image: "/uploads/team-members/1763384612953-sri_guna.jpeg", linkedin: "", facebook: "", instagram: "" },
        { name: "Shanmugapriya", role: "Designer", order: 22, image: "/uploads/team-members/1763384665781-shanmugapriya.jpeg", linkedin: "", facebook: "", instagram: "" },
        { name: "Ashok", role: "Engineer", order: 23, image: "/uploads/team-members/1763384802852-ashok.jpeg", linkedin: "", facebook: "", instagram: "" },
        { name: "Anbu", role: "Manager", order: 24, image: "/uploads/team-members/1763384876543-anbu.jpeg", linkedin: "", facebook: "", instagram: "" },
        { name: "Santhosh", role: "Developer", order: 25, image: "/uploads/team-members/1763441485080-santhosh.jpeg", linkedin: "", facebook: "", instagram: "" },
        { name: "Hithesh", role: "Engineer", order: 26, image: "/uploads/team-members/1763441548673-hithesh.jpeg", linkedin: "", facebook: "", instagram: "" },
        { name: "Dinesh", role: "Developer", order: 27, image: "/uploads/team-members/1763441606933-dinesh m.jpeg", linkedin: "", facebook: "", instagram: "" },
        { name: "Siva", role: "Technical Lead", order: 28, image: "/uploads/team-members/1763442856455-siva.jpeg", linkedin: "", facebook: "", instagram: "" },
        { name: "Dhivya", role: "Designer", order: 29, image: "/uploads/team-members/1763443081297-dhivya.jpeg", linkedin: "", facebook: "", instagram: "" }
    ];
    
    await TeamMember.deleteMany({});
    await TeamMember.insertMany(allTeamMembers);
    console.log(`Added ${allTeamMembers.length} team members to database!`);
});

app.use("/api/team", require("./routes/teamRoutes"));
app.use("/api/clients", require("./routes/clientRoutes"));
app.use("/api/college", require("./routes/collegeRoutes"));
app.use("/api/project", require("./routes/projectsRoutes"));
app.use("/api/menus", require("./routes/menuRoutes"));
app.use("/api/career", require("./routes/careerRoutes"));
app.use("/api/careerApply", require("./routes/careerApplyRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/enquiry", require("./routes/enquiryRoutes"));
app.use("/api/project-enquiry", require("./routes/projectEnquiryRoutes"));
app.use("/api/start-project", require("./routes/startProjectRoutes"));
app.use("/api/admin", require("./routes/adminAuthRoutes"));
app.use("/api/internEnquiry", require("./routes/internEnquiryRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));