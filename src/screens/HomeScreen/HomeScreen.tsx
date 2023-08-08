import SolisAppHeader from "../../components/SolisAppHeader/SolisAppHeader";
import MyPortfolio from "../../components/MyPortfolio/MyPortfolio";

const HomeScreen = () => {
  return (
    <div className="h-100">
      <SolisAppHeader />
      <MyPortfolio />
    </div>
  );
  // return <TabNavigator />;
};

export default HomeScreen;
