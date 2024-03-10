import * as readline from "readline";

const codeSnippets = ["console.log()", "if () { }", "for (;;) { }", "function() { }"];

function generateSuggestions(input: string): string[] {
  return codeSnippets.filter((snippet) => snippet.startsWith(input));
}

function handleInput(input: string): void {
  const suggestions: string[] = generateSuggestions(input);

  console.log("\nSuggestions:");
  suggestions.forEach((suggestion: string, index: number) => {
    console.log(`${index + 1}. ${suggestion}`);
  });

  rl.prompt();
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.setPrompt("Enter code: ");
rl.prompt();

rl.on("line", (input: string) => {
  // Handle user input
  handleInput(input);
});
