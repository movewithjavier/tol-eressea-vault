import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const ArticleSource: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const author = fileData.frontmatter?.author as string | undefined
  const publication = fileData.frontmatter?.publication as string | undefined
  const source = fileData.frontmatter?.source as string | undefined

  // Only show if we have at least one field
  if (!author && !publication && !source) {
    return null
  }

  // Build the byline: "by Author in Publication"
  const parts: string[] = []
  if (author) {
    parts.push(`by ${author}`)
  }
  if (publication) {
    parts.push(`in ${publication}`)
  }
  const byline = parts.join(" ")

  return (
    <div class={classNames(displayClass, "article-source")}>
      {byline && <p class="byline">{byline}</p>}
      {source && (
        <p class="source-link">
          <a href={source} target="_blank" rel="noopener noreferrer">
            Original article ↗
          </a>
        </p>
      )}
    </div>
  )
}

ArticleSource.css = `
.article-source {
  margin: 0.5rem 0 1.5rem 0;
  opacity: 0.85;
}

.article-source .byline {
  margin: 0;
  font-style: italic;
  color: var(--gray);
}

.article-source .source-link {
  margin: 0.25rem 0 0 0;
  font-size: 0.9rem;
}

.article-source .source-link a {
  color: var(--secondary);
}
`

export default (() => ArticleSource) satisfies QuartzComponentConstructor
