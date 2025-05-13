//file chính khởi động sever, kết nối database và gắn các route xử lý

const express = require("express"); //Import Express – framework giúp xây dựng API
const mongoose = require("mongoose"); //Import Mongoose – thư viện kết nối và thao tác với MongoDB
const cors = require("cors"); //cho phép các frontend truy cập tài nguyên từ backend
require("dotenv").config(); //sử dụng thư viện dotenv để tải các biến môi trường từ file .env

const authRoutes = require("./routes/auth"); //Import các route xử lý chức năng (đăng ký, đăng nhập, v.v.).

const app = express();//Tạo app Express

// Gắn các middleware
app.use(cors()); //Gắn middleware cors(): cho phép tất cả client được gửi request đến server
app.use(express.json());

// Gắn các routes
app.use("/api/auth", authRoutes); //Gắn route /api/auth để xử lý các yêu cầu từ phía client liên quan đến xác thực


//Kết nối tới MongoDB và khởi động server
mongoose.connect(process.env.MONGO_URI) //gọi phương thức connect của Mongoose để thiết lập kết nối đến MongoDB
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT, () => 
    // app.listen(...): Bắt đầu lắng nghe các request HTTP đến cổng PORT
    // process.env.PORT: là biến môi trường chỉ định cổng mà server sẽ chạy (ví dụ: PORT=5000)
      console.log(`🚀 Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error("MongoDB connection error:", err));
