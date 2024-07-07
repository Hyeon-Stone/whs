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
    
    res.render('index', {data : JSON.parse(solveTypo)});
});

const solveTypo = (packageName) => {
    return new Promise((resolve, reject) => {
        try{
            const result = spawn(
                'python3',
                ['./util/myproject/main.py', packageName, "--clean"],
            );
            let resultJsonString
            result.stdout.on('data', (data) => {
                // 파이썬 출력으로부터 캡차 문자열 저장
                resultJsonString = data.toString().replace(/\n/g, "");
            });
            // result.stderr.on('data', (data) => {
            //     console.log(`child stderr 여기: ${data}`);
            // });
            result.on('close', (data) => {
                // 생성했던 폴더 및 파일 삭제
                // 캡차 문자열 resolve
                resolve(resultJsonString) 
            });
        } catch (err) {
            console.log(err);
            reject(err);
        }
    })

}


export default router;
