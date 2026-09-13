# Known Issues — MacMint Web App

## ISSUE-001: Three.js Canvas Memory Cleanup
- **Description**: Rapidly navigating back and forth to home page could leave uncollected WebGL contexts.
- **Severity**: Low.
- **Workaround**: Added `renderer.dispose()` and scene geometry disposals in `useEffect` cleanup hook.
- **Status**: FIXED
