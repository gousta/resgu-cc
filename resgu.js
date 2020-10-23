const path = require("path");
const vorpal = require("vorpal")();
const Core = require("./core");
const { readFileSync, writeFileSync } = require("atomically");

const TalkAction = function ({ options }, callback) {
  if (options.text) {
    this.log("RESGU:", `"${options.text}" => "${Core.resguTalk(options.text)}"`);
  }
  if (options.file) {
    try {
      const filename = path.parse(options.file).base;
      this.log("RESGU: reading file", filename);
      const text = readFileSync(options.file, { encoding: "utf8" });
      const resguText = Core.resguTalk(text);
      const filenameOutput = `resgu-${filename}`;
      writeFileSync(filenameOutput, resguText, { encoding: "utf8" });
      this.log("RESGU: writing file =>", filenameOutput);
    } catch (e) {
      this.log("ERROR:", e.message);
    }
  }

  callback();
};

vorpal
  .command("talk")
  .option("-t, --text [text]", "A sentence that contains English")
  .option("-f, --file [file]", "A file that contains English")
  .description("Talk in Resgunian")
  .validate(function ({ options }) {
    if (options.text && typeof options.text === "string") return true;
    if (options.file && typeof options.file === "string") return true;
    return "Please provide --text (-t) or --file (-f) options: eg. talk -t \"Hello\"";
  })
  .alias("t")
  .action(TalkAction);

vorpal
  .delimiter("resgunian$")
  .show();
