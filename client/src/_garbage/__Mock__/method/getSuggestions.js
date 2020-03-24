const escapeRegexCharacters = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const getSuggestions = (value, type, data, variableName) => {
    const escapedValue = escapeRegexCharacters(value.trim());
    
    if (escapedValue === '') {
      return [];
    }
  
    const regex = new RegExp('^' + escapedValue, 'i');
    const suggestions = data.filter(datum => regex.test(datum[variableName]));

    const output = type === "Unique" ? [{ added: true }] : []
    
    if (suggestions.length === 0) {
      return output
    };
    
    return suggestions;
};

export default getSuggestions