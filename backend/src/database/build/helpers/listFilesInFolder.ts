import * as fs from 'fs';
import * as path from 'path';

export const listFilesInFolder = (folderPath: string) => {
  try {
    
    const files = fs.readdirSync(folderPath);

    // Iterate through the files and handle each one
    const filePaths: string[] = files.map((file) => {
      const fullPath = path.join(folderPath, file);
      return fullPath;
      

    //   // Check if it's a file or directory
    //   const stats = fs.statSync(fullPath);
    //   if (stats.isFile()) {
    //     filePaths.push(stats);
    //     //console.log(`File: ${file}`);
    //     // Do something with the file
    //   } else if (stats.isDirectory()) {
    //     //console.log(`Directory: ${file}`);
    //     // Optionally recurse into the subdirectory
    //     // listFilesInFolder(fullPath);
    //   }
    });
    return filePaths;
  } catch (error) {
    console.error(`Error reading folder: ${error.message}`);
  }
};
