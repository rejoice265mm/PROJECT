// schemas/todo.schema.js

import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  contents: {
    type: String,
    required: true,
  },
  writer: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  satus: {
    type: String,
    default: 'FOR_SALE',
  },
  writeDate: {
    type: Date,
    required: false,
    default: Date.now()
  },
});

// 프론트엔드 서빙을 위한 코드입니다. 모르셔도 괜찮아요!
productSchema.virtual('productId').get(function () {
  return this._id.toHexString();
});
productSchema.set('productJSON', {
  virtuals: true,
});

// TodoSchema를 바탕으로 Todo모델을 생성하여, 외부로 내보냅니다.
export default mongoose.model('Product', productSchema);
