# @542.digital/tencent-video-player

This package provides a wrapper around the Tencent TCPlayer library, making it easy to incorporate a feature-rich video player into your JavaScript or TypeScript application.

## Installation

```bash
npm install @542.digital/tencent-video-player
OR
yarn add @542.digital/tencent-video-player
```

## Usage

```typescript jsx
import { VideoPlayer } from "@542.digital/tencent-video-player";

// Create a new player instance with your options
const player = new VideoPlayer(options);

// Add the player to your HTML
<audio id="player-container-id"></audio>;

player.init("player-container-id", window.TCPlayer);
```

## API

`constructor(options: PlayerOptions)`

- Description: Creates a new VideoPlayer instance.
- Parameters:
  - options: The options for the video player (PlayerOptions).
- Returns: A new `VideoPlayer` instance.

`init(elementId: string)`

- Description: Adds the video player to the DOM inside the specified element.
- Parameters:
  - elementId: The ID of the HTML Video element in which to insert the video player (string).
    - **Must be a valid HTML Video element.**
  - player: The TCPlayer instance to use (TCPlayer).
    - **Optional.** If not provided, a new TCPlayer instance will be created.
- Returns: `void`

`play()`

- Description: Starts or resumes video playback.
- Parameters: None
- Returns: `void`

`getPercentageOfVideo()`

- Description: Returns the percentage of the video that has been played.
- Parameters: None
- Returns: The percentage of the video that has been played (`string`).

`on(eventType: PlayerEventType, callback: Function)`

- Description: Adds an event listener to the video player.
- Parameters:
  - eventType: The type of the event (PlayerEventType). [All event types here](https://www.tencentcloud.com/document/product/266/39105#events).
  - callback: The function to call when the event occurs (Function).
- Returns: `void`

Examples

```typescript jsx
// Create a new player
const options = {
  appID: "your-app-id",
  fileID: "your-file-id",
  psign: "your-psign",
  width: "640",
  height: "360",
  // ... other options
};
const player = new VideoPlayer(options);
<video id="player-container-id"></video>;
// Add the player to your HTML
player.init("player-container-id", TCPlayer);

// Play the video
player.play();

// Log the percentage of the video that has been played every second
setInterval(() => {
  console.log(player.getPercentageOfVideo());
}, 1000);

// Listen for the 'play' event
player.on("play", () => {
  console.log("Video playback started");
});

player.on("timeupdate", () => {
  console.log(player.getPercentageOfVideo());
});
```

## License

This package is licensed under the MIT License - see the LICENSE.md file for details.

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use SemVer for versioning. For the versions available, see the tags on this repository.
