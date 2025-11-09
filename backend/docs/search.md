# Search API

Single comprehensive search endpoint supporting universal and filtered modes, with case-insensitive matching, pagination, scoring, excerpts, and execution time metrics.

## Endpoint

- `GET /api/search`

## Query Parameters

- `query` (string, required): Search text. Alias: `q`.
- `filter` (string, optional): One of `tests`, `Courses`, `Blogs`, `Skills`, `Esl Resources` (case-insensitive; `esl-resources` or `esl resources` accepted).
- `page` (integer, optional): Page number (default `1`).
- `limit` (integer, optional): Page size (default `20`, max `100`).

## Modes

- Universal Search Mode
  - Searches across all collections: Tests, Courses, Blogs, Skills, ESL Resources.
  - Returns combined results with `collectionType` on each item.
  - Example: `GET /api/search?query=grammar`

- Filtered Search Mode
  - Searches within one specified collection via `filter`.
  - Allowed filters: `tests`, `Courses`, `Blogs`, `Skills`, `Esl Resources`.
  - Example: `GET /api/search?query=essay&filter=Skills`

## Collections

- Blogs: `title`, `description`, `content`, `category`
- Courses: `title`, `description`, `category`
- Skills: Reading/Writing/Speaking → `title`, `description`, `content`, plus Speaking `transcript`
- ESL Resources: Story/EslAudio/EslVideo → `title`, `description`, `contentText` (Story), `transcript` (EslAudio)
- Tests: QuizSection → `name`, `description`; QuizQuestion → `text`, `optionA..D`

## Response Format

```json
{
  "mode": "universal" | "filtered",
  "query": "...",
  "filter": null | "blogs" | "courses" | "skills" | "eslResources" | "tests",
  "meta": {
    "totalResults": 42,
    "page": 1,
    "limit": 20,
    "totalPages": 3,
    "executionTimeMs": 123
  },
  "results": [
    {
      "collectionType": "Blogs",
      "id": 7,
      "title": "Improving Grammar",
      "excerpt": "…improving grammar with targeted practice…",
      "score": 0.98
    },
    {
      "collectionType": "Skills",
      "subType": "Speaking",
      "id": 15,
      "title": "Interview Tips",
      "excerpt": "…practice your speaking skills…",
      "score": 0.9
    }
  ]
}
```

## Error Responses

- `400 Bad Request` — missing `query`
  ```json
  { "error": "Missing required parameter: query" }
  ```

- `422 Unprocessable Entity` — invalid `filter`
  ```json
  { "error": "Invalid filter. Allowed values: tests, Courses, Blogs, Skills, Esl Resources" }
  ```

- `500 Internal Server Error` — unexpected failure
  ```json
  { "error": "Internal server error during search" }
  ```

## Examples

- Universal: `GET /api/search?query=grammar`
- Filtered Blogs: `GET /api/search?query=placement&filter=Blogs`
- Filtered Courses: `GET /api/search?query=essay&filter=Courses&page=2&limit=10`
- Filtered Skills: `GET /api/search?query=transcript&filter=Skills`
- Filtered ESL Resources: `GET /api/search?query=audio&filter=Esl Resources`
- Filtered Tests: `GET /api/search?query=vocabulary&filter=tests`

## Notes

- Matching uses case-insensitive `ILIKE` queries in PostgreSQL.
- Results are sorted by a simple relevance score based on matched fields and occurrence count.
- Pagination is applied to the combined result set.