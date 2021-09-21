const github = require("@actions/github");
const core = require("@actions/core");
const fs = require("fs");

function makeSvg(args) {
  const { username, name, os, editor, home, languages } = args;
  const svgTop = [
    '<svg xmlns="http://www.w3.org/2000/svg" width="1500" height="500" viewBox="0 0 396.875 132.292">',
    "<defs>",
    '<path id="b" d="M576.03692 26.553066h900.65844v446.3145H576.03692z"/>',
    "</defs>",
    "<defs>",
    '<path id="a" d="M166.675 316.706h1177.377v1022.317H166.675z"/>',
    "</defs>",
    '<text xml:space="preserve" fill="#008d26" font-family="sans-serif" font-size="40" font-weight="400" style="line-height:1.25;white-space:pre;shape-inside:url(#a)" transform="matrix(.12235 0 0 .13309 -20.392 -43.993)">',
    '<tspan x="166.67578" y="353.10009">⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣤⣤⣶⣶⣶⣶⣶⣶⣶⣶⣤⣤⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ </tspan>',
    '<tspan x="166.67578" y="404.10448">⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣴⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣦⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀ </tspan>',
    '<tspan x="166.67578" y="455.10887">⠀⠀⠀⠀⠀⠀⢀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⡀⠀⠀⠀⠀⠀⠀ </tspan>',
    '<tspan x="166.67578" y="506.11327">⠀⠀⠀⠀⢀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⡀⠀⠀⠀⠀ </tspan>',
    '<tspan x="166.67578" y="557.11766">⠀⠀⠀⣰⣿⣿⣿⣿⣿⠏⠉⠛⠻⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟⠛⠉⠹⣿⣿⣿⣿⣿⣆⠀⠀⠀ </tspan>',
    '<tspan x="166.67578" y="608.12206">⠀⠀⣼⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠈⠉⠉⠀⠀⠀⠀⠀⠀⠉⠉⠁⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣧⠀⠀ </tspan>',
    '<tspan x="166.67578" y="659.12645">⠀⣸⣿⣿⣿⣿⣿⣿⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⣿⣿⣿⣿⣿⣿⣇⠀ </tspan>',
    '<tspan x="166.67578" y="710.13085">⢠⣿⣿⣿⣿⣿⣿⣿⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⣿⣿⣿⣿⣿⣿⣿⡄ </tspan>',
    '<tspan x="166.67578" y="761.13524">⣼⣿⣿⣿⣿⣿⣿⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⣿⣿⣿⣿⣿⣿⣧ </tspan>',
    '<tspan x="166.67578" y="812.13964">⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿ </tspan>',
    '<tspan x="166.67578" y="863.14403">⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿ </tspan>',
    '<tspan x="166.67578" y="914.14843">⢿⣿⣿⣿⣿⣿⣿⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⣿⣿⣿⣿⣿⡿ </tspan>',
    '<tspan x="166.67578" y="965.15282">⢸⣿⣿⣿⣿⣿⣿⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⣿⣿⣿⣿⣿⣿⣿⡇ </tspan>',
    '<tspan x="166.67578" y="1016.1572">⠀⢿⣿⣿⣿⣿⣿⣿⣿⣷⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣾⣿⣿⣿⣿⣿⣿⣿⡿⠀ </tspan>',
    '<tspan x="166.67578" y="1067.1616">⠀⠈⢿⣿⣿⣧⡀⠉⡻⣿⣿⣿⣷⣶⣤⣤⠀⠀⠀⠀⠀⠀⠀⠀⣤⣤⣶⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠁⠀ </tspan>',
    '<tspan x="166.67578" y="1118.166">⠀⠀⠈⢿⣿⣿⣿⣦⠐⢘⢿⣿⣿⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠁⠀⠀ </tspan>',
    '<tspan x="166.67578" y="1169.1704">⠀⠀⠀⠀⠹⣿⣿⣿⣧⡀⠀⠊⠹⠉⠒⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠏⠀⠀⠀⠀ </tspan>',
    '<tspan x="166.67578" y="1220.1748">⠀⠀⠀⠀⠀⠈⠻⣿⣿⣿⣶⣶⣤⣤⣶⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⠟⠁⠀⠀⠀⠀⠀ </tspan>',
    '<tspan x="166.67578" y="1271.1792">⠀⠀⠀⠀⠀⠀⠀⠀⠙⠻⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⠟⠋⠀⠀⠀⠀⠀⠀⠀⠀ </tspan>',
    '<tspan x="166.67578" y="1322.1836">⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⠻⠟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠻⠟⠛⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀</tspan>',
    "</text>",
    '<text xml:space="preserve" fill="#008d26" font-family="TerminessTTF Nerd Font Mono" font-size="40" font-weight="400" style="line-height:1.25;white-space:pre;shape-inside:url(#b)" transform="translate(31.57343 4.647155) scale(.26458)">',
  ];
  const svgBottom = ["</text>", "</svg>"];
  const userSvgArr = [
    `<tspan x="576.03711" y="64.872734">@${username}</tspan>`,
    `<tspan x="576.03711" dy="52">------------------</tspan>`,
    `<tspan x="576.03711" dy="52">name:      ${name}</tspan>`,
    `<tspan x="576.03711" dy="52">os:         ${os}</tspan>`,
    `<tspan x="576.03711" dy="52">editor:    ${editor}</tspan>`,
    `<tspan x="576.03711" dy="52">home:      ${home}</tspan>`,
    `<tspan x="576.03711" dy="52">languages: ${languages}</tspan>`,
  ].filter((line) => !line.includes("undefined"));

  return svgTop.concat(userSvgArr, svgBottom).join("");
}

async function commitChanges() {
  // const pat = process.env.PERSONAL_ACCESS_TOKEN;
  // if (pat === "undefined") {
  //   core.setFailed("Needs a personal access token set as an Env var");
  // }
  // const octo = github.getOctokit(pat);

  const [_, owner, repo] = process.env.GITHUB_REPOSITORY.match(/(.*)\/(.*)$/);

  const { data: refData } = octo.rest.git.getRef({
    owner,
    repo,
    ref: procces.env.GITHUB_REF,
  });
  const commitSha = refData.object.sha;
  const { data: commitData } = await octo.rest.git.getCommit({
    owner,
    repo,
    commitSha,
  });
}

async function updateSvg() {
  const username = process.env.GITHUB_REPOSITORY.match(/(.*)\/.*$/)[1];
  const name = core.getInput("name") || "Viktor Vaughan";
  const os = core.getInput("os") || "Arch btw";
  const editor = core.getInput("editor") || "Vim btw";
  const home = core.getInput("location") || "Yorkshire";
  const languages = core.getInput("languages") || "COBOL, FORTRAN";
  const values = {
    username,
    name,
    os,
    editor,
    home,
    languages,
  };
  const output = makeSvg(values);
  try {
    // fs.writeSync(`${process.env.GITHUB_WORKSPACE}/readme.svg`, output);
    core.info("Written the SVG");
    await commitChanges();
  } catch (err) {
    core.error(err);
  }
}

updateSvg();
