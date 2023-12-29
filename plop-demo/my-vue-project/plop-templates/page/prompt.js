const path = require("path");
const fs = require("fs");
function getFolder(path) {
  let components = [];
  const files = fs.readdirSync(path);
  files.forEach(function (item) {
    let stat = fs.lstatSync(path + "/" + item);
    if (stat.isDirectory() === true && item != "components") {
      components.push(path + "/" + item);
      components.push.apply(components, getFolder(path + "/" + item));
    }
  });
  return components;
}
// 将swagger数组转成andv table需要的数据
function convertData(data) {
  const newArray = [];
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const value = data[key];
      newArray.push({
        title: `"${key}"`,
        dataIndex: `"${value}"`,
        width: 160,
      });
    }
  }
  return newArray;
}
// convertData({ username: "姓名", realName: "真实姓名", state: "状态" });
module.exports = {
  description: "创建页面",
  prompts: [
    {
      type: "list",
      name: "path",
      message: "请选择页面创建目录",
      choices: getFolder("src/views"),
    },
    {
      type: "input",
      name: "name",
      message: "请输入文件名",
      validate: (v) => {
        if (!v || v.trim === "") {
          return "文件名不能为空";
        } else if (v == "list" || v == "detail") {
          return "list 和 detail 为保留关键字，无法直接创建，请通过创建标准模块进行生成";
        } else {
          return true;
        }
      },
    },
    {
      type: "input",
      name: "cname",
      message: "请输入页面中文名称",
      default: "默认页面",
    },
    {
      type: "input",
      name: "Columns",
      message: "请填写swagger表单json数据",
    },
  ],
  actions: (data) => {
    const userColumns = [
      {
        title: "姓名",
        dataIndex: "username",
        width: 160,
        fixed: "left",
      },
      {
        title: "真实姓名",
        dataIndex: "realName",
        width: 200,
      },
      {
        title: "状态",
        dataIndex: "state",
        width: 100,
      },
      {
        title: "手机号",
        dataIndex: "phoneNum",
        width: 200,
      },
      {
        title: "部门",
        dataIndex: "departmentName",
        width: 100,
      },
      {
        title: "邮箱",
        dataIndex: "email",
        width: 300,
      },
      {
        title: "性别",
        dataIndex: "gender",
        width: 200,
      },

      {
        title: "生日",
        dataIndex: "birthday",
        width: 200,
      },
      {
        title: "lastLoginTime",
        dataIndex: "lastLoginTime",
        width: 200,
      },
      {
        key: "operation",
        title: "操作",
        fixed: "right",
        width: 100,
      },
    ];
    console.log("Columns", convertData(data.Columns));
    // 在生成的 JSON 字符串中去掉双引号和空格
    const jsonString = JSON.stringify(userColumns, null, 2);
    const jsonStringWithoutQuotes = jsonString.replace(/"/g, "");
    let relativePath = path.relative("src/views", data.path);
    // 等于存在bug
    const myString = `PLOP = `;
    const actions = [
      {
        type: "add",
        path: `${data.path}/{{dotCase name}}.vue`,
        templateFile: "plop-templates/page/index.hbs",
        data: {
          componentName: `const userColumns等于${jsonStringWithoutQuotes};`,
        },
      },
    ];
    return actions;
  },
};
