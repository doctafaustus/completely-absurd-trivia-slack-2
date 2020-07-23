// Answer text must be under 25 characters otherwise they'll be truncated
// Answer value but be the lowercase LETTER of the correct answer (a, b, c, or d)
// All games must be 10 questions - do not delete any!

module.exports = {
  gameType: 'text',
  questions: [
    {
      question: 'Which part of the following URL is the protocol: `http://www.example.com/stuff`?', 
      a: 'http://', 
      b: 'www',
      c: 'example.com',
      d: '\/stuff',
      answer: 'a'
    },
    {
      question: 'What characters are used to create a comment in an HTML file?', 
      a: '\/\/', 
      b: '/* */',
      c: '<!-- -->',
      d: '#',
      answer: 'c'
    },
    {
      question: 'Which of the following is NOT a real programming language?', 
      a: 'Go', 
      b: 'R',
      c: 'Gulp',
      d: 'Ruby',
      answer: 'c'
    },
    {
      question: 'The 7-Layer OSI Model is used to describe _____.', 
      a: 'Networking', 
      b: 'Encryption',
      c: 'Databases',
      d: 'Browser Engine',
      answer: 'a'
    },
    {
      question: 'Which of the following is a Web Development Tool?', 
      a: 'Access', 
      b: 'Dreamweaver',
      c: 'InDesign',
      d: 'Illustrator',
      answer: 'b'
    },
    {
      question: 'What is the name of this HTML tag: `<a>`?', 
      a: 'Attribute', 
      b: 'Hyperlink',
      c: 'Link',
      d: 'Anchor',
      answer: 'd'
    },
    {
      question: 'What of the following is NOT a way to persist data between Web pages?', 
      a: 'sessionStorage', 
      b: 'localStorage',
      c: 'cookies',
      d: 'AJAX',
      answer: 'd'
    },
    {
      question: 'What would you use to embed one HTML page into another?', 
      a: 'Shadow DOM', 
      b: 'Cookie',
      c: 'DOM',
      d: 'Iframe',
      answer: 'd'
    },
    {
      question: 'Who was the creator of jQuery?', 
      a: 'Douglas Crockford', 
      b: 'Brendan Eich',
      c: 'Ryan Dahl',
      d: 'John Resig',
      answer: 'd'
    },
    {
      question: 'Using JavaScript, can you access content within an iframe if that iframe\'s source is different than the current domain?', 
      a: 'Yes', 
      b: 'No',
      c: 'Maybe',
      d: 'IDK but I\'ll try...',
      answer: 'b'
    }
  ]
};