import DiscountSection from "./Discount";
import Header from "./Header";
import HowItWorks from "./HowItWorks";
import KeyFeatures from "./KeyFeatures";
import ReviewSection from "./ReviewSection";
import "animate.css";

const Home = () => {
  return (
    <div>
      <Header />
      <KeyFeatures />
      <DiscountSection />
      <HowItWorks />
      <ReviewSection />
    </div>
  );
};

export default Home;
