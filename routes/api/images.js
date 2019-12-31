var express =require("express");
const multer = require("multer");
const router = express.Router();
// const {Ad} = require("../../models")
const path = require("path")
const uuid = require("uuid/v4")
// router.use("/ads", adRoutes)
const uploadDir = path.join(process.cwd(), "uploads")
const db = require("../../models")
// Multer this will store the image in memory and upload the image into the uplaod folder 
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, uploadDir);
    },
    filename: function(req, file, cb) {
        console.log(file)
        cb(null, uuid() +"__"+ file.originalname);
    }
 });

  
  // this function will reject any file that is not either a jpeg or png
  const fileFilter = (req, file, cb) => {
      console.log("##################### ")
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(null, false)
    }
  };
  
const upload = multer({
    storage: storage,
    fileFilter:fileFilter
}); 

// adRouter.route("../client/src/pages/user-post")
router.post("/", upload.single("productImage"), (req, res, next)=>{
    console.log(req.file);
    const newAd = new Ad({
        owner: req.body.owner ,
        productTitle:req.body.productTitle,
        productImage: path.join( uploadDir, req.file.filename) ,
        productDescription:req.body.productDescription ,
        productDepartment:req.body.productDepartment,
        productCost:req.body.productCost ,
        locationCity:req.body.locationCity ,
        locationState:req.body.locationState ,
        sellerContactName:req.body.sellerContactName ,
        sellerContactPhone: req.body.sellerContactPhone,
        sellerContactEmail: req.body.sellerContactEmail,
    })
    newAd.save()
    .then((res)=>{
        console.log(res);
        // res.send(200).json({
        //     success: true,
        //     message: "Created Ad successfully"
        // });
        res.end()
    })
    .catch((err)=> next(err));
})
  module.exports= router;