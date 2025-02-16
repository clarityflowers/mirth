// @ts-nocheck

const { LanguageClient, RevealOutputChannelOn, TransportKind } = require("vscode-languageclient/node");
const {
  workspace, window, SemanticTokensLegend,
  SemanticTokens, languages,

} = require('vscode');


const which = require("which")


let client; /** @type LanguageClient */

/** @param {import("vscode").ExtensionContext} context */
async function activate(context) {
  // If the extension is launched in debug mode then the debug server options are used
  // Otherwise the run options are used
  console.error("ELFJWELKFJWEKLFJWEKLFJWKLEFJWKLEJFLKWEFJLWEJ")
  /** @type {import('vscode-languageclient/node').ServerOptions}*/
  const serverOptions = {
    command: workspace.getConfiguration("mirth").get("path") || await which("mirth"),
    args: ["--lsp"],
    transport: TransportKind.stdio,
    debug: {
      command: workspace.getConfiguration("mirth").get("path") || await which("mirth"),
      args: ["--lsp"],

    }
  };

  // Options to control the language client
  /** @type {import('vscode-languageclient/node').LanguageClientOptions} */
  const clientOptions = {
    documentSelector: [{ language: 'mirth' }, { pattern: "*.mth" }],
    traceOutputChannel: window.createOutputChannel("Mirth LSP Trace"),
    revealOutputChannelOn: RevealOutputChannelOn.Debug,
    synchronize: {
      fileEvents: workspace.createFileSystemWatcher('**/*.mirth')
    },

  };


  // Create the language client and start the client.
  client = new LanguageClient(
    'mirth',
    'Mirth Language Server',
    serverOptions,
    clientOptions, true
  );

  // /** @implements {import("vscode").DocumentSemanticTokensProvider} */
  // class TokenProvider {
  //   /** 
  //    * @param document {import("vscode").TextDocument}
  //    * @param cancellationToken {import("vscode").CancellationToken}
  //    * @return {SemanticTokens}
  //    */
  //   async provideDocumentSemanticTokens(
  //     document, cancellationToken
  //   ) {
  //     console.log("PROVIDE TOKENS");
  //     /** @type {import('vscode-languageclient').SemanticTokensParams} */
  //     const params = {
  //       textDocument: {
  //         uri: document.uri.toString()
  //       }
  //     }

  //     const result = await client.sendRequest("textDocument/semanticTokens/full", params)
  //     return result;
  //   }
  // }

  // context.subscriptions.push(
  //   languages.registerDocumentSemanticTokensProvider(
  //     [{ language: 'mirth' }, { pattern: "*.mth" }],
  //     new TokenProvider(), new SemanticTokensLegend(
  //       ['function', 'macro', 'string', 'comment'],
  //       ['definition', 'defaultLibrary', 'asm', 'documentation'],
  //     )));


  // Start the client. This will also launch the server
  await client.start();


}

/** @return {Thenable<void> | undefined} */
function deactivate() {
  if (!client) {
    return undefined;
  }
  return client.stop();
}

module.exports = { activate, deactivate }