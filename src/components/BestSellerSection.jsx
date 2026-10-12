import ProductRail from "./ProductRail";

const BestSellerSection = ({ category }) => {
  return (
    <section className={`bestSellerSection ${category.color}`}>
      <div className="bestSellerHeader">
        <h2>{category.name}</h2>
      </div>

      <ProductRail category={category.name} />
    </section>
  );
};

export default BestSellerSection;