import { useCurrentAnimal } from "@/entities/animal/data/queries";
import { Navigate } from "react-router-dom";

function StartGate() {
  const { data, isLoading } = useCurrentAnimal();

  if (isLoading) {
    return <div className="min-h-dvh flex items-center justify-center">로딩중...</div>;
  }

  if (data) {
    return <Navigate to="/home" replace />;
  }

  return <Navigate to="/prologue" replace />;
}

export default StartGate;