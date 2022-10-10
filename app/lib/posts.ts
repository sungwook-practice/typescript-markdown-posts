import path from "path";
import fs from "fs";
import matter from "gray-matter";


const postDirectory = path.join(process.cwd(), 'posts');

// Markdown 데이터 로드 후, 파싱
export function getSortedPostDataFromMarkDown() {
  const fileNames: string[] = fs.readdirSync(postDirectory);

  const allPostData = fileNames.map(fileName => {
    const fileId = fileName.replace(/\.md$/, "")
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
