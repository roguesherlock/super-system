const readline = require("readline");
const fs = require("fs");
const path = require("path");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Where's your drafts export? ", (fileName: string) => {
  fs.readFile(fileName, "utf8", (err: any, data: string) => {
    const draftsExportData: draftsExportType = JSON.parse(data);
    const dirName = path.dirname(fileName);
    const baseName = path.basename(fileName);
    const roamFileName = path.join(dirName, `${baseName}-roamImport.json`);
    const roamData = transformDraftsData(draftsExportData);
    fs.writeFile(roamFileName, JSON.stringify(roamData), (err: any) =>
      err ? console.log("fuck", err) : console.log("done")
    );
    rl.close();
  });
});

const transformDraftsData = (data: draftsExportType): roamImportType[] =>
  data.map((draftsData) => {
    const content = draftsData.content.split("\n");
    const tags = draftsData.tags;
    const tagsString = `${tags
      .map((tag) => `#[[${tag}]]`)
      .join(" ")} #[[Drafts]]`;

    const metaMetaData = {
      "create-email": "aakash@hey.com",
      "create-time": new Date(draftsData.created_at).getTime(),
      "edit-time": new Date(draftsData.modified_at).getTime(),
      "edit-email": "aakash@hey.com",
    };
    const title =
      content[0].length <= 50
        ? content[0]
        : `Drafts: Brain Fart in ${tags[0] ?? ""} -- uuid: ${draftsData.uuid}`;
    const metaData = {
      ...metaMetaData,
      title,
      uuid: draftsData.uuid,
    };
    const metaChildrenData = [
      {
        string: "Author:: [[Akash]]",
        ...metaMetaData,
      },
      {
        string: `Tags:: ${tagsString}`,
        ...metaMetaData,
      },
    ];
    const children = content.map((text) => ({
      string: text,
      ...metaMetaData,
    }));
    return { ...metaData, children: [...metaChildrenData, ...children] };
  });
