const express = require("express");
const emailController = require('../controller/email-controller');
const {
  saveSendEmails,
  getEmails,
  toggleStarredEmail,
  deleteEmails,
  moveEmailsToBin,
  
} = emailController;

const routes = express.Router();

routes.post("/save", saveSendEmails);
routes.post("/save-draft", saveSendEmails);
routes.get("/emails/:type", getEmails);
routes.post("/starred", toggleStarredEmail);
routes.delete("/delete", deleteEmails);
routes.post("/bin", moveEmailsToBin);
routes.post("/",(req,res)=>{
  res.json({message:"welcome to this page"})
})
// routes.get("/auth",validateJWTToken)

module.exports = routes;
