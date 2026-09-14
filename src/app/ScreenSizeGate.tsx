import UnsupportedScreen from "@/screens/unsupported";
import { useEffect, useState } from "react";

const MIN_WIDTH = 320;
const MIN_HEIGHT = 568;

function getScreenStatus() {
  return {
    widthTooSmall: window.innerWidth < MIN_WIDTH,
    heightTooSmall: window.innerHeight < MIN_HEIGHT,
  };
}

function ScreenSizeGate({ children }: { children: React.ReactNode }) {
  const [screenStatus, setScreenStatus] = useState(getScreenStatus);

  useEffect(() => {
    const handleResize = () => {
      setScreenStatus(getScreenStatus());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { widthTooSmall, heightTooSmall } = screenStatus;

  if (widthTooSmall || heightTooSmall) {
    return (
      <UnsupportedScreen
        widthTooSmall={widthTooSmall}
        heightTooSmall={heightTooSmall}
      />
    );
  }

  return <>{children}</>;
}

export default ScreenSizeGate;