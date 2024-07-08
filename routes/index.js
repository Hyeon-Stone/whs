import {Router} from "express";
import {spawn} from "child_process"; 
// import index from "../views/index.js"
var router = Router();

router.get("/", function(req, res, next){
  res.render('index', {data : {
    typoResult : [],
    recommand : ""
}});
})

router.get('/check',async (req, res) => {
    let data
    try {
        data = await solveTypo(req.query.packageName)
        console.log(data);
    } catch {
        data = {
            typoResult : [],
            recommand : "ERROR"
        }
    }
    res.render('index', {data : data});
});

const solveTypo = async (packageName) => {
    return new Promise((resolve, reject) => {
        try{
            const result = spawn(
                'python3',
                ['./util/myproject/main.py', packageName, "--clean"],
            );
            let resultJsonString
            result.stdout.on('data', (data) => {
                // 파이썬 출력으로부터 문자열 저장
                console.log(`child stdout 여기2: ${data.toString()}`);
                try {
                    resultJsonString = JSON.parse(data.toString().replace(/\n/g, ""))
                } catch {

                }
            });
            result.stderr.on('data', (data) => {
                console.log(`child stderr 여기: ${data.toString()}`);
                // resultJsonString = data.toString().replace(/\n/g, "");
            });
            result.on('close', (data) => {
                console.log(`done ${resultJsonString}`);
                resolve(resultJsonString) 
            });
        } catch (err) {
            console.log(err);
            reject(err);
        }
    })

}

export default router;
