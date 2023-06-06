const coalesceSemanticReleaseConfig = {
  branches: ["main"],
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "angular",
        releaseRules: [
          { type: "refactor", release: "patch" },
          { type: "chore", release: false },
          { type: "perf", release: "patch" },
        ],
      },
    ],
    [
      "@semantic-release/release-notes-generator",
      {
        writerOpts: {
          transform: (commit) => {
            switch (commit.type) {
              case "feat":
                commit.type = "Features";
                break;
              case "fix":
                commit.type = "Bug Fixes";
                break;
              case "refactor":
              case "style":
              case "perf":
                commit.type = "Tweaks";
                break;
              case "revert":
                commit.type = "Reverts";
                break;
              case "build":
              case "chore":
              case "ci":
              case "docs":
              case "test":
                commit.type = "Others";
                break;
              default:
                return;
            }

            commit.shortHash = commit.hash.substring(0, 7);

            return commit;
          },
        },
      },
    ],
    [
      "@semantic-release/changelog",
      {
        changelogFile: "CHANGELOG.md",
      },
    ],
    [
      "@semantic-release/npm",
      {
        npmPublish: true,
        tarballDir: "dist",
      },
    ],
    "@semantic-release/gitlab",
    [
      "@semantic-release/git",
      {
        assets: ["CHANGELOG.md", "package.json"],
        message: "${nextRelease.version}\n\n${nextRelease.notes}",
      },
    ],
  ],
};

module.exports = coalesceSemanticReleaseConfig;
