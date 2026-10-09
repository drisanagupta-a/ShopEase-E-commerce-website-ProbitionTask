import Hero from "../components/Hero.jsx";
import PromoBanner from "../components/PromoBanner.jsx";
import BestSellerSection from "../components/BestSellerSection.jsx";
import Footer from "../components/Footer.jsx";
import {ArrowUpRight, Check, ShoppingBag, Sparkles} from "lucide-react";

const categoryData = [
  {
    name: "Electronics",
    label: "Tech",
    color: "electronicsColor"
  },
  {
    name: "Fashion",
    label: "Style",
    color: "fashionColor"
  },
  {
    name: "Beauty",
    label: "Beauty",
    color: "beautyColor"
  },
  {
    name: "Home & Living",
    label: "Home",
    color: "homeColor"
  }
];

const Home = () => {
  return (
    <>
      <main>
        <Hero />

        <PromoBanner />

        <section className="bestSellerIntro">
          <div className="sectionHeading">
            <div className="sectionMeta">
              <span className="sectionNumber">01</span>
              <span className="sectionLabel">BEST SELLERS</span>
            </div>

            <h2>
              WHAT PEOPLE
              <br />
              ARE LOVING.
            </h2>

            <p>
              Popular picks from every corner of ShopEase.
              Discover products people are adding to their
              carts right now.
            </p>
          </div>
        </section>

        <section className="bestSellerSections">
          {categoryData.map((category, index) => (
            <BestSellerSection
              key={category.name}
              category={category}
              index={index}
            />
          ))}
        </section>

        <section className="shopEaseEdit">
          <div className="editHeader">
            <div className="sectionMeta">
              <span className="sectionNumber">02</span>
              <span className="sectionLabel">THE SHOP EASE EDIT</span>
            </div>
          </div>

          <div className="editContent">
            <div className="editIcon">
              <Sparkles size={28} />
            </div>

            <h2>
              EVERYDAY
              <br />
              <span>THINGS, BETTER.</span>
            </h2>

            <p>
              From clever gadgets and easy essentials to
              things that simply make your day better,
              discover our latest picks.
            </p>

            <a href="/products" className="editButton">
              Explore the collection
              <ArrowUpRight size={17} />
            </a>
          </div>
        </section>

        <section className="trendingSection">
          <div className="trendingHeader">
            <div className="sectionMeta">
              <span className="sectionNumber">03</span>
              <span className="sectionLabel">TRENDING NOW</span>
            </div>

            <h2>WORTH A LOOK.</h2>
          </div>

          <div className="trendingGrid">
            <div className="trendingItem trendingItemOne">
              <ShoppingBag size={26} />
              <span>EVERYDAY ESSENTIALS</span>
              <strong>Things you'll actually use.</strong>
            </div>

            <div className="trendingItem trendingItemTwo">
              <Sparkles size={26} />
              <span>NEW FINDS</span>
              <strong>Fresh additions worth discovering.</strong>
            </div>

            <div className="trendingItem trendingItemThree">
              <Check size={26} />
              <span>SMART PICKS</span>
              <strong>Useful upgrades for everyday life.</strong>
            </div>
          </div>
        </section>

        <section className="whySection">
          <div className="whyHeader">
            <div className="sectionMeta">
              <span className="sectionNumber">04</span>
              <span className="sectionLabel">WHY SHOEASE</span>
            </div>

            <h2>
              SHOPPING THAT
              <br />
              FEELS SIMPLE.
            </h2>
          </div>

          <div className="whyGrid">
            <div className="whyItem">
              <span>01</span>
              <h3>Curated choices</h3>
              <p>
                Discover useful and interesting products
                without endless scrolling.
              </p>
            </div>

            <div className="whyItem">
              <span>02</span>
              <h3>Easy discovery</h3>
              <p>
                Browse categories and find something that
                fits your everyday needs.
              </p>
            </div>

            <div className="whyItem">
              <span>03</span>
              <h3>Made for everyone</h3>
              <p>
                Electronics, fashion, beauty and home
                essentials in one place.
              </p>
            </div>
          </div>
        </section>

        <section className="newsletterSection">
          <div className="newsletterContent">
            <span className="sectionLabel">STAY IN THE LOOP</span>

            <h2>
              GOOD FINDS,
              <br />
              STRAIGHT TO YOU.
            </h2>

            <p>
              Get updates about new products, popular picks
              and things worth checking out.
            </p>

            <form className="newsletterForm">
              <input
                type="email"
                placeholder="Your email address"
                aria-label="Email address"
              />

              <button type="submit">
                Subscribe
                <ArrowUpRight size={17} />
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Home;