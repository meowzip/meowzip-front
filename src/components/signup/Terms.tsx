import { useState, useEffect } from 'react';

type TermsProps = {
  type: string;
};

export default function Terms({ type }: TermsProps) {
  const [bodyContent, setBodyContent] = useState('');

  useEffect(() => {
    if (type === '') return;
    fetch(`https://meowzip.s3.ap-northeast-2.amazonaws.com/terms/${type}.html`)
      .then(response => {
        if (!response.ok) {
          throw new Error(
            'Network response was not ok: ' + response.statusText
          );
        }
        return response.text();
      })
      .then(htmlContent => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');
        return doc.body.innerHTML;
      })
      .then(bodyHtml => {
        setBodyContent(bodyHtml);
      })
      .catch(error => {
        console.error(
          'There has been a problem with your fetch operation:',
          error
        );
      });
  }, [type]);

  return (
    <div
      className="px-4 py-4"
      dangerouslySetInnerHTML={{ __html: bodyContent }}
    ></div>
  );
}
