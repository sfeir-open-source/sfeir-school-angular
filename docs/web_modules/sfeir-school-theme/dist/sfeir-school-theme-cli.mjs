#!/usr/bin/env node
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// cli/utils/assert.utils.ts
function check(ruleId, msg, predicate) {
  if (predicate()) {
    return true;
  } else {
    if (typeof msg === "string") {
      ERRORS.push(new CheckError(ruleId, msg));
    } else {
      const error = new CheckError(ruleId, msg.msg, msg.continueCheck);
      ERRORS.push(error);
      if (!msg.continueCheck) {
        throw error;
      }
    }
    return false;
  }
}
function getErrors() {
  return ERRORS;
}
var ERRORS, CheckError;
var init_assert_utils = __esm({
  "cli/utils/assert.utils.ts"() {
    "use strict";
    ERRORS = [];
    CheckError = class extends Error {
      constructor(ruleId, message, continueCheck = true) {
        super(`[CheckError] ${ruleId} ${message}`);
        this.ruleId = ruleId;
        this.continueCheck = continueCheck;
      }
    };
  }
});

// cli/cli.ts
import path from "path";
function parseArgs(args, currentWorkingDir) {
  if (args.includes("help")) {
    return { type: "help" };
  }
  if (args.includes("version")) {
    return { type: "version" };
  }
  if (args.includes("explain")) {
    const [ruleCode] = args.slice(args.indexOf("explain") + 1);
    return { type: "explain", ruleCode };
  }
  if (args.includes("info")) {
    return {
      type: "info",
      rootDir: getRootDirOrDefault(args, currentWorkingDir)
    };
  }
  if (args.includes("init-config")) {
    return {
      type: "init-config",
      rootDir: getRootDirOrDefault(args, currentWorkingDir)
    };
  }
  if (args.includes("check")) {
    return {
      type: "check",
      rootDir: getRootDirOrDefault(args, currentWorkingDir)
    };
  }
  return { type: "help" };
}
function getRootDirOrDefault(args, currentWorkingDir) {
  const fromArgs = args.find((arg) => arg.startsWith("--rootDir="));
  if (fromArgs == void 0) {
    return currentWorkingDir;
  }
  return path.resolve(fromArgs.replace("--rootDir=", ""));
}
var init_cli = __esm({
  "cli/cli.ts"() {
    "use strict";
  }
});

// cli/utils/path.utils.ts
import path2 from "path";
function docsPath(rootDir) {
  return path2.resolve(rootDir, "docs");
}
function docsMarkdownPath(rootDir) {
  return path2.resolve(docsPath(rootDir), "markdown");
}
function slidePath(rootDir, slideFile) {
  return path2.resolve(docsMarkdownPath(rootDir), slideFile);
}
function docsFilePath(rootDir, assetFile) {
  return path2.resolve(docsPath(rootDir), assetFile);
}
function docsImagesPath(rootDir) {
  return path2.resolve(docsPath(rootDir), "assets", "images");
}
function docsImagePath(rootDir, filePath) {
  return path2.resolve(docsImagesPath(rootDir), filePath);
}
function labsPath(rootDir) {
  return path2.resolve(rootDir, "steps");
}
function labsDirPackageJsonPath(rootDir) {
  return path2.resolve(labsPath(rootDir), "package.json");
}
function labsDirLabsJsonPath(rootDir) {
  return path2.resolve(labsPath(rootDir), "labs.json");
}
function projectConfigPath(rootDir) {
  return path2.resolve(rootDir, ".sfeir-theme-config.json");
}
function labPackageJsonPath(rootDir, lab) {
  return path2.resolve(labsPath(rootDir), lab, "package.json");
}
function labReadmePath(rootDir, lab) {
  return path2.resolve(labsPath(rootDir), lab, "README.md");
}
var init_path_utils = __esm({
  "cli/utils/path.utils.ts"() {
    "use strict";
  }
});

// cli/utils/fs.utils.ts
import fs from "fs";
import path3 from "path";
function isDirectory(dir, file) {
  try {
    if (file == void 0) {
      return fs.statSync(dir).isDirectory();
    } else {
      return fs.statSync(path3.resolve(dir, file)).isDirectory();
    }
  } catch (e) {
    return false;
  }
}
function readdirSync(pathLike, options) {
  return fs.readdirSync(pathLike, options).filter((file) => !file.startsWith(".") && file !== "Thumbs.db");
}
var init_fs_utils = __esm({
  "cli/utils/fs.utils.ts"() {
    "use strict";
  }
});

// cli/utils/fp.utils.ts
function isDefined(x) {
  return x != void 0;
}
function isNotDefined(x) {
  return x == void 0;
}
function isEmpty(x) {
  return x.length === 0;
}
function isNotEmpty(x) {
  return x.length > 0;
}
function isDefinedAndNotEmpty(x) {
  return isDefined(x) && isNotEmpty(x);
}
function isNotDefinedOrEmpty(x) {
  return isNotDefined(x) || isEmpty(x);
}
var init_fp_utils = __esm({
  "cli/utils/fp.utils.ts"() {
    "use strict";
  }
});

