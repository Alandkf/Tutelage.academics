# Search API

Single comprehensive search endpoint supporting universal and filtered modes, with case-insensitive matching, pagination, and execution time metrics. Results items contain only: link, title, description.

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
- Returns standardized results with `link`, `title`, `description` on each item.
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

## Response Format (Universal/Filtered)

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
    { "link": "/esl-resources/blogs/7", "title": "Improving Grammar", "description": "Targeted practice activities to improve grammar." },
    { "link": "/skills/speaking/a1/15", "title": "Interview Tips", "description": "Practice speaking skills with common interview scenarios." }
  ]
}
```

## Compact Unified Format (Optional)

Use `format=compact` to receive a minimal unified format and include static pages metadata in the search.

- Endpoint: `GET /api/search?query=<text>&format=compact&limit=20&page=1`
- Returns three core fields: `link`, `title`, `description`.
- When a public detail page exists, `link` is a navigable route (e.g., `/skills/reading/a1/123`, `/esl-resources/videos/45`).
- Combines dynamic models (Audio, Video, Blog, Reading, Writing, Speaking, ESL Audio, ESL Video, Story, Course) and documented static pages.
- Combines dynamic models (Audio, Video, Blog, Reading, Writing, Speaking, ESL Audio, ESL Video, Story, Course) and documented static pages.
 - Static pages include optional `keywords` used for broader matching (synonyms, singular/plural).
 - Case-insensitive matching against any word found in `title`, `description`, or `keywords`.

Example response:

```
{
  "mode": "compact",
  "query": "english",
  "filter": null,
  "meta": {
    "totalResults": 42,
    "page": 1,
    "limit": 20,
    "totalPages": 3,
    "executionTimeMs": 120,
    "performance": {
      "executionTimeMs": 95,
      "dynamicCount": 36,
      "staticCount": 6
    }
  },
  "results": [
    { "link": "/courses/business-english", "title": "Business English", "description": "Master professional communication for workplace success." },
    { "link": "/esl-resources", "title": "ESL Resources", "description": "Access ESL blogs, stories, audios, and videos." }
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
- Results are matched via case-insensitive ILIKE across fields; no scoring is returned.
- Pagination is applied to the combined result set.