#!/usr/bin/env bash

#编译 src 目录下的 typescript source module
#生成 js module 到 lib 目录
npm run build:tsc

version=$1;
jsonFile=package.json;
jsonContent=`cat package.json`

#sed -i.bak 's/\"(.*)\"/123/' a_.bak

node > ${jsonFile} <<EOF
//Read data
var data = ${jsonContent};

//Manipulate data
data.version = '${version}';

//Output data
console.log(JSON.stringify(data));

EOF

git add .
git commit -m ${version}
echo ${version};
npm publish
git push origin master