// cli/utils/slide.utils.ts
import fs2 from "fs";
import path4 from "path";
function getSlideFilesFromSlidesJs(rootDir) {
  return __async(this, null, function* () {
    const slideJs = yield import(importSlidesJs(rootDir));
    if (typeof slideJs.formation !== "function") {
      throw new Error(
        "scripts/slides.js should have an exported function formation"
      );
    }
    return slideJs.formation();
  });
}
function getSlideFilesFromFs(rootDir) {
  return readdirSync(path4.resolve(docsMarkdownPath(rootDir)), {
    encoding: "utf-8",
    recursive: true
  }).filter((path5) => path5.endsWith(".md"));
}
function importSlidesJs(rootDir) {
  try {
    return "data:text/javascript;charset=utf-8," + encodeURIComponent(
      fs2.readFileSync(
        path4.resolve(
          docsPath(rootDir),
          "scripts/slides.js"
        ),
        "utf-8"
      ).split("\n").filter((line) => !line.includes("SfeirThemeInitializer")).join("\n")
    );
  } catch (err) {
    throw new Error("Failed to read scripts/slides.js", { cause: err });
  }
}
function isSlideFileExists(slideFilePath) {
  return fs2.existsSync(slideFilePath);
}
function getAllSlidesImages(rootDir) {
  return getSlideFilesFromFs(rootDir).map(
    (file) => readSlideFile(rootDir, file)
  ).flatMap((fileContent) => getImagesPathFromSlides(rootDir, fileContent));
}
function getLabSlides(slides) {
  return slides.filter(
    (slide) => slide.path.includes("-lab-") || slide.path.includes("-lab.md")
  );
}
function readSlideFile(rootDir, slideFilePath) {
  return fs2.readFileSync(slidePath(rootDir, slideFilePath), "utf-8");
}
function getLabSlideCommandRow(file, config) {
  return file.split("\n").find(
    (row) => row.includes(config.stepCommandPrefix)
  );
}
function getImagesPathFromSlides(rootDir, fileContent) {
  return fileContent.split("\n").flatMap(extractUrlPart).filter(isDefinedAndNotEmpty).filter((url) => !url.startsWith("http")).filter(isImageInAssetsDir).map((imgPath) => docsFilePath(rootDir, imgPath));
  function extractUrlPart(row) {
    if (row.startsWith("![")) {
      const secondPart = row.split("](")[1];
      const urlPart = secondPart == null ? void 0 : secondPart.substring(0, secondPart.lastIndexOf(")"));
      if (urlPart.endsWith("'")) {
        return urlPart.substring(0, urlPart.lastIndexOf(" '"));
      } else {
        return urlPart;
      }
    } else if (row.includes("<!--") && row.includes("data-background=")) {
      const dataBackgroundPart = row.split('data-background="')[1];
      return dataBackgroundPart == null ? void 0 : dataBackgroundPart.substring(0, dataBackgroundPart.indexOf('"'));
    } else if (row.includes("<img")) {
      return row.split("<img").map((img) => {
        var _a, _b;
        return (_b = (_a = img.match(new RegExp('src="(?<src>[^"]*)"'))) == null ? void 0 : _a.groups) == null ? void 0 : _b.src;
      }).filter(isDefinedAndNotEmpty);
    } else {
      return null;
    }
  }
  function isImageInAssetsDir(imagePath) {
    return imagePath.startsWith("assets") || imagePath.startsWith("./assets");
  }
}
function getImagesPathFromFs(rootDir) {
  return readdirSync(docsImagesPath(rootDir), {
    encoding: "utf-8",
    recursive: true
  }).filter((imagePath) => !isDirectory(docsImagesPath(rootDir), imagePath)).filter((imagePath) => !imagePath.includes("sfeir-school-logo.png")).map((imagePath) => docsImagePath(rootDir, imagePath));
}
function isImageFileExists(imageFilePath) {
  return fs2.existsSync(imageFilePath);
}
var init_slide_utils = __esm({
  "cli/utils/slide.utils.ts"() {
    "use strict";
    init_path_utils();
    init_fs_utils();
    init_fp_utils();
  }
});

// cli/utils/css.utils.ts
import fs3 from "fs";
function getAllCssContent(rootDir, extraCssFiles) {
  return THEME_CSS_FILES.concat(extraCssFiles).map(
    (cssFilePath) => getCssFile(rootDir, cssFilePath)
  ).concat(OTHER_KNOWN_CSS_CLASSES).join("\n\n\n");
}
function getCssFile(rootDir, cssPath) {
  const filePath = docsFilePath(rootDir, cssPath);
  try {
    return fs3.readFileSync(filePath, "utf-8");
  } catch (e) {
    throw new Error(`Cannot find: ${filePath}`);
  }
}
function getCssClassUsedInSlide(fileContent) {
  return fileContent.split("\n").map((row) => {
    if (row.startsWith("<!--")) {
      const classesPart = row.split('class="')[1];
      return classesPart == null ? void 0 : classesPart.substring(0, classesPart.indexOf('"'));
    }
    const trimmed = row.trimEnd();
    if (row.startsWith("![") && trimmed.endsWith("')")) {
      return row.substring(
        trimmed.lastIndexOf(" '") + 2,
        trimmed.length - 2
      );
    }
    return void 0;
  }).filter((classes) => classes != void 0).flatMap((classes) => classes.split(" "));
}
var THEME_CSS_FILES, OTHER_KNOWN_CSS_CLASSES;
var init_css_utils = __esm({
  "cli/utils/css.utils.ts"() {
    "use strict";
    init_path_utils();
    THEME_CSS_FILES = [
      "web_modules/sfeir-school-theme/dist/sfeir-school-theme.css",
      "css/slides.css"
    ];
    OTHER_KNOWN_CSS_CLASSES = [
      ".list-fragment",
      ".transition-bg-sfeir-1",
      ".transition-bg-sfeir-2",
      ".transition-bg-sfeir-3"
    ];
  }
});

