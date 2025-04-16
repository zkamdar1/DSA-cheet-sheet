/**
 * Simple utility for basic code syntax highlighting
 * This is a very basic implementation - in a production environment,
 * you might want to use a library like Prism.js or highlight.js instead
 */
const codeHighlight = (code) => {
  if (!code) return '';

  // Escape HTML
  let highlighted = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
    
  // Highlight JavaScript syntax
  highlighted = highlighted
    // Keywords
    .replace(/\b(const|let|var|function|return|if|else|for|while|class|import|export|from|extends|new|this|super)\b/g, 
      '<span style="color: #C678DD;">$1</span>')
    // Built-ins and types
    .replace(/\b(document|window|Array|String|Object|Number|Boolean|Function|Symbol|Map|Set|Promise|null|undefined|true|false)\b/g,
      '<span style="color: #E5C07B;">$1</span>')
    // Strings
    .replace(/(["'`])(.*?)\1/g, 
      '<span style="color: #98C379;">$1$2$1</span>')
    // Numbers
    .replace(/\b(\d+)\b/g, 
      '<span style="color: #D19A66;">$1</span>')
    // Comments
    .replace(/(\/\/.*)/g, 
      '<span style="color: #7F848E; font-style: italic;">$1</span>')
    // Methods
    .replace(/(\.\w+)(\()/g, 
      '<span style="color: #61AFEF;">$1</span>$2')
    // Parentheses
    .replace(/(\(|\))/g, 
      '<span style="color: #ABB2BF;">$1</span>')
    // Brackets
    .replace(/(\[|\])/g, 
      '<span style="color: #ABB2BF;">$1</span>')
    // Braces
    .replace(/(\{|\})/g, 
      '<span style="color: #ABB2BF;">$1</span>');

  return highlighted;
};

export default codeHighlight; 