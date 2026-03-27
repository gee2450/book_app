import { useLocation, useNavigate } from "react-router-dom";
import View from "./View";
import { useList } from "./useList";
import type { TabId } from "../main/Record";

export default function Screen() {
  const navigate = useNavigate();
  const location = useLocation() as { state?: { scope?: TabId } };

  const { items, isLoading, hasMore, loadMore } = useList(location.state?.scope || "allJourney");
  
  return (
    <View
      onBack={() => navigate(-1)}
      items={items}
      isLoading={isLoading}
      hasMore={hasMore}
      loadMore={loadMore}
      onItemClick={(item) => {
        navigate(`/record/${item.id}`);
      }}
    />
  );
}