// cli/utils/labs.utils.ts
import fs4 from "fs";
function getWorkspaceStepsPackageJson(rootDir) {
  const packageJson = labsDirPackageJsonPath(rootDir);
  const labsJson = labsDirLabsJsonPath(rootDir);
  if (fs4.existsSync(packageJson)) {
    const raw = JSON.parse(fs4.readFileSync(packageJson, "utf-8"));
    return __spreadProps(__spreadValues({}, raw), { kind: "package.json" });
  } else if (fs4.existsSync(labsJson)) {
    const raw = JSON.parse(fs4.readFileSync(labsJson, "utf-8"));
    return __spreadProps(__spreadValues({}, raw), { kind: "labs.json" });
  } else {
    return null;
  }
}
function extractLabsListFromPackageJson(packageJson) {
  var _a, _b, _c;
  if (isNotDefined(packageJson)) {
    return [];
  }
  if (packageJson.kind === "package.json") {
    return (_b = (_a = packageJson.workspaces) != null ? _a : packageJson.labs) != null ? _b : [];
  }
  if (packageJson.kind === "labs.json") {
    return (_c = packageJson.labs) != null ? _c : [];
  }
  return [];
}
function getAllLabsFromWorkspace(rootDir, { withSolution = true } = {}) {
  const packageJson = getWorkspaceStepsPackageJson(rootDir);
  const allCommands = extractLabsListFromPackageJson(packageJson);
  if (withSolution) {
    return allCommands;
  } else {
    return allCommands.filter(
      (labCommand) => !labCommand.includes("-solution")
    );
  }
}
function getLabsCommands(rootDir, { withSolution = false } = {}) {
  return getAllLabsFromWorkspace(rootDir, { withSolution });
}
function isLabCommandExists(rootDir, commandName) {
  return getLabsCommands(rootDir).includes(commandName);
}
function getLabCommandTarget(labCommandRow, config) {
  var _a;
  return (_a = labCommandRow.split(config.stepCommandPrefix)[1]) == null ? void 0 : _a.trim();
}
function getAllLabsFromFs(rootDir, config) {
  return readdirSync(labsPath(rootDir), { encoding: "utf-8" }).filter((filePath) => !config.ignoreStepsDirectories.includes(filePath)).filter(
    (filePath) => isDirectory(labsPath(rootDir), filePath)
  );
}
function getAllLabScripts(rootDir) {
  var _a;
  const packageJson = getWorkspaceStepsPackageJson(rootDir);
  if ((packageJson == null ? void 0 : packageJson.kind) === "package.json") {
    return Object.keys((_a = packageJson.scripts) != null ? _a : {});
  } else {
    return [];
  }
}
function getLabPackageJson(rootDir, lab) {
  try {
    return JSON.parse(
      fs4.readFileSync(labPackageJsonPath(rootDir, lab), "utf-8")
    );
  } catch (e) {
    return null;
  }
}
function splitLabsAndSolutions(labNames) {
  const labs = [];
  const labSolutions = [];
  for (const lab of labNames) {
    if (lab.endsWith("-solution")) {
      labSolutions.push(lab);
    } else {
      labs.push(lab);
    }
  }
  return { labs, labSolutions };
}
function getLabReadme(rootDir, lab) {
  try {
    return fs4.readFileSync(labReadmePath(rootDir, lab), "utf-8");
  } catch (e) {
    return null;
  }
}
var init_labs_utils = __esm({
  "cli/utils/labs.utils.ts"() {
    "use strict";
    init_fs_utils();
    init_path_utils();
    init_fp_utils();
  }
});

