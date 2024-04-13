import express from 'express';
import Product from '../schemas/product.schemad.js';

//express 안에 있는 router를 꺼내 변수router에 넣는다.
const router = express.Router();

// 상품 작성 API
router.post('/product', async (req, res, next) => {
  //async는 데이터 베이스 조회 하기위해서
  //1. 클라이언트로 부터 가져온 product데이터를 가져온다
  const { productName, contents, writer, password } = req.body;

  // 만약 클라이언트가 productName,contents, writer, password를 전달하지 않았을때 클라이언트에게 에러 메세지
  if (!productName || !contents || !writer || !password) {
    return res.status(400).json({ errorMessage: '데이터가 부족합니다.' });
  }

  const product = new Product({ productName, contents, writer, password });
  await product.save();

  return res.status(201).json({ product });
});


//상품 목록 조회//
router.get('/product', async (req, res, next) => {
  //1.상품 목록 조회
  const product = await product.find().sort('-writeDate').exec();

  //2.상품 목록 조회결과 클라이언트에게 반환
  return res.status(200).json({ product });
});


router.patch('/product/:productName', async (req, res, next) => {  
    // 상품명, 작성 내용, 상품 상태, 비밀번호
    const productName = req.params
    const { contents, writer, satus, password } = req.body;

    const product = await Product.findOne({productName}).exec();
    if (!product) {
      return res
        .status(404)
        .json({ errorMessage: '상품 수정에 실패하였습니다. 수정 요청하신 상품이 존재하지 않습니다.' });
    }

    if (password !== product.password) {
      return res
        .status(404)
        .json({ errorMessage: '상품 수정에 실패하였습니다. 비밀번호가 다릅니다.' });
    }

    product.contents = contents
    product.writer = writer
    product.satus = satus
    await product.save() 
    
    return res.status(200).json({ product });
  });

// 상품 삭제 API
router.delete('/product/:productName', async (req, res, next) => {
  try {
    const { productName } = req.params;
    const { password } = req.body
  
    const product = await Product.findOne({productName}).exec();
    if (!product) {
      return res
        .status(404)
        .json({ errorMessage: '상품 삭제에 실패하였습니다. 삭제 요청하신 상품이 존재하지 않습니다.' });
    }
  
    if (password !== product.password) {
      return res
          .status(404)
          .json({ errorMessage: '상품 삭제에 실패하였습니다. 비밀번호가 다릅니다.' });
    }
  
    await Product.deleteOne({ _id: product._id });
  
    return res.status(200).json({});
  } catch (error) {
    next(error)
  }
});

//라우터를 외부로 보낼수 있게 하는 코드
export default router;
