import {Router} from "express";
// import index from "../views/index.js"
var router = Router();

router.get("/", function(req, res, next){
  res.render('index', {data : {
    typoResult : [],
    recommand : ""
}});
})

router.get('/check', (req, res) => {
    console.log(req.query);
    res.render('index', {data : {
        typoResult : [
            {
                name : "torch",
                score : 4.5,
                danger : "alert",
                result : "설명설명설명설명"
            },
            {
                name : "torch",
                score : 4.5,
                danger : "alert",
                result : "설명설명설명설명"
            },
            {
                name : "torch",
                score : 4.5,
                danger : "alert",
                result : "설명설명설명설명"
            },
        ],
        recommand : "pip install torch222"
    }});
});


export default router;
