---
name: GitHub CLI authorization
description: Distinguishes a configured Git remote from usable command-line authentication in this workspace.
---

A configured GitHub remote and upstream do not guarantee that shell `git push` has usable credentials. The Replit GitHub App integration can be connected while command-line Git still rejects authentication.

**Why:** The connector's authenticated API access is separate from Git's credential helper.

**How to apply:** Test remote access before relying on shell push. If it fails, use the authorized GitHub connector for the requested repository update and verify the local and remote commit IDs match; do not ask the user to paste credentials.