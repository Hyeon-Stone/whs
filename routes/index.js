import {Router} from "express";
// import index from "../views/index.js"
var router = Router();

router.get("/", function(req, res, next){
  res.render('index');
})


export default router;
