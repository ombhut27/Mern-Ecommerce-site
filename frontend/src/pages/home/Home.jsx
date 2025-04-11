
import Banner from "../home/Banner";
import Category from "./Catagory";
import Trendingproduct from "../shop/Trendingproduct";
import Collection from "./Collection";
import Social from "./social";
import BlogSection from "./BlogSection";


const Home = () => {
  return (
    <div>

      
      <main>
        <Banner></Banner>
              <Category></Category>
              
              <Collection></Collection>
              <Trendingproduct></Trendingproduct>
              <Social></Social>
              <BlogSection></BlogSection>
      </main>
      

    </div>
  );
};

export default Home;
