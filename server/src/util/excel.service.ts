import { Injectable } from '@nestjs/common';
import { Fill, Font, Workbook } from 'exceljs';
import * as tmp from 'tmp';
import * as fs from 'fs';

type HeaderCostomize = {
  font: Partial<Font>;
  fill: Fill;
};

// type Customize = {
//   header: HeaderCostomize;
// };

@Injectable()
export class ExcelService {
  async downloadExcel<T>(
    data: T[],
    sheetName: string,
    headerStyles?: HeaderCostomize
  ) {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet(sheetName);

    // creating headers
    const columns = Object.keys(data[0]).map((key) => ({
      header: key,
      key,
    }));
    worksheet.columns = columns;

    // Add rows
    data.forEach((item) => {
      worksheet.addRow(item);
    });

    worksheet.getRow(1).eachCell((cell) => {
      cell.font = {
        bold: true,
        color: { argb: 'FFFFFFFF' },
      };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        // fgColor: { argb: '00000000' },
      };
    });

    // Create a temporary file to save the workbook
    const tempFile = tmp.fileSync({ postfix: '.xlsx' });
    await workbook.xlsx.writeFile(tempFile.name);

    return tempFile.name;
  }

  async deleteFile(filePath: string) {
    fs.unlinkSync(filePath);
  }
}
