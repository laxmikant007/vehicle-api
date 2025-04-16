import model from "../models/model.js";
import { productData } from "./exportProductData.js";

const Product = model.Product;
const Image = model.Image;

const seedProducts = async () => {
  try {
    // First delete all images to avoid foreign key constraint issues
    console.log("Deleting existing images...");
    await Image.destroy({ where: {} });
    
    // Then clear existing products without using truncate
    console.log("Deleting existing products...");
    await Product.destroy({ where: {} });
    
    // Insert new products
    console.log("Creating new products...");
    await Product.bulkCreate(productData.products);
    
    // Insert images for each product
    console.log("Creating images for products...");
    for (const product of productData.products) {
      if (product.images && product.images.length > 0) {
        const imageRecords = product.images.map((url, index) => ({
          product_id: product.id,
          url: url,
          is_thumbnail: false,
          display_order: index
        }));
        
        // Add thumbnail as an image if it exists
        if (product.thumbnail) {
          imageRecords.push({
            product_id: product.id,
            url: product.thumbnail,
            is_thumbnail: true,
            display_order: product.images.length
          });
        }
        
        await Image.bulkCreate(imageRecords);
      }
    }
    
    console.log("Products and images seeded successfully");
    return "Products and images seeded successfully";
  } catch (error) {
    console.error("Error seeding products:", error);
    return error;
  }
};

export default seedProducts; 