import PrologueText from "./PrologueText";
import NameInput from "./NameInput";

type Props = {
  page: 1 | 2 | 3;
  name: string;
  onChangeName: (value: string) => void;
  onValidNameChange?: (isValid: boolean) => void;
};

const PrologueContent = ({
  page,
  name,
  onChangeName,
  onValidNameChange,
}: Props) => {
  if (page === 1) {
    return (
      <div className="flex flex-1 flex-col justify-center">
        <PrologueText
          lines={[
            "오래된 책장에서",
            "특별한 책을 발견했어요",
            "",
            "책을 읽기 시작하자",
            "이야기들이 모여...",
          ]}
        />
      </div>
    );
  }

  if (page === 2) {
    return (
      <div className="flex flex-1 flex-col justify-center">
        <PrologueText
          lines={[
            "작은 알이 되었어요..!",
            "",
            "책을 읽어 알을 성장시킬 수 있어요",
            "",
            "이 친구의 이름을 정해줄까요?",
          ]}
        />
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center gap-4 text-center">
      <NameInput
        value={name}
        maxLength={10}
        placeholder="이름 입력하기"
        onChange={onChangeName}
        onValidChange={onValidNameChange}
      />

      <PrologueText
        lines={[
          "이름은 10자 이내의",
          "한글, 영문으로 지어주세요",
          "",
          "이름은 나중에 수정할 수 없으니,",
          "신중하게 지어주세요!",
        ]}
      />
    </div>
  );
};

export default PrologueContent;