// cli/command/check/check-docs.ts
function checkDocs(rootDir, config) {
  return __async(this, null, function* () {
    let slideFilesFromSlidesJs;
    try {
      slideFilesFromSlidesJs = yield getSlideFilesFromSlidesJs(rootDir);
    } catch (e) {
      check(
        "S_010",
        { msg: `slides.js should export "formation" function`, continueCheck: false },
        () => false
      );
      return;
    }
    checkSlideFilePathInSlideJs(rootDir, slideFilesFromSlidesJs);
    checkSlideFileInFs(rootDir, slideFilesFromSlidesJs, config);
    checkLabSlideFile(rootDir, slideFilesFromSlidesJs, config);
    checkLabCommand(rootDir, slideFilesFromSlidesJs, config);
    checkImagesFs(rootDir);
  });
}
function checkSlideFilePathInSlideJs(rootDir, slideFilesFromSlidesJs) {
  for (const slideFile of slideFilesFromSlidesJs) {
    const slide = JSON.stringify(slideFile);
    check(
      "S_001",
      `slides.js entry "${slide}" should be a valid entry`,
      () => isDefined(slideFile) && isDefined(slideFile.path) && slideFile.path.length > 0
    );
    check(
      "S_002",
      `slides.js entry "${slideFile == null ? void 0 : slideFile.path}" does not match an existing file`,
      () => isSlideFileExists(slidePath(rootDir, slideFile.path))
    );
  }
}
function checkSlideFileInFs(rootDir, slideEntriesFromSlidesJs, config) {
  const slideFilesFromFs = getSlideFilesFromFs(rootDir);
  const slideFilesFromSlidesJs = slideEntriesFromSlidesJs.map(
    (entry) => entry.path
  );
  const cssContent = getAllCssContent(rootDir, config.extraCssFiles);
  for (const slideFile of slideFilesFromFs) {
    check(
      "S_003",
      `"${slideFile}" should be used`,
      () => slideFilesFromSlidesJs.includes(slideFile)
    );
    for (const imagePath of getImagesPathFromSlides(
      rootDir,
      readSlideFile(rootDir, slideFile)
    )) {
      check(
        "S_007",
        `"${imagePath}" in "${slideFile}" should be an existing images`,
        () => isImageFileExists(imagePath)
      );
    }
    for (const cssClass of getCssClassUsedInSlide(
      readSlideFile(rootDir, slideFile)
    )) {
      check(
        "S_009",
        `"${cssClass}" in "${slideFile}" is not a known css class`,
        () => cssContent.includes(cssClass)
      );
    }
  }
}
function checkLabSlideFile(rootDir, slideFilesFromSlidesJs, config) {
  const labSlides = getLabSlides(slideFilesFromSlidesJs);
  for (const slideFile of labSlides) {
    const labSlideContent = readSlideFile(rootDir, slideFile.path);
    const commandRow = getLabSlideCommandRow(labSlideContent, config);
    const hasCommandRow = check(
      "S_004",
      `"${slideFile == null ? void 0 : slideFile.path}" should contains the command to run the exercise`,
      () => {
        return isDefined(commandRow) && commandRow.length > 0;
      }
    );
    if (hasCommandRow && isDefinedAndNotEmpty(config.stepCommandPrefix)) {
      check(
        "S_005",
        `"${slideFile == null ? void 0 : slideFile.path}" should contains the valid command to run the exercise`,
        () => {
          const commandTarget = getLabCommandTarget(
            commandRow,
            config
          );
          return isLabCommandExists(rootDir, commandTarget);
        }
      );
    }
    check(
      "S_006",
      `"${slideFile == null ? void 0 : slideFile.path}" should use lab slide format`,
      () => {
        const slideRows = labSlideContent.split("\n").map(
          (row) => row.trim()
        );
        return slideRows.includes(
          '<!-- .slide: class="exercice" -->'
        ) && slideRows.includes("## Lab");
      }
    );
  }
}
function checkLabCommand(rootDir, labSlides, config) {
  const allLabSlides = labSlides.map(
    (slide) => readSlideFile(rootDir, slide.path)
  );
  const labsCommands = getLabsCommands(rootDir);
  for (const labCommand of labsCommands) {
    check("L_001", `"${labCommand}" should be used in a lab slide`, () => {
      return allLabSlides.some(
        (slide) => slide.includes(`${config.stepCommandPrefix}${labCommand}`)
      );
    });
  }
}
function checkImagesFs(rootDir) {
  const imagesFromFs = getImagesPathFromFs(rootDir);
  for (const imagePath of imagesFromFs) {
    check("S_008", `"${imagePath}" should be used`, () => {
      return getAllSlidesImages(rootDir).includes(imagePath);
    });
  }
}
var init_check_docs = __esm({
  "cli/command/check/check-docs.ts"() {
    "use strict";
    init_slide_utils();
    init_css_utils();
    init_labs_utils();
    init_fp_utils();
    init_assert_utils();
    init_path_utils();
  }
});

// cli/command/check/check-labs.ts
function checkLabs(rootDir, config) {
  checkLabDirectories(rootDir, config);
  checkLabsAndSolutions(rootDir, config);
}
function checkLabDirectories(rootDir, config) {
  const stepsPackageJson = getWorkspaceStepsPackageJson(rootDir);
  const labDirectories = getAllLabsFromFs(rootDir, config);
  const labsDeclared = getAllLabsFromWorkspace(rootDir);
  const labScripts = getAllLabScripts(rootDir);
  for (const labDir of labDirectories) {
    check(
      "L_002",
      `Lab "${labDir}" should be declared in the workspace (either "workspaces" or "labs" in a file "package.json" or "labs.json" at the root of "steps" directory)`,
      () => labsDeclared.includes(labDir)
    );
    if ((stepsPackageJson == null ? void 0 : stepsPackageJson.kind) === "package.json") {
      check(
        "L_003",
        `Lab "${labDir}" should have corresponding script`,
        () => labScripts.includes(labDir)
      );
      check(
        "L_004",
        `Lab "${labDir}" should have a package.json with corresponding name`,
        () => {
          var _a;
          return ((_a = getLabPackageJson(rootDir, labDir)) == null ? void 0 : _a.name) === labDir;
        }
      );
    }
  }
}
function checkLabsAndSolutions(rootDir, config) {
  const labDirectories = getAllLabsFromFs(rootDir, config);
  const { labs, labSolutions } = splitLabsAndSolutions(labDirectories);
  for (const lab of labs) {
    const readme = getLabReadme(rootDir, lab);
    const hasReadme = check(
      "L_005",
      `Lab "${lab}" should have a README.md`,
      () => isDefined(readme) && readme.length > 0
    );
    if (hasReadme) {
      check(
        "L_006",
        `Lab "${lab}"'s README.md should contains the correct title`,
        () => {
          var _a;
          return (_a = readme == null ? void 0 : readme.includes(`# ${lab} instructions`)) != null ? _a : false;
        }
      );
      check(
        "L_007",
        `Lab "${lab}"'s README.md should contains the correct command`,
        () => {
          var _a;
          return (_a = readme == null ? void 0 : readme.includes(`${config.stepCommandPrefix}${lab}`)) != null ? _a : false;
        }
      );
    }
    check(
      "L_008",
      `Lab "${lab}" should have a solution`,
      () => labSolutions.includes(lab + "-solution")
    );
  }
  for (const labSolution of labSolutions) {
    const matchingLabName = labSolution.replace("-solution", "");
    const hasMatchingLab = check(
      "L_009",
      `Solution lab "${labSolution}" should match to a lab`,
      () => labs.includes(matchingLabName)
    );
    if (hasMatchingLab) {
      const labReadme = getLabReadme(rootDir, matchingLabName);
      const labSolutionReadme = getLabReadme(rootDir, labSolution);
      check(
        "L_010",
        `Lab and solution of "${matchingLabName}" should have same README.md`,
        () => labReadme === labSolutionReadme
      );
    }
  }
}
var init_check_labs = __esm({
  "cli/command/check/check-labs.ts"() {
    "use strict";
    init_labs_utils();
    init_assert_utils();
    init_fp_utils();
  }
});

