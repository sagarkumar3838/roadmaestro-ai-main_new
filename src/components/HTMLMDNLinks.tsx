import React from 'react';

const HTMLMDNLinks = () => {
  const mdnLinks = [
    {
      title: 'HTML Introduction',
      url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML',
    },
    {
      title: 'HTML Elements',
      url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element',
    },
    {
      title: 'HTML Attributes',
      url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes',
    },
    {
      title: 'HTML Forms',
      url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form',
    },
    {
      title: 'HTML Semantics',
      url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_HTML_semantic_elements',
    },
    // Add more links as needed
  ];

  return (
    <div className="html-mdn-links">
      <h3>HTML MDN Documentation Links</h3>
      <ul>
        {mdnLinks.map((link, index) => (
          <li key={index}>
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              {link.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HTMLMDNLinks;
