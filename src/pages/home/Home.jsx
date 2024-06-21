import { useContext } from "react";
import Category from "../../components/category/Category";
import HeroSection from "../../components/heroSection/HeroSection";
import HomePageProductCard from "../../components/homePageProductCard/HomePageProductCard";
import Layout from "../../components/layout/Layout";
import Testimonial from "../../components/testimonial/Testimonial";
import Track from "../../components/track/Track";
import MyContext from "../../context/MyContext";
import { ThreeDots } from "react-loader-spinner";

const HomePage = () => {
  // const context = useContext(MyContext);
  // const { name } = context;
  // const { age } = context;
  return (
    <Layout>
      <HeroSection></HeroSection>
      <Category></Category>
      <HomePageProductCard></HomePageProductCard>
      <Track></Track>
      <Testimonial></Testimonial>
      {/* <div>{name}</div>
      <div>{age}</div> */}
    </Layout>
  );
};

export default HomePage;
