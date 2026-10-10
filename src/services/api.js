const API_URL = "https://dummyjson.com";


const categoryMap = {
  Electronics: [
    "smartphones",
    "laptops",
    "tablets",
    "mobile-accessories"
  ],

  Fashion: [
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "womens-bags",
    "womens-dresses",
    "womens-shoes",
    "womens-watches",
    "womens-jewellery",
    "sunglasses",
    "tops"
  ],

  Beauty: [
    "beauty",
    "fragrances",
    "skin-care"
  ],

  "Home & Living": [
    "furniture",
    "home-decoration",
    "kitchen-accessories"
  ]
};


export async function getProducts() {
  const response = await fetch(`${API_URL}/products?limit=100`);

  if (!response.ok) {
    throw new Error("Unable to load products. Please try again.");
  }

  const data = await response.json();

  // Keep only products belonging to ShopEase categories
  return data.products.filter((product) =>
    Object.values(categoryMap)
      .flat()
      .includes(product.category)
  );
}


export async function getProduct(id) {
  const response = await fetch(`${API_URL}/products/${id}`);

  if (!response.ok) {
    throw new Error("Unable to load product details.");
  }

  const product = await response.json();


  const isAllowed = Object.values(categoryMap)
    .flat()
    .includes(product.category);

  if (!isAllowed) {
    throw new Error("This product is not available in ShopEase.");
  }

  return product;
}


export function getShopEaseCategory(productCategory) {
  for (const [category, categories] of Object.entries(categoryMap)) {
    if (categories.includes(productCategory)) {
      return category;
    }
  }

  return "Other";
}