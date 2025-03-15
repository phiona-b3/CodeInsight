import { Linter } from "eslint-linter-browserify";

//create an eslint instance
const linter = new Linter();

//Define ESLint rules for readability
const eslintConfig: Linter.Config = {
    rules: {
        "no-unused-vars": ["warn"], //warn if a variable is defined but not used
        "indent": ["warn", 2], // enforce 2-space indentation
        "quotes": ["warn", "double"], //prefer double quotes
        "semi": ["warn", "always"], //require semicolons
    } as Record<string, Linter.RuleEntry>
};

// Function to analyze JavaScript code
export function analyzeCode(code: string) {
    try {
        const messages = linter.verify(code, eslintConfig);
        return messages.map((msg) => `Line ${msg.line}: ${msg.message}`);
    } catch (error) {
        return [`Error anlyzing code: ${error}`]
    }
}