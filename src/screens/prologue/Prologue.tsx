import { DeviceFrame } from "../components";
import { useNavigate } from "react-router-dom";
import { ImagePanel } from "./components";
import { useState } from "react";
import { TextButton } from "../components/button";
import PrologueContent from "./components/prologueText/PrologueContent";
import { useCreateAnimal } from "@/features/createAnimal/hooks/useCreateAnimal";

const PrologueScreen = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<1 | 2 | 3>(1);
  const [name, setName] = useState("");
  const [isNameValid, setIsNameValid] = useState(false);

  const { mutate: createAnimal, isPending } = useCreateAnimal();

  const startWithNewAnimal = () => {
    createAnimal(
      {
        name: name.trim(),
        type: "fox",
      },
      {
        onSuccess: () => {
          navigate("/");
        },
      }
    );
  };

  const goToNextPage = () => {
    setPage((prev) => {
      if (prev === 1) return 2;
      if (prev === 2) return 3;
      return 3;
    });
  };

  const handleClick = () => {
    if (page < 3) {
      goToNextPage();
      return;
    }

    if (!isNameValid || isPending) {
      return;
    }

    startWithNewAnimal();
  };

  const getButtonText = () => {
    switch (page) {
    case 1:
      return "다음";
    case 2:
      return "좋아";
    case 3:
      return isPending ? "시작하는 중..." : "여행 시작하기";
    default:
      return "";
    }
  };

  return (
    <DeviceFrame>
      <ImagePanel page={page} />

      <div className="flex flex-1 flex-col py-2 min-h-37.5 overflow-scroll">
        <PrologueContent
          key={page}
          page={page}
          name={name}
          onChangeName={setName}
          onValidNameChange={setIsNameValid}
        />
      </div>

      <TextButton
        text={getButtonText()}
        onClick={handleClick}
        disabled={(page === 3 && !isNameValid) || isPending}
      />
    </DeviceFrame>
  );
};

export default PrologueScreen;