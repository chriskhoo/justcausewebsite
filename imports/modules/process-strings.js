import pluralize from 'pluralize';

const capitalize = (str) => str.length? str[0].toUpperCase() + str.slice(1).toLowerCase():'';

function processTagString(str) {
  str = str.toLowerCase();
  const titleCaseSnake = str => str.split('_').map(capitalize).join('_');

  return {
    tagLowerCaseSingle: str,
    tagLowerCasePlural: pluralize.plural(str),
    tagUpperCaseSingle: titleCaseSnake(str),
    tagUpperCasePlural: titleCaseSnake(pluralize.plural(str))
  }
};



export {processTagString as processTagString};
export {capitalize as capitalize};
