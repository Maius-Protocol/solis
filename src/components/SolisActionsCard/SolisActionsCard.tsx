import { Button, Card, Space, Typography } from "antd";

const SolisActionsCard = () => {
  return (
    <div className="w-100">
      <Card
        bodyStyle={{ padding: "16px 0px" }}
        style={{ width: "100%", borderRadius: "24px" }}
      >
        <div className="d-flex align-items-center justify-content-between px-2">
          <Button style={{ height: 80 }} type="text">
            <div>
              <lord-icon
                trigger="loop"
                src="https://cdn.lordicon.com/rzsdhkun.json"
                style={{ width: "36px", height: "36px" }}
              />
            </div>
            <div>Deposit</div>
          </Button>
          <Button style={{ height: 80 }} type="text">
            <div>
              <lord-icon
                trigger="loop"
                src="https://cdn.lordicon.com/jsoeastu.json"
                style={{ width: "36px", height: "36px" }}
              />
            </div>
            <div>Withdrawl</div>
          </Button>
          <Button style={{ height: 80 }} type="text">
            <div>
              <lord-icon
                trigger="loop"
                src="https://cdn.lordicon.com/zmkotitn.json"
                style={{ width: "36px", height: "36px" }}
              />
            </div>
            <div>Transfer</div>
          </Button>
          <Button style={{ height: 80 }} type="text">
            <div>
              <lord-icon
                trigger="loop"
                src="https://cdn.lordicon.com/medpcfcy.json"
                style={{ width: "36px", height: "36px" }}
              />
            </div>
            <div>Buy</div>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SolisActionsCard;
