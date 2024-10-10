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
      title: "Example product",
      slug: "example-product",
      long_description: "example-product",
      short_description: "example-product",
      price: 56,
      discount_price: 0,
      type: "Simple",
    },
    {
      title: "Example product",
      slug: "example-product-1",
      long_description: "example-product",
      short_description: "example-product",
      price: 56,
      discount_price: 0,
      type: "Variable",
    },
  ],
  categories: [
    {
      title: "category name",
      slug: "category-name",
      image: "",
      cover_image: "",
      banner_image: "",
      product_count: 0,
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
      author: {}
    }
  ]
};

module.exports = data;
