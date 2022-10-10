import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

const postDirectory = path.join(process.cwd(), 'posts');

function getFilesFromDirectory(): string[] {
  return fs.readdirSync(postDirectory);
}

function removeFileExtension(fileName: string) {
  return fileName.replace(/\.md$/, "");
}

// Markdown 데이터 로드 후, 파싱
export function getSortedPostDataFromMarkDown() {
  const fileNames: string[] = getFilesFromDirectory();

  const allPostData = fileNames.map(fileName => {
    const fileId = removeFileExtension(fileName)
    const filePath = path.join(postDirectory, fileName);
    const Contents = fs.readFileSync(filePath, 'utf-8');
    const matterResult = matter(Contents);

    return {
      fileId,
      ...matterResult.data as {
        date: string;
        title: string
      }
    }
  });

  return allPostData.sort((a, b) => {
    if(a.date < b.date) {
      return 1;
    }else {
      return -1;
    }
  })
}

// Id를 이용하여 Markdown파일을 읽고 HTML string으로 변환
export async function getSortedPostDataFromID(fileId: string) {
  const filePath = path.join(postDirectory, `${fileId}.md`);
  const contents = fs.readFileSync(filePath, 'utf-8');
  const matterResult = matter(contents);

  const remakredContent = await remark()
    .use(remarkHtml)
    .process(matterResult.content);
  const contentHtml = remakredContent.toString();

  return {
    fileId,
    contentHtml,
    ...(matterResult.data as {date: string; title:string})
  }
}

export function getAllPostsIds() {
  const fileNames: string[] = getFilesFromDirectory();
  return fileNames.map(fileName => {
    return {
      params: {
        id: removeFileExtension(fileName)
      }
    }
  });
}