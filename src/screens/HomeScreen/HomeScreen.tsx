import SolisAppHeader from "../../components/SolisAppHeader/SolisAppHeader";
import MyPortfolio from "../../components/MyPortfolio/MyPortfolio";

const HomeScreen = () => {
  return (
    <div className="h-100">
      <SolisAppHeader />
      <div className="d-flex flex-column align-items-center justify-content-center">
        <span
          className="text-center"
          style={{ opacity: 0.5, fontSize: "12px" }}
        >
          Powered by{" "}
          <a target="_blank" href="https://www.meteora.ag">
            Meteora
          </a>{" "}
          and{" "}
          <a href="https://jup.ag" target="_blank">
            Jupiter
          </a>
        </span>
      </div>
      <MyPortfolio />
    </div>
  );
  // return <TabNavigator />;
};

export default HomeScreen;
