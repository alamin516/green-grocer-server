const data = {
  users: [
    {
      name: "Md Alamin",
      email: "admin@example.com",
      role: "admin",
      password: "adminpassword",
      phone: "01986774216",
    },
    {
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      phone: "01712345678",
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      password: "password456",
      phone: "+8801612345678",
    },
  ],
  products: [
    {
      title: "Organic Almonds",
      slug: "organic-almonds",
      long_description: "Raw, unsalted, and full of nutrients.",
      short_description: "High-protein organic almonds.",
      images: [
        {
          src: "https://cdn11.bigcommerce.com/s-vptmq0v2zd/images/stencil/250x325/products/112/453/01-02__73097.1606377896.jpg?c=1",
        },
        {
          src: "https://cdn11.bigcommerce.com/s-vptmq0v2zd/images/stencil/250x325/products/112/456/01__40747.1606377897.jpg?c=1",
          alt: "Product 2",
        },
      ],
      price: 12.99,
      type: "Simple",
    },
    {
      title: "Organic Honey",
      slug: "organic-honey",
      long_description: "Pure, raw honey from local farms.",
      short_description: "Natural sweetener for your diet.",
      images: [
        {
          src: "https://cdn11.bigcommerce.com/s-vptmq0v2zd/images/stencil/250x325/products/112/453/01-02__73097.1606377896.jpg?c=1",
          alt: "Product 1",
        },
        {
          src: "https://cdn11.bigcommerce.com/s-vptmq0v2zd/images/stencil/250x325/products/112/456/01__40747.1606377897.jpg?c=1",
          alt: "Product 2",
        },
      ],
      price: 15.99,
      type: "Simple",
    },
    {
      title: "Organic Avocado",
      slug: "organic-avocado",
      long_description: "Rich in healthy fats and antioxidants.",
      short_description: "Fresh organic avocado.",
      images: [
        {
          src: "https://cdn11.bigcommerce.com/s-vptmq0v2zd/images/stencil/250x325/products/112/453/01-02__73097.1606377896.jpg?c=1",
          alt: "Product 1",
        },
        {
          src: "https://cdn11.bigcommerce.com/s-vptmq0v2zd/images/stencil/250x325/products/112/456/01__40747.1606377897.jpg?c=1",
          alt: "Product 2",
        },
      ],
      price: 3.99,
      type: "Simple",
    },
    {
      title: "Organic Extra Virgin Olive Oil",
      slug: "organic-olive-oil",
      long_description: "Cold-pressed and rich in flavor.",
      short_description: "Premium organic olive oil.",
      images: [
        {
          src: "https://cdn11.bigcommerce.com/s-vptmq0v2zd/images/stencil/250x325/products/112/453/01-02__73097.1606377896.jpg?c=1",
          alt: "Product 1",
        },
        {
          src: "https://cdn11.bigcommerce.com/s-vptmq0v2zd/images/stencil/250x325/products/112/456/01__40747.1606377897.jpg?c=1",
          alt: "Product 2",
        },
      ],
      price: 19.99,
      type: "Simple",
    },
    {
      title: "Organic Quinoa",
      slug: "organic-quinoa",
      long_description: "A complete protein and perfect for salads.",
      short_description: "Gluten-free organic quinoa.",
      images: [
        {
          src: "https://cdn11.bigcommerce.com/s-vptmq0v2zd/images/stencil/250x325/products/112/453/01-02__73097.1606377896.jpg?c=1",
          alt: "Product 1",
        },
        {
          src: "https://cdn11.bigcommerce.com/s-vptmq0v2zd/images/stencil/250x325/products/112/456/01__40747.1606377897.jpg?c=1",
          alt: "Product 2",
        },
      ],
      price: 7.99,
      type: "Simple",
    },
    {
      title: "Organic Green Tea",
      slug: "organic-tea",
      long_description: "Boost your metabolism naturally.",
      short_description: "Refreshing organic green tea.",
      images: [
        {
          src: "https://cdn11.bigcommerce.com/s-vptmq0v2zd/images/stencil/250x325/products/112/453/01-02__73097.1606377896.jpg?c=1",
          alt: "Product 1",
        },
        {
          src: "https://cdn11.bigcommerce.com/s-vptmq0v2zd/images/stencil/250x325/products/112/456/01__40747.1606377897.jpg?c=1",
          alt: "Product 2",
        },
      ],
      price: 9.99,
      type: "Simple",
    },
    {
      title: "Organic Coconut Oil",
      slug: "organic-coconut-oil",
      long_description: "Great for cooking or skin care.",
      short_description: "Multipurpose organic coconut oil.",
      images: [
        {
          src: "https://cdn11.bigcommerce.com/s-vptmq0v2zd/images/stencil/250x325/products/112/453/01-02__73097.1606377896.jpg?c=1",
          alt: "Product 1",
        },
        {
          src: "https://cdn11.bigcommerce.com/s-vptmq0v2zd/images/stencil/250x325/products/112/456/01__40747.1606377897.jpg?c=1",
          alt: "Product 2",
        },
      ],
      price: 12.99,
      type: "Simple",
    },
    {
      title: "Organic Oats",
      slug: "organic-oats",
      long_description: "Perfect for a healthy breakfast.",
      short_description: "Wholegrain organic oats.",
      images: [
        {
          src: "https://cdn11.bigcommerce.com/s-vptmq0v2zd/images/stencil/250x325/products/112/453/01-02__73097.1606377896.jpg?c=1",
          alt: "Product 1",
        },
        {
          src: "https://cdn11.bigcommerce.com/s-vptmq0v2zd/images/stencil/250x325/products/112/456/01__40747.1606377897.jpg?c=1",
          alt: "Product 2",
        },
      ],
      price: 5.99,
      type: "Simple",
    },
    {
      title: "Organic Brown Rice",
      slug: "organic-brown-rice",
      long_description: "A staple for a balanced diet.",
      short_description: "Wholegrain organic brown rice.",
      images: [
        {
          src: "https://cdn11.bigcommerce.com/s-vptmq0v2zd/images/stencil/250x325/products/112/453/01-02__73097.1606377896.jpg?c=1",
          alt: "Product 1",
        },
        {
          src: "https://cdn11.bigcommerce.com/s-vptmq0v2zd/images/stencil/250x325/products/112/456/01__40747.1606377897.jpg?c=1",
          alt: "Product 2",
        },
      ],
      price: 8.99,
      type: "Simple",
    },
    {
      title: "Organic Chia Seeds",
      slug: "organic-chia-seeds",
      long_description: "Packed with omega-3 and fiber.",
      short_description: "Nutrient-rich organic chia seeds.",
      images: [
        {
          src: "https://cdn11.bigcommerce.com/s-vptmq0v2zd/images/stencil/250x325/products/112/453/01-02__73097.1606377896.jpg?c=1",
          alt: "Product 1",
        },
        {
          src: "https://cdn11.bigcommerce.com/s-vptmq0v2zd/images/stencil/250x325/products/112/456/01__40747.1606377897.jpg?c=1",
          alt: "Product 2",
        },
      ],
      price: 6.99,
      type: "Simple",
    },
    {
      title: "Organic Kale",
      slug: "organic-kale",
      long_description: "Loaded with vitamins and antioxidants.",
      short_description: "Fresh organic kale.",
      images: [
        {
          src: "https://cdn11.bigcommerce.com/s-vptmq0v2zd/images/stencil/250x325/products/112/453/01-02__73097.1606377896.jpg?c=1",
          alt: "Product 1",
        },
        {
          src: "https://cdn11.bigcommerce.com/s-vptmq0v2zd/images/stencil/250x325/products/112/456/01__40747.1606377897.jpg?c=1",
          alt: "Product 2",
        },
      ],
      price: 4.99,
      type: "Simple",
    },
    {
      title: "Organic Aloe Vera Gel",
      slug: "organic-aloe-vera",
      long_description: "Soothes skin and aids in healing.",
      short_description: "Pure organic aloe vera gel.",
      images: [
        {
          src: "https://cdn11.bigcommerce.com/s-vptmq0v2zd/images/stencil/250x325/products/112/453/01-02__73097.1606377896.jpg?c=1",
          alt: "Product 1",
        },
        {
          src: "https://cdn11.bigcommerce.com/s-vptmq0v2zd/images/stencil/250x325/products/112/456/01__40747.1606377897.jpg?c=1",
          alt: "Product 2",
        },
      ],
      price: 10.99,
      type: "Simple",
    },
  ],
  categories: [
    {
      name: "Electronics",
      slug: "electronics",
      image: "",
      banner: "",
      cover: "",
      parent: null,
    },
    {
      name: "Mobiles",
      slug: "mobiles",
      image: "",
      banner: "",
      cover: "",
      parent: null,
    },
    {
      name: "Laptops",
      slug: "laptops",
      image: "",
      banner: "",
      cover: "",
      parent: null,
    },
    {
      name: "Clothing",
      slug: "clothing",
      image: "",
      banner: "",
      cover: "",
      parent: null,
    },
    {
      name: "Men's Clothing",
      slug: "mens-clothing",
      image: "",
      banner: "",
      cover: "",
      parent: null,
    },
    {
      name: "Women's Clothing",
      slug: "womens-clothing",
      image: "",
      banner: "",
      cover: "",
      parent: null,
    },
    {
      name: "Books",
      slug: "books",
      image: "",
      banner: "",
      cover: "",
      parent: null,
    },
    {
      name: "Fiction",
      slug: "fiction",
      image: "",
      banner: "",
      cover: "",
      parent: null,
    },
    {
      name: "Non-Fiction",
      slug: "non-fiction",
      image: "",
      banner: "",
      cover: "",
      parent: null,
    },
    {
      name: "Toys",
      slug: "toys",
      image: "",
      banner: "",
      cover: "",
      parent: null,
    },
  ],
  brands: [
    {
      title: "",
      slug: "",
      image: "",
      product_count: 0,
    },
  ],
  tags: [
    {
      name: "",
      slug: "",
      product_count: 0,
    },
  ],
  reviews: [
    {
      user_id: "",
      comment: "",
      reply: [{}],
      image: "",
    },
  ],
  posts: [
    {
      title: "",
      slug: "",
      thumbnail: "",
      cover_image: "",
      long_description: "",
      short_description: "",
      category: [],
      tag: [],
      author: {},
    },
  ],
  languages: [
    {
      name: "English",
      code: "en",
      app_lang_code: "en",
      rtl: false,
      status: true,
      createdAt: "2019-01-20T12:13:20Z",
      updatedAt: "2019-01-20T12:13:20Z",
    },
    {
      name: "Bangla",
      code: "bd",
      app_lang_code: "bn",
      rtl: false,
      status: true,
      createdAt: "2019-02-17T06:35:37Z",
      updatedAt: "2019-02-18T06:49:51Z",
    },
    {
      name: "Arabic",
      code: "sa",
      app_lang_code: "ar",
      rtl: true,
      status: true,
      createdAt: "2019-04-28T18:34:12Z",
      updatedAt: "2019-04-28T18:34:12Z",
    },
  ],
};

module.exports = data;
