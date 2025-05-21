
const Product=require("../models/product.model");
const cloudinary = require("../config/cloudinary");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Setup Multer with Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "product_images", // Cloudinary folder name
    format: async (req, file) => "jpg", // Convert all images to JPG
    public_id: (req, file) => Date.now() + "-" + file.originalname,
  },
});

const upload = multer({ storage });

// Upload Product with Image
const addProduct = async (req, res) => {
  try {
    console.log(req.body);
    const { name, category, subcategory,brand,description,price,discount_price, variants,fabric,pattern,sleeve_length,fit,occasion,stock,images} = req.body;
     
    const newProduct = new Product({ name, category, subcategory,brand,description,price,discount_price,variants,fabric,pattern,sleeve_length,fit,occasion,stock, images  });
    await newProduct.save();

    res.status(201).json({ message: "Product added successfully!", newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
const addimage = async (req, res) => {
  try {
    const images = req.files ? req.files.map((file) => file.path) : [];
    res.status(200).json({ images }); // Return image URLs
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
// Get All Products (Including Image URLs)
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
const updateProducts=async(req,res)=>{

  try{
   
    const products=await Product.findById(req.params.id);
   
    res.json(products);
  }catch(error){
    res.status(500).json({message: "Server error"});
  }
}

const updateProudctsadd=async(req,res)=>{
  try {
    const {id}  = req.params;
    const updates = req.body; // Contains only modified fields
   console.log(updates);
    // Update only the provided fields
    const updatedProduct = await Product.findByIdAndUpdate(id, updates, { new: true });
   console.log(updatedProduct)
    if (!updatedProduct) {
        return res.status(404).json({ error: "Product not found" });
    }

    res.json(updatedProduct);
} catch (error) {
    res.status(500).json({ error: "Error updating product" });
}


}
module.exports = { addProduct,updateProudctsadd, getProducts,addimage, upload ,updateProducts};
