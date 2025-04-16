import model from "../models/model.js";
import { Image } from "../models/index.js";
import seedProducts from "../seeders/productSeeder.js";
const Product = model.Product;

const ProductController = {
  // Create a new product
  createProduct: async (req, res) => {
    try {

      let sku = Array.from({length: 5}, () => String.fromCharCode(65 + Math.floor(Math.random() * 26))).join('');

      req.body.sku = sku;

      const product = await Product.create(req.body);
      res.status(201).json({ product: product });
    } catch (error) {
      console.log("error in creating  product", error);
      res.status(400).json({ success: false, error: error.message });
    }
  },

  // Update a product
  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ success: false, error: "Product ID is required" });
      }
      
      const [updated] = await Product.update(req.body, {
        where: { id }
      });
      
      if (updated === 0) {
        return res.status(404).json({ success: false, error: "Product not found" });
      }

      const updatedProduct = await Product.findByPk(id);
      
      res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  },

  // Delete a product
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Product.destroy({
        where: { id: Number(id) }
      });
      
      if (deleted === 0) {
        return res.status(404).json({ success: false, error: "Product not found" });
      }
      
      res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  },

  // Get all products
  getAllProducts: async (req, res) => {
    try {
      let limit = 40;

      if(req.query.limit){
        limit = req.query.limit;
      }

      limit = parseInt(limit);

      const products = await Product.findAll({limit: limit, order: [['created_at', 'DESC']]});
      
      // Fetch images for all products
      const productsWithImages = await Promise.all(products.map(async (product) => {
        const productJson = product.toJSON();
        const images = await Image.findAll({
          where: { product_id: product.id },
          attributes: ['url'],
          order: [['display_order', 'ASC']]
        });
        
        // Add images array to product
        productJson.images = images.map(image => image.url);
        
        // Parse JSON fields to convert them from strings to objects
        if (typeof productJson.dimensions === 'string') {
          productJson.dimensions = JSON.parse(productJson.dimensions);
        }
        if (typeof productJson.meta === 'string') {
          productJson.meta = JSON.parse(productJson.meta);
        }
        
        return productJson;
      }));
      
      res.status(200).json({ 
          products: productsWithImages 
      });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  },

  // Get a single product
  getProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);
      
      if (!product) {
        return res.status(404).json({ success: false, error: "Product not found" });
      }
      
      const productJson = product.toJSON();
      
      // Fetch images for the product
      const images = await Image.findAll({
        where: { product_id: product.id },
        attributes: ['url'],
        order: [['display_order', 'ASC']]
      });
      
      // Add images array to product
      productJson.images = images.map(image => image.url);
      
      // Parse JSON fields to convert them from strings to objects
      if (typeof productJson.dimensions === 'string') {
        productJson.dimensions = JSON.parse(productJson.dimensions);
      }
      if (typeof productJson.meta === 'string') {
        productJson.meta = JSON.parse(productJson.meta);
      }
      
      res.status(200).json({ productJson });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  },

  seedProducts: async (req, res) => {
    try {
      await seedProducts();
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  }
};

export default ProductController; 