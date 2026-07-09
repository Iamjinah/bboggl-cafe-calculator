#!/bin/bash
export PATH="/Users/apple/.local/tools/node-v24.18.0-darwin-x64/bin:$PATH"
cd "$(dirname "$0")/.."
exec npm run dev -- --port 5173 --strictPort
