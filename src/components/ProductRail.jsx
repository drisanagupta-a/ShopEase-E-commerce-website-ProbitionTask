import ProductCard from "./ProductCard";

const products = {
  Electronics: [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 2499,
      rating: 4.6,
      category: "Electronics",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 3299,
      rating: 4.5,
      category: "Electronics",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      name: "Wireless Speaker",
      price: 1899,
      rating: 4.4,
      category: "Electronics",
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 4,
      name: "Digital Camera",
      price: 7499,
      rating: 4.7,
      category: "Electronics",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80"
    }
  ],

  Fashion: [
    {
      id: 5,
      name: "Classic Sneakers",
      price: 2799,
      rating: 4.6,
      category: "Fashion",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 6,
      name: "Everyday Jacket",
      price: 3499,
      rating: 4.5,
      category: "Fashion",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 7,
      name: "Minimal Backpack",
      price: 1999,
      rating: 4.4,
      category: "Fashion",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 8,
      name: "Classic Sunglasses",
      price: 1499,
      rating: 4.3,
      category: "Fashion",
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80"
    }
  ],

  Beauty: [
    {
      id: 9,
      name: "Skincare Set",
      price: 1599,
      rating: 4.7,
      category: "Beauty",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 10,
      name: "Face Serum",
      price: 899,
      rating: 4.6,
      category: "Beauty",
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 11,
      name: "Beauty Essentials",
      price: 1299,
      rating: 4.5,
      category: "Beauty",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 12,
      name: "Body Care Set",
      price: 1099,
      rating: 4.4,
      category: "Beauty",
      image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=80"
    }
  ],

  "Home & Living": [
    {
      id: 13,
      name: "Indoor Plant",
      price: 699,
      rating: 4.6,
      category: "Home & Living",
      image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 14,
      name: "Ceramic Vase",
      price: 899,
      rating: 4.5,
      category: "Home & Living",
      image: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 15,
      name: "Table Lamp",
      price: 1299,
      rating: 4.4,
      category: "Home & Living",
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 16,
      name: "Decor Cushion",
      price: 599,
      rating: 4.3,
      category: "Home & Living",
      image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80"
    }
  ]
};

const ProductRail = ({category}) => {
  const categoryProducts = products[category] || [];

  return (
    <div className="productRail">
      {categoryProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
};

export default ProductRail;