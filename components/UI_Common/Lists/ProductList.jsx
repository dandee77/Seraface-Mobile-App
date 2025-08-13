import { FlatList } from "react-native";
import ProductItem from "../Commons/ProductItem";

export default function ProductList({ data, contentInset }) {
  return (
    <FlatList
      data={data}
      renderItem={({ item, index }) => <ProductItem {...item} />}
      keyExtractor={(item, index) => `product-${index}`}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: contentInset?.bottom || 8,
      }}
    />
  );
}
