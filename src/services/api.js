const API_URL = "https://dummyjson.com";

export async function getProducts() {
  const response = await fetch(`${API_URL}/products?limit=100`);

  if (!response.ok) {
    throw new Error("Unable to load products.");
  }

  const data = await response.json();

  return data.products;
}

export async function getProduct(id) {
  const response = await fetch(`${API_URL}/products/${id}`);

  if (!response.ok) {
    throw new Error("Unable to load product details.");
  }

  return response.json();
}