import Banner from "@/components/Banner";
import FeatureCards from "@/components/FeatureCards";
import LatestRooms from "@/components/LatestRooms";
import WhyChoose from "@/components/WhyChoose";

export default function Home() {
  return (
    <div>
      <Banner />
      <LatestRooms />
      <FeatureCards />
      <WhyChoose />
    </div>
  );
}