// cli/command/check/check-root-dir.ts
function checkRootDir(command) {
  check(
    "G_001",
    {
      msg: `Project root dir (${command.rootDir}) does not exist.`,
      continueCheck: false
    },
    () => isDirectory(command.rootDir)
  );
  check(
    "G_003",
    {
      msg: "Project should have a 'steps' directory",
      continueCheck: false
    },
    () => readRootDir(command).includes("steps") && isDirectory(command.rootDir, "steps")
  );
  check(
    "G_002",
    {
      msg: "Project should have a 'docs' directory",
      continueCheck: false
    },
    () => readRootDir(command).includes("docs") && isDirectory(command.rootDir, "docs")
  );
}
function readRootDir(command) {
  return readdirSync(command.rootDir);
}
var init_check_root_dir = __esm({
  "cli/command/check/check-root-dir.ts"() {
    "use strict";
    init_fs_utils();
    init_assert_utils();
  }
});

// cli/config-template.json
var config_template_default;
var init_config_template = __esm({
  "cli/config-template.json"() {
    config_template_default = {
      extraCssFiles: [],
      stepCommandPrefix: "",
      ignoreStepsDirectories: []
    };
  }
});

// cli/utils/config.utils.ts
import fs5 from "fs";
function getProjectConfig(rootDir) {
  const configPath = projectConfigPath(rootDir);
  if (fs5.existsSync(configPath)) {
    return __spreadValues(__spreadValues({}, config_template_default), JSON.parse(fs5.readFileSync(configPath, "utf-8")));
  } else {
    return config_template_default;
  }
}
var init_config_utils = __esm({
  "cli/utils/config.utils.ts"() {
    "use strict";
    init_config_template();
    init_path_utils();
  }
});

// cli/command/check/internal.ts
function checkCommandInternal(command) {
  return __async(this, null, function* () {
    checkRootDir(command);
    const config = getProjectConfig(command.rootDir);
    yield checkDocs(command.rootDir, config);
    checkLabs(command.rootDir, config);
  });
}
var init_internal = __esm({
  "cli/command/check/internal.ts"() {
    "use strict";
    init_check_docs();
    init_check_labs();
    init_check_root_dir();
    init_config_utils();
  }
});

// cli/utils/array.utils.ts
function unique(all) {
  return [...new Set(all)];
}
var init_array_utils = __esm({
  "cli/utils/array.utils.ts"() {
    "use strict";
  }
});

// cli/command/check/index.ts
function checkCommand(command) {
  return __async(this, null, function* () {
    yield checkCommandInternal(command);
    if (getErrors().length === 0) {
      console.log("OK");
      process.exit(0);
    } else {
      getErrors().forEach((error) => {
        console.error(error.message);
      });
      console.error("");
      const errorIds = unique(getErrors().map((e) => e.ruleId)).sort();
      console.error(`You can call "sfeir-school-theme explain ${errorIds.join("|")}" to have more details.`);
      console.error("");
      process.exit(getErrors().length);
    }
  });
}
var init_check = __esm({
  "cli/command/check/index.ts"() {
    "use strict";
    init_internal();
    init_assert_utils();
    init_array_utils();
  }
});

