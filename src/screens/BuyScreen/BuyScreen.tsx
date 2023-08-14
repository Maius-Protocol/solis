import ListCollections from "../../components/Collection/ListCollections";
import { useNavigation } from "@react-navigation/native";
import { RouteNames } from "../../util/routes";

const BuyScreen = () => {
  const { navigate } = useNavigation();
  const handlePress = (slug: string) => {
    navigate(RouteNames.DETAIL_COLLECTION, {
      slug: slug,
    });
  };
  return <ListCollections onPress={handlePress} />;
};

export default BuyScreen;
