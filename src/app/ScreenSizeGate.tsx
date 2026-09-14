import UnsupportedScreen from "@/screens/unsupported";
import { useEffect, useState } from "react";

const MIN_WIDTH = 320;
const MIN_HEIGHT = 568;

function getScreenStatus() {
  const root = document.getElementById("root");

  if (!root) {
    return {
      widthTooSmall: false,
      heightTooSmall: false,
    };
  }

  return {
    widthTooSmall: root.clientWidth < MIN_WIDTH,
    heightTooSmall: root.clientHeight < MIN_HEIGHT,
  };
}

function ScreenSizeGate({ children }: { children: React.ReactNode }) {
  const [screenStatus, setScreenStatus] = useState({
    widthTooSmall: false,
    heightTooSmall: false,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenStatus(getScreenStatus());
    };

    handleResize();

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