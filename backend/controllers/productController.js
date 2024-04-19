const { QueryTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../middlewares/roleMiddleware');



// const createProduct = async (req, res) => {
//   try {
//     const { name, description, categoryId, price } = req.body;
//     const createdBy = req.user.id;
//     const userRole = req.user.userRole;
//     console.log('userRole:', userRole);

//     const images = req.files ? Array.from(Object.values(req.files).flat()) : [];
//     console.log(req.body);
//     // const images = req.files.images

//     const dirExists = fs.existsSync(`public/assets/product/`);

//     if (!dirExists) {
//       fs.mkdirSync(`public/assets/product/`, { recursive: true });
//     }

//     if (images == undefined || images == null) throw new Error("file not found!");
    
//     let savePath = `/public/assets/product/${Date.now()}.${images.name.split(".").pop()}`

//     await new Promise((resolve, reject) => {
//       images.mv(path.join(__dirname, ".." + savePath), async (err) => {
//           if (err) return reject(err);

//           const updateQuery = 'UPDATE book SET image = ? WHERE book_id = ?'
//           await db.query(updateQuery, [[savePath], id]);
//           resolve([savePath]);
//       });
//     });
//     const result = await sequelize.query(
//       'INSERT INTO product (name, description, categoryId, price, images, createdBy, userRole) VALUES (?, ?, ?, ?, ?, ?, ?)',
//       {
//         replacements: [name, description, categoryId, price, savePath, createdBy, userRole],
//         type: QueryTypes.INSERT
//       }
//     );
//     res.json({ message: 'Product created!', id: result[0] });

    
//   } catch (error) {
//     console.error('Error creating product:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };


const createProduct = async (req, res) => {
  try {
    const { name, description, categoryId, price } = req.body;
    const images = req.files ? Array.from(Object.values(req.files).flat()) : [];
    const createdBy = req.user.id;
    const userRole = req.user.userRole;
    console.log(userRole);
    console.log(images);
    
    const dirExists = fs.existsSync(`public/assets/`);
    if (!dirExists) {
      fs.mkdirSync(`public/assets/`, { recursive: true });
    }

    // Array to store paths of uploaded images
    let imagePaths = [];

    // Upload each image and store its path
    for (const image of images) {
      if (!image || !image.name) {
        throw new Error("Image or image name is undefined");
      }

    const savePath = `/public/assets/${Date.now()}.${image.name.split(".").pop()}`;

      // Move the file to the destination
    await new Promise((resolve, reject) => {
      image.mv(path.join(__dirname, ".." + savePath), (err) => {
          if (err) {
            reject(new Error("Error in uploading"));
          } else {
            imagePaths.push(savePath);
            resolve();
          }
        });
      });
    }
    const result = await sequelize.query(
      'INSERT INTO product (name, description, categoryId, price, images, createdBy, userRole) VALUES (?, ?, ?, ?, ?, ?, ?)',
      {
        replacements: [name, description, categoryId, price, imagePaths.join(','), createdBy, userRole],
        type: QueryTypes.INSERT
      }
    );

    res.json({ message: 'Product created!', id: result[0] });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Error creating product: Error: Positional replacement (?) 6 has no entry in the replacement map (replacements[6] is undefined).


const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = (page - 1) * pageSize;

    const products = await sequelize.query(
      `SELECT * FROM product LIMIT ${pageSize} OFFSET ${offset}`,
      { type: QueryTypes.SELECT }
    );
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Function to get a specific product by ID
const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await sequelize.query(
      'SELECT * FROM product WHERE id = ?',
      { replacements: [productId], type: QueryTypes.SELECT }
    );
    if (product.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product[0]);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to update a product
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, description, categoryId, price, images } = req.body;

    await sequelize.query(
      'UPDATE product SET name = ?, description = ?, categoryId = ?, price = ?, images = ? WHERE id = ?',
      { replacements: [name, description, categoryId, price, images, productId], type: QueryTypes.UPDATE }
    );
    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteProduct = async (req, res) => {
  try {

    const userRole = req.user.userRole;
    const userId = req.user.userId;
    console.log(userRole);
    const productId = req.params.id;

    if (userRole === 'Admin') {
      sequelize.query(
        'DELETE FROM product WHERE id = ? ',
        { replacements: [productId], type: QueryTypes.DELETE }
      );
    } else if (userRole === 'User') {
      sequelize.query(
        'DELETE FROM product WHERE id = ? AND userRole = ? ',
        { replacements: [productId, userRole], type: QueryTypes.DELETE }
      );
    } else {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// const deleteProduct = async (req, res) => {
//   try {
//     const userRole = req.user.userRole;
//     console.log(userRole);
//     const productId = req.params.id;

//     let query;

//     if (userRole === 'admin') {
//       await sequelize.query(
//         'DELETE FROM product WHERE id = ?',
//         { replacements: [productId], type: QueryTypes.DELETE }
//       );
//     } else if (userRole === 'User') {
//       await sequelize.query(
//         'DELETE FROM product WHERE id = ? AND userRole = ?',
//         { replacements: [productId, userRole], type: QueryTypes.DELETE }
//       );
//     } else {
//       return res.status(401).json({ error: 'Unauthorized' });
//     }

//     await sequelize.query(query);
//     res.json({ message: 'Product deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting product:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

const searchProducts = async (req, res) => {
  try {
    const { name } = req.query;
    console.log(name);
    if (!name) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const products = await sequelize.query(
      `SELECT p.*, c.categoryName AS categoryName
       FROM product p
       LEFT JOIN category c ON p.categoryId = c.id
       WHERE LOWER(p.name) LIKE :query
         OR LOWER(p.description) LIKE :query
         OR CAST(p.categoryId AS CHAR) LIKE :query
         OR CAST(p.price AS CHAR) LIKE :query`,
      {
        replacements: { query: `%${name.toLowerCase()}%` },
        type: QueryTypes.SELECT,
      }
    );

    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct, searchProducts };