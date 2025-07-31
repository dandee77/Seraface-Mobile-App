import { FlatList } from "react-native";
import ProductItem from "../Commons/ProductItem";

export default function ProductList({ data, contentInset }) {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <ProductItem {...item} />}
      keyExtractor={(item) => item.title}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: contentInset?.bottom || 8,
      }}
    />
  );
}
