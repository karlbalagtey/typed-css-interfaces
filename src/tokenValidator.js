'use strict';

let RESERVED_WORDS = ['break', 'case', 'catch', 'class', 'const', 'continue', 'debugger', 'default', 'delete', 'do', 'else', 'enum', 'export', 'extends', 'false', 'finally', 'for', 'function', 'if', 'import', 'in', 'instanceof', 'new', 'null', 'return', 'super', 'switch', 'this', 'throw', 'true', 'try', 'typeof', 'var', 'void', 'while', 'with', 'as', 'implements', 'interface', 'let', 'package', 'private', 'protected', 'public', 'static', 'yield'];

export class TokenValidator {
  validate(key) {
    if(!key) {
      return {
        isValid: false,
        message: 'empty token'
      };
    }
    if(!/^[$_a-zA-Z][0-9a-zA-Z$_]*$/.test(key)) {
      return {
        isValid: true,
        message: key + ' is not valid TypeScript variable name.',
        needsQuotes: true
      };
    }
    if(RESERVED_WORDS.some(w => w === key)) {
      return {
        isValid: true,
        message: key + ' is TypeScript reserved word.',
        needsQuotes: true
      };
    }
    return {
      isValid: true,
      needsQuotes: false
    };
  }
}
