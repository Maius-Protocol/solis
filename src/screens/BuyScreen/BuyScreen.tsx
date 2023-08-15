import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Input } from "antd";
import DetailCollectionScreen from "../CollectionScreen/DetailCollection";
const { Search } = Input;

const BuyScreen = () => {
  const [url, setUrl] = useState("");
  const onSearch = (value: string) => {
    setUrl(value);
  };

  return (
    <>
      <div className="p-2">
        <Search
          size="large"
          placeholder="Enter Tensor Collection URL"
          onSearch={onSearch}
          enterButton
        />
      </div>
      <DetailCollectionScreen url={url} />
    </>
  );
  // const handlePress = (slug: string) => {
  //   navigate(RouteNames.DETAIL_COLLECTION, {
  //     slug: slug,
  //   });
  // };
  // return <ListCollections onPress={handlePress} />;
};

export default BuyScreen;
