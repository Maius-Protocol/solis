import { Button, Card, Space, Typography } from "antd";
import { useNavigation } from "@react-navigation/native";
import { RouteNames } from "../../util/routes";

const SolisActionsCard = () => {
  const { navigate } = useNavigation();
  return (
    <div className="w-100">
      <Card
        bodyStyle={{ padding: "16px 0px" }}
        style={{ width: "100%", borderRadius: "24px" }}
      >
        <div className="d-flex align-items-center justify-content-between px-2">
          <Button
            onClick={() => {
              navigate(RouteNames.DEPOSIT);
            }}
            style={{ height: 80 }}
            type="text"
          >
            <div>
              <lord-icon
                trigger="loop"
                src="https://cdn.lordicon.com/rzsdhkun.json"
                style={{ width: "36px", height: "36px" }}
              />
            </div>
            <div>Deposit</div>
          </Button>
          <Button
            onClick={() => {
              navigate(RouteNames.WITHDRAWAL);
            }}
            style={{ height: 80 }}
            type="text"
          >
            <div>
              <lord-icon
                trigger="loop"
                src="https://cdn.lordicon.com/jsoeastu.json"
                style={{ width: "36px", height: "36px" }}
              />
            </div>
            <div>Withdrawal</div>
          </Button>
          <Button
            onClick={() => {
              navigate(RouteNames.SEND);
            }}
            style={{ height: 80 }}
            type="text"
          >
            <div>
              <lord-icon
                trigger="loop"
                src="https://cdn.lordicon.com/zmkotitn.json"
                style={{ width: "36px", height: "36px" }}
              />
            </div>
            <div>Send</div>
          </Button>
          <Button
            onClick={() => {
              navigate(RouteNames.BUY);
            }}
            style={{ height: 80 }}
            type="text"
          >
            <div>
              <lord-icon
                trigger="loop"
                src="https://cdn.lordicon.com/medpcfcy.json"
                style={{ width: "36px", height: "36px" }}
              />
            </div>
            <div>Buy NFTs</div>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SolisActionsCard;
