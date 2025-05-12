import DiscountSection from "./Discount";
import Header from "./Header";
import HowItWorks from "./HowItWorks";
import KeyFeatures from "./KeyFeatures";
import ReviewSection from "./ReviewSection";
import "animate.css";
import Statistics from "./Statistics";

const Home = () => {
  return (
    <div>
      <div className="min-h-[calc(100vh-300px)] my-10">
        <Header />
        <Statistics />
        <KeyFeatures />
        <DiscountSection />
        <HowItWorks />
        <ReviewSection />
      </div>
    </div>
  );
};

export default Home;
