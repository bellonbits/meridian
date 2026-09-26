import { Fragment, type ReactNode } from 'react'
import type { SampleBlock, SampleItem } from '../../data/samples'
import { Icon } from '../ui/Icon'
import './SampleDocument.css'

/** Inline markup: [+ins+] [-del-] ==highlight== [n] citations. */
function rich(text: string): ReactNode[] {
  return text.split(/(\[\+[^\]]+\+\]|\[-[^\]]+-\]|==[^=]+==|\[[\d, ]+\])/g).map((part, i) => {
    if (part.startsWith('[+')) return <ins key={i}>{part.slice(2, -2)}</ins>
    if (part.startsWith('[-')) return <del key={i}>{part.slice(2, -2)}</del>
    if (part.startsWith('==')) return <mark key={i}>{part.slice(2, -2)}</mark>
    if (/^\[[\d, ]+\]$/.test(part)) return <sup key={i} className="sdoc__cite">{part}</sup>
    return <Fragment key={i}>{part}</Fragment>
  })
}

function Block({ block }: { block: SampleBlock }) {
  switch (block.type) {
    case 'heading':
      return <h3 className="sdoc__h">{block.text}</h3>
    case 'paragraph':
      return <p className="sdoc__p">{rich(block.text)}</p>
    case 'list': {
      const List = block.ordered ? 'ol' : 'ul'
      return (
        <List className={block.ordered ? 'sdoc__ol' : 'sdoc__ul'}>
          {block.items.map((item) => (
            <li key={item}>{rich(item)}</li>
          ))}
        </List>
      )
    }
    case 'table':
      return (
        <div className="sdoc__table-wrap">
          <table className="sdoc__table">
            {block.caption && <caption>{block.caption}</caption>}
            <thead>
              <tr>
                {block.columns.map((c) => (
                  <th key={c} scope="col">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row.join('|')}>
                  {row.map((cell, i) =>
                    i === 0 ? (
                      <th key={i} scope="row">
                        {cell}
                      </th>
                    ) : (
                      <td key={i}>{cell}</td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    case 'comment':
      return (
        <aside className="sdoc__comment" aria-label={`Comment from ${block.author}`}>
          <p className="sdoc__comment-who">
            <Icon name="comment" size={13} /> {block.author} <span>· {block.role}</span>
          </p>
          <p>{block.text}</p>
        </aside>
      )
    case 'note':
      return (
        <p className="sdoc__note">
          <Icon name="info" size={14} /> {block.text}
        </p>
      )
  }
}

/** A sample deliverable rendered as a document page. */
export function SampleDocument({ sample }: { sample: SampleItem }) {
  return (
    <article className="sdoc" aria-label={`Sample document: ${sample.document.title}`}>
      <span className="sdoc__stamp" aria-hidden="true">
        Sample
      </span>
      <header className="sdoc__head">
        <p className="sdoc__running">
          <span>Meridian Research Studio</span>
          <span>{sample.format}</span>
        </p>
        <h2 className="sdoc__title">{sample.document.title}</h2>
        <p className="sdoc__subtitle">{sample.document.subtitle}</p>
      </header>
      <div className="sdoc__body">
        {sample.document.blocks.map((block, i) => (
          <Block key={i} block={block} />
        ))}
      </div>
      <footer className="sdoc__foot">
        <span>Illustrative sample · not client work</span>
        <span>1 of {sample.pages}</span>
      </footer>
    </article>
  )
}
