<details>
<summary>MCP Gateway</summary>

- ✓ **startup** MCPG Gateway version: v0.1.4
- ✓ **startup** Starting MCPG with config: stdin, listen: 0.0.0.0:80, log-dir: /tmp/gh-aw/mcp-logs/
- ✓ **startup** Loaded 2 MCP server(s): [github safeoutputs]
- ✓ **backend**
  ```
  Successfully connected to MCP backend server, command=docker
  ```
- 🔍 rpc **github**→`tools/list`
- 🔍 rpc **safeoutputs**→`tools/list`
- 🔍 rpc **safeoutputs**←`resp` `{"jsonrpc":"2.0","id":2,"result":{"tools":[{"name":"create_issue","description":"Create a new GitHub issue for tracking bugs, feature requests, or tasks. Use this for actionable work items that need assignment, labeling, and status tracking. For reports, announcements, or status updates that don't require task tracking, use create_discussion instead. CONSTRAINTS: Maximum 10 issue(s) can be created. Title will be prefixed with \"[star-list-maintainer] \".","inputSchema":{"additionalProperties":false,"propert...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"tools":[{"annotations":{"readOnlyHint":true,"title":"Get commit details"},"description":"Get details for a commit from a GitHub repository","inputSchema":{"properties":{"include_diff":{"default":true,"description":"Whether to include file diffs and stats in the response. Default is true.","type":"boolean"},"owner":{"description":"Repository owner","type":"string"},"page":{"description":"Page number for pagination (min 1)","minimum":1,"type":"number"},"perPage":{"descriptio...`
- ✓ **startup** Starting in ROUTED mode on 0.0.0.0:80
- ✓ **startup** Routes: /mcp/<server> for servers: [github safeoutputs]
- ✓ **backend**
  ```
  Successfully connected to MCP backend server, command=docker
  ```
- 🔍 rpc **github**→`tools/call` `get_me`
  
  ```json
  {"params":{"arguments":{},"name":"get_me"}}
  ```
- 🔍 rpc **github**→`tools/call` `list_starred_repositories`
  
  ```json
  {"params":{"arguments":{"perPage":5},"name":"list_starred_repositories"}}
  ```
- 🔍 rpc **github**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"failed to get user: GET https://api.github.com/user: 403 Resource not accessible by integration []","type":"text"}],"isError":true}}
  ```
- 🔍 rpc **github**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"failed to list starred repositories for user '': GET https://api.github.com/user/starred?page=1\u0026per_page=5: 403 Resource not accessible by integration []","type":"text"}],"isError":true}}
  ```
- 🔍 rpc **safeoutputs**→`tools/call` `missing_tool`
  
  ```json
  {"params":{"arguments":{"alternatives":"Manual maintenance via GitHub web UI, or workflow needs enhanced GitHub token permissions and star list management tools.","reason":"Cannot access GitHub API for starred repositories or star lists. GitHub token lacks required permissions (403 errors), and no star list read/move APIs are available in the toolset.","tool":"GitHub Star Lists API and authenticated GitHub access"},"name":"missing_tool"}}
  ```
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":3,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}],"isError":false}}
  ```
- ✗ **auth** Authentication failed: invalid API key, remote=[::1]:37740, path=/close
- ✓ **shutdown** Shutting down gateway...

</details>
