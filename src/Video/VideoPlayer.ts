import "./video-player.css";
import { Button, PlayButton } from "../Button";

type TCPlayer = (id: string, options: any) => TCPlayer;

export type PlayerOptions = {
  appID: string;
  fileID: string;
  width: string | number;
  height: string | number;
  psign: string;
  sources?: Array<{ src: string; type: string }>;
  controls?: boolean;
  poster?: string;
  autoplay?: boolean;
  playbackRates?: number[];
  loop?: boolean;
  muted?: boolean;
  preload?: "auto" | "meta" | "none";
  swf?: string;
  posterImage?: boolean;
  bigPlayButton?: boolean;
  language?: "zh-CN" | "en";
  languages?: Record<string, any>;
  controlBar?: ControlBarOptions;
  reportable?: boolean;
  hlsConfig?: Record<string, any>;
  webrtcConfig?: ConnectionOptions;
  plugins?: PluginOptions;
};

type PluginOptions = {
  ContinuePlay?: {
    auto?: boolean;
    text?: string;
    btnText?: string;
  };
  VttThumbnail?: {
    vttUrl: string;
    basePath?: string;
    imgUrl?: string;
  };
  ProgressMarker?: boolean;
  DynamicWatermark?: {
    content: string;
    speed?: number;
  };
  ContextMenu?: {
    mirror?: boolean;
    statistic?: boolean;
    levelSwitch?: {
      open?: boolean;
      switchingText?: string;
      switchedText?: string;
      switchErrorText?: string;
    };
  };
};

type ControlBarOptions = {
  playToggle?: boolean;
  progressControl?: boolean;
  volumePanel?: boolean;
  currentTimeDisplay?: boolean;
  durationDisplay?: boolean;
  timeDivider?: boolean;
  playbackRateMenuButton?: boolean;
  fullscreenToggle?: boolean;
  qualitySwitcherMenuButton?: boolean;
};

type ConnectionOptions = {
  connectRetryCount?: number;
  connectRetryDelay?: number;
  receiveVideo?: boolean;
  receiveAudio?: boolean;
  showLog?: boolean;
};

type PlayerEventType =
  | "play"
  | "playing"
  | "loadstart"
  | "durationchange"
  | "loadedmetadata"
  | "loadeddata"
  | "progress"
  | "canplay"
  | "canplaythrough"
  | "error"
  | "pause"
  | "ratechange"
  | "seeked"
  | "seeking"
  | "timeupdate"
  | "volumechange"
  | "waiting"
  | "ended"
  | "resolutionswitching"
  | "resolutionswitched"
  | "fullscreenchange"
  | "webrtcevent"
  | "webrtcstats";

export class VideoPlayer {
  public player: any;
  public button: Button;
  public options: PlayerOptions;

  constructor(options: PlayerOptions) {
    this.player = {};
    this.button = new Button(PlayButton, () => {
      this.play();
    });
    this.options = options;
  }

  public init(elementId: string, player: TCPlayer) {
    const element = document.getElementById(elementId);
    if (!element) return;
    const { width, height } = this.options;
    element.innerHTML = `
			<div>
				<video id=${elementId} width="${width}" height="${height}" preload="auto" playsinline webkit-playsinline></video>
			</div>
		`;
    this.player = player(elementId, this.options);
    this.appendButton();
  }
  public play(): void {
    this.player.play();
  }

  public getPercentageOfVideo(): string {
    return ((this.player.currentTime() / this.player.duration()) * 100).toFixed(
      2
    );
  }

  public on(eventType: PlayerEventType, callback: Function): void {
    this.player.on(eventType, callback);
  }

  private appendButton(): void {
    const vjsButtonIcon = document.querySelector(".vjs-button-icon");
    if (vjsButtonIcon) {
      const svgElement = vjsButtonIcon.querySelector("svg");
      if (svgElement) {
        vjsButtonIcon.removeChild(svgElement);
      }
      vjsButtonIcon.appendChild(this.button.render());
    }
  }
}