// cli/README.md
var README_default;
var init_README = __esm({
  "cli/README.md"() {
    README_default = '# CLI\n\n## Check\n\n### Global checks\n\n##### G_001 the root directory exists (current working dir by default, --rootDir value if specified)\n\nTo make the sfeir-school-theme CLI work correctly, it should be run in the repository root (or be run with --rootDir specified), and the root directory should exists.\n\n##### G_002 the `<root>/docs` directory exists\n\nThe root directory should contains a minimal structure:\n\n```\n<root>\n\u251C\u2500\u2500 CONTRIBUTING.md\n\u251C\u2500\u2500 docs\n|   \u251C\u2500\u2500 ...\n\u251C\u2500\u2500 LICENSE\n\u251C\u2500\u2500 README.md\n\u2514\u2500\u2500 steps\n    \u251C\u2500\u2500 ...\n```\n\n##### G_003 the `<root>/steps` directory exists\n\nThe root directory should contains a minimal structure:\n\n```\n<root>\n\u251C\u2500\u2500 CONTRIBUTING.md\n\u251C\u2500\u2500 docs\n|   \u251C\u2500\u2500 ...\n\u251C\u2500\u2500 LICENSE\n\u251C\u2500\u2500 README.md\n\u2514\u2500\u2500 steps\n    \u251C\u2500\u2500 ...\n```\n\n### Slides checks\n\n#### General slides checks\n\n##### S_010 the script `<root>/docs/scripts/slides.js` should contain an exported function `formation()`\n\nEvery school should have a file `slides.js` in the correct directory and with an exported function `formation()`.\n\n`<root>/docs/scripts/slides.js` :\n\n```JavaScript\nimport { SfeirThemeInitializer } from \'../web_modules/sfeir-school-theme/dist/sfeir-school-theme.mjs\';\n\nfunction schoolSlides() {\n  const dir = \'00-school\';\n  return [\n    `${dir}/00-TITLE.md`,\n    `${dir}/01-wifi.md`,\n    ...\n  ];\n}\n\n...\n\nexport function formation() {\n  return [\n    schoolSlides(),\n    ...\n  ].flatMap((slidePath) => ({ path: slidePath }));\n}\n\nSfeirThemeInitializer.init(formation);\n```\n\n##### S_001 every entry returned by the function `formation()` in `<root>/docs/scripts/slides.js` is valid\n\nEvery entry returned by the function `formation()` should be an object which have a path property.\n\n##### S_002 every entry returned by the function `formation()` in `<root>/docs/scripts/slides.js` exists in the `<root>/docs/markdown` directory\n\nEvery entry returned by the function `formation()` should have a path matching an existing markdown file in the `<root>/docs/markdown` directory.\n\n##### S_003 every markdown file in the `<root>/docs/markdown` directory is declared in the `<root>/docs/scripts/slides.js`\n\nEvery markdown files in the `<root>/docs/markdown` directory should be declared with a valid entry in the result of the `formation()` function in `<root>/docs/scripts/slides.js`.\n\n#### Lab slides specific checks\n\n##### S_004 every lab slide file contains the command to run the exercise\n\nEvery labs should have the expected format:\n\n```Markdown\n<!-- .slide: class="exercice" -->\n\n# Lab title\n\n## Lab\n\n<br>\n\n1. First thing to do\n2. Another thing to do\n3. Last thing to do\n\n<br>\n\n- note for the students\n\n### command to run\n\nNotes:\n- eventual speaker notes\n```\n\nThe command should start with `stepCommandPrefix` specified in the `<root>/.sfeir-theme-config.json`. This command should also contains an existing lab command.\n\n##### S_005 every lab slide file contains the valid command to run the exercise\n\nEvery labs should have the expected format:\n\n```Markdown\n<!-- .slide: class="exercice" -->\n\n# Lab title\n\n## Lab\n\n<br>\n\n1. First thing to do\n2. Another thing to do\n3. Last thing to do\n\n<br>\n\n- note for the students\n\n### command to run\n\nNotes:\n- eventual speaker notes\n```\n\nThe command should start with `stepCommandPrefix` specified in the `<root>/.sfeir-theme-config.json`. This command should also contains an existing lab command.\n\n##### S_006 every lab slide should have lab format\n\nEvery labs should have the expected format:\n\n```Markdown\n<!-- .slide: class="exercice" -->\n\n# Lab title\n\n## Lab\n\n<br>\n\n1. First thing to do\n2. Another thing to do\n3. Last thing to do\n\n<br>\n\n- note for the students\n\n### command to run\n\nNotes:\n- eventual speaker notes\n```\n\nThe command should start with `stepCommandPrefix` specified in the `<root>/.sfeir-theme-config.json`. This command should also contains an existing lab command.\n\n#### Images / slides checks\n\n##### S_007 every images (relative one\'s only) in a slide should exists\n\nEvery images linked in a slide should exists in the assets directory `<root>/docs/assets/images/`.\n\n##### S_008 every images in assets should be referenced at least in one slide\n\nEvery images in `<root>/docs/assets/images/` directory should be linked in a slide.\n\n#### CSS classes\n\n##### S_009 every classes used in slide files should be known\n\nEvery classes used in a slide file should exists:\n\n- in `<root>/docs/web_modules/sfeir-school-theme/dist/sfeir-school-theme.css`;\n- in `<root>/docs/css/slides.css`;\n- in any css files declared in the property `extraCssFiles` in the `<root>/.sfeir-theme-config.json`;\n\n### Labs checks\n\n#### General labs checks\n\n##### L_001 every labs should be used in a slide\n\nEvery lab should be referenced in the lab slide.\n\n#### Workspace / Scripts checks\n\n##### L_002 every lab should be declared in the workspace (either "workspaces" or "labs" in a file `<root>/steps/package.json` or `<root>/steps/labs.json` at the root of "steps" directory)\n\nEvery lab should be declared either in `<root>/steps/package.json` or `<root>/steps/labs.json`.\n\nFor `package.json` format:\n\n```Json\n{\n    "workspaces": [\n        "01-getting-started",\n        "01-getting-started-solution"\n    ]\n}\n```\n\nFor `labs.json` format:\n\n```Json\n{\n    "labs": [\n        "01-getting-started",\n        "01-getting-started-solution"\n    ]\n}\n```\n\n##### L_003 every lab should have a script in `package.json` to start it (only if workspace is declared in a `<root>/steps/package.json` file) (NPM PROJECT ONLY)\n\nRules for NPM projects only. If you have a `<root>/steps/package.json` the this rules will be activated automatically.\n\nEvery lab should have a dedicated script in the `package.json`.\n\n```Json\n{\n    "workspaces": [\n        "01-getting-started",\n        "01-getting-started-solution"\n    ],\n    "scripts": {\n        "01-getting-started": "...",\n        "01-getting-started-solution": "..."\n    }\n}\n```\n\n##### L_004 every lab should have a `package.json` with corresponding name (only if workspace is declared in a `<root>/steps/package.json` file) (NPM PROJECT ONLY)\n\nRules for NPM projects only. If you have a `<root>/steps/package.json` the this rules will be activated automatically.\n\nEvery lab in the `workspaces` property in `<root>/steps/package.json` file should correspond to a directory in `<root>/steps/` with a package.json file.\n\n#### Instructions checks\n\n##### L_005 every lab should have a `README.md`\n\nEvery lab directory in `<root>/steps/` should contain a `README.md` file with the lab title and the correct command.\n\nExample of minimal `README.md`:\n\n```Markdown\n# 01-getting-started instructions\n\nnpm run 01-getting-started\n```\n\n##### L_006 every lab `README.md` should have correct title\n\nEvery lab directory in `<root>/steps/` should contain a `README.md` file with the lab title and the correct command.\n\nExample of minimal `README.md`:\n\n```Markdown\n# 01-getting-started instructions\n\nnpm run 01-getting-started\n```\n##### L_007 every lab `README.md` should contains the correct command to start the lab\n\nEvery lab directory in `<root>/steps/` should contain a `README.md` file with the lab title and the correct command.\n\nExample of minimal `README.md`:\n\n```Markdown\n# 01-getting-started instructions\n\nnpm run 01-getting-started\n```\n\n#### Solutions checks\n\n##### L_008 every lab should have solution\n\nEvery lab should have a equivalent solution\'s lab. For example, if you create a lab "01-getting-started", you should create an other lab "01-getting-started-solution".\n\n##### L_009 every solution directory should match a lab\n\nEvery lab with `-solution` suffix should match a lab with the exact same name without the `-solution` suffix.\n\n##### L_010 every solution `README.md` should be the same as the lab\'s one\n\nBoth lab and solution\'s lab should have the same `README.md` file content.\n';
  }
});

