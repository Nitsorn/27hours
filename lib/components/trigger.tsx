import { TbPlayerStop, TbPlayerStopFilled } from "react-icons/tb";

interface Props {
  setIsPopupOpen: (value: boolean) => void;
  onStopRecording: () => void;
  isRecording: boolean;
}

export const Trigger = (props: Props) => {
  if (props.isRecording) {
    return (
      <button onClick={props.onStopRecording} className="fixed bottom-5 right-5 rounded-full w-14 h-14 hover:scale-105 ease-in-out duration-75 bg-black text-red-500 flex items-center justify-center">
        <TbPlayerStopFilled size={40} />
      </button>
    )
  }

  return (
    <button onClick={() => props.setIsPopupOpen(true)} className="fixed bottom-5 right-5 rounded-full w-14 h-14 hover:scale-105 ease-in-out duration-75">
      <svg className="w-full h-full" width="226" height="226" viewBox="0 0 226 226" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="226" height="226" rx="56" fill="#141414"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M103.57 84.3359C109.589 88.7787 111.034 95.6688 107.244 101.843C106.058 103.776 103.096 107.871 100.664 110.943C98.2317 114.015 96.2413 116.84 96.2413 117.22C96.2413 117.601 101.711 117.911 108.396 117.911C115.082 117.911 120.529 118.249 120.503 118.664C120.477 119.079 119.674 120.999 118.721 122.932L116.989 126.447L96.4854 126.719C85.2095 126.869 75.9899 126.643 76 126.217C76.0091 125.791 81.249 118.89 87.6446 110.881C94.0402 102.872 99.275 95.8245 99.277 95.2199C99.278 94.6153 98.3866 93.3189 97.2947 92.3387C94.7361 90.043 91.6568 90.8293 87.3346 94.8815C83.5666 98.4144 82.2214 98.2648 79.137 93.9696L76.9755 90.9589L80.7182 87.901C82.7765 86.2178 85.8578 84.132 87.5656 83.2654C91.6558 81.1896 100.069 81.752 103.57 84.3359ZM155 93.5579C155.006 93.9726 150.333 104.36 144.618 116.641L134.226 138.973L128.415 138.986L122.604 139L124.87 134.23C126.115 131.607 129.984 123.682 133.466 116.62C136.948 109.56 139.797 103.345 139.797 102.812C139.797 102.279 137.275 101.843 134.191 101.843C128.859 101.843 128.485 102.014 126.494 105.358C124.557 108.615 124.039 108.873 119.438 108.873C116.708 108.873 114.474 108.632 114.474 108.337C114.474 106.992 119.979 97.0888 121.853 95.0642C123.847 92.9091 124.663 92.8047 139.467 92.8047C148.005 92.8047 154.995 93.1431 155 93.5579Z" fill="white"/>
      </svg>
    </button>
  )
}