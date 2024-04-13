import express from 'express';
import connect from './.env/index.js';
import productrouter from './router/product.router.js';
import errorHandlerMinddleware from './minddlewares/error-handler.minddleware.js';


const app = express();
const PORT = 265;

connect();

//Express 에서 req.body 데이터를 가져오기 위한 코드
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//라우터 생성후 API 생성
const router = express.Router();

router.get('/', (req, res) => {
  return res.json({ message: 'hi' });
});

app.use('/api', [router, productrouter]); //?? 라우터를 왜 두군데서 받지??

app.ues (errorHandlerMinddleware);
//서버열때 포트 번호를 265 로 열게 설정 코드
app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸습니다.');
});