// cli/command/explain.ts
function explainCommand({ ruleCode }) {
  if (isNotDefinedOrEmpty(ruleCode)) {
    console.error("You should specify the rule code you wanted.\n\n");
    return;
  }
  if (!README_default.includes("##### " + ruleCode)) {
    console.error("You should specify an existing rule code.\n\n");
    return;
  }
  const doc = README_default.split("\n");
  const ruleSectionIndex = doc.findIndex((row) => row.startsWith("##### " + ruleCode));
  let docSection = doc.slice(ruleSectionIndex);
  docSection = docSection.slice(0, docSection.slice(1).findIndex((row) => row.startsWith("##### ")));
  console.log(docSection.join("\n") + "\n");
}
var init_explain = __esm({
  "cli/command/explain.ts"() {
    "use strict";
    init_fp_utils();
    init_README();
  }
});

// cli/command/help.ts
function helpCommand() {
  console.log(`
sfeir-school-theme CLI

Usage:
    sfeir-school-theme [command]

Command:
    help: Display this help message
    info: Give infos on the current school
    init-config: Will create config file with the default configuration
    version: Display the CLI version
    check: Run project checks
        --rootDir=/path/to/root/dir
    explain [ruleCode]: Give the rule documentation
`);
}
var init_help = __esm({
  "cli/command/help.ts"() {
    "use strict";
  }
});

// cli/command/info.ts
function infoCommand({ rootDir }) {
  const allLabs = getAllLabsFromWorkspace(rootDir);
  const { labs, labSolutions } = splitLabsAndSolutions(allLabs);
  console.log([
    "",
    //
    "# Labs",
    //
    "",
    //
    ...labs.map((lab) => printLab(lab, labSolutions))
  ].join("\n"));
}
function printLab(lab, labSolutions) {
  const labSolution = labSolutions.find((labSol) => labSol.startsWith(lab));
  if (isDefined(labSolution)) {
    return ` - ${lab}(-solution)`;
  } else {
    return ` - ${lab}`;
  }
}
var init_info = __esm({
  "cli/command/info.ts"() {
    "use strict";
    init_labs_utils();
    init_fp_utils();
  }
});

// cli/command/init-config.ts
import fs6 from "fs";
function initConfigCommand({ rootDir }) {
  const configPath = projectConfigPath(rootDir);
  if (fs6.existsSync(configPath)) {
    throw new Error("Cannot init config as there is already one.");
  }
  fs6.writeFileSync(
    configPath,
    JSON.stringify(config_template_default, void 0, 2)
  );
}
var init_init_config = __esm({
  "cli/command/init-config.ts"() {
    "use strict";
    init_config_template();
    init_path_utils();
  }
});

