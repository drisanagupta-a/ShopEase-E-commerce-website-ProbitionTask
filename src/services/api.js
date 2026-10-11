const API_URL = "https://dummyjson.com";
const USD_TO_INR = 85;

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

function convertProductPrice(product) {
  return {
    ...product,
    price: Number((product.price * USD_TO_INR).toFixed(2))
  };
}

export async function getProducts() {
  const response = await fetch(`${API_URL}/products?limit=100`);

  if (!response.ok) {
    throw new Error("Unable to load products. Please try again.");
  }

  const data = await response.json();

  return data.products
    .filter((product) =>
      Object.values(categoryMap)
        .flat()
        .includes(product.category)
    )
    .map(convertProductPrice);
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

  return convertProductPrice(product);
}

export function getShopEaseCategory(productCategory) {
  for (const [category, categories] of Object.entries(categoryMap)) {
    if (categories.includes(productCategory)) {
      return category;
    }
  }

  return "Other";
}