// package.json
var package_default;
var init_package = __esm({
  "package.json"() {
    package_default = {
      name: "sfeir-school-theme",
      version: "4.0.0-rc-14",
      description: "Sfeir School Theme for RevealJS",
      files: [
        "dist"
      ],
      publishConfig: {
        access: "public"
      },
      main: "./dist/sfeir-school-theme.umd.js",
      module: "./dist/sfeir-school-theme.mjs",
      types: "./dist/sfeir-school-theme.d.ts",
      style: "./dist/sfeir-school-theme.css",
      bin: {
        "sfeir-school-theme-cleanup": "./dist/sfeir-school-theme-cleanup.mjs",
        "sfeir-school-theme-migrate": "./dist/sfeir-school-theme-migration.mjs",
        "sfeir-school-theme": "./dist/sfeir-school-theme-cli.mjs"
      },
      exports: {
        ".": {
          import: "./dist/sfeir-school-theme.mjs",
          require: "./dist/sfeir-school-theme.umd.js",
          types: "./dist/sfeir-school-theme.d.ts"
        },
        "./theme": {
          import: "./dist/sfeir-school-theme.css",
          require: "./dist/sfeir-school-theme.css"
        }
      },
      scripts: {
        test: "vitest",
        serve: 'live-server --port=4242 --open="./demo/index.html" --mount="/assets:./demo/assets" --mount="/web_modules:./demo/web_modules" --watch="./demo/web_modules/sfeir-school-theme,./demo/markdown/"',
        release: 'echo "Error: no deployement is configure for the moment, please just build the project"',
        "prepare-demo": "tsx ./scripts/prepare-demo.ts",
        prestart: "npm run prepare-demo",
        start: 'parallelshell "npm run serve" "npm run build-watch"',
        postbuild: "tsx ./scripts/prepare-publish.ts",
        build: "tsc && vite build && npm run build:scripts && npm run cli-build",
        "build:scripts": "tsc -p tsconfig.scripts.json && chmod +x dist/sfeir-school-theme-cleanup.js dist/sfeir-school-theme-migration.js && mv dist/sfeir-school-theme-cleanup.js dist/sfeir-school-theme-cleanup.mjs && mv dist/sfeir-school-theme-migration.js dist/sfeir-school-theme-migration.mjs",
        "on-change:build": 'chokidar "./src" -c "npm run build"',
        "on-change:copy": 'chokidar "./dist" -c "npm run prepare-demo"',
        "build-watch": 'parallelshell "npm run on-change:build" "npm run on-change:copy"',
        lint: "eslint src/ cli/",
        "lint:fix": "eslint --fix src/ cli/",
        "cli-build": "tsup --config ./tsup.cli.config.ts",
        "cli-run": "node dist/sfeir-school-theme-cli.mjs"
      },
      repository: {
        type: "git",
        url: "git+https://github.com/sfeir-open-source/sfeir-school-theme.git"
      },
      keywords: [
        "css",
        "sfeir"
      ],
      author: "jefbinomed",
      contributors: [
        "kuroidoruido"
      ],
      license: "Apache-2.0",
      bugs: {
        url: "https://github.com/sfeir-open-source/sfeir-school-theme/issues"
      },
      homepage: "https://github.com/sfeir-open-source/sfeir-school-theme#readme",
      dependencies: {
        "@talk-control/talk-control-revealjs-extensions": "^1.0.0-rc-3",
        "lit-html": "^3.1.4"
      },
      devDependencies: {
        "@eslint/js": "^9.6.0",
        "@types/node": "^20.14.9",
        "@types/reveal.js": "^5.0.3",
        "@types/shelljs": "^0.8.15",
        "@vitest/ui": "^3.2.4",
        "chokidar-cli": "^3.0.0",
        eslint: "^9.6.0",
        globals: "^15.8.0",
        "live-server": "^1.1.0",
        parallelshell: "3.0.1",
        prettier: "^3.3.3",
        sass: "^1.77.6",
        shelljs: "^0.8.5",
        tsup: "^8.5.0",
        tsx: "^4.16.2",
        "type-fest": "^4.21.0",
        typescript: "^5.8.3",
        "typescript-eslint": "^8.41.0",
        vite: "^5.3.1",
        "vite-plugin-dts": "^4.2.1",
        vitest: "^3.2.4"
      },
      overrides: {
        eslint: "$eslint"
      }
    };
  }
});

// cli/command/version.ts
function versionCommand() {
  console.log("Version: " + package_default.version);
}
var init_version = __esm({
  "cli/command/version.ts"() {
    "use strict";
    init_package();
  }
});

// cli/command/run.ts
function runCommand(command) {
  return __async(this, null, function* () {
    switch (command.type) {
      case "check":
        yield checkCommand(command);
        break;
      case "init-config":
        yield initConfigCommand(command);
        break;
      case "explain":
        explainCommand(command);
        break;
      case "help":
        helpCommand();
        break;
      case "info":
        infoCommand(command);
        break;
      case "version":
        versionCommand();
        break;
      default:
        throw new Error(
          `Command "${JSON.stringify(command)}" not implemented`
        );
    }
  });
}
var init_run = __esm({
  "cli/command/run.ts"() {
    "use strict";
    init_check();
    init_explain();
    init_help();
    init_info();
    init_init_config();
    init_version();
  }
});

// cli/main.ts
var require_main = __commonJS({
  "cli/main.ts"(exports) {
    init_assert_utils();
    init_cli();
    init_run();
    (() => __async(null, null, function* () {
      try {
        yield runCommand(parseArgs(process.argv, process.cwd()));
      } catch (error) {
        if (error instanceof CheckError) {
          console.error(error.message);
          console.error("");
          console.error(`You can call "sfeir-school-theme explain ${error.ruleId}" to have more details.`);
          console.error("");
          process.exit(1);
        }
        if (error instanceof Error) {
          console.error(error.message);
          console.error(error.stack);
          process.exit(2);
        }
      }
    }))();
  }
});
export default require_main();
